chrome.action.onClicked.addListener((tab) => {
  if (!tab.url.startsWith("chrome://")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: createExplosion
    });
  }
});

function createExplosion() {
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

  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 5 + 2;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.speedX = Math.random() * 4 - 2;
      this.speedY = Math.random() * 4 - 2;
      this.opacity = 1;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.opacity -= 0.02;

      if (this.opacity <= 0) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.opacity = 1;
        this.speedX = Math.random() * 4 - 2;
        this.speedY = Math.random() * 4 - 2;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
      ctx.fillStyle = `rgba(${parseInt(this.color.slice(1, 3), 16)}, ${parseInt(this.color.slice(3, 5), 16)}, ${parseInt(this.color.slice(5, 7), 16)}, ${this.opacity})`;
      ctx.fill();
    }
  }

  const particles = [];
  const numParticles = 100;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle(centerX, centerY));
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();

  setTimeout(() => {
    document.body.removeChild(canvas);
  }, 3000);
}
