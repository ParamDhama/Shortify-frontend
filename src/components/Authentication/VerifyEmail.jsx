import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEnvelopeOpenText } from "react-icons/fa";
import apiClient from "../../api/apiClient";
import endpoints from "../../api/endpoints";

function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Click the button below to verify your email.");
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleVerify = async () => {
    setLoading(true);
    setMessage("Verifying your email...");

    try {
      const res = await apiClient.get(endpoints.auth.VERIFY_EMAIL(token));

      if (res.data.message === "Email verified successfully! You can now log in.") {
        setMessage("✅ Email verified successfully! Redirecting...");
        setVerified(true);
        setTimeout(() => navigate("/auth/login"), 3000);
      } else {
        setMessage("❌ Verification failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Verification failed. Please try again.");
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
          <FaEnvelopeOpenText className="text-6xl" />
        </motion.div>

        <h2 className="text-2xl font-bold">Email Verification</h2>
        <p className="text-gray-600 mt-2">{message}</p>

        {!verified && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-full max-w-xs ${
              loading ? "bg-gray-400" : "bg-[#0c5643] hover:bg-[#094d39]"
            } text-white font-bold py-3 rounded-lg mt-4 transition duration-300`}
            onClick={handleVerify}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify Email"}
          </motion.button>
        )}

        {/* Resend Verification Email Button */}
        {!verified && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full max-w-xs bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 rounded-lg mt-4 transition duration-300"
            onClick={() => navigate("/auth/resend-verify")}
          >
            Resend Verification Email
          </motion.button>
        )}

        {/* Back to Login Link */}
        <p className="text-gray-500 mt-6">
          Already verified?{" "}
          <a href="/auth/login" className="text-[#0c5643] font-semibold hover:underline">
            Log in now!
          </a>
        </p>
      </motion.div>
    </>
  );
}

export default VerifyEmail;
