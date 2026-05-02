export default async function handler(req, res) {
  const API_URL = "https://warungrebahan.com/api/v1/products";
  const API_KEY = process.env.WARUNG_API_KEY;

  try {
    console.log("⏱️ Sedang menembak API Warung Rebahan...");

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: API_KEY,
      }),
    });

    const data = await response.json();

    // Menampilkan hasil balasan dari Warung Rebahan di terminal VS Code
    console.log("✅ Balasan Server Warung Rebahan:", data);

    res.status(200).json(data);
  } catch (error) {
    // Menampilkan pesan error asli di terminal VS Code
    console.error("❌ ERROR DI BACKEND:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}
