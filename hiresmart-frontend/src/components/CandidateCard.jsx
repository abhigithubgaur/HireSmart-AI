import { motion } from "framer-motion";
import { User, FileText, CheckCircle2, ArrowUpRight, Brain } from "lucide-react";

function CandidateCard({ candidate }) {
  // Logic to determine score color based on match quality
  const getScoreColor = (score) => {
    if (score >= 80) return "text-emerald-400 border-emerald-500/30 bg-emerald-500/10";
    if (score >= 50) return "text-amber-400 border-amber-500/30 bg-amber-500/10";
    return "text-slate-400 border-slate-500/20 bg-slate-500/5";
  };

  const scoreValue = (candidate.score || 0) * 100; // Convert to percentage

  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="group relative overflow-hidden rounded-2xl border border-white/5 bg-slate-900/40 p-5 backdrop-blur-sm transition-all hover:bg-slate-900/60 hover:border-indigo-500/30 shadow-xl"
    >
      {/* AI Insight Badge (Optional/Aesthetic) */}
      <div className="absolute -right-8 -top-8 h-20 w-20 bg-indigo-500/10 blur-2xl group-hover:bg-indigo-500/20 transition-all" />

      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          {/* Candidate Avatar Placeholder */}
          <div className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-linear-to-br from-slate-800 to-slate-950 border border-white/10 shadow-inner">
            <User className="text-slate-400 group-hover:text-indigo-400 transition-colors" size={28} />
            {scoreValue > 90 && (
              <div className="absolute -right-1 -top-1 rounded-full bg-emerald-500 p-0.5 ring-2 ring-slate-950">
                <CheckCircle2 size={12} className="text-white" />
              </div>
            )}
          </div>

          <div>
            <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
              {candidate.name}
            </h3>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mt-0.5">
              <FileText size={12} />
              <span>Resume Parsed</span>
            </div>
          </div>
        </div>

        {/* Action Icon */}
        <button className="rounded-lg p-2 text-slate-500 hover:bg-white/5 hover:text-white transition-all">
          <ArrowUpRight size={20} />
        </button>
      </div>

      {/* Resume Preview Text */}
      <div className="mt-4">
        <p className="line-clamp-2 text-sm leading-relaxed text-slate-400">
          {candidate.resumePreview || "No preview available for this candidate."}
        </p>
      </div>

      {/* Footer: AI Score & Tags */}
      <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
        <div className="flex items-center gap-2">
          <Brain size={14} className="text-indigo-400" />
          <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500">
            AI Compatibility
          </span>
        </div>

        <div className={`flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold ${getScoreColor(scoreValue)}`}>
          <span>{scoreValue.toFixed(0)}% Match</span>
        </div>
      </div>
    </motion.div>
  );
}

export default CandidateCard;