import { motion } from "framer-motion";
import communityBg from "@/assets/community-bg.jpg";

const CommunitySection = () => {
  return (
    <section id="community" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0">
        <img src={communityBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/90" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      <div className="relative max-w-[1200px] mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-4xl md:text-5xl mb-6">
            A welcoming community where everyone can{" "}
            <span className="gradient-rainbow-text">meet, connect, and express themselves</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            HelloQ brings together people from all walks of life in a safe, vibrant, and supportive environment.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunitySection;
