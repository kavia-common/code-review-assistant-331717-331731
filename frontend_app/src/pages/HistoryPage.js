import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { apiListReviews } from "../services/api";

function badgeForStatus(s) {
  const val = String(s || "").toLowerCase();
  if (val.includes("error") || val.includes("fail")) return "badge badgeErr";
  if (val.includes("warn")) return "badge badgeWarn";
  return "badge badgeOk";
}

/** PUBLIC_INTERFACE */
export function HistoryPage() {
  /** Lists prior reviews for the authenticated user. */
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [rows, setRows] = useState([]);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError("");

    apiListReviews()
      .then((data) => {
        if (!alive) return;
        const list = data?.reviews || data?.items || data || [];
        setRows(Array.isArray(list) ? list : []);
      })
      .catch((err) => {
        if (!alive) return;
        setError(err?.message || "Failed to load history");
      })
      .finally(() => {
        if (!alive) return;
        setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, []);

  const normalized = useMemo(() => {
    return rows.map((r) => {
      const id = r.id || r.reviewId || r._id;
      const createdAt = r.createdAt || r.created_at || r.timestamp;
      const language = r.language || r.lang;
      const status = r.status || r.state || (r.error ? "error" : "ok");
      const title = r.title || r.filename || (language ? `${language} review` : "Review");
      return { raw: r, id, createdAt, language, status, title };
    });
  }, [rows]);

  return (
    <div className="card">
      <div className="cardHeader">
        <h2>Your review history</h2>
        <span>{loading ? "Loading…" : `${normalized.length} item(s)`}</span>
      </div>
      <div className="cardBody">
        {error ? <div className="alert alertError">{error}</div> : null}

        {loading ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div className="skeleton" style={{ width: "95%" }} />
            <div className="skeleton" style={{ width: "90%" }} />
            <div className="skeleton" style={{ width: "92%" }} />
            <div className="skeleton" style={{ width: "88%" }} />
          </div>
        ) : normalized.length === 0 ? (
          <div className="alert alertInfo">No reviews yet. Create a new review to populate history.</div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="table" aria-label="Review history table">
              <thead>
                <tr>
                  <th>Review</th>
                  <th>Language</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {normalized.map((r) => (
                  <tr key={r.id || JSON.stringify(r.raw)}>
                    <td style={{ fontWeight: 700 }}>{r.title}</td>
                    <td>{r.language || "—"}</td>
                    <td>
                      <span className={badgeForStatus(r.status)}>{String(r.status || "ok")}</span>
                    </td>
                    <td>{r.createdAt ? new Date(r.createdAt).toLocaleString() : "—"}</td>
                    <td style={{ textAlign: "right" }}>
                      {r.id ? (
                        <Link className="btn" to={`/review/${encodeURIComponent(r.id)}`}>
                          Open
                        </Link>
                      ) : (
                        <span style={{ color: "#64748b", fontSize: 12 }}>No id</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div style={{ marginTop: 12, color: "#64748b", fontSize: 12 }}>
          If this page errors with 404, the backend may expose a different route than <code>/reviews</code>.
        </div>
      </div>
    </div>
  );
}
