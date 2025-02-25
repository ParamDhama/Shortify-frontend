import { motion } from "framer-motion";
import { FaLink, FaShareAlt, FaChartLine } from "react-icons/fa";

function Working() {
  const steps = [
    {
      icon: <FaLink className="text-primary text-5xl" />,
      title: "1. Shorten Your Link",
      description: "Enter your long URL, and we'll generate a short link instantly.",
    },
    {
      icon: <FaShareAlt className="text-primary text-5xl" />,
      title: "2. Share Anywhere",
      description: "Copy the short link or download the QR code to share with anyone.",
    },
    {
      icon: <FaChartLine className="text-primary text-5xl" />,
      title: "3. Track Analytics",
      description: "Monitor clicks, locations, devices, and browsers in real time.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-gray-900"
        >
          🛠️ How It Works
        </motion.h2>
        <p className="text-gray-600 mt-4 text-lg">
          Shorten, share, and track your links in just three simple steps.
        </p>

        {/* Steps Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="p-8 bg-white shadow-lg rounded-xl flex flex-col items-center text-center hover:shadow-2xl transition duration-300"
            >
              <div className="p-5 bg-green-100 rounded-full">{step.icon}</div>
              <h3 className="text-2xl font-semibold mt-5">{step.title}</h3>
              <p className="text-gray-600 mt-3 text-lg">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Working;
