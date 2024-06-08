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
  const fs = require("fs");
  console.log(__dirname);
  fs.writeFileSync(__dirname + "image", image);
  console.log("image saved")
  const worker = await createWorker();
  const r = await worker.recognize(image);
  const text = r.data.text;
  await worker.terminate();
  res.status(200).json({ text });
}
