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

  let score = localStorage.getItem('eggScore') ? parseInt(localStorage.getItem('eggScore')) : 9999999;
  const egg = new Image();
  egg.src = chrome.runtime.getURL('images/egg.png');
  console.log('Egg image src:', egg.src);

  const eggWidth = 80;  // Dimensiune redusă cu 20%
  const eggHeight = 120; // Dimensiune redusă cu 20%
  const eggX = canvas.width - eggWidth - 200; // Ajustat pentru a fi mai la stânga
  const eggY = 40; // Ajustat pentru a fi mai sus

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    console.log('Drawing egg at', eggX, eggY);
    ctx.drawImage(egg, eggX, eggY, eggWidth, eggHeight);

    // Desenează scorul centrat sub ou
    ctx.font = 'bold 32px "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'; // Dimensiune redusă cu 20%
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.fillText(score, eggX + eggWidth / 2, eggY + eggHeight + 40);
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
      score--;
      localStorage.setItem('eggScore', score);
      if (score <= 0) {
        alert('Felicitări! Ai spart oul!');
        score = 9999999;
        localStorage.setItem('eggScore', score);
      }
      draw();
      createSparkle(event.clientX, event.clientY);
    } else {
      document.body.removeChild(canvas);
      document.removeEventListener('click', handleClick);
    }
  }

  egg.onload = () => {
    console.log('Egg image loaded');
    draw();
    document.addEventListener('click', handleClick);
  };

  egg.onerror = (e) => {
    console.error('Failed to load egg image:', e);
  };
}

console.log('injectCanvas.js loaded');
createEggGame();
