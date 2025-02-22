import { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/apiClient";
import endpoints from "../../api/endpoints";
import useInput from "../../hooks/useInput";

function Register() {
  const { input, handleChange, setInput } = useInput();
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const navigator = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages

    try {
      const res = await apiClient.post(endpoints.auth.CREATE_USER, input);
      
      if (res.data.message !== "User registered! Check your email to verify your account.") {
        setMessage("Registration failed. Please try again.");
        return;
      }

      setMessage("Registration successful! Please verify your email.");
      setInput({});
      setTimeout(() => navigator("/auth/login"), 2000); // Redirect after 2 sec
    } catch (err) {
      console.error(err);
      setInput({});
      setMessage("Error: Unable to register. Please try again.");
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
        <h2 className="text-2xl font-bold">Create an Account</h2>
        <p className="text-gray-600">Join us and start shortening your links!</p>

        {message && <p className="text-red-500 mt-2">{message}</p>}

        <form onSubmit={handleRegister} className="w-full max-w-sm mt-6">
          {/* Name Input */}
          <div className="relative w-full mb-4">
            <FaUser className="absolute left-3 top-4 text-gray-400" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={input.name || ""}
              onChange={handleChange}
              required
              className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0c5643]"
            />
          </div>

          {/* Email Input */}
          <div className="relative w-full mb-4">
            <FaEnvelope className="absolute left-3 top-4 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={input.email || ""}
              onChange={handleChange}
              required
              className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0c5643]"
            />
          </div>

          {/* Password Input with Show Password Toggle */}
          <div className="relative w-full mb-4">
            <FaLock className="absolute left-3 top-4 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={input.password || ""}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0c5643]"
            />
            {/* Show/Hide Password Button */}
            <button
              type="button"
              className="absolute right-3 top-4 text-gray-400 hover:text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>

          {/* Register Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-[#0c5643] text-white font-bold py-3 rounded-lg mt-4 hover:bg-[#094d39] transition duration-300"
          >
            Sign Up
          </motion.button>
        </form>

        {/* Already have an account? */}
        <p className="text-gray-500 mt-6">
          Already have an account?{" "}
          <a href="/auth/login" className="text-[#0c5643] font-semibold hover:underline">
            Log in here!
          </a>
        </p>
      </motion.div>
    </>
  );
}

export default Register;
