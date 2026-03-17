import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import logo from "@/assets/helloq-logo.png";

const navItems = ["Features", "Community", "Safety", "FAQ"];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "navbar-blur shadow-sm" : ""
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
        <img src={logo} alt="HelloQ" className="h-12 md:h-14 w-auto" />
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className="font-heading text-base text-foreground/80 hover:text-foreground transition-colors"
            >
              {item}
            </button>
          ))}
          <button className="font-heading text-base gradient-rainbow-bg text-primary-foreground px-6 py-2.5 rounded-full glow-pink hover:scale-105 transition-transform">
            Download App
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
