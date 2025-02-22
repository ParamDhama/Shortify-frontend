import { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqData = [
  {
    question: "How do I shorten a URL?",
    answer: "Simply enter your long URL into the input box and click the 'Shorten' button. You'll instantly get a short link that you can copy and share.",
  },
  {
    question: "Is my short link permanent?",
    answer: "Yes! Your shortened URL will remain active unless you choose to delete it from your dashboard.",
  },
  {
    question: "Can I track my shortened links?",
    answer: "Absolutely! You can track clicks, locations, devices, and browsers using the analytics dashboard.",
  },
  {
    question: "Is there a QR code option?",
    answer: "Yes! When you shorten a URL, you can also generate a downloadable QR code for easy sharing.",
  },
  {
    question: "Is this service free?",
    answer: "Yes! Our basic features are completely free. We also offer premium plans with additional features.",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center text-gray-900"
        >
          ❓ Frequently Asked Questions
        </motion.h2>
        <p className="text-center text-gray-600 mt-3">
          Here are answers to some common questions.
        </p>

        {/* FAQ List */}
        <div className="mt-10 space-y-4">
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white shadow-md rounded-lg p-4 cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
                {openIndex === index ? (
                  <FaChevronUp className="text-green-700" />
                ) : (
                  <FaChevronDown className="text-gray-600" />
                )}
              </div>
              {openIndex === index && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                  className="text-gray-600 mt-2"
                >
                  {faq.answer}
                </motion.p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
