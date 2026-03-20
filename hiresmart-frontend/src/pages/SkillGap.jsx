import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Dna, 
  Target, 
  FileText, 
  Sparkles, 
  Loader2, 
  AlertCircle,
  ArrowRightLeft
} from "lucide-react";
import api from "../services/api";

function SkillGap() {
  const [resume, setResume] = useState("");
  const [job, setJob] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const analyze = async () => {
    if (!resume || !job) return;
    setIsLoading(true);
    try {
      const response = await api.post("/ai/skill-gap", null, {
        params: { resume, job }
      });
      setResult(response.data);
    } catch (error) {
      console.error(error);
      alert("AI analysis failed. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6 lg:p-10 text-slate-200">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <header className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
              <Dna className="text-purple-500" />
              Skill Gap <span className="text-purple-500">Analyzer</span>
            </h1>
            <p className="text-slate-400 mt-2">Bridge the distance between your experience and the role requirements.</p>
          </div>
          <div className="hidden md:block bg-purple-500/10 border border-purple-500/20 px-4 py-2 rounded-full">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-widest flex items-center gap-2">
              <Sparkles size={14} /> AI Engine Active
            </span>
          </div>
        </header>

        {/* Comparison Inputs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
          {/* Decorative Divider Icon (Desktop Only) */}
          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 h-12 w-12 items-center justify-center rounded-full bg-slate-900 border border-white/10 text-purple-400 shadow-2xl">
            <ArrowRightLeft size={20} />
          </div>

          {/* Left Pane: Resume */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="group space-y-3"
          >
            <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
              <FileText size={14} /> Your Experience (Resume)
            </label>
            <textarea
              placeholder="Paste your professional summary or full resume text here..."
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              className="w-full h-64 bg-slate-900/40 border border-white/5 rounded-3xl p-6 text-slate-200 placeholder-slate-700 outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all resize-none backdrop-blur-sm"
            />
          </motion.div>

          {/* Right Pane: Job Description */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="group space-y-3"
          >
            <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
              <Target size={14} /> Target Job Description
            </label>
            <textarea
              placeholder="Paste the job description you are targeting..."
              value={job}
              onChange={(e) => setJob(e.target.value)}
              className="w-full h-64 bg-slate-900/40 border border-white/5 rounded-3xl p-6 text-slate-200 placeholder-slate-700 outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all resize-none backdrop-blur-sm"
            />
          </motion.div>
        </div>

        {/* Action Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={analyze}
            disabled={isLoading || !resume || !job}
            className={`flex items-center gap-3 px-10 py-4 rounded-2xl font-bold text-lg transition-all ${
              isLoading || !resume || !job
                ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-500 text-white shadow-xl shadow-purple-500/20 active:scale-95"
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" /> Calculating Gap...
              </>
            ) : (
              <>
                <Sparkles size={20} /> Run AI Analysis
              </>
            )}
          </button>
        </div>

        {/* Results Area */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-12 overflow-hidden bg-slate-900/50 border border-purple-500/30 rounded-[2.5rem] p-8 shadow-2xl relative"
            >
              {/* Decorative Glow */}
              <div className="absolute top-0 right-0 h-32 w-32 bg-purple-500/10 blur-3xl" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <Sparkles className="text-purple-400" size={20} />
                  </div>
                  <h2 className="text-2xl font-bold text-white">AI Compatibility Report</h2>
                </div>
                
                <div className="prose prose-invert max-w-none">
                  <p className="text-slate-300 leading-relaxed whitespace-pre-line bg-slate-950/50 p-6 rounded-2xl border border-white/5">
                    {result}
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest">
                    Matching Skills Identified
                  </div>
                  <div className="px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest">
                    Learning Recommendations
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default SkillGap;