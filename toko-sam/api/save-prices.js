export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  const payload = req.body;

  if (!url || !token) {
    return res.status(500).json({ success: false, message: 'Database Cloud belum terhubung.' });
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(["SET", "tokoSamCustomPrices", JSON.stringify(payload)])
    });
    const result = await response.json();
    res.status(200).json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}