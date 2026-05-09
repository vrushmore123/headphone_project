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
  delay?: number;
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function ProductCard({
  name,
  description,
  price,
  image,
  badge,
  delay = 0,
}: ProductCardProps) {
  return (
    <motion.div
      variants={itemVariants}
      className="group relative flex flex-col"
      transition={{ delay: delay * 0.1 }}
    >
      {/* Badge Overlay */}
      {badge && (
        <div className="absolute top-0 left-0 z-20">
          <span className="label-mono text-[10px] bg-red-highlight text-white px-3 py-1">
            {badge}
          </span>
        </div>
      )}

      {/* Image Container */}
      <div className="relative aspect-[4/5] bg-zinc-black overflow-hidden mb-8 border border-white/5 transition-all duration-700 group-hover:border-white/20">
        <motion.img
          src={image}
          alt={name}
          className="w-full h-full object-contain p-12 transition-all duration-1000 group-hover:scale-110 group-hover:rotate-2"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-deep-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <button className="btn-premium opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
            View Details
          </button>
        </div>
      </div>

      {/* Product Content */}
      <div className="flex flex-col flex-1">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-white font-nature font-bold text-xl tracking-tight group-hover:text-red-highlight transition-colors duration-500">
            {name}
          </h3>
          <span className="text-white font-mono text-lg font-light">
            {price}
          </span>
        </div>
        
        <p className="text-ghost-white/40 text-sm font-light leading-relaxed mb-8 flex-1">
          {description}
        </p>

        <div className="flex items-center gap-4 pt-4 border-t border-white/5">
          <span className="label-mono text-[10px] opacity-40">Series One / Audio</span>
          <div className="flex-1 h-[1px] bg-white/5" />
          <button className="text-white/40 hover:text-red-highlight transition-colors duration-300">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14m-7-7l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
