"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FRAME_START = 1;
const FRAME_END = 150;
const FRAME_PAD = 3;
const FRAME_EXT = "png";

type FrameRange = {
  start: number;
  end: number;
  pad: number;
  ext: string;
};

function frameUrl(index: number, range: FrameRange) {
  const n = String(index).padStart(range.pad, "0");
  return `/frames/ezgif-frame-${n}.${range.ext}`;
}

async function sampleBackgroundHexFromImage(img: HTMLImageElement) {
  // Sample the 4 corners and average them. This helps blend image edges
  // seamlessly if your frames have a non-transparent background.
  const w = img.naturalWidth || img.width;
  const h = img.naturalHeight || img.height;
  if (!w || !h) return "#050505";

  const c = document.createElement("canvas");
  c.width = 2;
  c.height = 2;
  const ctx = c.getContext("2d", { willReadFrequently: true });
  if (!ctx) return "#050505";

  const corners: Array<[number, number]> = [
    [0, 0],
    [w - 1, 0],
    [0, h - 1],
    [w - 1, h - 1],
  ];

  ctx.clearRect(0, 0, 2, 2);
  corners.forEach(([sx, sy], i) => {
    const dx = i % 2;
    const dy = Math.floor(i / 2);
    ctx.drawImage(img, sx, sy, 1, 1, dx, dy, 1, 1);
  });

  const data = ctx.getImageData(0, 0, 2, 2).data;
  let r = 0;
  let g = 0;
  let b = 0;
  for (let i = 0; i < data.length; i += 4) {
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
  }
  r = Math.round(r / 4);
  g = Math.round(g / 4);
  b = Math.round(b / 4);

  const toHex = (v: number) => v.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export default function HeadphoneScroll() {
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const canvasWrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const range = useMemo<FrameRange>(
    () => ({
      start: FRAME_START,
      end: FRAME_END,
      pad: FRAME_PAD,
      ext: FRAME_EXT,
    }),
    []
  );

  const frameCount = useMemo(() => range.end - range.start + 1, [range]);

  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const desiredFrameRef = useRef(0);
  const currentFrameRef = useRef(0);

  const rafPendingRef = useRef(false);

  const sizeRef = useRef({
    dpr: 1,
    w: 0,
    h: 0,
    imgW: 0,
    imgH: 0,
  });

  const bgHexRef = useRef<string>("#050505");

  const scheduleDraw = () => {
    if (rafPendingRef.current) return;
    rafPendingRef.current = true;
    requestAnimationFrame(() => {
      rafPendingRef.current = false;
      currentFrameRef.current = desiredFrameRef.current;
      draw();
    });
  };

  const draw = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: false });
    if (!canvas || !ctx) return;

    const { dpr, w, h, imgW, imgH } = sizeRef.current;
    if (!w || !h || !imgW || !imgH) return;

    // Clear before drawing next frame.
    ctx.clearRect(0, 0, w * dpr, h * dpr);
    ctx.fillStyle = bgHexRef.current;
    ctx.fillRect(0, 0, w * dpr, h * dpr);

    const img = imagesRef.current[currentFrameRef.current];
    if (!img) return;

    // "Contain" scaling keeps the entire headphone visible.
    const scale = Math.min(w / imgW, h / imgH);
    const dw = imgW * scale;
    const dh = imgH * scale;
    const x = (w - dw) / 2;
    const y = (h - dh) / 2;

    ctx.save();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(img, x, y, dw, dh);
    ctx.restore();
  };

  const syncCanvasSize = () => {
    const wrap = canvasWrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const rect = wrap.getBoundingClientRect();
    const w = Math.max(1, Math.floor(rect.width));
    const h = Math.max(1, Math.floor(rect.height));
    const dpr = Math.min(2, window.devicePixelRatio || 1);

    sizeRef.current = { ...sizeRef.current, dpr, w, h };

    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
  };

  useEffect(() => {
    let destroyed = false;
    let st: ScrollTrigger | null = null;

    const preloadAll = async () => {
      const images: (HTMLImageElement | null)[] = new Array(frameCount).fill(
        null
      );
      imagesRef.current = images;

      const loadOne = (i: number) =>
        new Promise<void>((resolve) => {
          const actualIndex = range.start + i;
          const url = frameUrl(actualIndex, range);

          const img = new Image();
          img.decoding = "async";
          img.loading = "eager";
          img.onload = () => {
            images[i] = img;
            resolve();
          };
          img.onerror = () => {
            // Missing frame shouldn't hard-crash the page.
            resolve();
          };
          img.src = url;
        });

      await Promise.all(Array.from({ length: frameCount }, (_, i) => loadOne(i)));

      if (destroyed) return;

      // Use the first successfully loaded frame for image sizing + background.
      const first = images.find(Boolean) as HTMLImageElement | undefined;
      if (first) {
        sizeRef.current.imgW = first.naturalWidth || 0;
        sizeRef.current.imgH = first.naturalHeight || 0;
        bgHexRef.current = await sampleBackgroundHexFromImage(first).catch(
          () => "#050505"
        );
      }
    };

    const setup = async () => {
      const canvas = canvasRef.current;
      const canvasWrap = canvasWrapRef.current;
      const trigger = triggerRef.current;
      if (!canvas || !canvasWrap || !trigger) return;

      // Preload frames before starting the scroll animation.
      setLoading(true);
      await preloadAll();
      if (destroyed) return;

      syncCanvasSize();
      draw();

      setLoading(false);

      const state = { frame: 0 };

      st = ScrollTrigger.create({
        trigger,
        start: "top top",
        end: "+=400%",
        scrub: true,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          // Scroll up/down naturally reverses because scrub is enabled.
          const next = Math.round(self.progress * (frameCount - 1));
          desiredFrameRef.current = Math.max(0, Math.min(frameCount - 1, next));
          scheduleDraw();

          // Enhanced scroll-driven animations with easing
          const p = self.progress;
          
          // Glow effect intensity
          if (glowRef.current) {
            const glowIntensity = Math.sin(p * Math.PI) * 0.6 + 0.4;
            glowRef.current.style.opacity = String(glowIntensity);
          }

          // Title animation with smooth easing
          if (titleRef.current) {
            const a = Math.max(0, Math.min(1, (p - 0.05) / 0.18));
            const eased = a < 0.5 ? 2 * a * a : -1 + (4 - 2 * a) * a;
            titleRef.current.style.opacity = String(eased);
            titleRef.current.style.transform = `translateY(${(1 - eased) * 20}px)`;
            titleRef.current.style.filter = `blur(${(1 - eased) * 4}px)`;
          }
          
          // Subtitle animation with delay and easing
          if (subtitleRef.current) {
            const a = Math.max(0, Math.min(1, (p - 0.12) / 0.18));
            const eased = a < 0.5 ? 2 * a * a : -1 + (4 - 2 * a) * a;
            subtitleRef.current.style.opacity = String(eased);
            subtitleRef.current.style.transform = `translateY(${(1 - eased) * 16}px)`;
            subtitleRef.current.style.filter = `blur(${(1 - eased) * 3}px)`;
          }
          
          // Badge fade out at end
          if (badgeRef.current) {
            const a = Math.max(0, Math.min(1, (0.72 - p) / 0.2));
            badgeRef.current.style.opacity = String(a);
            badgeRef.current.style.transform = `translateY(${(1 - a) * 10}px)`;
          }
        },
      });

      // Make sure we redraw after pin starts (layout can change).
      scheduleDraw();

      const onResize = () => {
        syncCanvasSize();
        scheduleDraw();
      };
      window.addEventListener("resize", onResize);

      // Cleanup.
      return () => {
        window.removeEventListener("resize", onResize);
      };
    };

    const cleanupResize = setup();

    return () => {
      destroyed = true;
      if (st) st.kill();
      cleanupResize?.then((fn) => fn?.());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frameCount, range.start, range.end, range.ext, range.pad]);

  return (
    <section
      id="sonic-scroll"
      className="relative text-white overflow-hidden"
    >
      {/*
        Extra scroll distance (300vh) lives on the pinned trigger element.
        ScrollTrigger will pin it and scrub the frame index.
      */}
      <div ref={triggerRef} className="relative h-[300vh]">
        {/* Sticky banner covering full height */}
        <div
          ref={canvasWrapRef}
          className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0a0a0a] via-[#050505] to-black"
        >
          {/* Premium glow effect behind product */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="absolute w-[600px] h-[600px] opacity-0 transition-opacity duration-700 will-change-gpu"
              ref={glowRef}
              style={{
                background: "radial-gradient(circle at center, rgba(255,255,255,0.08), rgba(255,255,255,0.02) 40%, transparent 70%)",
                filter: "blur(60px)",
              }}
            />
          </div>

          {/* Canvas with 3D perspective - covers entire banner */}
          <div className="absolute inset-0 w-full h-full flex items-center justify-center" style={{ perspective: "1200px" }}>
            <canvas
              ref={canvasRef}
              className="w-full h-full block"
              aria-hidden="true"
              style={{
                filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.4))",
              }}
            />
          </div>

          {/* Premium overlay content - positioned on top of animation */}
          <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-10 pointer-events-none">
            {/* Header/Navigation with Framer Motion */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center justify-between"
            >
              <motion.div className="text-white/90 font-semibold tracking-tight text-lg md:text-xl letter-spacing-wider">
                SonicWave Pro
              </motion.div>
              <motion.div className="hidden md:flex items-center gap-6 text-white/60 text-sm">
                <motion.a
                  href="#"
                  className="hover:text-white/90 transition-smooth pointer-events-auto"
                  whileHover={{ color: "rgba(255,255,255,0.9)" }}
                >
                  Story
                </motion.a>
                <motion.a
                  href="#cta"
                  className="hover:text-white/90 transition-smooth pointer-events-auto"
                  whileHover={{ color: "rgba(255,255,255,0.9)" }}
                >
                  Shop
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Parallax text overlay - "Sound Redefined" */}
            <motion.div
              className="absolute top-1/4 left-0 right-0 text-center pointer-events-none"
              style={{
                opacity: Math.max(0, 1 - scrollProgress * 3),
                y: scrollProgress * 100,
              }}
            >
              <div className="text-white/20 font-light tracking-widest text-xl md:text-2xl">
                Sound Redefined
              </div>
            </motion.div>

            {/* Hero content - centered in banner with enhanced animations */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="flex items-center justify-center flex-1"
            >
              <div className="max-w-4xl w-full text-center">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-white/90 font-bold tracking-tight text-5xl md:text-7xl leading-[1.1]"
                >
                  Premium wireless<br />
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="bg-gradient-to-r from-white via-white/80 to-white/60 bg-clip-text text-transparent"
                  >
                    headphones
                  </motion.span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-white/60 max-w-2xl text-base md:text-lg font-light mt-6 leading-relaxed mx-auto"
                >
                  Engineered for impact and calibrated for silence. Experience the pinnacle of audio craftsmanship.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="mt-12 flex flex-col sm:flex-row gap-4 items-center justify-center pointer-events-auto"
                >
                  <motion.a
                    href="#"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-8 py-3.5 text-white/90 font-medium text-sm md:text-base hover:bg-white/15 hover:border-white/30 transition-smooth group"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Scroll to Explore</span>
                    <motion.svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      className="group-hover:translate-y-1 transition-smooth"
                      animate={{ y: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <path
                        d="M12 5v14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M19 12l-7 7-7-7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </motion.svg>
                  </motion.a>

                  <motion.a
                    href="#cta"
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md px-8 py-3.5 text-white/90 font-medium text-sm md:text-base hover:from-white/15 hover:to-white/10 border border-white/10 transition-smooth"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Get SonicWave Pro
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>

            {/* Parallax text overlay - "Engineered Excellence" */}
            <motion.div
              className="absolute bottom-1/4 left-0 right-0 text-center pointer-events-none"
              style={{
                opacity: Math.max(0, Math.min(1, (scrollProgress - 0.3) * 2)),
                y: -scrollProgress * 80,
              }}
            >
              <div className="text-white/15 font-light tracking-widest text-lg md:text-xl">
                Engineered Excellence
              </div>
            </motion.div>

            {/* Bottom section with badge and floating elements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex items-center justify-between"
            >
              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 backdrop-blur-md px-4 py-2 text-white/60 text-xs md:text-sm">
                  <motion.span
                    className="w-2 h-2 bg-green-400/60 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  Available worldwide
                </div>
              </motion.div>

              {/* Info badge with fade transition */}
              <motion.div
                ref={badgeRef}
                className="opacity-100 transition-opacity duration-500"
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <div className="rounded-full border border-white/10 bg-black/40 backdrop-blur-md px-3.5 py-2 text-white/60 text-[11px] md:text-xs font-medium tracking-wide">
                  Premium Animation • GSAP ScrollTrigger
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Text overlays for scroll-driven animations */}
          <div className="pointer-events-none absolute inset-0 flex items-start justify-center opacity-0">
            <div className="w-full max-w-6xl px-6 pt-12 md:pt-20 md:px-10">
              <h2
                ref={titleRef}
                className="opacity-0 text-white/90 font-bold tracking-tight text-4xl md:text-6xl leading-tight will-change-gpu text-balance"
                style={{ textShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
              >
                SonicWave Pro
              </h2>
              <p
                ref={subtitleRef}
                className="opacity-0 mt-4 text-white/60 max-w-2xl text-sm md:text-base will-change-gpu font-light leading-relaxed"
              >
                Watch how precision engineering unfolds frame by frame. Every component, perfectly orchestrated.
              </p>
            </div>
          </div>

          {/* Vignette effect */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.3) 100%)",
          }} />

          {/* Loading state */}
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center p-6 bg-black/20 backdrop-blur-sm">
              <div className="rounded-2xl border border-white/10 bg-black/60 backdrop-blur-md px-6 py-4 text-white/70 text-sm md:text-base text-center">
                <div className="mb-2">Preloading frames (1–150)…</div>
                <div className="h-1 w-24 bg-white/10 rounded-full overflow-hidden mx-auto">
                  <div className="h-full bg-gradient-to-r from-white/40 to-white/20 animate-pulse" />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* Content section after scroll animation */}
      <div className="px-6 pb-20 pt-24 md:px-10 relative z-10 bg-gradient-to-b from-black via-[#050505] to-black">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-12">
            <div>
              <h3 className="text-white/90 font-bold tracking-tight text-3xl md:text-4xl leading-tight">
                Precision Revealed
              </h3>
              <p className="mt-4 text-white/60 text-sm md:text-base leading-relaxed max-w-2xl font-light">
                Explore how the SonicWave Pro transforms from its sleek exterior to reveal the intricate engineering within. Every component is precisely positioned and optimized for the ultimate audio experience.
              </p>
            </div>

            {/* Feature cards with hover effects */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full md:max-w-2xl">
              {[
                {
                  title: "Design Precision",
                  description: "Each component rotates, separates, and expands in perfect synchronization.",
                },
                {
                  title: "Performance",
                  description: "Optimized rendering with RAF drawing for smooth 60fps animation.",
                },
                {
                  title: "Premium Feel",
                  description: "Subtle effects and parallax tied to scroll progress.",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 hover:bg-white/8 hover:border-white/20 transition-smooth cursor-default"
                >
                  <div className="text-white/90 font-semibold tracking-tight group-hover:text-white transition-smooth">
                    {feature.title}
                  </div>
                  <div className="mt-2 text-white/60 text-sm group-hover:text-white/70 transition-smooth">
                    {feature.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

