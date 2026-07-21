import { useState, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Starter",
    description:
      "Perfect for small studios and independent trainers getting started.",
    monthlyPrice: 49,
    annualPrice: 39,
    features: [
      "Up to 200 members",
      "Class scheduling",
      "Basic payment processing",
      "QR attendance system",
      "Member mobile app",
      "Email support",
      "Basic analytics dashboard",
    ],
    popular: false,
  },
  {
    name: "Professional",
    description:
      "The sweet spot for growing fitness centers with multiple trainers.",
    monthlyPrice: 99,
    annualPrice: 79,
    features: [
      "Up to 1,000 members",
      "Everything in Starter",
      "Lead management kanban",
      "WhatsApp notifications",
      "Nutrition tracker",
      "Advanced analytics",
      "Priority support",
      "Custom branding",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    description:
      "For established gym chains that need unlimited scale and white-glove service.",
    monthlyPrice: 199,
    annualPrice: 159,
    features: [
      "Unlimited members",
      "Everything in Professional",
      "Multi-location management",
      "Dedicated account manager",
      "Custom integrations",
      "API access",
      "White-label mobile app",
      "24/7 phone support",
      "On-site training",
    ],
    popular: false,
  },
];

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const PricingCard = ({ plan, isAnnual, isSelected, onSelect }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const { currentTarget, clientX, clientY } = e;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <motion.div
      variants={fadeUp}
      onClick={onSelect}
      onMouseMove={handleMouseMove}
      className={`relative flex flex-col rounded-3xl p-8 cursor-pointer transition-all duration-500 group overflow-hidden ${
        isSelected
          ? "bg-white shadow-[0_30px_60px_-15px_rgba(16,185,129,0.15)] scale-100 lg:scale-[1.03] z-10"
          : "bg-white/60 hover:bg-white shadow-sm hover:shadow-xl scale-100 z-0"
      }`}
    >
      {/* ── Hover Spotlight ── */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              350px circle at ${mouseX}px ${mouseY}px,
              rgba(16, 185, 129, 0.05),
              transparent 80%
            )
          `,
        }}
      />

      {/* ── Border Selection ── */}
      <div
        className={`absolute inset-0 rounded-3xl border-2 transition-colors duration-500 ${
          isSelected
            ? "border-primary-500/50"
            : "border-background-200/50 group-hover:border-primary-500/20"
        }`}
      />

      {plan.popular && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary-400 to-primary-600 text-white text-[11px] font-bold uppercase tracking-widest px-6 py-1.5 rounded-b-xl shadow-md flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> Most Popular
        </div>
      )}

      <div className="relative z-10 flex flex-col h-full mt-4">
        <h3 className="font-heading text-2xl font-extrabold text-foreground-900 mb-2">
          {plan.name}
        </h3>
        <p className="text-foreground-500 text-[14px] leading-relaxed mb-6 min-h-[44px]">
          {plan.description}
        </p>

        <div className="mb-8 flex items-end gap-1">
          <span className="text-5xl font-heading font-extrabold text-foreground-900 tracking-tight">
            ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
          </span>
          <span className="text-foreground-400 text-sm font-medium mb-1.5">
            /month
          </span>
        </div>

        <ul className="space-y-4 mb-10 flex-grow">
          {plan.features.map((feature, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 + 0.3 }}
              viewport={{ once: true }}
              className="flex items-start gap-3"
            >
              <div
                className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 transition-colors duration-300 ${
                  isSelected
                    ? "bg-primary-500/15"
                    : "bg-foreground-100 group-hover:bg-primary-500/10"
                }`}
              >
                <Check
                  className={`w-3.5 h-3.5 transition-colors duration-300 ${
                    isSelected
                      ? "text-primary-600"
                      : "text-foreground-400 group-hover:text-primary-500"
                  }`}
                  strokeWidth={3}
                />
              </div>
              <span
                className={`text-[14.5px] transition-colors duration-300 ${
                  isSelected
                    ? "text-foreground-800 font-medium"
                    : "text-foreground-500"
                }`}
              >
                {feature}
              </span>
            </motion.li>
          ))}
        </ul>

        <button
          className={`w-full py-4 rounded-2xl text-[15px] font-bold transition-all duration-300 ${
            isSelected
              ? "bg-primary-500 text-white shadow-glow hover:bg-primary-600 hover:-translate-y-0.5"
              : "bg-background-100 text-foreground-800 hover:bg-background-200"
          }`}
        >
          {isSelected ? "Get Started Now" : "Choose Plan"}
        </button>
      </div>
    </motion.div>
  );
};

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("Professional");

  return (
    <section
      className="py-32 bg-background-50 relative overflow-hidden"
      id="pricing"
    >
      {/* ── Ambient Background Lines/Mesh ── */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-background-200 to-transparent opacity-50" />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(var(--color-foreground-900) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Decorative background blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-[1536px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary-500/20 bg-primary-50 mb-6">
            <span className="text-primary-600 font-bold tracking-widest text-[16px] uppercase">
              Simple Pricing
            </span>
          </div>

          <h2 className="font-heading text-4xl sm:text-5xl md:text-[62px] font-extrabold text-foreground-900 mb-6 leading-tight tracking-tight">
            Plans that fit{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-700 pr-2">
              your gym size
            </span>
          </h2>

          <p className="text-foreground-500 text-[18px] max-w-2xl mx-auto leading-relaxed mb-12">
            No hidden fees, no long-term contracts. Upgrade or downgrade anytime
            as your gym grows.
          </p>

          {/* Premium Toggle Switch */}
          <div className="flex items-center justify-center">
            <div className="bg-white border border-background-200 p-1.5 rounded-full flex items-center relative shadow-sm">
              <button
                onClick={() => setIsAnnual(false)}
                className={`relative px-8 py-3 text-[15px] font-bold transition-colors duration-300 rounded-full z-10 ${
                  !isAnnual
                    ? "text-white"
                    : "text-foreground-500 hover:text-foreground-900"
                }`}
              >
                <span className="relative z-10">Monthly</span>
                {!isAnnual && (
                  <motion.div
                    layoutId="pricing-active-bg"
                    className="absolute inset-0 bg-primary-500 rounded-full shadow-md"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>

              <button
                onClick={() => setIsAnnual(true)}
                className={`relative px-8 py-3 text-[15px] font-bold transition-colors duration-300 rounded-full flex items-center gap-2 z-10 ${
                  isAnnual
                    ? "text-white"
                    : "text-foreground-500 hover:text-foreground-900"
                }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Annual
                  <span
                    className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full transition-colors duration-300 ${
                      isAnnual
                        ? "bg-white/20 text-white"
                        : "bg-primary-50 text-primary-600"
                    }`}
                  >
                    Save 20%
                  </span>
                </span>
                {isAnnual && (
                  <motion.div
                    layoutId="pricing-active-bg"
                    className="absolute inset-0 bg-primary-500 rounded-full shadow-md"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid lg:grid-cols-3 gap-8 lg:gap-6 items-center"
        >
          {plans.map((plan) => (
            <PricingCard
              key={plan.name}
              plan={plan}
              isAnnual={isAnnual}
              isSelected={selectedPlan === plan.name}
              onSelect={() => setSelectedPlan(plan.name)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
