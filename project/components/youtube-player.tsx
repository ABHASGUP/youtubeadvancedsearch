"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface YouTubePlayerProps {
  videoId: string;
  height?: number;
  width?: number;
}

export function YouTubePlayer({ videoId, height = 360, width = 640 }: YouTubePlayerProps) {
  const playerRef = useRef<HTMLDivElement>(null);
  const player = useRef<any>(null);

  useEffect(() => {
    // Load the IFrame Player API code asynchronously
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // Create YouTube player when API is ready
    window.onYouTubeIframeAPIReady = () => {
      player.current = new window.YT.Player(playerRef.current, {
        height,
        width,
        videoId,
        playerVars: {
          autoplay: 0,
          modestbranding: 1,
          rel: 0,
        },
      });
    };

    return () => {
      if (player.current) {
        player.current.destroy();
      }
    };
  }, [videoId, height, width]);

  return <div ref={playerRef} />;
}