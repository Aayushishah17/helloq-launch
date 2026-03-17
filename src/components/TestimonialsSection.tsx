import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

const testimonials = [
  { name: "Alex R.", review: "HelloQ helped me meet amazing people and build real connections. The community is so welcoming!", rating: 5 },
  { name: "Sam K.", review: "I love how expressive I can be on HelloQ. The avatar feature is so fun and the matches are great!", rating: 5 },
  { name: "Jordan M.", review: "Finally a dating app where I feel safe and celebrated for who I am. Can't recommend it enough.", rating: 5 },
  { name: "Taylor P.", review: "The community spaces are incredible. I've made friends and found my person all on one app!", rating: 5 },
];

const TestimonialsSection = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

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
            Loved by <span className="gradient-rainbow-text">Thousands</span>
          </h2>
        </motion.div>

        <div className="flex gap-6 overflow-hidden justify-center flex-wrap">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className={`glass-card p-8 max-w-sm transition-all duration-500 ${i === active ? "scale-105 glow-pink" : "opacity-70"}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={16} className="fill-hq-yellow text-hq-yellow" />
                ))}
              </div>
              <p className="font-body text-foreground/80 mb-4 italic">"{t.review}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full gradient-pink-purple flex items-center justify-center text-primary-foreground font-heading text-sm">
                  {t.name[0]}
                </div>
                <span className="font-heading text-foreground">{t.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
