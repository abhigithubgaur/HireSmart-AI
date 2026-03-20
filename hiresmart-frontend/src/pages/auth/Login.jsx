import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Mail, Lock, LogIn, Loader2, ShieldCheck } from "lucide-react";
import api from "../../services/api";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const login = async () => {
    if (!email || !password) return;
    
    setIsLoading(true);
    try {
      const res = await api.post("/auth/login", null, {
        params: { email, password }
      });

      const token = res.data;
      localStorage.setItem("token", token);
      const decoded = jwtDecode(token);

      // Navigate based on role
      if (decoded.role === "ROLE_RECRUITER") {
        navigate("/dashboard");
      } else {
        navigate("/candidate");
      }
    } catch (err) {
      console.error(err);
      alert("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 relative overflow-hidden px-4">
      {/* Background Decorative Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-125 h-125 bg-indigo-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] left-[-10%] w-125 h-125 bg-emerald-600/10 blur-[120px] rounded-full" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10"
      >
        <div className="bg-slate-900/50 border border-white/10 backdrop-blur-xl rounded-[2.5rem] p-10 shadow-2xl">
          
          {/* Logo / Title */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center p-3 bg-indigo-500/20 rounded-2xl mb-4">
              <ShieldCheck className="text-indigo-400" size={32} />
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">Welcome Back</h2>
            <p className="text-slate-400 mt-2">Enter your credentials to access your account</p>
          </div>

          <div className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="w-full bg-slate-950/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-slate-600 outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-slate-950/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-slate-600 outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Login Button */}
            <button
              onClick={login}
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-500/20 active:scale-[0.98] mt-4"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <LogIn size={20} />
                  Sign In
                </>
              )}
            </button>
          </div>

          {/* Footer Link */}
          <div className="mt-8 text-center">
            <p className="text-slate-400 text-sm">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors"
              >
                Create Account
              </button>
            </p>
          </div>
        </div>

        {/* Branding Subtext */}
        <p className="text-center text-slate-600 text-[10px] mt-8 uppercase tracking-[0.2em] font-bold">
          Powered by HireSmart AI Engine
        </p>
      </motion.div>
    </div>
  );
}

export default Login;