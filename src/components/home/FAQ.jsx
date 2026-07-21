import { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Plus, X } from "lucide-react";

const faqs = [
  {
    question: "How long does it take to set up Zemmer for my gym?",
    answer:
      "Most gyms are fully set up within 30 minutes. You can import existing member data via CSV, configure your class schedule, set up payment processing, and start using the QR attendance system right away. Our onboarding team is also available for a guided setup call if you prefer.",
  },
  {
    question: "Can I use Zemmer for multiple gym locations?",
    answer:
      "Yes, our Enterprise plan fully supports multi-location management. You can switch between branches, consolidate reporting, and share members or staff across different facilities seamlessly from one master dashboard.",
  },
  {
    question: "Does the member mobile app have my gym's branding?",
    answer:
      "Absolutely. With our Professional and Enterprise plans, the member app can be white-labeled with your gym's logo, brand colors, and custom imagery so your members get a fully branded experience.",
  },
  {
    question: "How does the QR attendance system work?",
    answer:
      "Members get a unique, dynamic QR code in their mobile app. When they arrive, they scan it at your front desk tablet or scanner. The system instantly logs their attendance, verifies their active membership, and even opens access gates if integrated.",
  },
  {
    question: "What payment methods do you support?",
    answer:
      "We support all major credit and debit cards, Apple Pay, Google Pay, and direct bank transfers (ACH/SEPA). Payments are processed securely via our integration with Stripe.",
  },
  {
    question: "Is my data secure with Zemmer?",
    answer:
      "Yes. We use bank-level 256-bit AES encryption for all data storage and transit. We are fully GDPR compliant and run regular security audits to ensure your business and member data is protected at all times.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes, there are no long-term contracts unless you explicitly choose an annual commitment. You can upgrade, downgrade, or cancel your monthly subscription at any time directly from your dashboard.",
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
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const FAQItem = ({ faq, isOpen, onClick }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    // Only apply magnetic effect if NOT open
    if (isOpen) {
      setPosition({ x: 0, y: 0 });
      return;
    }
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.05, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div variants={fadeUp} className="w-full">
      <motion.div
        ref={ref}
        initial={false}
        onMouseMove={handleMouse}
        onMouseLeave={reset}
        animate={{
          x: position.x,
          y: position.y,
          backgroundColor: isOpen
            ? "rgba(245, 158, 11, 0.03)"
            : "rgba(255, 255, 255, 0.02)",
          borderColor: isOpen
            ? "rgba(245, 158, 11, 0.2)"
            : "rgba(255, 255, 255, 0.05)",
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        className="rounded-2xl overflow-hidden border backdrop-blur-sm transition-shadow duration-500 hover:bg-white/5"
      >
        <button
          onClick={onClick}
          className="w-full px-6 md:px-8 py-6 flex items-center justify-between text-left focus:outline-none group"
        >
          <span
            className={`font-heading font-bold text-[16px] md:text-[18px] pr-8 transition-colors duration-300 ${isOpen ? "text-accent-400" : "text-white group-hover:text-accent-300"}`}
          >
            {faq.question}
          </span>
          <div
            className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
              isOpen
                ? "bg-accent-500 text-white shadow-[0_0_15px_rgba(245,158,11,0.5)] rotate-180"
                : "bg-white/10 text-white group-hover:bg-accent-500/20 group-hover:text-accent-400"
            }`}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          </div>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="px-6 md:px-8 pb-8 pt-2 text-foreground-300 text-[15px] leading-relaxed max-w-4xl">
                {faq.answer}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(-1); // All closed by default

  return (
    <section
      className="py-32 bg-background-950 relative overflow-hidden"
      id="faq"
    >
      {/* ── Ambient Glows ── */}
      <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-accent-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[800px] h-[800px] bg-primary-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="w-full max-w-[1536px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent-500/20 bg-accent-500/10 mb-6">
            <span className="text-accent-400 font-bold tracking-widest text-[11px] uppercase">
              Got Questions?
            </span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-[56px] font-extrabold text-white leading-tight tracking-tight">
            Frequently Asked{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-accent-600 italic">
              Questions
            </span>
          </h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col gap-4"
        >
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
