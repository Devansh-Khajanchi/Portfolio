"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, ArrowSquareOut } from "@phosphor-icons/react";
import AutoplayVideo from "@/components/ui/AutoplayVideo";
import VinylPlayer from "@/components/playground/vinyl/VinylPlayer";
import { isVideoSrc } from "@/lib/media";
import type { PlaygroundItem } from "@/types";

type Props = {
  item: PlaygroundItem | null;
  onClose: () => void;
};

const EASE = [0.32, 0.72, 0, 1] as const;

export default function PlaygroundModal({ item, onClose }: Props) {
  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: EASE }}
          onClick={onClose}
          className="fixed inset-0 z-modal flex items-center justify-center p-6 md:p-12"
          style={{
            background: "rgb(0 0 0 / 0.45)",
            backdropFilter: "blur(16px) saturate(140%)",
            WebkitBackdropFilter: "blur(16px) saturate(140%)",
          }}
        >
          <motion.div
            key="dialog"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.24, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={item.title}
            className="relative max-w-[min(1200px,90vw)] max-h-[85vh] w-auto h-auto"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute -top-3 -right-3 md:-top-4 md:-right-4 z-10 flex items-center justify-center rounded-full transition-transform hover:scale-105 active:scale-95"
              style={{
                width: "var(--space-10)",
                height: "var(--space-10)",
                background: "var(--surface)",
                color: "var(--foreground)",
                border: "1px solid var(--border)",
                boxShadow:
                  "0 8px 24px -8px rgb(0 0 0 / 0.35), 0 2px 6px -2px rgb(0 0 0 / 0.2)",
              }}
            >
              <X size={18} weight="bold" />
            </button>

            {item.kind === "music" ? (
              <VinylPlayer />
            ) : (
              <div
                className="overflow-hidden"
                style={{
                  background: item.bg ?? "var(--surface-raised)",
                  color: item.fg ?? "var(--foreground)",
                  borderRadius: "var(--radius-2xl)",
                  boxShadow:
                    "0 40px 80px -20px rgb(0 0 0 / 0.45), 0 12px 24px -8px rgb(0 0 0 / 0.25)",
                }}
              >
                {item.src ? (
                  isVideoSrc(item.src) ? (
                    <AutoplayVideo
                      src={item.src}
                      decorative
                      className="block max-w-[min(1200px,90vw)] max-h-[78vh] w-auto h-auto object-contain"
                    />
                  ) : (
                    <img
                      src={item.src}
                      alt={item.alt ?? item.title}
                      draggable={false}
                      className="block max-w-[min(1200px,90vw)] max-h-[78vh] w-auto h-auto object-contain"
                    />
                  )
                ) : (
                  <div
                    className="flex items-center justify-center"
                    style={{
                      width: "min(640px, 80vw)",
                      height: "min(480px, 60vh)",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "var(--text-h1)",
                        fontWeight: "var(--weight-medium)",
                        letterSpacing: "var(--tracking-tight)",
                      }}
                    >
                      {item.title}
                    </span>
                  </div>
                )}
              </div>
            )}

            {item.kind !== "music" && (
              <div className="mt-4 flex items-center justify-between gap-4">
                <span
                  style={{
                    fontSize: "var(--text-label)",
                    color: "white",
                    fontWeight: "var(--weight-medium)",
                  }}
                >
                  {item.title}
                </span>
                {item.href && (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 no-underline transition-opacity hover:opacity-80"
                    style={{
                      fontSize: "var(--text-label)",
                      color: "white",
                      fontWeight: "var(--weight-medium)",
                    }}
                  >
                    Visit <ArrowSquareOut size={14} weight="bold" />
                  </a>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
