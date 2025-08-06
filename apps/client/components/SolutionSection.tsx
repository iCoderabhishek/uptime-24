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
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-gray-900/50 rounded-xl shadow-lg hover:shadow-orange-500/10 transition"
            >
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
              <p className="text-gray-300">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
