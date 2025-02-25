import { motion } from "framer-motion";
import { FaUserShield, FaLink, FaQrcode, FaLock, FaChartBar, FaHourglassHalf } from "react-icons/fa";

function Features() {
  const features = [
    {
      icon: <FaUserShield className="text-primary text-5xl" />,
      title: "User Authentication",
      description: "Signup, Login, Password Reset, and Email Verification for secure access.",
    },
    {
      icon: <FaLink className="text-primary text-5xl" />,
      title: "Shorten & Track URLs",
      description: "Easily shorten links and track clicks, locations, devices, and browsers.",
    },
    {
      icon: <FaQrcode className="text-primary text-5xl" />,
      title: "Generate QR Codes",
      description: "Create downloadable QR codes for your shortened links.",
    },
    {
      icon: <FaHourglassHalf className="text-primary text-5xl" />,
      title: "Expiration & Protection",
      description: "Set link expiration times or password-protect your URLs for extra security.",
    },
    {
      icon: <FaLock className="text-primary text-5xl" />,
      title: "Secure & Private",
      description: "JWT Authentication & Role-Based Access ensure security.",
    },
    {
      icon: <FaChartBar className="text-primary text-5xl" />,
      title: "Analytics & Insights",
      description: "Monitor URL performance with real-time analytics.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50" id="features">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-gray-900"
        >
          🌟 Powerful Features
        </motion.h2>
        <p className="text-gray-600 mt-3 text-lg">
          Everything you need to manage and track your links efficiently.
        </p>

        {/* Features Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="p-8 bg-white shadow-lg rounded-xl flex flex-col items-center text-center hover:shadow-2xl transition duration-300"
            >
              <div className="p-4 bg-green-100 rounded-full">{feature.icon}</div>
              <h3 className="text-2xl font-semibold mt-5">{feature.title}</h3>
              <p className="text-gray-600 mt-3">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
