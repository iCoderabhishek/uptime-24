"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How does community-verified uptime work?",
    answer:
      "Instead of relying on a single server to determine uptime, we crowdsource real-time responses from global validators. This ensures a decentralized, tamper-resistant uptime status.",
  },
  {
    question: "Is my website safe while being monitored?",
    answer:
      "Yes. We only ping your site using standard HTTP requests and do not store or interact with your site data or authentication layers.",
  },
  {
    question: "How often is uptime checked?",
    answer:
      "Free tier checks every 5 minutes. Validators may ping more frequently based on load. Premium plans offer faster checks and logs.",
  },
  {
    question: "Can I become a validator?",
    answer:
      "Yes! You can run our lightweight open-source script and start validating uptime checks while earning reputation points.",
  },
  {
    question: "Do I need to sign in to monitor a site?",
    answer:
      "No. You can anonymously monitor up to 3 websites. For advanced features like email alerts, logs, and team access, you’ll need to sign in.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-3xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-12 text-neutral-300">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="bg-gray-900/70 border border-gray-700 rounded-xl overflow-hidden shadow-md hover:shadow-orange-500/10 transition"
          >
            <button
              onClick={() => toggleFAQ(i)}
              className="w-full flex items-center justify-between p-6 text-left"
            >
              <span className="text-lg font-medium text-white">
                {faq.question}
              </span>
              <motion.div
                animate={{ rotate: openIndex === i ? 180 : 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {openIndex === i && (
                <motion.div
                  initial={{ opacity: 0, clipPath: "inset(0% 0% 100% 0%)" }}
                  animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
                  exit={{ opacity: 0, clipPath: "inset(0% 0% 100% 0%)" }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="px-6 pb-4 text-gray-300 text-sm"
                >
                  {faq.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
