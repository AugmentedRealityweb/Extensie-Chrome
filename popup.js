document.addEventListener('DOMContentLoaded', () => {
  // Citirea opțiunii curente și setarea opțiunii selectate
  chrome.storage.sync.get('effect', (data) => {
    if (data.effect) {
      document.querySelector(`input[value="${data.effect}"]`).checked = true;
    }
  });

  // Salvarea opțiunii selectate
  document.getElementById('save').addEventListener('click', () => {
    const effect = document.querySelector('input[name="effect"]:checked').value;
    chrome.storage.sync.set({ effect }, () => {
      alert('Effect saved!');
    });
  });
});
