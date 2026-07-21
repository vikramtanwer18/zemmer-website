import {
  Users,
  CalendarCheck,
  CreditCard,
  QrCode,
  BarChart3,
  Kanban,
  MessageCircle,
  Smartphone,
  Heart,
} from "lucide-react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { useRef } from "react";

const features = [
  {
    icon: <Users className="w-6 h-6" />,
    title: "Member Management",
    description:
      "Track members, subscriptions, check-ins, and engagement all in one place. Automated renewals keep your cash flow steady.",
    color: "primary",
  },
  {
    icon: <CalendarCheck className="w-6 h-6" />,
    title: "Class Scheduling",
    description:
      "Create and manage group classes, personal training sessions, and facility bookings. Members book with real-time availability.",
    color: "accent",
  },
  {
    icon: <CreditCard className="w-6 h-6" />,
    title: "Payment Processing",
    description:
      "Accept membership fees, class payments, and retail purchases. Automated recurring billing built right in.",
    color: "secondary",
  },
  {
    icon: <QrCode className="w-6 h-6" />,
    title: "QR Attendance System",
    description:
      "Members scan a unique QR code to check in. No cards, no signatures — just instant, contactless attendance tracking.",
    color: "primary",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Analytics Dashboard",
    description:
      "Real-time dashboards showing revenue, attendance trends, member retention rates, and class popularity.",
    color: "accent",
  },
  {
    icon: <Kanban className="w-6 h-6" />,
    title: "Lead Management Kanban",
    description:
      "Visual pipeline for tracking prospective members from inquiry to sign-up with automated follow-up reminders.",
    color: "secondary",
  },
  {
    icon: <MessageCircle className="w-6 h-6" />,
    title: "WhatsApp Notifications",
    description:
      "Automated reminders, payment confirmations, and class updates sent directly to members via WhatsApp.",
    color: "primary",
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "Member Mobile App",
    description:
      "Branded mobile app where members view schedules, book classes, track progress, and receive notifications.",
    color: "accent",
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Nutrition & Progress",
    description:
      "Members log meals, track macros, and view progress charts. Trainers can assign meal plans from their dashboard.",
    color: "secondary",
  },
];

const iconStyles = {
  primary: {
    bg: "bg-primary-500/10",
    text: "text-primary-600",
    glow: "rgba(16, 185, 129, 0.15)", // emerald-500
  },
  accent: {
    bg: "bg-accent-500/10",
    text: "text-accent-600",
    glow: "rgba(245, 158, 11, 0.15)", // amber-500
  },
  secondary: {
    bg: "bg-secondary-500/10",
    text: "text-secondary-600",
    glow: "rgba(100, 116, 139, 0.15)", // slate-500
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const FeatureCard = ({ feature }) => {
  const ref = useRef(null);
  const style = iconStyles[feature.color];

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // For 3D Tilt
  const xPct = useMotionValue(0);
  const yPct = useMotionValue(0);
  const rotateX = useTransform(
    useSpring(yPct, { stiffness: 300, damping: 30 }),
    [-0.5, 0.5],
    ["5deg", "-5deg"],
  );
  const rotateY = useTransform(
    useSpring(xPct, { stiffness: 300, damping: 30 }),
    [-0.5, 0.5],
    ["-5deg", "5deg"],
  );

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseX.set(x);
    mouseY.set(y);

    xPct.set(x / rect.width - 0.5);
    yPct.set(y / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    xPct.set(0);
    yPct.set(0);
    // Move glow way off screen so it fades out
    mouseX.set(-1000);
    mouseY.set(-1000);
  };

  return (
    <motion.div
      variants={cardVariants}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative h-full perspective-1000"
    >
      <div className="absolute inset-0 bg-white rounded-3xl transition-transform duration-300 group-hover:scale-[0.98] z-0 shadow-sm border border-background-200" />

      {/* ── Spotlight Hover Glow ── */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 rounded-3xl transition-opacity duration-500 opacity-0 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              300px circle at ${mouseX}px ${mouseY}px,
              ${style.glow},
              transparent 80%
            )
          `,
        }}
      />

      {/* ── Content Container (Popped out in Z space slightly on hover) ── */}
      <motion.div
        className="relative z-20 p-8 h-full flex flex-col pointer-events-none"
        style={{ transform: "translateZ(30px)" }}
      >
        {/* Icon */}
        <div
          className={`relative w-14 h-14 rounded-2xl ${style.bg} ${style.text} flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3`}
        >
          {feature.icon}
        </div>

        {/* Title */}
        <h3 className="font-heading text-xl font-bold text-foreground-900 mb-3 group-hover:text-foreground-950 transition-colors duration-300">
          {feature.title}
        </h3>

        {/* Description */}
        <p className="text-foreground-500 text-[15px] leading-relaxed group-hover:text-foreground-700 transition-colors duration-300 flex-grow">
          {feature.description}
        </p>
      </motion.div>
    </motion.div>
  );
};

const Features = () => {
  return (
    <section
      className="py-32 bg-background-50 relative overflow-hidden"
      id="features"
    >
      {/* ── Ambient Background Lines/Mesh ── */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-background-300 to-transparent opacity-50" />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage:
            "radial-gradient(var(--color-foreground-900) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="w-full max-w-[1536px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary-500/20 bg-primary-50 mb-6">
            <span className="text-primary-600 font-bold tracking-widest text-[11px] uppercase">
              Everything You Need
            </span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-[56px] font-extrabold text-foreground-900 mb-6 leading-tight tracking-tight">
            Powerful features for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-700 pr-2">
              modern gyms
            </span>
          </h2>
          <p className="text-foreground-500 text-[18px] max-w-2xl mx-auto leading-relaxed">
            From member sign-ups to financial reports, Zemmer covers every
            aspect of running a successful fitness center. No more juggling
            tools.
          </p>
        </motion.div>

        {/* ── Feature Grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
