import React from "react";

function baseProps({ size = 18 } = {}) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
  };
}

/** PUBLIC_INTERFACE */
export function IconSparkles(props) {
  /** Decorative icon. */
  return (
    <svg {...baseProps(props)} aria-hidden="true">
      <path
        d="M12 2l1.2 4.2L17.4 8 13.2 9.2 12 13.4 10.8 9.2 6.6 8l4.2-1.8L12 2z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M19.2 12l.7 2.4 2.4.7-2.4.7-.7 2.4-.7-2.4-2.4-.7 2.4-.7.7-2.4z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M5 13l.9 3.2L9.1 17l-3.2.9L5 21l-.9-3.1L1 17l3.1-.8L5 13z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** PUBLIC_INTERFACE */
export function IconHistory(props) {
  /** Decorative icon. */
  return (
    <svg {...baseProps(props)} aria-hidden="true">
      <path
        d="M3 12a9 9 0 1 0 3-6.7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path d="M3 4v5h5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path
        d="M12 7v5l3 2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** PUBLIC_INTERFACE */
export function IconCode(props) {
  /** Decorative icon. */
  return (
    <svg {...baseProps(props)} aria-hidden="true">
      <path
        d="M9 18l-6-6 6-6M15 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** PUBLIC_INTERFACE */
export function IconLogout(props) {
  /** Decorative icon. */
  return (
    <svg {...baseProps(props)} aria-hidden="true">
      <path
        d="M10 17l-1 0a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4h1"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M16 7l4 5-4 5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 12H10"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** PUBLIC_INTERFACE */
export function IconLogin(props) {
  /** Decorative icon. */
  return (
    <svg {...baseProps(props)} aria-hidden="true">
      <path
        d="M14 7h1a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4h-1"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M10 17l-4-5 4-5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 12h8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}
