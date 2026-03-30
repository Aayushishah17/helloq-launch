import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import screenProfile from "@/assets/screen-profile.png";
import screenDiscover from "@/assets/screen-discover.png";
import screenChat from "@/assets/screen-chat.png";

const screens = [
  { img: screenProfile, label: "Profile", floatDuration: 4, floatDelay: 0, rotation: [-1.5, 1.5, -1.5] },
  { img: screenDiscover, label: "Discover", floatDuration: 5, floatDelay: 0.4, rotation: [1, -1, 1] },
  { img: screenChat, label: "Chat", floatDuration: 3.5, floatDelay: 0.8, rotation: [1.5, -1.5, 1.5] },
];

const PhoneMockup = ({ screen, index }: { screen: typeof screens[number]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isCenter = index === 1;

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    cardRef.current.style.transform = `rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (cardRef.current) cardRef.current.style.transform = "";
  }, []);

  return (
    <motion.div
      className="flex flex-col items-center group"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.2 }}
    >
      {/* Independent float animation */}
      <motion.div
        animate={{
          y: [0, -12, 0],
          rotate: screen.rotation,
        }}
        transition={{
          duration: screen.floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: screen.floatDelay,
        }}
        className="relative"
      >
        {/* Per-phone glow blob */}
        <div className="absolute -inset-8 gradient-rainbow-bg opacity-0 group-hover:opacity-20 rounded-[32px] blur-2xl transition-opacity duration-500 pointer-events-none" />
        <motion.div
          className="absolute -inset-6 rounded-[32px] blur-[50px] opacity-10 pointer-events-none"
          style={{
            background: index === 0
              ? "hsl(var(--hq-pink))"
              : index === 1
              ? "hsl(var(--hq-violet))"
              : "hsl(var(--hq-sky))",
          }}
          animate={{ opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        <motion.div
          ref={cardRef}
          className="relative cursor-pointer"
          style={{ perspective: 800, transformStyle: "preserve-3d" }}
          whileHover={{ scale: 1.05, zIndex: 10 }}
          transition={{ duration: 0.3 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Device frame */}
          <div className={`relative rounded-[24px] overflow-hidden shadow-xl group-hover:shadow-2xl transition-shadow duration-300 ${
            isCenter ? "w-56 md:w-64" : "w-48 md:w-56"
          }`}>
            {/* Gradient border effect */}
            <div className="absolute -inset-[1px] gradient-rainbow-bg rounded-[24px] opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
            <img
              src={screen.img}
              alt={`${screen.label} Screen`}
              className="relative w-full rounded-[24px]"
              loading="lazy"
            />
            {/* Reflection */}
            <div className="absolute bottom-0 left-0 right-0 h-1/6 bg-gradient-to-t from-white/10 to-transparent rounded-b-[24px]" />
          </div>
        </motion.div>
      </motion.div>

      <p className="font-heading text-sm mt-5 text-muted-foreground group-hover:text-foreground transition-colors duration-300">
        {screen.label}
      </p>
    </motion.div>
  );
};

const HelloQInAction = () => {
  return (
    <section className="py-32 overflow-hidden relative">
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

        {/* 3-column grid — no overlap */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 place-items-center">
          {screens.map((screen, i) => (
            <PhoneMockup key={screen.label} screen={screen} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HelloQInAction;
