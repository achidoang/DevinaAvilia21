// ===================================
// ===================================
function fn() {
  window.requestAnimFrame = (function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      }
    );
  })();
  var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    w = (canvas.width = window.innerWidth),
    h = (canvas.height = window.innerHeight),
    hue = 217,
    stars = [],
    count = 0,
    maxStars = 1200;
  var canvas2 = document.createElement("canvas"),
    ctx2 = canvas2.getContext("2d");
  canvas2.width = 100;
  canvas2.height = 100;
  var half = canvas2.width / 2,
    gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
  gradient2.addColorStop(0.025, "#fff");
  gradient2.addColorStop(0.1, "hsl(" + hue + ", 61%, 33%)");
  gradient2.addColorStop(0.25, "hsl(" + hue + ", 64%, 6%)");
  gradient2.addColorStop(1, "transparent");
  ctx2.fillStyle = gradient2;
  ctx2.beginPath();
  ctx2.arc(half, half, half, 0, Math.PI * 2);
  ctx2.fill();
  function random(min, max) {
    if (arguments.length < 2) {
      max = min;
      min = 0;
    }
    if (min > max) {
      var hold = max;
      max = min;
      min = hold;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function maxOrbit(x, y) {
    var max = Math.max(x, y),
      diameter = Math.round(Math.sqrt(max * max + max * max));
    return diameter / 2;
  }

  var Star = function () {
    this.orbitRadius = random(maxOrbit(w, h));
    this.radius = random(60, this.orbitRadius) / 12;
    this.orbitX = w / 2;
    this.orbitY = h / 2;
    this.timePassed = random(0, maxStars);
    this.speed = random(this.orbitRadius) / 900000;
    this.alpha = random(2, 10) / 10;
    count++;
    stars[count] = this;
  };
  Star.prototype.draw = function () {
    var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
      y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
      twinkle = random(10);
    if (twinkle === 1 && this.alpha > 0) {
      this.alpha -= 0.05;
    } else if (twinkle === 2 && this.alpha < 1) {
      this.alpha += 0.05;
    }
    ctx.globalAlpha = this.alpha;
    ctx.drawImage(
      canvas2,
      x - this.radius / 2,
      y - this.radius / 2,
      this.radius,
      this.radius
    );
    this.timePassed += this.speed;
  };
  for (var i = 0; i < maxStars; i++) {
    new Star();
  }
  function animation() {
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 0.8;
    ctx.fillStyle = "hsla(" + hue + ", 64%, 6%, 1)";
    ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = "lighter";
    for (var i = 1, l = stars.length; i < l; i++) {
      stars[i].draw();
    }
    window.requestAnimationFrame(animation);
  }

  animation();
}
fn();

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
