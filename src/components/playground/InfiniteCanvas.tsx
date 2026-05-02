"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "motion/react";
import { PLAYGROUND_WORLD, playgroundItems } from "@/data/playground";
import PlaygroundCard from "./PlaygroundCard";
import PlaygroundModal from "./PlaygroundModal";
import type { PlaygroundItem } from "@/types";

export default function InfiniteCanvas() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);
  const [constraints, setConstraints] = useState({
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  });
  const constraintsRef = useRef(constraints);
  const [isPanning, setIsPanning] = useState(false);
  const [ready, setReady] = useState(false);
  const [selected, setSelected] = useState<PlaygroundItem | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    constraintsRef.current = constraints;
  }, [constraints]);

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const update = () => {
      const vw = el.clientWidth;
      const vh = el.clientHeight;
      const left = Math.min(0, vw - PLAYGROUND_WORLD.width);
      const top = Math.min(0, vh - PLAYGROUND_WORLD.height);
      setConstraints({ left, right: 0, top, bottom: 0 });

      if (!initialized.current) {
        x.set((vw - PLAYGROUND_WORLD.width) / 2);
        y.set((vh - PLAYGROUND_WORLD.height) / 2);
        initialized.current = true;
        setReady(true);
        return;
      }
      const cx = x.get();
      const cy = y.get();
      if (cx < left) x.set(left);
      else if (cx > 0) x.set(0);
      if (cy < top) y.set(top);
      else if (cy > 0) y.set(0);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [x, y]);

  // Middle-click + drag pan. Motion's pan ignores non-primary mouse buttons,
  // so this handles the gesture manually and feeds the same motion values.
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    let active = false;
    let startClientX = 0;
    let startClientY = 0;
    let startX = 0;
    let startY = 0;
    let pointerId: number | null = null;

    const onDown = (e: PointerEvent) => {
      if (e.button !== 1) return;
      e.preventDefault();
      active = true;
      startClientX = e.clientX;
      startClientY = e.clientY;
      startX = x.get();
      startY = y.get();
      pointerId = e.pointerId;
      try {
        el.setPointerCapture(e.pointerId);
      } catch {}
      setIsPanning(true);
    };
    const onMove = (e: PointerEvent) => {
      if (!active) return;
      e.preventDefault();
      const { left, top } = constraintsRef.current;
      const nx = startX + (e.clientX - startClientX);
      const ny = startY + (e.clientY - startClientY);
      x.set(Math.max(left, Math.min(0, nx)));
      y.set(Math.max(top, Math.min(0, ny)));
    };
    const onUp = (e: PointerEvent) => {
      if (!active) return;
      active = false;
      setIsPanning(false);
      if (pointerId !== null) {
        try {
          el.releasePointerCapture(pointerId);
        } catch {}
        pointerId = null;
      }
    };
    // Some browsers fire `auxclick` instead of `click` for middle button
    // and may still try to enter auto-scroll mode — squash both.
    const onAuxClick = (e: MouseEvent) => {
      if (e.button === 1) e.preventDefault();
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    el.addEventListener("auxclick", onAuxClick);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      el.removeEventListener("auxclick", onAuxClick);
    };
  }, [x, y]);

  return (
    <>
      <div
        ref={viewportRef}
        className={`fixed inset-0 overflow-hidden touch-none select-none ${
          isPanning ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{ background: "var(--background)" }}
      >
        <motion.div
          drag
          dragConstraints={constraints}
          dragElastic={0.05}
          dragTransition={{ power: 0.22, timeConstant: 220 }}
          onDragStart={() => setIsPanning(true)}
          onDragEnd={() => setIsPanning(false)}
          style={{
            x,
            y,
            width: PLAYGROUND_WORLD.width,
            height: PLAYGROUND_WORLD.height,
            willChange: "transform",
            opacity: ready ? 1 : 0,
            transition: "opacity 200ms ease-out",
          }}
          className="relative"
        >
          {playgroundItems.map((item) => (
            <PlaygroundCard
              key={item.id}
              item={item}
              onOpen={() => setSelected(item)}
            />
          ))}
        </motion.div>

        <div
          className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-xs"
          style={{
            background: "var(--surface-raised)",
            color: "var(--foreground-muted)",
            border: "1px solid var(--border)",
            fontSize: "var(--text-label)",
          }}
        >
          Drag to explore · Drag a card to move it
        </div>
      </div>

      <PlaygroundModal item={selected} onClose={() => setSelected(null)} />
    </>
  );
}
