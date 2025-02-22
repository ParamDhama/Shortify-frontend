import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaLock } from "react-icons/fa";
import useInput from "../../hooks/useInput";
import apiClient from "../../api/apiClient";
import endpoints from "../../api/endpoints";

function ResetPassword() {
  const { input, handleChange, setInput } = useInput();
  const navigator = useNavigate();
  const { token } = useParams();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (input.password !== input.confirm) {
      setMessage("❌ Passwords do not match.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await apiClient.post(endpoints.auth.RESET_PASS(token), {
        newPassword: input.password
      });
      setInput({});

      if (res.data.message === "Password reset successfully! You can now log in.") {
        setMessage("✅ Password reset successfully! Redirecting...");
        setTimeout(() => {
          navigator("/auth/login");
        }, 3000);
      } else {
        setMessage("❌ Password reset failed! Redirecting...");
        setTimeout(() => {
          navigator("/");
        }, 3000);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Password reset failed! Redirecting...");
      setTimeout(() => {
        navigator("/");
      }, 3000);
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
        <h2 className="text-2xl font-bold">Reset Your Password</h2>
        <p className="text-gray-600">Enter your new password below.</p>

        {message && (
          <p className={`mt-2 ${message.includes("✅") ? "text-green-500" : "text-red-500"}`}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="w-full max-w-sm mt-6">
          {/* New Password Input */}
          <div className="relative w-full mb-4">
            <FaLock className="absolute left-3 top-4 text-gray-400" />
            <input
              type="text"
              name="password"
              placeholder="New Password"
              value={input.password || ""}
              onChange={handleChange}
              required
              className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0c5643]"
            />
          </div>

          {/* Confirm Password Input */}
          <div className="relative w-full mb-4">
            <FaLock className="absolute left-3 top-4 text-gray-400" />
            <input
              type="text"
              name="confirm"
              placeholder="Confirm Password"
              value={input.confirm || ""}
              onChange={handleChange}
              required
              className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0c5643]"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-full ${
              loading ? "bg-gray-400" : "bg-[#0c5643] hover:bg-[#094d39]"
            } text-white font-bold py-3 rounded-lg mt-4 transition duration-300`}
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
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

export default ResetPassword;
