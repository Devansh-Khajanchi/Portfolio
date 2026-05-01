"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/New_York",
  hour12: false,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

function formatNow(): string {
  return `${formatter.format(new Date())} EST`;
}

export default function StatusRow() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(formatNow());
    const t0 = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => {
      clearTimeout(t0);
      clearInterval(id);
    };
  }, []);

  return (
    <section
      className="border-y border-border px-6 md:px-8 lg:px-12 py-4 flex items-center justify-between text-foreground-muted"
      style={{
        fontSize: "var(--text-body-sm)",
        lineHeight: "var(--leading-body-sm)",
      }}
    >
      <span>Senior Designer Based in New York City</span>
      <span
        suppressHydrationWarning
        style={{
          fontFamily: "var(--font-mono)",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {time ?? "--:--:-- EST"}
      </span>
    </section>
  );
}
