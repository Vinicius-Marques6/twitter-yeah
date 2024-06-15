chrome.runtime.onInstalled.addListener(() => {
    console.log('Service worker instalado.');
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'getCookie') {
        chrome.cookies.get({ url: "https://x.com", name: "ct0" }, function(cookies) {
            sendResponse({ cookies: cookies });
        });
        return true; // Manter o canal de mensagem aberto para enviar a resposta de forma assíncrona
    }
});

chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
    console.log('Navigation completed');
    chrome.tabs.sendMessage(details.tabId, {message: "navigationCompleted"}, function(response) {
      console.log(response);
    });
  }, {url: [{urlMatches: 'https://x.com/*'}]});
