"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import AutoplayVideo from "@/components/ui/AutoplayVideo";
import { isVideoSrc } from "@/lib/media";
import { curatedTracks } from "@/data/music";
import type { PlaygroundItem } from "@/types";

type Props = { item: PlaygroundItem; onOpen: () => void };

export default function PlaygroundCard({ item, onOpen }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  // Tracks whether motion's drag actually engaged this gesture (past its ~3px
  // pan threshold). Motion's onTap can fire after a drag due to a timing race
  // between the press and drag pointer-up handlers — so we explicitly suppress
  // the open if a drag occurred. Reset on every new pointerdown.
  const draggedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const stop = (e: PointerEvent) => e.stopPropagation();
    el.addEventListener("pointerdown", stop);
    return () => el.removeEventListener("pointerdown", stop);
  }, []);

  const hasMedia = Boolean(item.src);
  const isMusic = item.kind === "music";

  // Music card uses its own internal layout (album grid + label) instead of
  // the generic colored / media card.
  const cardClassName = isMusic
    ? "flex flex-col cursor-grab active:cursor-grabbing touch-none"
    : `${hasMedia ? "" : "flex items-end p-5"} cursor-grab active:cursor-grabbing touch-none`;

  return (
    <motion.div
      ref={ref}
      drag
      dragMomentum={false}
      onPointerDown={() => {
        draggedRef.current = false;
      }}
      onDragStart={() => {
        draggedRef.current = true;
      }}
      onTap={() => {
        if (draggedRef.current) {
          draggedRef.current = false;
          return;
        }
        onOpen();
      }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      whileDrag={{ scale: 1.06, zIndex: 50 }}
      transition={{ type: "spring", stiffness: 380, damping: 26 }}
      style={{
        position: "absolute",
        left: item.x,
        top: item.y,
        width: item.w,
        height: item.h,
        rotate: item.rotation,
        background: item.bg ?? "var(--surface-raised)",
        color: item.fg ?? "var(--foreground)",
        borderRadius: isMusic ? "var(--radius-3xl)" : "var(--radius-2xl)",
        boxShadow:
          "0 18px 40px -12px rgb(0 0 0 / 0.28), 0 6px 12px -6px rgb(0 0 0 / 0.16)",
        willChange: "transform",
        overflow: "hidden",
      }}
      className={cardClassName}
    >
      {isMusic ? (
        <MusicCardContent />
      ) : hasMedia ? (
        isVideoSrc(item.src!) ? (
          <AutoplayVideo src={item.src!} fill decorative />
        ) : (
          <img
            src={item.src!}
            alt={item.alt ?? item.title}
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
        )
      ) : (
        <span
          style={{
            fontSize: "var(--text-h3)",
            fontWeight: "var(--weight-medium)",
            lineHeight: "var(--leading-tight)",
            letterSpacing: "var(--tracking-tight)",
          }}
        >
          {item.title}
        </span>
      )}
    </motion.div>
  );
}

function MusicCardContent() {
  const featured = curatedTracks.slice(0, 4);
  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10,
          padding: 18,
          paddingBottom: 14,
        }}
      >
        {featured.map((t, i) => (
          <div
            key={`${t.href}-${i}`}
            style={{
              aspectRatio: "1 / 1",
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
              background: "rgb(0 0 0 / 0.12)",
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
                pointerEvents: "none",
              }}
            />
          </div>
        ))}
      </div>
      <div
        style={{
          padding: "0 20px 20px",
          color: "white",
          marginTop: "auto",
        }}
      >
        <div
          style={{
            fontSize: "var(--text-3xl)",
            fontWeight: "var(--weight-medium)",
            lineHeight: "var(--leading-none)",
            letterSpacing: "var(--tracking-tight)",
          }}
        >
          Music
        </div>
        <div
          style={{
            fontSize: "var(--text-md)",
            fontWeight: "var(--weight-regular)",
            lineHeight: "var(--leading-tight)",
            marginTop: 6,
            opacity: 0.95,
          }}
        >
          Listen to my collection
        </div>
      </div>
    </>
  );
}
