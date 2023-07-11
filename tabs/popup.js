// 正确一些

document.getElementById("create-tab").addEventListener("click", () => {
  chrome.tabs.create({
    url: "newtab.html", // 相对于background脚本的路径下需要有一个newtab.html文件
  });
});

let Tabs = [];

const getSelect = (list) => {
  const yes = list[0];
  const no = list[1];
  if (yes.checked) {
    return yes.defaultValue === "1";
  }

  if (no.checked) {
    return no.defaultValue === "1";
  }

  return false;
};

document.getElementById("query-tab").addEventListener("click", async () => {
  const active = getSelect(document.getElementsByName("isActive"));
  const currentWindow = getSelect(
    document.getElementsByName("isCurrentWindow")
  );
  const pinned = getSelect(document.getElementsByName("pinned"));

  const url = document.getElementById("url").value;
  const title = document.getElementById("title").value;
  const index = document.getElementById("index").value;

  const queryOptions = {
    active,
    currentWindow,
    pinned,
  };

  if (url) {
    queryOptions.url = url;
  }

  if (title) {
    queryOptions.title = title;
  }

  if (index) {
    queryOptions.index = index - 0;
  }

  console.log(queryOptions);

  const tabs = await chrome.tabs.query(queryOptions);

  document.getElementById("search-result").innerHTML = JSON.stringify(
    tabs.map(({ id }) => ({ id }))
  );

  Tabs = tabs;
});

document.getElementById("send-btn").addEventListener("click", async () => {
  const color = document.getElementById("send-value").value;

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  const response = await chrome.tabs.sendMessage(tab.id, color);

  console.log(color, response);
});

const getCurrentTab = async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab.id;
};

document.getElementById("move").addEventListener("click", async () => {
  const index = document.getElementById("move-index").value - 0;
  const tabIds = await getCurrentTab();
  chrome.tabs.move(tabIds, { index });
});

document.getElementById("remove").addEventListener("click", async () => {
  const tabIds = await getCurrentTab();
  chrome.tabs.remove(tabIds);
});

document.getElementById("reload").addEventListener("click", async () => {
  const tabId = await getCurrentTab();
  chrome.tabs.reload(tabId);
});

document.getElementById("discard").addEventListener("click", async () => {
  const tabId = document.getElementById("discard-value").value - 0;
  chrome.tabs.discard(tabId);
});

document.getElementById("update").addEventListener("click", async () => {
  const updateValue = document.getElementById("update-value").value;
  const tabId = await getCurrentTab();
  if (updateValue) {
    const optoins = JSON.parse(updateValue);
    chrome.tabs.update(tabId, optoins);
  }
});

document.getElementById("duplicate").addEventListener("click", async () => {
  const tabId = await getCurrentTab();
  chrome.tabs.duplicate(tabId);
});

document.getElementById("zoom-btn").addEventListener("click", async () => {
  const tabId = await getCurrentTab();
  const zoomFactor = document.getElementById("zoom").value - 0;
  chrome.tabs.setZoom(tabId, zoomFactor);
});

document.getElementById("group").addEventListener("click", async () => {
  const tabIds = Tabs.map(({ id }) => id);
  const title = document.getElementById("group-title").value;
  const group = await chrome.tabs.group({ tabIds });
  chrome.tabGroups.update(group, { color: "red", title });
});

document.getElementById("goForward").addEventListener("click", async () => {
  const tabId = await getCurrentTab();
  chrome.tabs.goForward(tabId);
});

document.getElementById("goBack").addEventListener("click", async () => {
  const tabId = await getCurrentTab();
  chrome.tabs.goBack(tabId);
});
