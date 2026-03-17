import { motion } from "framer-motion";
import phoneDiscover from "@/assets/phone-discover.png";
import { Heart, MessageCircle, User } from "lucide-react";

const floatingElements = [
  { icon: Heart, label: "New Match!", x: -120, y: -80, delay: 0 },
  { icon: MessageCircle, label: "Hey! 👋", x: 140, y: -40, delay: 0.5 },
  { icon: User, label: "Profile View", x: -100, y: 100, delay: 1 },
];

const AppExperienceSection = () => {
  return (
    <section className="py-32 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Phone mockup */}
          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 gradient-rainbow-bg rounded-full blur-[80px] opacity-20 scale-150" />
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <img src={phoneDiscover} alt="HelloQ App" className="relative w-72 rounded-3xl drop-shadow-2xl" />
            </motion.div>

            {/* Floating elements */}
            {floatingElements.map((el, i) => (
              <motion.div
                key={i}
                className="absolute glass-card px-4 py-2 flex items-center gap-2"
                style={{ left: `calc(50% + ${el.x}px)`, top: `calc(50% + ${el.y}px)` }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: el.delay }}
              >
                <el.icon size={16} className="text-hq-pink" />
                <span className="font-heading text-sm text-foreground">{el.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-4xl md:text-5xl mb-6">
              Experience <span className="gradient-rainbow-text">HelloQ</span> Like Never Before
            </h2>
            <p className="font-body text-lg text-muted-foreground leading-relaxed mb-6 max-w-lg">
              From real-time notifications to expressive profiles, every interaction on HelloQ is designed to spark genuine connections.
            </p>
            <ul className="space-y-3">
              {["Instant match notifications", "Expressive chat with reactions", "Profile cards that stand out"].map((item) => (
                <li key={item} className="flex items-center gap-3 font-body text-foreground/80">
                  <span className="w-2 h-2 rounded-full gradient-pink-purple" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AppExperienceSection;
