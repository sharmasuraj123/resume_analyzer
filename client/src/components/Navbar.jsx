import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiFileText, FiLogOut, FiUser } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
      <Toaster position="top-right" />

      {/* Logo */}
      <Link
        to="/dashboard"
        className="flex items-center gap-2 text-blue-600 font-bold text-xl"
      >
        <FiFileText size={24} />
        <span>ResumeReviewer</span>
      </Link>

      {/* Right side */}
      {user && (
        <div className="flex items-center gap-4">
          {/* User name */}
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <FiUser size={16} />
            <span className="hidden sm:inline">{user.name}</span>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-600 font-medium transition"
          >
            <FiLogOut size={16} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
