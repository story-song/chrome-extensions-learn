chrome.runtime.onInstalled.addListener(() => {
  console.log("这是来自background的chrome", chrome);

  chrome.tabs.create({
    url: "demo.html",
  });
});
