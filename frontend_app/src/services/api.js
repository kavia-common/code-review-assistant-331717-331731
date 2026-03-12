import { getApiBaseUrl } from "../config";
import { getAuthToken, setAuthToken } from "./authStorage";

/**
 * Normalizes fetch errors to a consistent shape the UI can render.
 */
function toApiError(error, responseBody) {
  if (error?.name === "AbortError") {
    return { message: "Request was cancelled. Please try again." };
  }
  if (error && typeof error === "object" && "message" in error) {
    return { message: error.message, details: responseBody };
  }
  return { message: "Unexpected error", details: responseBody };
}

async function readJsonSafe(res) {
  const contentType = res.headers.get("content-type") || "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return null;
  }
  try {
    return await res.json();
  } catch {
    return null;
  }
}

async function request(path, { method = "GET", body, token, signal } = {}) {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;

  const authToken = token ?? getAuthToken();

  const headers = {
    Accept: "application/json",
  };

  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
  }
  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  let res;
  try {
    res = await fetch(url, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
      signal,
    });
  } catch (e) {
    throw toApiError(e, null);
  }

  const json = await readJsonSafe(res);

  if (!res.ok) {
    const message =
      json?.error ||
      json?.message ||
      `Request failed (${res.status} ${res.statusText || ""})`.trim();
    throw toApiError(new Error(message), json);
  }

  return json;
}

/**
 * NOTE: Backend OpenAPI published at /docs is incomplete (only health endpoint).
 * We implement endpoints per work-item interface list:
 * POST /auth/signup, POST /auth/login, POST /review, GET /reviews, GET /review/:id
 *
 * If the backend uses different paths, update these in one place.
 */

const endpoints = {
  signup: "/auth/signup",
  login: "/auth/login",
  createReview: "/review",
  listReviews: "/reviews",
  getReview: (id) => `/review/${encodeURIComponent(id)}`,
};

/** PUBLIC_INTERFACE */
export async function apiSignup({ email, password, name }) {
  /** Creates a user account. Expected response may include token and user. */
  return request(endpoints.signup, { method: "POST", body: { email, password, name } });
}

/** PUBLIC_INTERFACE */
export async function apiLogin({ email, password }) {
  /** Logs in and stores returned token if present. */
  const data = await request(endpoints.login, { method: "POST", body: { email, password } });

  // Try common token shapes.
  const token = data?.token || data?.accessToken || data?.jwt;
  if (token) setAuthToken(token);

  return data;
}

/** PUBLIC_INTERFACE */
export async function apiCreateReview({ language, code }) {
  /** Submits code for AI review. Requires auth token. */
  return request(endpoints.createReview, { method: "POST", body: { language, code } });
}

/** PUBLIC_INTERFACE */
export async function apiListReviews() {
  /** Fetches the authenticated user's review history. */
  return request(endpoints.listReviews, { method: "GET" });
}

/** PUBLIC_INTERFACE */
export async function apiGetReview(id) {
  /** Fetches a specific review by id. */
  return request(endpoints.getReview(id), { method: "GET" });
}
