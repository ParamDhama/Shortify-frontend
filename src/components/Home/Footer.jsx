import { motion } from "framer-motion";
import { FaXTwitter, FaInstagram, FaLinkedin } from "react-icons/fa6"; // Updated Twitter Icon

function Footer() {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo & Description */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <h2 className="text-2xl font-bold flex items-center">
              🔗 Shortify
            </h2>
            <p className="mt-2 text-gray-200 text-sm md:text-base">
              The simplest way to shorten & track your links.
            </p>
          </motion.div>

          {/* Social Media Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex space-x-5 mt-6 md:mt-0"
          >
            <a
              href="https://x.com/dhama_param"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:scale-110"
            >
              <FaXTwitter className="text-2xl text-white hover:text-gray-300 transition" />
            </a>
            <a
              href="https://www.instagram.com/param_dhama/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:scale-110"
            >
              <FaInstagram className="text-2xl text-white hover:text-gray-300 transition" />
            </a>
            <a
              href="https://www.linkedin.com/in/paramdhama/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:scale-110"
            >
              <FaLinkedin className="text-2xl text-white hover:text-gray-300 transition" />
            </a>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center text-sm mt-10 text-gray-300"
        >
          &copy; {new Date().getFullYear()} Shortify. All rights reserved.
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;
