export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');

  if (req.method !== 'GET' && req.method !== 'PUT') {
    res.setHeader('Allow', 'GET, PUT');
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const projectUrl = process.env.SUPABASE_URL;
  const publicKey = process.env.SUPABASE_ANON_KEY;
  if (!projectUrl || !publicKey) {
    return res.status(503).json({ error: 'A conexão com o banco ainda não foi configurada na hospedagem.' });
  }

  const base = projectUrl.replace(/\/$/, '');
  const endpoint = `${base}/rest/v1/escala_compartilhada`;
  const headers = {
    apikey: publicKey,
    Authorization: `Bearer ${publicKey}`,
    'Content-Type': 'application/json',
  };

  try {
    if (req.method === 'GET') {
      const response = await fetch(`${endpoint}?id=eq.1&select=state,updated_at`, { headers });
      const text = await response.text();
      if (!response.ok) return res.status(502).json({ error: 'Não foi possível ler os dados do banco.' });
      const rows = text ? JSON.parse(text) : [];
      return res.status(200).json(rows[0] || null);
    }

    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    if (!body || typeof body.state !== 'object' || body.state === null || Array.isArray(body.state)) {
      return res.status(400).json({ error: 'Dados da escala inválidos.' });
    }
    const payload = JSON.stringify({ id: 1, state: body.state, updated_at: new Date().toISOString() });
    if (payload.length > 1_000_000) return res.status(413).json({ error: 'A escala excede o tamanho permitido.' });

    const response = await fetch(`${endpoint}?on_conflict=id`, {
      method: 'POST',
      headers: { ...headers, Prefer: 'resolution=merge-duplicates,return=representation' },
      body: payload,
    });
    const text = await response.text();
    if (!response.ok) return res.status(502).json({ error: 'Não foi possível salvar os dados no banco.' });
    const rows = text ? JSON.parse(text) : [];
    return res.status(200).json(rows[0] || { updated_at: new Date().toISOString() });
  } catch {
    return res.status(500).json({ error: 'Falha ao comunicar com o banco de dados.' });
  }
}
