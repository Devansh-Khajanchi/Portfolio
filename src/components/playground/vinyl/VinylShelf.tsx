"use client";

import { SpeakerHigh } from "@phosphor-icons/react";
import type { CuratedTrack } from "@/types";

type Props = {
  tracks: CuratedTrack[];
  activeIdx: number | null;
  isPlaying: boolean;
  onSelect: (idx: number) => void;
};

export default function VinylShelf({ tracks, activeIdx, isPlaying, onSelect }: Props) {
  return (
    <div className="flex flex-col gap-3 h-full">
      <span
        style={{
          fontSize: "var(--text-label)",
          fontFamily: "var(--font-mono)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--foreground-muted)",
          padding: "0 var(--space-1)",
        }}
      >
        Records
      </span>
      <div
        className="flex-1 overflow-y-auto"
        style={{
          paddingRight: "var(--space-1)",
          display: "grid",
          // Auto-fill so cells stay a sensible size on any container width.
          // Desktop (320px shelf) → 2 cols × ~140px. Stacked-mobile (full
          // modal width) → as many ~140px columns as fit.
          gridTemplateColumns: "repeat(auto-fill, minmax(96px, 116px))",
          justifyContent: "start",
          gap: "var(--space-3)",
          alignContent: "start",
        }}
      >
        {tracks.map((t, i) => {
          const isActive = activeIdx === i;
          const isPlayingThis = isActive && isPlaying;
          const playable = Boolean(t.youtubeId);
          return (
            <button
              key={`${t.href}-${i}`}
              type="button"
              onClick={() => onSelect(i)}
              disabled={!playable}
              aria-label={`${t.title} by ${t.artists.join(", ")}`}
              className="flex flex-col gap-2 transition-opacity text-left"
              style={{
                opacity: playable ? 1 : 0.4,
                cursor: playable ? "pointer" : "not-allowed",
              }}
              onMouseEnter={(e) => {
                if (playable) e.currentTarget.style.opacity = "0.85";
              }}
              onMouseLeave={(e) => {
                if (playable) e.currentTarget.style.opacity = "1";
              }}
            >
              <div
                className="relative w-full"
                style={{
                  aspectRatio: "1 / 1",
                  borderRadius: "var(--radius-sm)",
                  overflow: "hidden",
                  background: "var(--surface-raised)",
                  // Currently-playing card pops slightly larger; selected-but-paused
                  // and idle stay at the base size. No outline — the size + speaker
                  // badge are the playing indicators.
                  transform: isPlayingThis ? "scale(1.08)" : "scale(1)",
                  transformOrigin: "center",
                  transition: "transform 220ms cubic-bezier(0.32, 0.72, 0, 1)",
                }}
              >
                <img
                  src={t.albumImage}
                  alt=""
                  draggable={false}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    userSelect: "none",
                  }}
                />
                {isPlayingThis && (
                  <div
                    className="absolute"
                    style={{
                      bottom: 6,
                      right: 6,
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      background: "var(--primary)",
                      color: "var(--primary-foreground)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    aria-hidden
                  >
                    <SpeakerHigh size={12} weight="fill" />
                  </div>
                )}
              </div>
              <div className="flex flex-col px-1" style={{ minWidth: 0, width: "100%" }}>
                <span
                  style={{
                    display: "block",
                    width: "100%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    fontSize: "var(--text-label)",
                    fontWeight: isActive ? "var(--weight-medium)" : "var(--weight-regular)",
                    lineHeight: "var(--leading-tight)",
                    color: "var(--foreground)",
                  }}
                >
                  {t.title}
                </span>
                <span
                  style={{
                    display: "block",
                    width: "100%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    fontSize: "var(--text-label)",
                    color: "var(--foreground-muted)",
                    lineHeight: "var(--leading-tight)",
                  }}
                >
                  {t.artists[0]}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
