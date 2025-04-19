import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../App.css";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-6 mt-10 text-center text-gray-700 shadow-inner">
      <hr className="border-gray-300 mb-4 w-11/12 mx-auto" />
      <p className="text-base font-medium">
        Developed with <span className="text-red-500">❤️</span> by{" "}
        <span className="font-semibold text-indigo-600">
          Himanshu Kumar Jha
        </span>
      </p>

      <p className="mt-2">
        <Link
          to="/docs"
          className="text-blue-600 hover:underline hover:text-blue-800 transition-colors duration-200"
        >
          📄 How it works
        </Link>
      </p>

      <div className="mt-4 flex justify-center items-center gap-6">
        <a
          href="https://github.com/himanshu-kr-jha" // Replace this
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-black transition-transform transform hover:scale-110"
        >
          <FaGithub size={28} />
        </a>
        <a
          href="https://www.linkedin.com/in/himanshu-kumar-jha-software-engineer" // Replace this
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-blue-700 transition-transform transform hover:scale-110"
        >
          <FaLinkedin size={28} />
        </a>
      </div>

      <p className="mt-4 text-xs text-gray-500">
        © {new Date().getFullYear()} All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
