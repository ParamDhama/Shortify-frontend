import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaLink, FaQrcode, FaShieldAlt, FaChartBar } from "react-icons/fa";
import heroImage from "../../assets/hero-illustration.svg"; // Make sure to have an illustration

function Hero() {
  return (
    <section className="relative w-full min-h-screen flex flex-col md:flex-row items-center justify-center text-center md:text-left bg-gradient-to-r from-primary to-green-900 text-white p-6">
      {/* Left Content */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-2xl"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          🚀 Shorten, Manage & Track Your URLs!
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-200">
          Easily create short links, generate QR codes, and gain real-time analytics with security & privacy.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center md:justify-start">
          <Link
            to="/auth/signup"
            className="bg-white text-primary px-6 py-3 rounded-lg font-semibold text-lg hover:bg-gray-200 transition"
          >
            ✨ Get Started
          </Link>
          <Link
            to="/user/dashboard"
            className="bg-transparent border-2 border-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary transition"
          >
            📊 Go to Dashboard
          </Link>
        </div>

        {/* Features List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left"
        >
          <div className="flex flex-col items-center md:items-start">
            <FaLink className="text-4xl text-white" />
            <p className="mt-2 text-sm">Shorten & Track URLs</p>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <FaQrcode className="text-4xl text-white" />
            <p className="mt-2 text-sm">Generate QR Codes</p>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <FaChartBar className="text-4xl text-white" />
            <p className="mt-2 text-sm">Analytics & Click Tracking</p>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <FaShieldAlt className="text-4xl text-white" />
            <p className="mt-2 text-sm">Secure & Private</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Right Image Section */}
      <motion.div
        animate={{ y: [-20, 0, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="mt-10 md:flex justify-center items-center"
      >
        <img
          src={heroImage}
          alt="Hero Illustration"
          className="w-full max-w-lg"
        />
      </motion.div>
    </section>
  );
}

export default Hero;
