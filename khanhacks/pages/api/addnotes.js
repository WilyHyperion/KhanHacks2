let { sql } = require("@vercel/postgres");

export default async function addnote(req, res){
    let username = req.body.username;
    let note = req.body.note;
    if (!username || !note) {
        res.status(400).json({ success: false, message: "Missing username or note" });
        return;
    }
    let user = await sql`SELECT * FROM users WHERE username = ${username}`;
    if (user.length === 0) {
        res.status(400).json({ success: false, message: "User not found" });
        return;
    }
    await sql`CREATE TABLE IF NOT EXISTS notes (id SERIAL PRIMARY KEY, username TEXT, note JSON[])`;
    user = (await sql`SELECT * FROM notes WHERE username = ${username}`).rows
    if(user.length === 0){
        await sql`INSERT INTO notes (username, note) VALUES (${username}, ${ [{note: note, title: req.body.title}]})`;
    }
    else{
        await sql`UPDATE notes SET note = ${[
            ...user[0].note,
            {note: note, title: req.body.title}
        ]} WHERE username = ${username}`;
    }
    res.status(200).json({ success: true, message: "Note added" });
}