import { motion } from "framer-motion";
import { Sparkles, MessageCircle, Palette, Users, Shield, User } from "lucide-react";

const features = [
  { icon: Sparkles, title: "Smart Matching", description: "AI-powered matching that understands your preferences and connects you with compatible people.", color: "text-hq-pink" },
  { icon: MessageCircle, title: "Real-time Chat", description: "Express yourself with rich messaging, voice notes, and fun reactions in real time.", color: "text-hq-coral" },
  { icon: Palette, title: "Custom Avatars", description: "Create unique avatars that truly represent you with extensive customization options.", color: "text-hq-yellow" },
  { icon: Users, title: "Community Spaces", description: "Join interest-based communities and connect with like-minded people around shared passions.", color: "text-hq-sky" },
  { icon: Shield, title: "Privacy Controls", description: "Full control over your visibility, data, and who can see your profile information.", color: "text-hq-violet" },
  { icon: User, title: "Profile Personalization", description: "Showcase your personality with customizable profiles, interests, and media galleries.", color: "text-hq-pink" },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-32">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-4xl md:text-5xl mb-4">
            Everything You Need to{" "}
            <span className="gradient-rainbow-text">Connect</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Packed with features that make meeting people feel natural, safe, and exciting.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="glass-card p-8 hover:shadow-lg transition-all duration-300 group cursor-default"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
            >
              <div className={`w-12 h-12 rounded-2xl gradient-pink-purple flex items-center justify-center mb-5`}>
                <feature.icon size={24} className="text-primary-foreground" />
              </div>
              <h3 className="font-heading text-xl mb-3 text-foreground">{feature.title}</h3>
              <p className="font-body text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
