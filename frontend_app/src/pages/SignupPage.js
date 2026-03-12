import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

/** PUBLIC_INTERFACE */
export function SignupPage() {
  /** Signup screen. */
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signup({ name, email, password });
      navigate("/", { replace: true });
    } catch (err) {
      setError(err?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 520, margin: "40px auto", padding: "0 16px" }}>
      <div className="card">
        <div className="cardHeader">
          <h2>Create account</h2>
          <span>Start reviewing code in minutes</span>
        </div>
        <div className="cardBody">
          {error ? <div className="alert alertError">{error}</div> : null}

          <form onSubmit={onSubmit}>
            <div className="field">
              <div className="labelRow">
                <label htmlFor="name">Name</label>
                <span className="hint">Optional</span>
              </div>
              <input
                id="name"
                className="input"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Developer"
              />
            </div>

            <div className="field">
              <div className="labelRow">
                <label htmlFor="email">Email</label>
                <span className="hint">Required</span>
              </div>
              <input
                id="email"
                className="input"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
              />
            </div>

            <div className="field">
              <div className="labelRow">
                <label htmlFor="password">Password</label>
                <span className="hint">Required</span>
              </div>
              <input
                id="password"
                className="input"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Choose a strong password"
                required
              />
            </div>

            <div className="btnRow" style={{ marginTop: 12 }}>
              <button className="btn btnPrimary" type="submit" disabled={loading}>
                {loading ? "Creating…" : "Create account"}
              </button>
              <Link className="btn btnGhost" to="/login">
                Back to login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
