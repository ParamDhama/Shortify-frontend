import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    <section className="py-20 bg-gray-50" id="FAQ">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center text-gray-900"
        >
          ❓ Frequently Asked Questions
        </motion.h2>
        <p className="text-center text-gray-600 mt-4 text-lg">
          Have questions? We have answers.
        </p>

        {/* FAQ List */}
        <div className="mt-12 space-y-6">
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white shadow-lg rounded-xl p-5 cursor-pointer border border-gray-200 hover:shadow-xl transition duration-300"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
                {openIndex === index ? (
                  <FaChevronUp className="text-primary text-xl" />
                ) : (
                  <FaChevronDown className="text-gray-600 text-xl" />
                )}
              </div>
              
              {/* Expandable Answer Section */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-gray-600 mt-3 text-md leading-relaxed"
                  >
                    {faq.answer}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
