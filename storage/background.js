chrome.storage.onChanged.addListener((changes, namespace) => {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    console.log(
      ` "${namespace}" 区域 有一个属性"${key}" 发生了变化`,
      `旧值为 "${oldValue}",新值为"${newValue}".`
    );
  }
});
