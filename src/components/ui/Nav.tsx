"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { List, X } from "@phosphor-icons/react";

const internalLinks = [
  { href: "/design",   label: "Work" },
  { href: "/creative", label: "Play" },
  { href: "/about",    label: "About" },
];

const externalLinks = [
  { href: "https://github.com/Devansh-Khajanchi", label: "GitHub" },
  { href: "/devansh-khajanchi-resume-2026.pdf",    label: "Resume" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <>
      {/* ── Bar ─────────────────────────────────────────────────────── */}
      <nav className="fixed inset-x-0 top-0 z-sticky h-[var(--height-nav)] flex items-center justify-between px-6 md:px-8 lg:px-12 border-b border-border bg-background">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="no-underline text-foreground flex items-center gap-3"
        >
          <svg viewBox="0 0 500 500" className="h-6 w-6 fill-current" aria-hidden>
            <path d="M0,0v497.2v2.8c138.1,0,250-111.9,250-250S138.1,0,0,0z" />
            <polygon points="250,250 500,500 500,0" />
          </svg>
          <span className="font-semibold tracking-tight text-sm">Devansh Khajanchi</span>
        </Link>

        {/* Desktop links — hidden below md */}
        <div className="hidden md:flex items-center gap-6">
          {internalLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`no-underline text-sm ${isActive(href) ? "text-primary font-medium" : "text-foreground-muted font-normal"}`}
            >
              {label}
            </Link>
          ))}
          {externalLinks.map(({ href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline text-sm text-foreground-muted font-normal"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Hamburger — visible below md */}
        <button
          className="md:hidden flex items-center justify-center text-foreground"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
        </button>
      </nav>

      {/* ── Mobile menu ─────────────────────────────────────────────── */}
      {open && (
        <div className="fixed inset-x-0 top-[var(--height-nav)] bottom-0 z-overlay bg-background flex flex-col px-6 pt-10 pb-8 md:hidden">
          <div className="flex flex-col gap-6">
            {internalLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`no-underline text-4xl font-bold tracking-tight leading-none ${isActive(href) ? "text-primary" : "text-foreground"}`}
              >
                {label}
              </Link>
            ))}
          </div>
          <div className="mt-auto flex gap-6">
            {externalLinks.map(({ href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline text-sm text-foreground-muted"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
