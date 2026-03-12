import { getApiBaseUrl } from "../config";

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

async function request(path, { method = "GET", body, signal } = {}) {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;

  const headers = {
    Accept: "application/json",
  };

  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
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
 * Endpoints in use (authentication removed):
 * POST /review, GET /reviews, GET /review/:id
 *
 * If the backend uses different paths, update these in one place.
 */
const endpoints = {
  createReview: "/review",
  listReviews: "/reviews",
  getReview: (id) => `/review/${encodeURIComponent(id)}`,
};

/** PUBLIC_INTERFACE */
export async function apiCreateReview({ language, code }) {
  /** Submits code for AI review. */
  return request(endpoints.createReview, { method: "POST", body: { language, code } });
}

/** PUBLIC_INTERFACE */
export async function apiListReviews() {
  /** Fetches review history. */
  return request(endpoints.listReviews, { method: "GET" });
}

/** PUBLIC_INTERFACE */
export async function apiGetReview(id) {
  /** Fetches a specific review by id. */
  return request(endpoints.getReview(id), { method: "GET" });
}
