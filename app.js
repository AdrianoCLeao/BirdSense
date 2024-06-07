
const parallax_el = document.querySelectorAll(".parallax");
const main = document.querySelector("main");

let xValue = 0, yValue = 0;
let rotateDegree = 0;

function update(cursorPosition) {
    parallax_el.forEach((el) => {
        let speedx = parseFloat(el.dataset.speedx);
        let speedy = parseFloat(el.dataset.speedy);
        let speedz = parseFloat(el.dataset.speedz) || 0.1;
        let rotate = parseFloat(el.dataset.rotate) || 1;

        let isInLeft = parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;
        let zValue = (cursorPosition - parseFloat(getComputedStyle(el).left)) * isInLeft;

        el.style.transform = `translateX(calc(-50% + ${-xValue * speedx}px)) rotateY(${rotateDegree * rotate}deg) translateY(calc(-50% + ${-yValue * speedy}px)) perspective(2300px) translateZ(${zValue * speedz}px)`;
    });
}

update(0);

window.addEventListener("mousemove", (e) => {
    xValue = e.clientX - window.innerWidth / 2;
    yValue = e.clientY - window.innerHeight / 2;

    rotateDegree = (xValue / (window.innerWidth / 2)) * 10;

    update(e.clientX);
});

if(window.innerHeight >=725){
    main.style.maxHeight = `${window.innerWidth * 0.6}px`;
} else{
    main.style.maxHeight = `${window.innerWidth * 1.6}px`;
}
