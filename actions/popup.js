const printChromeBtn = document.getElementById("print-chrome");

printChromeBtn.addEventListener("click", () => {
  console.log(chrome);
});

const createDemoBtn = document.getElementById("create-demo");

createDemoBtn.addEventListener("click", () => {
  chrome.tabs.create({
    url: "demo.html",
  });
});
