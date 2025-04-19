import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Toppit
        </Link>
        <div>
          <Link to="/" className="px-4 hover:text-blue-200">
            Home
          </Link>
          <Link to="/docs" className="px-4 hover:text-blue-200">
            How It Works
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
