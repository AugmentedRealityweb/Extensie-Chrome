document.getElementById('save').addEventListener('click', () => {
  const effect = document.querySelector('input[name="effect"]:checked').value;
  chrome.storage.sync.set({ effect }, () => {
    alert('Effect saved!');
  });
});
