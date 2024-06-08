
let { sql } = require("@vercel/postgres");

export default async function handler(req, res) {
    try {
    let username = req.body.username;
    let r = await sql`SELECT * FROM notes WHERE username = ${username}`;
    console.log(r); 
    if (r.rowCount === 0) {
        res.status(400).json({ success: false, message: "User not found" });
        return;
    }
    res.status(200).json({ success: true, notes: r.rows[0]  .note });
}catch (error) {
 console.log(error);
    res.status(500).json({ success: false, message: error.message });       
}
}