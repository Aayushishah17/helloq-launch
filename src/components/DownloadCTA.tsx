import { motion } from "framer-motion";
import { Apple, Play } from "lucide-react";

const DownloadCTA = () => {
  return (
    <section className="py-32">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          className="relative gradient-cta rounded-3xl p-16 text-center overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ backgroundSize: "200% 200%", animation: "gradient-shift 8s ease infinite" }}
        >
          {/* Glow orbs */}
          <div className="absolute top-0 left-1/4 w-48 h-48 bg-primary-foreground/20 rounded-full blur-[60px]" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary-foreground/10 rounded-full blur-[80px]" />

          <div className="relative">
            <h2 className="font-display text-4xl md:text-5xl text-primary-foreground mb-4">
              Ready to Meet Someone New?
            </h2>
            <p className="font-body text-lg text-primary-foreground/90 mb-8 max-w-xl mx-auto">
              Download HelloQ today and start your journey to meaningful connections.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="flex items-center gap-2 bg-primary-foreground text-foreground font-heading px-8 py-4 rounded-full hover:scale-105 transition-transform shadow-lg">
                <Apple size={20} />
                Download on App Store
              </button>
              <button className="flex items-center gap-2 bg-primary-foreground/20 text-primary-foreground border border-primary-foreground/30 font-heading px-8 py-4 rounded-full hover:scale-105 hover:bg-primary-foreground/30 transition-all">
                <Play size={20} />
                Get it on Google Play
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DownloadCTA;
