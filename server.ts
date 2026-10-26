import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { storeManager } from './src/server/store.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json());
app.use(cookieParser());

// Rate limiter / attempt tracker in memory
const loginAttempts: Record<string, { count: number; lockedUntil: number }> = {};

// Helper: Authentication middleware for Admin APIs
function requireAdminAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.suraksha_admin_token || 
    (req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.split(' ')[1] : undefined);

  if (!token) {
    res.status(401).json({ error: 'Unauthorized: Valid administrator session token required' });
    return;
  }

  const session = storeManager.getSession(token);
  if (!session) {
    res.status(401).json({ error: 'Session expired or invalid. Please sign in again.' });
    return;
  }

  (req as any).adminSession = session;
  next();
}

// ----------------------------------------------------
// PUBLIC API ENDPOINTS
// ----------------------------------------------------

// 1. Public Site & Release Configuration
app.get('/api/public/config', (_req: Request, res: Response) => {
  const store = storeManager.getStore();
  res.json({
    siteName: store.siteSettings.siteName,
    emergencyHelpline: store.siteSettings.emergencyHelpline,
    portalUrl: store.siteSettings.portalUrl,
    supportEmail: store.siteSettings.supportEmail,
    maintenanceMode: store.siteSettings.maintenanceMode,
    maintenanceMessage: store.siteSettings.maintenanceMessage,
    releaseInfo: {
      version: store.releaseInfo.version,
      channel: store.releaseInfo.channel,
      isPublished: store.releaseInfo.isPublished,
      fileSize: store.releaseInfo.fileSize,
      minAndroid: store.releaseInfo.minAndroid,
      releaseDate: store.releaseInfo.releaseDate,
      checksum: store.releaseInfo.checksum,
      notes: store.releaseInfo.notes,
      testedDevices: store.releaseInfo.testedDevices,
    },
    activeAnnouncements: store.announcements.filter((a) => a.isPublished),
  });
});

// 2. Public Feedback / Scam Report Submission
app.post('/api/public/feedback', (req: Request, res: Response) => {
  const { name, email, category, device, rating, message } = req.body;

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    res.status(400).json({ error: 'Message content is required.' });
    return;
  }

  const newFeedback = storeManager.addFeedback({
    name: name?.trim() || undefined,
    email: email?.trim() || undefined,
    category: category || 'General Inquiries',
    device: device?.trim() || undefined,
    rating: typeof rating === 'number' ? rating : undefined,
    message: message.trim(),
  });

  storeManager.logActivity(
    'CITIZEN_FEEDBACK_SUBMITTED',
    name || 'Anonymous Citizen',
    `Received submission category: "${category || 'General'}"`,
    'info' as any
  );

  res.status(201).json({
    success: true,
    id: newFeedback.id,
    message: 'Feedback received with thanks. Our team reviews pattern submissions continually.',
  });
});

// ----------------------------------------------------
// SECURE ADMIN AUTHENTICATION ENDPOINTS
// ----------------------------------------------------

// 3. Admin Login
app.post('/api/admin/login', (req: Request, res: Response) => {
  const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();

  // Check brute-force lock
  const attemptInfo = loginAttempts[clientIp];
  if (attemptInfo && attemptInfo.lockedUntil > now) {
    const waitSec = Math.ceil((attemptInfo.lockedUntil - now) / 1000);
    res.status(429).json({ error: `Too many failed sign-in attempts. Please retry in ${waitSec} seconds.` });
    return;
  }

  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: 'Username and password are required.' });
    return;
  }

  const isValid = storeManager.verifyAdminCredentials(username.trim(), password);

  if (!isValid) {
    if (!loginAttempts[clientIp]) {
      loginAttempts[clientIp] = { count: 1, lockedUntil: 0 };
    } else {
      loginAttempts[clientIp].count += 1;
      if (loginAttempts[clientIp].count >= 5) {
        loginAttempts[clientIp].lockedUntil = now + 60 * 1000; // 1 min lock
      }
    }

    storeManager.logActivity(
      'ADMIN_LOGIN_FAILED',
      username,
      `Failed credential attempt from IP: ${clientIp}`,
      'error',
      clientIp
    );

    res.status(401).json({ error: 'Invalid administrator credentials.' });
    return;
  }

  // Clear attempts on success
  delete loginAttempts[clientIp];

  const session = storeManager.createSession(username.trim());

  // Set HTTP-only secure session cookie
  res.cookie('suraksha_admin_token', session.token, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    maxAge: (storeManager.getStore().siteSettings.sessionTimeoutHours || 8) * 3600 * 1000,
    path: '/',
  });

  res.json({
    success: true,
    user: {
      username: session.username,
      role: session.role,
      name: storeManager.getStore().adminUser.name,
    },
    token: session.token,
    expiresAt: session.expiresAt,
  });
});

// 4. Admin Logout
app.post('/api/admin/logout', requireAdminAuth, (req: Request, res: Response) => {
  const session = (req as any).adminSession;
  if (session?.token) {
    storeManager.removeSession(session.token);
  }

  res.clearCookie('suraksha_admin_token', { path: '/' });
  res.json({ success: true, message: 'Logged out successfully.' });
});

// 5. Admin Current Session Status
app.get('/api/admin/me', requireAdminAuth, (req: Request, res: Response) => {
  const session = (req as any).adminSession;
  const store = storeManager.getStore();

  res.json({
    authenticated: true,
    user: {
      id: session.userId,
      username: session.username,
      role: session.role,
      name: store.adminUser.name,
      lastLoginAt: store.adminUser.lastLoginAt,
    },
    expiresAt: session.expiresAt,
  });
});

// ----------------------------------------------------
// PROTECTED ADMIN DASHBOARD DATA ENDPOINTS
// ----------------------------------------------------

// 6. Admin Overview Metrics
app.get('/api/admin/overview', requireAdminAuth, (_req: Request, res: Response) => {
  const store = storeManager.getStore();

  const totalPages = store.pages.length;
  const publishedPages = store.pages.filter((p) => p.isPublished).length;
  const draftPages = totalPages - publishedPages;

  res.json({
    metrics: {
      totalPages,
      publishedPages,
      draftPages,
      maintenanceMode: store.siteSettings.maintenanceMode,
      apkPublished: store.releaseInfo.isPublished,
      currentVersion: store.releaseInfo.version,
      releaseChannel: store.releaseInfo.channel,
      activeAnnouncementsCount: store.announcements.filter((a) => a.isPublished).length,
      totalAnnouncementsCount: store.announcements.length,
      totalFeedbackCount: store.feedbacks.length,
      unresolvedFeedbackCount: store.feedbacks.filter((f) => f.status === 'new').length,
    },
    recentLogs: store.activityLogs.slice(0, 10),
    siteSettings: store.siteSettings,
    releaseInfo: store.releaseInfo,
  });
});

// 7. Pages Management
app.get('/api/admin/pages', requireAdminAuth, (_req: Request, res: Response) => {
  res.json({ pages: storeManager.getStore().pages });
});

app.patch('/api/admin/pages/:id', requireAdminAuth, (req: Request, res: Response) => {
  const session = (req as any).adminSession;
  const { id } = req.params;
  const { isPublished } = req.body;

  if (typeof isPublished !== 'boolean') {
    res.status(400).json({ error: 'isPublished boolean is required.' });
    return;
  }

  const updated = storeManager.updatePageStatus(id, isPublished, session.username);
  if (!updated) {
    res.status(404).json({ error: `Page with id "${id}" not found.` });
    return;
  }

  res.json({ success: true, page: updated });
});

// 8. Releases Management
app.get('/api/admin/releases', requireAdminAuth, (_req: Request, res: Response) => {
  res.json({ releaseInfo: storeManager.getStore().releaseInfo });
});

app.patch('/api/admin/releases', requireAdminAuth, (req: Request, res: Response) => {
  const session = (req as any).adminSession;
  const { isPublished, version, notes, fileSize, minAndroid, releaseDate, checksum, apkDownloadUrl } = req.body;

  const updated = storeManager.updateReleaseInfo(
    {
      ...(typeof isPublished === 'boolean' && { isPublished }),
      ...(version && { version }),
      ...(notes && { notes }),
      ...(fileSize && { fileSize }),
      ...(minAndroid && { minAndroid }),
      ...(releaseDate && { releaseDate }),
      ...(checksum && { checksum }),
      ...(apkDownloadUrl !== undefined && { apkDownloadUrl }),
    },
    session.username
  );

  res.json({ success: true, releaseInfo: updated });
});

// 9. Announcements Management
app.get('/api/admin/announcements', requireAdminAuth, (_req: Request, res: Response) => {
  res.json({ announcements: storeManager.getStore().announcements });
});

app.post('/api/admin/announcements', requireAdminAuth, (req: Request, res: Response) => {
  const session = (req as any).adminSession;
  const { title, severity, category, summary, isPublished } = req.body;

  if (!title || !summary) {
    res.status(400).json({ error: 'Title and summary are required.' });
    return;
  }

  const item = storeManager.addAnnouncement(
    {
      title,
      severity: severity || 'warning',
      category: category || 'Citizen Advisory',
      summary,
      isPublished: typeof isPublished === 'boolean' ? isPublished : true,
    },
    session.username
  );

  res.status(201).json({ success: true, announcement: item });
});

app.patch('/api/admin/announcements/:id', requireAdminAuth, (req: Request, res: Response) => {
  const session = (req as any).adminSession;
  const { id } = req.params;
  const { isPublished } = req.body;

  if (typeof isPublished !== 'boolean') {
    res.status(400).json({ error: 'isPublished boolean is required.' });
    return;
  }

  const updated = storeManager.toggleAnnouncement(id, isPublished, session.username);
  if (!updated) {
    res.status(404).json({ error: 'Announcement not found.' });
    return;
  }

  res.json({ success: true, announcement: updated });
});

app.delete('/api/admin/announcements/:id', requireAdminAuth, (req: Request, res: Response) => {
  const session = (req as any).adminSession;
  const { id } = req.params;

  const deleted = storeManager.deleteAnnouncement(id, session.username);
  if (!deleted) {
    res.status(404).json({ error: 'Announcement not found.' });
    return;
  }

  res.json({ success: true, message: 'Announcement deleted.' });
});

// 10. Site Settings Management
app.get('/api/admin/settings', requireAdminAuth, (_req: Request, res: Response) => {
  res.json({ settings: storeManager.getStore().siteSettings });
});

app.patch('/api/admin/settings', requireAdminAuth, (req: Request, res: Response) => {
  const session = (req as any).adminSession;
  const { maintenanceMode, emergencyHelpline, portalUrl, supportEmail, maintenanceMessage, sessionTimeoutHours } = req.body;

  const updated = storeManager.updateSiteSettings(
    {
      ...(typeof maintenanceMode === 'boolean' && { maintenanceMode }),
      ...(emergencyHelpline && { emergencyHelpline }),
      ...(portalUrl && { portalUrl }),
      ...(supportEmail && { supportEmail }),
      ...(maintenanceMessage && { maintenanceMessage }),
      ...(typeof sessionTimeoutHours === 'number' && { sessionTimeoutHours }),
    },
    session.username
  );

  res.json({ success: true, settings: updated });
});

// 11. Activity Logs
app.get('/api/admin/activity-logs', requireAdminAuth, (req: Request, res: Response) => {
  const limit = Math.min(Number(req.query.limit) || 100, 300);
  const logs = storeManager.getStore().activityLogs.slice(0, limit);
  res.json({ logs });
});

// 12. Feedback list for admin
app.get('/api/admin/feedbacks', requireAdminAuth, (_req: Request, res: Response) => {
  res.json({ feedbacks: storeManager.getStore().feedbacks });
});

// ----------------------------------------------------
// CLIENT SERVING & SPA MOUNTING
// ----------------------------------------------------

async function startServer() {
  if (!isProd) {
    // Development mode with Vite middleware
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[SURAKSHA AI Server] Running on http://0.0.0.0:${PORT} in ${isProd ? 'production' : 'development'} mode.`);
  });
}

startServer().catch((err) => {
  console.error('[SURAKSHA AI Server] Fatal startup failure:', err);
  process.exit(1);
});
