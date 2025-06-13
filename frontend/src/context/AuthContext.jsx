import React, { useEffect, useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["x-auth-token"] = token;
      getUser();
    }
  }, [token]);

  const getUser = async () => {
    try {
      const res = await axios.get("/api/auth/user");
      setUser(res.data);
    } catch (err) {
      console.error("Failed to fetch user:", err);
      logout();
    }
  };

  const login = async (formData) => {
    const res = await axios.post("/api/auth/login", formData);
    setToken(res.data.token);
    localStorage.setItem("token", res.data.token);
    navigate("/");
  };

  const register = async (formData) => {
    const res = await axios.post("/api/auth/register", formData);
    setToken(res.data.token);
    localStorage.setItem("token", res.data.token);
    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common["x-auth-token"];
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
