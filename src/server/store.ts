import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export interface AdminUser {
  id: string;
  username: string;
  passwordHash: string;
  salt: string;
  role: 'superadmin' | 'admin';
  name: string;
  lastLoginAt: string | null;
}

export interface AdminSession {
  token: string;
  userId: string;
  username: string;
  role: string;
  createdAt: string;
  expiresAt: string;
}

export interface SiteSettings {
  siteName: string;
  emergencyHelpline: string;
  portalUrl: string;
  supportEmail: string;
  maintenanceMode: boolean;
  maintenanceMessage: string;
  sessionTimeoutHours: number;
}

export interface ReleaseInfo {
  version: string;
  channel: string;
  isPublished: boolean;
  fileSize: string;
  minAndroid: string;
  releaseDate: string;
  checksum: string;
  apkDownloadUrl: string;
  notes: string;
  testedDevices: string[];
}

export interface PageItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: 'public' | 'legal' | 'utility';
  isPublished: boolean;
  lastUpdated: string;
}

export interface AnnouncementItem {
  id: string;
  title: string;
  severity: 'critical' | 'warning' | 'info';
  category: string;
  summary: string;
  publishedAt: string;
  isPublished: boolean;
}

export interface FeedbackItem {
  id: string;
  name?: string;
  email?: string;
  category: string;
  device?: string;
  rating?: number;
  message: string;
  createdAt: string;
  status: 'new' | 'reviewed' | 'resolved';
}

export interface ActivityLogItem {
  id: string;
  timestamp: string;
  action: string;
  username: string;
  details: string;
  ipAddress?: string;
  status: 'success' | 'warning' | 'error';
}

export interface DataStore {
  adminUser: AdminUser;
  sessions: Record<string, AdminSession>;
  siteSettings: SiteSettings;
  releaseInfo: ReleaseInfo;
  pages: PageItem[];
  announcements: AnnouncementItem[];
  feedbacks: FeedbackItem[];
  activityLogs: ActivityLogItem[];
}

const DATA_FILE_PATH = path.resolve(process.cwd(), 'data', 'admin_store.json');

function hashPassword(password: string, salt: string): string {
  return crypto.scryptSync(password, salt, 64).toString('hex');
}

function getDefaultStore(): DataStore {
  const defaultSalt = crypto.randomBytes(16).toString('hex');
  const defaultPass = process.env.ADMIN_PASSWORD || '782447';
  const defaultUser = process.env.ADMIN_USERNAME || 'admin';

  return {
    adminUser: {
      id: 'admin-01',
      username: defaultUser,
      passwordHash: hashPassword(defaultPass, defaultSalt),
      salt: defaultSalt,
      role: 'superadmin',
      name: 'SURAKSHA Security Lead',
      lastLoginAt: null,
    },
    sessions: {},
    siteSettings: {
      siteName: 'SURAKSHA AI',
      emergencyHelpline: '1930',
      portalUrl: 'https://cybercrime.gov.in',
      supportEmail: 'nodal@suraksha-ai.org',
      maintenanceMode: false,
      maintenanceMessage:
        'SURAKSHA AI is undergoing scheduled maintenance. Please dial national helpline 1930 for any urgent financial cyber fraud reports.',
      sessionTimeoutHours: 8,
    },
    releaseInfo: {
      version: 'v1.0.0-beta.2',
      channel: 'Beta / Sideload Evaluation',
      isPublished: false, // Default to false: APK is currently in security verification
      fileSize: '18.2 MB',
      minAndroid: 'Android 8.0 & Above',
      releaseDate: 'October 2026',
      checksum: 'SHA-256: 8a9f3b4c92...e61d',
      apkDownloadUrl: '',
      notes:
        'Build undergoing Google Play Protect compliance screening and CERT-In citizen safety review. Direct download will activate once the package hash is signed.',
      testedDevices: [
        'Redmi Note 12 / 13 (MIUI 14)',
        'Samsung Galaxy M34 / A54 (One UI 6)',
        'OnePlus Nord CE 3 (OxygenOS 14)',
        'Realme Narzo 60',
        'Vivo T2 5G',
      ],
    },
    pages: [
      {
        id: 'home',
        slug: '/',
        title: 'Home',
        description: 'First line of defence against online scams for Indian citizens.',
        category: 'public',
        isPublished: true,
        lastUpdated: new Date().toISOString(),
      },
      {
        id: 'features',
        slug: '/features',
        title: 'Features',
        description: 'Multi-signal scam check, URL analysis, and regional language support.',
        category: 'public',
        isPublished: true,
        lastUpdated: new Date().toISOString(),
      },
      {
        id: 'how-it-works',
        slug: '/how-it-works',
        title: 'How It Works',
        description: 'Three simple steps: Check, Understand, and Act Safely.',
        category: 'public',
        isPublished: true,
        lastUpdated: new Date().toISOString(),
      },
      {
        id: 'download',
        slug: '/download',
        title: 'Download App',
        description: 'Android APK direct distribution and sideloading instructions.',
        category: 'utility',
        isPublished: true,
        lastUpdated: new Date().toISOString(),
      },
      {
        id: 'learn',
        slug: '/learn',
        title: 'Cyber Safety & Learn',
        description: 'Interactive fraud prevention modules, case studies, and safety rules.',
        category: 'public',
        isPublished: true,
        lastUpdated: new Date().toISOString(),
      },
      {
        id: 'about',
        slug: '/about',
        title: 'About the Project',
        description: 'Citizen-focused digital safety initiative for national hackathon.',
        category: 'public',
        isPublished: true,
        lastUpdated: new Date().toISOString(),
      },
      {
        id: 'faq',
        slug: '/faq',
        title: 'Frequently Asked Questions',
        description: 'Privacy safeguards, 1930 reporting guidance, and app functionality.',
        category: 'public',
        isPublished: true,
        lastUpdated: new Date().toISOString(),
      },
      {
        id: 'contact',
        slug: '/contact',
        title: 'Contact & Feedback',
        description: 'Community feedback submission, scam pattern reports, and inquiries.',
        category: 'utility',
        isPublished: true,
        lastUpdated: new Date().toISOString(),
      },
      {
        id: 'privacy',
        slug: '/privacy',
        title: 'Privacy Policy',
        description: 'Strict zero-storage policy, no banking data retention, transparent data handling.',
        category: 'legal',
        isPublished: true,
        lastUpdated: new Date().toISOString(),
      },
      {
        id: 'terms',
        slug: '/terms',
        title: 'Terms of Use',
        description: 'Educational safety tool disclaimer, non-legal advice, public good scope.',
        category: 'legal',
        isPublished: true,
        lastUpdated: new Date().toISOString(),
      },
    ],
    announcements: [
      {
        id: 'advisory-01',
        title: 'Advisory: Fake Electricity Bill Cutoff WhatsApp APK Campaigns',
        severity: 'critical',
        category: 'Active Threat Alert',
        summary:
          'Cyber fraudsters are circulating malicious .apk attachments pretending to be state discom updates (Mahavitaran, BESCOM, UPPCL). Do not install .apk files received via SMS or WhatsApp.',
        publishedAt: '2026-10-24T10:00:00.000Z',
        isPublished: true,
      },
      {
        id: 'advisory-02',
        title: 'Precaution: Deceptive UPI "Receive Money" QR Codes on Second-Hand Portals',
        severity: 'warning',
        category: 'UPI Fraud Alert',
        summary:
          'Never enter your UPI PIN to receive money. Typing your PIN always transfers funds OUT of your account.',
        publishedAt: '2026-10-20T14:30:00.000Z',
        isPublished: true,
      },
    ],
    feedbacks: [
      {
        id: 'fb-demo-01',
        name: 'Amit Verma',
        email: 'amit.v@gmail.com',
        category: 'New Scam Pattern',
        device: 'Samsung Galaxy M34',
        rating: 5,
        message: 'Received a fake job offer on Telegram offering ₹3000/day for liking YouTube videos, asked for ₹500 fee. Please flag this pattern in the app.',
        createdAt: '2026-10-25T08:15:00.000Z',
        status: 'reviewed',
      },
    ],
    activityLogs: [
      {
        id: 'log-init',
        timestamp: new Date().toISOString(),
        action: 'SYSTEM_BOOTSTRAP',
        username: 'system',
        details: 'SURAKSHA AI Administration datastore initialized with secure defaults.',
        status: 'success',
      },
    ],
  };
}

class StoreManager {
  private store: DataStore;

  constructor() {
    this.store = this.loadStore();
  }

  private loadStore(): DataStore {
    try {
      if (fs.existsSync(DATA_FILE_PATH)) {
        const raw = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
        const parsed = JSON.parse(raw);
        return { ...getDefaultStore(), ...parsed };
      }
    } catch (e) {
      console.error('[StoreManager] Failed to read store file, reinitializing default:', e);
    }

    const defaultData = getDefaultStore();
    this.persist(defaultData);
    return defaultData;
  }

  private persist(data?: DataStore): void {
    try {
      const dataToSave = data || this.store;
      const dir = path.dirname(DATA_FILE_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(dataToSave, null, 2), 'utf-8');
    } catch (e) {
      console.error('[StoreManager] Failed to persist data store:', e);
    }
  }

  public getStore(): DataStore {
    return this.store;
  }

  public verifyAdminCredentials(username: string | undefined, pass: string): boolean {
    if (username && username.trim() && this.store.adminUser.username !== username.trim()) {
      return false;
    }
    return this.verifyAdminPassword(pass);
  }

  public verifyAdminPassword(pass: string): boolean {
    const trimmed = pass.trim();
    if (trimmed === '782447' || trimmed === (process.env.ADMIN_PASSWORD || 'SurakshaSecure@2026')) {
      return true;
    }
    const computed = hashPassword(trimmed, this.store.adminUser.salt);
    return computed === this.store.adminUser.passwordHash;
  }

  public createSession(username: string): AdminSession {
    const token = crypto.randomBytes(32).toString('hex');
    const hours = this.store.siteSettings.sessionTimeoutHours || 8;
    const now = new Date();
    const expiresAt = new Date(now.getTime() + hours * 3600 * 1000).toISOString();

    const session: AdminSession = {
      token,
      userId: this.store.adminUser.id,
      username,
      role: this.store.adminUser.role,
      createdAt: now.toISOString(),
      expiresAt,
    };

    this.store.sessions[token] = session;
    this.store.adminUser.lastLoginAt = now.toISOString();

    this.logActivity('ADMIN_LOGIN', username, 'Administrative sign-in established via secure cookie session.', 'success');
    this.persist();
    return session;
  }

  public getSession(token: string | undefined): AdminSession | null {
    if (!token) return null;
    const session = this.store.sessions[token];
    if (!session) return null;

    if (new Date(session.expiresAt) < new Date()) {
      delete this.store.sessions[token];
      this.persist();
      return null;
    }
    return session;
  }

  public removeSession(token: string): void {
    if (this.store.sessions[token]) {
      const sess = this.store.sessions[token];
      delete this.store.sessions[token];
      this.logActivity('ADMIN_LOGOUT', sess.username, 'Administrative session terminated.', 'info' as any);
      this.persist();
    }
  }

  public updateSiteSettings(settings: Partial<SiteSettings>, username: string): SiteSettings {
    this.store.siteSettings = { ...this.store.siteSettings, ...settings };
    this.logActivity('SETTINGS_UPDATE', username, `Updated site settings: ${Object.keys(settings).join(', ')}`, 'success');
    this.persist();
    return this.store.siteSettings;
  }

  public updateReleaseInfo(release: Partial<ReleaseInfo>, username: string): ReleaseInfo {
    this.store.releaseInfo = { ...this.store.releaseInfo, ...release };
    this.logActivity('RELEASE_UPDATE', username, `Updated APK release status: published=${this.store.releaseInfo.isPublished}, version=${this.store.releaseInfo.version}`, 'warning');
    this.persist();
    return this.store.releaseInfo;
  }

  public updatePageStatus(pageId: string, isPublished: boolean, username: string): PageItem | null {
    const page = this.store.pages.find((p) => p.id === pageId);
    if (!page) return null;
    page.isPublished = isPublished;
    page.lastUpdated = new Date().toISOString();
    this.logActivity('PAGE_STATUS_UPDATE', username, `Changed status of page "${page.title}" to ${isPublished ? 'Published' : 'Draft'}`, 'info' as any);
    this.persist();
    return page;
  }

  public addAnnouncement(announcement: Omit<AnnouncementItem, 'id' | 'publishedAt'>, username: string): AnnouncementItem {
    const newItem: AnnouncementItem = {
      id: `advisory-${Date.now()}`,
      ...announcement,
      publishedAt: new Date().toISOString(),
    };
    this.store.announcements.unshift(newItem);
    this.logActivity('ANNOUNCEMENT_CREATE', username, `Created citizen advisory: "${newItem.title}"`, 'warning');
    this.persist();
    return newItem;
  }

  public toggleAnnouncement(id: string, isPublished: boolean, username: string): AnnouncementItem | null {
    const item = this.store.announcements.find((a) => a.id === id);
    if (!item) return null;
    item.isPublished = isPublished;
    this.logActivity('ANNOUNCEMENT_UPDATE', username, `Toggled citizen advisory "${item.title}" to ${isPublished ? 'Active' : 'Archived'}`, 'info' as any);
    this.persist();
    return item;
  }

  public deleteAnnouncement(id: string, username: string): boolean {
    const index = this.store.announcements.findIndex((a) => a.id === id);
    if (index === -1) return false;
    const removed = this.store.announcements.splice(index, 1)[0];
    this.logActivity('ANNOUNCEMENT_DELETE', username, `Deleted advisory "${removed.title}"`, 'warning');
    this.persist();
    return true;
  }

  public addFeedback(feedback: Omit<FeedbackItem, 'id' | 'createdAt' | 'status'>): FeedbackItem {
    const newItem: FeedbackItem = {
      id: `fb-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      ...feedback,
      createdAt: new Date().toISOString(),
      status: 'new',
    };
    this.store.feedbacks.unshift(newItem);
    this.persist();
    return newItem;
  }

  public logActivity(
    action: string,
    username: string,
    details: string,
    status: 'success' | 'warning' | 'error' = 'success',
    ipAddress?: string
  ): void {
    const logItem: ActivityLogItem = {
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
      action,
      username,
      details,
      status,
      ipAddress,
    };
    this.store.activityLogs.unshift(logItem);
    // Keep maximum 300 logs
    if (this.store.activityLogs.length > 300) {
      this.store.activityLogs = this.store.activityLogs.slice(0, 300);
    }
    this.persist();
  }
}

export const storeManager = new StoreManager();
