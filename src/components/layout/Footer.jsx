import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState } from "react";

// Magnetic Social Icon
const MagneticSocial = ({ children, href }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.a
      href={href}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary-500 hover:border-primary-500 text-foreground-400 hover:text-white transition-colors duration-300 shadow-sm hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]"
    >
      {children}
    </motion.a>
  );
};

// Animated Link
const FooterLink = ({ href, children, isRouterLink }) => {
  const Comp = isRouterLink ? Link : "a";
  const props = isRouterLink ? { to: href } : { href };

  return (
    <li>
      <Comp
        {...props}
        className="group relative inline-flex items-center text-foreground-400 hover:text-white transition-colors duration-300 py-1"
      >
        <span>{children}</span>
        <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-primary-500 transition-all duration-300 ease-out group-hover:w-full" />
      </Comp>
    </li>
  );
};

const Footer = () => {
  return (
    <footer className="bg-background-950 pt-10 pb-8 border-t border-white/5 relative overflow-hidden">
      {/* ── Ambient Glows ── */}
      <div className="absolute top-0 left-[20%] w-[500px] h-[300px] bg-primary-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-accent-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-[1536px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-9 lg:gap-8 mb-20">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-block mb-6 group">
              <span className="font-heading text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
                Zemmer
                <span className="w-2 h-2 rounded-full bg-primary-500 group-hover:scale-150 transition-transform duration-300" />
              </span>
            </Link>
            <p className="text-foreground-400 text-[15px] leading-relaxed mb-8 max-w-sm">
              The all-in-one SaaS platform for modern gym management. Streamline
              operations, engage members, and grow your fitness business
              effortlessly.
            </p>
            <div className="flex items-center gap-4">
              <MagneticSocial href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </MagneticSocial>
              <MagneticSocial href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </MagneticSocial>
              <MagneticSocial href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16.113 11.44a5 5 0 1 1-2.553-2.553 5 5 0 0 1 2.553 2.553" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </MagneticSocial>
              <MagneticSocial href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </MagneticSocial>
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block "></div>

          {/* Product Column */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-[15px] mb-6 tracking-wide">
              Product
            </h4>
            <ul className="space-y-3.5">
              <FooterLink href="#features">Features</FooterLink>
              <FooterLink href="#pricing">Pricing</FooterLink>
              <FooterLink href="#about">About Us</FooterLink>
              <FooterLink href="/login" isRouterLink>
                Log In
              </FooterLink>
              <FooterLink href="/signup" isRouterLink>
                Get Started
              </FooterLink>
            </ul>
          </div>

          {/* Features Column */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-[15px] mb-6 tracking-wide">
              Features
            </h4>
            <ul className="space-y-3.5">
              <FooterLink href="#">Member Management</FooterLink>
              <FooterLink href="#">Class Scheduling</FooterLink>
              <FooterLink href="#">Payment Processing</FooterLink>
              <FooterLink href="#">Analytics Dashboard</FooterLink>
              <FooterLink href="#">Mobile App</FooterLink>
            </ul>
          </div>

          {/* Support Column */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-[15px] mb-6 tracking-wide">
              Support
            </h4>
            <ul className="space-y-3.5 text-foreground-400">
              <li>
                <a
                  href="mailto:hello@zemmer.io"
                  className="hover:text-primary-400 transition-colors"
                >
                  hello@zemmer.io
                </a>
              </li>
              <li>
                <a
                  href="tel:+15551234567"
                  className="hover:text-primary-400 transition-colors"
                >
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="pt-2 text-sm text-foreground-500">
                Mon-Fri, 9AM-6PM EST
              </li>
              <li className="pt-2">
                <FooterLink href="#">Help Center</FooterLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Massive Brand Footer */}
        <div className="flex justify-center mb-16 overflow-hidden pointer-events-none opacity-5">
          <h1 className="text-[12vw] font-heading font-black tracking-tighter leading-none text-white whitespace-nowrap">
            ZEMMER
          </h1>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[13px] text-foreground-500">
          <p>© {new Date().getFullYear()} Zemmer Inc. All rights reserved.</p>
          <div className="flex items-center gap-8">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
