import { motion } from "framer-motion";
import { ChevronLeft, Rocket } from "lucide-react";
import { useNavigate } from "react-router-dom";
import JobForm from "../components/JobForm";

function JobPost() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/10 blur-[120px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">
        
        {/* Navigation / Header Area */}
        <div className="mb-8 flex items-center justify-between">
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
          >
            <div className="p-2 rounded-full bg-slate-900 border border-white/5 group-hover:border-white/20">
              <ChevronLeft size={16} />
            </div>
            <span className="text-sm font-medium">Back to Dashboard</span>
          </motion.button>

          <div className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20">
            <Rocket size={16} className="text-indigo-400" />
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-widest">
              Recruitment Mode Active
            </span>
          </div>
        </div>

        {/* Form Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="flex justify-center"
        >
          <JobForm />
        </motion.div>

        {/* Help Footer */}
        <div className="mt-12 text-center">
          <p className="text-slate-500 text-sm">
            Need help? Check our <span className="text-indigo-400 cursor-pointer hover:underline">Recruiter Guide</span> for tips on writing effective job descriptions.
          </p>
        </div>
      </div>
    </div>
  );
}

export default JobPost;