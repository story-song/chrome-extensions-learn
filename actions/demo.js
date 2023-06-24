const toggleBtn = document.getElementById("toggle-btn");

toggleBtn.addEventListener("click", () => {
  chrome.action.isEnabled().then((state) => {
    state ? chrome.action.disable() : chrome.action.enable();
  });
});

document
  .getElementById("popup-options")
  .addEventListener("change", async (event) => {
    let popup = event.target.value;
    await chrome.action.setPopup({ popup });

    // Show the updated popup path
    await getCurrentPopup();
  });

async function getCurrentPopup() {
  let popup = await chrome.action.getPopup({});
  document.getElementById("current-popup-value").value = popup;
  return popup;
}

chrome.action.onClicked.addListener((tab) => {
  alert("这是一个事件");
});

async function showBadgeText() {
  let text = await chrome.action.getBadgeText({});
  document.getElementById("current-badge-text").value = text;
}

document.getElementById("set-badge").addEventListener("click", async () => {
  const text = document.getElementById("badge-text-input").value;
  await chrome.action.setBadgeText({ text });
  showBadgeText();
});

const random = () => Math.floor(Math.random() * 256);

async function showBadgeColor() {
  let color = await chrome.action.getBadgeBackgroundColor({});
  document.getElementById("current-badge-bg-color").innerText = JSON.stringify(
    color,
    null,
    0
  );
}

async function showBadgeTextColor() {
  let color = await chrome.action.getBadgeTextColor({});
  document.getElementById("current-badge-text-color").innerText =
    JSON.stringify(color, null, 0);
}

document
  .getElementById("set-badge-bg-color")
  .addEventListener("click", async () => {
    chrome.action.setBadgeBackgroundColor({
      color: [random(), random(), random(), 255],
    });
    showBadgeColor();
  });

document
  .getElementById("set-badge-text-color")
  .addEventListener("click", async () => {
    chrome.action.setBadgeTextColor({
      color: [random(), random(), random(), 255],
    });
    showBadgeTextColor();
  });

const EMOJI = ["confetti", "suit", "bow", "dog", "skull", "yoyo", "cat"];

let lastIconIndex = 0;
document
  .getElementById("set-icon-button")
  .addEventListener("click", async () => {
    // Clear out the badge text in order to make the icon change easier to see
    // chrome.action.setBadgeText({ text: "" });

    // Randomly pick a new icon
    let index = lastIconIndex;
    index = Math.floor(Math.random() * EMOJI.length);
    if (index === lastIconIndex) {
      // Dupe detected! Increment the index & modulo to make sure we don't go out of bounds
      index = (index + 1) % EMOJI.length;
    }
    let emojiFile = `images/emoji-${EMOJI[index]}.png`;
    lastIconIndex = index;

    // There are easier ways for a page to extract an image's imageData, but the approach used here
    // works in both extension pages and service workers.
    let response = await fetch(chrome.runtime.getURL(emojiFile));
    let blob = await response.blob();
    let imageBitmap = await createImageBitmap(blob);
    let osc = new OffscreenCanvas(imageBitmap.width, imageBitmap.height);
    let ctx = osc.getContext("2d");
    ctx.drawImage(imageBitmap, 0, 0);
    let imageData = ctx.getImageData(0, 0, osc.width, osc.height);

    chrome.action.setIcon({ imageData });
  });

document.getElementById("set-title").addEventListener("click", () => {
  const title = document.getElementById("title-text-input").value;

  chrome.action.setTitle({ title });

  showActionTitle();
});

async function showActionTitle() {
  let title = await chrome.action.getTitle({});

  document.getElementById("current-title").innerText = title;
}
