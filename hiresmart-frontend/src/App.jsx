import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import UploadResume from "./pages/UploadResume";
import JobPost from "./pages/JobPost";
import CandidateSearch from "./pages/CandidateSearch";
import SkillGap from "./pages/SkillGap";
import Navbar from "./components/Navbar";
import ResumeParser from "./pages/ResumeParser";
import MockInterview from "./pages/MockInterview";
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Signup"
import ProtectedRoute from "./components/ProtectedRoute"
import CandidateDashboard from "./pages/CandidateDashboard";

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/candidate"
          element={
            <ProtectedRoute>
              <CandidateDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload-resume"
          element={
            <ProtectedRoute>
              <UploadResume />
            </ProtectedRoute>
          }
        />
        <Route
          path="/post-job"
          element={
            <ProtectedRoute>
              <JobPost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <CandidateSearch />
            </ProtectedRoute>
          }
        />
        <Route
          path="/skill-gap"
          element={
            <ProtectedRoute>
              <SkillGap />
            </ProtectedRoute>
          }
        />
        <Route
          path="/parser"
          element={
            <ProtectedRoute>
              <ResumeParser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/interview"
          element={
            <ProtectedRoute>
              <MockInterview />
            </ProtectedRoute>
          }
        />

        {/* Catch-all: Redirect unknown routes to login or dashboard */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;