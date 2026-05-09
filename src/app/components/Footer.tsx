"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-deep-black border-t border-white/5 py-24">
      <div className="premium-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 lg:col-span-1">
            <h4 className="text-white font-nature font-black text-2xl tracking-tighter mb-8">
              SONICWAVE
            </h4>
            <p className="text-muted-foreground text-sm opacity-60 leading-relaxed max-w-xs">
              Engineering the future of sound with precision and passion. Designed for those who demand the extraordinary.
            </p>
          </div>

          {[
            {
              title: "Explore",
              links: ["All Models", "Technology", "Story", "Innovation"],
            },
            {
              title: "Support",
              links: ["Shipping", "Warranty", "Returns", "Contact"],
            },
            {
              title: "Connect",
              links: ["Instagram", "Twitter", "LinkedIn", "YouTube"],
            },
          ].map((column) => (
            <div key={column.title}>
              <h5 className="label-mono mb-8">{column.title}</h5>
              <ul className="space-y-4">
                {column.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-ghost-white/60 hover:text-red-highlight transition-colors duration-300 text-sm font-light"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 gap-8">
          <p className="label-mono text-[10px]">
            © 2024 SONICWAVE PRO. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8">
            <Link href="#" className="label-mono text-[10px] hover:text-white transition-colors">
              PRIVACY POLICY
            </Link>
            <Link href="#" className="label-mono text-[10px] hover:text-white transition-colors">
              TERMS OF SERVICE
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
