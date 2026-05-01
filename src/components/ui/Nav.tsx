"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { List, X } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";

type NavLink = { href: string; label: string; external?: boolean };

const navLinks: NavLink[] = [
  { href: "/",                                      label: "Work" },
  { href: "/creative",                              label: "Play" },
  { href: "https://github.com/Devansh-Khajanchi",   label: "Github", external: true },
  { href: "/about",                                 label: "About" },
  { href: "/devansh-khajanchi-resume-2026.pdf",     label: "Resume", external: true },
];

const SNAPPY_EASE = [0.32, 0.72, 0, 1] as const;

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* ── Bar ─────────────────────────────────────────────────────── */}
      <nav className="fixed inset-x-0 top-0 z-sticky h-[var(--height-nav)] flex items-center justify-between px-6 md:px-8 lg:px-12 bg-transparent">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="no-underline text-foreground flex items-center gap-3"
          aria-label="Devansh Khajanchi — Home"
        >
          <svg viewBox="0 0 500 500" className="h-7 w-7 fill-current" aria-hidden>
            <path d="M0,0v497.2v2.8c138.1,0,250-111.9,250-250S138.1,0,0,0z" />
            <polygon points="250,250 500,500 500,0" />
          </svg>
        </Link>

        {/* Desktop links — hidden below md */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map(({ href, label, external }) =>
            external ? (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline text-base text-foreground-muted font-normal"
              >
                {label}
              </a>
            ) : (
              <Link
                key={label}
                href={href}
                className={`no-underline text-base ${isActive(href) ? "text-primary font-medium" : "text-foreground-muted font-normal"}`}
              >
                {label}
              </Link>
            ),
          )}
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

      {/* ── Mobile drawer — slides in from the right ────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: SNAPPY_EASE }}
            className="fixed inset-x-0 top-[var(--height-nav)] bottom-0 z-overlay bg-white dark:bg-black flex flex-col px-6 pt-10 pb-8 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map(({ href, label, external }, i) => (
                <motion.div
                  key={label}
                  initial={{ x: 40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    delay: 0.12 + i * 0.04,
                    duration: 0.22,
                    ease: SNAPPY_EASE,
                  }}
                >
                  {external ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setOpen(false)}
                      className="no-underline text-4xl font-bold tracking-tight leading-none text-foreground"
                    >
                      {label}
                    </a>
                  ) : (
                    <Link
                      href={href}
                      onClick={() => setOpen(false)}
                      className={`no-underline text-4xl font-bold tracking-tight leading-none ${isActive(href) ? "text-primary" : "text-foreground"}`}
                    >
                      {label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
