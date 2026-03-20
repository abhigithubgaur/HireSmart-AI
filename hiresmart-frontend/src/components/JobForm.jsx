import { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, AlignLeft, Send, Sparkles, CheckCircle2 } from "lucide-react";
import api from "../services/api";

function JobForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const jobData = { title, description };
      await api.post("/jobs", jobData);
      
      setIsSuccess(true);
      setTitle("");
      setDescription("");
      
      // Reset success state after 3 seconds
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error(error);
      alert("Failed to post job. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-slate-950 p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl"
      >
        <form
          onSubmit={handleSubmit}
          className="relative overflow-hidden bg-slate-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl"
        >
          {/* Subtle Background Glow */}
          <div className="absolute -top-24 -right-24 h-48 w-48 bg-emerald-500/10 blur-3xl rounded-full" />
          
          <div className="relative z-10">
            <header className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-emerald-500/20 rounded-lg">
                  <Briefcase className="text-emerald-400" size={20} />
                </div>
                <h2 className="text-2xl font-bold text-white">Create New Role</h2>
              </div>
              <p className="text-slate-400 text-sm">Fill in the details below to broadcast your job to the talent pool.</p>
            </header>

            <div className="space-y-6">
              {/* Job Title Input */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 ml-1">
                  Position Title
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-emerald-400 transition-colors">
                    <Sparkles size={18} />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senior Backend Engineer"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-slate-950/50 border border-white/5 rounded-2xl py-3 pl-11 pr-4 text-white placeholder-slate-600 outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 transition-all"
                  />
                </div>
              </div>

              {/* Description Textarea */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 ml-1">
                  Role Description
                </label>
                <div className="relative group">
                  <div className="absolute top-3 left-0 pl-4 pointer-events-none text-slate-500 group-focus-within:text-emerald-400 transition-colors">
                    <AlignLeft size={18} />
                  </div>
                  <textarea
                    required
                    placeholder="Outline the responsibilities, requirements, and benefits..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full h-48 bg-slate-950/50 border border-white/5 rounded-2xl py-3 pl-11 pr-4 text-white placeholder-slate-600 outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 transition-all resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || isSuccess}
                className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-lg transition-all ${
                  isSuccess 
                    ? "bg-emerald-500 text-white" 
                    : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 active:scale-[0.98]"
                } disabled:opacity-70 disabled:cursor-not-allowed`}
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  >
                    <Send size={20} />
                  </motion.div>
                ) : isSuccess ? (
                  <>
                    <CheckCircle2 size={20} />
                    Job Published!
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Post Vacancy
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default JobForm;