import { Link } from "react-router-dom";
import {
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaPlus,
  FaHome,
  FaUserCircle,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
  };

  return (
    <>
      {/* Main Navbar */}
      <div className="navbar bg-gradient-to-r from-blue-800 to-purple-400 text-white shadow-lg sticky top-0 z-50 px-4">
        <div className="navbar-start">
          <Link to="/" className="flex items-center gap-2">
            <FaHome className="text-2xl" />
            <span className="text-xl font-bold">Sporty</span>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <span className="font-medium text-white/90">
            Share your sports stories with the world
          </span>
        </div>

        <div className="navbar-end gap-3">
          {user && (
            <div className="flex items-center gap-2 px-2">
              <div className="avatar placeholder">
                <div className="bg-white text-blue-500 rounded-full p-3">
                 <FaUser/>
                </div>
              </div>
              <span className="font-medium hidden md:inline">
                {user.username}
              </span>
            </div>
          )}

          {user ? (
            <button
              onClick={handleLogout}
              className="btn btn-error  btn-sm md:btn-md gap-2"
            >
              <FaSignOutAlt />
              <span className="hidden sm:inline">Logout</span>
            </button>
          ) : (
            <div className="flex gap-2">
              <Link
                to="/login"
                className="btn btn-sm md:btn-md btn-ghost bg-blue-700 text-white hover:bg-blue-800 gap-2"
              >
                <FaSignInAlt />
                <span>Login</span>
              </Link>
              <Link
                to="/register"
                className="btn btn-sm md:btn-md btn-secondary text-white hover:bg-pink-700 gap-2"
              >
                <FaUser />
                <span>Register</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      {user && (
        <Link
          to="/add-post"
          className="fixed bottom-6 right-6 btn btn-primary  shadow-xl hover:scale-110 transition-transform z-50"
        >
          <FaPlus />
          <span className="hidden sm:inline">New Post</span>
        </Link>
      )}
    </>
  );
};

export default Navbar;
