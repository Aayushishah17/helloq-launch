import logo from "@/assets/helloq-logo.png";

const footerLinks = {
  Product: ["Features", "Pricing", "Download", "Updates"],
  Company: ["About", "Careers", "Press", "Blog"],
  Support: ["Help Center", "Safety", "Community Guidelines", "Contact"],
  Social: ["Instagram", "Twitter", "TikTok", "Discord"],
};

const Footer = () => {
  return (
    <footer className="gradient-footer pt-16 pb-8">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <img src={logo} alt="HelloQ" className="h-14 w-auto mb-4" />
            <p className="font-body text-sm text-foreground/70">
              Where everyone belongs.
            </p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-heading text-sm font-bold text-foreground mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="font-body text-sm text-foreground/60 hover:text-foreground transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-foreground/10 pt-8 text-center">
          <p className="font-body text-sm text-foreground/50">
            © 2026 HelloQ. All rights reserved. Made with love for everyone. 🌈
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
