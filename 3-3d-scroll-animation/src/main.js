import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

const wrapper = document.querySelector(".wrapper");
const container = document.querySelector(".container");
const items = document.querySelectorAll(".item");

const radius = Math.min(window.innerWidth, window.innerHeight) * 0.4;
const spacing = 90 / items.length;

items.forEach((item, index) => {
    const angle = (index * spacing * Math.PI) / 180;
    const rotationAngle = index * -spacing;

    const y = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;

    item.style.transform = `translate(-50%, -50%) translate3d(0, ${y}px, ${z}px) rotateX(${rotationAngle}deg)`;
});

ScrollTrigger.create({
    trigger: wrapper,
    start: "center center",
    end: "+=2000",
    scrub: true,
    pin: container,
    animation: gsap.fromTo(
        wrapper,
        {
            routateX: -90,
        },
        { rotateX: 270, duration: 1.2, ease: "none" },
    ),
});
