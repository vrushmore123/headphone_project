"use client";

import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

const products = [
  {
    id: "pro",
    name: "SERIES ONE PRO",
    description: "The pinnacle of audio engineering. Precision-calibrated for ultimate sonic clarity.",
    price: "$499",
    image: "/frames/ezgif-frame-001.png",
    badge: "Limited Edition",
  },
  {
    id: "elite",
    name: "SERIES ONE ELITE",
    description: "Studio-grade performance. Designed for those who demand uncompromising detail.",
    price: "$699",
    image: "/frames/ezgif-frame-050.png",
    badge: "Professional",
  },
  {
    id: "sport",
    name: "SERIES ONE AIR",
    description: "Weightless precision. Engineered for the most demanding active lifestyles.",
    price: "$349",
    image: "/frames/ezgif-frame-100.png",
    badge: "New Release",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function FeaturedProducts() {
  return (
    <section id="models" className="relative py-20 md:py-28 bg-deep-black overflow-hidden">
      <div className="premium-container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24 lg:mb-32 text-center"
        >
          <span className="label-mono mb-6 block text-red-highlight">
            Selected Collection
          </span>
          <h2 className="heading-hero text-white mb-8">
            CURATED<br />
            <span className="text-white/20">EXCELLENCE</span>
          </h2>
          <p className="text-ghost-white/40 max-w-2xl mx-auto font-light leading-relaxed">
            Discover our carefully curated collection of premium wireless headphones,
            each representing the peak of acoustic innovation.
          </p>
        </motion.div>

        {/* Product Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20"
        >
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              {...product}
              delay={index}
            />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-32 pt-16 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div>
            <h3 className="text-white font-nature font-bold text-2xl tracking-tight mb-2">
              BEYOND THE ORDINARY
            </h3>
            <p className="text-ghost-white/40 text-sm font-light">
              Explore the full technical specifications of our entire range.
            </p>
          </div>
          <button className="btn-premium">
            Compare Models
          </button>
        </motion.div>
      </div>
    </section>
  );
}
