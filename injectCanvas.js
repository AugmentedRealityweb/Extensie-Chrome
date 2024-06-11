function createTrail() {
  const trailHandler = (event) => {
    const trail = document.createElement('div');
    trail.style.position = 'fixed';
    trail.style.top = `${event.clientY}px`;
    trail.style.left = `${event.clientX}px`;
    trail.style.width = '10px';
    trail.style.height = '10px';
    trail.style.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
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

createTrail();
