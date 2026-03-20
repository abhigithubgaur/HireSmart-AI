import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, UserPlus, Loader2, User, Briefcase, ChevronRight } from "lucide-react";
import api from "../../services/api";

function Signup() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "ROLE_CANDIDATE"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const register = async () => {
    if (!form.email || !form.password) return;
    
    setIsLoading(true);
    try {
      await api.post("/auth/register", form);
      // Using a modern flow: redirect with a success state or small toast later
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Registration failed. Email might already be in use.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 relative overflow-hidden px-4">
      {/* Background Decorative Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-blue-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-125 h-125 bg-indigo-600/10 blur-[120px] rounded-full" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg z-10"
      >
        <div className="bg-slate-900/50 border border-white/10 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-3 bg-blue-500/20 rounded-2xl mb-4 text-blue-400">
              <UserPlus size={32} />
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">Create Account</h2>
            <p className="text-slate-400 mt-2">Join HireSmart and start your AI-powered journey</p>
          </div>

          <div className="space-y-6">
            {/* Role Selection (Identity Tiles) */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setForm({ ...form, role: "ROLE_CANDIDATE" })}
                className={`flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all ${
                  form.role === "ROLE_CANDIDATE" 
                  ? "bg-blue-500/20 border-blue-500 text-blue-400" 
                  : "bg-slate-950/40 border-white/5 text-slate-500 hover:border-white/20"
                }`}
              >
                <User size={24} />
                <span className="text-xs font-bold uppercase tracking-widest">Candidate</span>
              </button>

              <button
                type="button"
                onClick={() => setForm({ ...form, role: "ROLE_RECRUITER" })}
                className={`flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all ${
                  form.role === "ROLE_RECRUITER" 
                  ? "bg-indigo-500/20 border-indigo-500 text-indigo-400" 
                  : "bg-slate-950/40 border-white/5 text-slate-500 hover:border-white/20"
                }`}
              >
                <Briefcase size={24} />
                <span className="text-xs font-bold uppercase tracking-widest">Recruiter</span>
              </button>
            </div>

            {/* Email Field */}
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={18} />
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                className="w-full bg-slate-950/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-slate-600 outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all"
                onChange={handleChange}
              />
            </div>

            {/* Password Field */}
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={18} />
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="w-full bg-slate-950/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-slate-600 outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all"
                onChange={handleChange}
              />
            </div>

            <button
              onClick={register}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98]"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  Get Started
                  <ChevronRight size={20} />
                </>
              )}
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-slate-400 text-sm">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-blue-400 font-bold hover:text-blue-300 transition-colors"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Signup;