import { Navigate, Outlet, Route, Routes, NavLink, useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, Sparkles, Target, Timer, BarChart3, Users, UserCircle, LogOut, Menu, X, Cloud, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useAuth } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Skills from "./pages/Skills";
import Goals from "./pages/Goals";
import Practice from "./pages/Practice";
import Analytics from "./pages/Analytics";
import Community from "./pages/Community";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import ErrorBoundary from "./components/ErrorBoundary";

const nav = [
  {to:"/dashboard", label:"Dashboard", icon:LayoutDashboard},
  {to:"/skills", label:"Skills", icon:Sparkles},
  {to:"/goals", label:"Goals", icon:Target},
  {to:"/practice", label:"Practice", icon:Timer},
  {to:"/analytics", label:"Analytics", icon:BarChart3},
  {to:"/community", label:"Community", icon:Users},
  {to:"/profile", label:"Profile", icon:UserCircle},
];

function Protected() {
  const { user, loading } = useAuth();
  if (loading) return <div className="fullscreen-loader"><div className="loader"></div><span>Loading your workspace...</span></div>;
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}

function Shell() {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const current = nav.find(n => location.pathname.startsWith(n.to))?.label || "Dashboard";

  const signOut = () => { logout(); navigate("/login", {replace:true}); };

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileOpen ? "mobile-open" : ""}`}>
        <div className="brand">
          <div className="brand-mark"><Cloud size={20}/></div>
          <div><strong>HobbyFlow</strong><span>Cloud Workspace</span></div>
          <button className="mobile-close" onClick={()=>setMobileOpen(false)}><X size={20}/></button>
        </div>
        <div className="workspace-label">WORKSPACE</div>
        <nav>
          {nav.map(({to,label,icon:Icon}) => (
            <NavLink key={to} to={to} onClick={()=>setMobileOpen(false)} className={({isActive})=>isActive?"nav-item active":"nav-item"}>
              <Icon size={18}/><span>{label}</span>{label==="Dashboard" ? null : <ChevronRight className="nav-chevron" size={15}/>}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="mini-user">
            <div className="avatar">{user?.name?.slice(0,1).toUpperCase()}</div>
            <div><strong>{user?.name}</strong><span>@{user?.username}</span></div>
          </div>
          <button className="nav-item logout" onClick={signOut}><LogOut size={18}/><span>Sign out</span></button>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <button className="mobile-menu" onClick={()=>setMobileOpen(true)}><Menu size={21}/></button>
          <div><div className="eyebrow">CLOUD WORKSPACE</div><h1>{current}</h1></div>
          <div className="top-actions"><span className="status-dot"></span><span className="online-text">System online</span></div>
        </header>
        <div className="page-content"><Outlet /></div>
      </main>
    </div>
  );
}

export default function App() {
  return <ErrorBoundary><Routes>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route element={<Protected/>}>
      <Route element={<Shell/>}>
        <Route index element={<Navigate to="/dashboard" replace/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/skills" element={<Skills/>}/>
        <Route path="/goals" element={<Goals/>}/>
        <Route path="/practice" element={<Practice/>}/>
        <Route path="/analytics" element={<Analytics/>}/>
        <Route path="/community" element={<Community/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Route>
    </Route>
    <Route path="*" element={<NotFound/>}/>
  </Routes></ErrorBoundary>;
}
