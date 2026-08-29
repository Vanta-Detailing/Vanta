const loader = document.querySelector(".loader");

if (loader) {
    setTimeout(() => {
        loader.classList.add("hidden");

        setTimeout(() => {
            loader.remove();
        }, 900);
    }, 2000);
}


/* CUSTOM CURSOR */

const cursor = document.querySelector(".cursor");
const cursorRing = document.querySelector(".cursor-ring");

if (cursor && cursorRing && window.innerWidth > 900) {

    let mouseX = 0;
    let mouseY = 0;

    let ringX = 0;
    let ringY = 0;

    document.addEventListener("mousemove", function(event) {

        mouseX = event.clientX;
        mouseY = event.clientY;

        cursor.style.left = mouseX + "px";
        cursor.style.top = mouseY + "px";

    });

    function animateCursor() {

        ringX += (mouseX - ringX) * 0.12;
        ringY += (mouseY - ringY) * 0.12;

        cursorRing.style.left = ringX + "px";
        cursorRing.style.top = ringY + "px";

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

}


/* NAVBAR */

const navbar = document.querySelector(".navbar");

if (navbar) {

    window.addEventListener("scroll", function() {

        if (window.scrollY > 60) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    });

}


/* MOBILE MENU */

const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelector(".nav-links");

if (menuButton && navLinks) {

    menuButton.addEventListener("click", function() {

        menuButton.classList.toggle("active");
        navLinks.classList.toggle("active");
        document.body.classList.toggle("menu-open");

    });

}


/* SCROLL REVEAL */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(function(entries) {

    entries.forEach(function(entry) {

        if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            revealObserver.unobserve(entry.target);

        }

    });

}, {
    threshold: 0.15
});


revealElements.forEach(function(element) {
    revealObserver.observe(element);
});


/* BUBBLES */

const bubbleContainer = document.querySelector(".bubble-container");

function createBubble() {

    if (!bubbleContainer) return;

    const bubble = document.createElement("div");

    bubble.classList.add("bubble");

    const size = Math.random() * 25 + 5;
    const left = Math.random() * 100;
    const duration = Math.random() * 8 + 6;

    bubble.style.width = size + "px";
    bubble.style.height = size + "px";
    bubble.style.left = left + "%";
    bubble.style.animationDuration = duration + "s";

    bubbleContainer.appendChild(bubble);

    setTimeout(function() {
        bubble.remove();
    }, duration * 1000);

}

setInterval(createBubble, 800);


/* BEFORE / AFTER */

const comparisonSlider =
    document.querySelector(".comparison-slider");

const afterImage =
    document.querySelector(".after-image");

const comparisonHandle =
    document.querySelector(".comparison-handle");

if (
    comparisonSlider &&
    afterImage &&
    comparisonHandle
) {

    comparisonSlider.addEventListener("input", function(event) {

        const value = event.target.value;

        afterImage.style.clipPath =
            "inset(0 0 0 " + value + "%)";

        comparisonHandle.style.left =
            value + "%";

    });

}


/* COUNTERS */

const counters =
    document.querySelectorAll("[data-count]");

const counterObserver =
    new IntersectionObserver(function(entries) {

        entries.forEach(function(entry) {

            if (!entry.isIntersecting) return;

            const counter = entry.target;

            const target =
                Number(counter.dataset.count);

            let current = 0;

            const duration = 1500;

            const startTime =
                performance.now();

            function updateCounter(currentTime) {

                const progress =
                    Math.min(
                        (currentTime - startTime) / duration,
                        1
                    );

                current =
                    Math.floor(target * progress);

                counter.textContent = current;

                if (progress < 1) {

                    requestAnimationFrame(updateCounter);

                } else {

                    counter.textContent = target;

                }

            }

            requestAnimationFrame(updateCounter);

            counterObserver.unobserve(counter);

        });

    }, {
        threshold: 0.7
    });


counters.forEach(function(counter) {
    counterObserver.observe(counter);
});


/* HERO PARALLAX */

const heroImage =
    document.querySelector(".hero-image");

if (heroImage) {

    window.addEventListener("scroll", function() {

        if (window.scrollY < window.innerHeight) {

            heroImage.style.transform =
                "scale(1.08) translateY(" +
                window.scrollY * 0.06 +
                "px)";

        }

    });

}


/* MOUSE LIGHT */

document.addEventListener("mousemove", function(event) {

    const x =
        (event.clientX / window.innerWidth) * 100;

    const y =
        (event.clientY / window.innerHeight) * 100;

    document.documentElement.style.setProperty(
        "--mouse-x",
        x + "%"
    );

    document.documentElement.style.setProperty(
        "--mouse-y",
        y + "%"
    );

});


/* SERVICE CARD TILT */

const serviceCards =
    document.querySelectorAll(".service-card");

serviceCards.forEach(function(card) {

    card.addEventListener("mousemove", function(event) {

        if (window.innerWidth < 900) return;

        const rect =
            card.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

        const centerX =
            rect.width / 2;

        const centerY =
            rect.height / 2;

        const rotateX =
            ((y - centerY) / centerY) * -2;

        const rotateY =
            ((x - centerX) / centerX) * 2;

        card.style.transform =
            "translateY(-10px) perspective(800px) " +
            "rotateX(" + rotateX + "deg) " +
            "rotateY(" + rotateY + "deg)";

    });


    card.addEventListener("mouseleave", function() {

        card.style.transform = "";

    });

});


/* SMOOTH SCROLL */

document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {

    anchor.addEventListener("click", function(event) {

        const targetID =
            this.getAttribute("href");

        if (!targetID || targetID === "#") return;

        const target =
            document.querySelector(targetID);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth"
        });

    });

});


console.log("VANTA DETAILING loaded successfully.");
