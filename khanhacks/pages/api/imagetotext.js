import { createWorker } from "tesseract.js";
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "500mb",
    },
  },
};
export default async function handler(req, res) {  
  let image = req.body.data;
  const worker = await createWorker('eng');
  const r = await worker.recognize(image);
  const text = r.data.text;
  await worker.terminate();
  res.status(200).json({ text: text });
}
