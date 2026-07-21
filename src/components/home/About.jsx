import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import { useRef, useState } from "react";
import {
  Zap,
  ShieldCheck,
  RefreshCw,
  Headset,
  Smartphone,
  TrendingUp,
  Trophy,
} from "lucide-react";

const aboutFeatures = [
  {
    icon: <Zap className="w-5 h-5 text-accent-500" />,
    title: "Lightning Fast Setup",
    description:
      "Get your gym running on Zemmer in under 30 minutes. Import existing data, set up classes, and start accepting payments instantly.",
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-accent-500" />,
    title: "Enterprise-Grade Security",
    description:
      "Bank-level encryption, GDPR compliant, and SOC 2 certified. Your gym data is protected with the highest security standards.",
  },
  {
    icon: <RefreshCw className="w-5 h-5 text-accent-500" />,
    title: "Seamless Integrations",
    description:
      "Connect with popular fitness equipment, access control systems, and marketing tools seamlessly.",
  },
  {
    icon: <Headset className="w-5 h-5 text-accent-500" />,
    title: "24/7 Dedicated Support",
    description:
      "Our support team responds in under 5 minutes. Real humans, real solutions — not chatbots.",
  },
  {
    icon: <Smartphone className="w-5 h-5 text-accent-500" />,
    title: "Fully Mobile-Ready",
    description:
      "Manage your gym from anywhere. The admin dashboard is fully responsive, and members get a branded mobile app.",
  },
  {
    icon: <TrendingUp className="w-5 h-5 text-accent-500" />,
    title: "Proven ROI",
    description:
      "Gyms using Zemmer see an average 23% increase in member retention and 18% growth in revenue within 6 months.",
  },
];

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: -40, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

// ── Magnetic Feature Item ──
const MagneticFeature = ({ item }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.1, y: middleY * 0.1 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      variants={fadeUp}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="flex gap-5 group cursor-default p-4 -m-4 rounded-2xl hover:bg-white/5 transition-colors duration-300"
    >
      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent-500/10 flex items-center justify-center border border-accent-500/20 group-hover:bg-accent-500/20 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] transition-all duration-300">
        {item.icon}
      </div>
      <div>
        <h4 className="font-heading font-bold text-white text-[16px] mb-2 group-hover:text-accent-400 transition-colors">
          {item.title}
        </h4>
        <p className="text-foreground-400 text-[14px] leading-relaxed group-hover:text-foreground-300 transition-colors">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
};

const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section
      ref={containerRef}
      className="py-30 bg-background-950 overflow-hidden relative"
      id="about"
    >
      {/* Decorative background element */}
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-200, 200]) }}
        className="absolute top-[20%] right-[-10%] w-[800px] h-[800px] bg-accent-500/5 rounded-full blur-[150px] pointer-events-none"
      />

      <div className="w-full max-w-[1536px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 lg:gap-24 items-center">
          {/* Left Content */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex-1"
          >
            <motion.div
              variants={fadeRight}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent-500/20 bg-accent-500/10 mb-8"
            >
              <span className="text-accent-400 font-bold tracking-widest text-[11px] uppercase">
                Why Zemmer
              </span>
            </motion.div>

            <motion.h2
              variants={fadeRight}
              className="font-heading text-4xl sm:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight"
            >
              Built for gym owners,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-accent-600 pr-2">
                by gym owners
              </span>
            </motion.h2>

            <motion.p
              variants={fadeRight}
              className="text-foreground-300 text-[18px] leading-relaxed mb-14 max-w-2xl font-light"
            >
              We spent 5 years running a chain of fitness centers before
              building Zemmer. We know the pain points — manual attendance
              sheets, missed payments, disorganized class schedules, and members
              slipping through the cracks. Zemmer solves all of that.
            </motion.p>

            <motion.div
              variants={stagger}
              className="grid sm:grid-cols-2 gap-x-12 gap-y-12"
            >
              {aboutFeatures.map((item, index) => (
                <MagneticFeature key={index} item={item} />
              ))}
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            style={{ opacity, scale }}
            className="flex-1 w-full relative perspective-1000"
          >
            <motion.div
              style={{ y }}
              className="relative rounded-3xl preserve-3d"
            >
              {/* Image Mask Reveal */}
              <motion.div
                initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
                whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
                transition={{
                  duration: 1.2,
                  ease: [0.77, 0, 0.17, 1],
                  delay: 0.2,
                }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative z-0 rounded-3xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-accent-500/20 mix-blend-overlay z-10 rounded-3xl" />
                <img
                  src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                  alt="Gym Owner using tablet"
                  className="w-full h-[700px] object-cover scale-105 hover:scale-110 transition-transform duration-[2s] ease-out rounded-3xl"
                  onError={(e) => {
                    // Fallback to a different image if the unsplash one fails
                    e.target.src =
                      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";
                  }}
                />
              </motion.div>

              {/* Glass Border */}
              <div className="absolute inset-0 border border-white/10 rounded-3xl z-20 pointer-events-none" />

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, y: 40, rotateX: 45 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: 1,
                  type: "spring",
                  stiffness: 150,
                  damping: 20,
                }}
                className="absolute bottom-10 left-[20px] lg:left-[-40px] bg-background-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] flex items-center gap-5 z-30"
              >
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-14 h-14 rounded-xl bg-accent-500/20 flex items-center justify-center border border-accent-500/30 shadow-[0_0_20px_rgba(245,158,11,0.2)]"
                >
                  <Trophy className="w-7 h-7 text-accent-500" />
                </motion.div>
                <div>
                  <p className="font-heading font-extrabold text-white text-2xl leading-tight">
                    #1
                  </p>
                  <p className="text-foreground-400 text-[11px] font-bold uppercase tracking-widest mt-1">
                    Rated Gym Software
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
