import { motion } from "framer-motion";
import { Globe, Users, BarChart3 } from "lucide-react";

export default function SolutionSection() {
  const steps = [
    {
      icon: <Globe className="w-8 h-8 text-black" />,
      title: "Submit Your Site",
      description:
        "Add your website to our monitoring network in under 2 minutes.",
    },
    {
      icon: <Users className="w-8 h-8 text-black" />,
      title: "Community Validates",
      description:
        "Real users worldwide check your site and share their actual experience.",
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-black" />,
      title: "Get Real Data",
      description:
        "Receive accurate uptime stats based on real user experiences, not just pings.",
    },
  ];

  return (
    <section className="relative border-t border-gray-800 overflow-hidden">
      {/* background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">How Uptime24 Works</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            <span className="text-orange-500 font-semibold">Real people</span>,
            real locations, real results — the most accurate uptime data
            available.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 18,
                mass: 0.5,
                delay: i * 0.3,
              }}
              viewport={{ once: true, amount: 0.4 }}
              className="text-center p-6 bg-gray-900/50 rounded-xl shadow-lg transition-shadow duration-500 hover:shadow-orange-500/20"
            >
              <motion.div
                whileInView={{ rotate: [0, 3, -3, 0] }}
                transition={{
                  duration: 1.2,
                  delay: i * 0.3 + 0.3,
                  ease: "easeInOut",
                }}
                whileTap={{ scale: 1.08 }}
                className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
              >
                {step.icon}
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: i * 0.3 + 0.2,
                  duration: 0.5,
                  ease: "easeOut",
                }}
                whileHover={{ scale: 1.03 }}
                className="text-xl font-semibold mb-4"
              >
                {step.title}
              </motion.h3>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{
                  delay: i * 0.3 + 0.4,
                  duration: 0.6,
                  ease: "easeOut",
                }}
                className="text-gray-300"
              >
                {step.description}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
