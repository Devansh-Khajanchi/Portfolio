"use client";

import { useEffect, useState } from "react";
import Turntable from "./Turntable";
import VinylShelf from "./VinylShelf";
import { useYouTubePlayer } from "./useYouTubePlayer";
import { curatedTracks } from "@/data/music";

export default function VinylPlayer() {
  const yt = useYouTubePlayer();
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  // Track up to 8 records on the shelf — early entries first.
  const tracks = curatedTracks.slice(0, 8);
  const activeTrack = activeIdx !== null ? tracks[activeIdx] : null;

  const handleSelect = (idx: number) => {
    const t = tracks[idx];
    if (!t.youtubeId) return;
    if (idx === activeIdx) return; // already loaded
    yt.pause();
    setActiveIdx(idx);
    yt.load(t.youtubeId);
  };

  const handlePlay = () => {
    if (!activeTrack) return;
    yt.play();
  };

  const handlePause = () => {
    yt.pause();
  };

  // When the YT player reports the song ended, leave the vinyl loaded but
  // stopped (the next user action — Play or another vinyl — drives what's next).
  useEffect(() => {
    if (yt.status === "ended") {
      // No-op for now; UI will show 0:00 / total and a paused arm.
    }
  }, [yt.status]);

  const isPlaying = yt.status === "playing";

  return (
    <div
      style={{
        background: "var(--surface)",
        color: "var(--foreground)",
        borderRadius: "var(--radius-2xl)",
        boxShadow:
          "0 40px 80px -20px rgb(0 0 0 / 0.45), 0 12px 24px -8px rgb(0 0 0 / 0.25)",
        width: "min(960px, 96vw)",
        maxHeight: "min(720px, 88vh)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Hidden YouTube player. Must be in DOM and non-zero size for the
          IFrame API to initialize, but invisible to the user. */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: -9999,
          top: -9999,
          width: 200,
          height: 120,
          opacity: 0,
          pointerEvents: "none",
        }}
      >
        <div ref={yt.hostRef} />
      </div>

      <div className="vinyl-grid">
        <div className="flex justify-center items-start py-6">
          <Turntable
            track={activeTrack}
            isPlaying={isPlaying}
            currentTime={yt.currentTime}
            duration={yt.duration || (activeTrack?.durationMs ? activeTrack.durationMs / 1000 : 0)}
            onPlay={handlePlay}
            onPause={handlePause}
          />
        </div>
        <div
          className="vinyl-shelf-wrap"
          style={{
            borderLeft: "1px solid var(--border)",
            padding: "var(--space-5)",
            background: "var(--background)",
          }}
        >
          <VinylShelf
            tracks={tracks}
            activeIdx={activeIdx}
            isPlaying={isPlaying}
            onSelect={handleSelect}
          />
        </div>
      </div>

      <style>{`
        .vinyl-grid {
          display: grid;
          grid-template-columns: 1fr 320px;
          height: 100%;
          min-height: 540px;
        }
        @media (max-width: 760px) {
          .vinyl-grid {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto;
          }
          .vinyl-shelf-wrap {
            border-left: none !important;
            border-top: 1px solid var(--border);
          }
        }
      `}</style>
    </div>
  );
}
