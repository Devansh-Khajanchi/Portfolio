"use client";

import { useSyncExternalStore } from "react";
import { Sun, Moon } from "@phosphor-icons/react";

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

export default function DarkModeToggle({ className = "" }: { className?: string }) {
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
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className={`flex items-center justify-center ${className}`}
    >
      {dark ? <Sun size={20} weight="regular" /> : <Moon size={20} weight="regular" />}
    </button>
  );
}
