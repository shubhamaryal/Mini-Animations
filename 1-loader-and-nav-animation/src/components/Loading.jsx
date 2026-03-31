import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Loading = ({ setIsLoading, mainContentRef }) => {
  const [currentNumber, setCurrentNumber] = useState(0);
  const leftSectionRef = useRef(null);
  const rightSectionRef = useRef(null);
  const welRef = useRef(null);
  const comeRef = useRef(null);
  const leftNumberRef = useRef(null);
  const rightNumberRef = useRef(null);

  const numberSequence = [
    { left: "0", right: "0" },
    { left: "2", right: "4" },
    { left: "6", right: "7" },
    { left: "9", right: "9" },
  ];

  useGSAP(() => {
    if (currentNumber < numberSequence.length) {
      const timer = setTimeout(() => {
        setCurrentNumber((prev) => prev + 1);
      }, 350);
      return () => clearTimeout(timer);
    } else {
      const tl = gsap.timeline({
        onComplete: () => setIsLoading(false),
      });
      tl.to([leftNumberRef.current, rightNumberRef.current], {
        opacity: 0,
        y: -50,
        duration: 0.5,
        ease: "power2.in",
      })
        .fromTo(
          welRef.current,
          { y: -100, opacity: 0, scale: 0.8 },
          { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
        )
        .fromTo(
          comeRef.current,
          { y: 100, opacity: 0, scale: 0.8 },
          { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
          "-=0.7"
        )
        .to([leftSectionRef.current, rightSectionRef.current], {
          y: (index) => (index === 0 ? "-100%" : "-100%"),
          duration: 1.5,
          ease: "power2.inOut",
          stagger: 0.1,
        })
        .to(mainContentRef.current, {
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        });
    }
  }, [currentNumber, setIsLoading, mainContentRef]);

  const currentDigits = numberSequence[currentNumber] || {
    left: "9",
    right: "9",
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen z-[100]">
      <div className="absolute top-0 left-1/2 h-full w-[1px] bg-white"></div>
      <div
        ref={leftSectionRef}
        className="absolute top-0 left-0 w-1/2 h-full bg-[#303030] flex items-center justify-end pr-4"
      >
        <div className="intro-logo flex flex-col items-end gap-8">
          <h1
            ref={welRef}
            className="text-9xl font-bold text-white opacity-0 font-['Dancing_Script']"
          >
            WEL
          </h1>
          <h1 ref={leftNumberRef} className="text-9xl font-bold text-white">
            {currentDigits.left}
          </h1>
        </div>
      </div>
      <div
        ref={rightSectionRef}
        className="absolute top-0 right-0 w-1/2 h-full bg-[#303030] flex items-center justify-start pl-4"
      >
        <div className="intro-logo flex flex-col items-start gap-8">
          <h1
            ref={comeRef}
            className="text-9xl font-bold text-white opacity-0 font-['Dancing_Script']"
          >
            COME
          </h1>
          <h1 ref={rightNumberRef} className="text-9xl font-bold text-white">
            {currentDigits.right}
          </h1>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <div className="w-12 h-12 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Loading;
