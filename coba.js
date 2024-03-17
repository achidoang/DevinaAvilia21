// // helper functions
// const PI2 = Math.PI * 2;
// const random = (min, max) => (Math.random() * (max - min + 1) + min) | 0;
// const timestamp = (_) => new Date().getTime();

// // container
// class Birthday {
//   constructor() {
//     this.resize();

//     // create a lovely place to store the firework
//     this.fireworks = [];
//     this.counter = 0;
//   }

//   resize() {
//     this.width = canvas.width = window.innerWidth;
//     let center = (this.width / 2) | 0;
//     this.spawnA = (center - center / 4) | 0;
//     this.spawnB = (center + center / 4) | 0;

//     this.height = canvas.height = window.innerHeight;
//     this.spawnC = this.height * 0.1;
//     this.spawnD = this.height * 0.5;
//   }

//   onClick(evt) {
//     let x = evt.clientX || (evt.touches && evt.touches[0].pageX);
//     let y = evt.clientY || (evt.touches && evt.touches[0].pageY);

//     let count = random(3, 5);
//     for (let i = 0; i < count; i++)
//       this.fireworks.push(
//         new Firework(
//           random(this.spawnA, this.spawnB),
//           this.height,
//           x,
//           y,
//           random(0, 260),
//           random(30, 110)
//         )
//       );

//     this.counter = -1;
//   }

//   update(delta) {
//     ctx.globalCompositeOperation = "hard-light";
//     ctx.fillStyle = `rgba(20,20,20,${7 * delta})`;
//     ctx.fillRect(0, 0, this.width, this.height);

//     ctx.globalCompositeOperation = "lighter";
//     for (let firework of this.fireworks) firework.update(delta);

//     // if enough time passed... create new new firework
//     this.counter += delta * 3; // each second
//     if (this.counter >= 1) {
//       this.fireworks.push(
//         new Firework(
//           random(this.spawnA, this.spawnB),
//           this.height,
//           random(0, this.width),
//           random(this.spawnC, this.spawnD),
//           random(0, 360),
//           random(30, 110)
//         )
//       );
//       this.counter = 0;
//     }

//     // remove the dead fireworks
//     if (this.fireworks.length > 1000)
//       this.fireworks = this.fireworks.filter((firework) => !firework.dead);
//   }
// }

// class Firework {
//   constructor(x, y, targetX, targetY, shade, offsprings) {
//     this.dead = false;
//     this.offsprings = offsprings;

//     this.x = x;
//     this.y = y;
//     this.targetX = targetX;
//     this.targetY = targetY;

//     this.shade = shade;
//     this.history = [];
//   }
//   update(delta) {
//     if (this.dead) return;

//     let xDiff = this.targetX - this.x;
//     let yDiff = this.targetY - this.y;
//     if (Math.abs(xDiff) > 3 || Math.abs(yDiff) > 3) {
//       // is still moving
//       this.x += xDiff * 2 * delta;
//       this.y += yDiff * 2 * delta;

//       this.history.push({
//         x: this.x,
//         y: this.y,
//       });

//       if (this.history.length > 20) this.history.shift();
//     } else {
//       if (this.offsprings && !this.madeChilds) {
//         let babies = this.offsprings / 2;
//         for (let i = 0; i < babies; i++) {
//           let targetX =
//             (this.x + this.offsprings * Math.cos((PI2 * i) / babies)) | 0;
//           let targetY =
//             (this.y + this.offsprings * Math.sin((PI2 * i) / babies)) | 0;

//           birthday.fireworks.push(
//             new Firework(this.x, this.y, targetX, targetY, this.shade, 0)
//           );
//         }
//       }
//       this.madeChilds = true;
//       this.history.shift();
//     }

//     if (this.history.length === 0) this.dead = true;
//     else if (this.offsprings) {
//       for (let i = 0; this.history.length > i; i++) {
//         let point = this.history[i];
//         ctx.beginPath();
//         ctx.fillStyle = "hsl(" + this.shade + ",100%," + i + "%)";
//         ctx.arc(point.x, point.y, 1, 0, PI2, false);
//         ctx.fill();
//       }
//     } else {
//       ctx.beginPath();
//       ctx.fillStyle = "hsl(" + this.shade + ",100%,50%)";
//       ctx.arc(this.x, this.y, 1, 0, PI2, false);
//       ctx.fill();
//     }
//   }
// }

// let canvas = document.getElementById("birthday");
// let ctx = canvas.getContext("2d");

// let then = timestamp();

// let birthday = new Birthday();
// window.onresize = () => birthday.resize();
// document.onclick = (evt) => birthday.onClick(evt);
// document.ontouchstart = (evt) => birthday.onClick(evt);
// (function loop() {
//   requestAnimationFrame(loop);

//   let now = timestamp();
//   let delta = now - then;

//   then = now;
//   birthday.update(delta / 1000);
// })();

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
