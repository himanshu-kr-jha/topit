import React from "react";
import { Link } from "react-router-dom";

const Docs = () => {
  return (
    <div className="min-h-screen bg-white p-8 text-gray-800">
      <h1 className="text-2xl font-bold mb-4">
        Toppit (Topics + Bit of AI magic)
      </h1>
      <h1 className="text-2xl font-bold mb-4">📄 How It Works</h1>
      <ol className="list-decimal list-inside space-y-2">
        <li>Upload your PDF syllabus file using the uploader.</li>
        <li>
          The server extracts text from the PDF using <code>pdf-parse</code>.
        </li>
        <li>
          If the text is not extractable, OCR is performed using{" "}
          <code>tesseract.js</code>.
        </li>
        <li>
          The raw text is sent to Google's Gemini AI (or DeepSeek AI) for
          content analysis.
        </li>
        <li>
          Extracted topics are parsed and structured using a custom function.
        </li>
        <li>Topics are displayed beautifully in the UI.</li>
      </ol>
      <p className="mt-6">
        Built using: React ⚛️, Node.js 🚀, Express, Multer, pdf-parse,
        Tesseract.js, Gemini AI 🌟
      </p>
      <p className="mt-2">
        <Link to="/" className="text-blue-500 hover:underline">
          ← Back to Home
        </Link>
      </p>
    </div>
  );
};

export default Docs;
