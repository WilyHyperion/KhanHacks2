import { sql } from "@vercel/postgres";
export default async function handler(req, res) {
  try {
    await sql`CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, username TEXT, hash TEXT)`;
    let username = req.body.username;
    let password = req.body.password;
    let hash = require("crypto")
      .createHash("sha256")
      .update(password)
      .digest("base64");

    await sql`INSERT INTO users (username, hash) VALUES (${username}, ${hash})`;
    res
      .status(200)
      .json({
        success: true,
        message: "User created",
        username: username,
        hash: hash,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
