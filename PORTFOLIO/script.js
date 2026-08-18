/* =========================
   DIGITAL GARDEN
========================= */

const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

let particles = [];
let mouse = {
    x: null,
    y: null
};

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

window.addEventListener("mousemove", (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

window.addEventListener("mouseleave", () => {
    mouse.x = null;
    mouse.y = null;
});


/* Tạo các hạt */

class Particle {

    constructor() {

        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.size = Math.random() * 2 + 1;

        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
    }

    update() {

        this.x += this.speedX;
        this.y += this.speedY;

        /* Chạm mép thì quay lại */

        if (this.x < 0 || this.x > canvas.width) {
            this.speedX *= -1;
        }

        if (this.y < 0 || this.y > canvas.height) {
            this.speedY *= -1;
        }


        /* Tương tác với chuột */

        if (mouse.x !== null) {

            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;

            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 130) {

                const force = (130 - distance) / 130;

                this.x -= dx * force * 0.015;
                this.y -= dy * force * 0.015;
            }
        }
    }

    draw() {

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "#67f59b";

        ctx.shadowBlur = 10;
        ctx.shadowColor = "#67f59b";

        ctx.fill();

        ctx.shadowBlur = 0;
    }
}


/* Tạo 90 hạt */

function createParticles() {

    particles = [];

    for (let i = 0; i < 90; i++) {

        particles.push(
            new Particle()
        );

    }
}

createParticles();


/* Nối các hạt gần nhau */

function connectParticles() {

    for (let i = 0; i < particles.length; i++) {

        for (let j = i + 1; j < particles.length; j++) {

            const dx =
                particles[i].x - particles[j].x;

            const dy =
                particles[i].y - particles[j].y;

            const distance =
                Math.sqrt(dx * dx + dy * dy);


            if (distance < 120) {

                const opacity =
                    1 - distance / 120;

                ctx.beginPath();

                ctx.strokeStyle =
                    `rgba(103,245,155,${opacity * 0.25})`;

                ctx.lineWidth = 1;

                ctx.moveTo(
                    particles[i].x,
                    particles[i].y
                );

                ctx.lineTo(
                    particles[j].x,
                    particles[j].y
                );

                ctx.stroke();
            }
        }
    }
}


/* Animation */

function animate() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particles.forEach((particle) => {

        particle.update();
        particle.draw();

    });

    connectParticles();

    requestAnimationFrame(animate);
}

animate();
/* =========================
   BOOT SEQUENCE
========================= */

const bootScreen = document.getElementById("bootScreen");
const progressBar = document.getElementById("progressBar");
const bootPercent = document.getElementById("bootPercent");
const bootWelcome = document.getElementById("bootWelcome");
const skipBoot = document.getElementById("skipBoot");

let progress = 0;

const bootInterval = setInterval(() => {

    progress += Math.floor(Math.random() * 5) + 1;

    if (progress >= 100) {
        progress = 100;

        clearInterval(bootInterval);

        progressBar.style.width = "100%";
        bootPercent.textContent = "100%";

        setTimeout(() => {
            bootWelcome.classList.add("show");
        }, 300);

        setTimeout(() => {
            closeBoot();
        }, 1800);
    }

    progressBar.style.width = progress + "%";
    bootPercent.textContent = progress + "%";

}, 80);


/* Đóng boot */

function closeBoot() {

    bootScreen.classList.add("hide");

    document.body.classList.add("boot-done");

    document.body.style.overflow = "";

}


/* Nút SKIP */

skipBoot.addEventListener("click", () => {

    clearInterval(bootInterval);

    closeBoot();

});
/* =========================
   CURSOR SPOTLIGHT
========================= */

document.addEventListener("mousemove", (e) => {

    document.documentElement.style.setProperty(
        "--mouse-x",
        `${e.clientX}px`
    );

    document.documentElement.style.setProperty(
        "--mouse-y",
        `${e.clientY}px`
    );

});
/* =========================
   SCROLL REVEAL
========================= */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach((element) => {

    revealObserver.observe(element);

});