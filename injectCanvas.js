function createFireworks() {
  const canvas = document.createElement('canvas');
  canvas.id = 'fireworksCanvas';
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

  let fireworks = [];

  function Firework(x, y) {
    this.x = x;
    this.y = y;
    this.age = 0;
    this.particles = [];
    for (let i = 0; i < 100; i++) {
      this.particles.push(new Particle(this.x, this.y));
    }
  }

  Firework.prototype.update = function () {
    this.age++;
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].update();
      if (this.particles[i].age > 100) {
        this.particles.splice(i, 1);
        i--;
      }
    }
  };

  Firework.prototype.draw = function () {
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].draw();
    }
  };

  function Particle(x, y) {
    this.x = x;
    this.y = y;
    this.speed = Math.random() * 4 + 1;
    this.angle = Math.random() * 2 * Math.PI;
    this.age = 0;
    this.opacity = 1;
    this.color = `hsla(${Math.random() * 360}, 100%, 50%, ${this.opacity})`;
  }

  Particle.prototype.update = function () {
    this.age++;
    this.opacity -= 0.01;
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
  };

  Particle.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  };

  function animateFireworks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < fireworks.length; i++) {
      fireworks[i].update();
      fireworks[i].draw();
      if (fireworks[i].particles.length === 0) {
        fireworks.splice(i, 1);
        i--;
      }
    }
    requestAnimationFrame(animateFireworks);
  }

  document.addEventListener('click', (event) => {
    fireworks.push(new Firework(event.clientX, event.clientY));
  });

  animateFireworks();

  setTimeout(() => {
    document.removeEventListener('click', this);
    document.body.removeChild(canvas);
  }, 10000);
}

createFireworks();
