import React, { useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { IconHistory, IconSparkles } from "./Icons";

/** PUBLIC_INTERFACE */
export function AppLayout({ children }) {
  /** Shell layout used by application pages (no authentication). */
  const location = useLocation();

  const pageMeta = useMemo(() => {
    const p = location.pathname;
    if (p.startsWith("/history")) return { title: "Review history", subtitle: "Browse previous code reviews." };
    if (p.startsWith("/review/")) return { title: "Review details", subtitle: "See structured feedback and suggestions." };
    return { title: "New review", subtitle: "Submit code and get AI-powered feedback." };
  }, [location.pathname]);

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
          <NavLink to="/" end className={({ isActive }) => `navItem ${isActive ? "navItemActive" : ""}`}>
            <span className="navIcon">
              <IconSparkles />
            </span>
            New review
          </NavLink>

          <NavLink to="/history" className={({ isActive }) => `navItem ${isActive ? "navItemActive" : ""}`}>
            <span className="navIcon">
              <IconHistory />
            </span>
            History
          </NavLink>
        </nav>

        <div className="sidebarFooter">
          <div style={{ color: "#64748b", fontSize: 12, lineHeight: 1.4 }}>
            Authentication disabled.
            <br />
            Reviews are accessed directly.
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
