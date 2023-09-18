document.getElementById("notification").addEventListener("click", () => {
  console.log(chrome);

  chrome.notifications.create({
    type: "basic",
    iconUrl: "images/get_started128.png",
    title: "这是通知的标题",
    message: "这是通知的消息",
  });
});

document.getElementById("alarms").addEventListener("click", () => {
  console.log("alarams");

  chrome.alarms.create("demo-default-alarm", {
    delayInMinutes: 1,
    periodInMinutes: 1,
  });
});
