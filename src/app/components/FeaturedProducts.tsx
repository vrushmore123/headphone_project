"use client";

import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

const products = [
  {
    id: "pro",
    name: "SonicWave Pro",
    description: "Flagship wireless headphones with active noise cancellation and premium audio quality.",
    price: "$399",
    image: "/frames/ezgif-frame-001.png",
    badge: "Bestseller",
    color: "from-cyan-500/10 to-blue-500/10",
  },
  {
    id: "elite",
    name: "SonicWave Elite",
    description: "Premium studio-grade headphones designed for audio professionals and enthusiasts.",
    price: "$599",
    image: "/frames/ezgif-frame-050.png",
    badge: "Premium",
    color: "from-purple-500/10 to-pink-500/10",
  },
  {
    id: "sport",
    name: "SonicWave Sport",
    description: "Lightweight, sweat-resistant headphones engineered for athletes and active lifestyles.",
    price: "$299",
    image: "/frames/ezgif-frame-100.png",
    badge: "New",
    color: "from-emerald-500/10 to-teal-500/10",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export default function FeaturedProducts() {
  return (
    <section
      id="products"
      className="relative px-6 py-24 md:px-10 md:py-32 bg-gradient-to-b from-black via-black/95 to-black overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-white/5 to-transparent rounded-full blur-3xl opacity-20" />
      </div>

      <div className="relative z-10">
        {/* Section Header */}
        <motion.div
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto max-w-6xl mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-white/60 rounded-full" />
            <span className="text-white/60 text-xs font-medium tracking-widest uppercase">
              Our Collection
            </span>
          </div>

          <h2 className="text-white/95 font-bold tracking-tight text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
            Featured Products
          </h2>

          <p className="text-white/60 max-w-3xl text-base md:text-lg leading-relaxed font-light">
            Discover our carefully curated collection of premium wireless headphones, each engineered with precision and designed for excellence. From studio-grade audio to active lifestyle companions, find your perfect sound.
          </p>
        </motion.div>

        {/* Product Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              {...product}
              delay={index}
            />
          ))}
        </motion.div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-16 md:mt-24 pt-16 md:pt-20 border-t border-white/10"
        >
          <div className="mx-auto max-w-2xl text-center">
            <h3 className="text-white/90 font-bold tracking-tight text-2xl md:text-3xl mb-4">
              Can't decide?
            </h3>
            <p className="text-white/60 text-sm md:text-base mb-8 font-light">
              Our experts are here to help you find the perfect headphones for your needs.
            </p>

            <motion.button
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 backdrop-blur-md px-8 py-4 text-white/90 font-semibold text-base border border-white/20 transition-all duration-300"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 15px 40px rgba(255, 255, 255, 0.15)",
              }}
              whileTap={{ scale: 0.96 }}
            >
              Compare All Products
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
