// 验证webStorage

// document.getElementById("storage-btn").addEventListener("click", () => {
//   const value = document.getElementById("storage-value").value;
//   const type = document.getElementById("storage-type").value;

//   if (type === "session") {
//     sessionStorage.setItem("key", value);
//   } else {
//     localStorage.setItem("key", value);
//   }
// });

// document.getElementById("storage-show").addEventListener("click", () => {
//   document.getElementById("storage-view").innerHTML = `
//     <span>localStorage</span>: ${localStorage.getItem("key")} \n
//     <span>sessionStorage</span>: ${sessionStorage.getItem("key")}
//   `;
// });

// StorageAPI

document.getElementById("storage-btn").addEventListener("click", () => {
  const value = document.getElementById("storage-value").value;
  const type = document.getElementById("storage-type").value;

  if (type === "session") {
    chrome.storage.session.set({ session: value }).then(() => {
      console.log("Value was set");
    });
  } else if (type === "local") {
    chrome.storage.local.set({ local: value }).then(() => {
      console.log("Value is set");
    });
  } else if (type === "weblocal") {
    localStorage.setItem("key", value);
  }
});

document.getElementById("storage-show").addEventListener("click", () => {
  chrome.storage.local.get(["local"]).then(({ local }) => {
    chrome.storage.session.get(["session"]).then(({ session }) => {
      document.getElementById("storage-view").innerHTML = `
        <span>local</span>: ${local} <br>
        <span>session</span>: ${session} <br>
        <span>weblocal</span>:${localStorage.getItem("key")}
      `;
    });
  });
});
