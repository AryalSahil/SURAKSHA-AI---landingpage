/**
 * Resilient API client for SURAKSHA AI.
 * Handles safe JSON deserialization, auth tokens across iframe contexts, and clean error messages.
 * Prevents "Failed to execute 'json' on 'Response': Unexpected end of JSON input".
 */

const TOKEN_KEY = 'suraksha_admin_token';

export function getAdminToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setAdminToken(token: string): void {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch {
    // ignore local storage restrictions
  }
}

export function removeAdminToken(): void {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {
    // ignore
  }
}

export interface ApiFetchOptions extends RequestInit {
  timeoutMs?: number;
}

export async function apiFetch<T = any>(url: string, options: ApiFetchOptions = {}): Promise<T> {
  const token = getAdminToken();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const fetchOptions: RequestInit = {
    ...options,
    headers,
    credentials: 'include', // Ensures cookies are transmitted
  };

  let response: Response;
  try {
    response = await fetch(url, fetchOptions);
  } catch (netErr: any) {
    throw new Error(netErr?.message || 'Network error: Unable to connect to server.');
  }

  // Read response safely as text first to prevent unexpected end of JSON input
  const responseText = await response.text();

  let parsedData: any = null;
  if (responseText && responseText.trim().length > 0) {
    try {
      parsedData = JSON.parse(responseText);
    } catch {
      // In case server returned HTML or plain string
      parsedData = { message: responseText };
    }
  } else {
    parsedData = {};
  }

  if (!response.ok) {
    const errorMsg =
      parsedData?.error ||
      parsedData?.message ||
      `Request failed with status ${response.status} (${response.statusText || 'Error'})`;
    throw new Error(errorMsg);
  }

  return parsedData as T;
}
