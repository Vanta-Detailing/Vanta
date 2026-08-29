```javascript
/* =========================================
   VANTA DETAILING
   MAIN JAVASCRIPT
========================================= */


/* =========================================
   PAGE LOADER
========================================= */

const loader = document.querySelector(".loader");

if (loader) {

    setTimeout(() => {

        loader.classList.add("hidden");

        setTimeout(() => {

            if (loader.parentNode) {
                loader.parentNode.removeChild(loader);
            }

        }, 900);

    }, 2100);

}


/* =========================================
   CUSTOM CURSOR
========================================= */

const cursor = document.querySelector(".cursor");
const cursorRing = document.querySelector(".cursor-ring");

if (
    cursor &&
    cursorRing &&
    window.innerWidth > 900
) {

    let mouseX = 0;
    let mouseY = 0;

    let ringX = 0;
    let ringY = 0;


    document.addEventListener("mousemove", (event) => {

        mouseX = event.clientX;
        mouseY = event.clientY;

        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;

    });


    function animateCursor() {

        ringX += (mouseX - ringX) * 0.12;
        ringY += (mouseY - ringY) * 0.12;

        cursorRing.style.left = `${ringX}px`;
        cursorRing.style.top = `${ringY}px`;

        requestAnimationFrame(animateCursor);

    }

    animateCursor();


    document
        .querySelectorAll("a, button, input")
        .forEach((element) => {

            element.addEventListener(
                "mouseenter",
                () => {
                    cursorRing.classList.add("hover");
                }
            );

            element.addEventListener(
                "mouseleave",
                () => {
                    cursorRing.classList.remove("hover");
                }
            );

        });

}


/* =========================================
   NAVBAR SCROLL
========================================= */

const navbar = document.querySelector(".navbar");

if (navbar) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 60) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    });

}


/* =========================================
   MOBILE MENU
========================================= */

const menuButton =
    document.querySelector(".menu-button");

const navLinks =
    document.querySelector(".nav-links");


if (menuButton && navLinks) {

    menuButton.addEventListener("click", () => {

        menuButton.classList.toggle("active");

        navLinks.classList.toggle("active");

        document.body.classList.toggle("menu-open");

    });


    document
        .querySelectorAll(".nav-links a")
        .forEach((link) => {

            link.addEventListener("click", () => {

                menuButton.classList.remove("active");

                navLinks.classList.remove("active");

                document.body.classList.remove("menu-open");

            });

        });

}


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(

            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.12
            }

        );


    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });

} else {

    revealElements.forEach((element) => {

        element.classList.add("visible");

    });

}


/* =========================================
   FLOATING BUBBLES
========================================= */

const bubbleContainer =
    document.querySelector(".bubble-container");


function createBubble() {

    if (!bubbleContainer) return;


    const bubble =
        document.createElement("div");


    bubble.classList.add("bubble");


    const size =
        Math.random() * 25 + 5;


    const left =
        Math.random() * 100;


    const duration =
        Math.random() * 8 + 6;


    const delay =
        Math.random() * 2;


    bubble.style.width =
        `${size}px`;

    bubble.style.height =
        `${size}px`;

    bubble.style.left =
        `${left}%`;

    bubble.style.animationDuration =
        `${duration}s`;

    bubble.style.animationDelay =
        `${delay}s`;


    bubbleContainer.appendChild(
        bubble
    );


    setTimeout(() => {

        bubble.remove();

    }, (duration + delay) * 1000);

}


if (bubbleContainer) {

    setInterval(
        createBubble,
        900
    );

}


/* =========================================
   BEFORE / AFTER SLIDER
========================================= */

const comparisonSlider =
    document.querySelector(
        ".comparison-slider"
    );


const afterImage =
    document.querySelector(
        ".after-image"
    );


const comparisonHandle =
    document.querySelector(
        ".comparison-handle"
    );


if (
    comparisonSlider &&
    afterImage &&
    comparisonHandle
) {

    comparisonSlider.addEventListener(
        "input",
        (event) => {

            const value =
                event.target.value;


            afterImage.style.clipPath =
                `inset(0 0 0 ${value}%)`;


            comparisonHandle.style.left =
                `${value}%`;

        }
    );

}


/* =========================================
   ANIMATED COUNTERS
========================================= */

const counters =
    document.querySelectorAll(
        "[data-count]"
    );


if (
    counters.length &&
    "IntersectionObserver" in window
) {

    const counterObserver =
        new IntersectionObserver(

            (entries) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    const counter =
                        entry.target;


                    const target =
                        Number(
                            counter.dataset.count
                        );


                    const duration =
                        1500;


                    const startTime =
                        performance.now();


                    function updateCounter(
                        currentTime
                    ) {

                        const elapsed =
                            currentTime -
                            startTime;


                        const progress =
                            Math.min(
                                elapsed / duration,
                                1
                            );


                        const eased =
                            1 -
                            Math.pow(
                                1 - progress,
                                3
                            );


                        counter.textContent =
                            Math.floor(
                                target * eased
                            );


                        if (progress < 1) {

                            requestAnimationFrame(
                                updateCounter
                            );

                        } else {

                            counter.textContent =
                                target;

                        }

                    }


                    requestAnimationFrame(
                        updateCounter
                    );


                    counterObserver.unobserve(
                        counter
                    );

                });

            },

            {
                threshold: 0.7
            }

        );


    counters.forEach((counter) => {

        counterObserver.observe(
            counter
        );

    });

}


/* =========================================
   HERO PARALLAX
========================================= */

const heroImage =
    document.querySelector(
        ".hero-image"
    );


if (heroImage) {

    window.addEventListener(
        "scroll",
        () => {

            const scroll =
                window.scrollY;


            if (
                scroll <
                window.innerHeight
            ) {

                heroImage.style.transform =
                    `scale(1.06)
                     translateY(${scroll * 0.08}px)`;

            }

        }
    );

}


/* =========================================
   MOUSE LIGHT EFFECT
========================================= */

document.addEventListener(
    "mousemove",
    (event) => {

        const x =
            (event.clientX /
                window.innerWidth) *
            100;


        const y =
            (event.clientY /
                window.innerHeight) *
            100;


        document.documentElement.style
            .setProperty(
                "--mouse-x",
                `${x}%`
            );


        document.documentElement.style
            .setProperty(
                "--mouse-y",
                `${y}%`
            );

    }
);


/* =========================================
   SERVICE CARD TILT
========================================= */

const serviceCards =
    document.querySelectorAll(
        ".service-card"
    );


serviceCards.forEach((card) => {

    card.addEventListener(
        "mousemove",
        (event) => {

            if (window.innerWidth < 900) {
                return;
            }


            const rect =
                card.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            const centerX =
                rect.width / 2;


            const centerY =
                rect.height / 2;


            const rotateX =
                ((y - centerY) /
                    centerY) *
                -2;


            const rotateY =
                ((x - centerX) /
                    centerX) *
                2;


            card.style.transform =
                `translateY(-12px)
                 perspective(800px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)`;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform = "";

        }
    );

});


/* =========================================
   BUTTON RIPPLE
========================================= */

document
    .querySelectorAll(
        ".button, .big-button"
    )
    .forEach((button) => {

        button.addEventListener(
            "click",
            (event) => {

                const ripple =
                    document.createElement(
                        "span"
                    );


                ripple.classList.add(
                    "button-ripple"
                );


                ripple.style.left =
                    `${event.offsetX}px`;


                ripple.style.top =
                    `${event.offsetY}px`;


                button.appendChild(
                    ripple
                );


                setTimeout(() => {

                    ripple.remove();

                }, 700);

            }
        );

    });


/* =========================================
   SMOOTH ANCHOR SCROLL
========================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach((anchor) => {

        anchor.addEventListener(
            "click",
            function (event) {

                const href =
                    this.getAttribute("href");


                if (
                    !href ||
                    href === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        href
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


/* =========================================
   CONSOLE MESSAGE
========================================= */

console.log(
    "%c VANTA DETAILING ",
    "background:#fff;color:#000;padding:8px;font-weight:bold;"
);

console.log(
    "Precision in every detail."
);
```
