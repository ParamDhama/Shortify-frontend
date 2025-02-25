import { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope } from "react-icons/fa";
import useInput from "../../hooks/useInput";
import apiClient from "../../api/apiClient";
import endpoints from "../../api/endpoints";

function ForgotPassword() {
  const { input, handleChange, setInput } = useInput();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await apiClient.post(endpoints.auth.FORGOT_PASS, { email: input.email });

      if (res.data.message === "Password reset email sent. Check your inbox.") {
        setMessage("✅ Password reset email sent. Check your inbox.");
        setInput({});
      } else {
        setMessage("❌ User not found.");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ User not found.");
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
        <h2 className="text-2xl font-bold">Forgot Your Password?</h2>
        <p className="text-gray-600">Enter your email, and we&apos;ll send you a reset link.</p>

        {message && (
          <p className={`mt-2 ${message.includes("✅") ? "text-primary" : "text-red-500"}`}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="w-full max-w-sm mt-6">
          {/* Email Input */}
          <div className="relative w-full mb-4">
            <FaEnvelope className="absolute left-3 top-4 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={input.email || ""}
              onChange={handleChange}
              required
              className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0c5643]"
            />
          </div>

          {/* Send Reset Link Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-full ${
              loading ? "bg-gray-400" : "bg-[#0c5643] hover:bg-[#094d39]"
            } text-white font-bold py-3 rounded-lg mt-4 transition duration-300`}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </motion.button>
        </form>

        {/* Back to Login */}
        <p className="text-gray-500 mt-6">
          Remember your password?{" "}
          <a href="/auth/login" className="text-[#0c5643] font-semibold hover:underline">
            Log in here!
          </a>
        </p>
      </motion.div>
    </>
  );
}

export default ForgotPassword;
