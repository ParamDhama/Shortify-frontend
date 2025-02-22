import { motion } from "framer-motion";
import { FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-green-700 text-white py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo & Description */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <h2 className="text-2xl font-bold">🔗 Shortify</h2>
            <p className=" mt-2">
              The simplest way to shorten & track your links.
            </p>
          </motion.div>


          {/* Social Media Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex space-x-4 mt-6 md:mt-0"
          >
            <a href="https://x.com/dhama_param" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="hover:text-gray-400 text-white text-2xl" />
            </a>
            <a href="https://www.instagram.com/param_dhama/" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="hover:text-gray-400 text-white text-2xl" />
            </a>
            <a href="https://www.linkedin.com/in/paramdhama/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="hover:text-gray-400 text-white text-2xl" />
            </a>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center  text-sm mt-8"
        >
          &copy; {new Date().getFullYear()} Shortify. All rights reserved.
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;
