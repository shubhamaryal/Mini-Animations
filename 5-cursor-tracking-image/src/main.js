import gsap from "gsap";

const container = gsap.utils.toArray(".container");
// console.log(container);

container.forEach((el) => {
    // console.log(el);

    const image = el.querySelector("img.swipeimage");
    // console.log(image);

    const moveX = gsap.quickTo(image, "x", {
        duration: 0.3,
        ease: "power3",
    });
    const moveY = gsap.quickTo(image, "y", {
        duration: 0.3,
        ease: "power3",
    });

    el.addEventListener("mouseenter", (e) => {
        gsap.set(image, {
            x: e.clientX,
            y: e.clientY,
        });

        gsap.to(image, {
            opacity: 1,
            visibility: "visible",
            duration: 0.3,
        });

        moveX(e.clientX);
        moveY(e.clientY);
    });

    el.addEventListener("mousemove", (e) => {
        moveX(e.clientX);
        moveY(e.clientY);
    });

    el.addEventListener("mouseleave", () => {
        gsap.to(image, {
            visibility: "hidden",
            opacity: 0,
        });
    });

    // const quickX = gsap.quickTo(image, "x", { duration: 0.3, ease: "power3" });
    // const quickY = gsap.quickTo(image, "x", { duration: 0.3, ease: "power3" });
});
