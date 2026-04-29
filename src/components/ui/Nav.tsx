"use client";

import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/design", label: "Design" },
  { href: "/projects", label: "Projects" },
  { href: "/creative", label: "Creative" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  return (
    <nav>
      {links.map(({ href, label }) => (
        <Link key={href} href={href}>
          {label}
        </Link>
      ))}
    </nav>
  );
}
