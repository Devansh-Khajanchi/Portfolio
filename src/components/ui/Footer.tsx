"use client";

import { usePathname } from "next/navigation";
import DarkModeToggle from "@/components/ui/DarkModeToggle";

const links = [
  { label: "LinkedIn", href: "https://linkedin.com/in/devanshkh" },
  { label: "Email",    href: "mailto:devanshkh@gmail.com" },
];

const HIDE_ON: ReadonlyArray<string> = ["/lab/ascii"];

export default function Footer() {
  const pathname = usePathname();
  if (pathname && HIDE_ON.includes(pathname)) return null;

  const year = new Date().getFullYear();

  return (
    <footer
      className="px-6 md:px-8 lg:px-12 pt-12 md:pt-16 lg:pt-20 pb-6 md:pb-8"
      style={{ background: "var(--primary)", color: "var(--grey-950)" }}
    >
      {/* ── Connect ─────────────────────────────────────── */}
      <div className="mb-10 md:mb-16 flex justify-between items-start">
        <div>
          <h3
            className="mb-2"
            style={{
              fontSize: "var(--text-label)",
              fontWeight: "var(--weight-medium)",
              color: "var(--grey-950)",
            }}
          >
            Connect
          </h3>
          <ul className="flex flex-col gap-1">
            {links.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="no-underline"
                  style={{ fontSize: "var(--text-label)", color: "var(--grey-950)" }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <DarkModeToggle />
      </div>

      {/* ── Divider ─────────────────────────────────────── */}
      <div
        className="mb-10 md:mb-16 border-t"
        style={{ borderColor: "var(--grey-950)" }}
      />

      {/* ── Statement ───────────────────────────────────── */}
      <div
        className="mb-12 md:mb-20"
        style={{ containerType: "inline-size" }}
      >
        <h2
          className="text-[14vw] md:text-[9cqi] md:whitespace-nowrap"
          style={{
            fontWeight: "var(--weight-black)",
            lineHeight: 0.85,
            letterSpacing: "-0.04em",
            color: "var(--grey-950)",
          }}
        >
          Every detail matters<span style={{ color: "var(--grey-50)" }}>.</span>
        </h2>
      </div>

      {/* ── Bottom row ──────────────────────────────────── */}
      <div className="flex justify-between items-center">
        <svg
          viewBox="0 0 500 500"
          className="h-7 w-7 md:h-8 md:w-8 fill-current"
          aria-hidden
        >
          <path d="M0,0v497.2v2.8c138.1,0,250-111.9,250-250S138.1,0,0,0z" />
          <polygon points="250,250 500,500 500,0" />
        </svg>
        <span style={{ fontSize: "var(--text-label)", color: "var(--grey-50)" }}>
          © Devansh Khajanchi {year}
        </span>
      </div>
    </footer>
  );
}
