chrome.runtime.onInstalled.addListener(() => {
    console.log('Service worker instalado.');
    listarCookies();
  });
  
function listarCookies() {
chrome.cookies.get({ url: "https://x.com", name: "ct0" }, function(cookies) {
    console.log(cookies);
});
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'getCookies') {
        chrome.cookies.getAll({ domain: "example.com" }, function(cookies) {
            sendResponse({ cookies: cookies });
        });
        return true; // Manter o canal de mensagem aberto para enviar a resposta de forma assíncrona
    }
});

