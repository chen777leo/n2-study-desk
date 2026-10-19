(() => {
  const API_BASE = String(window.N2_API_BASE || '').replace(/\/$/, '');
  const TOKEN_KEY = 'n2-study-session-v1';
  const USER_KEY = 'n2-study-user-v1';
  const dialog = document.getElementById('account-dialog');
  const status = document.getElementById('account-status');
  const loginButton = document.getElementById('account-login');
  const logoutButton = document.getElementById('account-logout');
  const usernameField = document.getElementById('account-username');
  const passwordField = document.getElementById('account-password');
  let token = localStorage.getItem(TOKEN_KEY) || '';
  let currentUser = localStorage.getItem(USER_KEY) || '';
  let saveTimer = null;
  let sending = false;

  const setStatus = (message, error = false) => {
    status.textContent = message;
    status.dataset.error = String(error);
  };
  const setLoggedIn = user => {
    currentUser = user || '';
    document.getElementById('account-trigger').textContent = currentUser ? `已登录：${currentUser}` : '登录同步';
    logoutButton.hidden = !currentUser;
    loginButton.hidden = Boolean(currentUser);
    document.getElementById('account-form').hidden = Boolean(currentUser);
    document.querySelector('.privacy-note').textContent = currentUser
      ? `已登录 ${currentUser} · 学习记录已开启云端同步。`
      : '本地模式：任务、答题与错题保存在本机浏览器，不上传服务器。';
    if (currentUser) setStatus(`已登录 ${currentUser}，学习记录会自动同步。`);
  };
  const request = async (path, options = {}) => {
    const response = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(options.headers || {}) },
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.error || '连接失败，请稍后重试。');
    return result;
  };
  const syncAccountData = async username => {
    const remote = await request('/api/data');
    if (remote.data) {
      window.N2ApplyStudyData(remote.data, username);
      return;
    }
    const previousOwner = window.N2StudyDataOwner();
    const data = previousOwner === 'guest' || previousOwner === username
      ? window.N2ReadStudyData()
      : { solved: 0, correct: 0, mistakes: [], tasks: {}, examDate: '2026-12-06' };
    window.N2ApplyStudyData(data, username);
    await request('/api/data', { method: 'PUT', body: JSON.stringify({ data }) });
  };

  document.getElementById('account-trigger').addEventListener('click', () => dialog.showModal());
  dialog.querySelector('.account-close').addEventListener('click', event => { event.preventDefault(); dialog.close(); });
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });

  loginButton.addEventListener('click', async () => {
    if (!API_BASE) {
      setStatus('云端服务还未连接。配置后即可用 leo1–leo5 登录同步。', true);
      return;
    }
    const username = usernameField.value.trim().toLowerCase();
    const password = passwordField.value;
    if (!username || !password) { setStatus('请输入用户名和密码。', true); return; }
    loginButton.disabled = true;
    setStatus('正在安全登录并读取学习记录…');
    try {
      const session = await request('/api/login', { method: 'POST', body: JSON.stringify({ username, password }) });
      token = session.token;
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, session.username);
      await syncAccountData(session.username);
      setLoggedIn(session.username);
      passwordField.value = '';
      dialog.close();
    } catch (error) {
      token = '';
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      setLoggedIn('');
      setStatus(error.message || '登录失败，请检查用户名和密码。', true);
    } finally {
      loginButton.disabled = false;
    }
  });

  logoutButton.addEventListener('click', () => {
    token = '';
    currentUser = '';
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setLoggedIn('');
    window.N2ClearStudyUser();
    setStatus('已退出。此设备上的本地记录仍保留。');
  });

  window.N2QueueCloudSave = data => {
    if (!API_BASE || !token || saveTimer) return;
    saveTimer = setTimeout(async () => {
      saveTimer = null;
      if (sending) { window.N2QueueCloudSave(data); return; }
      sending = true;
      try {
        await request('/api/data', { method: 'PUT', body: JSON.stringify({ data }) });
        document.getElementById('saved-hint').textContent = '已同步到云端';
      } catch {
        document.getElementById('saved-hint').textContent = '本机已保存 · 云端同步失败';
      } finally { sending = false; }
    }, 700);
  };

  if (!API_BASE) {
    loginButton.title = '等待云端服务配置';
    loginButton.disabled = true;
    loginButton.textContent = '登录服务待连接';
    setStatus('账号同步服务待配置；当前学习进度仍保存在本机。');
  } else if (token && currentUser) {
    setLoggedIn(currentUser);
    syncAccountData(currentUser).catch(() => {
      token = '';
      currentUser = '';
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      setLoggedIn('');
      window.N2ClearStudyUser();
      setStatus('登录已过期，请重新登录。');
    });
  }
})();
