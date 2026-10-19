const ALLOWED_USERS = new Set(['leo1', 'leo2', 'leo3', 'leo4', 'leo5']);

function cors(request, env) {
  const origin = request.headers.get('Origin');
  if (origin !== env.SITE_ORIGIN) return null;
  return { 'Access-Control-Allow-Origin': origin, 'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '86400', 'Vary': 'Origin' };
}
function json(data, status, headers) { return new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...headers } }); }
function validUser(value) { const username = String(value || '').toLowerCase(); return ALLOWED_USERS.has(username) ? username : null; }
function validRecord(data) { return data && typeof data === 'object' && !Array.isArray(data) && Number.isFinite(data.solved) && Number.isFinite(data.correct) && Array.isArray(data.mistakes) && data.tasks && typeof data.tasks === 'object' && typeof data.examDate === 'string'; }

export default {
  async fetch(request, env) {
    const headers = cors(request, env);
    if (!headers) return new Response('Forbidden', { status: 403 });
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers });
    const url = new URL(request.url);
    const username = validUser(url.searchParams.get('username'));
    if (!username) return json({ error: '请选择有效的学习账号。' }, 400, headers);
    try {
      if (request.method === 'GET' && url.pathname === '/api/data') {
        const row = await env.DB.prepare('SELECT payload, updated_at FROM study_records WHERE username = ?').bind(username).first();
        return json({ data: row ? JSON.parse(row.payload) : null, updatedAt: row?.updated_at || 0 }, 200, headers);
      }
      if (request.method === 'PUT' && url.pathname === '/api/data') {
        const raw = await request.text();
        if (raw.length > 100000) return json({ error: '学习记录内容过大。' }, 413, headers);
        const body = JSON.parse(raw);
        if (!validRecord(body.data)) return json({ error: '学习记录格式无效。' }, 400, headers);
        const previous = await env.DB.prepare('SELECT updated_at FROM study_records WHERE username = ?').bind(username).first();
        const updatedAt = Math.max(Date.now(), (previous?.updated_at || 0) + 1);
        await env.DB.prepare('INSERT INTO study_records (username, payload, updated_at) VALUES (?, ?, ?) ON CONFLICT(username) DO UPDATE SET payload = excluded.payload, updated_at = excluded.updated_at').bind(username, JSON.stringify(body.data), updatedAt).run();
        return json({ ok: true, updatedAt }, 200, headers);
      }
      return json({ error: '找不到此接口。' }, 404, headers);
    } catch { return json({ error: '云端服务暂时不可用，请稍后重试。' }, 500, headers); }
  },
};
