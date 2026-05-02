"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { CaretDown } from "@phosphor-icons/react";

function subscribeTheme(cb: () => void): () => void {
  const o = new MutationObserver(cb);
  o.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => o.disconnect();
}
const getDark = () => document.documentElement.classList.contains("dark");
const getDarkSSR = () => true;

const HIDE_THRESHOLD = 40;

export default function ScrollPrompt() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (window.scrollY > HIDE_THRESHOLD) setVisible(false);
  }, []);

  useMotionValueEvent(scrollY, "change", (v) => {
    if (v > HIDE_THRESHOLD) setVisible(false);
  });

  const dark = useSyncExternalStore(subscribeTheme, getDark, getDarkSSR);
  const fg = dark ? "#ffffff" : "#0a0a0a";

  return (
    <motion.div
      aria-hidden
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.24, ease: [0.32, 0.72, 0, 1] }}
      style={{
        position: "fixed",
        bottom: 24,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 10,
        pointerEvents: "none",
        textAlign: "center",
        color: fg,
      }}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          fontFamily: "var(--font-dm-mono)",
          fontSize: "var(--text-label)",
          letterSpacing: "0.04em",
        }}
      >
        scroll
        <CaretDown size={14} weight="bold" />
      </motion.div>
    </motion.div>
  );
}
