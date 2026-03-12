/**
 * Local storage wrapper for auth token.
 * Kept minimal: stores a single bearer token string.
 */

const TOKEN_KEY = "cra_auth_token";

/** PUBLIC_INTERFACE */
export function getAuthToken() {
  /** Returns stored auth token or empty string. */
  try {
    return localStorage.getItem(TOKEN_KEY) || "";
  } catch {
    return "";
  }
}

/** PUBLIC_INTERFACE */
export function setAuthToken(token) {
  /** Stores auth token (string). */
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch {
    // ignore storage failures (private browsing, etc.)
  }
}

/** PUBLIC_INTERFACE */
export function clearAuthToken() {
  /** Clears stored auth token. */
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {
    // ignore
  }
}
