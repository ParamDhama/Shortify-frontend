import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setIsAuth(true);
        setIsAdmin(decodedToken.role === "admin");
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
        navigate("/auth/login");
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
    setIsAdmin(false);
    navigate("/");
  };

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
          <Link to="/" className="hover:text-gray-300 transition">Home</Link>
          <a href="#features" className="hover:text-gray-300 transition">Features</a>
          <a href="#faq" className="hover:text-gray-300 transition">FAQ</a>

          {isAuth && (
            <>
              <Link to="/user/dashboard" className="hover:text-gray-300 transition">Dashboard</Link>
              {isAdmin && <Link to="/admin" className="hover:text-gray-300 transition">Admin Panel</Link>}
            </>
          )}
        </div>

        {/* Auth Buttons */}
        {!isAuth ? (
          <div className="hidden md:flex space-x-4">
            <Link
              to="/auth/login"
              className="border border-white px-4 py-2 rounded-lg hover:bg-white hover:text-gray-900 transition"
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
        ) : (
          <button
            onClick={handleLogout}
            className="hidden md:flex border border-white px-4 py-2 rounded-lg hover:bg-white hover:text-gray-900 transition"
          >
            Logout
          </button>
        )}

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <FiX className="text-3xl" /> : <FiMenu className="text-3xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gray-800 text-white flex flex-col items-center py-6 space-y-4"
          >
            <Link to="/" className="hover:text-gray-300 transition" onClick={() => setIsOpen(false)}>Home</Link>
            <a href="#features" className="hover:text-gray-300 transition" onClick={() => setIsOpen(false)}>Features</a>
            <a href="#faq" className="hover:text-gray-300 transition" onClick={() => setIsOpen(false)}>FAQ</a>

            {isAuth && (
              <>
                <Link to="/user/dashboard" className="hover:text-gray-300 transition" onClick={() => setIsOpen(false)}>Dashboard</Link>
                {isAdmin && <Link to="/admin" className="hover:text-gray-300 transition" onClick={() => setIsOpen(false)}>Admin Panel</Link>}
              </>
            )}

            <hr className="border-gray-700 w-4/5" />

            {!isAuth ? (
              <>
                <Link
                  to="/auth/login"
                  className="border border-white px-4 py-2 rounded-lg hover:bg-white hover:text-gray-900 transition"
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
              </>
            ) : (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="border border-white px-4 py-2 rounded-lg hover:bg-white hover:text-gray-900 transition"
              >
                Logout
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
