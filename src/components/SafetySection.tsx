import { motion } from "framer-motion";
import { Shield, Lock, BadgeCheck } from "lucide-react";

const safetyCards = [
  { icon: BadgeCheck, title: "Verified Profiles", description: "Multi-step verification ensures every profile is real and authentic." },
  { icon: Lock, title: "Privacy Controls", description: "You decide who sees your profile, photos, and personal information." },
  { icon: Shield, title: "Community Moderation", description: "24/7 moderation team and AI tools keep the community safe and respectful." },
];

const SafetySection = () => {
  return (
    <section id="safety" className="py-32">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-4xl md:text-5xl mb-4">
            <span className="gradient-rainbow-text">Safe</span> Dating Experience
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Your safety and privacy are our top priorities. We've built multiple layers of protection.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {safetyCards.map((card, i) => (
            <motion.div
              key={card.title}
              className="glass-card p-8 text-center"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
              whileHover={{ y: -6, boxShadow: "0 12px 40px -8px rgba(255, 79, 216, 0.2)" }}
            >
              <div className="w-16 h-16 rounded-2xl gradient-rainbow-bg flex items-center justify-center mx-auto mb-6">
                <card.icon size={28} className="text-primary-foreground" />
              </div>
              <h3 className="font-heading text-xl mb-3 text-foreground">{card.title}</h3>
              <p className="font-body text-muted-foreground leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SafetySection;
