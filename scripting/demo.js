function func() {
  document.body.style.background = "red";
}

function funcGoogle() {
  document.body.style.background = "green";
}

document.getElementById("start").addEventListener("click", async () => {
  const googleTabs = await chrome.tabs.query({
    url: "https://www.google.com/*",
  });

  const baiduTabs = await chrome.tabs.query({
    url: "https://www.baidu.com/*",
  });

  console.log(googleTabs, baiduTabs);
  baiduTabs.forEach((tab) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func,
    });
  });

  googleTabs.forEach((tab) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: funcGoogle,
    });
  });
});
