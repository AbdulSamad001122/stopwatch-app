import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0a0505] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1c0a0a] via-[#0a0505] to-black">
        <nav className="flex justify-center gap-6 py-6 border-b border-red-900/30">
          <Link
            to="/"
            className="text-red-400 hover:text-red-300 font-medium"
          >
            Home
          </Link>

          <Link
            to="/about"
            className="text-red-400 hover:text-red-300 font-medium"
          >
            About
          </Link>

          <Link
            to="/contact"
            className="text-red-400 hover:text-red-300 font-medium"
          >
            Contact
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}