// /context/AudioContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type AudioContextType = {
  isClicked: boolean;
  setIsClicked: (clicked: boolean) => void;
  isMuted: boolean;
  toggleMute: () => void;
  audioReady: boolean;
};

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const [isClicked, setIsClicked] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [audioReady, setAudioReady] = useState(false);

  useEffect(() => {
    const audio = document.getElementById(
      "main-hero-audio"
    ) as HTMLAudioElement | null;

    if (audio) {
      audio.addEventListener("canplay", () => {
        setAudioReady(true);
      });

      const toggleAudio = () => {
        const hasViewed = localStorage.getItem("hasViewedMainGateHero");
        const isHomepage = window.location.pathname === "/";

        if (!isHomepage || hasViewed === "true") {
          if (!isClicked) {
            audio.pause();
          } else {
            audio.play().catch((error) => {
              console.log("Audio playback failed:", error);
            });
          }
        }
      };

      if (
        window.location.pathname !== "/" ||
        localStorage.getItem("hasViewedMainGateHero") === "true"
      ) {
        window.addEventListener("click", toggleAudio);
        window.addEventListener("touchstart", toggleAudio);
      }

      return () => {
        window.removeEventListener("click", toggleAudio);
        window.removeEventListener("touchstart", toggleAudio);
      };
    }
  }, [isClicked]);

  const toggleMute = () => {
    const audio = document.getElementById(
      "main-hero-audio"
    ) as HTMLAudioElement | null;

    if (audio) {
      setIsMuted(!isMuted);
      audio.muted = !isMuted;
    }
  };

  return (
    <AudioContext.Provider
      value={{ isClicked, setIsClicked, isMuted, toggleMute, audioReady }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};
