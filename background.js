chrome.action.onClicked.addListener((tab) => {
  if (!tab.url.startsWith("chrome://")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: injectCanvas
    });
  }
});

function injectCanvas() {
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.top = 0;
  iframe.style.left = 0;
  iframe.style.width = '100vw';
  iframe.style.height = '100vh';
  iframe.style.zIndex = 9999;
  iframe.style.border = 'none';
  iframe.src = chrome.runtime.getURL('canvas.html');
  document.body.appendChild(iframe);

  setTimeout(() => {
    document.body.removeChild(iframe);
  }, 3000);
}
