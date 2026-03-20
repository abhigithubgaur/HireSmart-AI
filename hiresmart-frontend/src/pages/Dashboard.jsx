import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Briefcase, 
  TrendingUp, 
  Zap, 
  ArrowUpRight,
  Clock,
  SquarePlus
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import api from "../services/api";

function Dashboard() {
  const [stats, setStats] = useState({ totalResumes: 0, totalJobs: 0 });
  const [loading, setLoading] = useState(true);

  // Mock data for the chart - you can later fetch this from your backend
  const chartData = [
    { name: "Mon", apps: 12 },
    { name: "Tue", apps: 18 },
    { name: "Wed", apps: 15 },
    { name: "Thu", apps: 25 },
    { name: "Fri", apps: 32 },
    { name: "Sat", apps: 20 },
    { name: "Sun", apps: 28 },
  ];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/dashboard/stats");
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch stats");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { 
      label: "Total Resumes", 
      value: stats.totalResumes, 
      icon: Users, 
      color: "text-blue-400", 
      bg: "bg-blue-500/10",
      trend: "+12.5%" 
    },
    { 
      label: "Active Jobs", 
      value: stats.totalJobs, 
      icon: Briefcase, 
      color: "text-emerald-400", 
      bg: "bg-emerald-500/10",
      trend: "+4 new today" 
    },
    { 
      label: "AI Matches", 
      value: "84", 
      icon: Zap, 
      color: "text-amber-400", 
      bg: "bg-amber-500/10",
      trend: "High Accuracy" 
    },
    { 
      label: "Avg. Hiring Time", 
      value: "14d", 
      icon: Clock, 
      color: "text-purple-400", 
      bg: "bg-purple-500/10",
      trend: "-2 days" 
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 p-6 lg:p-10 text-slate-200">
      {/* Header Section */}
      <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white">
            Recruiter <span className="text-indigo-500">Dashboard</span>
          </h1>
          <p className="text-slate-400 mt-2">Welcome back! Here's what's happening with your recruitment funnel.</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-indigo-500/20 w-fit">
          <SquarePlus size={18} />
          Post New Job
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-slate-900/50 border border-white/5 p-6 rounded-2xl backdrop-blur-sm hover:border-white/10 transition-colors"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${card.bg}`}>
                <card.icon className={card.color} size={24} />
              </div>
              <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                {card.trend} <TrendingUp size={12} className="text-emerald-500" />
              </span>
            </div>
            <h3 className="text-slate-400 text-sm font-medium">{card.label}</h3>
            <p className="text-3xl font-bold text-white mt-1">{loading ? "..." : card.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Chart & Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 bg-slate-900/50 border border-white/5 p-6 rounded-3xl"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-white">Application Trends</h2>
            <select className="bg-slate-800 border-none rounded-lg text-sm px-3 py-1 text-slate-300 outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-75 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="apps" stroke="#6366f1" fillOpacity={1} fill="url(#colorApps)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Recent Activity Mini-List */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-slate-900/50 border border-white/5 p-6 rounded-3xl"
        >
          <h2 className="text-xl font-bold text-white mb-6">Top Candidates</h2>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((_, i) => (
              <div key={i} className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-linear-to-tr from-indigo-500 to-purple-500" />
                  <div>
                    <p className="text-sm font-semibold text-white group-hover:text-indigo-400 transition-colors">Candidate Name</p>
                    <p className="text-xs text-slate-500">React Developer • 98% Match</p>
                  </div>
                </div>
                <ArrowUpRight size={16} className="text-slate-600 group-hover:text-white transition-colors" />
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 rounded-xl border border-white/5 hover:bg-white/5 transition-colors text-sm font-medium">
            View All Candidates
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;