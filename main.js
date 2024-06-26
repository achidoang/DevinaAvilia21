// helper functions
const PI2 = Math.PI * 2;
const random = (min, max) => (Math.random() * (max - min + 1) + min) | 0;
const timestamp = (_) => new Date().getTime();

// container
class Birthday {
  constructor() {
    this.resize();

    // create a lovely place to store the firework
    this.fireworks = [];
    this.counter = 0;
  }

  resize() {
    this.width = canvas.width = window.innerWidth;
    let center = (this.width / 2) | 0;
    this.spawnA = (center - center / 4) | 0;
    this.spawnB = (center + center / 4) | 0;

    this.height = canvas.height = window.innerHeight;
    this.spawnC = this.height * 0.1;
    this.spawnD = this.height * 0.5;
  }

  onClick(evt) {
    let x = evt.clientX || (evt.touches && evt.touches[0].pageX);
    let y = evt.clientY || (evt.touches && evt.touches[0].pageY);

    let count = random(3, 5);
    for (let i = 0; i < count; i++)
      this.fireworks.push(
        new Firework(
          random(this.spawnA, this.spawnB),
          this.height,
          x,
          y,
          random(0, 260),
          random(30, 110)
        )
      );

    this.counter = -1;
  }

  update(delta) {
    ctx.globalCompositeOperation = "hard-light";
    ctx.fillStyle = `rgba(20,20,20,${7 * delta})`;
    ctx.fillRect(0, 0, this.width, this.height);

    ctx.globalCompositeOperation = "lighter";
    for (let firework of this.fireworks) firework.update(delta);

    // if enough time passed... create new new firework
    this.counter += delta * 3; // each second
    if (this.counter >= 1) {
      this.fireworks.push(
        new Firework(
          random(this.spawnA, this.spawnB),
          this.height,
          random(0, this.width),
          random(this.spawnC, this.spawnD),
          random(0, 360),
          random(30, 110)
        )
      );
      this.counter = 0;
    }

    // remove the dead fireworks
    if (this.fireworks.length > 1000)
      this.fireworks = this.fireworks.filter((firework) => !firework.dead);
  }
}

class Firework {
  constructor(x, y, targetX, targetY, shade, offsprings) {
    this.dead = false;
    this.offsprings = offsprings;

    this.x = x;
    this.y = y;
    this.targetX = targetX;
    this.targetY = targetY;

    this.shade = shade;
    this.history = [];
  }
  update(delta) {
    if (this.dead) return;

    let xDiff = this.targetX - this.x;
    let yDiff = this.targetY - this.y;
    if (Math.abs(xDiff) > 3 || Math.abs(yDiff) > 3) {
      // is still moving
      this.x += xDiff * 2 * delta;
      this.y += yDiff * 2 * delta;

      this.history.push({
        x: this.x,
        y: this.y,
      });

      if (this.history.length > 20) this.history.shift();
    } else {
      if (this.offsprings && !this.madeChilds) {
        let babies = this.offsprings / 2;
        for (let i = 0; i < babies; i++) {
          let targetX =
            (this.x + this.offsprings * Math.cos((PI2 * i) / babies)) | 0;
          let targetY =
            (this.y + this.offsprings * Math.sin((PI2 * i) / babies)) | 0;

          birthday.fireworks.push(
            new Firework(this.x, this.y, targetX, targetY, this.shade, 0)
          );
        }
      }
      this.madeChilds = true;
      this.history.shift();
    }

    if (this.history.length === 0) this.dead = true;
    else if (this.offsprings) {
      for (let i = 0; this.history.length > i; i++) {
        let point = this.history[i];
        ctx.beginPath();
        ctx.fillStyle = "hsl(" + this.shade + ",100%," + i + "%)";
        ctx.arc(point.x, point.y, 1, 0, PI2, false);
        ctx.fill();
      }
    } else {
      ctx.beginPath();
      ctx.fillStyle = "hsl(" + this.shade + ",100%,50%)";
      ctx.arc(this.x, this.y, 1, 0, PI2, false);
      ctx.fill();
    }
  }
}

let canvas = document.getElementById("birthday");
let ctx = canvas.getContext("2d");

let then = timestamp();

let birthday = new Birthday();
window.onresize = () => birthday.resize();
document.onclick = (evt) => birthday.onClick(evt);
document.ontouchstart = (evt) => birthday.onClick(evt);
(function loop() {
  requestAnimationFrame(loop);

  let now = timestamp();
  let delta = now - then;

  then = now;
  birthday.update(delta / 1000);
})();

// Parallax
let text = document.getElementById("text");
let bg = document.getElementById("bg");
let mountain = document.getElementById("mountain");
let moon = document.getElementById("moon");
let moon1 = document.getElementById("moon1");
let road = document.getElementById("road");

window.addEventListener("scroll", function () {
  let value = window.scrollY;
  // Kecepatan Default
  let speedMountain = 1;
  let speedFactor = 1;
  let speedText = 1.3;
  let speedText2 = 0;
  let speedBg = 1;

  // Atur kecepatan lebih lambat untuk layar ponsel
  if (window.innerWidth <= 768) {
    speedText = 0.6;
    speedText2 = -40;
    speedMountain = 1;
    speedFactor = 1.2;
    speedBg = 1.3;
  }

  bg.style.top = 265 + value * -0.2 * speedFactor * speedBg + "px";
  moon.style.left = 1150 + value * -0.5 * speedFactor + "px";
  moon1.style.top = 300 + value * 0.07 + "px";
  moon1.style.left = -350 + value * 0.65 + "px";

  mountain.style.top = 770 + value * -0.77 * speedFactor * speedMountain + "px";
  road.style.top = 500 + value * -0.4 * speedFactor + "px";
  text.style.top =
    speedText2 + -160 + value * 0.1 * speedFactor * speedText + "px";
});

// show % hidden element
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry);
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));

// Alert
// Ambil tombol dengan kelas close-btn
var closeButton = document.querySelector(".close-btn");
// Ambil popup-container
var popupContainer = document.querySelector(".popup-container");

// Tambahkan event listener untuk klik tombol
closeButton.addEventListener("click", function () {
  // Sembunyikan popup-container
  popupContainer.style.display = "none";
  // Hapus kelas body-lock-scroll
  document.body.classList.remove("body-lock-scroll");
});

// Tampilkan popup-container
popupContainer.style.display = "flex";
// Tambahkan kelas body-lock-scroll untuk mengunci scroll
document.body.classList.add("body-lock-scroll");
