"use client";

import { motion } from "framer-motion";

const features = [
  {
    label: "01",
    title: "Hi-Res Audio",
    description: "Pure sonic fidelity. Engineered with dual custom drivers for extreme frequency response.",
  },
  {
    label: "02",
    title: "ANC Matrix",
    description: "Adaptive cancellation that samples external noise 48,000 times per second.",
  },
  {
    label: "03",
    title: "Vast Power",
    description: "Efficiency redefined. Up to 80 hours of high-fidelity playback on a single charge.",
  },
  {
    label: "04",
    title: "Architecture",
    description: "Aerospace-grade zinc-aluminum alloy frame for ultimate durability and minimal weight.",
  },
  {
    label: "05",
    title: "Neural Sync",
    description: "Instantaneous pairing across all your devices with low-latency neural processing.",
  },
  {
    label: "06",
    title: "Rapid Charge",
    description: "Power the future. 10 minutes of charging delivers 12 hours of cinematic sound.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export default function FeaturesSection() {
  return (
    <section className="relative py-20 md:py-28 bg-deep-black border-y border-white/5 overflow-hidden">
      <div className="premium-container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24 lg:mb-32"
        >
          <span className="label-mono mb-6 block text-red-highlight">
            Technical Specification
          </span>
          <h2 className="heading-hero text-white mb-8">
            ENGINEERED<br />
            <span className="text-white/20">PERFECTION</span>
          </h2>
          <p className="text-ghost-white/40 max-w-2xl font-light leading-relaxed">
            Every component is meticulously designed to deliver an uncompromising 
            audio experience that pushes the boundaries of possibility.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-l border-t border-white/5"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group p-12 border-r border-b border-white/5 hover:bg-white/[0.02] transition-colors duration-500"
            >
              <span className="label-mono mb-12 block text-red-highlight group-hover:scale-110 transition-transform duration-500 origin-left">
                {feature.label}
              </span>

              <h3 className="text-white font-nature font-bold text-2xl mb-6 tracking-tight group-hover:text-red-highlight transition-colors duration-500">
                {feature.title}
              </h3>
              <p className="text-ghost-white/40 text-base leading-relaxed font-light group-hover:text-ghost-white transition-colors duration-500">
                {feature.description}
              </p>

              <div className="mt-12 w-0 h-[1px] bg-red-highlight group-hover:w-full transition-all duration-700" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
