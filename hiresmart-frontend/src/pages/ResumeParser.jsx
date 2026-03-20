import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileSearch, 
  Cpu, 
  Terminal, 
  ClipboardCheck, 
  Loader2, 
  Sparkles,
  RefreshCw
} from "lucide-react";
import api from "../services/api";

function ResumeParser() {
  const [resume, setResume] = useState("");
  const [result, setResult] = useState("");
  const [isParsing, setIsParsing] = useState(false);

  const parseResume = async () => {
    if (!resume.trim()) return;
    
    setIsParsing(true);
    try {
      // Sending as object if backend expects JSON, or plain string based on your API
      const response = await api.post("/parser/resume", { text: resume });
      setResult(response.data);
    } catch (error) {
      console.error(error);
      alert("AI Parsing failed. Ensure the text format is valid.");
    } finally {
      setIsParsing(false);
    }
  };

  const clearAll = () => {
    setResume("");
    setResult("");
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6 lg:p-10 text-slate-200">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <FileSearch className="text-emerald-500" />
              AI Resume <span className="text-emerald-500">Parser</span>
            </h1>
            <p className="text-slate-400 mt-1">Convert raw resume text into structured professional insights.</p>
          </div>
          
          {resume && (
            <button 
              onClick={clearAll}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors"
            >
              <RefreshCw size={14} /> Reset Workspace
            </button>
          )}
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Input Area (Left) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-4"
          >
            <div className="bg-slate-900/50 border border-white/10 rounded-3xl p-6 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4 text-emerald-400">
                <Terminal size={18} />
                <span className="text-xs font-bold uppercase tracking-wider">Input Source</span>
              </div>
              
              <textarea
                placeholder="Paste the full text of your resume here..."
                value={resume}
                onChange={(e) => setResume(e.target.value)}
                className="w-full h-100 bg-slate-950/50 border border-white/5 rounded-2xl p-5 text-slate-300 placeholder-slate-700 outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 transition-all resize-none font-mono text-sm"
              />

              <button
                onClick={parseResume}
                disabled={isParsing || !resume}
                className={`w-full mt-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${
                  isParsing || !resume
                    ? "bg-slate-800 text-slate-600 cursor-not-allowed"
                    : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 active:scale-95"
                }`}
              >
                {isParsing ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Extracting Data...
                  </>
                ) : (
                  <>
                    <Cpu size={20} />
                    Run AI Parser
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* Output Area (Right) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="h-full bg-slate-900/50 border border-emerald-500/30 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4">
                    <Sparkles className="text-emerald-500/20" size={80} />
                  </div>

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-emerald-500/20 rounded-lg">
                        <ClipboardCheck className="text-emerald-400" size={20} />
                      </div>
                      <h2 className="text-xl font-bold text-white">Extracted Profile</h2>
                    </div>

                    <div className="grow bg-slate-950/80 border border-white/5 rounded-2xl p-6 font-mono text-sm text-emerald-300 overflow-auto scrollbar-thin scrollbar-thumb-emerald-900">
                      <pre className="whitespace-pre-wrap leading-relaxed">
                        {typeof result === 'object' ? JSON.stringify(result, null, 2) : result}
                      </pre>
                    </div>

                    <p className="mt-4 text-xs text-slate-500 italic">
                      AI accurately identified entities like Skills, Experience, and Education.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <div className="h-full border-2 border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center p-12 text-center opacity-40">
                  <div className="p-6 bg-slate-900 rounded-full mb-4">
                    <Cpu size={48} className="text-slate-700" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-400">Awaiting Input</h3>
                  <p className="text-slate-600 max-w-xs mt-1">
                    Once you paste your resume and run the parser, the structured AI data will appear here.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default ResumeParser;