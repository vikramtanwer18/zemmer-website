import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

// Premium Magnetic Wrapper
const MagneticWrapper = ({ children, className }) => {
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
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Navbar = () => {
  const { isAuthenticated, logout } = useAuthStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // If at the very top, set active section to Home
      if (window.scrollY < 100) {
        setActiveSection("#");
      }
    };
    window.addEventListener("scroll", handleScroll);

    // Setup Intersection Observer for scroll spy
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-30% 0px -70% 0px" }, // Triggers when section is in the top third of the viewport
    );

    // Observe all sections with IDs
    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [location.pathname]);

  const navItems = [
    { name: "Home", path: "#" },
    { name: "Features", path: "#features" },
    { name: "About", path: "#about" },
    { name: "Pricing", path: "#pricing" },
    { name: "FAQ", path: "#faq" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isScrolled ? "py-3" : "py-6"
      }`}
    >
      <div
        className={`mx-auto w-full max-w-[1536px] px-6 md:px-10 lg:px-16 transition-all duration-500 ease-out ${
          isScrolled ? "" : "bg-transparent border-transparent"
        }`}
      >
        <div
          className={`flex items-center justify-between w-full transition-all duration-500 ${
            isScrolled
              ? "rounded-full glass-panel shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/10 bg-white/90 backdrop-blur-md px-6 py-3"
              : "px-0 py-0"
          }`}
        >
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <span
              className={`text-xl font-heading font-extrabold tracking-tight transition-colors duration-300 ${
                isScrolled ? "text-primary-700" : "text-foreground-50"
              }`}
            >
              Zemmer
            </span>
            <div
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                isScrolled ? "bg-primary-500" : "bg-white"
              } group-hover:scale-150 transition-transform`}
            />
          </a>

          {/* Nav Links */}
          <div
            className={`hidden lg:flex items-center gap-2 text-sm font-medium transition-colors ${
              isScrolled ? "text-foreground-600" : "text-foreground-300"
            }`}
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.path;
              return (
                <a
                  key={item.name}
                  href={item.path}
                  className={`relative px-4 py-2 rounded-full transition-colors duration-300 ${
                    isActive
                      ? isScrolled
                        ? "text-primary-700"
                        : "text-white"
                      : isScrolled
                        ? "hover:text-foreground-900"
                        : "hover:text-white"
                  }`}
                  onClick={(e) => {
                    if (item.path.startsWith("#")) {
                      e.preventDefault();
                      setActiveSection(item.path); // Optimistically set active state
                      const element = document.querySelector(
                        item.path === "#" ? "body" : item.path,
                      );
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                        window.history.pushState(null, "", item.path);
                      }
                    }
                  }}
                >
                  <span className="relative z-10 whitespace-nowrap">
                    {item.name}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className={`absolute inset-0 rounded-full z-0 ${
                        isScrolled
                          ? "bg-primary-500/10"
                          : "bg-white/10 backdrop-blur-md"
                      }`}
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Auth Actions & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-4">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className={`text-sm font-medium whitespace-nowrap transition-colors ${
                      isScrolled
                        ? "text-foreground-700 hover:text-primary-600"
                        : "text-foreground-300 hover:text-white"
                    }`}
                  >
                    Dashboard
                  </Link>
                  <MagneticWrapper>
                    <button
                      onClick={logout}
                      className={`text-sm font-bold whitespace-nowrap px-5 py-2.5 rounded-full transition-all duration-300 ${
                        isScrolled
                          ? "bg-background-200/50 text-foreground-800 hover:bg-background-200"
                          : "bg-white/10 text-white hover:bg-white/20 backdrop-blur-md"
                      }`}
                    >
                      Logout
                    </button>
                  </MagneticWrapper>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className={`text-sm font-medium whitespace-nowrap transition-colors ${
                      isScrolled
                        ? "text-foreground-700 hover:text-primary-600"
                        : "text-foreground-300 hover:text-white"
                    }`}
                  >
                    Log In
                  </Link>
                  <MagneticWrapper>
                    <Link
                      to="/signup"
                      className={`text-sm font-bold whitespace-nowrap px-5 py-2.5 rounded-full transition-all duration-300 flex items-center justify-center gap-2 group ${
                        isScrolled
                          ? "bg-primary-500 text-white hover:bg-primary-600 shadow-glow"
                          : "bg-white text-background-950 hover:bg-primary-500 hover:text-white shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                      }`}
                    >
                      Get Started
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        →
                      </span>
                    </Link>
                  </MagneticWrapper>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2.5 rounded-full transition-colors flex items-center justify-center ${
                isScrolled
                  ? "bg-background-100 text-foreground-900 hover:bg-background-200"
                  : "bg-white/10 text-white backdrop-blur-md hover:bg-white/20"
              }`}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-4 right-4 mt-2 p-6 rounded-3xl glass-panel bg-background-950/95 backdrop-blur-2xl border border-white/10 shadow-2xl lg:hidden flex flex-col gap-2 origin-top"
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.path}
                onClick={(e) => {
                  setIsMobileMenuOpen(false);
                  if (item.path.startsWith("#")) {
                    e.preventDefault();
                    setActiveSection(item.path);
                    const element = document.querySelector(
                      item.path === "#" ? "body" : item.path,
                    );
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                      window.history.pushState(null, "", item.path);
                    }
                  }
                }}
                className={`text-[17px] font-bold px-4 py-3.5 rounded-xl transition-colors ${
                  activeSection === item.path
                    ? "bg-primary-500/10 text-primary-400"
                    : "text-foreground-500 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.name}
              </a>
            ))}

            <div className="h-[1px] w-full bg-white/10 my-4" />

            <div className="flex flex-col gap-3">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-[17px] font-bold px-4 py-3.5 text-foreground-300 hover:bg-white/5 hover:text-white rounded-xl transition-colors text-center"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-[17px] font-bold px-4 py-3.5 bg-background-800 text-white rounded-xl transition-colors text-center"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-[17px] font-bold px-4 py-3.5 text-foreground-300 hover:bg-white/5 hover:text-white rounded-xl transition-colors text-center"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-[17px] font-bold px-4 py-3.5 bg-primary-500 text-white rounded-xl transition-colors text-center shadow-glow"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
