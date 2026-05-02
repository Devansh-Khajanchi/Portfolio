"use client";

import { useEffect, useRef, useState } from "react";

type YTPlayer = {
  loadVideoById: (id: string) => void;
  playVideo: () => void;
  pauseVideo: () => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  destroy: () => void;
};
type YTState = -1 | 0 | 1 | 2 | 3 | 5;

declare global {
  interface Window {
    YT?: {
      Player: new (
        el: HTMLElement | string,
        opts: {
          width?: number | string;
          height?: number | string;
          videoId?: string;
          playerVars?: Record<string, unknown>;
          events?: {
            onReady?: () => void;
            onStateChange?: (e: { data: YTState }) => void;
          };
        },
      ) => YTPlayer;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

function loadYTApi(): Promise<void> {
  return new Promise((resolve) => {
    if (window.YT?.Player) return resolve();
    if (!document.getElementById("yt-iframe-api")) {
      const tag = document.createElement("script");
      tag.id = "yt-iframe-api";
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve();
    };
  });
}

export type YouTubePlayerStatus = "idle" | "playing" | "paused" | "ended";

export type UseYouTubePlayer = {
  /** Attach this ref to the (hidden) DOM node where the YT iframe should mount. */
  hostRef: React.RefObject<HTMLDivElement | null>;
  status: YouTubePlayerStatus;
  currentTime: number;
  duration: number;
  load: (videoId: string) => void;
  play: () => void;
  pause: () => void;
};

/** YT IFrame API wrapped as a hook. Caller owns the (hidden) host element. */
export function useYouTubePlayer(): UseYouTubePlayer {
  const hostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const [status, setStatus] = useState<YouTubePlayerStatus>("idle");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    loadYTApi().then(() => {
      if (cancelled || !hostRef.current || !window.YT) return;
      playerRef.current = new window.YT.Player(hostRef.current, {
        width: 200,
        height: 120,
        playerVars: { playsinline: 1, controls: 0, disablekb: 1, modestbranding: 1 },
        events: {
          onReady: () => setReady(true),
          onStateChange: (e) => {
            if (e.data === 1) setStatus("playing");
            else if (e.data === 2) setStatus("paused");
            else if (e.data === 0) setStatus("ended");
            const d = playerRef.current?.getDuration?.() ?? 0;
            if (d) setDuration(d);
          },
        },
      });
    });
    return () => {
      cancelled = true;
      playerRef.current?.destroy?.();
      playerRef.current = null;
    };
  }, []);

  // Smoothly track currentTime via requestAnimationFrame.
  // YouTube only updates getCurrentTime() ~4× per second, so polling it
  // directly causes visible 200ms steps. Instead: re-sync from YT every 1s,
  // extrapolate locally from performance.now() between syncs. Result is a
  // continuous-feeling time value at 60fps.
  useEffect(() => {
    if (status !== "playing") return;
    let lastSyncedTime = playerRef.current?.getCurrentTime?.() ?? 0;
    let lastSyncedAt = performance.now();
    let raf = 0;
    const sync = setInterval(() => {
      const cur = playerRef.current?.getCurrentTime?.() ?? lastSyncedTime;
      const d = playerRef.current?.getDuration?.() ?? 0;
      lastSyncedTime = cur;
      lastSyncedAt = performance.now();
      if (d && d !== duration) setDuration(d);
    }, 1000);
    const tick = () => {
      const elapsed = (performance.now() - lastSyncedAt) / 1000;
      setCurrentTime(lastSyncedTime + elapsed);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(sync);
    };
  }, [status, duration]);

  return {
    hostRef,
    status,
    currentTime,
    duration,
    load: (videoId: string) => {
      if (!ready || !playerRef.current) return;
      setCurrentTime(0);
      setDuration(0);
      playerRef.current.loadVideoById(videoId);
    },
    play: () => playerRef.current?.playVideo?.(),
    pause: () => playerRef.current?.pauseVideo?.(),
  };
}
