import React, { useMemo } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { IconCode, IconHistory, IconLogout, IconSparkles } from "./Icons";

/** PUBLIC_INTERFACE */
export function AppLayout({ children }) {
  /** Shell layout used by authenticated pages. */
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const pageMeta = useMemo(() => {
    const p = location.pathname;
    if (p.startsWith("/history")) return { title: "Review history", subtitle: "Browse your previous code reviews." };
    if (p.startsWith("/review/")) return { title: "Review details", subtitle: "See structured feedback and suggestions." };
    return { title: "New review", subtitle: "Submit code and get AI-powered feedback." };
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="appShell">
      <aside className="sidebar" aria-label="Sidebar navigation">
        <div className="brand">
          <div className="brandTitle">
            <strong>AI Code Review</strong>
            <span>Modern lightweight UI</span>
          </div>
          <span className="pill">Light</span>
        </div>

        <nav className="navGroup" aria-label="Primary">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `navItem ${isActive ? "navItemActive" : ""}`}
          >
            <span className="navIcon">
              <IconSparkles />
            </span>
            New review
          </NavLink>

          <NavLink
            to="/history"
            className={({ isActive }) => `navItem ${isActive ? "navItemActive" : ""}`}
          >
            <span className="navIcon">
              <IconHistory />
            </span>
            History
          </NavLink>
        </nav>

        <div className="sidebarFooter">
          <div className="userCard">
            <strong>{user?.name || user?.email || "Signed in"}</strong>
            <span>{user?.email || "Authenticated session"}</span>
          </div>

          <button className="btn btnDanger" onClick={handleLogout} type="button">
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <IconLogout />
              Sign out
            </span>
          </button>

          <div style={{ display: "flex", gap: 8, alignItems: "center", color: "#64748b", fontSize: 12 }}>
            <IconCode />
            Token auth enabled
          </div>
        </div>
      </aside>

      <section className="main">
        <header className="topbar" aria-label="Top bar">
          <div className="topbarTitle">
            <h1>{pageMeta.title}</h1>
            <p>{pageMeta.subtitle}</p>
          </div>

          <div className="topbarActions">
            <NavLink to="/history" className="btn" type="button">
              History
            </NavLink>
            <NavLink to="/" className="btn btnPrimary" type="button">
              New review
            </NavLink>
          </div>
        </header>

        <main className="content">{children}</main>
      </section>
    </div>
  );
}
