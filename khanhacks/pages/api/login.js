import {sql } from "@vercel/postgres";

export default async function handler(req, res){
    let user = req.body.username;
    let pass = req.body.password;
    let hash = require("crypto").createHash("sha256").update(pass).digest("base64");
    console.log(hash);
    let u = await sql`SELECT * FROM users WHERE username = ${user} AND hash = ${hash}`;
    console.log(u);
    if(u.rowCount > 0){
        res.status(200).json({success: true, message: "User found"});
    }
    else{
        res.status(404).json({success: false, message: "User not found"});
    }
}