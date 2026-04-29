"use client";

import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <button
      onClick={() => setDark((d) => !d)}
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 9999,
        padding: "8px 16px",
        background: dark ? "var(--grey-50)" : "var(--grey-950)",
        color: dark ? "var(--grey-950)" : "var(--grey-50)",
        border: "none",
        borderRadius: "var(--radius-pill)",
        fontSize: 12,
        fontWeight: 600,
        fontFamily: "var(--font-dm-sans)",
        cursor: "pointer",
        letterSpacing: "0.04em",
      }}
    >
      {dark ? "☀ Light" : "☾ Dark"}
    </button>
  );
}
