// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import OpenAI from "openai"
const openai = new OpenAI(process.env.OPENAI_API_KEY)
export default async  function handler(req, res) {
  console.log('ran');
  console.log(req.body);
  return;
  const img = req.body.data;
  const r = await openai.chat.completions.create  ({
    model: 'gpt-4-turbo',
    messages: [
      {
        role: "user",
        content: [
          {type: "image_url", image_url: {url: img}},
          {type : "text", text: "Create a study guide based on  the content of the notes in the image above. Seperate every ."}
        ],
      },
    ]
  });
  console.log(r); 
  res.status(200).json(r);
}
