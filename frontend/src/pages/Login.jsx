import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Cloud, LockKeyhole, UserRound } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const {login} = useAuth(); const navigate=useNavigate();
  const [form,setForm]=useState({username:"",password:""}); const [error,setError]=useState(""); const [busy,setBusy]=useState(false);
  const submit=async e=>{e.preventDefault();setError("");setBusy(true);try{await login(form.username,form.password);navigate("/dashboard",{replace:true})}catch(err){setError(err.message)}finally{setBusy(false)}};
  return <div className="auth-page"><div className="auth-decoration"><div className="orb orb1"></div><div className="orb orb2"></div><div className="auth-copy"><div className="brand large"><div className="brand-mark"><Cloud/></div><div><strong>HobbyFlow</strong><span>Cloud Workspace</span></div></div><h1>Turn your interests into measurable progress.</h1><p>Track skills, build habits, share achievements and keep your learning journey available across devices.</p><div className="feature-line"><span>Cloud-ready</span><span>Secure</span><span>Community-driven</span></div></div></div>
  <div className="auth-card"><div className="auth-header"><div className="mobile-logo"><Cloud size={20}/></div><h2>Welcome back</h2><p>Sign in to continue to your workspace.</p></div>{error&&<div className="alert error">{error}</div>}<form onSubmit={submit}><label>Username<div className="input-wrap"><UserRound size={17}/><input required value={form.username} onChange={e=>setForm({...form,username:e.target.value})} placeholder="your username"/></div></label><label>Password<div className="input-wrap"><LockKeyhole size={17}/><input required type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="Your password"/></div></label><button className="primary-btn full" disabled={busy}>{busy?"Signing in...":"Sign in"}</button></form><p className="auth-footer">New here? <Link to="/register">Create an account</Link></p></div></div>
}
