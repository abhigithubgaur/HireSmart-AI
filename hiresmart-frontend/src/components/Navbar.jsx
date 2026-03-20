import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  Search,  
  FileText, 
  Video, 
  LogOut, 
  Menu, 
  X,
  Briefcase,
  SquarePlus
} from "lucide-react";
import { isRecruiter, isCandidate } from "../utils/auth";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  if (["/login", "/signup"].includes(location.pathname)) return null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navLinks = [
    // Recruiter Links
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard, show: isRecruiter() },
    { name: "Candidate Search", path: "/search", icon: Search, show: isRecruiter() },
    { name: "Post Job", path: "/post-job", icon: SquarePlus, show: isRecruiter() },
    // Candidate Links
    { name: "My Portal", path: "/candidate", icon: LayoutDashboard, show: isCandidate() },
    { name: "Resume Parser", path: "/parser", icon: FileText, show: isCandidate() },
    { name: "Mock Interview", path: "/interview", icon: Video, show: isCandidate() },
  ];

  const activeLink = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/60 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 shadow-lg shadow-indigo-500/30">
              <Briefcase className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Hire<span className="text-indigo-400">Smart</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center gap-6">
              {navLinks.filter(link => link.show).map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative flex items-center gap-2 text-sm font-medium transition-colors hover:text-white ${
                    activeLink(link.path) ? "text-white" : "text-slate-400"
                  }`}
                >
                  <link.icon className="h-4 w-4" />
                  {link.name}
                  {activeLink(link.path) && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-5.5 left-0 h-0.5 w-full bg-indigo-500"
                    />
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-slate-300 transition-all hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-white/10 bg-slate-900 md:hidden"
          >
            <div className="space-y-1 px-4 pb-4 pt-2">
              {navLinks.filter(link => link.show).map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-base font-medium text-slate-400 hover:bg-white/5 hover:text-white"
                >
                  <link.icon className="h-5 w-5" />
                  {link.name}
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-base font-medium text-red-400 hover:bg-red-500/10"
              >
                <LogOut className="h-5 w-5" />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;