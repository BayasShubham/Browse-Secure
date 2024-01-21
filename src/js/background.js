chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.url) {
    // Send the URL to the Flask server
    fetch('http://127.0.0.1:5000/check_url', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: changeInfo.url }),
    })
        .then(response => response.json())
        .then(data => {
        if (data.protected) {
            chrome.tabs.update(tabId, { url: 'http://127.0.0.1:5000/qr_code' });
        }
        })
        .catch(error => console.error('Error checking URL:', error));
    }
});