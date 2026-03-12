/**
 * Centralized configuration access.
 * Do not hardcode deployment URLs; use environment variables.
 */

/** PUBLIC_INTERFACE */
export function getApiBaseUrl() {
  /** Base URL for backend API. Configure in frontend_app environment:
   * REACT_APP_API_BASE_URL=https://<backend-host>:3001
   */
  return (process.env.REACT_APP_API_BASE_URL || "").trim() || window.location.origin;
}
