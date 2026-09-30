import {useEffect,useState} from "react";
import {Plus,Target,Trash2,Sparkles} from "lucide-react";
import {api} from "../api"; import Loading from "../components/Loading"; import Toast from "../components/Toast";
const skillBlank={skill_name:"",category:"Other",current_level:"BEGINNER",target_level:"INTERMEDIATE",description:""};

export default function Goals(){
 const[goals,setGoals]=useState(null),[skills,setSkills]=useState([]),[form,setForm]=useState({skill_id:"",title:"",target_value:10,unit:"hours",deadline:""});
 const[newSkill,setNewSkill]=useState(skillBlank),[showSkill,setShowSkill]=useState(false),[toast,setToast]=useState(""),[error,setError]=useState("");
 const load=async()=>{try{const[g,s]=await Promise.all([api.get("/api/goals"),api.get("/api/skills")]);setGoals(g);setSkills(s);if(!form.skill_id&&s[0])setForm(f=>({...f,skill_id:String(s[0].id)}))}catch(e){setError(e.message)}};
 useEffect(()=>{load()},[]);
 const createSkill=async e=>{e.preventDefault();try{const s=await api.post("/api/skills",newSkill);setSkills(x=>[s,...x]);setForm(f=>({...f,skill_id:String(s.id)}));setNewSkill(skillBlank);setShowSkill(false);setToast("Skill created and selected");}catch(e){setError(e.message)}};
 const submit=async e=>{e.preventDefault();try{await api.post("/api/goals",{...form,skill_id:Number(form.skill_id),target_value:Number(form.target_value)});setToast("Goal created");load()}catch(e){setError(e.message)}};
 const update=async g=>{const value=prompt(`Update progress for "${g.title}"`,String(g.current_value));if(value===null)return;try{await api.put(`/api/goals/${g.id}`,{current_value:Number(value)});setToast("Progress updated");load()}catch(e){setError(e.message)}};
 const del=async id=>{if(confirm("Delete this goal?")){try{await api.del(`/api/goals/${id}`);setToast("Goal deleted");load()}catch(e){setError(e.message)}}};
 if(!goals)return <Loading text="Loading goals..."/>;
 return <div><Toast message={toast} onClose={()=>setToast("")}/>
  <div className="page-intro"><div><span className="pill">GOALS & MILESTONES</span><h2>Turn practice into outcomes</h2><p>Create measurable targets and keep your progress visible.</p></div></div>
  {error&&<div className="alert error">{error}</div>}
  <div className="goal-layout">
   <section className="panel">
    <div className="panel-head"><div><h3>Create a goal</h3><p>Choose an existing skill or create one here.</p></div><Target size={21}/></div>
    <form className="modal-form" onSubmit={submit}>
      <label>Skill<select required value={form.skill_id} onChange={e=>setForm({...form,skill_id:e.target.value})}><option value="" disabled>{skills.length?"Select a skill":"No skills available"}</option>{skills.map(s=><option key={s.id} value={s.id}>{s.skill_name}</option>)}</select></label>
      <button type="button" className="secondary-action" onClick={()=>setShowSkill(!showSkill)}><Plus size={15}/> {showSkill?"Close":"Create new skill"}</button>
      {showSkill&&<div className="inline-create"><label>New skill<input required value={newSkill.skill_name} onChange={e=>setNewSkill({...newSkill,skill_name:e.target.value})} placeholder="Photography"/></label><label>Category<select value={newSkill.category} onChange={e=>setNewSkill({...newSkill,category:e.target.value})}>{["Other","Coding","Music","Art","Fitness","Cooking","Photography","Writing"].map(x=><option key={x}>{x}</option>)}</select></label><button type="button" className="primary-btn full" onClick={createSkill}>Create & select skill</button></div>}
      <label>Goal title<input required value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="Practice 30 hours"/></label>
      <div className="form-row"><label>Target value<input required type="number" min="1" value={form.target_value} onChange={e=>setForm({...form,target_value:e.target.value})}/></label><label>Unit<select value={form.unit} onChange={e=>setForm({...form,unit:e.target.value})}><option>hours</option><option>sessions</option><option>projects</option></select></label></div>
      <label>Deadline<input type="date" value={form.deadline} onChange={e=>setForm({...form,deadline:e.target.value})}/></label>
      <button className="primary-btn full" disabled={!skills.length}><Plus size={16}/> Create goal</button>
      {!skills.length&&<div className="empty-inline"><Sparkles size={16}/><span>Add a skill above before creating your first goal.</span></div>}
    </form>
   </section>
   <section className="goal-list">{goals.length===0?<div className="empty large-empty"><Target/><h3>No goals yet</h3><p>Create your first measurable learning target.</p></div>:goals.map(g=>{const pct=Math.min(100,Math.round(g.current_value/g.target_value*100));return <div className="goal-card" key={g.id}><div className="goal-head"><div><span className="badge">{g.status}</span><h3>{g.title}</h3><p>{skills.find(s=>s.id===g.skill_id)?.skill_name||"Skill"} · {g.current_value}/{g.target_value} {g.unit}</p></div><button className="icon-btn danger" onClick={()=>del(g.id)}><Trash2 size={16}/></button></div><div className="progress-track"><div style={{width:`${pct}%`}}/></div><div className="progress-meta"><span>{pct}% complete</span><button className="text-link" onClick={()=>update(g)}>Update progress</button></div></div>})}</section>
  </div>
 </div>
}
