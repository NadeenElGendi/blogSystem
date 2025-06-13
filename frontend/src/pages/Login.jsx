import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaSignInAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(formData);
      toast.success("Welcome back to Sporty!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Login failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-800 mb-2">Login now!</h1>
          <p className="text-lg text-blue-600">
            Welcome back to <span className="font-bold">Sporty</span>
          </p>
        </div>

        <div className="card bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="card-body p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-blue-800 font-medium">
                    Username
                  </span>
                </label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  className="input input-bordered w-full focus:ring-2 focus:ring-blue-800"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-blue-800 font-medium">
                    Password
                  </span>
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="input input-bordered w-full focus:ring-2 focus:ring-blue-800"
                  required
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="btn btn-primary w-full bg-blue-800 hover:bg-blue-900 text-white"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <span className="loading loading-spinner mr-2"></span>
                      Logging in...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <FaSignInAlt className="mr-2" />
                      Login
                    </span>
                  )}
                </button>
              </div>
            </form>

            <div className="divider text-sm text-gray-500">OR</div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-blue-800 font-medium hover:underline"
                >
                  Register now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
