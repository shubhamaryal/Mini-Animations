import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { IoHomeSharp } from "react-icons/io5";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { PiStackSimpleFill, PiPhoneDisconnectFill } from "react-icons/pi";

const Navbar = () => {
  const navbarItems = [
    { name: "Home", icon: <IoHomeSharp /> },
    { name: "About", icon: <BsFillInfoCircleFill /> },
    { name: "Services", icon: <PiStackSimpleFill /> },
    { name: "Contact", icon: <PiPhoneDisconnectFill /> },
  ];
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const letterRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(letterRef.current, {
      scale: 1.3,
      color: "#4B5563 ",
      duration: 0.3,
      ease: "power2.out",
      rotate: 4,
    });
  };
  
  const handleMouseLeave = () => {
    gsap.to(letterRef.current, {
      scale: 1,
      color: "#374151",
      duration: 0.3,
      ease: "power2.inOut",
      rotate: 0,
    });
  };

  return (
    <div className="w-full h-23 flex justify-between items-center mt-3 px-3 z-[1000] relative">
      <div
        ref={letterRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="font-bold text-6xl ml-7 cursor-pointer text-[#374151]"
      >
        S
      </div>
      <div className="flex gap-1">
        {navbarItems.map((item, index) => (
          <NavItem
            key={index}
            item={item}
            index={index}
            isHovered={hoveredIndex === index}
            onHover={() => setHoveredIndex(index)}
            onLeave={() => setHoveredIndex(null)}
          />
        ))}
      </div>
    </div>
  );
};

const NavItem = ({ item, isHovered, onHover, onLeave }) => {
  const iconRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const containerRef = useRef(null);

  const getTextWidth = (text) => text.length * 15 + 40;

  useEffect(() => {
    if (isHovered) {
      const tl = gsap.timeline();
      const textWidth = getTextWidth(item.name);
      tl.to(buttonRef.current, {
        width: textWidth,
        duration: 0.3,
        ease: "power2.out",
      });
      tl.to(
        iconRef.current,
        { opacity: 0, scale: 0.5, duration: 0.2, ease: "power2.out" },
        "-=0.1"
      );
      tl.fromTo(
        textRef.current,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.2, ease: "power2.out" },
        "-=0.1"
      );
    } else {
      const tl = gsap.timeline();
      tl.to(textRef.current, { opacity: 0, duration: 0.2, ease: "power2.in" });
      tl.to(
        iconRef.current,
        { opacity: 1, scale: 1, duration: 0.2, ease: "power2.in" },
        "-=0.1"
      );
      tl.to(
        buttonRef.current,
        { width: "60px", duration: 0.3, ease: "power2.in" },
        "-=0.1"
      );
    }
  }, [isHovered, item.name]);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center cursor-pointer overflow-hidden"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{ height: "70px" }}
    >
      <button
        ref={buttonRef}
        className="text-2xl p-7 bg-gray-700 rounded-3xl text-white transition-colors duration-300 flex items-center justify-center cursor-pointer"
        style={{
          backgroundColor: isHovered ? "#4B5563" : "#374151",
          width: "60px",
          height: "60px",
        }}
      >
        <div
          ref={iconRef}
          className="flex items-center justify-center absolute"
        >
          {item.icon}
        </div>
        <div
          ref={textRef}
          className="font-semibold text-white opacity-0 text-center whitespace-nowrap"
          style={{ pointerEvents: "none" }}
        >
          {item.name}
        </div>
      </button>
    </div>
  );
};

export default Navbar;
