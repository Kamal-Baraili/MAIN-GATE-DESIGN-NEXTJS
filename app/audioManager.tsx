"use client";
import { useAudio } from "./audioContext";
import { Icon } from "@iconify/react";

const AudioManager = () => {
  const { isMuted, toggleMute } = useAudio();

  return (
    <div className="w-full lg:w-1/12 h-[4vh] xl:h-[6vh] bg-transparent opacity-35 hover:opacity-100 fixed bottom-0 right-0 z-30 ">
      <audio
        id="main-hero-audio"
        className="hidden relative"
        loop
        muted
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
  );
};

export default AudioManager;
