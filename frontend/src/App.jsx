import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Docs from "./components/Docs";
import "./App.css";
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/docs" element={<Docs />} />
          {console.log("Routes Loaded")}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
