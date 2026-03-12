import React, { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { IconLogin } from "../components/Icons";

/** PUBLIC_INTERFACE */
export function LoginPage() {
  /** Login screen. */
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = useMemo(() => location.state?.from || "/", [location.state]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login({ email, password });
      navigate(from, { replace: true });
    } catch (err) {
      setError(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 520, margin: "40px auto", padding: "0 16px" }}>
      <div className="card">
        <div className="cardHeader">
          <h2 style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <IconLogin /> Sign in
          </h2>
          <span>Use your account to view history</span>
        </div>
        <div className="cardBody">
          {error ? <div className="alert alertError">{error}</div> : null}

          <form onSubmit={onSubmit}>
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
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <div className="btnRow" style={{ marginTop: 12 }}>
              <button className="btn btnPrimary" type="submit" disabled={loading}>
                {loading ? "Signing in…" : "Sign in"}
              </button>
              <Link className="btn btnGhost" to="/signup">
                Create account
              </Link>
            </div>

            <div style={{ marginTop: 14, color: "#64748b", fontSize: 12, lineHeight: 1.5 }}>
              Backend token is stored in localStorage and sent as <code>Authorization: Bearer …</code>.
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
