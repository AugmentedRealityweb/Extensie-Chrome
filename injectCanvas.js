function createEggGame() {
  const canvas = document.createElement('canvas');
  canvas.id = 'eggCanvas';
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

  let score = localStorage.getItem('eggScore') ? parseInt(localStorage.getItem('eggScore')) : 9999999;
  const egg = new Image();
  egg.src = chrome.runtime.getURL('images/egg.png');

  const eggWidth = 100;
  const eggHeight = 150;
  const eggX = (canvas.width - eggWidth) / 2;
  const eggY = (canvas.height - eggHeight) / 2;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(egg, eggX, eggY, eggWidth, eggHeight);
    ctx.font = '30px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.fillText(score, canvas.width / 2, eggY + eggHeight + 50);
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
    } else {
      document.body.removeChild(canvas);
      document.removeEventListener('click', handleClick);
    }
  }

  egg.onload = () => {
    draw();
    document.addEventListener('click', handleClick);
  };
}

createEggGame();
