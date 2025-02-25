import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#0c5643] text-white text-center px-6">
      {/* Animated 404 Text with Glow Effect */}
      <motion.h1
        className="text-9xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-green-500 drop-shadow-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        404
      </motion.h1>

      {/* Glitching "Page Not Found" Text */}
      <motion.p
        className="text-2xl font-semibold mt-2 tracking-wide relative"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <span className="relative before:absolute before:content-['PAGE_NOT_FOUND'] before:left-0 before:top-0 before:text-green-200 before:-translate-x-0.5 before:-translate-y-0.5 before:blur-sm">
          PAGE NOT FOUND
        </span>
      </motion.p>

      {/* Animated Floating Text Effect */}
      <motion.div
        className="mt-6 text-lg text-green-200"
        initial={{ y: 5 }}
        animate={{ y: -5 }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 2,
          ease: "easeInOut",
        }}
      >
        Oops! Looks like you&apos;re lost in the jungle...
      </motion.div>

      {/* Button with Hover & Scale Effect */}
      <motion.div
        className="mt-6"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut", delay: 0.5 }}
      >
        <Link to="/">
          <button className="px-6 py-3 text-lg font-bold text-white bg-[#087056] rounded-lg shadow-md hover:bg-[#0f3d33] transition duration-300">
            Take Me Home
          </button>
        </Link>
      </motion.div>
    </div>
  );
}

export default NotFound;
