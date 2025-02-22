import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="text-2xl font-bold">
            🔗 Shortify
          </Link>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link to="/#features" className="hover:text-gray-300">
            Features
          </Link>
          <Link to="/#faq" className="hover:text-gray-300">
            FAQ
          </Link>
          <Link to="/user/dashboard" className="hover:text-gray-300">
            Dashboard
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex space-x-4">
          <Link
            to="/auth/login"
            className="bg-transparent border border-white px-4 py-2 rounded-lg hover:bg-white hover:text-gray-900 transition"
          >
            Login
          </Link>
          <Link
            to="/auth/sign-up"
            className="bg-[#0c5643] px-4 py-2 rounded-lg hover:bg-[#094d39] transition"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FiX className="text-3xl" /> : <FiMenu className="text-3xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-gray-800 text-white flex flex-col items-center py-4 space-y-4"
        >
          <Link to="/" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link to="/#features" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>
            Features
          </Link>
          <Link to="/#faq" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>
            FAQ
          </Link>
          <Link to="/user/dashboard" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>
            Dashboard
          </Link>

          <hr className="border-gray-700 w-full" />

          <Link
            to="/auth/login"
            className="bg-transparent border border-white px-4 py-2 rounded-lg hover:bg-white hover:text-gray-900 transition"
            onClick={() => setIsOpen(false)}
          >
            Login
          </Link>
          <Link
            to="/auth/sign-up"
            className="bg-[#0c5643] px-4 py-2 rounded-lg hover:bg-[#094d39] transition"
            onClick={() => setIsOpen(false)}
          >
            Sign Up
          </Link>
        </motion.div>
      )}
    </nav>
  );
}

export default Navbar;
