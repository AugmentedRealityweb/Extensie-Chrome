function createTrail() {
  const canvas = document.createElement('canvas');
  canvas.id = 'trailCanvas';
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

  let trails = [];

  function drawTrail(event) {
    trails.push({
      x: event.clientX,
      y: event.clientY,
      alpha: 1,
    });
  }

  function animateTrails() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'source-over';

    trails.forEach((trail, index) => {
      ctx.fillStyle = `rgba(255, 105, 180, ${trail.alpha})`;
      ctx.shadowColor = `rgba(255, 105, 180, ${trail.alpha})`;
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.arc(trail.x, trail.y, 15, 0, Math.PI * 2, false);
      ctx.fill();

      trail.alpha -= 0.02;
      if (trail.alpha <= 0) {
        trails.splice(index, 1);
      }
    });

    requestAnimationFrame(animateTrails);
  }

  document.addEventListener('mousemove', drawTrail);
  requestAnimationFrame(animateTrails);

  setTimeout(() => {
    document.removeEventListener('mousemove', drawTrail);
    document.body.removeChild(canvas);
  }, 5000);
}

createTrail();
