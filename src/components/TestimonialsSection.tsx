import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

const testimonials = [
  { name: "Alex R.", review: "HelloQ helped me meet amazing people and build real connections. The community is so welcoming!", rating: 5 },
  { name: "Sam K.", review: "I love how expressive I can be on HelloQ. The avatar feature is so fun and the matches are great!", rating: 5 },
  { name: "Jordan M.", review: "Finally a dating app where I feel safe and celebrated for who I am. Can't recommend it enough.", rating: 5 },
  { name: "Taylor P.", review: "The community spaces are incredible. I've made friends and found my person all on one app!", rating: 5 },
  { name: "Riley C.", review: "Best dating app I've ever used. The vibe is inclusive and genuine. Found my partner here!", rating: 5 },
  { name: "Morgan W.", review: "HelloQ truly understands modern dating. The experience is smooth and the people are real.", rating: 5 },
];

const VISIBLE_COUNT = 3;

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const getVisibleCards = () => {
    const cards = [];
    for (let i = 0; i < VISIBLE_COUNT; i++) {
      cards.push(testimonials[(activeIndex + i) % testimonials.length]);
    }
    return cards;
  };

  return (
    <section className="py-32 overflow-hidden relative">
      {/* Background video placeholder — soft gradient animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{ background: "linear-gradient(135deg, hsl(var(--hq-pink)), hsl(var(--hq-sky)), hsl(var(--hq-violet)))", backgroundSize: "400% 400%" }}
          animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative max-w-[1200px] mx-auto px-6">
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

        <div className="relative flex gap-6 justify-center flex-wrap">
          <AnimatePresence mode="popLayout">
            {getVisibleCards().map((t, i) => (
              <motion.div
                key={`${t.name}-${activeIndex}-${i}`}
                className="glass-card p-8 max-w-sm w-full sm:w-80 flex-shrink-0"
                initial={{ opacity: 0, x: 80, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -80, scale: 0.9 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={16} className="fill-hq-yellow text-hq-yellow" />
                  ))}
                </div>
                <p className="font-body text-foreground/80 mb-5 italic leading-relaxed">"{t.review}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-pink-purple flex items-center justify-center text-primary-foreground font-heading text-sm">
                    {t.name[0]}
                  </div>
                  <span className="font-heading text-foreground">{t.name}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === activeIndex ? "w-6 gradient-pink-purple" : "bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
