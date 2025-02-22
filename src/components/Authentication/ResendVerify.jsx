import { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope } from "react-icons/fa";
import useInput from "../../hooks/useInput";
import apiClient from "../../api/apiClient";
import endpoints from "../../api/endpoints";

const ResendVerify = () => {
  const { input, handleChange, setInput } = useInput();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await apiClient.post(endpoints.auth.RESEND_VERIFY, { email: input.email });

      if (res.data.message === "Verification email sent. Check your inbox.") {
        setMessage("✅ Verification email sent. Check your inbox.");
        setInput({});
      } else {
        setMessage("❌ User not found.");
      }
    } catch (err) {
      console.error(err);

      // Handle specific error messages from server
      if (err.response && err.response.data && err.response.data.message) {
        if (err.response.data.message === "User is already verified") {
          setMessage("✅ Your email is already verified. You can log in.");
        } else {
          setMessage(`❌ ${err.response.data.message}`);
        }
      } else {
        setMessage("❌ Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white p-8"
      >
        {/* Animated Email Icon */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="text-[#0c5643] mb-4"
        >
          <FaEnvelope className="text-6xl" />
        </motion.div>

        <h2 className="text-2xl font-bold">Resend Verification Email</h2>
        <p className="text-gray-600 mt-2">Enter your email to receive a new verification link.</p>

        {message && (
          <p className={`mt-2 ${message.includes("✅") ? "text-green-500" : "text-red-500"}`}>
            {message}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-sm mt-6">
          <div className="relative w-full mb-4">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={input.email || ""}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0c5643]"
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-full ${
              loading ? "bg-gray-400" : "bg-[#0c5643] hover:bg-[#094d39]"
            } text-white font-bold py-3 rounded-lg mt-4 transition duration-300`}
            disabled={loading}
          >
            {loading ? "Sending..." : "Resend Verification"}
          </motion.button>
        </form>

        {/* Back to Login */}
        <p className="text-gray-500 mt-6">
          Already verified?{" "}
          <a href="/auth/login" className="text-[#0c5643] font-semibold hover:underline">
            Log in here!
          </a>
        </p>
      </motion.div>
    </>
  );
};

export default ResendVerify;
