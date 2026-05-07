import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      letterSpacing: {
        wider: "0.1em",
      },
      animation: {
        "fade-in": "fadeInSlideUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "fade-in-subtitle": "fadeInSlideUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s forwards",
        "fade-in-cta": "fadeInSlideUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s forwards",
      },
      transitionTimingFunction: {
        "smooth": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
