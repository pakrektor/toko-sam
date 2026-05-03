import fetch from "node-fetch";
import { HttpsProxyAgent } from "https-proxy-agent";

export default async function handler(req, res) {
  const API_URL = "https://warungrebahan.com/api/v1/balance";
  const API_KEY = process.env.WARUNG_API_KEY;

  // Proxy Fixie URL
  const proxyUrl =
    process.env.FIXIE_URL ||
    "http://fixie:oAil0FyiUByqHyu@criterium.usefixie.com:80";
  const proxyAgent = new HttpsProxyAgent(proxyUrl);

  try {
    console.log(
      "⏱️ Mengambil Saldo dari API Warung Rebahan lewat Proxy Fixie...",
    );

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: API_KEY,
      }),
      agent: proxyAgent,
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("❌ ERROR FETCH SALDO:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}
