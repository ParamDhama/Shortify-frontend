import { motion } from "framer-motion";
import { FaLink, FaShareAlt, FaChartLine } from "react-icons/fa";

function Working() {
  const steps = [
    {
      icon: <FaLink className="text-green-700 text-5xl" />,
      title: "1. Shorten Your Link",
      description: "Enter your long URL, and we'll generate a short link instantly.",
    },
    {
      icon: <FaShareAlt className="text-green-700 text-5xl" />,
      title: "2. Share Anywhere",
      description: "Copy the short link or download the QR code to share with anyone.",
    },
    {
      icon: <FaChartLine className="text-green-700 text-5xl" />,
      title: "3. Track Analytics",
      description: "Monitor clicks, locations, devices, and browsers in real time.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-gray-900"
        >
          🛠️ How It Works
        </motion.h2>
        <p className="text-gray-600 mt-3">
          Shorten, share, and track your links in three simple steps.
        </p>

        {/* Steps Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="p-6 bg-gray-100 shadow-md rounded-lg flex flex-col items-center text-center"
            >
              {step.icon}
              <h3 className="text-xl font-semibold mt-4">{step.title}</h3>
              <p className="text-gray-600 mt-2">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Working;
