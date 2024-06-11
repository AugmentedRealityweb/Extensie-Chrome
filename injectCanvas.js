const existingCanvas = document.getElementById('animationCanvas');
if (existingCanvas) {
  document.body.removeChild(existingCanvas);
}

const canvas = document.createElement('canvas');
canvas.id = 'animationCanvas';
canvas.style.position = 'fixed';
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.width = '100vw';
canvas.style.height = '100vh';
canvas.style.zIndex = 9999;
canvas.style.pointerEvents = 'none';
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const colors = ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33F3'];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

class Line {
  constructor() {
    this.x = getRandomInt(canvas.width);
    this.y = getRandomInt(canvas.height);
    this.controlX = this.x + getRandomInt(100) - 50;
    this.controlY = this.y + getRandomInt(100) - 50;
    this.endX = this.x + getRandomInt(100) - 50;
    this.endY = this.y + getRandomInt(100) - 50;
    this.color = colors[getRandomInt(colors.length)];
    this.speed = 1 + Math.random();
    this.opacity = 1;
  }

  update() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    this.controlX += Math.cos(this.angle + 0.5) * this.speed;
    this.controlY += Math.sin(this.angle + 0.5) * this.speed;
    this.endX += Math.cos(this.angle + 1) * this.speed;
    this.endY += Math.sin(this.angle + 1) * this.speed;
    this.opacity -= 0.02;

    if (this.opacity <= 0) {
      this.x = getRandomInt(canvas.width);
      this.y = getRandomInt(canvas.height);
      this.controlX = this.x + getRandomInt(100) - 50;
      this.controlY = this.y + getRandomInt(100) - 50;
      this.endX = this.x + getRandomInt(100) - 50;
      this.endY = this.y + getRandomInt(100) - 50;
      this.opacity = 1;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.quadraticCurveTo(this.controlX, this.controlY, this.endX, this.endY);
    ctx.strokeStyle = `rgba(${parseInt(this.color.slice(1, 3), 16)}, ${parseInt(this.color.slice(3, 5), 16)}, ${parseInt(this.color.slice(5, 7), 16)}, ${this.opacity})`;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

const lines = [];
for (let i = 0; i < 20; i++) {
  lines.push(new Line());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  lines.forEach(line => {
    line.update();
    line.draw();
  });

  requestAnimationFrame(animate);
}

animate();

setTimeout(() => {
  document.body.removeChild(canvas);
}, 3000);
