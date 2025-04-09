"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";

const Audio = () => {
  const [audioReady, setAudioReady] = useState(false);
  const [isClicked, setIsClicked] = useState<boolean>(true); // Control the audio play/pause
  const [isMuted, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    const audio = document.getElementById(
      "main-hero-audio"
    ) as HTMLAudioElement | null;

    if (audio) {
      // Set up the audio element but don't play automatically
      // The MainGateHero component will control when to start playing

      audio.addEventListener("canplay", () => {
        setAudioReady(true);
        console.log(audioReady);
      });

      // We'll keep this event for pages other than homepage
      // or after the gate animation has completed
      const toggleAudio = () => {
        const hasViewed = localStorage.getItem("hasViewedMainGateHero");
        const isHomepage = window.location.pathname === "/";

        // Only enable automatic play/pause for non-homepage or after gate animation
        if (!isHomepage || hasViewed === "true") {
          if (audio && !isClicked) {
            audio.pause();
          } else if (audio && isClicked) {
            audio.play().catch((error) => {
              console.log("Audio playback failed:", error);
            });
          }
        }
      };

      // Only add these listeners for non-homepage or after animation
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
    } else {
      console.log("Audio element not found");
    }
  }, [isClicked]); // Re-run when isClicked changes

  // Function to handle audio mute/unmute
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
    <>
      {" "}
      <div className="w-full lg:w-1/12 h-[4vh] xl:h-[6vh] bg-transparent opacity-35 hover:opacity-100 fixed bottom-0 right-0 z-30 ">
        <audio
          id="main-hero-audio"
          className="hidden relative"
          loop
          muted={true} // Start muted - will be enabled by MainGateHero
          src="/main-hero-sound.mp3"
          preload="auto"
        ></audio>
        <div
          className="cursor-pointer absolute -top-[60%] xl:-top-0 lg:bottom-10 right-[5%] xl:right-0 lg:left-10 z-40"
          onClick={toggleMute}
        >
          {isMuted ? (
            <Icon
              className="text-2xl lg:text-[1.6vw] text-primary"
              icon="streamline:volume-mute-solid"
            />
          ) : (
            <Icon
              className="text-2xl lg:text-[1.6vw] text-primary"
              icon="garden:volume-unmuted-fill-16"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Audio;
