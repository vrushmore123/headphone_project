"use client";

import { motion } from "framer-motion";

const features = [
  {
    icon: "🎵",
    title: "Hi-Res Audio",
    description: "Crystal-clear sound with support for high-resolution audio formats and premium codecs.",
  },
  {
    icon: "🔇",
    title: "Active Noise Cancellation",
    description: "Industry-leading noise cancellation technology for immersive audio experience.",
  },
  {
    icon: "🔋",
    title: "Ultra-Long Battery",
    description: "Up to 60 hours of battery life on a single charge for extended listening.",
  },
  {
    icon: "🎧",
    title: "Premium Comfort",
    description: "Ergonomic design with premium materials for all-day comfortable wear.",
  },
  {
    icon: "🌐",
    title: "Multi-Device Sync",
    description: "Seamlessly switch between your devices with intelligent pairing technology.",
  },
  {
    icon: "⚡",
    title: "Lightning-Fast Charging",
    description: "Fast-charge technology gets you hours of listening in just minutes.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function FeaturesSection() {
  return (
    <section className="relative px-6 py-24 md:px-10 md:py-32 bg-gradient-to-b from-black via-black/90 to-black border-t border-white/10 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-3xl bg-gradient-to-r from-transparent via-white/5 to-transparent blur-3xl opacity-30" />
      </div>

      <div className="relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-6xl mb-16 md:mb-20"
        >
          <h2 className="text-white/95 font-bold tracking-tight text-4xl md:text-5xl leading-tight mb-6">
            Engineered for Perfection
          </h2>
          <p className="text-white/60 max-w-2xl text-base md:text-lg font-light leading-relaxed">
            Every feature is meticulously designed to deliver an uncompromising audio experience.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group rounded-2xl border border-white/10 bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl p-8 hover:border-white/20 transition-all duration-300"
              whileHover={{ y: -4 }}
            >
              {/* Icon */}
              <motion.div
                className="mb-6 text-4xl"
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {feature.icon}
              </motion.div>

              {/* Content */}
              <h3 className="text-white/95 font-bold text-lg mb-3 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed font-light">
                {feature.description}
              </p>

              {/* Hover indicator */}
              <motion.div
                className="mt-6 pt-6 border-t border-white/10 text-white/40 text-xs flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <span>Learn more</span>
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
