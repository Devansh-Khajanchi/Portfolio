"use client";

import { useSyncExternalStore } from "react";

function subscribe(callback: () => void): () => void {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

const getClientSnapshot = () =>
  document.documentElement.classList.contains("dark");

const getServerSnapshot = () => true;

export default function DarkModeToggle() {
  const dark = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // ignore (private mode / storage disabled)
    }
  };

  return (
    <button
      onClick={toggle}
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
