import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signing up with", name, email, password);
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-950 relative overflow-hidden px-4 py-12">
      {/* ── Ambient Background Glows ── */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-accent-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]" 
        style={{ backgroundImage: "linear-gradient(to right, var(--color-foreground-900) 1px, transparent 1px), linear-gradient(to bottom, var(--color-foreground-900) 1px, transparent 1px)", backgroundSize: "40px 40px" }} 
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="max-w-md w-full relative z-10"
      >
        <motion.div variants={fadeUp} className="text-center mb-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 group mb-6"
          >
            <span className="text-2xl font-heading font-extrabold tracking-tight text-white transition-colors duration-300">
              Zemmer
            </span>
            <div className="w-2 h-2 rounded-full bg-accent-500 group-hover:scale-150 transition-transform duration-300 shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
          </Link>
          <h2 className="text-4xl font-heading font-extrabold text-white tracking-tight">
            Create your account
          </h2>
          <p className="mt-3 text-[15px] text-foreground-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-primary-400 hover:text-primary-300 transition-colors"
            >
              Sign in instead
            </Link>
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="bg-background-900/50 backdrop-blur-xl border border-white/10 p-8 sm:p-10 rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]"
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground-300 mb-2"
                >
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="appearance-none block w-full px-4 py-3.5 bg-background-950/50 border border-white/10 text-white rounded-xl focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 placeholder-foreground-500 transition-colors text-[15px]"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="email-address"
                  className="block text-sm font-medium text-foreground-300 mb-2"
                >
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-4 py-3.5 bg-background-950/50 border border-white/10 text-white rounded-xl focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 placeholder-foreground-500 transition-colors text-[15px]"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-foreground-300 mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none block w-full px-4 py-3.5 bg-background-950/50 border border-white/10 text-white rounded-xl focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 placeholder-foreground-500 transition-colors text-[15px]"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-8 group relative w-full flex justify-center py-4 px-4 text-[15px] font-bold rounded-xl text-background-950 bg-white hover:bg-foreground-100 focus:outline-none shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300"
            >
              Create Account
              <span className="absolute right-0 inset-y-0 flex items-center pr-4">
                <ArrowRight className="h-5 w-5 text-background-600 group-hover:text-background-900 group-hover:translate-x-1 transition-all duration-300" />
              </span>
            </button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Signup;
