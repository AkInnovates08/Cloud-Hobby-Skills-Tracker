import { useEffect, useState } from "react";
import { Edit3, Plus, Trash2, X, Sparkles, RefreshCw } from "lucide-react";
import { api } from "../api";
import Loading from "../components/Loading";
import Toast from "../components/Toast";

const blank = {
  skill_name: "",
  category: "Other",
  current_level: "BEGINNER",
  target_level: "INTERMEDIATE",
  start_date: "",
  target_date: "",
  description: "",
};

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(blank);
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await api.get("/api/skills");
      if (!Array.isArray(data)) throw new Error("The skills API returned an unexpected response.");
      setSkills(data);
    } catch (e) {
      setSkills([]);
      setError(e.message || "Unable to load skills.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => {
    setForm({ ...blank });
    setEditing(null);
    setOpen(true);
    setError("");
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (editing) {
        await api.put(`/api/skills/${editing}`, form);
      } else {
        await api.post("/api/skills", form);
      }
      setOpen(false);
      setEditing(null);
      setForm({ ...blank });
      setToast(editing ? "Skill updated" : "Skill created");
      await load();
    } catch (e) {
      setError(e.message || "Unable to save the skill.");
    }
  };

  const del = async (id) => {
    if (!window.confirm("Delete this skill?")) return;
    try {
      await api.del(`/api/skills/${id}`);
      setToast("Skill deleted");
      await load();
    } catch (e) {
      setError(e.message || "Unable to delete the skill.");
    }
  };

  const edit = (skill) => {
    setEditing(skill.id);
    setForm({ ...blank, ...skill });
    setOpen(true);
    setError("");
  };

  if (loading) return <Loading text="Loading your skills..." />;

  return (
    <div>
      <Toast message={toast} onClose={() => setToast("")} />
      <div className="page-intro">
        <div>
          <span className="pill">SKILL PORTFOLIO</span>
          <h2>Build your skill stack</h2>
          <p>Track the interests you are actively developing and set clear target levels.</p>
        </div>
        <button className="primary-btn" onClick={openCreate}>
          <Plus size={17} /> Add skill
        </button>
      </div>

      {error && (
        <div className="alert error">
          <div className="grow">
            <strong>Skills could not be loaded</strong>
            <div>{error}</div>
          </div>
          <button className="ghost-btn" onClick={load}><RefreshCw size={15} /> Retry</button>
        </div>
      )}

      <div className="cards-grid">
        {skills.map((s) => (
          <div className="feature-card" key={s.id}>
            <div className="card-top">
              <div className="skill-badge large">{(s.skill_name || "?").slice(0, 1).toUpperCase()}</div>
              <div className="card-actions">
                <button onClick={() => edit(s)} title="Edit skill"><Edit3 size={16} /></button>
                <button onClick={() => del(s.id)} title="Delete skill"><Trash2 size={16} /></button>
              </div>
            </div>
            <h3>{s.skill_name || "Unnamed skill"}</h3>
            <p>{s.description || "No description added yet."}</p>
            <div className="tag-row"><span className="badge">{s.category}</span><span className="badge">{s.current_level}</span></div>
            <div className="level-line"><span>Target: {s.target_level}</span><span>{s.status}</span></div>
          </div>
        ))}
      </div>

      {skills.length === 0 && !error && (
        <div className="empty large-empty">
          <Sparkles />
          <h3>No skills yet</h3>
          <p>Add your first skill to start building your learning portfolio.</p>
          <button className="primary-btn" onClick={openCreate}><Plus size={16} /> Add skill</button>
        </div>
      )}

      {open && (
        <Modal title={editing ? "Edit skill" : "Add a new skill"} close={() => setOpen(false)}>
          <form onSubmit={submit} className="modal-form">
            <label>Skill name<input required value={form.skill_name} onChange={e => setForm({ ...form, skill_name: e.target.value })} placeholder="Photography" /></label>
            <div className="form-row">
              <label>Category<select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>{["Other", "Coding", "Music", "Art", "Fitness", "Cooking", "Photography", "Writing"].map(x => <option key={x}>{x}</option>)}</select></label>
              <label>Current level<select value={form.current_level} onChange={e => setForm({ ...form, current_level: e.target.value })}>{["BEGINNER", "INTERMEDIATE", "ADVANCED"].map(x => <option key={x}>{x}</option>)}</select></label>
            </div>
            <label>Target level<select value={form.target_level} onChange={e => setForm({ ...form, target_level: e.target.value })}>{["BEGINNER", "INTERMEDIATE", "ADVANCED"].map(x => <option key={x}>{x}</option>)}</select></label>
            <label>Description<textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="What are you learning?" /></label>
            <button className="primary-btn full">{editing ? "Save changes" : "Create skill"}</button>
          </form>
        </Modal>
      )}
    </div>
  );
}

function Modal({ title, close, children }) {
  return (
    <div className="modal-backdrop" onMouseDown={e => e.target === e.currentTarget && close()}>
      <div className="modal">
        <div className="modal-head"><h3>{title}</h3><button onClick={close}><X /></button></div>
        {children}
      </div>
    </div>
  );
}
