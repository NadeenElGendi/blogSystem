import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaUserPlus } from "react-icons/fa";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      await register({
        username: formData.username,
        password: formData.password,
      });
      toast.success("Welcome to Sporty!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-800 mb-2">
            Join Sporty
          </h1>
          <p className="text-lg text-blue-600">
            Become part of our community and share your thoughts
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
                  name="username"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  className="input input-bordered w-full focus:ring-2 focus:ring-blue-800"
                  required
                  minLength={3}
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
                  name="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="input input-bordered w-full focus:ring-2 focus:ring-blue-800"
                  required
                  minLength={6}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-blue-800 font-medium">
                    Confirm Password
                  </span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
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
                      Creating account...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <FaUserPlus className="mr-2" />
                      Register
                    </span>
                  )}
                </button>
              </div>
            </form>

            <div className="divider text-sm text-gray-500">OR</div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-800 font-medium hover:underline"
                >
                  Login now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
