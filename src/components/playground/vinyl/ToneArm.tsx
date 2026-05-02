"use client";

import { useEffect, useRef } from "react";

type Props = {
  /** Current rotation in degrees, around the pivot. 0° = arm points right (east). */
  angle: number;
  /** Pivot position in container coordinates (px). */
  pivotX: number;
  pivotY: number;
  /** Length of the arm from pivot to cartridge, in px. */
  length: number;
  /** Called on pointerdown. Parent should switch into "user-controlled" mode. */
  onDragStart?: () => void;
  /** Called on pointermove with the new angle in degrees (already snapped to atan2 of pointer vs pivot). */
  onDrag?: (angleDeg: number) => void;
  /** Called on pointerup with the final angle. */
  onDragEnd?: (angleDeg: number) => void;
  /** Visual color for the arm line + cartridge. */
  color?: string;
  /** Accent color for the cartridge tip. */
  accent?: string;
  /** When true, smoothly tween the arm rotation (used during playback + snap-back). */
  smooth?: boolean;
  /** Transition duration in ms when `smooth` is true. */
  smoothMs?: number;
};

export default function ToneArm({
  angle,
  pivotX,
  pivotY,
  length,
  onDragStart,
  onDrag,
  onDragEnd,
  color = "var(--color-grey-600)",
  accent = "var(--primary)",
  smooth = false,
  smoothMs = 200,
}: Props) {
  const armRef = useRef<HTMLDivElement>(null);
  const pivotElRef = useRef<HTMLDivElement>(null);

  // Stash latest callbacks so the pointerdown listener stays stable across
  // renders. Without this, inline-arrow props reset the listeners mid-drag
  // and the gesture breaks.
  const cbRef = useRef({ onDragStart, onDrag, onDragEnd });
  cbRef.current = { onDragStart, onDrag, onDragEnd };

  useEffect(() => {
    const arm = armRef.current;
    const pivotEl = pivotElRef.current;
    if (!arm || !pivotEl) return;

    const angleFor = (clientX: number, clientY: number): number => {
      const r = pivotEl.getBoundingClientRect();
      const px = r.left + r.width / 2;
      const py = r.top + r.height / 2;
      return (Math.atan2(clientY - py, clientX - px) * 180) / Math.PI;
    };

    const handleDown = (e: PointerEvent) => {
      e.preventDefault();
      e.stopPropagation();
      cbRef.current.onDragStart?.();

      const handleMove = (ev: PointerEvent) => {
        ev.preventDefault();
        cbRef.current.onDrag?.(angleFor(ev.clientX, ev.clientY));
      };
      const handleUp = (ev: PointerEvent) => {
        window.removeEventListener("pointermove", handleMove);
        window.removeEventListener("pointerup", handleUp);
        window.removeEventListener("pointercancel", handleUp);
        cbRef.current.onDragEnd?.(angleFor(ev.clientX, ev.clientY));
      };

      window.addEventListener("pointermove", handleMove, { passive: false });
      window.addEventListener("pointerup", handleUp);
      window.addEventListener("pointercancel", handleUp);
    };

    arm.addEventListener("pointerdown", handleDown);
    return () => arm.removeEventListener("pointerdown", handleDown);
  }, []);

  const cartridgeSize = 16;

  return (
    <>
      {/* Pivot dot — visible, fixed in place. Also used to read screen coords. */}
      <div
        ref={pivotElRef}
        style={{
          position: "absolute",
          left: pivotX,
          top: pivotY,
          transform: "translate(-50%, -50%)",
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: color,
          boxShadow: "0 1px 2px rgb(0 0 0 / 0.2)",
          pointerEvents: "none",
          zIndex: 3,
        }}
      />

      {/* The arm — rotates around the pivot. */}
      <div
        ref={armRef}
        style={{
          position: "absolute",
          left: pivotX,
          top: pivotY,
          width: length,
          height: 32,
          marginTop: -16,
          transformOrigin: "0 50%",
          transform: `rotate(${angle}deg)`,
          transition: smooth ? `transform ${smoothMs}ms linear` : "none",
          cursor: "grab",
          touchAction: "none",
          zIndex: 4,
        }}
      >
        {/* Visible line */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            right: cartridgeSize,
            height: 2,
            transform: "translateY(-50%)",
            background: color,
            pointerEvents: "none",
          }}
        />
        {/* Cartridge at tip */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: 0,
            transform: "translateY(-50%)",
            width: cartridgeSize,
            height: cartridgeSize,
            background: color,
            borderRadius: 2,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: -3,
              left: "50%",
              transform: "translateX(-50%)",
              width: 4,
              height: 4,
              background: accent,
              borderRadius: "50%",
            }}
          />
        </div>
      </div>
    </>
  );
}
