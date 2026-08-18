function child() {

    const boxA = document.getElementById("boxA");

    const children = boxA.querySelectorAll("h3");

    const color = document.getElementById("ids").value;

    const target = Number(
        document.getElementById("idtt").value
    );

    const button = document.getElementById("applyBtn");


    // Reset tất cả Child

    children.forEach((item) => {

        item.style.color = "#e9f1eb";

        item.style.transform = "translateX(0)";

        item.style.textShadow = "none";

    });


    // Đổi màu Child được chọn

    children[target].style.color = color;

    children[target].style.transform =
        "translateX(12px) scale(1.03)";

    children[target].style.textShadow =
        `0 0 25px ${color}`;
    children[target].classList.remove("activate");

// ép trình duyệt reset animation
    void children[target].offsetWidth;

    children[target].classList.add("activate");

    setTimeout(() => {
    children[target].classList.remove("activate");
}, 700);

    // Animation nút

    button.style.transform = "scale(0.96)";

    setTimeout(() => {

        button.style.transform = "";

    }, 120);

}
/* =========================
   3D TILT EFFECT
========================= */

const card = document.querySelector(".lab-card");

if (card) {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX =
            ((y - centerY) / centerY) * -3;

        const rotateY =
            ((x - centerX) / centerX) * 3;

        card.style.transform =
            `perspective(1200px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-3px)`;

        card.style.setProperty(
            "--mouse-x",
            `${(x / rect.width) * 100}%`
        );

        card.style.setProperty(
            "--mouse-y",
            `${(y / rect.height) * 100}%`
        );
    });


    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0)";

    });

}