import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Cloud } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Register(){
 const {register}=useAuth();const navigate=useNavigate();const [form,setForm]=useState({name:"",username:"",email:"",password:""});const [error,setError]=useState("");const [busy,setBusy]=useState(false);
 const update=k=>e=>setForm({...form,[k]:e.target.value});
 const submit=async e=>{e.preventDefault();setError("");setBusy(true);try{await register(form);navigate("/dashboard",{replace:true})}catch(err){setError(err.message)}finally{setBusy(false)}};
 return <div className="auth-page"><div className="auth-decoration"><div className="orb orb1"></div><div className="orb orb2"></div><div className="auth-copy"><div className="brand large"><div className="brand-mark"><Cloud/></div><div><strong>HobbyFlow</strong><span>Cloud Workspace</span></div></div><h1>Build a learning system around what you love.</h1><p>Create goals, log practice and turn small sessions into visible progress.</p></div></div><div className="auth-card"><div className="auth-header"><h2>Create your account</h2><p>Use a synthetic/demo identity for this student project.</p></div>{error&&<div className="alert error">{error}</div>}<form onSubmit={submit}><label>Full name<input required value={form.name} onChange={update("name")} placeholder="Alex Student"/></label><label>Username<input required value={form.username} onChange={update("username")} placeholder="alexstudent"/></label><label>Email<input required type="email" value={form.email} onChange={update("email")} placeholder="alex@example.com"/></label><label>Password<input required minLength="6" type="password" value={form.password} onChange={update("password")} placeholder="At least 6 characters"/></label><button className="primary-btn full" disabled={busy}>{busy?"Creating...":"Create account"}</button></form><p className="auth-footer">Already have an account? <Link to="/login">Sign in</Link></p></div></div>
}
