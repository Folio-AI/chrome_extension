document.getElementById('execute').addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        let currentTab = tabs[0]; 
        chrome.scripting.executeScript({
            target: {tabId: currentTab.id},
            files: ['content.js']
        });
    });
});

