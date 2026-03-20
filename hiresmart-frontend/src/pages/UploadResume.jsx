import { motion } from "framer-motion";
import { ShieldCheck, Zap, Lock, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ResumeUploadForm from "../components/ResumeUploadForm";

function UploadResume() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">
        
        {/* Navigation / Header */}
        <div className="mb-12 flex items-center justify-between">
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
          >
            <div className="p-2 rounded-full bg-slate-900 border border-white/5 group-hover:border-indigo-500/50 transition-all">
              <ChevronLeft size={16} />
            </div>
            <span className="text-sm font-medium">Back to Dashboard</span>
          </motion.button>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-widest">
              <Lock size={14} className="text-emerald-500" />
              End-to-End Encrypted
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mt-10">
          
          {/* Left Side: Marketing/Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md"
          >
            <h1 className="text-5xl font-extrabold text-white leading-tight mb-6">
              Let AI Build Your <span className="text-indigo-500">Professional</span> Profile.
            </h1>
            <p className="text-slate-400 text-lg mb-10">
              Our advanced neural engine scans your resume to match you with top-tier recruiters based on your actual skills, not just keywords.
            </p>

            <div className="space-y-6">
              {[
                { icon: Zap, text: "Instant skill extraction & scoring", color: "text-amber-400" },
                { icon: ShieldCheck, text: "Privacy-first data handling", color: "text-emerald-400" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="p-2 bg-white/5 rounded-lg">
                    <item.icon className={item.color} size={20} />
                  </div>
                  <span className="text-slate-300 font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Side: The Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <ResumeUploadForm />
          </motion.div>
        </div>

        {/* Floating Background Hint */}
        <div className="mt-20 border-t border-white/5 pt-8 flex flex-wrap justify-center gap-8 opacity-30 grayscale contrast-125">
           <span className="text-slate-400 font-bold tracking-tighter text-xl italic">HIRESMART AI</span>
           <span className="text-slate-400 font-bold tracking-tighter text-xl italic">VECTOR SCAN</span>
           <span className="text-slate-400 font-bold tracking-tighter text-xl italic">NLP ENGINE</span>
        </div>
      </div>
    </div>
  );
}

export default UploadResume;