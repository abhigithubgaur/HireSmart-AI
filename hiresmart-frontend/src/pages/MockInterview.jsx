import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Video, 
  MessageSquare, 
  Bot, 
  Send, 
  Sparkles, 
  Loader2, 
  Trophy,
  User,
  ChevronRight
} from "lucide-react";
import api from "../services/api";

function MockInterview() {
  const [role, setRole] = useState("");
  const [questions, setQuestions] = useState("");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState({ questions: false, feedback: false });

  const generateQuestions = async () => {
    if (!role) return;
    setLoading({ ...loading, questions: true });
    try {
      const response = await api.post("/interview/questions", null, {
        params: { role }
      });
      setQuestions(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to generate questions");
    } finally {
      setLoading({ ...loading, questions: false });
    }
  };

  const evaluateAnswer = async () => {
    if (!answer) return;
    setLoading({ ...loading, feedback: true });
    try {
      const response = await api.post("/interview/evaluate", null, {
        params: { question: questions, answer: answer }
      });
      setFeedback(response.data);
    } catch (error) {
      console.error(error);
      alert("Evaluation failed");
    } finally {
      setLoading({ ...loading, feedback: false });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6 lg:p-10 text-slate-200">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <header className="mb-10 text-center">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <div className="inline-flex p-3 rounded-2xl bg-indigo-500/10 mb-4">
              <Video className="text-indigo-400" size={32} />
            </div>
            <h1 className="text-4xl font-extrabold text-white tracking-tight">
              AI Mock <span className="text-indigo-500">Interview</span>
            </h1>
            <p className="text-slate-400 mt-2">Practice your delivery with our real-time AI recruitment officer.</p>
          </motion.div>
        </header>

        {/* Step 1: Role Setup */}
        {!questions && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-sm text-center"
          >
            <h2 className="text-xl font-bold text-white mb-6">What role are you preparing for?</h2>
            <div className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="text"
                placeholder="e.g. Senior Java Developer"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="grow bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-indigo-500 transition-all"
              />
              <button
                onClick={generateQuestions}
                disabled={loading.questions || !role}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {loading.questions ? <Loader2 className="animate-spin" /> : <Sparkles size={18} />}
                Start
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 2: The Interview Chat */}
        <AnimatePresence>
          {questions && (
            <div className="space-y-6">
              {/* Question from AI */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-start gap-4"
              >
                <div className="p-3 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-500/20">
                  <Bot size={24} />
                </div>
                <div className="bg-slate-900 border border-white/10 rounded-3xl rounded-tl-none p-6 max-w-2xl">
                  <p className="text-slate-200 leading-relaxed font-medium italic">"{questions}"</p>
                </div>
              </motion.div>

              {/* User Input Area */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col items-end gap-4"
              >
                <div className="w-full flex items-start justify-end gap-4">
                  <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-3xl rounded-tr-none p-6 w-full max-w-2xl">
                    <textarea
                      placeholder="Type your detailed answer here..."
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      className="w-full h-40 bg-transparent text-white outline-none resize-none placeholder-slate-600"
                    />
                  </div>
                  <div className="p-3 bg-slate-800 rounded-2xl text-slate-400">
                    <User size={24} />
                  </div>
                </div>

                {!feedback && (
                  <button
                    onClick={evaluateAnswer}
                    disabled={loading.feedback || !answer}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/20"
                  >
                    {loading.feedback ? <Loader2 className="animate-spin" /> : <Send size={18} />}
                    Submit Answer
                  </button>
                )}
              </motion.div>

              {/* Feedback Section */}
              {feedback && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-linear-to-br from-slate-900 to-indigo-950/30 border border-indigo-500/20 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-6 opacity-10">
                    <Trophy size={80} />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <Sparkles className="text-amber-400" />
                      <h2 className="text-xl font-bold text-white">AI Feedback Report</h2>
                    </div>
                    <p className="text-slate-300 leading-relaxed whitespace-pre-line bg-slate-950/40 p-6 rounded-2xl border border-white/5">
                      {feedback}
                    </p>
                    <button 
                      onClick={() => { setQuestions(""); setAnswer(""); setFeedback(""); setRole(""); }}
                      className="mt-6 text-sm text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-2"
                    >
                      Try another role <ChevronRight size={16} />
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default MockInterview;