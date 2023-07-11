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
