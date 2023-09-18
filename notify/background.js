chrome.runtime.onInstalled.addListener(() => {
  console.log(chrome);

  chrome.tabs.create({
    url: "demo.html",
  });
});
