import gsap from "gsap";

const element = document.querySelectorAll(".flair");
let count = 0;
const totalImg = element.length;
// console.log(totalImg);

let oldMousePosition = { x: 0, y: 0 };
let newMousePosition = { x: 0, y: 0 };
const MIN_DISTANCE = 3.5 * (96 / 2.54);

window.addEventListener("mousemove", (e) => {
    newMousePosition = {
        x: e.x,
        y: e.y,
    };

    calculation(newMousePosition, totalImg);
});

const calculation = (newMousePosition, totalImg) => {
    let travelDistance = Math.hypot(
        newMousePosition.x - oldMousePosition.x,
        newMousePosition.y - oldMousePosition.y,
    );

    if (travelDistance >= MIN_DISTANCE) {
        const el = element[count];

        // This resets each element's initial state before animating it. Else the animation will not work.
        gsap.set(el, {
            opacity: 0,
            scale: 0,
            y: 0,
            rotation: 0,
        });

        el.style.left = `${newMousePosition.x}px`;
        el.style.top = `${newMousePosition.y}px`;

        animateFlair(el);

        oldMousePosition = newMousePosition;
        count++;

        if (count >= totalImg) {
            count = 0;
        }
        // console.log(count);
    }
};

const animateFlair = (el) => {
    const tl = gsap.timeline();

    tl.to(el, {
        opacity: 1,
        scale: 1.5,
        ease: "elastic.out(1,0.3)",
        duration: 1,
    })
        .to(
            el,
            {
                rotation: "random([-360, 360])",
                duration: 2,
            },
            "<",
        )
        .to(
            el,
            {
                y: "120vh",
                ease: "back.in(.4)",
                duration: 1.5,
            },
            0,
        );
};
