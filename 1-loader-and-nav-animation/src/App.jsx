import { useEffect, useRef, useState } from "react";
import LocomotiveScroll from "locomotive-scroll";
import gsap from "gsap";
import Loading from "./components/Loading";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Project from "./components/Project";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const mainContentRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
    return () => {
      if (locomotiveScroll) locomotiveScroll.destroy();
    };
  }, []);

  useEffect(() => {
    if (!isLoading) {
      window.addEventListener("mousemove", (e) => {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.7,
          ease: "power2.out",
          opacity: 1,
        });
      });
    }
  }, [isLoading]);

  return (
    <div className="overflow-hidden">
      {isLoading && (
        <Loading setIsLoading={setIsLoading} mainContentRef={mainContentRef} />
      )}

      {!isLoading && (
        <>
          <div
            ref={cursorRef}
            className="w-4 h-4 rounded-full bg-red-500 fixed pointer-events-none z-[99] opacity-0"
          ></div>
          <div ref={mainContentRef} className="w-full min-h-screen">
            <Navbar />
            <Hero />
            <Project />
          </div>
        </>
      )}
    </div>
  );
};

export default App;
