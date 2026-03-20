import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  UploadCloud, 
  BarChart3, 
  Video, 
  ChevronRight, 
  CheckCircle2, 
  Clock, 
  Star 
} from "lucide-react";

function CandidateDashboard() {
  const actions = [
    {
      title: "Upload Resume",
      desc: "Get instant AI feedback and score your CV.",
      to: "/upload-resume",
      icon: UploadCloud,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "hover:border-blue-500/50",
    },
    {
      title: "Skill Gap Analysis",
      desc: "Compare your profile with top market roles.",
      to: "/skill-gap",
      icon: BarChart3,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "hover:border-purple-500/50",
    },
    {
      title: "Mock Interview",
      desc: "Practice with AI-generated technical questions.",
      to: "/interview",
      icon: Video,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "hover:border-emerald-500/50",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 p-6 lg:p-10 text-slate-200">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl font-extrabold text-white tracking-tight">
              Welcome Back, <span className="text-indigo-500">Candidate</span>
            </h1>
            <p className="text-slate-400 mt-2">Your journey to the perfect role starts here. Track your progress below.</p>
          </motion.div>
        </header>

        {/* Quick Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: "Profile Strength", value: "85%", icon: Star, color: "text-amber-400" },
            { label: "Active Applications", value: "12", icon: Clock, color: "text-blue-400" },
            { label: "Skills Verified", value: "08", icon: CheckCircle2, color: "text-emerald-400" },
          ].map((item, i) => (
            <div key={i} className="bg-slate-900/40 border border-white/5 p-5 rounded-2xl flex items-center gap-4">
              <div className={`p-3 rounded-xl bg-white/5`}>
                <item.icon className={item.color} size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{item.label}</p>
                <p className="text-2xl font-bold text-white">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Action Grid */}
        <h2 className="text-xl font-bold text-white mb-6 ml-1">Next Steps</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {actions.map((action, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={action.to} className="group block h-full">
                <div className={`h-full relative overflow-hidden bg-slate-900/40 border border-white/10 p-8 rounded-3xl transition-all duration-300 ${action.border} hover:bg-slate-900/60 shadow-xl`}>
                  
                  {/* Icon & Heading */}
                  <div className={`inline-flex p-4 rounded-2xl ${action.bg} mb-6 transition-transform group-hover:scale-110 duration-300`}>
                    <action.icon className={action.color} size={32} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                    {action.title}
                  </h3>
                  
                  <p className="text-slate-400 leading-relaxed mb-8">
                    {action.desc}
                  </p>

                  <div className="flex items-center text-sm font-bold text-indigo-400 group-hover:gap-2 transition-all">
                    Get Started <ChevronRight size={16} />
                  </div>

                  {/* Aesthetic Background Pattern */}
                  <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <action.icon size={120} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Footer Hint */}
        <div className="mt-16 p-8 rounded-3xl bg-linear-to-r from-indigo-600/20 to-transparent border border-indigo-500/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-lg font-bold text-white">Unlock Premium Insights</h4>
              <p className="text-slate-400 text-sm">Upload your resume to see how you rank against other applicants for similar roles.</p>
            </div>
            <Link to="/upload-resume" className="whitespace-nowrap bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20">
              Complete My Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CandidateDashboard;