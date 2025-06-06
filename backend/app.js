const express = require('express');
const multer = require('multer');
const cors = require('cors');
const pdfParse = require('pdf-parse');
const fs = require('fs');
const { createWorker } = require('tesseract.js');
const { PDFDocument } = require('pdf-lib');
const path = require('path');
require('dotenv').config();
const {GoogleGenAI}= require("@google/genai");
const app = express();
app.use(cors());
const upload = multer({ dest: 'uploads/' });


const ai = new GoogleGenAI({ apiKey: process.env.API_GEMINI });

// Convert PDF to PNGs using pdf-lib + png-js
async function convertPdfToImages(pdfPath) {
  const pdfBytes = fs.readFileSync(pdfPath);
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const pages = pdfDoc.getPages();

  const images = [];

  for (let i = 0; i < pages.length; i++) {
    const jpgPath = path.join(__dirname, 'uploads', `page-${i}.jpg`);
    // You could integrate PDF.js rendering here with puppeteer or use an API for rendering.
    // For simplicity, let's return dummy image paths for now.
    // You'll need to use a real rendering lib if OCR is critical on Windows.
    images.push(jpgPath); // Simulate image paths
  }

  return images;
}

// Perform OCR using Tesseract
async function performOCR(images) {
  const worker = await createWorker(['eng']);
  let finalText = '';

  for (const imgPath of images) {
    if (!fs.existsSync(imgPath)) continue; // in this mockup, we skip missing
    const { data: { text } } = await worker.recognize(imgPath);
    finalText += text + '\n';
  }

  await worker.terminate();
  return finalText;
}

app.post('/api/extract-topics', upload.single('file'), async (req, res) => {
  const filePath = req.file.path;
const parseTopics = (text) => {
  const lines = text.split("\n");
  const result = [];

  let currentHeading = null;

  lines.forEach((line) => {
    const headingMatch = line.match(/^\*\*\s*(.*?)\s*\*\*$/);
    const listItemMatch = line.match(/^\s*(?:[-*]|\d+\.)\s+(.*)/);

    if (headingMatch && line.startsWith("* **")) {
      currentHeading = {
        title: headingMatch[1].trim(),
        items: [],
      };
      result.push(currentHeading);
    } else if (listItemMatch && currentHeading) {
      currentHeading.items.push(listItemMatch[1].trim());
    }
  });

  return result;
};
  try {
    const fileBuffer = fs.readFileSync(filePath);
    const parsed = await pdfParse(fileBuffer);
    let text = parsed.text.trim();

    if (!text || text.replace(/\s/g, '').length < 20) {
      console.log('No text found — using OCR fallback...');

      const images = await convertPdfToImages(filePath);
      text = await performOCR(images);
    }

    // const completion = await openai.chat.completions.create({
    //   model: 'deepseek-chat',
    //   messages: [
    //     { role: 'system', content: 'You extract important topics from a syllabus.' },
    //     { role: 'user', content: `Extract the important topics from this syllabus:\n${text}` }
    //   ]
    // });

    // const result = completion.choices[0].message.content;
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `You are an expert academic assistant with a deep understanding of how exams are structured. Given the syllabus below, extract the most important topics that are likely to be asked in exams. Focus on identifying core concepts, high-weightage areas, and topics that typically form the basis for both theoretical and practical questions. Provide your response as a concise, categorized list of exam-relevant topics.
Syllabus:\n${text}`,
    });
    // console.log("Gemini Response Text:", response.text);
    res.json({ topics: response.text });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to extract topics' });
  } finally {
    fs.unlinkSync(filePath);
  }
});

app.listen(5000, () => console.log('✅ Server is running at http://localhost:5000'));
