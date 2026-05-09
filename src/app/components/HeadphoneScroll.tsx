"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
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

export default function HeadphoneScroll() {
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const canvasWrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const uiRef = useRef<HTMLDivElement | null>(null);

  const [loading, setLoading] = useState(true);

  const range = useMemo<FrameRange>(() => ({
    start: FRAME_START,
    end: FRAME_END,
    pad: FRAME_PAD,
    ext: FRAME_EXT,
  }), []);

  const frameCount = useMemo(() => range.end - range.start + 1, [range]);

  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const desiredFrameRef = useRef(0);
  const currentFrameRef = useRef(0);
  const rafPendingRef = useRef(false);

  const sizeRef = useRef({ dpr: 1, w: 0, h: 0, imgW: 0, imgH: 0 });

  /* ─── Draw ──────────────────────────────────────── */
  const draw = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: false });
    if (!canvas || !ctx) return;

    const { dpr, w, h, imgW, imgH } = sizeRef.current;
    if (!w || !h || !imgW || !imgH) return;

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, w * dpr, h * dpr);

    const img = imagesRef.current[currentFrameRef.current];
    if (!img) return;

    // Always centered, safe padding on all sides
    const pad = 0.10;
    const scale = Math.min((w * (1 - pad * 2)) / imgW, (h * (1 - pad * 2)) / imgH);
    const dw = imgW * scale;
    const dh = imgH * scale;
    const x = (w - dw) / 2;
    const y = (h - dh) / 2;

    ctx.save();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, x, y, dw, dh);
    ctx.restore();
  };

  const scheduleDraw = () => {
    if (rafPendingRef.current) return;
    rafPendingRef.current = true;
    requestAnimationFrame(() => {
      rafPendingRef.current = false;
      currentFrameRef.current = desiredFrameRef.current;
      draw();
    });
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

  /* ─── GSAP ScrollTrigger ─────────────────────────── */
  useEffect(() => {
    let destroyed = false;
    let st: ScrollTrigger | null = null;

    const preloadAll = async () => {
      const images: (HTMLImageElement | null)[] = new Array(frameCount).fill(null);
      imagesRef.current = images;
      await Promise.all(
        Array.from({ length: frameCount }, (_, i) =>
          new Promise<void>((resolve) => {
            const img = new Image();
            img.onload = () => { images[i] = img; resolve(); };
            img.onerror = () => resolve();
            img.src = frameUrl(range.start + i, range);
          })
        )
      );
      if (destroyed) return;
      const first = images.find(Boolean);
      if (first) {
        sizeRef.current.imgW = first.naturalWidth || 0;
        sizeRef.current.imgH = first.naturalHeight || 0;
      }
    };

    const setup = async () => {
      setLoading(true);
      await preloadAll();
      if (destroyed) return;

      syncCanvasSize();
      draw();
      setLoading(false);

      st = ScrollTrigger.create({
        trigger: triggerRef.current,
        start: "top top",
        end: "+=300%",
        scrub: 1.5,
        pin: true,
        onUpdate: (self) => {
          const next = Math.round(self.progress * (frameCount - 1));
          desiredFrameRef.current = Math.max(0, Math.min(frameCount - 1, next));
          scheduleDraw();

          // Subtle canvas breathe on scroll
          if (canvasRef.current) {
            canvasRef.current.style.transform = `scale(${1 + self.progress * 0.05})`;
          }
          // UI fade
          if (uiRef.current) {
            uiRef.current.style.opacity = String(1 - self.progress * 2.2);
          }
        },
      });

      const onResize = () => { syncCanvasSize(); draw(); };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    };

    setup();
    return () => { destroyed = true; if (st) st.kill(); };
  }, [frameCount, range]);

  /* ─── JSX ────────────────────────────────────────── */
  return (
    <section ref={triggerRef} className="relative bg-black overflow-hidden h-[100vh]">
      <div ref={canvasWrapRef} className="sticky top-0 h-screen w-full overflow-hidden">

        {/* ── BACKGROUND SYSTEM ───────────────────── */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* base gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_60%,#0d0d0d_0%,#000_100%)]" />
          {/* red cinematic light */}
          <motion.div
            animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full bg-[radial-gradient(circle,rgba(239,68,68,0.07)_0%,transparent_65%)]"
          />
          {/* upper atmospheric haze */}
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-black/80 to-transparent" />
          {/* lower atmospheric haze */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black to-transparent" />
          {/* edge vignette */}
          <div className="absolute inset-0 cinematic-vignette opacity-70" />
        </div>

        {/* ── CANVAS (centered product) ────────────── */}
        <div className="absolute inset-0 z-10 will-change-transform">
          <canvas ref={canvasRef} className="w-full h-full" />
        </div>

        {/* ── ALL UI (fades on scroll) ─────────────── */}
        <div ref={uiRef} className="absolute inset-0 z-20 pointer-events-none select-none">

          {/* TOP — massive background headline */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 left-0 right-0 flex justify-center pt-[14vh]"
          >
            <h1
              className="font-nature font-black text-center uppercase leading-none tracking-[-0.04em] text-[clamp(4rem,14vw,16rem)]"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.07) 0%, transparent 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Unheard
            </h1>
          </motion.div>

          {/* BOTTOM — second word + info row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-0 left-0 right-0 pb-[8vh]"
          >
            {/* big bottom word */}
            <div className="flex justify-center mb-8">
              <span
                className="font-nature font-black uppercase leading-none tracking-[-0.04em] text-[clamp(4rem,14vw,16rem)]"
                style={{
                  background: "linear-gradient(0deg, rgba(255,255,255,0.05) 0%, transparent 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Frequencies
              </span>
            </div>

            {/* info strip */}
            <div className="mx-auto max-w-5xl px-6 flex items-center justify-between border-t border-white/[0.06] pt-6">
              {/* left — label */}
              <div className="flex items-center gap-3">
                <span className="w-4 h-px bg-red-highlight" />
                <span className="font-mono text-red-highlight text-[9px] uppercase tracking-[0.35em]">
                  Series One — MK II
                </span>
              </div>

              {/* center — spec pills */}
              <div className="hidden md:flex items-center gap-6">
                {[
                  { v: "80h", l: "Battery" },
                  { v: "ANC", l: "Active Noise" },
                  { v: "Hi-Res", l: "Audio" },
                ].map(({ v, l }) => (
                  <div key={v} className="flex flex-col items-center gap-0.5">
                    <span className="font-mono text-white/60 text-[11px] font-medium tracking-wide">{v}</span>
                    <span className="font-mono text-white/20 text-[9px] uppercase tracking-widest">{l}</span>
                  </div>
                ))}
              </div>

              {/* right — CTAs */}
              <div className="flex items-center gap-4 pointer-events-auto">
                <button className="group relative px-6 py-2.5 overflow-hidden border border-white/10 hover:border-red-highlight/40 text-white/50 hover:text-white font-mono text-[9px] uppercase tracking-[0.2em] transition-all duration-500">
                  <span className="relative z-10">Explore</span>
                  <div className="absolute inset-0 bg-red-highlight/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </button>
                <button className="group px-6 py-2.5 bg-red-highlight text-white font-mono text-[9px] uppercase tracking-[0.2em] hover:bg-red-highlight/90 transition-colors duration-300 shadow-[0_0_20px_rgba(239,68,68,0.25)] hover:shadow-[0_0_35px_rgba(239,68,68,0.4)]">
                  Pre-order
                </button>
              </div>
            </div>
          </motion.div>

          {/* LEFT — floating spec indicator */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 hidden lg:flex"
          >
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
            <div className="flex flex-col gap-4">
              {["40mm", "24-bit", "BT 5.3"].map((spec) => (
                <div key={spec} className="flex flex-col items-center gap-1">
                  <span className="font-mono text-white/40 text-[10px] tracking-wider [writing-mode:vertical-rl]">{spec}</span>
                </div>
              ))}
            </div>
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
          </motion.div>

          {/* RIGHT — audio frequency bars (decorative) */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-2"
          >
            {[14, 22, 10, 28, 18, 8, 24, 16].map((h, i) => (
              <motion.div
                key={i}
                animate={{ scaleY: [1, 0.4, 1], opacity: [0.3, 0.15, 0.3] }}
                transition={{ duration: 1.5 + i * 0.15, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
                style={{ height: h }}
                className="w-[1px] bg-red-highlight origin-bottom"
              />
            ))}
            <span className="font-mono text-white/15 text-[8px] uppercase tracking-widest mt-2 [writing-mode:vertical-rl]">Frequency</span>
          </motion.div>

          {/* SCROLL indicator — center bottom */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 2 }}
            className="absolute bottom-[13vh] left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-1.5"
            >
              <div className="w-px h-6 bg-gradient-to-b from-white/20 to-transparent" />
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                <path d="M1 1l4 4 4-4" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </motion.div>
        </div>

        {/* ── LOADING ──────────────────────────────── */}
        {loading && (
          <div className="absolute inset-0 bg-black z-[100] flex flex-col items-center justify-center gap-8">
            <div className="w-20 h-px bg-white/5 overflow-hidden">
              <motion.div
                animate={{ x: [-80, 80] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                className="w-full h-full bg-red-highlight"
              />
            </div>
            <span className="font-mono text-white/15 text-[8px] uppercase tracking-[0.6em]">
              Initializing
            </span>
          </div>
        )}

      </div>
    </section>
  );
}
