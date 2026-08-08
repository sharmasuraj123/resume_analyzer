import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ATSResult from "./pages/ATSResult";
import JDMatch from "./pages/JDMatch";
import PublicFeedback from "./pages/PublicFeedback";
import ViewFeedback from "./pages/ViewFeedback";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ats/:resumeId"
        element={
          <ProtectedRoute>
            <ATSResult />
          </ProtectedRoute>
        }
      />

      <Route
        path="/jd/:resumeId"
        element={
          <ProtectedRoute>
            <JDMatch />
          </ProtectedRoute>
        }
      />

      <Route path="/feedback/:token" element={<PublicFeedback />} />

      <Route
        path="/resume/:resumeId/feedback"
        element={
          <ProtectedRoute>
            <ViewFeedback />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
