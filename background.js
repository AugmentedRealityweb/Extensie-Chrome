chrome.action.onClicked.addListener((tab) => {
  if (!tab.url.startsWith("chrome://")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['injectCanvas.js']
    });
  }
});
