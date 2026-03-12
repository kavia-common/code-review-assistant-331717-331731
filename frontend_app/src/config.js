/**
 * Centralized configuration access.
 * Do not hardcode deployment URLs; use environment variables.
 */

/** PUBLIC_INTERFACE */
export function getApiBaseUrl() {
  /** Base URL for backend API.
   *
   * Important:
   * - The deployment container defines env vars like REACT_APP_API_BASE and/or REACT_APP_BACKEND_URL.
   * - Older code used REACT_APP_API_BASE_URL. We support both to avoid regressions.
   *
   * Examples:
   * - REACT_APP_API_BASE=https://<backend-host>:3001
   * - REACT_APP_BACKEND_URL=https://<backend-host>:3001
   */
  const candidates = [
    process.env.REACT_APP_API_BASE,
    process.env.REACT_APP_BACKEND_URL,
    process.env.REACT_APP_API_BASE_URL, // backward compatible
  ];

  const fromEnv = candidates.find((v) => typeof v === "string" && v.trim().length > 0);
  return (fromEnv || "").trim() || window.location.origin;
}
