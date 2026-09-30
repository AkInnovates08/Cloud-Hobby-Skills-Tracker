import { useEffect, useState } from "react";
import { ArrowUpRight, Clock3, Target, Flame, Sparkles, Plus, Activity, RefreshCw } from "lucide-react";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";

function Stat({ icon: Icon, label, value, sub }) {
  return <div className="stat-card"><div className="stat-icon"><Icon size={18} /></div><div className="stat-label">{label}</div><div className="stat-value">{value}</div><div className="stat-sub">{sub}</div></div>;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [skills, setSkills] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    const results = await Promise.allSettled([
      api.get("/api/analytics/dashboard"),
      api.get("/api/skills"),
      api.get("/api/feed"),
    ]);

    const [analytics, skillResult, feed] = results;
    let failed = false;

    if (analytics.status === "fulfilled") setData(analytics.value);
    else { failed = true; setData(null); }

    if (skillResult.status === "fulfilled" && Array.isArray(skillResult.value)) setSkills(skillResult.value);
    else { failed = true; setSkills([]); }

    if (feed.status === "fulfilled" && Array.isArray(feed.value)) setPosts(feed.value);
    else { failed = true; setPosts([]); }

    if (failed) setError("Some dashboard data could not be loaded. Make sure FastAPI is running, then retry.");
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  if (loading && !data) return <Loading text="Preparing your dashboard..." />;
  if (!data) return <div className="alert error"><div className="grow"><strong>Backend connection required</strong><div>Start FastAPI with <code>uvicorn app.main:app --reload --port 8000</code>, then retry.</div></div><button className="ghost-btn" onClick={load}><RefreshCw size={15} /> Retry</button></div>;

  return <div className="dashboard-page">
    {error && <div className="alert error"><div className="grow">{error}</div><button className="ghost-btn" onClick={load}><RefreshCw size={15} /> Retry</button></div>}
    <section className="hero-card"><div><span className="pill">PERSONAL PROGRESS</span><h2>Good to see you, {user?.name?.split(" ")[0] || "there"}.</h2><p>Keep your momentum going. Every practice session adds to your long-term skill graph.</p><div className="hero-actions"><Link className="primary-btn" to="/skills"><Plus size={17} /> Add skill</Link><Link className="ghost-btn" to="/practice"><Clock3 size={16} /> Log practice</Link><Link className="ghost-btn" to="/community">View community <ArrowUpRight size={16} /></Link></div></div><div className="hero-graphic"><div className="ring"><div><strong>{skills.length}</strong><span>skills</span></div></div></div></section>
    <div className="stat-grid"><Stat icon={Clock3} label="Total practice" value={`${data.total_practice_hours}h`} sub={`${data.weekly_practice_hours}h in last 7 days`} /><Stat icon={Target} label="Goals completed" value={data.goals_completed} sub={`${data.active_goals} active goals`} /><Stat icon={Flame} label="Current streak" value={`${data.current_streak}d`} sub="Consecutive practice days" /><Stat icon={Sparkles} label="Top skill" value={data.most_practiced_skill} sub="Most practiced" /></div>
    <div className="content-grid two"><section className="panel"><div className="panel-head"><div><h3>Your skills</h3><p>Current learning portfolio</p></div><Link to="/skills" className="text-link">Manage</Link></div>{skills.length === 0 ? <Empty text="No skills yet. Add your first skill." link="/skills" /> : <div className="skill-list">{skills.slice(0, 5).map(s => <div className="skill-row" key={s.id}><div className="skill-badge">{(s.skill_name || "?").slice(0, 1)}</div><div className="grow"><strong>{s.skill_name}</strong><span>{s.category} · {s.current_level}</span></div><span className="badge">{s.status}</span></div>)}</div>}</section>
    <section className="panel"><div className="panel-head"><div><h3>Recent community</h3><p>Latest shared achievements</p></div><Link to="/community" className="text-link">Explore</Link></div>{posts.length === 0 ? <Empty text="Community posts will appear here." link="/community" /> : <div className="mini-posts">{posts.slice(0, 3).map(p => <div className="mini-post" key={p.id}><div className="avatar small">{(p.name || "U").slice(0, 1)}</div><div><strong>@{p.username}</strong><p>{p.content}</p><span>{p.like_count} likes · {(p.comments || []).length} comments</span></div></div>)}</div>}</section></div>
    <section className="panel activity-panel"><div className="panel-head"><div><h3>Workspace overview</h3><p>Cloud application status</p></div><span className="live-badge"><Activity size={14} /> Live</span></div><div className="overview-grid"><div><span>Database</span><strong>Connected</strong></div><div><span>Authentication</span><strong>JWT secured</strong></div><div><span>Storage</span><strong>Object simulation</strong></div><div><span>API</span><strong>FastAPI REST</strong></div></div></section>
  </div>;
}

function Empty({ text, link }) { return <div className="empty"><Sparkles size={22} /><p>{text}</p><Link className="text-link" to={link}>Get started</Link></div>; }
