
import { createWorker } from "tesseract.js";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "500mb",
    },
  },
};
import OpenAI from "openai";
const openai = new OpenAI(process.env.OPENAI_API_KEY);
export default async function handler(req, res) {
  try {
    const sharp = require('sharp');
    let image = req.body.data;
    let buff = Buffer.from(image.replace(/^data:image\/(png|gif|jpeg);base64,/,''), 'base64');
    let s = sharp(buff);
    let metadeta = await s.metadata();
    s = s.toBuffer();
    s = await s;
    const worker = await createWorker( 'eng', {
        tessedit_ocr_engine_mode: 1, 
      });
    const r = await worker.recognize(s);
    const text = r.data.text;
    await worker.terminate();
    let gpt = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
       {
        role: "system",
        content: [
          { type: "text", text: "Take the following text and correct any typos present within it that you can see. However, do not modify the phrasing or formatting of the provided text and respond with the corrected original text ONLY." },
        ],
       },
       {
        role: "user",
        content: [
          { type: "text", text: text },
        ],
       }
      ],
    })

    res.status(200).json({ text: gpt.choices[0].message.content });
  } catch (error) {
    console.log(error);
  }
}
