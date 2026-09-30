import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("hobby_token");
    if (!token) { setLoading(false); return; }
    api.get("/api/auth/me")
      .then(setUser)
      .catch(() => { localStorage.removeItem("hobby_token"); setUser(null); })
      .finally(() => setLoading(false));
  }, []);

  const login = async (username, password) => {
    const data = await api.post("/api/auth/login", { username, password });
    localStorage.setItem("hobby_token", data.access_token);
    setUser(data.user);
  };

  const register = async (payload) => {
    const data = await api.post("/api/auth/register", payload);
    localStorage.setItem("hobby_token", data.access_token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem("hobby_token");
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, loading, login, register, logout, setUser }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
