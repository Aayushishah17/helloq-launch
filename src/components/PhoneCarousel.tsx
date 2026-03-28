import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import phoneDiscover from "@/assets/phone-discover.png";
import phoneChat from "@/assets/phone-chat.png";
import phoneProfile from "@/assets/phone-profile.png";
import phoneAvatar from "@/assets/phone-avatar.png";
import phoneSettings from "@/assets/phone-settings.png";

const screens = [
  { img: phoneDiscover, label: "Discover" },
  { img: phoneChat, label: "Chat" },
  { img: phoneProfile, label: "Profile" },
  { img: phoneAvatar, label: "Avatars" },
  { img: phoneSettings, label: "Settings" },
];

const PhoneCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotationOffset, setRotationOffset] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const idleRafRef = useRef<number>(0);
  const lastTimeRef = useRef(0);

  // Auto-rotate on idle
  useEffect(() => {
    if (isHovering) {
      cancelAnimationFrame(idleRafRef.current);
      return;
    }

    const animate = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;
      setRotationOffset((prev) => prev + delta * 0.008);
      idleRafRef.current = requestAnimationFrame(animate);
    };
    idleRafRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(idleRafRef.current);
  }, [isHovering]);

  // Track cursor for parallax rotation
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const relX = (e.clientX - centerX) / (rect.width / 2); // -1 to 1
      setRotationOffset((prev) => {
        const target = relX * 40;
        return prev + (target - prev) * 0.1;
      });

      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => setIsHovering(false), 2000);
    },
    []
  );

  const count = screens.length;
  const angleStep = 360 / count;
  const radius = 260;

  return (
    <section className="py-32 overflow-hidden" id="experience">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-4xl md:text-5xl mb-4">
            Discover the <span className="gradient-rainbow-text">HelloQ Experience</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore features designed for authentic self-expression and meaningful connections.
          </p>
        </motion.div>

        {/* Carousel container */}
        <div
          ref={containerRef}
          className="relative mx-auto flex items-center justify-center"
          style={{ height: 520, perspective: 1200 }}
          onMouseMove={(e) => {
            setIsHovering(true);
            handleMouseMove(e);
          }}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Background glow rings */}
          <div className="absolute w-[500px] h-[500px] rounded-full border border-hq-pink/10 animate-glow-pulse" />
          <div className="absolute w-[400px] h-[400px] rounded-full border border-hq-violet/10 animate-glow-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute w-72 h-72 gradient-rainbow-bg rounded-full blur-[100px] opacity-15 animate-glow-pulse" />

          {/* Blurred blobs */}
          <motion.div
            className="absolute w-40 h-40 rounded-full blur-[60px] opacity-20"
            style={{ background: "#FF4FD8", left: "10%", top: "20%" }}
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <motion.div
            className="absolute w-36 h-36 rounded-full blur-[60px] opacity-20"
            style={{ background: "#7EDCFF", right: "10%", bottom: "20%" }}
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 7, repeat: Infinity }}
          />

          {/* Phone items */}
          <div className="relative" style={{ transformStyle: "preserve-3d", width: 200, height: 400 }}>
            {screens.map((screen, i) => {
              const angle = angleStep * i + rotationOffset;
              const rad = (angle * Math.PI) / 180;
              const x = Math.sin(rad) * radius;
              const z = Math.cos(rad) * radius;
              const isActive = hoveredIndex === i;
              const scale = isActive ? 1.12 : 0.75 + (z + radius) / (2 * radius) * 0.25;
              const zIndex = Math.round(z + radius);
              const blurAmount = isActive ? 0 : Math.max(0, (radius - z) / radius * 2);

              return (
                <motion.div
                  key={screen.label}
                  className="absolute top-0 left-0 cursor-pointer"
                  style={{
                    transform: `translateX(${x}px) translateZ(${z}px) scale(${scale})`,
                    zIndex,
                    filter: `blur(${blurAmount}px)`,
                    transformStyle: "preserve-3d",
                    willChange: "transform, filter",
                  }}
                  initial={{ opacity: 0, y: 80, rotateY: -30 }}
                  whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => setActiveIndex(i)}
                >
                  <div className={`relative rounded-3xl overflow-hidden transition-shadow duration-300 ${
                    isActive ? "shadow-[0_0_40px_rgba(255,79,216,0.3)]" : "shadow-xl"
                  }`}>
                    {/* Rainbow glow for active */}
                    {isActive && (
                      <div className="absolute -inset-1 gradient-rainbow-bg rounded-3xl opacity-30 blur-md" />
                    )}
                    <img
                      src={screen.img}
                      alt={`${screen.label} Screen`}
                      className="relative w-48 rounded-3xl"
                      loading="lazy"
                    />
                    {/* Reflection */}
                    <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-white/20 to-transparent rounded-b-3xl" />
                  </div>
                  <p className={`text-center font-heading text-sm mt-3 transition-colors duration-200 ${
                    isActive ? "text-foreground" : "text-muted-foreground"
                  }`}>
                    {screen.label}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Floating glass cards */}
          <motion.div
            className="absolute glass-card px-4 py-2 text-sm font-heading text-foreground/80"
            style={{ left: "5%", top: "15%" }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            ✨ Express Yourself
          </motion.div>
          <motion.div
            className="absolute glass-card px-4 py-2 text-sm font-heading text-foreground/80"
            style={{ right: "5%", bottom: "20%" }}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 6, repeat: Infinity, delay: 1 }}
          >
            💬 Real Connections
          </motion.div>
        </div>

        {/* Dot navigation */}
        <div className="flex justify-center gap-2 mt-10">
          {screens.map((s, i) => (
            <button
              key={s.label}
              onClick={() => {
                setActiveIndex(i);
                setRotationOffset(-angleStep * i);
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                activeIndex === i
                  ? "gradient-pink-purple w-8"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Go to ${s.label}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhoneCarousel;
