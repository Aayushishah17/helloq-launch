import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "What is HelloQ?", a: "HelloQ is a colorful and inclusive social platform where people can meet, chat, express themselves freely, and build meaningful relationships. It celebrates diversity and creates a safe space for everyone." },
  { q: "Is HelloQ free?", a: "Yes! HelloQ is free to download and use. We offer optional premium features for users who want to enhance their experience with exclusive tools and benefits." },
  { q: "How does matching work?", a: "Our smart matching algorithm considers your interests, preferences, and behavior to suggest compatible people. The more you use HelloQ, the better your matches become." },
  { q: "Is my data secure?", a: "Absolutely. We use industry-leading encryption and security practices to protect your personal data. You have full control over your privacy settings and what information is shared." },
];

const FAQSection = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-32">
      <div className="max-w-[800px] mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-4xl md:text-5xl mb-4">
            Frequently Asked <span className="gradient-rainbow-text">Questions</span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              className="glass-card overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left font-heading text-lg text-foreground"
              >
                {faq.q}
                <ChevronDown
                  size={20}
                  className={`transition-transform duration-300 text-muted-foreground ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 font-body text-muted-foreground leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
