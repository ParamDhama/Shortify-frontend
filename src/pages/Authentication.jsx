/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { FaLink } from "react-icons/fa";



function Authentication({children}) {
  return (
    <div className="flex h-screen">
      {/* Left Side (Floating Link Icon) */}
            <div className="hidden md:flex w-1/2 bg-[#0c5643] text-white justify-center items-center flex-col text-center p-10 relative">
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="mb-6"
              >
                <FaLink className="text-6xl text-white" />
              </motion.div>
              <h1 className="text-5xl font-bold">Shortify</h1>
              <p className="text-lg mt-2">Shorten, share, and track your links with ease.</p>
            </div>
      
      {children}
    </div>
  )
}

export default Authentication
