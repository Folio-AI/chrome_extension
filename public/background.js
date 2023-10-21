chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['inject.js']
    }, () => {
      chrome.tabs.sendMessage(tab.id, { action: 'toggleSidebar' });
    });
  });
  