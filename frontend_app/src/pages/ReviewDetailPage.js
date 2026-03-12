import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiGetReview } from "../services/api";

function JsonBlock({ value }) {
  return <div className="codeBlock">{JSON.stringify(value, null, 2)}</div>;
}

/** PUBLIC_INTERFACE */
export function ReviewDetailPage() {
  /** Shows a single review by id. */
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError("");
    setData(null);

    apiGetReview(id)
      .then((resp) => {
        if (!alive) return;
        setData(resp);
      })
      .catch((err) => {
        if (!alive) return;
        setError(err?.message || "Failed to load review");
      })
      .finally(() => {
        if (!alive) return;
        setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [id]);

  const review = data?.review || data;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div className="btnRow">
        <Link to="/history" className="btn">
          Back to history
        </Link>
        <Link to="/" className="btn btnPrimary">
          New review
        </Link>
      </div>

      <div className="card">
        <div className="cardHeader">
          <h2>Review metadata</h2>
          <span>ID: {id}</span>
        </div>
        <div className="cardBody">
          {error ? <div className="alert alertError">{error}</div> : null}

          {loading ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div className="skeleton" style={{ width: "40%" }} />
              <div className="skeleton" style={{ width: "70%" }} />
              <div className="skeleton" style={{ width: "55%" }} />
            </div>
          ) : review ? (
            <div>
              <div className="kvRow">
                <div className="k">Language</div>
                <div className="v">{review.language || review.lang || "—"}</div>
              </div>
              <div className="kvRow">
                <div className="k">Created</div>
                <div className="v">
                  {review.createdAt || review.created_at
                    ? new Date(review.createdAt || review.created_at).toLocaleString()
                    : "—"}
                </div>
              </div>
              <div className="kvRow">
                <div className="k">Status</div>
                <div className="v">{String(review.status || "ok")}</div>
              </div>

              {review.code ? (
                <div style={{ marginTop: 12 }}>
                  <div style={{ fontSize: 12, color: "#64748b", marginBottom: 6 }}>Submitted code</div>
                  <div className="codeBlock">{String(review.code)}</div>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="alert alertInfo">No data returned for this review.</div>
          )}
        </div>
      </div>

      <div className="card">
        <div className="cardHeader">
          <h2>Full response</h2>
          <span>Raw JSON</span>
        </div>
        <div className="cardBody">{loading ? <div className="skeleton" style={{ width: "95%", height: 220 }} /> : <JsonBlock value={data} />}</div>
      </div>
    </div>
  );
}
