"use client";

import type { CuratedTrack } from "@/types";

type Props = {
  track: CuratedTrack;
  /** Disc diameter in pixels. */
  size: number;
  /** When true, the disc spins (CSS animation). */
  spinning?: boolean;
  /** Subtle outer ring color. Defaults to black. */
  color?: string;
};

/**
 * A single vinyl record viewed from above. Pure visual — no interaction.
 * Composed of: outer disc (black) + concentric grooves + circular album-art label.
 * Spinning is driven by CSS animation toggled with `animation-play-state`.
 */
export default function Vinyl({ track, size, spinning = false, color = "#0a0a0a" }: Props) {
  const labelSize = Math.round(size * 0.38);
  const grooveStops = [0.94, 0.86, 0.78, 0.7, 0.62, 0.54];

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        flexShrink: 0,
        animation: "vinyl-spin 1.8s linear infinite",
        animationPlayState: spinning ? "running" : "paused",
      }}
    >
      {/* Concentric groove rings */}
      {grooveStops.map((s) => (
        <div
          key={s}
          style={{
            position: "absolute",
            inset: `${(1 - s) * 50}%`,
            borderRadius: "50%",
            border: "1px solid rgb(255 255 255 / 0.06)",
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Album-art label */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: labelSize,
          height: labelSize,
          borderRadius: "50%",
          overflow: "hidden",
          background: "var(--surface-raised)",
        }}
      >
        <img
          src={track.albumImage}
          alt={`${track.title} album art`}
          width={labelSize}
          height={labelSize}
          draggable={false}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            userSelect: "none",
          }}
        />
        {/* Spindle hole */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: Math.max(4, size * 0.012),
            height: Math.max(4, size * 0.012),
            borderRadius: "50%",
            background: color,
          }}
        />
      </div>

      <style>{`
        @keyframes vinyl-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
