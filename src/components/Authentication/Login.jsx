import { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash,  } from "react-icons/fa";
import apiClient from "../../api/apiClient";
import endpoints from "../../api/endpoints";
import useInput from "../../hooks/useInput";
import { useNavigate } from "react-router-dom";

function Login() {
  const { input, handleChange, setInput } = useInput();
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const navigator = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await apiClient.post(endpoints.auth.LOGIN, {
        email: input.email,
        password: input.password,
      });

      if (!res.data.token) {
        setMessage("Invalid email or password");
        setInput({});
        return;
      }

      localStorage.setItem("token", res.data.token);
      navigator("/user/dashboard");
    } catch (err) {
      console.error(err);
      setMessage("Invalid email or password");
      setInput({});
    }
  };

  return (
    <>
      

      {/* Right Side (Login Form) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white p-8"
      >
        <h2 className="text-2xl font-bold">Welcome Back!</h2>
        <p className="text-gray-600">Sign in to manage your short links.</p>

        {message && <p className="text-red-500 mt-2">{message}</p>}

        <form onSubmit={handleLogin} className="w-full max-w-sm mt-6">
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
              {showPassword ?  <FaEye />: <FaEyeSlash />}
            </button>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end text-sm">
            <a href="/auth/forgot-password" className="text-[#0c5643] hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Login Button with Animation */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-[#0c5643] text-white font-bold py-3 rounded-lg mt-4 hover:bg-[#094d39] transition duration-300"
          >
            Login
          </motion.button>
        </form>

        {/* Sign Up Link */}
        <p className="text-gray-500 mt-6">
          Not registered?{" "}
          <a href="/auth/sign-up" className="text-[#0c5643] font-semibold hover:underline">
            Sign Up now!
          </a>
        </p>
      </motion.div>
    </>
  );
}

export default Login;
