import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { FaFileUpload } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import ReactMarkdown from "react-markdown";
const Home = () => {
    const [file, setFile] = useState(null);
  const [topics, setTopics] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setTopics("");
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a PDF file.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "https://topit-ai.onrender.com/api/extract-topics",
        formData
      );
      console.log(res);
      setTopics(res.data.topics);
      toast.success("Topics extracted successfully!");
    } catch (err) {
      toast.error("Something went wrong!", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-pink-100 flex flex-col items-center justify-center px-1 py-1">
        <ToastContainer />
        <h1 className="text-3xl font-bold mb-6 text-center">
          📘 Syllabus Topic Extractor
        </h1>

        <div className="w-full max-w-xl p-6 bg-white rounded-2xl shadow-lg space-y-6">
          <label className="flex items-center justify-center border-2 border-dashed border-blue-400 p-4 rounded-lg cursor-pointer hover:bg-blue-50 transition">
            <FaFileUpload className="text-blue-500 text-2xl mr-2" />
            <span>{file ? file.name : "Click to select PDF file"}</span>
            <input
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          <button
            onClick={handleUpload}
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition"
          >
            {loading ? "Processing..." : "Extract Important Topics"}
          </button>

          {loading && (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
            </div>
          )}

          {topics && (
            <div className="bg-gray-100 p-4 rounded-xl max-h-[400px] overflow-y-auto prose max-w-none">
              <h2 className="text-lg font-semibold mb-3">
                📋 Extracted Topics:
              </h2>
              <ReactMarkdown>{topics}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home