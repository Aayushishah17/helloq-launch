import { motion } from "framer-motion";

const VideoSection = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Video background simulation with gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 gradient-cta opacity-20" />
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
            Connect with people who{" "}
            <span className="gradient-rainbow-text">celebrate you</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Join a community that values authenticity, inclusion, and meaningful connections.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoSection;
