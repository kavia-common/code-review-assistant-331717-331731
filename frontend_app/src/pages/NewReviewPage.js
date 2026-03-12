import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiCreateReview } from "../services/api";

const LANGUAGES = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C#",
  "Go",
  "Ruby",
  "PHP",
  "C++",
  "C",
  "Rust",
  "Kotlin",
  "Swift",
];

/** Render best-effort "structured feedback". */
function renderReviewPayload(payload) {
  if (!payload) return null;

  // If backend returns {review, result} etc.
  const result = payload.result || payload.reviewResult || payload.data || payload;

  // Common fields
  const summary = result.summary || result.overview || result.feedbackSummary;
  const issues = result.issues || result.findings || result.problems;
  const suggestions = result.suggestions || result.improvements;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {summary ? (
        <div>
          <div style={{ fontSize: 12, color: "#64748b", marginBottom: 6 }}>Summary</div>
          <div className="codeBlock" style={{ fontFamily: "Inter, system-ui", fontSize: 13 }}>
            {String(summary)}
          </div>
        </div>
      ) : null}

      {Array.isArray(issues) ? (
        <div>
          <div style={{ fontSize: 12, color: "#64748b", marginBottom: 6 }}>Issues</div>
          <div className="card" style={{ boxShadow: "none" }}>
            <div className="cardBody">
              {issues.length === 0 ? (
                <span className="badge badgeOk">No issues detected</span>
              ) : (
                <ul style={{ margin: 0, paddingLeft: 18 }}>
                  {issues.map((it, idx) => (
                    <li key={idx} style={{ marginBottom: 6, fontSize: 13 }}>
                      {typeof it === "string" ? it : JSON.stringify(it)}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      ) : null}

      {Array.isArray(suggestions) ? (
        <div>
          <div style={{ fontSize: 12, color: "#64748b", marginBottom: 6 }}>Suggestions</div>
          <div className="card" style={{ boxShadow: "none" }}>
            <div className="cardBody">
              {suggestions.length === 0 ? (
                <span className="badge badgeOk">No suggestions</span>
              ) : (
                <ul style={{ margin: 0, paddingLeft: 18 }}>
                  {suggestions.map((it, idx) => (
                    <li key={idx} style={{ marginBottom: 6, fontSize: 13 }}>
                      {typeof it === "string" ? it : JSON.stringify(it)}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      ) : null}

      {/* Fallback raw JSON */}
      <div>
        <div style={{ fontSize: 12, color: "#64748b", marginBottom: 6 }}>Raw response</div>
        <div className="codeBlock">{JSON.stringify(payload, null, 2)}</div>
      </div>
    </div>
  );
}

/** PUBLIC_INTERFACE */
export function NewReviewPage() {
  /** New review submission screen. */
  const navigate = useNavigate();

  const [language, setLanguage] = useState("JavaScript");
  const [code, setCode] = useState(
    `function sum(a, b){\n  return a+b\n}\n\nconsole.log(sum(1,2))\n`
  );

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const canSubmit = useMemo(() => code.trim().length > 0 && !!language, [code, language]);

  const onSubmit = async () => {
    setError("");
    setSubmitting(true);
    setResult(null);
    try {
      const data = await apiCreateReview({ language, code });
      setResult(data);

      // If backend returns an id, offer navigation to details/history.
      const id = data?.id || data?.reviewId || data?.review?.id;
      if (id) {
        // non-blocking UX: show result but also allow jumping
      }
    } catch (err) {
      setError(err?.message || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  const goHistory = () => navigate("/history");

  return (
    <div className="grid2">
      <div className="card">
        <div className="cardHeader">
          <h2>Submit code</h2>
          <span>Language + code</span>
        </div>
        <div className="cardBody">
          {error ? <div className="alert alertError">{error}</div> : null}

          <div className="field">
            <div className="labelRow">
              <label htmlFor="language">Programming language</label>
              <span className="hint">Required</span>
            </div>
            <select
              id="language"
              className="select"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              {LANGUAGES.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <div className="labelRow">
              <label htmlFor="code">Code</label>
              <span className="hint">Paste or type code to review</span>
            </div>
            <textarea
              id="code"
              className="textarea"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
            />
          </div>

          <div className="btnRow">
            <button className="btn btnPrimary" type="button" onClick={onSubmit} disabled={!canSubmit || submitting}>
              {submitting ? "Reviewing…" : "Run AI review"}
            </button>
            <button className="btn" type="button" onClick={goHistory}>
              View history
            </button>
          </div>

          <div style={{ marginTop: 12, color: "#64748b", fontSize: 12, lineHeight: 1.5 }}>
            If you see 401/403 errors, your token may be invalid—sign out and log in again.
          </div>
        </div>
      </div>

      <div className="card">
        <div className="cardHeader">
          <h2>Review results</h2>
          <span>{submitting ? "Working…" : result ? "Ready" : "Awaiting submission"}</span>
        </div>
        <div className="cardBody">
          {submitting ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div className="skeleton" style={{ width: "55%" }} />
              <div className="skeleton" style={{ width: "88%" }} />
              <div className="skeleton" style={{ width: "75%" }} />
              <div className="skeleton" style={{ width: "92%" }} />
              <div className="skeleton" style={{ width: "65%" }} />
            </div>
          ) : result ? (
            renderReviewPayload(result)
          ) : (
            <div className="alert alertInfo">
              Submit code to receive structured feedback, issues, and suggestions.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
