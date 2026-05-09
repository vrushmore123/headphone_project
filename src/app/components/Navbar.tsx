"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-[100] transition-all duration-500">
      <div className="premium-container flex items-center justify-between py-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-white font-nature font-black text-2xl tracking-tighter"
        >
          <Link href="/">SONICWAVE</Link>
        </motion.div>

        <div className="hidden md:flex items-center gap-12">
          {["Story", "Technology", "Models", "Support"].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 * index, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={`#${item.toLowerCase()}`}
                className="label-mono hover:text-red-highlight transition-colors duration-300"
              >
                {item}
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-6"
        >
          <button className="label-mono hover:text-red-highlight transition-colors duration-300">
            Search
          </button>
          <button className="relative group">
            <span className="label-mono group-hover:text-red-highlight transition-colors duration-300">
              Cart
            </span>
            <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-highlight text-white text-[10px] flex items-center justify-center rounded-full">
              0
            </span>
          </button>
        </motion.div>
      </div>
    </nav>
  );
}
