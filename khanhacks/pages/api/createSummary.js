
import OpenAI from "openai"
const openai = new OpenAI(process.env.OPENAI_API_KEY)


export default async  function handler(req, res) {
    let title = req.body.title;
    let content = req.body.content;
    await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            
            {
                role: "system",
                content: [
                    { type: "text", text: "Summarize these notes, using only the information provided in them. Summarize as if you were the person who wrote them" },
                    ],
            }, 
            {
                role: "user",
                content: [
                    { type: "text", text: title },
                    { type: "text", text: content }
                ],
            },
        ]
    }).then(r => {
        console.log(r);
        res.status(200).json(r);
    }).catch(e => {
        res.status(500).json({ success: false, message: e.message });
    });
}