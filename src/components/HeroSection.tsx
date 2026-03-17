import { motion } from "framer-motion";
import { Apple, Play } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import phoneDiscover from "@/assets/phone-discover.png";
import phoneChat from "@/assets/phone-chat.png";
import phoneProfile from "@/assets/phone-profile.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background image + overlay */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      </div>

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-hq-pink/20 rounded-full blur-[120px] animate-glow-pulse" />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-hq-violet/20 rounded-full blur-[100px] animate-glow-pulse" style={{ animationDelay: "1.5s" }} />

      <div className="relative max-w-[1200px] mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="font-display text-5xl md:text-7xl leading-[1.1] tracking-tight mb-6">
            Find Your{" "}
            <span className="gradient-rainbow-text">Perfect Connection</span>
          </h1>
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-lg mb-8 leading-relaxed">
            Meet new people, express yourself freely, and connect with a vibrant inclusive community on HelloQ.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="flex items-center gap-2 gradient-pink-purple text-primary-foreground font-heading px-6 py-3.5 rounded-full glow-pink hover:scale-105 transition-transform">
              <Apple size={20} />
              Download on App Store
            </button>
            <button className="flex items-center gap-2 gradient-rainbow-bg text-primary-foreground font-heading px-6 py-3.5 rounded-full glow-rainbow hover:scale-105 transition-transform">
              <Play size={20} />
              Get it on Google Play
            </button>
          </div>
        </motion.div>

        {/* Right phone showcase */}
        <div className="relative hidden lg:flex justify-center items-center h-[600px]">
          {/* Background glow */}
          <div className="absolute w-80 h-80 gradient-rainbow-bg rounded-full blur-[80px] opacity-30 animate-glow-pulse" />

          {/* Left phone */}
          <motion.div
            className="absolute left-0 top-20 z-10"
            animate={{ y: [0, -12, 0], rotate: [-3, -1, -3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <img src={phoneProfile} alt="Profile Screen" className="w-44 rounded-3xl drop-shadow-2xl" />
          </motion.div>

          {/* Center phone */}
          <motion.div
            className="relative z-20"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <img src={phoneDiscover} alt="Discover Screen" className="w-64 rounded-3xl drop-shadow-2xl" />
          </motion.div>

          {/* Right phone */}
          <motion.div
            className="absolute right-0 top-16 z-10"
            animate={{ y: [0, -15, 0], rotate: [3, 1, 3] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            <img src={phoneChat} alt="Chat Screen" className="w-44 rounded-3xl drop-shadow-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
