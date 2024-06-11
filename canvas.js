const canvas = document.getElementById('canvas');
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
    this.length = getRandomInt(100) + 50;
    this.angle = Math.random() * 2 * Math.PI;
    this.color = colors[getRandomInt(colors.length)];
    this.speed = 1 + Math.random() * 2;
    this.opacity = 1;
  }

  update() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    this.opacity -= 0.02;

    if (this.opacity <= 0) {
      this.x = getRandomInt(canvas.width);
      this.y = getRandomInt(canvas.height);
      this.opacity = 1;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + Math.cos(this.angle) * this.length, this.y + Math.sin(this.angle) * this.length);
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
