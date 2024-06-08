import OpenAI from "openai"
const openai = new OpenAI(process.env.OPENAI_API_KEY)
export default async  function handler(req, res) {
    let title = req.body.title;
    let content = req.body.note;
    await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: "system",
                content: [
                    { type: "text", text: "Create a practice test based on the content of these notes, utilizing both the content provided and your outside knowledge. Create only FRQs, and seperate the answer and question with a colon(:), and seperate each question with a semicolon(;). For example 1+1:2;2+2:4;  " },
                ],
            },{
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