"use client";
import Hero from "./components/ui/homepage/Hero";
import MainGateHero from "./components/ui/homepage/mainGateHero";

const Homepage = ({ isClicked, setIsClicked }: any) => {
  return (
    <>
      <div>
        <div className="relative -top-21 z-70 main-gate-hero">
          <MainGateHero isClicked={isClicked} setIsClicked={setIsClicked} />
        </div>
        <div className="relative -top-21">
          <Hero />
        </div>
        {/* <About />
      <Parallax />
      <Services /> */}
      </div>
    </>
  );
};

export default Homepage;
