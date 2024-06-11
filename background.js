chrome.action.onClicked.addListener((tab) => {
  chrome.storage.sync.get('effect', (data) => {
    const effect = data.effect || 'explosion';
    if (!tab.url.startsWith("chrome://")) {
      if (effect === 'explosion') {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: createExplosion
        });
      } else if (effect === 'trail') {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: createTrail
        });
      } else if (effect === 'clickExplosions') {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: createClickExplosions
        });
      }
    }
  });
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

function createTrail() {
  const trailHandler = (event) => {
    const trail = document.createElement('div');
    trail.style.position = 'fixed';
    trail.style.top = `${event.clientY}px`;
    trail.style.left = `${event.clientX}px`;
    trail.style.width = '10px';
    trail.style.height = '10px';
    trail.style.backgroundColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
    trail.style.borderRadius = '50%';
    trail.style.pointerEvents = 'none';
    document.body.appendChild(trail);

    setTimeout(() => {
      trail.remove();
    }, 1000);
  };

  document.addEventListener('mousemove', trailHandler);

  setTimeout(() => {
    document.removeEventListener('mousemove', trailHandler);
  }, 3000);
}

function createClickExplosions() {
  const clickHandler = (event) => {
    const numParticles = 30;
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33F3'];

    for (let i = 0; i < numParticles; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'fixed';
      particle.style.top = `${event.clientY}px`;
      particle.style.left = `${event.clientX}px`;
      particle.style.width = '5px';
      particle.style.height = '5px';
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      particle.style.borderRadius = '50%';
      particle.style.pointerEvents = 'none';
      document.body.appendChild(particle);

      const angle = Math.random() * 2 * Math.PI;
      const speed = Math.random() * 5;

      function animateParticle() {
        particle.style.top = `${parseFloat(particle.style.top) + Math.sin(angle) * speed}px`;
        particle.style.left = `${parseFloat(particle.style.left) + Math.cos(angle) * speed}px`;
        particle.style.opacity = parseFloat(particle.style.opacity) - 0.02;

        if (parseFloat(particle.style.opacity) <= 0) {
          particle.remove();
        } else {
          requestAnimationFrame(animateParticle);
        }
      }

      animateParticle();
    }
  };

  document.addEventListener('click', clickHandler);

  setTimeout(() => {
    document.removeEventListener('click', clickHandler);
  }, 3000);
}
