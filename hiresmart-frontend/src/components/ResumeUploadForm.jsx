import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  UploadCloud, 
  FileText, 
  X, 
  CheckCircle2, 
  Loader2, 
  AlertCircle 
} from "lucide-react";
import api from "../services/api";

function ResumeUploadForm() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("idle"); // idle, uploading, success, error
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) setFile(selectedFile);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => setIsDragging(false);

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) setFile(droppedFile);
  };

  const handleUpload = async () => {
    if (!file) return;

    setStatus("uploading");
    const formData = new FormData();
    formData.append("file", file);

    try {
      await api.post("/resume/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setStatus("success");
      setTimeout(() => {
        setFile(null);
        setStatus("idle");
      }, 3000);
    } catch (error) {
      console.error(error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-120px)] p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg bg-slate-900/50 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-xl shadow-2xl"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Resume Analyzer</h2>
          <p className="text-slate-400">Upload your CV to let our AI extract your top skills.</p>
        </div>

        {/* Drag & Drop Area */}
        {!file ? (
          <div
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={() => fileInputRef.current.click()}
            className={`relative group cursor-pointer border-2 border-dashed rounded-3xl p-12 transition-all duration-300 flex flex-col items-center justify-center gap-4 ${
              isDragging 
                ? "border-indigo-500 bg-indigo-500/10 scale-[1.02]" 
                : "border-white/10 bg-slate-950/40 hover:border-white/20"
            }`}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
              accept=".pdf,.doc,.docx"
            />
            
            <div className="p-5 rounded-2xl bg-slate-900 border border-white/5 group-hover:scale-110 transition-transform duration-300">
              <UploadCloud className="text-indigo-400" size={40} />
            </div>
            
            <div className="text-center">
              <p className="text-lg font-semibold text-white">Click or drag to upload</p>
              <p className="text-sm text-slate-500 mt-1">PDF, DOCX up to 10MB</p>
            </div>
          </div>
        ) : (
          /* File Preview Card */
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-950/60 border border-indigo-500/30 rounded-3xl p-6 mb-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-500/20 rounded-xl text-indigo-400">
                  <FileText size={24} />
                </div>
                <div className="overflow-hidden">
                  <p className="text-white font-medium truncate max-w-50">{file.name}</p>
                  <p className="text-slate-500 text-xs">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <button 
                onClick={() => setFile(null)}
                className="p-2 text-slate-500 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Upload Button Logic */}
            <button
              onClick={handleUpload}
              disabled={status === "uploading"}
              className={`w-full mt-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${
                status === "success" 
                  ? "bg-emerald-500 text-white" 
                  : status === "error" 
                  ? "bg-red-500 text-white"
                  : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20"
              }`}
            >
              {status === "uploading" ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  AI Scanning...
                </>
              ) : status === "success" ? (
                <>
                  <CheckCircle2 size={20} />
                  Analysis Complete!
                </>
              ) : status === "error" ? (
                <>
                  <AlertCircle size={20} />
                  Try Again
                </>
              ) : (
                "Begin AI Analysis"
              )}
            </button>
          </motion.div>
        )}

        <div className="mt-8 flex items-center justify-center gap-6 opacity-40 grayscale">
          <img src="https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg" className="h-6" alt="PDF" />
          <div className="h-4 w-px bg-white/20" />
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Secure AI Processing</p>
        </div>
      </motion.div>
    </div>
  );
}

export default ResumeUploadForm;