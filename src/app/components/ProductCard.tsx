"use client";

import { motion } from "framer-motion";
import React from "react";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  badge?: string;
  color?: string;
  delay?: number;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export default function ProductCard({
  id,
  name,
  description,
  price,
  image,
  badge,
  color = "from-white/10 to-white/5",
  delay = 0,
}: ProductCardProps) {
  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: delay * 0.1 }}
      className="group h-full"
    >
      <motion.div
        className="relative h-full rounded-2xl border border-white/10 bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl p-6 overflow-hidden transition-all duration-500 hover:border-white/20 cursor-pointer"
        whileHover={{
          y: -8,
          boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)",
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Animated gradient background on hover */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            pointerEvents: "none",
          }}
        />

        {/* Premium glow effect on hover */}
        <motion.div
          className="absolute -inset-2 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 blur-xl group-hover:opacity-30 transition-opacity duration-500"
          animate={{
            x: [0, 100, 0],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          style={{ pointerEvents: "none" }}
        />

        <div className="relative z-10">
          {/* Badge */}
          {badge && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: delay * 0.1 + 0.3 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-3 py-1 mb-4"
            >
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
              <span className="text-white/70 text-xs font-medium tracking-wide">
                {badge}
              </span>
            </motion.div>
          )}

          {/* Image Container with shimmer effect */}
          <div className="relative mb-6 overflow-hidden rounded-xl bg-gradient-to-br from-white/5 to-transparent p-1 h-64 flex items-center justify-center group">
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 translate-x-full group-hover:-translate-x-full"
              style={{ animation: "shimmer 2s infinite" }}
            />
            <motion.img
              src={image}
              alt={name}
              className="w-full h-full object-contain filter drop-shadow-2xl"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.4 }}
            />
          </div>

          {/* Product Info */}
          <div className="mb-4 space-y-2">
            <motion.h3
              className="text-white/95 font-bold tracking-tight text-xl leading-tight"
              initial={{ opacity: 0.8 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {name}
            </motion.h3>
            <p className="text-white/50 text-sm leading-relaxed font-light">
              {description}
            </p>
          </div>

          {/* Price and CTA */}
          <div className="flex items-end justify-between pt-4 border-t border-white/10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: delay * 0.1 + 0.4 }}
            >
              <div className="text-white/50 text-xs font-medium tracking-wide mb-1">
                Starting at
              </div>
              <div className="text-white font-bold text-2xl tracking-tight">
                {price}
              </div>
            </motion.div>

            {/* Premium CTA Button */}
            <motion.button
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 backdrop-blur-md px-4 py-2.5 text-white/90 font-medium text-xs transition-all duration-300"
              whileHover={{
                scale: 1.08,
                boxShadow: "0 10px 25px rgba(255, 255, 255, 0.1)",
              }}
              whileTap={{ scale: 0.96 }}
            >
              <span>View</span>
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.button>
          </div>

          {/* Specs hint */}
          <motion.div
            className="mt-4 pt-4 border-t border-white/10 text-white/40 text-xs flex items-center justify-between"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: delay * 0.1 + 0.5 }}
          >
            <span>Premium Build • Premium Sound</span>
            <motion.span
              animate={{ x: [0, 2, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
