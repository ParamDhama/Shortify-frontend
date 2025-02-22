import { motion } from "framer-motion";
import { FaUserShield, FaLink, FaQrcode, FaLock, FaChartBar, FaHourglassHalf } from "react-icons/fa";

function Features() {
  const features = [
    {
      icon: <FaUserShield className="text-green-700 text-5xl" />,
      title: "User Authentication",
      description: "Signup, Login, Password Reset, and Email Verification for secure access.",
    },
    {
      icon: <FaLink className="text-green-700 text-5xl" />,
      title: "Shorten & Track URLs",
      description: "Easily shorten links and track clicks, locations, devices, and browsers.",
    },
    {
      icon: <FaQrcode className="text-green-700 text-5xl" />,
      title: "Generate QR Codes",
      description: "Create downloadable QR codes for your shortened links.",
    },
    {
        icon: <FaHourglassHalf className="text-green-700 text-5xl" />,
        title: "Expiration & Protection",
        description: "Set link expiration times or password-protect your URLs for extra security.",
      },
    {
      icon: <FaLock className="text-green-700 text-5xl" />,
      title: "Secure & Private",
      description: "JWT Authentication & Role-Based Access ensure security.",
    },
    {
      icon: <FaChartBar className="text-green-700 text-5xl" />,
      title: "Analytics & Insights",
      description: "Monitor URL performance with real-time analytics.",
    },
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-gray-900"
        >
          🌟 Our Key Features
        </motion.h2>
        <p className="text-gray-600 mt-3">
          Experience the best link management with our powerful features.
        </p>

        {/* Features Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="p-6 bg-white shadow-md rounded-lg flex flex-col items-center text-center"
            >
              {feature.icon}
              <h3 className="text-xl font-semibold mt-4">{feature.title}</h3>
              <p className="text-gray-600 mt-2">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
