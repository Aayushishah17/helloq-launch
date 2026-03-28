import { motion } from "framer-motion";
import { Apple, Play } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { useEffect, useRef, useCallback } from "react";

const PARTICLE_COUNT = 30;

const FloatingParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Array<{
    x: number; y: number; vx: number; vy: number;
    size: number; opacity: number; color: string;
  }>>([]);
  const rafRef = useRef<number>(0);

  const initParticles = useCallback((w: number, h: number) => {
    const colors = ["#FF4FD8", "#FF7E7E", "#FFD93D", "#7EDCFF", "#8F7CFF"];
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.3 - 0.2,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      initParticles(canvas.offsetWidth, canvas.offsetHeight);
    };
    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background image + overlay */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        {/* Rainbow gradient overlay */}
        <div
          className="absolute inset-0 opacity-20 animate-gradient-shift"
          style={{
            background: "linear-gradient(135deg, #FF7E7E33, #FFD93D33, #7EDCFF33, #8F7CFF33)",
            backgroundSize: "300% 300%",
          }}
        />
      </div>

      {/* Floating gradient blobs */}
      <motion.div
        className="absolute top-1/4 left-[15%] w-80 h-80 rounded-full blur-[120px] opacity-25"
        style={{ background: "radial-gradient(circle, #FF4FD8, transparent)" }}
        animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-[20%] w-72 h-72 rounded-full blur-[100px] opacity-25"
        style={{ background: "radial-gradient(circle, #8F7CFF, transparent)" }}
        animate={{ x: [0, -25, 0], y: [0, 25, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute top-[60%] left-[50%] w-64 h-64 rounded-full blur-[100px] opacity-20"
        style={{ background: "radial-gradient(circle, #FFD93D, transparent)" }}
        animate={{ x: [0, 20, -15, 0], y: [0, -15, 10, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />

      {/* Particles */}
      <FloatingParticles />

      {/* Content */}
      <div className="relative max-w-[1200px] mx-auto px-6 text-center" style={{ zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="font-display text-5xl md:text-7xl leading-[1.1] tracking-tight mb-6">
            Find Your{" "}
            <span className="gradient-rainbow-text">Perfect Connection</span>
          </h1>
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Meet new people, express yourself freely, and connect with a vibrant inclusive community on HelloQ.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 gradient-pink-purple text-primary-foreground font-heading px-8 py-4 rounded-full glow-pink transition-shadow hover:shadow-[0_8px_50px_-8px_rgba(255,79,216,0.5)]"
            >
              <Apple size={20} />
              Download on App Store
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 gradient-rainbow-bg text-primary-foreground font-heading px-8 py-4 rounded-full glow-rainbow transition-shadow hover:shadow-[0_8px_50px_-8px_rgba(143,124,255,0.5)]"
            >
              <Play size={20} />
              Get it on Google Play
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
