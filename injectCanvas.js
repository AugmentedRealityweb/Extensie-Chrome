function createEggGame() {
  const canvas = document.createElement('canvas');
  canvas.id = 'eggCanvas';
  canvas.style.position = 'fixed';
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.zIndex = 9998; // Ajustat pentru a fi sub sparkle
  canvas.style.pointerEvents = 'none';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let clickCount = 0;
  const eggImages = Array.from({ length: 12 }, (_, i) => {
    const img = new Image();
    img.src = chrome.runtime.getURL(`images/${i + 1}.png`);
    return img;
  });

  const eggWidth = 80;  // Dimensiune redusă cu 20%
  const eggHeight = 120; // Dimensiune redusă cu 20%
  const eggX = canvas.width - eggWidth - 200; // Ajustat pentru a fi mai la stânga
  const eggY = 40; // Ajustat pentru a fi mai sus

  function draw() {
    const imageIndex = Math.floor(clickCount / 10); // Calculăm indexul imaginii în funcție de clickCount
    if (imageIndex < eggImages.length) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(eggImages[imageIndex], eggX, eggY, eggWidth, eggHeight);

      // Desenează scorul centrat sub ou
      ctx.font = 'bold 32px "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'; // Dimensiune redusă cu 20%
      ctx.fillStyle = 'black';
      ctx.textAlign = 'center';
      ctx.fillText(clickCount, eggX + eggWidth / 2, eggY + eggHeight + 40);
    }
  }

  function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'fixed';
    sparkle.style.top = `${y}px`;
    sparkle.style.left = `${x}px`;
    sparkle.style.width = '10px';
    sparkle.style.height = '10px';
    sparkle.style.backgroundColor = 'gold';
    sparkle.style.borderRadius = '50%';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.opacity = '1';
    sparkle.style.zIndex = '9999'; // Asigură-te că sparkle-ul este deasupra oului
    sparkle.style.transition = 'opacity 0.5s, transform 0.5s';
    document.body.appendChild(sparkle);

    requestAnimationFrame(() => {
      sparkle.style.opacity = '0';
      sparkle.style.transform = 'scale(3)';
    });

    setTimeout(() => {
      sparkle.remove();
    }, 500);
  }

  function handleClick(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (x > eggX && x < eggX + eggWidth && y > eggY && y < eggY + eggHeight) {
      clickCount++;
      draw();
      createSparkle(event.clientX, event.clientY);
    } else {
      document.body.removeChild(canvas);
      document.removeEventListener('click', handleClick);
    }
  }

  Promise.all(eggImages.map(img => new Promise(resolve => img.onload = resolve)))
    .then(() => {
      console.log('All egg images loaded');
      draw();
      document.addEventListener('click', handleClick);
    })
    .catch(err => {
      console.error('Failed to load one or more egg images:', err);
    });
}

console.log('injectCanvas.js loaded');
createEggGame();
