import { Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Dumbbell,
  Flame,
  HeartPulse,
  Zap,
  Timer,
  TrendingUp,
} from "lucide-react";

// ── Animated counter hook ──
const useCounter = (end, duration = 2000, startOnView = false) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!startOnView) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) setHasStarted(true);
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [startOnView, hasStarted]);

  useEffect(() => {
    if (!hasStarted && startOnView) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [hasStarted, end, duration, startOnView]);

  return { count, ref };
};

// ── Animation variants ──
const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const textStagger = {
  hidden: { opacity: 0, y: 40, rotateX: -20, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

// ── Floating gym icons data ──
const floatingIcons = [
  { Icon: Dumbbell, x: "8%", y: "18%", size: 24, delay: 0, dur: 7, rotate: 15 },
  {
    Icon: HeartPulse,
    x: "85%",
    y: "72%",
    size: 22,
    delay: 2,
    dur: 8,
    rotate: -10,
  },
  { Icon: Flame, x: "92%", y: "22%", size: 20, delay: 1, dur: 6, rotate: 12 },
  { Icon: Zap, x: "5%", y: "75%", size: 18, delay: 3, dur: 9, rotate: -15 },
  {
    Icon: Timer,
    x: "48%",
    y: "88%",
    size: 20,
    delay: 1.5,
    dur: 7.5,
    rotate: 8,
  },
  {
    Icon: TrendingUp,
    x: "75%",
    y: "10%",
    size: 20,
    delay: 2.5,
    dur: 8.5,
    rotate: -12,
  },
];

// ── Live activity feed data ──
const activities = [
  { icon: "🏋️", text: "Sarah just checked in", time: "Just now" },
  { icon: "📊", text: "Revenue up 12% this week", time: "2m ago" },
  { icon: "🧘", text: "Morning Yoga — 18/20 slots filled", time: "5m ago" },
  { icon: "💳", text: "New Pro membership — Alex R.", time: "8m ago" },
  { icon: "🔔", text: "Class reminder sent to 47 members", time: "12m ago" },
];

const LiveFeed = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activities.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[42px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20, scale: 0.95, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -20, scale: 0.95, filter: "blur(4px)" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex items-center gap-3"
        >
          <span className="text-[16px] bg-white/5 p-1.5 rounded-lg">
            {activities[currentIndex].icon}
          </span>
          <span className="text-foreground-200 text-[13px] font-medium tracking-wide">
            {activities[currentIndex].text}
          </span>
          <span className="text-primary-500 text-[11px] font-bold ml-auto uppercase tracking-wider">
            {activities[currentIndex].time}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// ── Stats ──
const stats = [
  { value: 2500, suffix: "+", label: "Active Gyms" },
  { value: 150, suffix: "K+", label: "Members Managed" },
  { value: 40, suffix: "+", label: "Countries" },
  { value: 99.9, suffix: "%", label: "Uptime", isDecimal: true },
];

const StatItem = ({ value, suffix, label, isDecimal }) => {
  const { count, ref } = useCounter(isDecimal ? 999 : value, 2500, true);
  const display = isDecimal ? (count / 10).toFixed(1) : count.toLocaleString();

  return (
    <motion.div ref={ref} variants={fadeUp} className="group cursor-default">
      <h3 className="font-heading text-[32px] md:text-[40px] font-extrabold text-white mb-1 tracking-tight group-hover:text-primary-400 transition-colors duration-500">
        {display}
        <span className="text-primary-500">{suffix}</span>
      </h3>
      <p className="text-foreground-400 text-[14px] font-medium tracking-wide uppercase">
        {label}
      </p>
    </motion.div>
  );
};

// ── Premium Magnetic Button ──
const MagneticButton = ({ children, className }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.15, y: middleY * 0.15 });
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

const Hero = () => {
  // ── Spotlight Effect ──
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // ── 3D Card Tilt Effect ──
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleCardMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mX = e.clientX - rect.left;
    const mY = e.clientY - rect.top;
    x.set(mX / width - 0.5);
    y.set(mY / height - 0.5);
  };

  const handleCardMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-background-950 flex flex-col justify-center pt-24">
      {/* ── Fantastic Animated Background Mesh & Grid ── */}
      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none">
        {/* Animated Mesh Gradients */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.35, 0.15],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-primary-500/30 rounded-full blur-[150px] mix-blend-screen"
        />
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, -90, 0],
            x: [0, 150, 0],
            y: [0, -100, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-20%] left-[-20%] w-[700px] h-[700px] bg-accent-500/20 rounded-full blur-[120px] mix-blend-screen"
        />
        <motion.div
          animate={{
            opacity: [0.05, 0.2, 0.05],
            y: [0, 100, 0],
            x: [0, -50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[20%] w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[130px] mix-blend-screen"
        />

        {/* Premium Grid Pattern */}
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px]"
          style={{
            maskImage:
              "radial-gradient(ellipse 80% 80% at 50% 50%, #000 20%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 80% at 50% 50%, #000 20%, transparent 100%)",
          }}
        />

        {/* Interactive Spotlight */}
        <motion.div
          className="absolute inset-0 mix-blend-screen"
          style={{
            background: useTransform(
              [mouseX, mouseY],
              ([x, y]) =>
                `radial-gradient(600px circle at ${x}px ${y}px, rgba(16, 185, 129, 0.15), transparent 40%)`,
            ),
          }}
        />
      </div>

      {/* ── Floating gym icons ── */}
      {floatingIcons.map(({ Icon, x, y, size, delay, dur, rotate }, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none text-white/5"
          style={{ left: x, top: y }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, rotate, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: dur,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay,
          }}
        >
          <Icon size={size} strokeWidth={1.5} />
        </motion.div>
      ))}

      <div className="relative z-10 w-full max-w-[1536px] mx-auto px-6 md:px-10 lg:px-16 py-16 md:py-20 flex-grow flex flex-col justify-center">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">
          {/* ───── Left Column ───── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="flex-shrink-0 w-full lg:w-[500px]"
          >
            <motion.div variants={fadeUp} className="inline-block mb-8">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary-500/30 bg-primary-500/10 backdrop-blur-md">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-500" />
                </span>
                <span className="text-primary-300 font-bold tracking-widest text-[11px] uppercase">
                  Gym Management Reimagined
                </span>
              </div>
            </motion.div>

            <motion.h1
              className="font-heading font-extrabold tracking-[-0.04em] leading-[1.05] mb-7 text-white"
              style={{ perspective: 1000 }}
            >
              <motion.span
                variants={textStagger}
                className="block text-[56px] sm:text-[72px]"
              >
                Run your gym
              </motion.span>
              <motion.span
                variants={textStagger}
                className="block text-[56px] sm:text-[72px] text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600 pr-2"
              >
                smarter.
              </motion.span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-foreground-300 text-[18px] leading-[1.6] mb-12 max-w-[460px] font-light"
            >
              The all-in-one SaaS platform for member tracking, class
              scheduling, payments, and growth analytics. Built exclusively for
              modern fitness businesses.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex items-center gap-6 mb-16"
            >
              <MagneticButton>
                <Link
                  to="/signup"
                  className="relative group inline-flex items-center justify-center px-8 py-4 bg-primary-500 text-white text-[15px] font-bold rounded-full overflow-hidden transition-all duration-300 hover:shadow-glow hover:scale-105"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out" />
                  <span className="relative z-10 flex items-center gap-2">
                    Start Free Trial
                    <span className="group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </span>
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link
                  to="/features"
                  className="group inline-flex items-center gap-2 text-white/70 text-[15px] font-semibold hover:text-white transition-colors px-4 py-2 rounded-full hover:bg-white/5"
                >
                  Explore Features
                </Link>
              </MagneticButton>
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[
                  "photo-1534528741775-53994a69daeb",
                  "photo-1506794778202-cad84cf45f1d",
                  "photo-1517841905240-472988babdf9",
                  "photo-1507003211169-0a1dd7228f2d",
                ].map((id, i) => (
                  <motion.img
                    key={i}
                    initial={{ opacity: 0, scale: 0, x: -20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{
                      delay: 1.2 + i * 0.1,
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    }}
                    className="w-10 h-10 rounded-full border-2 border-background-950 object-cover relative z-10 hover:z-20 hover:scale-125 transition-transform cursor-pointer"
                    src={`https://images.unsplash.com/${id}?w=100&q=80`}
                    alt="User"
                  />
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex text-accent-400 text-sm mb-0.5">★★★★★</div>
                <p className="text-white/60 text-[13px] font-medium">
                  Trusted by 2,500+ gym owners
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* ───── Right Column (3D Interactive Card) ───── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            className="flex-1 w-full max-w-[640px] relative perspective-1000 hidden md:block mt-16 lg:mt-0"
          >
            <motion.div
              style={{ rotateX, rotateY }}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              className="relative rounded-3xl preserve-3d"
            >
              {/* Premium Glassmorphism Card */}
              <div className="group relative bg-background-900/40 backdrop-blur-3xl rounded-3xl p-4 border border-white/10 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.8)] hover:border-primary-500/30 transition-colors duration-500">
                {/* +127 members badge (Floating out in Z space) */}
                <motion.div
                  style={{ translateZ: 50 }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-6 -right-8 bg-white/95 backdrop-blur-xl border border-white/20 text-foreground-900 rounded-2xl px-5 py-3.5 shadow-2xl z-20"
                >
                  <p className="font-heading font-extrabold text-[15px] leading-tight flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-primary-500" />
                    +127 members
                  </p>
                  <p className="text-foreground-500 text-[11px] font-bold uppercase tracking-wider mt-1">
                    This month
                  </p>
                </motion.div>

                {/* Dashboard image */}
                <div className="rounded-2xl overflow-hidden relative border border-white/5 bg-background-950">
                  <div className="absolute inset-0 bg-gradient-to-t from-background-950/80 to-transparent z-10 pointer-events-none" />
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                    alt="Zemmer Dashboard Preview"
                    className="w-full h-[460px] object-cover object-left-top opacity-90 group-hover:scale-[1.03] transition-transform duration-[1.5s] ease-out"
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";
                    }}
                  />

                  {/* Overlay UI elements on the image for depth */}
                  <div className="absolute bottom-6 left-6 right-6 z-20 flex gap-4">
                    <div className="flex-1 bg-white/10 backdrop-blur-xl border border-white/10 p-4 rounded-xl">
                      <div className="w-1/2 h-2 bg-white/20 rounded-full mb-3" />
                      <div className="w-3/4 h-2 bg-white/10 rounded-full" />
                    </div>
                    <div className="flex-1 bg-white/10 backdrop-blur-xl border border-white/10 p-4 rounded-xl">
                      <div className="w-2/3 h-2 bg-primary-500/50 rounded-full mb-3" />
                      <div className="w-1/2 h-2 bg-white/10 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── Live Activity Feed ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="absolute -bottom-8 left-10 right-10 bg-background-900/60 backdrop-blur-2xl border border-white/10 rounded-2xl px-6 py-4 shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500" />
                </span>
                <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">
                  Live Activity Feed
                </span>
              </div>
              <LiveFeed />
            </motion.div>
          </motion.div>
        </div>

        {/* ── Stats Bar ── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="mt-28 pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, i) => (
            <StatItem key={i} {...stat} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
