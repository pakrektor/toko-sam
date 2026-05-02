export default async function handler(req, res) {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  if (!url || !token) {
    return res.status(200).json({ success: true, data: {} });
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(["GET", "tokoSamCustomPrices"]),
    });
    const result = await response.json();

    let data = {};
    if (result.result) {
      try {
        data = JSON.parse(result.result);
      } catch (e) {
        console.error("Gagal parse JSON KV:", e);
      }
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Gagal fetch KV:", error);
    res.status(200).json({ success: true, data: {} });
  }
}
