chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: createLines
  });
});

function createLines() {
  const numLines = 10;
  const colors = ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33F3'];

  for (let i = 0; i < numLines; i++) {
    const line = document.createElement('div');
    line.style.position = 'fixed';
    line.style.top = `${Math.random() * 100}vh`;
    line.style.left = `${Math.random() * 100}vw`;
    line.style.width = '2px';
    line.style.height = '100px';
    line.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    line.style.transform = `rotate(${Math.random() * 360}deg)`;
    line.style.transition = 'opacity 3s';
    document.body.appendChild(line);

    setTimeout(() => {
      line.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(line);
      }, 3000);
    }, 2000);
  }
}
