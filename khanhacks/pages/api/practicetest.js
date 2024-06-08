import OpenAI from "openai"
const openai = new OpenAI(process.env.OPENAI_API_KEY)
export default async  function handler(req, res) {
    let title = req.body.title;
    let content = req.body.note;
    let other = req.body.other || "";
    await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: "user",
                content: [
                    { type: "text", text: title },
                    { type: "text", text: content }
                ],
            },
            {
                role: "system",
                content: [
                    { type: "text", text: "Create a practice test question and answer with answers based on the content of these notes, utilizing both the content provided and your outside knowledge. Create only FRQs, and seperate the question from its answer with the text Answer: For example 1+1Answer:2" },
                    { type: "text", text: "avoid repeating any of these topics: " + other}
                ],
            }
        ]
    }).then(r => {
        console.log(r);
        res.status(200).json(r);
    }).catch(e => {
        res.status(500).json({ success: false, message: e.message });
    });
}