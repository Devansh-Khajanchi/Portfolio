"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "@phosphor-icons/react";
import Vinyl from "./Vinyl";
import ToneArm from "./ToneArm";
import type { CuratedTrack } from "@/types";

// Geometry — tweak in one place. All values in CSS pixels relative to the
// turntable container (top-left origin).
const STAGE_W = 480;
const STAGE_H = 460;
const PLATTER_SIZE = 340;
const PLATTER_CENTER = { x: STAGE_W / 2, y: 230 };
const PIVOT = { x: STAGE_W - 50, y: 60 };
const ARM_LEN = 280;

// Tone arm angles (degrees, atan2 convention: 0° = east, 90° = south)
const ANGLE_PARKED = 75;
const ANGLE_ENGAGED_START = 100; // cartridge at outer groove (song start)
const ANGLE_ENGAGED_END = 128; // cartridge near label (song end)

// "Engaged" landing zone for the tone arm. Wider than the start..end range
// so users don't have to be perfectly precise to drop the needle.
const ENGAGED_ZONE_MIN = 95;
const ENGAGED_ZONE_MAX = 135;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

function formatTime(seconds: number): string {
  const t = Math.max(0, Math.floor(seconds));
  const m = Math.floor(t / 60);
  const s = t % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

type Props = {
  track: CuratedTrack | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  onPlay: () => void;
  onPause: () => void;
};

export default function Turntable({
  track,
  isPlaying,
  currentTime,
  duration,
  onPlay,
  onPause,
}: Props) {
  // The arm has two angle sources:
  // 1. Progress-driven (default while loaded/playing/paused)
  // 2. User-driven (during a drag gesture)
  // `userAngle` is non-null only while dragging.
  const [userAngle, setUserAngle] = useState<number | null>(null);
  const isDraggingRef = useRef(false);

  const progressAngle = (() => {
    if (!track) return ANGLE_PARKED;
    if (!isPlaying && currentTime === 0) return ANGLE_PARKED;
    const t = duration > 0 ? clamp(currentTime / duration, 0, 1) : 0;
    return lerp(ANGLE_ENGAGED_START, ANGLE_ENGAGED_END, t);
  })();

  // What the user actually sees.
  const visibleAngle = userAngle ?? progressAngle;

  const handleDragStart = () => {
    isDraggingRef.current = true;
    setUserAngle(progressAngle);
  };
  const handleDrag = (rawAngle: number) => {
    // Constrain to the meaningful arc so the arm can't go behind the pivot.
    const a = clamp(rawAngle, 50, 160);
    setUserAngle(a);
  };
  const handleDragEnd = (rawAngle: number) => {
    isDraggingRef.current = false;
    const inZone = rawAngle >= ENGAGED_ZONE_MIN && rawAngle <= ENGAGED_ZONE_MAX;
    setUserAngle(null);
    if (!track) return;
    if (inZone) onPlay();
    else onPause();
  };

  // While the user isn't actively dragging, smoothly tween the arm rotation
  // (snap-back after release; progress-driven sweep during playback).
  const armSmooth = userAngle === null;

  return (
    <div className="flex flex-col items-center gap-5">
      <div
        style={{
          position: "relative",
          width: STAGE_W,
          height: STAGE_H,
        }}
      >
        {/* Platter */}
        <div
          style={{
            position: "absolute",
            left: PLATTER_CENTER.x - PLATTER_SIZE / 2,
            top: PLATTER_CENTER.y - PLATTER_SIZE / 2,
            width: PLATTER_SIZE,
            height: PLATTER_SIZE,
            borderRadius: "50%",
            background: "var(--color-grey-900)",
            border: "1px solid var(--border)",
          }}
        />

        {/* Spindle */}
        <div
          style={{
            position: "absolute",
            left: PLATTER_CENTER.x,
            top: PLATTER_CENTER.y,
            transform: "translate(-50%, -50%)",
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "var(--color-grey-700)",
            zIndex: 2,
          }}
        />

        {/* Vinyl on platter */}
        {track && (
          <div
            style={{
              position: "absolute",
              left: PLATTER_CENTER.x,
              top: PLATTER_CENTER.y,
              transform: "translate(-50%, -50%)",
              zIndex: 1,
            }}
          >
            <Vinyl track={track} size={PLATTER_SIZE - 40} spinning={isPlaying} />
          </div>
        )}

        {/* Empty-platter hint */}
        {!track && (
          <div
            style={{
              position: "absolute",
              left: PLATTER_CENTER.x,
              top: PLATTER_CENTER.y,
              transform: "translate(-50%, -50%)",
              fontSize: "var(--text-label)",
              color: "var(--foreground-muted)",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              pointerEvents: "none",
              zIndex: 1,
            }}
          >
            Pick a record
          </div>
        )}

        <ToneArm
          angle={visibleAngle}
          pivotX={PIVOT.x}
          pivotY={PIVOT.y}
          length={ARM_LEN}
          smooth={armSmooth}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
        />
      </div>

      {/* Transport bar */}
      <div
        className="flex items-center gap-4"
        style={{
          padding: "var(--space-3) var(--space-5)",
          borderRadius: "var(--radius-pill)",
          background: "var(--surface-raised)",
          border: "1px solid var(--border)",
          minWidth: 320,
        }}
      >
        <button
          type="button"
          onClick={isPlaying ? onPause : onPlay}
          disabled={!track}
          aria-label={isPlaying ? "Pause" : "Play"}
          className="flex items-center justify-center transition-opacity disabled:opacity-40 hover:opacity-80"
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: track ? "var(--primary)" : "var(--color-grey-400)",
            color: "var(--primary-foreground)",
            cursor: track ? "pointer" : "not-allowed",
          }}
        >
          {isPlaying ? <Pause size={16} weight="fill" /> : <Play size={16} weight="fill" />}
        </button>

        <div className="flex flex-col flex-1 min-w-0">
          {track ? (
            <>
              <span
                className="truncate"
                style={{
                  fontSize: "var(--text-md)",
                  fontWeight: "var(--weight-medium)",
                  lineHeight: "var(--leading-tight)",
                }}
              >
                {track.title}
              </span>
              <span
                className="truncate"
                style={{
                  fontSize: "var(--text-label)",
                  color: "var(--foreground-muted)",
                }}
              >
                {track.artists.join(", ")}
              </span>
            </>
          ) : (
            <span
              style={{
                fontSize: "var(--text-label)",
                color: "var(--foreground-muted)",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              No record loaded
            </span>
          )}
        </div>

        <span
          style={{
            fontSize: "var(--text-label)",
            color: "var(--foreground-muted)",
            fontFamily: "var(--font-mono)",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {formatTime(currentTime)} / {formatTime(duration || (track?.durationMs ? track.durationMs / 1000 : 0))}
        </span>
      </div>
    </div>
  );
}
