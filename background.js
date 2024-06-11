chrome.action.onClicked.addListener((tab) => {
  if (!tab.url.startsWith("chrome://")) {
    chrome.storage.sync.get('effect', (data) => {
      const effect = data.effect || 'explosion';
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
    });
  }
});

function createExplosion() {
  // Codul pentru explozie existent
}

function createTrail() {
  document.addEventListener('mousemove', drawTrail);
  setTimeout(() => {
    document.removeEventListener('mousemove', drawTrail);
  }, 3000);

  function drawTrail(event) {
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
  }
}

function createClickExplosions() {
  document.addEventListener('click', drawClickExplosion);
  setTimeout(() => {
    document.removeEventListener('click', drawClickExplosion);
  }, 3000);

  function drawClickExplosion(event) {
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
  }
}
