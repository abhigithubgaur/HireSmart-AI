import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, Loader2, Filter, Users } from "lucide-react";
import api from "../services/api";
import CandidateCard from "../components/CandidateCard";

function CandidateSearch() {
  const [jobDescription, setJobDescription] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!jobDescription.trim()) return;
    
    setIsSearching(true);
    try {
      // Assuming the backend expects an object { description: jobDescription }
      const response = await api.post("/search", { description: jobDescription });
      setCandidates(response.data);
    } catch (error) {
      console.error(error);
      // You could replace this alert with a modern toast notification later
      alert("Search failed. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6 lg:p-10 text-slate-200">
      {/* Header Section */}
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Sparkles className="text-indigo-500" />
              AI Candidate <span className="text-indigo-500">Search</span>
            </h1>
            <p className="text-slate-400 mt-1">Paste a job description to find the best talent matches instantly.</p>
          </div>
          <div className="hidden md:flex items-center gap-2 bg-slate-900 border border-white/5 rounded-lg px-3 py-1.5 text-xs text-slate-400">
            <Users size={14} />
            <span>{candidates.length} Matches Found</span>
          </div>
        </div>

        {/* Search Input Area */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-2xl border border-white/10 bg-slate-900/50 p-1 backdrop-blur-sm shadow-2xl"
        >
          <textarea
            placeholder="e.g. We are looking for a Senior React Developer with experience in Tailwind CSS and Spring Boot..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full h-40 bg-transparent p-5 text-slate-200 placeholder-slate-600 outline-none resize-none scrollbar-hide text-lg"
          />
          
          <div className="flex items-center justify-between border-t border-white/5 p-3 bg-slate-900/80 rounded-b-2xl">
            <div className="flex gap-2">
              <button className="p-2 text-slate-500 hover:text-indigo-400 transition-colors">
                <Filter size={18} />
              </button>
            </div>
            
            <button
              onClick={handleSearch}
              disabled={isSearching || !jobDescription}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all ${
                isSearching || !jobDescription 
                  ? "bg-slate-800 text-slate-500 cursor-not-allowed" 
                  : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 active:scale-95"
              }`}
            >
              {isSearching ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search size={18} />
                  Find Best Matches
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Results Grid */}
        <div className="mt-12">
          {candidates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {candidates.map((c, index) => (
                  <motion.div
                    key={c.id || index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <CandidateCard candidate={c} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            !isSearching && (
              <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
                <div className="bg-slate-900 p-4 rounded-full mb-4">
                  <Search className="text-slate-700" size={32} />
                </div>
                <h3 className="text-lg font-medium text-slate-400">No candidates analyzed yet</h3>
                <p className="text-slate-600 max-w-xs mt-1">
                  Describe the role above to let HireSmart's AI scan your database.
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default CandidateSearch;