(() => {
  const API_BASE = String(window.N2_API_BASE || '').replace(/\/$/, '');
  const dialog = document.getElementById('account-dialog');
  const usernameField = document.getElementById('account-username');
  const status = document.getElementById('account-status');
  const trigger = document.getElementById('account-trigger');
  const accountNames = ['leo1', 'leo2', 'leo3', 'leo4', 'leo5'];
  const currentKey = 'n2-study-user-v1';
  let currentUser = localStorage.getItem(currentKey) || '';
  let lastUpdatedAt = 0;
  let saveTimer = null;
  let pollTimer = null;
  let busy = false;
  const setStatus = (message, error = false) => { status.textContent = message; status.dataset.error = String(error); };
  const updateCurrentLabel = username => { currentUser = username || ''; trigger.textContent = currentUser ? `当前账号：${currentUser}` : '选择学习账号'; if (currentUser) usernameField.value = currentUser; };
  const request = async (method, data) => {
    const response = await fetch(`${API_BASE}/api/data?username=${encodeURIComponent(currentUser)}`, { method, cache: 'no-store', headers: method === 'PUT' ? { 'Content-Type': 'application/json' } : {}, body: method === 'PUT' ? JSON.stringify({ data }) : undefined });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.error || '云端连接失败。');
    return result;
  };
  const pullRemote = async () => {
    if (!API_BASE || !currentUser || busy) return;
    const result = await request('GET');
    if (result.data && result.updatedAt > lastUpdatedAt) {
      lastUpdatedAt = result.updatedAt;
      window.N2ApplyStudyData(result.data, currentUser);
      setStatus(`已同步 ${currentUser} 的学习记录。`);
      document.getElementById('saved-hint').textContent = '云端记录已更新';
    }
  };
  const pushRemote = async data => {
    if (!API_BASE || !currentUser || busy) return;
    busy = true;
    try {
      const result = await request('PUT', data);
      lastUpdatedAt = result.updatedAt || Date.now();
      document.getElementById('saved-hint').textContent = '已保存并同步';
      setStatus(`账号 ${currentUser} 的记录已同步。`);
    } catch (error) {
      document.getElementById('saved-hint').textContent = '本机已保存 · 云端同步失败';
      setStatus(`${error.message} 本机记录仍保留。`, true);
    } finally { busy = false; }
  };
  const startPolling = async () => {
    clearInterval(pollTimer);
    if (!API_BASE || !currentUser) return;
    try {
      const result = await request('GET');
      if (result.data) {
        lastUpdatedAt = result.updatedAt || 0;
        window.N2ApplyStudyData(result.data, currentUser);
        setStatus(`已同步 ${currentUser} 的学习记录。`);
      } else await pushRemote(window.N2ReadStudyData());
    } catch { setStatus('暂时无法读取云端记录；本机记录仍保留。', true); }
    pollTimer = setInterval(() => pullRemote().catch(() => {}), 5000);
  };
  const activateUser = async username => {
    if (!accountNames.includes(username)) return;
    window.N2SwitchStudyUser(username);
    localStorage.setItem(currentKey, username);
    updateCurrentLabel(username);
    lastUpdatedAt = 0;
    if (!API_BASE) { clearInterval(pollTimer); setStatus('云端接口尚未连接；当前只保存在这台设备。', true); return; }
    setStatus(`正在读取 ${username} 的云端学习记录…`);
    try {
      const result = await request('GET');
      if (result.data) { lastUpdatedAt = result.updatedAt || 0; window.N2ApplyStudyData(result.data, username); }
      else await pushRemote(window.N2ReadStudyData());
      setStatus(`已切换到 ${username}，学习记录会自动同步到其他设备。`);
      pollTimer = setInterval(() => pullRemote().catch(() => {}), 5000);
    } catch (error) { setStatus(`${error.message} 本机记录仍保留。`, true); }
  };
  updateCurrentLabel(accountNames.includes(currentUser) ? currentUser : '');
  if (!currentUser) usernameField.value = 'leo1';
  trigger.addEventListener('click', () => { usernameField.value = currentUser || 'leo1'; setStatus(''); dialog.showModal(); });
  dialog.querySelector('.account-close').addEventListener('click', event => { event.preventDefault(); dialog.close(); });
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  document.getElementById('account-login').addEventListener('click', async () => { await activateUser(usernameField.value); dialog.close(); });
  window.N2QueueCloudSave = data => { if (!API_BASE || !currentUser) return; clearTimeout(saveTimer); saveTimer = setTimeout(() => pushRemote(data), 500); };
  if (currentUser && accountNames.includes(currentUser)) startPolling();
})();
