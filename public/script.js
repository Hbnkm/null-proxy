function navigateToProxy() {
  const urlInput = document.getElementById('urlInput');
  let url = urlInput.value.trim();

  if (!url) {
    alert('Please enter a website URL');
    return;
  }

  // Ensure URL has protocol
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url;
  }

  // Send target URL to backend
  fetch('/api/set-target', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: url }),
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      // Redirect to proxy
      window.location.href = '/proxy/';
    }
  })
  .catch(err => console.error('Error:', err));
}

// Allow Enter key to submit
document.getElementById('urlInput')?.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') navigateToProxy();
});