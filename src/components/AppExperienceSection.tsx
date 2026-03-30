import { motion, useMotionValue, useTransform } from "framer-motion";
import phoneDiscover from "@/assets/phone-discover.png";
import { Heart, MessageCircle, User, Sparkles, ThumbsUp, Bell } from "lucide-react";
import { useRef } from "react";

const floatingElements = [
  { icon: Heart, label: "New Match!", x: -160, y: -120, delay: 0, color: "text-hq-pink" },
  { icon: MessageCircle, label: "Hey! How are you? 👋", x: 170, y: -60, delay: 0.5, color: "text-hq-sky" },
  { icon: User, label: "Profile Viewed", x: -140, y: 80, delay: 1, color: "text-hq-violet" },
  { icon: ThumbsUp, label: "Super Like!", x: 150, y: 110, delay: 1.5, color: "text-hq-yellow" },
  { icon: Bell, label: "3 new likes", x: -170, y: -10, delay: 0.8, color: "text-hq-coral" },
  { icon: Sparkles, label: "Boost Active", x: 160, y: 30, delay: 1.2, color: "text-hq-pink" },
];

const AppExperienceSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const phoneParallaxX = useTransform(mouseX, [-0.5, 0.5], [8, -8]);
  const phoneParallaxY = useTransform(mouseY, [-0.5, 0.5], [6, -6]);

  return (
    <section className="py-32 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-4xl md:text-5xl mb-4">
            Experience <span className="gradient-rainbow-text">HelloQ</span> Like Never Before
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            From real-time notifications to expressive profiles, every interaction is designed to spark genuine connections.
          </p>
        </motion.div>

        <div
          ref={containerRef}
          className="relative flex items-center justify-center min-h-[600px]"
          onMouseMove={handleMouseMove}
        >
          {/* Background glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-96 h-96 gradient-rainbow-bg rounded-full blur-[120px] opacity-15" />
          </div>
          <motion.div
            className="absolute w-72 h-72 rounded-full blur-[100px] opacity-20"
            style={{ background: "radial-gradient(circle, hsl(var(--hq-pink)), transparent)" }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Large centered phone */}
          <motion.div
            className="relative z-10"
            style={{ x: phoneParallaxX, y: phoneParallaxY }}
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="relative">
                <div className="absolute -inset-4 gradient-rainbow-bg rounded-[32px] blur-xl opacity-20" />
                <img
                  src={phoneDiscover}
                  alt="HelloQ App Discovery Screen"
                  className="relative w-72 md:w-80 rounded-3xl drop-shadow-2xl"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Floating UI elements */}
          {floatingElements.map((el, i) => {
            const elParallaxX = useTransform(mouseX, [-0.5, 0.5], [el.x * 0.15, -el.x * 0.15]);
            const elParallaxY = useTransform(mouseY, [-0.5, 0.5], [el.y * 0.15, -el.y * 0.15]);

            return (
              <motion.div
                key={i}
                className="absolute glass-card px-4 py-3 flex items-center gap-2.5 z-20"
                style={{
                  left: `calc(50% + ${el.x}px)`,
                  top: `calc(50% + ${el.y}px)`,
                  x: elParallaxX,
                  y: elParallaxY,
                }}
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + el.delay * 0.3 }}
                whileHover={{ scale: 1.08 }}
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: el.delay }}
                  className="flex items-center gap-2.5"
                >
                  <div className="w-8 h-8 rounded-xl gradient-pink-purple flex items-center justify-center">
                    <el.icon size={14} className="text-primary-foreground" />
                  </div>
                  <span className="font-heading text-sm text-foreground whitespace-nowrap">{el.label}</span>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AppExperienceSection;
