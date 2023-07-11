let color = "";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  color = document.body.style.color;
  document.body.style.color = message;
  sendResponse("changed");
});
