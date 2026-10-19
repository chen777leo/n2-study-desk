(() => {
  const dialog = document.getElementById('account-dialog');
  const usernameField = document.getElementById('account-username');
  const status = document.getElementById('account-status');
  const trigger = document.getElementById('account-trigger');
  const accountNames = ['leo1', 'leo2', 'leo3', 'leo4', 'leo5'];
  const currentKey = 'n2-study-user-v1';
  const current = localStorage.getItem(currentKey);
  const updateCurrentLabel = username => { trigger.textContent = username ? `当前账号：${username}` : '选择学习账号'; };
  if (current && accountNames.includes(current)) { usernameField.value = current; updateCurrentLabel(current); }
  else { usernameField.value = 'leo1'; updateCurrentLabel(''); }
  trigger.addEventListener('click', () => { usernameField.value = localStorage.getItem(currentKey) || 'leo1'; status.textContent = ''; dialog.showModal(); });
  dialog.querySelector('.account-close').addEventListener('click', event => { event.preventDefault(); dialog.close(); });
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  document.getElementById('account-login').addEventListener('click', () => {
    const username = usernameField.value;
    if (!accountNames.includes(username)) return;
    window.N2SwitchStudyUser(username);
    localStorage.setItem(currentKey, username);
    updateCurrentLabel(username);
    status.textContent = `已切换到 ${username}。学习记录仅保存在这台设备的浏览器中。`;
    dialog.close();
  });
})();
