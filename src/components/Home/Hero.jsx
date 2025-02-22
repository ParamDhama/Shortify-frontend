import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaLink, FaQrcode, FaShieldAlt, FaChartBar } from "react-icons/fa";

function Hero() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center bg-linear-to-r from-green-700 to-green-900 text-white p-6">
      {/* Background Overlay */}
      {/* <div className="absolute inset-0 bg-black bg-opacity-10 z-0"></div> */}

      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-3xl"
      >
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          🚀 Shorten & Track Your URLs Effortlessly!
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-200">
          Securely shorten links, generate QR codes, and track clicks in real-time.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center">
          <Link
            to="/auth/signup"
            className="bg-white text-green-700 px-6 py-3 rounded-lg font-semibold text-lg hover:bg-gray-200 transition"
          >
            ✨ Get Started
          </Link>
          <Link
            to="/user/dashboard"
            className="bg-transparent border-2 border-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-white hover:text-green-700 transition"
          >
            📊 Go to Dashboard
          </Link>
        </div>
      </motion.div>

      {/* Features List (Animated) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="relative z-10 mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white"
      >
        <div className="flex flex-col items-center">
          <FaLink className="text-4xl text-white" />
          <p className="mt-2 text-sm">Shorten & Track URLs</p>
        </div>
        <div className="flex flex-col items-center">
          <FaQrcode className="text-4xl text-white" />
          <p className="mt-2 text-sm">Generate QR Codes</p>
        </div>
        <div className="flex flex-col items-center">
          <FaChartBar className="text-4xl text-white" />
          <p className="mt-2 text-sm">Analytics & Click Tracking</p>
        </div>
        <div className="flex flex-col items-center">
          <FaShieldAlt className="text-4xl text-white" />
          <p className="mt-2 text-sm">Secure & Private</p>
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;
