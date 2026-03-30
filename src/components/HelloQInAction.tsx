import { useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import phoneDiscover from "@/assets/phone-discover.png";
import phoneChat from "@/assets/phone-chat.png";
import phoneProfile from "@/assets/phone-profile.png";

const screens = [
  { img: phoneProfile, label: "Profile", delay: 0 },
  { img: phoneDiscover, label: "Discover", delay: 0.3 },
  { img: phoneChat, label: "Chat", delay: 0.6 },
];

const FloatingParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      color: ["#FF4FD8", "#FF7E7E", "#FFD93D", "#7EDCFF", "#8F7CFF"][Math.floor(Math.random() * 5)],
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      for (const p of particles) {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.offsetWidth) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.offsetHeight) p.dy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + "40";
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

const PhoneCard = ({ screen, index }: { screen: typeof screens[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isCenter = index === 1;

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    cardRef.current.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (cardRef.current) cardRef.current.style.transform = "";
  }, []);

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
    >
      {/* Wave float animation wrapper */}
      <motion.div
        animate={{ y: [0, -14, 0], rotate: [0, index === 0 ? -1.5 : index === 2 ? 1.5 : 1, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: screen.delay,
        }}
      >
        <motion.div
          ref={cardRef}
          className="relative cursor-pointer"
          style={{ perspective: 800, transformStyle: "preserve-3d" }}
          whileHover={{ scale: 1.06, zIndex: 10 }}
          transition={{ duration: 0.3 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Rainbow glow on hover */}
          <div className="absolute -inset-3 gradient-rainbow-bg opacity-0 group-hover:opacity-25 rounded-3xl blur-xl transition-opacity duration-500" />

          <img
            src={screen.img}
            alt={`${screen.label} Screen`}
            className={`relative rounded-3xl drop-shadow-xl ${isCenter ? "w-56 md:w-64" : "w-48 md:w-56"}`}
            loading="lazy"
          />

          {/* Reflection */}
          <div className="absolute bottom-0 left-0 right-0 h-1/5 bg-gradient-to-t from-white/15 to-transparent rounded-b-3xl" />
        </motion.div>
      </motion.div>

      <p className="text-center font-heading text-sm mt-4 text-muted-foreground group-hover:text-foreground transition-colors">
        {screen.label}
      </p>
    </motion.div>
  );
};

const HelloQInAction = () => {
  return (
    <section className="py-32 overflow-hidden relative">
      <FloatingParticles />

      {/* Background blobs */}
      <motion.div
        className="absolute w-44 h-44 rounded-full blur-[80px] opacity-20"
        style={{ background: "hsl(var(--hq-pink))", left: "15%", top: "30%" }}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-36 h-36 rounded-full blur-[80px] opacity-20"
        style={{ background: "hsl(var(--hq-sky))", right: "15%", top: "40%" }}
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-40 h-40 rounded-full blur-[80px] opacity-15"
        style={{ background: "hsl(var(--hq-violet))", left: "50%", bottom: "20%" }}
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      {/* Glow ring */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-primary/10 animate-glow-pulse pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-4xl md:text-5xl mb-4">
            HelloQ <span className="gradient-rainbow-text">in Action</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            See how HelloQ brings people together through beautifully crafted experiences.
          </p>
        </motion.div>

        <div className="flex justify-center items-end gap-6 md:gap-10">
          {screens.map((screen, i) => (
            <PhoneCard key={screen.label} screen={screen} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HelloQInAction;
