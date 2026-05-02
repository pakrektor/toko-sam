export default async function handler(req, res) {
  // Hanya terima method POST
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method tidak diizinkan" });
  }

  const { user, pass } = req.body;
  const validUser = process.env.ADMIN_USERNAME || "adminsuper";
  const validPass = process.env.ADMIN_PASSWORD || "matamu2004";

  if (user === validUser && pass === validPass) {
    return res.status(200).json({ success: true });
  } else {
    return res.status(401).json({ success: false, message: "Akses Ditolak" });
  }
}
