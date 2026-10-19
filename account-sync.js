(() => {
  const API_BASE = String(window.N2_API_BASE || '').replace(/\/$/, '');
  const dialog = document.getElementById('account-dialog');
  const usernameField = document.getElementById('account-username');
  const status = document.getElementById('account-status');
  const trigger = document.getElementById('account-trigger');
  const accountNames = ['leo1', 'leo2', 'leo3', 'leo4', 'leo5'];
  const currentKey = 'n2-study-user-v1';
  const syncIntervalMs = 30000;
  let currentUser = localStorage.getItem(currentKey) || '';
  let saveTimer = null;
  let pollTimer = null;
  let busy = false;
  let lastRemoteSnapshot = '';

  const setStatus = (message, error = false) => {
    status.textContent = message;
    status.dataset.error = String(error);
  };
  const updateCurrentLabel = username => {
    currentUser = username || '';
    trigger.textContent = currentUser ? `当前账号：${currentUser}` : '选择学习账号';
    if (currentUser) usernameField.value = currentUser;
  };
  const recordUrl = () => `${API_BASE}/study/${encodeURIComponent(currentUser)}`;
  const request = async (method, record) => {
    const response = await fetch(recordUrl(), {
      method,
      cache: 'no-store',
      headers: method === 'POST' ? { 'Content-Type': 'application/json' } : {},
      body: method === 'POST' ? JSON.stringify(record) : undefined
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      const error = new Error(result.error || result.message || `云端请求失败（${response.status}）。`);
      error.status = response.status;
      throw error;
    }
    return result;
  };
  const snapshot = data => JSON.stringify(data || {});
  const applyRemote = record => {
    if (!record || !record.data) return false;
    const currentSnapshot = snapshot(record.data);
    lastRemoteSnapshot = currentSnapshot;
    if (currentSnapshot !== snapshot(window.N2ReadStudyData())) {
      window.N2ApplyStudyData(record.data, currentUser);
    }
    document.getElementById('saved-hint').textContent = '云端记录已同步';
    return true;
  };
  const pushRemote = async data => {
    if (!API_BASE || !currentUser || busy) return;
    busy = true;
    try {
      const record = { data, updatedAt: Date.now() };
      await request('POST', record);
      lastRemoteSnapshot = snapshot(data);
      document.getElementById('saved-hint').textContent = '已保存并同步';
      setStatus(`账号 ${currentUser} 的学习记录已同步到云端。`);
    } catch (error) {
      document.getElementById('saved-hint').textContent = '本机已保存 · 云端同步失败';
      setStatus(`${error.message} 本机记录仍保留。`, true);
    } finally {
      busy = false;
    }
  };
  const pullRemote = async () => {
    if (!API_BASE || !currentUser || busy || document.hidden) return;
    const record = await request('GET');
    if (record.data && snapshot(record.data) !== lastRemoteSnapshot) applyRemote(record);
  };
  const startPolling = () => {
    clearInterval(pollTimer);
    if (API_BASE && currentUser) pollTimer = setInterval(() => pullRemote().catch(() => {}), syncIntervalMs);
  };
  const loadAccount = async username => {
    window.N2SwitchStudyUser(username);
    localStorage.setItem(currentKey, username);
    updateCurrentLabel(username);
    lastRemoteSnapshot = '';
    if (!API_BASE) {
      clearInterval(pollTimer);
      setStatus('云端同步暂不可用；记录目前只保存在这台设备。', true);
      return;
    }
    clearInterval(pollTimer);
    setStatus(`正在读取 ${username} 的云端学习记录…`);
    try {
      const record = await request('GET');
      if (!applyRemote(record)) await pushRemote(window.N2ReadStudyData());
      setStatus(`已切换到 ${username}；答题和计划修改会自动同步。`);
      startPolling();
    } catch (error) {
      if (error.status === 404) {
        await pushRemote(window.N2ReadStudyData());
        if (lastRemoteSnapshot) {
          setStatus(`已为 ${username} 建立云端学习记录。`);
          startPolling();
        }
      } else setStatus(`${error.message} 本机记录仍保留。`, true);
    }
  };

  updateCurrentLabel(accountNames.includes(currentUser) ? currentUser : '');
  if (!currentUser) usernameField.value = 'leo1';
  trigger.addEventListener('click', () => {
    usernameField.value = currentUser || 'leo1';
    setStatus('');
    dialog.showModal();
  });
  dialog.querySelector('.account-close').addEventListener('click', event => {
    event.preventDefault();
    dialog.close();
  });
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  document.getElementById('account-login').addEventListener('click', async () => {
    const username = usernameField.value;
    dialog.close();
    await loadAccount(username);
  });
  window.N2QueueCloudSave = data => {
    if (!API_BASE || !currentUser) return;
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => pushRemote(data), 600);
  };
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) pullRemote().catch(() => {});
  });
  window.addEventListener('focus', () => pullRemote().catch(() => {}));
  if (currentUser && accountNames.includes(currentUser)) {
    (async () => {
      try {
        const record = await request('GET');
        if (!applyRemote(record)) await pushRemote(window.N2ReadStudyData());
        startPolling();
      } catch (error) {
        if (error.status === 404) {
          await pushRemote(window.N2ReadStudyData());
          startPolling();
        } else setStatus(`${error.message} 本机记录仍保留。`, true);
      }
    })();
  }
})();
