let color = "";
console.log("content.js");
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  color = document.body.style.color;
  document.body.style.background = message;
  sendResponse("changed");
});
