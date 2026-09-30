import {useEffect,useState} from "react";
import {Heart,MessageCircle,Send,Trash2,Users,RefreshCw} from "lucide-react";
import {api} from "../api";
import Loading from "../components/Loading";
import Toast from "../components/Toast";

export default function Community(){
  const[posts,setPosts]=useState([]);
  const[skills,setSkills]=useState([]);
  const[loading,setLoading]=useState(true);
  const[content,setContent]=useState("");
  const[skillId,setSkillId]=useState("");
  const[comments,setComments]=useState({});
  const[toast,setToast]=useState("");
  const[error,setError]=useState("");
  const[posting,setPosting]=useState(false);

  const load=async()=>{
    setLoading(true);setError("");
    const results=await Promise.allSettled([api.get("/api/feed"),api.get("/api/skills")]);
    const feed=results[0], skillResult=results[1];
    let failed=false;
    if(feed.status==="fulfilled"&&Array.isArray(feed.value)) setPosts(feed.value);
    else failed=true;
    if(skillResult.status==="fulfilled"&&Array.isArray(skillResult.value)) setSkills(skillResult.value);
    else failed=true;
    if(failed)setError("Some community data could not be loaded. Make sure FastAPI is running, then retry.");
    setLoading(false);
  };
  useEffect(()=>{load()},[]);

  const create=async e=>{
    e.preventDefault();
    if(!content.trim()||posting)return;
    setPosting(true);setError("");
    try{
      const created=await api.post("/api/posts",{content:content.trim(),skill_id:skillId?Number(skillId):null});
      if(created&&created.id){setPosts(prev=>[created,...prev]);}
      setContent("");setSkillId("");setToast("Post shared successfully");
      // Refresh quietly so counts and community data stay current without blocking the page.
      load();
    }catch(e){setError(e.message||"Unable to publish the post.");}
    finally{setPosting(false);}
  };

  const like=async p=>{
    try{
      const result=await (p.liked?api.del(`/api/posts/${p.id}/like`):api.post(`/api/posts/${p.id}/like`,{}));
      setPosts(prev=>prev.map(x=>x.id===p.id?{...x,liked:result?.liked??!p.liked,like_count:Math.max(0,(x.like_count||0)+(p.liked?-1:1))}:x));
    }catch(e){setError(e.message)}
  };

  const comment=async p=>{
    const text=comments[p.id]||"";if(!text.trim())return;
    try{
      const created=await api.post(`/api/posts/${p.id}/comments`,{content:text.trim()});
      setPosts(prev=>prev.map(x=>x.id===p.id?{...x,comments:[...(x.comments||[]),created]}:x));
      setComments({...comments,[p.id]:""});
    }catch(e){setError(e.message)}
  };

  const del=async id=>{
    if(!window.confirm("Delete your post?"))return;
    try{await api.del(`/api/posts/${id}`);setPosts(prev=>prev.filter(p=>p.id!==id));setToast("Post deleted");}
    catch(e){setError(e.message)}
  };

  if(loading&&posts.length===0)return <Loading text="Loading community..."/>;
  return <div>
    <Toast message={toast} onClose={()=>setToast("")}/>
    <div className="page-intro"><div><span className="pill">COMMUNITY</span><h2>Share progress, learn together</h2><p>Post achievements and exchange practical learning updates.</p></div><button className="ghost-btn" onClick={load}><RefreshCw size={15}/> Refresh</button></div>
    {error&&<div className="alert error"><div className="grow">{error}</div><button className="ghost-btn" onClick={load}><RefreshCw size={15}/> Retry</button></div>}
    <div className="community-layout">
      <section className="panel composer"><div className="composer-title"><Users size={19}/><div><strong>Share an update</strong><span>Celebrate a milestone or share what you practiced.</span></div></div><textarea value={content} onChange={e=>setContent(e.target.value)} placeholder="What are you working on today?"></textarea><div className="composer-actions"><select value={skillId} onChange={e=>setSkillId(e.target.value)}><option value="">No skill tag</option>{skills.map(s=><option value={s.id} key={s.id}>{s.skill_name}</option>)}</select><button className="primary-btn" onClick={create} disabled={posting}><Send size={16}/> {posting?"Publishing...":"Publish"}</button></div></section>
      {posts.length===0?<div className="empty large-empty"><Users/><h3>Your community is ready</h3><p>Be the first person to share an achievement.</p></div>:<div className="feed">{posts.map(p=><article className="post-card" key={p.id}><div className="post-head"><div className="avatar">{(p.name||"U").slice(0,1)}</div><div className="grow"><strong>{p.name||"User"}</strong><span>@{p.username||"user"} · {new Date(p.created_at).toLocaleString()}</span></div>{p.skill_name&&<span className="badge">{p.skill_name}</span>}<button className="icon-btn" onClick={()=>del(p.id)} title="Delete if yours"><Trash2 size={15}/></button></div><p className="post-content">{p.content}</p><div className="post-actions"><button className={p.liked?"liked":""} onClick={()=>like(p)}><Heart size={17} fill={p.liked?"currentColor":"none"}/> {p.like_count||0}</button><span><MessageCircle size={17}/> {(p.comments||[]).length}</span></div><div className="comments">{(p.comments||[]).map(c=><div className="comment" key={c.id}><div className="avatar tiny">{(c.username||"U").slice(0,1)}</div><div><strong>@{c.username||"user"}</strong><p>{c.content}</p></div></div>)}<div className="comment-box"><input value={comments[p.id]||""} onChange={e=>setComments({...comments,[p.id]:e.target.value})} onKeyDown={e=>e.key==="Enter"&&comment(p)} placeholder="Write a comment..."/><button onClick={()=>comment(p)}><Send size={15}/></button></div></div></article>)}</div>}
    </div>
  </div>;
}
