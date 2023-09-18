document.getElementById("sendMessage").addEventListener("click", () => {
  document
    .getElementById("theFrame")
    .contentWindow.postMessage("hello sandbox", "*");
});
