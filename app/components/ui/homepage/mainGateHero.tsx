"use client"
import { usePathname } from "next/navigation"; 
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Button from "../../shared/button/button";

const MainGateHero = ({ isClicked, setIsClicked }: any) => {
  const box1 = useRef<HTMLDivElement | null>(null);
  const box2 = useRef<HTMLDivElement | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const textContainerRef = useRef<HTMLDivElement | null>(null);
  const welcomeTextRef = useRef<HTMLHeadingElement | null>(null);
  const companyTextRef = useRef<HTMLHeadingElement | null>(null);
  const finalMessageLine1Ref = useRef<HTMLHeadingElement | null>(null);
  const skipButtonRef = useRef<HTMLDivElement | null>(null);
  const tlRef = useRef<GSAPTimeline | null>(null);

  const [isPlayClicked, setPlayClicked] = useState<boolean>(false);
  const [hasViewed, setHasViewed] = useState<boolean>(false);
  const [showSkipButton, setShowSkipButton] = useState<boolean>(false);
  const pathname = usePathname(); // Use the usePathname hook to get the current path

  // Check localStorage on mount and set up reload detection
  useEffect(() => {
    const viewed = localStorage.getItem("hasViewedMainGateHero");
    if (viewed === "true") {
      setHasViewed(true);
    }

    // Clear localStorage on full page reload (not re-render)
    const handleBeforeUnload = () => {
      if (pathname === "/") {
        // Using pathname instead of router.pathname
        localStorage.removeItem("hasViewedMainGateHero");
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup event listener
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [pathname]); // Watch for changes in the pathname

  useEffect(() => {
    if (
      box1.current &&
      box2.current &&
      container.current &&
      welcomeTextRef.current &&
      companyTextRef.current &&
      finalMessageLine1Ref.current &&
      skipButtonRef.current &&
      !hasViewed
    ) {
      // Set initial states
      gsap.set(container.current, { opacity: 1, visibility: "visible" });
      gsap.set([box1.current, box2.current], { x: "0%" });

      // Set initial states for text elements - all in same position but with different opacity
      gsap.set(welcomeTextRef.current, { opacity: 0, y: "20px" });
      gsap.set(companyTextRef.current, { opacity: 0, y: "20px" });
      gsap.set(finalMessageLine1Ref.current, { opacity: 0, y: "20px" });

      // Set initial state for skip button - hidden
      gsap.set(skipButtonRef.current, { opacity: 0, scale: 0.8 });

      // Create timeline with better timing and easing
      const tl = gsap.timeline({
        paused: true,
        onComplete: () => {
          localStorage.setItem("hasViewedMainGateHero", "true");
          setHasViewed(true);
          setShowSkipButton(false);
        },
      });

      // Sequence: Open gates → Welcome → Company name → Final message → Fade out
      tl
        // Gate opening animation - slow start, faster middle, slow end
        .to([box1.current, box2.current], {
          x: function (i) {
            return i === 0 ? "-100%" : "100%";
          },
          ease: "power3.inOut", // More natural motion curve
          duration: 2.5, // Slightly faster for better engagement
          stagger: 0, // Execute simultaneously
          onComplete: () => {
            // Show skip button after gates are fully open
            setShowSkipButton(true);
          },
        })

        // Animate skip button appearance
        .to(
          skipButtonRef.current,
          {
            opacity: 1,
            scale: 1,
            ease: "back.out(1.7)",
            duration: 0.4,
          },
          "-=0.4" // Start slightly before gates finish opening
        )

        // First text appears after gates are partially open
        .to(
          welcomeTextRef.current,
          {
            opacity: 1,
            y: "0",
            ease: "power2.out",
            duration: 0.8,
          },
          "-=1.2"
        ) // Start when gates are 0.7s into opening

        // Hold first text visible, then fade out
        .to(
          welcomeTextRef.current,
          {
            opacity: 0,
            y: "-20px",
            ease: "power2.in",
            duration: 0.6,
          },
          "+=1.2"
        ) // Hold for 1.2s before fading

        // Second text appears as first fades out (in same position)
        .to(
          companyTextRef.current,
          {
            opacity: 1,
            y: "0",
            ease: "power2.out",
            duration: 0.8,
          },
          "-=0.3"
        ) // Slight overlap for smoother transition

        // Hold second text, then fade out
        .to(
          companyTextRef.current,
          {
            opacity: 0,
            y: "-20px",
            ease: "power2.in",
            duration: 0.6,
          },
          "+=1.2"
        ) // Hold for 1.2s

        // Final message line 1 appears
        .to(
          finalMessageLine1Ref.current,
          {
            opacity: 1,
            y: "0",
            ease: "power2.out",
            duration: 0.8,
          },
          "-=0.3"
        ) // Slight overlap for smoother transition

        // Hold final message, then fade everything out
        .to(
          [finalMessageLine1Ref.current],
          {
            opacity: 0,
            y: "-20px",
            ease: "power2.inOut",
            duration: 0.8,
            stagger: 0.2, // Stagger the fade out slightly
          },
          "+=2"
        )

        // Fade out skip button
        .to(
          skipButtonRef.current,
          {
            opacity: 0,
            scale: 0.8,
            ease: "power2.in",
            duration: 0.5,
          },
          "-=0.6"
        )

        // Fade out container
        .to(
          container.current,
          {
            opacity: 0,
            visibility: "hidden",
            ease: "power2.inOut",
            duration: 1,
          },
          "-=0.4"
        ); // Start fading container slightly before text is fully gone

      tlRef.current = tl;

      // Cleanup
      return () => {
        if (tlRef.current) {
          tlRef.current.kill();
        }
      };
    }
  }, [hasViewed]);

  // Play audio when the button is clicked
  const playUnlockSound = () => {
    return new Promise((resolve) => {
      const unlockAudio = new Audio("/homepage/unlock.mp3");

      // Listen for when unlock sound ends
      unlockAudio.addEventListener("ended", () => {
        resolve(true);
        console.log(isClicked);
      });

      // Or resolve after a certain time if the audio is too long
      setTimeout(() => {
        resolve(true);
      }, 1500); // Adjust timeout based on unlock.mp3 duration

      unlockAudio.play().catch((error) => {
        console.log("Unlock audio playback failed:", error);
        resolve(true); // Resolve anyway to continue the sequence
      });
    });
  };

  // Function to start the main background audio
  const startMainAudio = () => {
    // Get the main audio element
    const mainAudio = document.getElementById(
      "main-hero-audio"
    ) as HTMLAudioElement | null;

    if (mainAudio) {
      mainAudio.muted = false;
      mainAudio.play().catch((error) => {
        console.log("Main audio playback failed:", error);
      });
    }
  };

  // Handle click event
  const handlePlayClick = async () => {
    // First play the unlock sound
    await playUnlockSound();

    // After unlock sound completes or timeout, start main audio
    setTimeout(() => {
      startMainAudio();
    }, 500); // Add a small additional delay for better effect

    // Start the animation
    if (tlRef.current) {
      tlRef.current.restart();
      setPlayClicked(true);
    }

    // Toggle the audio control state for App component
    setIsClicked(false); // Set to false to start playing in App component
  };

  // Handle skip button click
  const handleSkipClick = () => {
    if (tlRef.current) {
      // Jump to end of animation
      tlRef.current.progress(1);
      // Complete the animation
      tlRef.current.play();

      // Make sure main audio is playing
      startMainAudio();
    }
  };

  // Only show the component on the homepage and if not viewed yet
  if (hasViewed || pathname !== "/") {
    // Use pathname instead of location.pathname
    return null;
  }

  return (
    <div ref={container} className="fixed inset-0 z-50">
      <div className="h-[105vh] sm:h-screen overflow-hidden bg-[#F7F4F4] relative">
        {/* Button container */}
        <div
          className={`w-full h-screen flex justify-center items-center absolute top-0 left-0 z-50 ${
            isPlayClicked ? "hidden" : ""
          }`}
        >
          <div onClick={handlePlayClick}>
            <Button
              text="Open The Gate"
              color="text-black"
              bgColor="bg-amber-300"
              src="/homepage/gate-icon.svg"
              secondSrc="/btn-handle.png"
            />
          </div>
        </div>

        {/* Skip button - positioned in bottom right */}
        <div
          ref={skipButtonRef}
          className={`absolute bottom-30 md:bottom-14 left-[48%] z-50 cursor-pointer ${
            showSkipButton ? "block" : "hidden"
          }`}
          onClick={handleSkipClick}
        >
          <div className="text-zinc-400 font-medium rounded-md group hover:underline underline-offset-4 transition-colors flex items-center space-x-2">
            <span>Skip</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 block lg:hidden group-hover:block"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>

        {/* Gate halves */}
        <div className="flex justify-between absolute inset-0 z-10">
          <div ref={box1} className="h-full w-1/2">
            <img
              src="/homepage/left-gate.jpg"
              className="h-full w-full"
              alt="Left gate"
            />
          </div>
          <div ref={box2} className="h-full w-1/2">
            <img
              src="/homepage/right-gate.jpg"
              className="h-full w-full"
              alt="Right gate"
            />
          </div>
        </div>

        {/* Text elements - all positioned in the exact center */}
        <div
          ref={textContainerRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
        >
          {/* Text container for central positioning */}
          <div className="relative flex flex-col items-center justify-center -mt-40 sm:-mt-20">
            {/* First text - Welcome */}
            <h2
              ref={welcomeTextRef}
              className="text-2xl md:text-5xl font-bold text-[#F5C230] absolute"
            >
              Welcome
            </h2>

            {/* Second text - Company Name */}
            <h2
              ref={companyTextRef}
              className="text-2xl md:text-5xl font-bold text-[#F5C230] absolute whitespace-nowrap"
            >
              To Main Gate Design
            </h2>

            {/* Final message - both lines in absolute position */}
            <div
              ref={finalMessageLine1Ref}
              className="text-2xl md:text-5xl font-bold text-[#F5C230] absolute whitespace-nowrap"
            >
              <h2 className="">Your Gate Awaits.</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainGateHero;
