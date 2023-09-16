chrome.runtime.onInstalled.addListener(async () => {
  chrome.tabs.create({
    url: "demo.html",
  });
});
