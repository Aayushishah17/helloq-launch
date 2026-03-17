import { motion } from "framer-motion";
import phoneDiscover from "@/assets/phone-discover.png";
import phoneChat from "@/assets/phone-chat.png";
import phoneProfile from "@/assets/phone-profile.png";

const screens = [
  { img: phoneDiscover, label: "Discover" },
  { img: phoneChat, label: "Chat" },
  { img: phoneProfile, label: "Profile" },
];

const AppPreviewSection = () => {
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
            Discover the <span className="gradient-rainbow-text">HelloQ Experience</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore features designed for authentic self-expression and meaningful connections.
          </p>
        </motion.div>

        <div className="flex justify-center gap-8 flex-wrap">
          {screens.map((screen, i) => (
            <motion.div
              key={screen.label}
              className="group relative"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -8, rotateY: 5 }}
            >
              <div className="absolute -inset-4 gradient-rainbow-bg opacity-0 group-hover:opacity-20 rounded-3xl blur-xl transition-opacity duration-500" />
              <img
                src={screen.img}
                alt={`${screen.label} Screen`}
                className="relative w-52 md:w-60 rounded-3xl drop-shadow-xl"
              />
              <p className="text-center font-heading text-base mt-4 text-foreground/70">{screen.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AppPreviewSection;
