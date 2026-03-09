import React, { useState, useEffect, useRef, useCallback, useContext, createContext } from "react";

// ─── ICONS ────────────────────────────────────────────────────────────────────
const Icon = ({ d, size = 20, sw = 1.8 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
  </svg>
);

const I = {
  home:       ["M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", "M9 22V12h6v10"],
  calendar:   ["M8 2v4M16 2v4M3 10h18", "M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z"],
  users:      ["M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2","M23 21v-2a4 4 0 00-3-3.87","M16 3.13a4 4 0 010 7.75"],
  bell:       ["M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9","M13.73 21a2 2 0 01-3.46 0"],
  gear:       ["M12 15a3 3 0 100-6 3 3 0 000 6z","M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 2 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"],
  star:       "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  search:     ["M11 19a8 8 0 100-16 8 8 0 000 16z","M21 21l-4.35-4.35"],
  upload:     ["M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4","M17 8l-5-5-5 5","M12 3v12"],
  menu:       ["M3 12h18","M3 6h18","M3 18h18"],
  x:          ["M18 6L6 18","M6 6l12 12"],
  filter:     "M22 3H2l8 9.46V19l4 2v-8.54L22 3z",
  bookmark:   "M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z",
  bar:        ["M18 20V10","M12 20V4","M6 20v-6"],
  plus:       ["M12 5v14","M5 12h14"],
  link:       ["M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71","M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"],
  building:   ["M6 22V4a2 2 0 012-2h8a2 2 0 012 2v18","M2 22h20","M14 11h2","M14 15h2","M8 11h2","M8 15h2"],
  trending:   "M23 6l-9.5 9.5-5-5L1 18",
  shield:     "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  logout:     ["M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4","M16 17l5-5-5-5","M21 12H9"],
  chevR:      "M9 18l6-6-6-6",
  grid:       ["M3 3h7v7H3z","M14 3h7v7h-7z","M14 14h7v7h-7z","M3 14h7v7H3z"],
  eye:        ["M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z","M12 9a3 3 0 100 6 3 3 0 000-6z"],
  check:      "M20 6L9 17l-5-5",
  back:       ["M19 12H5","M12 5l-7 7 7 7"],
  chevU:      "M18 15l-6-6-6 6",
  chevD:      "M6 9l6 6 6-6",
  msg:        ["M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"],
  send:       ["M22 2L11 13","M22 2L15 22 11 13 2 9l20-7z"],
  dollar:     ["M12 1v22","M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"],
  zap:        "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
};

// ─── TOKENS ───────────────────────────────────────────────────────────────────
const C = {
  navy:"#0B1C2D", navyL:"#112336", navyM:"#0E2035",
  teal:"#1FA3A3", tealLt:"#25BBBB",
  tealDim:"rgba(31,163,163,0.15)", tealBd:"rgba(31,163,163,0.3)",
  offWhite:"#F8FAFC", text:"#1E293B", muted:"#64748B",
  slate:"#94A3B8", slateL:"#CBD5E1", slateXL:"#E2E8F0",
  border:"#E2E8F0", card:"#FFFFFF",
  green:"#10B981", amber:"#F59E0B", red:"#EF4444",
  purple:"#8B5CF6", purpleDim:"rgba(139,92,246,0.12)", purpleBd:"rgba(139,92,246,0.25)",
  blue:"#3B82F6", blueDim:"rgba(59,130,246,0.12)",
};

// ─── PRIMITIVES ───────────────────────────────────────────────────────────────
const Badge = ({ children, v = "teal" }) => {
  const map = {
    teal:  { bg:"rgba(31,163,163,0.12)",  color:C.teal,  bd:C.tealBd },
    green: { bg:"rgba(16,185,129,0.1)",   color:C.green, bd:"rgba(16,185,129,0.3)" },
    amber: { bg:"rgba(245,158,11,0.1)",   color:C.amber, bd:"rgba(245,158,11,0.3)" },
    red:   { bg:"rgba(239,68,68,0.1)",    color:C.red,   bd:"rgba(239,68,68,0.3)" },
    indigo:{ bg:"rgba(99,102,241,0.1)",   color:"#6366F1",bd:"rgba(99,102,241,0.3)"},
    navy:  { bg:"rgba(11,28,45,0.08)",    color:C.navy,  bd:"rgba(11,28,45,0.15)"},
    purple:{ bg:"rgba(139,92,246,0.12)",  color:C.purple, bd:"rgba(139,92,246,0.25)"},
    blue:  { bg:"rgba(59,130,246,0.12)",  color:C.blue,   bd:"rgba(59,130,246,0.25)"},
  };
  const s = map[v] || map.teal;
  return (
    <span style={{ display:"inline-flex", alignItems:"center", padding:"2px 9px",
      borderRadius:999, fontSize:11, fontWeight:700, letterSpacing:"0.04em",
      background:s.bg, color:s.color, border:`1px solid ${s.bd}`, whiteSpace:"nowrap" }}>
      {children}
    </span>
  );
};

const VBadge = () => (
  <span style={{ display:"inline-flex", alignItems:"center", gap:3, padding:"2px 7px",
    borderRadius:999, fontSize:11, fontWeight:700, letterSpacing:"0.04em",
    background:"rgba(31,163,163,0.12)", color:C.teal, border:`1px solid ${C.tealBd}` }}>
    <Icon d={I.shield} size={11} sw={2.5}/>Verified
  </span>
);

const Btn = ({ children, v="primary", sz="md", onClick, full, icon, disabled }) => {
  const base = { display:"inline-flex", alignItems:"center", justifyContent:"center",
    gap:7, borderRadius:10, fontFamily:"inherit", fontWeight:600,
    cursor:disabled?"not-allowed":"pointer", border:"1.5px solid transparent",
    transition:"all 0.18s", opacity:disabled?0.5:1,
    width:full?"100%":"auto", letterSpacing:"0.01em", outline:"none" };
  const sizes = { sm:{padding:"7px 14px",fontSize:13}, md:{padding:"10px 20px",fontSize:14}, lg:{padding:"13px 28px",fontSize:15} };
  const vars = {
    primary: { background:C.teal, color:"#fff", borderColor:C.teal },
    secondary:{ background:"transparent", color:C.teal, borderColor:C.tealBd },
    ghost:   { background:"rgba(255,255,255,0.07)", color:C.slateL, borderColor:"rgba(255,255,255,0.12)" },
    danger:  { background:C.red, color:"#fff", borderColor:C.red },
    white:   { background:"#fff", color:C.navy, borderColor:"#fff" },
  };
  return (
    <button onClick={disabled?undefined:onClick} style={{...base,...sizes[sz],...(vars[v]||vars.primary)}}>
      {icon && <Icon d={I[icon]} size={15} sw={2}/>}
      {children}
    </button>
  );
};

const Card = ({ children, style, onClick }) => {
  const [hov, setHov] = useState(false);
  return (
    <div onClick={onClick}
      onMouseEnter={()=>onClick&&setHov(true)}
      onMouseLeave={()=>setHov(false)}
      style={{ background:C.card, borderRadius:14,
        border:`1px solid ${hov?C.tealBd:C.border}`,
        boxShadow:hov?"0 6px 24px rgba(0,0,0,0.1)":"0 1px 4px rgba(0,0,0,0.06)",
        transition:"all 0.18s", cursor:onClick?"pointer":"default", ...style }}>
      {children}
    </div>
  );
};

const Avatar = ({ name="?", size=40 }) => {
  const pal = ["#1FA3A3","#6366F1","#F59E0B","#EC4899","#10B981","#3B82F6","#8B5CF6"];
  const bg = pal[(name.charCodeAt(0)||0) % pal.length];
  return (
    <div style={{ width:size, height:size, borderRadius:size/2, background:bg, flexShrink:0,
      display:"flex", alignItems:"center", justifyContent:"center",
      color:"#fff", fontWeight:700, fontSize:size*0.38, boxShadow:"0 2px 8px rgba(0,0,0,0.15)" }}>
      {name[0]?.toUpperCase()}
    </div>
  );
};

const ProgressBar = ({ value }) => (
  <div style={{ height:8, borderRadius:999, background:C.slateXL, overflow:"hidden" }}>
    <div style={{ width:`${value}%`, height:"100%",
      background:`linear-gradient(90deg,${C.teal},${C.tealLt})`,
      borderRadius:999, transition:"width 0.6s ease" }}/>
  </div>
);

const FInput = ({ label, placeholder, type="text", defaultValue, value, onChange, rows, disabled }) => {
  const [focused, setFocused] = useState(false);
  const base = { width:"100%", padding:"10px 14px", borderRadius:10, fontSize:14,
    fontFamily:"inherit", color:C.text, background: disabled ? C.offWhite : "#fff", outline:"none",
    border:`1.5px solid ${focused?C.teal:C.border}`, transition:"border 0.18s",
    boxSizing:"border-box", resize:"vertical", opacity: disabled ? 0.6 : 1,
    cursor: disabled ? "not-allowed" : "auto" };
  const controlled = value !== undefined;
  return (
    <div>
      {label && <label style={{display:"block",fontSize:13,fontWeight:600,color:C.text,marginBottom:6}}>{label}</label>}
      {rows
        ? <textarea rows={rows} placeholder={placeholder}
            {...(controlled ? {value, onChange} : {defaultValue})}
            disabled={disabled} style={base} onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}/>
        : <input type={type} placeholder={placeholder}
            {...(controlled ? {value, onChange} : {defaultValue})}
            disabled={disabled} style={base} onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}/>
      }
    </div>
  );
};

const FSelect = ({ label, options, value, onChange }) => {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      {label && <label style={{display:"block",fontSize:13,fontWeight:600,color:C.text,marginBottom:6}}>{label}</label>}
      <select value={value} onChange={onChange}
        style={{ width:"100%", padding:"10px 14px", borderRadius:10, fontSize:14, fontFamily:"inherit",
          color:C.text, background:"#fff", outline:"none", cursor:"pointer", boxSizing:"border-box",
          border:`1.5px solid ${focused?C.teal:C.border}`, transition:"border 0.18s", appearance:"none" }}
        onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}>
        {options.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
};

const Modal = ({ open, onClose, title, children, maxW=480 }) => {
  useEffect(()=>{
    if(open) document.body.style.overflow="hidden";
    else document.body.style.overflow="";
    return ()=>{ document.body.style.overflow=""; };
  },[open]);
  if(!open) return null;
  return (
    <div onClick={onClose} style={{ position:"fixed",inset:0,zIndex:2000,
      background:"rgba(11,28,45,0.72)",display:"flex",alignItems:"center",
      justifyContent:"center",padding:16,backdropFilter:"blur(4px)" }}>
      <div onClick={e=>e.stopPropagation()} style={{ background:"#fff",borderRadius:16,
        width:"100%",maxWidth:maxW,boxShadow:"0 24px 64px rgba(0,0,0,0.25)",
        animation:"slideUp 0.22s ease",maxHeight:"90vh",overflow:"auto" }}>
        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",
          padding:"20px 24px 16px",borderBottom:`1px solid ${C.border}` }}>
          <h3 style={{ fontSize:17,fontWeight:700,color:C.text,margin:0 }}>{title}</h3>
          <button onClick={onClose} style={{ background:C.slateXL,border:"none",borderRadius:8,
            width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",
            cursor:"pointer",color:C.muted }}>
            <Icon d={I.x} size={16} sw={2.5}/>
          </button>
        </div>
        <div style={{ padding:"20px 24px" }}>{children}</div>
      </div>
    </div>
  );
};

const Drawer = ({ open, onClose, title, children }) => {
  useEffect(()=>{
    if(open) document.body.style.overflow="hidden";
    else document.body.style.overflow="";
    return ()=>{ document.body.style.overflow=""; };
  },[open]);
  return (
    <>
      {open && <div onClick={onClose} style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",zIndex:400 }}/>}
      <div style={{ position:"fixed",bottom:0,left:0,right:0,background:"#fff",
        borderRadius:"20px 20px 0 0",padding:24,zIndex:401,
        boxShadow:"0 -8px 40px rgba(0,0,0,0.18)",
        transform:open?"translateY(0)":"translateY(100%)",
        transition:"transform 0.28s cubic-bezier(0.32,0.72,0,1)" }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20 }}>
          <h3 style={{ fontWeight:700,fontSize:18,color:C.text,margin:0 }}>{title}</h3>
          <button onClick={onClose} style={{ background:C.slateXL,border:"none",borderRadius:8,
            width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",
            cursor:"pointer",color:C.muted }}>
            <Icon d={I.x} size={16} sw={2.5}/>
          </button>
        </div>
        {children}
      </div>
    </>
  );
};

// ─── EMPTY STATE ─────────────────────────────────────────────────────────────
const EmptyState = ({ icon="📭", title, body, cta, onCta, ctaSecondary, onCtaSecondary, compact=false }) => (
  <div style={{ textAlign:"center", padding:compact?"32px 20px":"64px 20px" }}>
    <div style={{ fontSize:compact?36:52, marginBottom:compact?10:16, lineHeight:1 }}>{icon}</div>
    <div style={{ fontWeight:700, fontSize:compact?15:17, color:C.text, marginBottom:6 }}>{title}</div>
    {body && <div style={{ fontSize:13, color:C.muted, lineHeight:1.65, maxWidth:280, margin:"0 auto", marginBottom:cta?20:0 }}>{body}</div>}
    {cta && (
      <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap", marginTop:body?0:16 }}>
        <Btn v="primary" sz="sm" onClick={onCta}>{cta}</Btn>
        {ctaSecondary && <Btn v="secondary" sz="sm" onClick={onCtaSecondary}>{ctaSecondary}</Btn>}
      </div>
    )}
  </div>
);

// ─── TOAST NOTIFICATION SYSTEM ──────────────────────────────────────────────
const ToastContext = createContext(null);

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const addToast = (msg, type="success", duration=3000) => {
    const id = Date.now() + Math.random();
    setToasts(p => [...p, { id, msg, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), duration);
  };
  const dismiss = id => setToasts(p => p.filter(t => t.id !== id));
  const ICONS = { success:"✓", error:"✕", info:"ℹ", warning:"⚠" };
  const COLORS = {
    success:{ bg:"#052E16", border:"rgba(16,185,129,0.4)", icon:C.green,  text:"#D1FAE5" },
    error:  { bg:"#450A0A", border:"rgba(239,68,68,0.4)",  icon:C.red,   text:"#FEE2E2" },
    info:   { bg:"#0C1A2E", border:`rgba(31,163,163,0.4)`, icon:C.teal,  text:"#CCFBF1" },
    warning:{ bg:"#3B1F07", border:"rgba(245,158,11,0.4)", icon:C.amber, text:"#FEF3C7" },
  };
  return (
    <ToastContext.Provider value={addToast}>
      {children}
      {/* Toast stack - bottom centre, above bottom nav */}
      <div style={{ position:"fixed", bottom:72, left:"50%", transform:"translateX(-50%)",
        display:"flex", flexDirection:"column-reverse", gap:8, zIndex:9999,
        pointerEvents:"none", width:"min(360px, calc(100vw - 24px))" }}>
        {toasts.map(t => {
          const col = COLORS[t.type] || COLORS.success;
          return (
            <div key={t.id} style={{ background:col.bg, border:`1px solid ${col.border}`,
              borderRadius:12, padding:"12px 16px", display:"flex", alignItems:"center", gap:10,
              boxShadow:"0 8px 24px rgba(0,0,0,0.35)",
              animation:"toastIn 0.25s cubic-bezier(0.175,0.885,0.32,1.275)",
              pointerEvents:"auto" }}>
              <span style={{ width:22, height:22, borderRadius:11, background:col.icon+"22",
                display:"flex", alignItems:"center", justifyContent:"center",
                color:col.icon, fontSize:12, fontWeight:700, flexShrink:0 }}>{ICONS[t.type]}</span>
              <span style={{ flex:1, fontSize:13, fontWeight:500, color:col.text, lineHeight:1.4 }}>{t.msg}</span>
              <button onClick={()=>dismiss(t.id)}
                style={{ background:"none", border:"none", cursor:"pointer", color:col.text,
                  opacity:0.5, fontSize:16, padding:0, fontFamily:"inherit", lineHeight:1 }}>×</button>
            </div>
          );
        })}
      </div>
      <style>{`
        @keyframes toastIn {
          from { opacity:0; transform:translateY(12px) scale(0.95); }
          to   { opacity:1; transform:translateY(0)     scale(1); }
        }
      `}</style>
    </ToastContext.Provider>
  );
};

const useToast = () => {
  const ctx = useContext(ToastContext);
  return ctx || ((msg, type) => console.log("Toast:", type, msg));
};

// ─── SKELETON LOADER ─────────────────────────────────────────────────────────
const Skeleton = ({ w="100%", h=14, r=8, style={} }) => (
  <div style={{ width:w, height:h, borderRadius:r, background:"linear-gradient(90deg,#E2E8F0 25%,#F1F5F9 50%,#E2E8F0 75%)", backgroundSize:"200% 100%", animation:"shimmer 1.4s ease infinite", flexShrink:0, ...style }}/>
);

const SkeletonCard = ({ rows=3, hasAvatar=false, style={} }) => (
  <div style={{ background:"#fff", borderRadius:14, border:`1px solid ${C.border}`, padding:18, ...style }}>
    {hasAvatar && (
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
        <Skeleton w={44} h={44} r={22}/>
        <div style={{ flex:1, display:"flex", flexDirection:"column", gap:6 }}>
          <Skeleton w="60%" h={14}/>
          <Skeleton w="40%" h={11}/>
        </div>
      </div>
    )}
    {Array.from({length:rows}).map((_,i)=>(
      <Skeleton key={i} w={i===rows-1?"70%":"100%"} h={12} style={{ marginBottom:i<rows-1?10:0 }}/>
    ))}
  </div>
);

// ─── NOTIFICATIONS ────────────────────────────────────────────────────────────
const INIT_NOTIFS = [
  {id:1,  cat:"intro",   title:"New intro request",        body:"Ananya Krishnan from Sequoia wants to connect with GreenTech.",      time:"2m ago",  unread:true,  action:{label:"View",route:"founderDocs"} },
  {id:2,  cat:"dataroom",title:"Data room access request", body:"Rajiv Malhotra requested access to your data room.",                  time:"18m ago", unread:true,  action:{label:"Review",route:"founderDocs"} },
  {id:3,  cat:"system",  title:"Profile approved ✓",       body:"Your startup profile has been verified by FundLink.",                  time:"1h ago",  unread:true,  action:null },
  {id:4,  cat:"event",   title:"Event tomorrow",           body:"Delhi Demo Day starts in 24 hours. You're in Slot 3.",                 time:"3h ago",  unread:true,  action:{label:"View Event",route:"founder"} },
  {id:5,  cat:"message", title:"New message",              body:"Priya Sharma: 'Loved the pitch. Can we schedule a quick call?'",      time:"5h ago",  unread:false, action:{label:"Reply",route:"founder"} },
  {id:6,  cat:"intro",   title:"Intro accepted",           body:"Rajiv Malhotra accepted your intro — check your messages.",            time:"1d ago",  unread:false, action:{label:"View",route:"founder"} },
  {id:7,  cat:"dataroom",title:"Document downloaded",      body:"Sunita Patel downloaded Financial_Model_2026.xlsx.",                   time:"1d ago",  unread:false, action:{label:"View Activity",route:"founderDocs"} },
  {id:8,  cat:"system",  title:"KYC approved",             body:"Your identity has been verified. Investor intros are now unlocked.",   time:"2d ago",  unread:false, action:null },
  {id:9,  cat:"event",   title:"Registration confirmed",   body:"You're registered for Mumbai Pitch Night on Mar 22.",                  time:"3d ago",  unread:false, action:{label:"View Event",route:"founder"} },
  {id:10, cat:"intro",   title:"Intro request expired",    body:"Your intro request to Vikram Rao has expired after 7 days.",           time:"5d ago",  unread:false, action:null },
  {id:11, cat:"system",  title:"New feature: Deal Room",   body:"You can now share NDA-protected documents with investors.",            time:"1w ago",  unread:false, action:{label:"Try it",route:"founderDocs"} },
  {id:12, cat:"message", title:"Document request",         body:"An investor has requested access to your pitch deck.",                  time:"1w ago",  unread:false, action:{label:"View",route:"founderDocs"} },
];

const NotifDropdown = ({ onClose, nav }) => {
  const [notifs, setNotifs] = useState(INIT_NOTIFS);
  const markAllRead = () => setNotifs(p=>p.map(n=>({...n,unread:false})));
  const unreadCount = notifs.filter(n=>n.unread).length;
  const catIcon = c => c==="intro"?"🤝":c==="dataroom"?"🔐":c==="event"?"📅":c==="message"?"💬":"🔔";
  return (
    <div style={{ position:"fixed",top:66,right:8,width:"min(360px, calc(100vw - 16px))",background:"#fff",borderRadius:14,border:`1px solid ${C.border}`,boxShadow:"0 16px 48px rgba(0,0,0,0.18)",zIndex:600,overflow:"hidden" }}>
      <div style={{ padding:"14px 18px 10px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center" }}>
        <span style={{ fontWeight:700,color:C.text,fontSize:15 }}>
          Notifications
          {unreadCount>0 && <span style={{ fontSize:11,padding:"2px 7px",borderRadius:99,background:C.teal,color:"#fff",marginLeft:8 }}>{unreadCount}</span>}
        </span>
        {unreadCount>0 && <span onClick={markAllRead} style={{ fontSize:12,color:C.teal,fontWeight:600,cursor:"pointer" }}>Mark all read</span>}
      </div>
      <div style={{ maxHeight:360,overflowY:"auto" }}>
        {notifs.slice(0,6).map(n=>(
          <div key={n.id}
            onClick={()=>{ setNotifs(p=>p.map(x=>x.id===n.id?{...x,unread:false}:x)); onClose(); }}
            style={{ padding:"12px 18px",borderBottom:`1px solid ${C.slateXL}`,cursor:"pointer",background:n.unread?"rgba(31,163,163,0.04)":"transparent",display:"flex",gap:10,alignItems:"flex-start",transition:"background 0.15s" }}
            onMouseEnter={e=>e.currentTarget.style.background="rgba(31,163,163,0.08)"}
            onMouseLeave={e=>e.currentTarget.style.background=n.unread?"rgba(31,163,163,0.04)":"transparent"}>
            <div style={{ width:32,height:32,borderRadius:9,background:n.unread?C.tealDim:C.offWhite,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0 }}>{catIcon(n.cat)}</div>
            <div style={{ flex:1,minWidth:0 }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start" }}>
                <div style={{ fontSize:13,fontWeight:n.unread?700:600,color:C.text,marginBottom:1 }}>{n.title}</div>
                {n.unread && <div style={{ width:7,height:7,borderRadius:4,background:C.teal,flexShrink:0,marginTop:4 }}/>}
              </div>
              <div style={{ fontSize:12,color:C.muted,lineHeight:1.5,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{n.body}</div>
              <div style={{ fontSize:11,color:C.slate,marginTop:3 }}>{n.time}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding:"10px 18px",borderTop:`1px solid ${C.border}`,textAlign:"center" }}>
        <span onClick={()=>{ onClose(); nav("notifications"); }} style={{ fontSize:13,color:C.teal,fontWeight:600,cursor:"pointer" }}>View all notifications →</span>
      </div>
    </div>
  );
};

// ─── FULL NOTIFICATIONS PAGE ──────────────────────────────────────────────────
// ─── SUPPORT PAGE (user-facing) ──────────────────────────────────────────────
const SupportPage = ({ nav, role="founder", onClose }) => {
  const [tab,         setTab]         = useState("new");
  const [category,    setCategory]    = useState("");
  const [subject,     setSubject]     = useState("");
  const [message,     setMessage]     = useState("");
  const [submitted,   setSubmitted]   = useState(false);
  const [faqOpen,     setFaqOpen]     = useState(null);
  const [chatOpen,    setChatOpen]    = useState(false);
  const [chatMsg,     setChatMsg]     = useState("");
  const [chatHistory, setChatHistory] = useState([
    { from:"bot", text:"Hi! I'm the FundLink support assistant. How can I help you today?" }
  ]);
  const toast = useToast();

  const myTickets = [
    { id:"TKT-0041", subject:"KYC document not accepted", status:"open",     priority:"high",   created:"Mar 5",  lastReply:"2h ago",  unread:true },
    { id:"TKT-0038", subject:"Intro request not delivered", status:"pending", priority:"medium", created:"Feb 28", lastReply:"1d ago",  unread:false },
    { id:"TKT-0031", subject:"Profile visibility issue",    status:"resolved",priority:"low",    created:"Feb 14", lastReply:"Feb 16", unread:false },
  ];

  const faqs = [
    { q:"How long does KYC verification take?",         a:"KYC verification typically takes 1–3 business days. You'll receive an email once your documents are reviewed. If it's been more than 3 days, please raise a ticket and we'll escalate it." },
    { q:"How do intro requests work?",                  a:"When you request an intro, our team facilitates a warm introduction via email. Both parties receive a brief context note. The investor must accept before any contact details are shared." },
    { q:"Can I edit my pitch deck after uploading?",    a:"Yes — go to Documents in your dashboard and upload a new version. Investors who have already viewed it will see a 'Updated' badge on your profile." },
    { q:"How do I get verified on FundLink?",           a:"Submit your identity documents and company registration proof from the KYC section. Our team reviews within 1–3 days. Verified founders see a blue badge on their profile." },
    { q:"What happens if my subscription lapses?",      a:"Your profile stays visible but intro requests are paused until you reactivate. Data room access is also suspended. You won't lose any data." },
    { q:"How do I report a bad actor or scam attempt?", a:"Use the Report button on any profile or message thread. Our moderation team reviews all reports within 24 hours. For urgent issues, raise a High priority ticket." },
  ];

  const STATUS_STYLE = {
    open:     { bg:"rgba(239,68,68,0.08)",    color:C.red,   label:"Open" },
    pending:  { bg:"rgba(245,158,11,0.08)",   color:C.amber, label:"Pending" },
    resolved: { bg:"rgba(16,185,129,0.08)",   color:C.green, label:"Resolved" },
  };
  const PRIORITY_STYLE = {
    high:   { color:C.red,   label:"High" },
    medium: { color:C.amber, label:"Medium" },
    low:    { color:C.muted, label:"Low" },
  };

  const sendChat = () => {
    if(!chatMsg.trim()) return;
    const user = { from:"user", text:chatMsg.trim() };
    setChatHistory(p=>[...p, user]);
    setChatMsg("");
    setTimeout(()=>{
      const replies = [
        "Thanks for reaching out! Let me look into that for you.",
        "I understand — this is a common question. Could you share a bit more detail?",
        "Great question. Our team typically responds within 2 hours during business hours.",
        "I've flagged this for a human agent who will follow up shortly.",
      ];
      setChatHistory(p=>[...p, { from:"bot", text:replies[Math.floor(Math.random()*replies.length)] }]);
    }, 900);
  };

  const handleSubmit = () => {
    if(!category || !subject || !message) { toast("Please fill in all fields","error"); return; }
    setSubmitted(true);
    toast("Ticket submitted! We'll reply within 24 hours.","success");
  };

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(15,23,42,0.55)", zIndex:2000,
      display:"flex", alignItems:"flex-end", justifyContent:"center",
      backdropFilter:"blur(3px)", animation:"toastIn 0.2s ease" }}>
      <div style={{ background:"#fff", borderRadius:"20px 20px 0 0", width:"100%", maxWidth:640,
        maxHeight:"92vh", display:"flex", flexDirection:"column", boxShadow:"0 -8px 40px rgba(0,0,0,0.18)" }}>

        {/* Header */}
        <div style={{ padding:"18px 20px 14px", borderBottom:`1px solid ${C.border}`,
          display:"flex", alignItems:"center", gap:12, flexShrink:0 }}>
          <div style={{ width:38, height:38, borderRadius:11, background:"rgba(99,102,241,0.1)",
            display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ fontSize:18 }}>🎧</span>
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontWeight:800, fontSize:16, color:C.text, letterSpacing:"-0.01em" }}>Help & Support</div>
            <div style={{ fontSize:12, color:C.green, fontWeight:600 }}>● Typically replies in &lt;2 hours</div>
          </div>
          <button onClick={onClose}
            style={{ background:"none", border:"none", cursor:"pointer", fontSize:22,
              color:C.muted, lineHeight:1, padding:4, fontFamily:"inherit" }}>×</button>
        </div>

        {/* Tabs */}
        <div style={{ display:"flex", gap:0, borderBottom:`1px solid ${C.border}`, flexShrink:0 }}>
          {[["new","New Ticket"],["tickets","My Tickets"],["faq","FAQs"],["chat","Live Chat"]].map(([id,label])=>(
            <button key={id} onClick={()=>setTab(id)}
              style={{ flex:1, padding:"12px 4px", border:"none", background:"transparent",
                cursor:"pointer", fontFamily:"inherit", fontSize:13, fontWeight:700,
                color:tab===id?C.teal:C.muted,
                borderBottom:tab===id?`2px solid ${C.teal}`:"2px solid transparent",
                transition:"all 0.15s" }}>
              {label}
              {id==="tickets" && myTickets.some(t=>t.unread) && (
                <span style={{ marginLeft:4, width:6, height:6, borderRadius:3,
                  background:C.red, display:"inline-block", verticalAlign:"middle" }}/>
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex:1, overflowY:"auto", padding:20 }}>

          {/* NEW TICKET */}
          {tab==="new" && (
            submitted
              ? <div style={{ textAlign:"center", padding:"30px 0" }}>
                  <div style={{ width:64, height:64, borderRadius:32, background:"rgba(16,185,129,0.1)",
                    display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>
                    <span style={{ fontSize:28 }}>✅</span>
                  </div>
                  <div style={{ fontWeight:800, fontSize:18, color:C.text, marginBottom:6 }}>Ticket Submitted!</div>
                  <div style={{ fontSize:14, color:C.muted, marginBottom:6 }}>Reference: <strong>TKT-0042</strong></div>
                  <p style={{ fontSize:13, color:C.muted, lineHeight:1.7, marginBottom:20, maxWidth:300, margin:"0 auto 20px" }}>
                    Our support team will reply within 24 hours. You'll get an email notification when we respond.
                  </p>
                  <div style={{ display:"flex", gap:10, justifyContent:"center" }}>
                    <Btn v="secondary" onClick={()=>{ setSubmitted(false); setCategory(""); setSubject(""); setMessage(""); }}>New Ticket</Btn>
                    <Btn v="primary" onClick={()=>setTab("tickets")}>View My Tickets</Btn>
                  </div>
                </div>
              : <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                  <div>
                    <label style={{ display:"block", fontSize:12, fontWeight:700, color:C.muted,
                      marginBottom:6, textTransform:"uppercase", letterSpacing:"0.05em" }}>Category *</label>
                    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))", gap:8 }}>
                      {[
                        { id:"kyc",      label:"KYC / Verification", icon:"🪪" },
                        { id:"billing",  label:"Billing / Payment",  icon:"💳" },
                        { id:"account",  label:"Account / Profile",  icon:"👤" },
                        { id:"intro",    label:"Intros / Matching",  icon:"🤝" },
                        { id:"docs",     label:"Documents / Data Room", icon:"📂" },
                        { id:"other",    label:"Other",               icon:"💬" },
                      ].map(cat=>(
                        <button key={cat.id} onClick={()=>setCategory(cat.id)}
                          style={{ padding:"10px 8px", borderRadius:11,
                            border:`1.5px solid ${category===cat.id?C.teal:C.border}`,
                            background:category===cat.id?C.tealDim:"#fff",
                            cursor:"pointer", fontFamily:"inherit", textAlign:"center",
                            transition:"all 0.15s" }}>
                          <div style={{ fontSize:18, marginBottom:4 }}>{cat.icon}</div>
                          <div style={{ fontSize:11, fontWeight:700, color:category===cat.id?C.teal:C.text, lineHeight:1.3 }}>{cat.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                  <FInput label="Subject *" value={subject} onChange={e=>setSubject(e.target.value)} placeholder="Briefly describe your issue"/>
                  <div>
                    <label style={{ display:"block", fontSize:12, fontWeight:700, color:C.muted,
                      marginBottom:6, textTransform:"uppercase", letterSpacing:"0.05em" }}>Priority</label>
                    <div style={{ display:"flex", gap:8 }}>
                      {[["low","Low","🟢"],["medium","Medium","🟡"],["high","High","🔴"]].map(([id,label,dot])=>(
                        <button key={id} onClick={()=>{}}
                          style={{ flex:1, padding:"8px", borderRadius:9, border:`1px solid ${C.border}`,
                            background:"#fff", cursor:"pointer", fontFamily:"inherit",
                            fontSize:12, fontWeight:600, color:C.muted,
                            display:"flex", alignItems:"center", justifyContent:"center", gap:5 }}>
                          {dot} {label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <FInput label="Message *" rows={4} value={message} onChange={e=>setMessage(e.target.value)}
                    placeholder="Describe your issue in detail. Include any error messages, screenshots, or steps to reproduce..."/>
                  <div style={{ padding:"10px 14px", borderRadius:10, background:C.offWhite,
                    fontSize:12, color:C.muted, display:"flex", alignItems:"flex-start", gap:8 }}>
                    <span style={{ flexShrink:0 }}>💡</span>
                    <span>For faster resolution, include your user ID, the date of the issue, and any relevant screenshots.</span>
                  </div>
                  <Btn v="primary" full onClick={handleSubmit}>Submit Ticket</Btn>
                </div>
          )}

          {/* MY TICKETS */}
          {tab==="tickets" && (
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {myTickets.map(t=>{
                const ss = STATUS_STYLE[t.status];
                const ps = PRIORITY_STYLE[t.priority];
                return (
                  <div key={t.id} style={{ padding:16, borderRadius:14,
                    border:`1.5px solid ${t.unread?C.tealBd:C.border}`,
                    background:t.unread?"rgba(31,163,163,0.03)":"#fff",
                    cursor:"pointer", transition:"box-shadow 0.15s" }}
                    onMouseEnter={e=>e.currentTarget.style.boxShadow="0 4px 16px rgba(0,0,0,0.07)"}
                    onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
                    <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:8, marginBottom:8 }}>
                      <div>
                        <div style={{ fontWeight:700, fontSize:14, color:C.text, marginBottom:3 }}>{t.subject}</div>
                        <div style={{ fontSize:11, color:C.muted }}>{t.id} · Opened {t.created}</div>
                      </div>
                      {t.unread && <span style={{ width:8, height:8, borderRadius:4, background:C.teal, flexShrink:0, marginTop:4 }}/>}
                    </div>
                    <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
                      <span style={{ padding:"3px 9px", borderRadius:99, fontSize:11, fontWeight:700,
                        background:ss.bg, color:ss.color }}>{ss.label}</span>
                      <span style={{ fontSize:11, fontWeight:700, color:ps.color }}>● {ps.label} priority</span>
                      <span style={{ fontSize:11, color:C.muted, marginLeft:"auto" }}>Last reply {t.lastReply}</span>
                    </div>
                    {t.status !== "resolved" && (
                      <div style={{ marginTop:10, paddingTop:10, borderTop:`1px solid ${C.slateXL}`,
                        display:"flex", gap:8 }}>
                        <input placeholder="Add a reply..."
                          style={{ flex:1, padding:"7px 11px", borderRadius:8, border:`1px solid ${C.border}`,
                            fontSize:13, fontFamily:"inherit", outline:"none", color:C.text }}
                          onFocus={e=>e.target.style.borderColor=C.teal}
                          onBlur={e=>e.target.style.borderColor=C.border}/>
                        <Btn v="primary" sz="sm" onClick={()=>toast("Reply sent","success")}>Send</Btn>
                      </div>
                    )}
                  </div>
                );
              })}
              <Btn v="secondary" full onClick={()=>setTab("new")}>+ New Ticket</Btn>
            </div>
          )}

          {/* FAQs */}
          {tab==="faq" && (
            <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
              <p style={{ fontSize:13, color:C.muted, marginBottom:12, lineHeight:1.6 }}>
                Most issues are answered here. Can't find what you need? Raise a ticket.
              </p>
              {faqs.map((faq,i)=>(
                <div key={i} style={{ borderRadius:12, border:`1px solid ${faqOpen===i?C.tealBd:C.border}`,
                  background:faqOpen===i?"rgba(31,163,163,0.03)":"#fff",
                  marginBottom:8, overflow:"hidden", transition:"all 0.2s" }}>
                  <button onClick={()=>setFaqOpen(faqOpen===i?null:i)}
                    style={{ width:"100%", padding:"14px 16px", background:"none", border:"none",
                      cursor:"pointer", fontFamily:"inherit", textAlign:"left",
                      display:"flex", alignItems:"center", justifyContent:"space-between", gap:12 }}>
                    <span style={{ fontSize:14, fontWeight:600, color:C.text, flex:1 }}>{faq.q}</span>
                    <span style={{ fontSize:18, color:faqOpen===i?C.teal:C.muted, transition:"transform 0.2s",
                      transform:faqOpen===i?"rotate(45deg)":"rotate(0deg)", flexShrink:0 }}>+</span>
                  </button>
                  {faqOpen===i && (
                    <div style={{ padding:"0 16px 14px", fontSize:13, color:C.muted, lineHeight:1.7 }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
              <div style={{ marginTop:8, padding:"14px 16px", borderRadius:12,
                background:"rgba(99,102,241,0.05)", border:"1px solid rgba(99,102,241,0.15)",
                textAlign:"center" }}>
                <div style={{ fontSize:13, fontWeight:600, color:"#6366F1", marginBottom:4 }}>Still stuck?</div>
                <div style={{ fontSize:12, color:C.muted, marginBottom:10 }}>Our team is here to help</div>
                <div style={{ display:"flex", gap:8, justifyContent:"center" }}>
                  <Btn v="secondary" sz="sm" onClick={()=>setTab("new")}>Raise Ticket</Btn>
                  <Btn v="primary" sz="sm" onClick={()=>setTab("chat")}>Live Chat</Btn>
                </div>
              </div>
            </div>
          )}

          {/* LIVE CHAT */}
          {tab==="chat" && (
            <div style={{ display:"flex", flexDirection:"column", height:"100%", minHeight:340 }}>
              <div style={{ flex:1, display:"flex", flexDirection:"column", gap:10, marginBottom:14, overflowY:"auto" }}>
                {chatHistory.map((m,i)=>(
                  <div key={i} style={{ display:"flex", justifyContent:m.from==="user"?"flex-end":"flex-start" }}>
                    <div style={{ maxWidth:"78%", padding:"10px 14px", borderRadius:14,
                      borderBottomRightRadius:m.from==="user"?4:14,
                      borderBottomLeftRadius:m.from==="bot"?4:14,
                      background:m.from==="user"?C.teal:"#fff",
                      border:m.from==="bot"?`1px solid ${C.border}`:"none",
                      fontSize:13, color:m.from==="user"?"#fff":C.text, lineHeight:1.55 }}>
                      {m.from==="bot" && (
                        <div style={{ fontSize:10, fontWeight:700, color:"#6366F1", marginBottom:4 }}>
                          🎧 FundLink Support
                        </div>
                      )}
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display:"flex", gap:8, borderTop:`1px solid ${C.border}`, paddingTop:14, flexShrink:0 }}>
                <input value={chatMsg} onChange={e=>setChatMsg(e.target.value)}
                  onKeyDown={e=>e.key==="Enter"&&sendChat()}
                  placeholder="Type a message..."
                  style={{ flex:1, padding:"10px 14px", borderRadius:10, border:`1.5px solid ${C.border}`,
                    fontSize:13, fontFamily:"inherit", outline:"none", color:C.text }}
                  onFocus={e=>e.target.style.borderColor=C.teal}
                  onBlur={e=>e.target.style.borderColor=C.border}/>
                <button onClick={sendChat}
                  style={{ width:42, height:42, borderRadius:10, background:C.teal, border:"none",
                    cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <Icon d={I.send} size={16} style={{ color:"#fff" }}/>
                </button>
              </div>
              <p style={{ fontSize:11, color:C.muted, textAlign:"center", marginTop:8 }}>
                🤖 AI assistant · Human agents available Mon–Sat, 9am–7pm IST
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};


const NotificationsPage = ({ nav }) => {
  const [notifs,    setNotifs]    = useState(INIT_NOTIFS);
  const [filter,    setFilter]    = useState("all");
  const [prefOpen,  setPrefOpen]  = useState(false);
  const [prefs,     setPrefs]     = useState({ intro:true, dataroom:true, event:true, message:true, system:true, email:true, push:true });

  const markAllRead  = () => setNotifs(p=>p.map(n=>({...n,unread:false})));
  const markRead     = id => setNotifs(p=>p.map(n=>n.id===id?{...n,unread:false}:n));
  const deleteNotif  = id => setNotifs(p=>p.filter(n=>n.id!==id));
  const clearAll     = ()  => setNotifs([]);
  const togglePref   = k  => setPrefs(p=>({...p,[k]:!p[k]}));

  const unreadCount = notifs.filter(n=>n.unread).length;
  const catIcon  = c => c==="intro"?"🤝":c==="dataroom"?"🔐":c==="event"?"📅":c==="message"?"💬":"🔔";
  const catLabel = c => c==="intro"?"Intro":c==="dataroom"?"Data Room":c==="event"?"Event":c==="message"?"Message":"System";
  const catColor = c => c==="intro"?C.teal:c==="dataroom"?"#6366F1":c==="event"?C.amber:c==="message"?"#ec4899":C.muted;

  const filtered = filter==="all" ? notifs
    : filter==="unread" ? notifs.filter(n=>n.unread)
    : notifs.filter(n=>n.cat===filter);

  const chips = [
    {id:"all",     label:`All (${notifs.length})`},
    {id:"unread",  label:`Unread${unreadCount>0?` (${unreadCount})`:""}`},
    {id:"intro",   label:"Intros"},
    {id:"dataroom",label:"Data Room"},
    {id:"event",   label:"Events"},
    {id:"message", label:"Messages"},
    {id:"system",  label:"System"},
  ];

  // Group by date roughly
  const grouped = filtered.reduce((acc, n) => {
    const g = n.time.includes("ago") && (n.time.includes("m ago")||n.time.includes("h ago")) ? "Today"
            : n.time.includes("1d")||n.time.includes("2d") ? "Yesterday"
            : "Earlier";
    if(!acc[g]) acc[g]=[];
    acc[g].push(n);
    return acc;
  }, {});

  const Toggle = ({ on, onClick }) => (
    <div onClick={onClick} style={{ width:40,height:22,borderRadius:11,background:on?C.teal:C.slateXL,position:"relative",cursor:"pointer",flexShrink:0,transition:"background 0.2s" }}>
      <div style={{ position:"absolute",top:2,left:on?20:2,width:18,height:18,borderRadius:9,background:"#fff",transition:"left 0.2s",boxShadow:"0 1px 3px rgba(0,0,0,0.15)" }}/>
    </div>
  );

  return (
    <div style={{ background:C.offWhite,minHeight:"100vh" }}>
      <TopBar title="Notifications" onMenu={()=>{}} nav={nav}/>
      <div style={{ maxWidth:620,margin:"0 auto",padding:"20px 16px 80px" }}>

        {/* Header */}
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20 }}>
          <div>
            <h1 style={{ fontSize:22,fontWeight:800,color:C.text,letterSpacing:"-0.02em",marginBottom:4 }}>Notifications</h1>
            <p style={{ fontSize:13,color:C.muted }}>{unreadCount>0?`${unreadCount} unread · `:""}{notifs.length} total</p>
          </div>
          <div style={{ display:"flex",gap:8 }}>
            {unreadCount>0 && <Btn v="secondary" sz="sm" onClick={markAllRead}>Mark all read</Btn>}
            <Btn v="secondary" sz="sm" onClick={()=>setPrefOpen(true)}>⚙ Preferences</Btn>
          </div>
        </div>

        {/* Filter chips */}
        <div style={{ display:"flex",gap:6,marginBottom:20,overflowX:"auto",paddingBottom:4 }}>
          {chips.map(f=>(
            <button key={f.id} onClick={()=>setFilter(f.id)}
              style={{ padding:"7px 14px",borderRadius:99,border:`1.5px solid ${filter===f.id?C.teal:C.border}`,background:filter===f.id?C.tealDim:"#fff",color:filter===f.id?C.teal:C.muted,fontSize:12,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap",fontFamily:"inherit",transition:"all 0.15s",flexShrink:0 }}>
              {f.label}
            </button>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length===0 ? (
          <EmptyState
            icon={filter==="unread"?"🎉":"📭"}
            title={filter==="unread"?"You're all caught up!":"Nothing here yet."}
            body={filter==="unread"?"No unread notifications — you're on top of everything.":"Notifications about intros, events, and data room activity will appear here."}
            compact
          />
        ) : (
          <div>
            {Object.entries(grouped).map(([group, items])=>(
              <div key={group} style={{ marginBottom:24 }}>
                <div style={{ fontSize:11,fontWeight:700,color:C.muted,letterSpacing:"0.07em",textTransform:"uppercase",marginBottom:10 }}>{group}</div>
                <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
                  {items.map(n=>(
                    <div key={n.id} style={{ background:"#fff",borderRadius:14,border:`1.5px solid ${n.unread?C.tealBd:C.border}`,overflow:"hidden",transition:"border-color 0.15s" }}>
                      <div style={{ display:"flex",gap:14,padding:"16px 18px",alignItems:"flex-start" }}>
                        {/* Icon */}
                        <div style={{ width:44,height:44,borderRadius:13,background:n.unread?`${catColor(n.cat)}18`:C.offWhite,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0 }}>
                          {catIcon(n.cat)}
                        </div>
                        <div style={{ flex:1,minWidth:0 }}>
                          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8,marginBottom:4 }}>
                            <div style={{ fontWeight:n.unread?700:600,fontSize:14,color:C.text }}>{n.title}</div>
                            <div style={{ display:"flex",alignItems:"center",gap:6,flexShrink:0 }}>
                              {n.unread && <div style={{ width:8,height:8,borderRadius:4,background:C.teal }}/>}
                              <span style={{ fontSize:11,color:C.muted,whiteSpace:"nowrap" }}>{n.time}</span>
                            </div>
                          </div>
                          <div style={{ fontSize:13,color:C.muted,lineHeight:1.55,marginBottom:10 }}>{n.body}</div>
                          <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8 }}>
                            <span style={{ display:"inline-flex",alignItems:"center",padding:"3px 10px",borderRadius:99,background:`${catColor(n.cat)}14`,color:catColor(n.cat),fontSize:11,fontWeight:700 }}>
                              {catLabel(n.cat)}
                            </span>
                            {n.action && (
                              <button onClick={()=>nav(n.action.route)}
                                style={{ padding:"5px 12px",borderRadius:8,border:`1px solid ${C.teal}`,background:C.tealDim,color:C.teal,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit",transition:"all 0.15s" }}>
                                {n.action.label} →
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                      {/* Action bar */}
                      <div style={{ display:"flex",borderTop:`1px solid ${C.slateXL}`,background:C.offWhite }}>
                        {n.unread && (
                          <button onClick={()=>markRead(n.id)}
                            style={{ flex:1,padding:"9px",background:"none",border:"none",borderRight:`1px solid ${C.border}`,cursor:"pointer",fontSize:12,fontWeight:600,color:C.teal,fontFamily:"inherit" }}>
                            Mark as read
                          </button>
                        )}
                        <button onClick={()=>deleteNotif(n.id)}
                          style={{ flex:1,padding:"9px",background:"none",border:"none",cursor:"pointer",fontSize:12,fontWeight:600,color:C.muted,fontFamily:"inherit" }}>
                          Dismiss
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div style={{ marginTop:8,textAlign:"center" }}>
              <button onClick={clearAll} style={{ background:"none",border:"none",cursor:"pointer",fontSize:13,color:C.muted,fontFamily:"inherit",padding:8 }}>Clear all notifications</button>
            </div>
          </div>
        )}
      </div>

      {/* Preferences Modal */}
      <Modal open={prefOpen} onClose={()=>setPrefOpen(false)} title="Notification Preferences">
        <div style={{ display:"flex",flexDirection:"column",gap:0 }}>
          <div style={{ fontSize:11,fontWeight:700,color:C.muted,letterSpacing:"0.07em",textTransform:"uppercase",marginBottom:10 }}>Notify me about</div>
          {[
            {key:"intro",    label:"Intro requests & responses",  icon:"🤝"},
            {key:"dataroom", label:"Data room activity",          icon:"🔐"},
            {key:"event",    label:"Event reminders & updates",   icon:"📅"},
            {key:"message",  label:"New messages",                icon:"💬"},
            {key:"system",   label:"Platform updates & system",   icon:"🔔"},
          ].map((p,i,arr)=>(
            <div key={p.key} style={{ display:"flex",alignItems:"center",gap:12,padding:"13px 0",borderBottom:i<arr.length-1?`1px solid ${C.slateXL}`:"none" }}>
              <span style={{ fontSize:20 }}>{p.icon}</span>
              <span style={{ flex:1,fontSize:14,color:C.text }}>{p.label}</span>
              <Toggle on={prefs[p.key]} onClick={()=>togglePref(p.key)}/>
            </div>
          ))}
          <div style={{ fontSize:11,fontWeight:700,color:C.muted,letterSpacing:"0.07em",textTransform:"uppercase",margin:"16px 0 10px" }}>Delivery</div>
          {[
            {key:"email", label:"Email notifications", icon:"📧"},
            {key:"push",  label:"Push notifications",  icon:"📱"},
          ].map((p,i,arr)=>(
            <div key={p.key} style={{ display:"flex",alignItems:"center",gap:12,padding:"13px 0",borderBottom:i<arr.length-1?`1px solid ${C.slateXL}`:"none" }}>
              <span style={{ fontSize:20 }}>{p.icon}</span>
              <span style={{ flex:1,fontSize:14,color:C.text }}>{p.label}</span>
              <Toggle on={prefs[p.key]} onClick={()=>togglePref(p.key)}/>
            </div>
          ))}
          <div style={{ marginTop:20 }}>
            <Btn v="primary" full onClick={()=>setPrefOpen(false)}>Save Preferences</Btn>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// ─── SHARED HOOKS ────────────────────────────────────────────────────────────
const useIsMobile = (bp=768) => {
  const [mobile, setMobile] = useState(typeof window!=="undefined"?window.innerWidth<bp:false);
  useEffect(()=>{
    const fn=()=>setMobile(window.innerWidth<bp);
    fn();
    window.addEventListener("resize",fn);
    return ()=>window.removeEventListener("resize",fn);
  },[bp]);
  return mobile;
};

// ─── TOPBAR ───────────────────────────────────────────────────────────────────
const TopBar = ({ title, onMenu, dark=false, nav, onHelp }) => {
  const [notifOpen, setNotifOpen] = useState(false);
  const ref = useRef(null);
  const unread = INIT_NOTIFS.filter(n=>n.unread).length;

  useEffect(()=>{
    const fn = e=>{ if(ref.current && !ref.current.contains(e.target)) setNotifOpen(false); };
    document.addEventListener("mousedown",fn);
    return ()=>document.removeEventListener("mousedown",fn);
  },[]);

  const bg = dark ? C.navy : "#fff";
  const tc = dark ? "rgba(255,255,255,0.7)" : C.muted;
  const titleC = dark ? "#fff" : C.text;
  const bd = dark ? "rgba(255,255,255,0.08)" : C.border;

  return (
    <div style={{ height:60,background:bg,borderBottom:`1px solid ${bd}`,
      display:"flex",alignItems:"center",padding:"0 20px",
      position:"sticky",top:0,zIndex:100,boxShadow:"0 1px 0 rgba(0,0,0,0.05)" }}>
      <button onClick={onMenu} style={{ background:"none",border:"none",cursor:"pointer",
        padding:4,color:tc,marginRight:14,display:"flex",alignItems:"center" }}>
        <Icon d={I.menu} size={22}/>
      </button>
      <div style={{ flex:1,fontWeight:700,fontSize:16,color:titleC,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",marginRight:8 }}>{title}</div>
      <div style={{ display:"flex",alignItems:"center",gap:6 }}>
        {nav && <button onClick={()=>nav("search")}
          style={{ background:"transparent",border:`1px solid transparent`,borderRadius:10,width:38,height:38,
            display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:tc,transition:"all 0.15s" }}
          onMouseEnter={e=>{e.currentTarget.style.background="rgba(31,163,163,0.1)";e.currentTarget.style.borderColor=C.tealBd;e.currentTarget.style.color=C.teal;}}
          onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.borderColor="transparent";e.currentTarget.style.color=tc;}}>
          <Icon d={I.search} size={18}/>
        </button>}
        {onHelp && <button onClick={onHelp}
          title="Help & Support"
          style={{ background:"transparent",border:`1px solid transparent`,borderRadius:10,width:38,height:38,
            display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",
            color:tc,fontSize:15,fontWeight:700,fontFamily:"inherit",transition:"all 0.15s" }}
          onMouseEnter={e=>{e.currentTarget.style.background="rgba(99,102,241,0.1)";e.currentTarget.style.borderColor="rgba(99,102,241,0.25)";e.currentTarget.style.color="#6366F1";}}
          onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.borderColor="transparent";e.currentTarget.style.color=tc;}}>
          ?
        </button>}
        <div ref={ref} style={{ position:"relative" }}>
          <button onClick={()=>setNotifOpen(p=>!p)}
            style={{ background:notifOpen?"rgba(31,163,163,0.12)":"transparent",
              border:`1px solid ${notifOpen?C.tealBd:"transparent"}`,
              borderRadius:10,width:38,height:38,display:"flex",alignItems:"center",
              justifyContent:"center",cursor:"pointer",color:notifOpen?C.teal:tc,
              position:"relative",transition:"all 0.15s" }}>
            <Icon d={I.bell} size={18}/>
            {unread>0 && <span style={{ position:"absolute",top:7,right:7,width:7,height:7,
              borderRadius:4,background:C.teal,border:"2px solid "+bg }}/>}
          </button>
          {notifOpen && <NotifDropdown onClose={()=>setNotifOpen(false)} nav={nav||((r)=>{})}/>}
        </div>
        <Avatar name="User" size={32}/>
      </div>
    </div>
  );
};

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────
const Sidebar = ({ nav, active, onSelect, role, open, onClose, onSignOut }) => (
  <>
    {open && <div onClick={onClose} style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:198 }}/>}
    <div style={{ position:"fixed",left:open?0:-280,top:0,bottom:0,width:260,
      background:C.navy,borderRight:"1px solid rgba(255,255,255,0.07)",
      display:"flex",flexDirection:"column",transition:"left 0.26s ease",zIndex:199 }}>
      <div style={{ padding:"20px 20px 16px",borderBottom:"1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ display:"flex",alignItems:"center",gap:9,marginBottom:6 }}>
          <div style={{ width:30,height:30,borderRadius:8,background:C.teal,
            display:"flex",alignItems:"center",justifyContent:"center" }}>
            <Icon d={I.link} size={15} sw={2.5}/>
          </div>
          <span style={{ color:"#fff",fontWeight:800,fontSize:18,letterSpacing:"-0.02em" }}>
            Fund<span style={{ color:C.teal }}>Link</span>
          </span>
        </div>
        <div style={{ fontSize:10,color:"rgba(255,255,255,0.28)",letterSpacing:"0.1em",textTransform:"uppercase",paddingLeft:2 }}>{role}</div>
      </div>
      <div style={{ flex:1,overflowY:"auto",padding:"10px 10px" }}>
        {nav.map(item=>{
          const active_ = active===item.id;
          return (
            <div key={item.id} onClick={()=>{onSelect(item.id);onClose();}}
              style={{ display:"flex",alignItems:"center",gap:11,padding:"10px 14px",
                borderRadius:10,cursor:"pointer",marginBottom:2,
                background:active_?"rgba(31,163,163,0.15)":"transparent",
                color:active_?C.teal:"rgba(255,255,255,0.55)",
                fontWeight:active_?600:400,fontSize:14,transition:"all 0.15s" }}
              onMouseEnter={e=>{ if(!active_) e.currentTarget.style.background="rgba(255,255,255,0.06)"; }}
              onMouseLeave={e=>{ if(!active_) e.currentTarget.style.background="transparent"; }}>
              <Icon d={I[item.icon]} size={17} sw={active_?2:1.8}/>
              <span style={{ flex:1 }}>{item.label}</span>
              {item.badge && <span style={{ background:C.teal,color:"#fff",fontSize:10,fontWeight:700,
                padding:"1px 6px",borderRadius:999 }}>{item.badge}</span>}
            </div>
          );
        })}
      </div>
      <div style={{ padding:"12px 10px",borderTop:"1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ display:"flex",alignItems:"center",gap:11,padding:"10px 14px",
          borderRadius:10,cursor:"pointer",color:"rgba(255,255,255,0.4)",fontSize:14 }}
          onClick={()=>{ onClose(); onSignOut&&onSignOut(); }}>
          <Icon d={I.logout} size={17}/>Sign out
        </div>
      </div>
    </div>
  </>
);

// ─── BOTTOM NAV ───────────────────────────────────────────────────────────────
const BottomNav = ({ nav, active, onSelect }) => {
  const mobile = useIsMobile(900);
  if(!mobile) return null;
  return (
    <div style={{ position:"fixed",bottom:0,left:0,right:0,height:64,background:"rgba(255,255,255,0.96)",
      backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",
      borderTop:`1px solid ${C.border}`,display:"flex",zIndex:100,
      boxShadow:"0 -2px 20px rgba(0,0,0,0.08)" }}>
      {nav.slice(0,5).map(item=>{
        const on = active===item.id;
        return (
          <button key={item.id} onClick={()=>onSelect(item.id)}
            style={{ flex:1,display:"flex",flexDirection:"column",alignItems:"center",
              justifyContent:"center",gap:3,background:"none",border:"none",
              cursor:"pointer",transition:"color 0.15s",position:"relative",
              color:on?C.teal:C.slate,paddingBottom:4 }}>
            <div style={{ width:42,height:32,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:12,
              background:on?C.tealDim:"transparent",transition:"background 0.15s" }}>
              <Icon d={I[item.icon]} size={20} sw={on?2.2:1.8}/>
              {item.badge && <span style={{ position:"absolute",top:4,right:"50%",marginRight:-22,background:C.teal,color:"#fff",fontSize:8,fontWeight:800,padding:"1px 4px",borderRadius:999,minWidth:14,textAlign:"center" }}>{item.badge}</span>}
            </div>
            <span style={{ fontSize:9,fontWeight:on?700:500,letterSpacing:"0.02em",textTransform:"uppercase" }}>
              {item.short||item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

// ─── PAGES ───────────────────────────────────────────────────────────────────

// LANDING
const Landing = ({ nav }) => {
  const [scrolled,  setScrolled]  = useState(false);
  const [faqOpen,   setFaqOpen]   = useState(null);
  const [roleTab,   setRoleTab]   = useState("founder");

  useEffect(()=>{
    const fn = ()=>setScrolled(window.scrollY>20);
    window.addEventListener("scroll",fn);
    return ()=>window.removeEventListener("scroll",fn);
  },[]);

  const events=[
    {name:"Delhi Demo Day",       org:"Startup India",  date:"Mar 15",  type:"Demo Day",    loc:"New Delhi",  spots:4},
    {name:"Mumbai Pitch Night",   org:"TiE Mumbai",     date:"Mar 22",  type:"Pitch Event", loc:"Mumbai",     spots:2},
    {name:"Bangalore VC Connect", org:"NASSCOM",        date:"Apr 1",   type:"Meetup",      loc:"Bengaluru",  spots:18},
    {name:"Hyderabad Funding Fair",org:"T-Hub",         date:"Apr 8",   type:"Demo Day",    loc:"Hyderabad",  spots:7},
  ];

  const faqs = [
    {q:"Is FundLink free to use?",           a:"We offer a free Starter plan for founders to create a profile and browse events. Paid plans (Pro, Growth, Enterprise) unlock investor introductions, data room access, and analytics."},
    {q:"How does the intro request process work?", a:"You browse verified investor profiles, send a structured intro request, and if the investor accepts, you're connected via our messaging system. No cold outreach — every intro is warm and opt-in."},
    {q:"How long does KYC verification take?",a:"KYC is typically completed within 24-48 hours on business days. Once verified, your profile becomes visible to the full investor network."},
    {q:"Can investors access my data room without permission?",a:"No. Your data room is private by default. Investors must request access, and you must explicitly approve each person. NDA signing can be required before access is granted."},
    {q:"What types of startups are on FundLink?",a:"We work with early-stage Indian startups from Pre-Seed through Series A, across sectors including FinTech, CleanTech, HealthTech, EdTech, AgriTech, SaaS, and more."},
    {q:"Is FundLink available outside India?",a:"Our primary focus is India-based startups and NRI/global investors interested in the Indian ecosystem. We're expanding to SEA markets in 2026."},
  ];

  const liveActivity = [
    "Ananya K. from Sequoia viewed GreenTech's pitch deck",
    "MediAI raised a Series A intro request",
    "Delhi Demo Day — 4 spots remaining",
    "Rajiv M. from Blume accepted an intro with FinEase",
    "EduNation joined and completed KYC verification",
    "New data room request: AgriLink ← Kalaari Capital",
  ];

  const featuredStartups = [
    {name:"GreenTech Solutions", sector:"CleanTech",  raise:"₹2.5 Cr", stage:"Seed",        growth:"28% MoM", verified:true,  color:C.teal},
    {name:"MediAI",              sector:"HealthTech", raise:"₹5 Cr",   stage:"Pre-Series A", growth:"41% MoM", verified:true,  color:"#6366F1"},
    {name:"FinEase",             sector:"FinTech",    raise:"₹15 Cr",  stage:"Series A",     growth:"22% MoM", verified:true,  color:C.green},
    {name:"EduNation",           sector:"EdTech",     raise:"₹80L",    stage:"Pre-Seed",     growth:"55% MoM", verified:true,  color:C.amber},
  ];

  const roleFeatures = {
    founder:  { color:C.teal,   icon:I.trending, cta:"Start Fundraising",  pts:["Verified profile visible to 340+ investors","Structured intro request system","Secure data room with NDA workflows","Apply to curated demo days & pitch events","Track investor engagement in real-time","AI-powered investor matching by sector & stage"] },
    investor: { color:"#6366F1",icon:I.star,     cta:"Access Deal Flow",   pts:["Curated deal flow filtered by sector & stage","Warm intro system — no cold outreach","NDA-protected data room access","Attend exclusive founder pitch sessions","Portfolio tracking & analytics","Verified founder network — every profile KYC'd"] },
    partner:  { color:C.amber,  icon:I.building, cta:"Join as Partner",    pts:["Host and manage events end-to-end","Cohort management and application tools","Access to 1,200+ verified founders","Analytics dashboard for event performance","Co-branding and featured listing opportunities","Direct founder introductions for accelerator intake"] },
  };

  const Star = () => <svg width={13} height={13} viewBox="0 0 24 24" fill={C.amber}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>;

  return (
    <div style={{ background:C.offWhite,minHeight:"100vh" }}>
      {/* Navbar */}
      <nav style={{ position:"sticky",top:0,zIndex:50,background:scrolled?"rgba(11,28,45,0.97)":C.navy,backdropFilter:"blur(8px)",transition:"all 0.2s",borderBottom:scrolled?"1px solid rgba(255,255,255,0.08)":"none" }}>
        <div style={{ maxWidth:1100,margin:"0 auto",padding:"0 20px",height:64,display:"flex",alignItems:"center" }}>
          <div style={{ flex:1,display:"flex",alignItems:"center",gap:9 }}>
            <div style={{ width:30,height:30,borderRadius:8,background:C.teal,display:"flex",alignItems:"center",justifyContent:"center" }}>
              <Icon d={I.link} size={14} sw={2.5}/>
            </div>
            <span style={{ color:"#fff",fontWeight:800,fontSize:19,letterSpacing:"-0.03em" }}>Fund<span style={{ color:C.teal }}>Link</span></span>
          </div>
          <div style={{ display:"flex",gap:6,alignItems:"center" }}>
            <Btn v="ghost" sz="sm" onClick={()=>{ document.getElementById("how-it-works")?.scrollIntoView({behavior:"smooth"}); }}>How it works</Btn>
            <Btn v="ghost" sz="sm" onClick={()=>{ document.getElementById("events-section")?.scrollIntoView({behavior:"smooth"}); }}>Events</Btn>
            <Btn v="ghost" sz="sm" onClick={()=>nav("pricing")}>Pricing</Btn>
            <Btn v="ghost" sz="sm" onClick={()=>nav("login")}>Sign In</Btn>
            <Btn v="primary" sz="sm" onClick={()=>nav("role")}>Join Free →</Btn>
          </div>
        </div>
      </nav>

      {/* Live activity ticker */}
      <div style={{ background:"rgba(31,163,163,0.08)",borderBottom:`1px solid rgba(31,163,163,0.15)`,padding:"9px 0",overflow:"hidden" }}>
        <div style={{ display:"flex",gap:0,animation:"ticker 28s linear infinite",whiteSpace:"nowrap" }}>
          {[...liveActivity,...liveActivity].map((a,i)=>(
            <span key={i} style={{ display:"inline-flex",alignItems:"center",gap:6,padding:"0 28px",fontSize:12,color:C.teal,fontWeight:500 }}>
              <span style={{ width:6,height:6,borderRadius:3,background:C.teal,display:"inline-block",flexShrink:0,animation:"pulse 2s ease-in-out infinite" }}/>
              {a}
            </span>
          ))}
        </div>
        <style>{`@keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}} @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}} @keyframes spin{to{transform:rotate(360deg)}} *{-webkit-tap-highlight-color:transparent;box-sizing:border-box} input,button,textarea,select{font-family:inherit}`}</style>
      </div>

      {/* Hero */}
      <div style={{ background:`linear-gradient(160deg, ${C.navy} 0%, #0d2235 60%, #0b1c2d 100%)`,padding:"80px 20px 88px",position:"relative",overflow:"hidden" }}>
        {/* Subtle grid background */}
        <div style={{ position:"absolute",inset:0,opacity:0.04,backgroundImage:"linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)",backgroundSize:"40px 40px",pointerEvents:"none" }}/>
        <div style={{ maxWidth:720,margin:"0 auto",textAlign:"center",position:"relative" }}>
          {/* Trust pill */}
          <div style={{ display:"inline-flex",alignItems:"center",gap:8,padding:"6px 16px",borderRadius:999,background:"rgba(31,163,163,0.12)",border:`1px solid ${C.tealBd}`,marginBottom:28 }}>
            <div style={{ display:"flex",gap:2 }}>{[...Array(5)].map((_,i)=><Star key={i}/>)}</div>
            <span style={{ fontSize:12,color:"rgba(255,255,255,0.7)",fontWeight:500 }}>Trusted by 1,200+ startups across India</span>
          </div>
          <h1 style={{ color:"#fff",fontSize:"clamp(2.2rem,6vw,3.6rem)",fontWeight:800,lineHeight:1.08,letterSpacing:"-0.03em",marginBottom:22 }}>
            Where Indian Startups<br/>Meet <span style={{ color:C.teal,position:"relative" }}>Capital.</span>
          </h1>
          <p style={{ color:"rgba(255,255,255,0.55)",fontSize:"clamp(15px,2.5vw,18px)",lineHeight:1.7,marginBottom:38,maxWidth:520,margin:"0 auto 38px" }}>
            India's curated founder-investor network. Verified profiles, structured deal flow, and premium pitch event infrastructure.
          </p>
          <div style={{ display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap",marginBottom:44 }}>
            <Btn v="primary" sz="lg" onClick={()=>nav("role")}>Join FundLink Free →</Btn>
            <Btn v="ghost" sz="lg" onClick={()=>document.getElementById("how-it-works")?.scrollIntoView({behavior:"smooth"})}>See How It Works</Btn>
          </div>
          {/* Trust badges */}
          <div style={{ display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap" }}>
            {[{d:I.shield,t:"KYC Verified Network"},{d:I.calendar,t:"85+ Events/Year"},{d:I.link,t:"Warm Intro System"},{d:I.bar,t:"Real-time Analytics"}].map(b=>(
              <div key={b.t} style={{ display:"flex",alignItems:"center",gap:7,padding:"7px 14px",borderRadius:10,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.09)",color:"rgba(255,255,255,0.6)",fontSize:12,fontWeight:500 }}>
                <Icon d={b.d} size={13}/>{b.t}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ background:C.navyM,padding:"30px 20px" }}>
        <div style={{ maxWidth:700,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:16,textAlign:"center" }}>
          {[["1,200+","Startups"],["340+","Investors"],["₹2,500 Cr+","Capital Connected"],["94%","Intro Success"]].map(([n,l])=>(
            <div key={l}>
              <div style={{ color:C.teal,fontSize:"clamp(1.2rem,3.5vw,1.7rem)",fontWeight:800,letterSpacing:"-0.02em" }}>{n}</div>
              <div style={{ color:"rgba(255,255,255,0.38)",fontSize:11,marginTop:3 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Press / as seen in */}
      <div style={{ background:"#fff",padding:"32px 20px",borderBottom:`1px solid ${C.border}` }}>
        <div style={{ maxWidth:900,margin:"0 auto",textAlign:"center" }}>
          <div style={{ fontSize:11,fontWeight:700,color:C.muted,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:20 }}>As seen in</div>
          <div style={{ display:"flex",gap:28,justifyContent:"center",alignItems:"center",flexWrap:"wrap" }}>
            {["YourStory","Inc42","The Ken","Economic Times","Mint","TechCrunch India"].map(p=>(
              <div key={p} style={{ fontSize:14,fontWeight:800,color:"#ccc",letterSpacing:"-0.02em",transition:"color 0.15s",cursor:"default" }}
                onMouseEnter={e=>e.currentTarget.style.color=C.text}
                onMouseLeave={e=>e.currentTarget.style.color="#ccc"}>
                {p}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div id="how-it-works" style={{ padding:"72px 20px",background:C.offWhite }}>
        <div style={{ maxWidth:1060,margin:"0 auto" }}>
          <div style={{ textAlign:"center",marginBottom:44 }}>
            <Badge>How It Works</Badge>
            <h2 style={{ fontSize:"clamp(1.5rem,4vw,2.2rem)",fontWeight:800,color:C.text,marginTop:12,letterSpacing:"-0.02em" }}>Four steps to your next deal</h2>
            <p style={{ fontSize:15,color:C.muted,marginTop:10,maxWidth:460,margin:"10px auto 0" }}>From signup to funded in weeks, not months.</p>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:16 }}>
            {[
              {n:"01",t:"Create Profile",    d:"Build a verified startup or investor profile in minutes. KYC approval in 24-48h.",       icon:I.users,   color:C.teal},
              {n:"02",t:"Get Matched",       d:"Our AI engine matches you with the right investors based on sector, stage, and goals.", icon:I.star,    color:"#6366F1"},
              {n:"03",t:"Request Intros",    d:"Send structured warm introductions — no cold emails, no spam. Investors opt-in.",        icon:I.link,    color:"#EC4899"},
              {n:"04",t:"Meet & Close",      d:"Attend curated demo days, share NDA-protected data rooms, and close your round.",       icon:I.trending,color:C.green},
            ].map((s,i)=>(
              <div key={s.n} style={{ padding:24,borderRadius:16,background:"#fff",border:`1px solid ${C.border}`,position:"relative",transition:"all 0.2s" }}
                onMouseEnter={e=>{ e.currentTarget.style.borderColor=s.color+"55"; e.currentTarget.style.boxShadow=`0 8px 28px ${s.color}14`; }}
                onMouseLeave={e=>{ e.currentTarget.style.borderColor=C.border; e.currentTarget.style.boxShadow="none"; }}>
                <div style={{ position:"absolute",top:20,right:20,fontSize:28,fontWeight:800,color:`${s.color}20`,letterSpacing:"-0.02em" }}>{s.n}</div>
                <div style={{ width:46,height:46,borderRadius:13,background:`${s.color}18`,display:"flex",alignItems:"center",justifyContent:"center",color:s.color,marginBottom:16 }}>
                  <Icon d={s.icon} size={22}/>
                </div>
                <h3 style={{ fontSize:15,fontWeight:700,color:C.text,marginBottom:8 }}>{s.t}</h3>
                <p style={{ fontSize:13,color:C.muted,lineHeight:1.7 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Role feature tabs */}
      <div style={{ background:"#fff",padding:"72px 20px" }}>
        <div style={{ maxWidth:960,margin:"0 auto" }}>
          <div style={{ textAlign:"center",marginBottom:36 }}>
            <Badge v="indigo">For Every Role</Badge>
            <h2 style={{ fontSize:"clamp(1.5rem,4vw,2.2rem)",fontWeight:800,color:C.text,marginTop:12,letterSpacing:"-0.02em" }}>Built for founders, investors, and partners</h2>
          </div>
          {/* Tab switcher */}
          <div style={{ display:"flex",gap:4,marginBottom:32,background:C.slateXL,padding:4,borderRadius:14,maxWidth:400,margin:"0 auto 32px" }}>
            {[["founder","🚀 Founders"],["investor","💼 Investors"],["partner","🤝 Partners"]].map(([id,label])=>(
              <button key={id} onClick={()=>setRoleTab(id)}
                style={{ flex:1,padding:"9px 6px",borderRadius:10,border:"none",cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:13,transition:"all 0.15s",background:roleTab===id?"#fff":"transparent",color:roleTab===id?C.text:C.muted,boxShadow:roleTab===id?"0 1px 4px rgba(0,0,0,0.1)":"none" }}>
                {label}
              </button>
            ))}
          </div>
          {/* Feature list */}
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:16,alignItems:"center" }}>
            <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
              {roleFeatures[roleTab].pts.map((pt,i)=>(
                <div key={i} style={{ display:"flex",alignItems:"center",gap:12,padding:"12px 16px",borderRadius:12,background:C.offWhite,border:`1px solid ${C.border}`,transition:"all 0.15s" }}
                  onMouseEnter={e=>{ e.currentTarget.style.borderColor=roleFeatures[roleTab].color+"55"; e.currentTarget.style.background=`${roleFeatures[roleTab].color}08`; }}
                  onMouseLeave={e=>{ e.currentTarget.style.borderColor=C.border; e.currentTarget.style.background=C.offWhite; }}>
                  <div style={{ width:24,height:24,borderRadius:12,background:`${roleFeatures[roleTab].color}18`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                    <Icon d={I.check} size={11} sw={3} style={{ color:roleFeatures[roleTab].color }}/>
                  </div>
                  <span style={{ fontSize:13,color:C.text,fontWeight:500 }}>{pt}</span>
                </div>
              ))}
            </div>
            {/* CTA card */}
            <div style={{ padding:32,borderRadius:18,background:C.navy,textAlign:"center",border:`1px solid rgba(255,255,255,0.07)` }}>
              <div style={{ width:56,height:56,borderRadius:16,background:`${roleFeatures[roleTab].color}22`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 18px",color:roleFeatures[roleTab].color }}>
                <Icon d={roleFeatures[roleTab].icon} size={26}/>
              </div>
              <div style={{ color:"#fff",fontWeight:800,fontSize:18,marginBottom:8 }}>
                {roleTab==="founder"?"Ready to fundraise?":roleTab==="investor"?"Find your next deal":"Grow your network?"}
              </div>
              <div style={{ color:"rgba(255,255,255,0.45)",fontSize:13,lineHeight:1.7,marginBottom:24 }}>
                {roleTab==="founder"?"Join 1,200+ founders who found investors on FundLink.":roleTab==="investor"?"Access curated deal flow from 1,200+ verified startups.":"Connect with India's most active founder community."}
              </div>
              <button onClick={()=>nav("role")}
                style={{ width:"100%",padding:"13px",borderRadius:11,background:roleFeatures[roleTab].color,color:"#fff",fontWeight:700,fontSize:14,border:"none",cursor:"pointer",fontFamily:"inherit" }}>
                {roleFeatures[roleTab].cta} →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Startups */}
      <div style={{ background:C.offWhite,padding:"72px 20px" }}>
        <div style={{ maxWidth:1060,margin:"0 auto" }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:32,flexWrap:"wrap",gap:12 }}>
            <div>
              <Badge v="teal">Spotlight</Badge>
              <h2 style={{ fontSize:"clamp(1.4rem,3.5vw,2rem)",fontWeight:800,color:C.text,marginTop:12,letterSpacing:"-0.02em" }}>Featured Startups</h2>
              <p style={{ fontSize:14,color:C.muted,marginTop:6 }}>Verified founders actively raising right now.</p>
            </div>
            <Btn v="secondary" sz="sm" onClick={()=>nav("signup")}>Browse All Startups →</Btn>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:16 }}>
            {featuredStartups.map(s=>(
              <div key={s.name} style={{ padding:22,borderRadius:16,background:"#fff",border:`1px solid ${C.border}`,cursor:"pointer",transition:"all 0.18s" }}
                onMouseEnter={e=>{ e.currentTarget.style.borderColor=s.color+"55"; e.currentTarget.style.boxShadow=`0 8px 28px ${s.color}14`; e.currentTarget.style.transform="translateY(-2px)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.borderColor=C.border; e.currentTarget.style.boxShadow="none"; e.currentTarget.style.transform="translateY(0)"; }}
                onClick={()=>nav("signup")}>
                <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:16 }}>
                  <Avatar name={s.name} size={44}/>
                  <div>
                    <div style={{ display:"flex",alignItems:"center",gap:5,marginBottom:2 }}>
                      <span style={{ fontWeight:700,fontSize:14,color:C.text }}>{s.name}</span>
                      {s.verified && <VBadge/>}
                    </div>
                    <span style={{ fontSize:12,color:C.muted }}>{s.sector}</span>
                  </div>
                </div>
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:16 }}>
                  {[["Raising",s.raise],["Stage",s.stage],["Growth",s.growth]].map(([l,v])=>(
                    <div key={l} style={{ padding:"8px 10px",borderRadius:9,background:C.offWhite,textAlign:"center" }}>
                      <div style={{ fontSize:12,fontWeight:700,color:C.text }}>{v}</div>
                      <div style={{ fontSize:10,color:C.muted }}>{l}</div>
                    </div>
                  ))}
                </div>
                <button onClick={e=>{ e.stopPropagation(); nav("signup"); }}
                  style={{ width:"100%",padding:"9px",borderRadius:9,background:`${s.color}14`,border:`1px solid ${s.color}44`,color:s.color,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit" }}>
                  Request Intro →
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div style={{ background:"#fff",padding:"72px 20px" }}>
        <div style={{ maxWidth:1060,margin:"0 auto" }}>
          <div style={{ textAlign:"center",marginBottom:44 }}>
            <Badge v="amber">Testimonials</Badge>
            <h2 style={{ fontSize:"clamp(1.5rem,4vw,2.2rem)",fontWeight:800,color:C.text,marginTop:12,letterSpacing:"-0.02em" }}>What our members say</h2>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:20 }}>
            {[
              {q:"FundLink connected us with the right investors in weeks. The data room and intro system saved us months of networking.",name:"Priya Sharma",role:"CEO, GreenTech Solutions",color:C.teal,raised:"Raised ₹2.5 Cr Seed"},
              {q:"The quality of deal flow is exceptional. Every startup is KYC-verified and the matching is genuinely intelligent.",name:"Arjun Mehta",role:"Partner, TechBridge Capital",color:"#6366F1",raised:"40+ portfolio checks"},
              {q:"Hosting our demo day through FundLink tripled our applicant quality and halved our admin time.",name:"Sunita Nair",role:"Director, NASSCOM Foundation",color:C.amber,raised:"12 events hosted"},
              {q:"Got 6 investor intro requests in our first week. Closed our round 3 months faster than expected.",name:"Vikram Rao",role:"Founder, MediAI",color:C.green,raised:"Raised ₹5 Cr Series A"},
            ].map((t,i)=>(
              <Card key={i} style={{ padding:24 }}>
                <div style={{ display:"flex",gap:2,marginBottom:14 }}>{[...Array(5)].map((_,j)=><Star key={j}/>)}</div>
                <p style={{ fontSize:14,color:C.text,lineHeight:1.75,marginBottom:14,fontStyle:"italic" }}>"{t.q}"</p>
                <div style={{ display:"inline-flex",padding:"4px 10px",borderRadius:99,background:`${t.color}14`,color:t.color,fontSize:11,fontWeight:700,marginBottom:16 }}>{t.raised}</div>
                <div style={{ display:"flex",alignItems:"center",gap:11,paddingTop:14,borderTop:`1px solid ${C.border}` }}>
                  <div style={{ width:38,height:38,borderRadius:19,background:t.color+"22",display:"flex",alignItems:"center",justifyContent:"center",color:t.color,fontWeight:800,fontSize:14,flexShrink:0 }}>{t.name[0]}</div>
                  <div>
                    <div style={{ fontWeight:700,fontSize:14,color:C.text }}>{t.name}</div>
                    <div style={{ fontSize:12,color:C.muted }}>{t.role}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div id="events-section" style={{ padding:"72px 20px",background:C.offWhite }}>
        <div style={{ maxWidth:1060,margin:"0 auto" }}>
          <div style={{ display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:32,flexWrap:"wrap",gap:12 }}>
            <div>
              <Badge v="green">Events</Badge>
              <h2 style={{ fontSize:"clamp(1.4rem,3.5vw,2rem)",fontWeight:800,color:C.text,marginTop:12,letterSpacing:"-0.02em" }}>Upcoming Events</h2>
              <p style={{ fontSize:14,color:C.muted,marginTop:6 }}>85+ events a year. Find your next pitch moment.</p>
            </div>
            <Btn v="secondary" sz="sm" onClick={()=>nav("signup")}>View All Events →</Btn>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:16 }}>
            {events.map(ev=>(
              <Card key={ev.name} style={{ padding:22,cursor:"pointer",transition:"all 0.18s" }}
                onMouseEnter={e=>{ e.currentTarget.style.boxShadow="0 8px 28px rgba(0,0,0,0.08)"; e.currentTarget.style.transform="translateY(-2px)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.boxShadow="none"; e.currentTarget.style.transform="translateY(0)"; }}
                onClick={()=>nav("signup")}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14 }}>
                  <Badge v={ev.type==="Demo Day"?"teal":ev.type==="Meetup"?"green":"amber"}>{ev.type}</Badge>
                  <span style={{ fontSize:12,color:C.muted,fontWeight:600 }}>{ev.date}</span>
                </div>
                <h3 style={{ fontSize:15,fontWeight:700,color:C.text,marginBottom:4 }}>{ev.name}</h3>
                <p style={{ fontSize:12,color:C.muted,marginBottom:14 }}>{ev.org} · {ev.loc}</p>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14 }}>
                  <span style={{ fontSize:11,color:ev.spots<=4?C.red:C.muted,fontWeight:ev.spots<=4?700:400 }}>
                    {ev.spots<=4?`⚠️ Only ${ev.spots} spots left`:`${ev.spots} spots remaining`}
                  </span>
                </div>
                <Btn v="primary" sz="sm" full onClick={()=>nav("signup")}>Apply Now</Btn>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div style={{ background:"#fff",padding:"72px 20px" }}>
        <div style={{ maxWidth:720,margin:"0 auto" }}>
          <div style={{ textAlign:"center",marginBottom:44 }}>
            <Badge v="slate">FAQ</Badge>
            <h2 style={{ fontSize:"clamp(1.5rem,4vw,2.2rem)",fontWeight:800,color:C.text,marginTop:12,letterSpacing:"-0.02em" }}>Frequently asked questions</h2>
            <p style={{ fontSize:15,color:C.muted,marginTop:10 }}>Everything you need to know before joining.</p>
          </div>
          <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
            {faqs.map((f,i)=>(
              <div key={i} style={{ borderRadius:13,border:`1.5px solid ${faqOpen===i?C.teal:C.border}`,overflow:"hidden",transition:"border-color 0.2s" }}>
                <div onClick={()=>setFaqOpen(faqOpen===i?null:i)}
                  style={{ padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",background:faqOpen===i?C.tealDim:"#fff",transition:"background 0.15s" }}>
                  <span style={{ fontWeight:600,fontSize:14,color:C.text,flex:1,paddingRight:16 }}>{f.q}</span>
                  <div style={{ width:22,height:22,borderRadius:11,background:faqOpen===i?C.teal:C.offWhite,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all 0.2s" }}>
                    <Icon d={I.chevR} size={12} sw={2.5} style={{ color:faqOpen===i?"#fff":C.muted,transform:faqOpen===i?"rotate(270deg)":"rotate(90deg)",transition:"transform 0.2s" }}/>
                  </div>
                </div>
                {faqOpen===i && (
                  <div style={{ padding:"14px 20px 18px",borderTop:`1px solid ${C.tealBd}`,background:"#fafefe" }}>
                    <p style={{ fontSize:14,color:C.muted,lineHeight:1.75,margin:0 }}>{f.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div style={{ textAlign:"center",marginTop:32 }}>
            <span style={{ fontSize:14,color:C.muted }}>Still have questions?{" "}</span>
            <span style={{ fontSize:14,color:C.teal,fontWeight:600,cursor:"pointer" }}>Contact us →</span>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div style={{ background:`linear-gradient(135deg,${C.navy} 0%,#0d2235 100%)`,padding:"80px 20px",textAlign:"center",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",inset:0,opacity:0.03,backgroundImage:"linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)",backgroundSize:"40px 40px",pointerEvents:"none" }}/>
        <div style={{ position:"relative",maxWidth:600,margin:"0 auto" }}>
          <div style={{ fontSize:42,marginBottom:16 }}>🚀</div>
          <h2 style={{ color:"#fff",fontSize:"clamp(1.6rem,4vw,2.4rem)",fontWeight:800,marginBottom:14,letterSpacing:"-0.02em" }}>Ready to accelerate your journey?</h2>
          <p style={{ color:"rgba(255,255,255,0.45)",fontSize:16,marginBottom:36,lineHeight:1.7 }}>
            Join 1,200+ founders and 340+ investors already building India's next unicorns on FundLink.
          </p>
          <div style={{ display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap",marginBottom:24 }}>
            <Btn v="primary" sz="lg" onClick={()=>nav("role")}>Get Started — It's Free →</Btn>
            <Btn v="ghost" sz="lg" onClick={()=>nav("pricing")}>View Pricing</Btn>
          </div>
          <div style={{ fontSize:13,color:"rgba(255,255,255,0.3)" }}>No credit card required · Free plan available · Setup in 5 minutes</div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background:C.navyL,borderTop:"1px solid rgba(255,255,255,0.07)",padding:"52px 20px 32px" }}>
        <div style={{ maxWidth:1060,margin:"0 auto" }}>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:36,marginBottom:48 }}>
            <div>
              <div style={{ display:"flex",alignItems:"center",gap:9,marginBottom:14 }}>
                <div style={{ width:28,height:28,borderRadius:7,background:C.teal,display:"flex",alignItems:"center",justifyContent:"center" }}>
                  <Icon d={I.link} size={13} sw={2.5}/>
                </div>
                <span style={{ color:"#fff",fontWeight:800,fontSize:17,letterSpacing:"-0.02em" }}>Fund<span style={{ color:C.teal }}>Link</span></span>
              </div>
              <p style={{ fontSize:13,color:"rgba(255,255,255,0.35)",lineHeight:1.7,maxWidth:200 }}>India's premium startup-investor network. Where capital meets ambition.</p>
              <div style={{ display:"flex",gap:8,marginTop:16 }}>
                {[["X","#"],["in","#"],["YT","#"]].map(([s,url])=>(
                  <div key={s} style={{ width:32,height:32,borderRadius:8,background:"rgba(255,255,255,0.06)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"rgba(255,255,255,0.45)",fontSize:12,fontWeight:700 }}
                    onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.12)"}
                    onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.06)"}>
                    {s}
                  </div>
                ))}
              </div>
            </div>
            {[
              {h:"Product",   links:["Features","Pricing","Events","How It Works","Changelog"]},
              {h:"Company",   links:["About Us","Careers","Blog","Press Kit","Contact"]},
              {h:"Resources", links:["Documentation","API Reference","Status","Privacy Policy","Terms of Service"]},
            ].map(col=>(
              <div key={col.h}>
                <div style={{ fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.28)",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:14 }}>{col.h}</div>
                {col.links.map(l=>(
                  <div key={l} style={{ fontSize:13,color:"rgba(255,255,255,0.42)",marginBottom:10,cursor:"pointer",transition:"color 0.15s" }}
                    onMouseEnter={e=>e.currentTarget.style.color="rgba(255,255,255,0.8)"}
                    onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.42)"}>
                    {l}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop:"1px solid rgba(255,255,255,0.07)",paddingTop:24,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12 }}>
            <span style={{ fontSize:12,color:"rgba(255,255,255,0.25)" }}>© 2026 FundLink Technologies Pvt. Ltd. All rights reserved.</span>
            <div style={{ display:"flex",gap:20 }}>
              {["Privacy","Terms","Cookies"].map(l=>(
                <span key={l} style={{ fontSize:12,color:"rgba(255,255,255,0.25)",cursor:"pointer" }}
                  onMouseEnter={e=>e.currentTarget.style.color="rgba(255,255,255,0.6)"}
                  onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.25)"}>
                  {l}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <MobileCtaBar onClick={()=>nav("role")}/>
    </div>
  );
};

const MobileCtaBar = ({ onClick }) => {
  const [mobile, setMobile] = useState(false);
  useEffect(()=>{
    const fn=()=>setMobile(window.innerWidth<640);
    fn();
    window.addEventListener("resize",fn);
    return ()=>window.removeEventListener("resize",fn);
  },[]);
  if(!mobile) return null;
  return (
    <div style={{ position:"fixed",bottom:0,left:0,right:0,padding:"12px 20px 20px",
      background:"rgba(255,255,255,0.96)",backdropFilter:"blur(8px)",
      borderTop:`1px solid ${C.border}`,zIndex:50 }}>
      <Btn v="primary" sz="lg" full onClick={onClick}>Join FundLink</Btn>
    </div>
  );
};

// ROLE SELECT
const RoleSelect = ({ nav }) => {
  const roles = [
    { id:"founder", icon:I.trending, label:"Join as Founder", desc:"Get discovered by top investors. Build your verified profile and apply to curated events.", color:C.teal },
    { id:"investor", icon:I.star, label:"Join as Investor", desc:"Access structured deal flow. Browse vetted startups and request warm introductions.", color:"#6366F1" },
    { id:"partner", icon:I.building, label:"Ecosystem Partner", desc:"Host events, manage cohorts, and connect founders with the right investors.", color:C.amber },
  ];
  return (
    <div style={{ minHeight:"100vh",background:C.navy,display:"flex",alignItems:"center",
      justifyContent:"center",padding:24 }}>
      <div style={{ maxWidth:460,width:"100%" }}>
        <div style={{ textAlign:"center",marginBottom:36 }}>
          <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:9,marginBottom:22 }}>
            <div style={{ width:34,height:34,borderRadius:9,background:C.teal,
              display:"flex",alignItems:"center",justifyContent:"center" }}>
              <Icon d={I.link} size={17} sw={2.5}/>
            </div>
            <span style={{ color:"#fff",fontWeight:800,fontSize:22,letterSpacing:"-0.03em" }}>
              Fund<span style={{ color:C.teal }}>Link</span>
            </span>
          </div>
          <h1 style={{ color:"#fff",fontSize:26,fontWeight:800,marginBottom:8,letterSpacing:"-0.02em" }}>Join FundLink</h1>
          <p style={{ color:"rgba(255,255,255,0.45)",fontSize:15 }}>Select your role to get started.</p>
        </div>
        <div style={{ display:"flex",flexDirection:"column",gap:12,marginBottom:20 }}>
          {roles.map(r=>(
            <RoleCard key={r.id} r={r} onClick={()=>nav("signup")}/>
          ))}
        </div>
        <div style={{ textAlign:"center" }}>
          <span onClick={()=>nav("adminLogin")} style={{ color:"rgba(255,255,255,0.25)",fontSize:13,
            cursor:"pointer",textDecoration:"underline" }}>Admin Login</span>
        </div>
      </div>
    </div>
  );
};

const RoleCard = ({ r, onClick }) => {
  const [hov, setHov] = useState(false);
  return (
    <div onClick={onClick}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ padding:20,borderRadius:14,cursor:"pointer",
        background:hov?"rgba(255,255,255,0.09)":"rgba(255,255,255,0.05)",
        border:`1.5px solid ${hov?r.color+"55":"rgba(255,255,255,0.1)"}`,
        display:"flex",gap:14,alignItems:"center",transition:"all 0.18s" }}>
      <div style={{ width:44,height:44,borderRadius:12,flexShrink:0,
        background:r.color+"22",display:"flex",alignItems:"center",
        justifyContent:"center",color:r.color }}>
        <Icon d={r.icon} size={20}/>
      </div>
      <div style={{ flex:1 }}>
        <div style={{ color:"#fff",fontWeight:700,fontSize:15,marginBottom:3 }}>{r.label}</div>
        <div style={{ color:"rgba(255,255,255,0.42)",fontSize:13,lineHeight:1.5 }}>{r.desc}</div>
      </div>
      <Icon d={I.chevR} size={17} sw={1.8} style={{ color:"rgba(255,255,255,0.3)" }}/>
    </div>
  );
};

// FOUNDER DASHBOARD
const FounderDash = ({ nav }) => {
  const [sidebar, setSidebar] = useState(false);
  const [page, setPage] = useState("home");
  const [verificationStatus, setVerificationStatus] = useState("pending"); // "pending"|"approved"|"none"
  const [deckModal, setDeckModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [supportOpen, setSupportOpen] = useState(false);
  const toast = useToast();
  useEffect(()=>{ const t=setTimeout(()=>setLoading(false),700); return ()=>clearTimeout(t); },[]);
  const [deckUploaded, setDeckUploaded] = useState(false);
  const [deckName, setDeckName] = useState("");
  const [checklistDismissed, setChecklistDismissed] = useState(false);
  const [checklistDone, setChecklistDone] = useState({profile:false,deck:false,dataroom:false,event:false,notifs:true});

  const navItems = [
    {id:"home",     icon:"home",     label:"Dashboard", short:"Home"},
    {id:"events",   icon:"calendar", label:"Events",    short:"Events"},
    {id:"intros",   icon:"link",     label:"Intros",    short:"Intros",  badge:"3"},
    {id:"messages", icon:"bell",     label:"Messages",  short:"Msgs",    badge:"2"},
    {id:"docs",     icon:"upload",   label:"Documents", short:"Docs"},
    {id:"profile",  icon:"users",    label:"Profile",   short:"Profile"},
    {id:"gear",     icon:"gear",     label:"Settings",  short:"Settings"},
  ];

  const introReqs = [
    {name:"Arjun Mehta",   org:"TechBridge Capital",       time:"2h ago", st:"pending"},
    {name:"Priya Sharma",  org:"Sequoia India",             time:"1d ago", st:"accepted"},
    {name:"Rohan Gupta",   org:"Kalaari Capital",           time:"2d ago", st:"pending"},
  ];
  const upcomingEvs = [
    {name:"Delhi Demo Day",     date:"Mar 15", type:"Demo Day"},
    {name:"Mumbai Pitch Night", date:"Mar 22", type:"Pitch Event"},
  ];

  const content = {
    home: (
      <div style={{ padding:20,maxWidth:660,margin:"0 auto" }}>
        <div style={{ marginBottom:20 }}>
          <div style={{ display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:12,flexWrap:"wrap" }}>
            <div>
              <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:4 }}>
                <h1 style={{ fontSize:22,fontWeight:800,color:C.text,margin:0,letterSpacing:"-0.02em" }}>Hi Rahul,</h1>
                {verificationStatus==="approved" && <VBadge/>}
              </div>
              <p style={{ color:C.muted,fontSize:14,margin:0 }}>Your startup journey continues. Here's what's happening.</p>
            </div>
          </div>
        </div>

        {/* Verification banner */}
        {verificationStatus==="pending" && (
          <div style={{ padding:"14px 16px",borderRadius:13,marginBottom:16,
            background:"rgba(245,158,11,0.08)",border:"1px solid rgba(245,158,11,0.25)",
            display:"flex",alignItems:"center",gap:12 }}>
            <div style={{ width:36,height:36,borderRadius:18,background:"rgba(245,158,11,0.15)",
              display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
              <Icon d={I.shield} size={18} sw={1.8} style={{ color:C.amber }}/>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:13,fontWeight:700,color:"#92400E",marginBottom:2 }}>Verification Pending</div>
              <div style={{ fontSize:12,color:"#B45309",lineHeight:1.5 }}>Your identity is under review. Full profile visibility unlocks once approved — usually within 24-48 hours.</div>
            </div>
            <button onClick={()=>setVerificationStatus("approved")}
              style={{ fontSize:11,fontWeight:700,padding:"5px 12px",borderRadius:8,border:"1px solid rgba(245,158,11,0.4)",background:"rgba(245,158,11,0.12)",color:"#92400E",cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap" }}>
              Simulate Approve
            </button>
          </div>
        )}

        {/* Onboarding Checklist */}
        {!checklistDismissed && (
          <div style={{ borderRadius:14,border:`1.5px solid ${C.tealBd}`,background:"rgba(31,163,163,0.04)",marginBottom:16,overflow:"hidden" }}>
            <div style={{ padding:"14px 18px",borderBottom:`1px solid ${C.slateXL}`,display:"flex",alignItems:"center",justifyContent:"space-between" }}>
              <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                <div style={{ display:"flex",gap:3 }}>
                  {Object.values(checklistDone).map((done,i)=>(
                    <div key={i} style={{ width:8,height:8,borderRadius:4,background:done?C.teal:C.slateXL,transition:"background 0.2s" }}/>
                  ))}
                </div>
                <span style={{ fontWeight:700,fontSize:14,color:C.text }}>
                  Get started · {Object.values(checklistDone).filter(Boolean).length}/{Object.values(checklistDone).length} done
                </span>
              </div>
              <button onClick={()=>setChecklistDismissed(true)} style={{ background:"none",border:"none",cursor:"pointer",color:C.muted,fontSize:16,padding:4 }}>×</button>
            </div>
            <div style={{ padding:"4px 0" }}>
              {[
                {key:"profile",  icon:"✏️", label:"Complete your startup profile",      cta:"Edit Profile",  fn:()=>setPage("profile")},
                {key:"deck",     icon:"📄", label:"Upload your pitch deck",             cta:"Go to Docs",    fn:()=>setPage("docs")},
                {key:"dataroom", icon:"🔐", label:"Set up your data room",              cta:"Open Data Room",fn:()=>setPage("docs")},
                {key:"event",    icon:"📅", label:"Register for an upcoming event",     cta:"Browse Events", fn:()=>setPage("events")},
                {key:"notifs",   icon:"🔔", label:"Enable email notifications",         cta:"Settings",      fn:()=>setPage("gear")},
              ].map((item,i,arr)=>(
                <div key={item.key} style={{ display:"flex",alignItems:"center",gap:12,padding:"11px 18px",borderBottom:i<arr.length-1?`1px solid ${C.slateXL}`:"none",opacity:checklistDone[item.key]?0.5:1,transition:"opacity 0.2s" }}>
                  <div onClick={()=>setChecklistDone(p=>{ const next=!p[item.key]; if(next) toast(item.label+" ✓","success"); return {...p,[item.key]:next}; })}
                    style={{ width:20,height:20,borderRadius:10,border:`2px solid ${checklistDone[item.key]?C.teal:C.border}`,background:checklistDone[item.key]?C.teal:"transparent",flexShrink:0,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s" }}>
                    {checklistDone[item.key]&&<Icon d={I.check} size={10} sw={3} style={{ color:"#fff" }}/>}
                  </div>
                  <span style={{ fontSize:14 }}>{item.icon}</span>
                  <span style={{ flex:1,fontSize:13,fontWeight:500,color:C.text,textDecoration:checklistDone[item.key]?"line-through":"none" }}>{item.label}</span>
                  {!checklistDone[item.key] && (
                    <button onClick={item.fn} style={{ padding:"5px 12px",borderRadius:8,border:`1px solid ${C.teal}`,background:C.tealDim,color:C.teal,fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap" }}>{item.cta}</button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Stats Row */}
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(100px,1fr))",gap:10,marginBottom:14 }}>
          {[
            {v:"3",   l:"New Intros",   c:C.teal,    fn:()=>setPage("intros")},
            {v:"72%", l:"Profile",      c:C.purple,  fn:()=>setPage("profile")},
            {v:"2",   l:"Events",       c:C.amber,   fn:()=>setPage("events")},
          ].map(({v,l,c,fn})=>(
            <Card key={l} style={{ padding:"14px 12px",textAlign:"center",cursor:"pointer" }} onClick={fn}>
              <div style={{ fontSize:22,fontWeight:800,color:c,letterSpacing:"-0.02em" }}>{v}</div>
              <div style={{ fontSize:11,color:C.muted,marginTop:3,fontWeight:600 }}>{l}</div>
            </Card>
          ))}
        </div>

        {/* Profile Progress */}
        <Card style={{ padding:20,marginBottom:14 }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12 }}>
            <div>
              <div style={{ fontWeight:700,fontSize:15,color:C.text }}>Profile Completion</div>
              <div style={{ fontSize:13,color:C.muted,marginTop:2 }}>Complete to get discovered by investors</div>
            </div>
            <span style={{ fontSize:24,fontWeight:800,color:C.teal }}>72%</span>
          </div>
          <ProgressBar value={72}/>
          <div style={{ display:"flex",gap:8,marginTop:14,flexWrap:"wrap" }}>
            {[
              {t:"+ Add team members",  fn:()=>setPage("profile")},
              {t:"+ Upload pitch deck", fn:()=>setDeckModal(true)},
              {t:"+ Add traction",      fn:()=>setPage("profile")},
            ].map(({t,fn})=>(
              <div key={t} onClick={fn} style={{ fontSize:11,color:C.muted,padding:"4px 10px",
                borderRadius:7,background:C.slateXL,cursor:"pointer",transition:"all 0.15s" }}
                onMouseEnter={e=>{ e.currentTarget.style.background=C.tealDim; e.currentTarget.style.color=C.teal; }}
                onMouseLeave={e=>{ e.currentTarget.style.background=C.slateXL; e.currentTarget.style.color=C.muted; }}>
                {t}
              </div>
            ))}
          </div>
        </Card>

        {/* Funding Card */}
        <Card style={{ padding:20,marginBottom:14,background:C.navy }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14 }}>
            <div>
              <div style={{ fontSize:11,color:"rgba(255,255,255,0.38)",fontWeight:700,
                letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:5 }}>Funding Ask</div>
              <div style={{ color:"#fff",fontSize:28,fontWeight:800,letterSpacing:"-0.02em" }}>₹2.5 Cr</div>
            </div>
            <Badge v="teal">Seed Stage</Badge>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(100px,1fr))",gap:10 }}>
            {[["₹18L","MRR"],["2.4K","Users"],["28%","Growth"]].map(([v,l])=>(
              <div key={l} style={{ textAlign:"center",padding:"10px 8px",borderRadius:10,
                background:"rgba(255,255,255,0.07)" }}>
                <div style={{ color:C.teal,fontWeight:800,fontSize:16 }}>{v}</div>
                <div style={{ color:"rgba(255,255,255,0.38)",fontSize:11,marginTop:2 }}>{l}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Activity Feed */}
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12 }}>
          <h2 style={{ fontSize:16,fontWeight:700,color:C.text }}>Recent Activity</h2>
        </div>
        <div style={{ display:"flex",flexDirection:"column",gap:1,marginBottom:14,
          border:`1px solid ${C.border}`,borderRadius:14,overflow:"hidden",background:C.card }}>
          {[
            {icon:I.link,     iconC:C.teal,   title:"Arjun Mehta sent you an intro request",      sub:"TechBridge Capital | 2h ago",      action:"View", fn:()=>setPage("intros")},
            {icon:I.calendar, iconC:C.amber,  title:"Delhi Demo Day registration confirmed",       sub:"Mar 15 | Startup India",           action:"Details", fn:()=>setPage("events")},
            {icon:I.eye,      iconC:C.purple, title:"Your profile was viewed 12 times this week",  sub:"3 new bookmarks from investors",   action:null, fn:null},
            {icon:I.check,    iconC:C.green,  title:"Priya Sharma accepted your intro",            sub:"Sequoia India | 1d ago",           action:"Reply", fn:()=>setPage("intros")},
            {icon:I.upload,   iconC:C.blue,   title:"Pitch deck upload recommended",               sub:"Investors want to see your deck",  action:"Upload", fn:()=>setDeckModal(true)},
          ].map((a,i)=>(
            <div key={i} style={{ display:"flex",alignItems:"center",gap:12,padding:"13px 16px",
              borderBottom:i<4?`1px solid ${C.border}`:"none",transition:"background 0.15s",cursor:a.fn?"pointer":"default" }}
              onMouseEnter={e=>{ if(a.fn) e.currentTarget.style.background=C.offWhite; }}
              onMouseLeave={e=>{ e.currentTarget.style.background="#fff"; }}
              onClick={a.fn||undefined}>
              <div style={{ width:36,height:36,borderRadius:10,display:"flex",alignItems:"center",
                justifyContent:"center",background:`rgba(${a.iconC===C.teal?"31,163,163":a.iconC===C.purple?"139,92,246":a.iconC===C.amber?"245,158,11":a.iconC===C.green?"16,185,129":"59,130,246"},0.12)`,flexShrink:0 }}>
                <Icon d={a.icon} size={16} style={{ color:a.iconC }}/>
              </div>
              <div style={{ flex:1,minWidth:0 }}>
                <div style={{ fontSize:13,fontWeight:600,color:C.text,lineHeight:1.4 }}>{a.title}</div>
                <div style={{ fontSize:11,color:C.muted,marginTop:2 }}>{a.sub}</div>
              </div>
              {a.action && (
                <Btn v="secondary" sz="sm" onClick={e=>{ e.stopPropagation(); a.fn&&a.fn(); }}>{a.action}</Btn>
              )}
            </div>
          ))}
        </div>

        {/* Upcoming Events */}
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12 }}>
          <h2 style={{ fontSize:16,fontWeight:700,color:C.text }}>Upcoming Events</h2>
          <Btn v="secondary" sz="sm" onClick={()=>setPage("events")}>View All</Btn>
        </div>
        <div style={{ display:"flex",flexDirection:"column",gap:10,marginBottom:90 }}>
          {upcomingEvs.map((ev,i)=>(
            <Card key={i} style={{ padding:"13px 16px" }}>
              <div style={{ display:"flex",alignItems:"center",gap:11 }}>
                <div style={{ width:44,height:44,borderRadius:11,background:C.tealDim,
                  display:"flex",alignItems:"center",justifyContent:"center",color:C.teal,flexShrink:0 }}>
                  <Icon d={I.calendar} size={20}/>
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:600,fontSize:14,color:C.text }}>{ev.name}</div>
                  <div style={{ fontSize:12,color:C.muted }}>{ev.date} | {ev.type}</div>
                </div>
                <Badge v="teal">Registered</Badge>
              </div>
            </Card>
          ))}
        </div>

        {/* Upload CTA */}
        <div style={{ position:"fixed",bottom:70,left:0,right:0,padding:"0 20px 10px",
          background:"rgba(248,250,252,0.95)",backdropFilter:"blur(6px)" }}>
          <Btn full v="primary" icon="upload" onClick={()=>setDeckModal(true)}>
            {deckUploaded ? "Pitch Deck Uploaded" : "Upload Pitch Deck"}
          </Btn>
        </div>
      </div>
    ),
    profile:  <FounderProfile/>,
    events:   <EventsPage/>,
    intros:   <IntrosPage/>,
    messages: <MessagesPage/>,
    docs:     null, // handled by nav routing below
    gear:     <SettingsPage nav={nav}/>,
  };

  return (
    <div style={{ background:C.offWhite,minHeight:"100vh" }}>
      <Sidebar nav={navItems} active={page} onSelect={p=>{ if(p==="docs") nav("founderDocs"); else setPage(p); }} role="Founder" open={sidebar} onClose={()=>setSidebar(false)} onSignOut={()=>nav("landing")}/>
      <div style={{ paddingBottom:62 }}>
        <TopBar title={navItems.find(n=>n.id===page)?.label||"Dashboard"} onMenu={()=>setSidebar(true)} nav={nav} onHelp={()=>setSupportOpen(true)}/>
        {loading
          ? <div style={{ padding:20, maxWidth:660, margin:"0 auto", display:"flex", flexDirection:"column", gap:14 }}>
              <Skeleton w="55%" h={28} r={8}/>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 }}>
                <SkeletonCard rows={2}/><SkeletonCard rows={2}/><SkeletonCard rows={2}/>
              </div>
              <SkeletonCard rows={4} hasAvatar={false}/>
              <SkeletonCard rows={3} hasAvatar/>
              <SkeletonCard rows={3} hasAvatar/>
            </div>
          : (content[page]||content.home)
        }
      </div>
      <BottomNav nav={navItems} active={page} onSelect={p=>{ if(p==="docs") nav("founderDocs"); else setPage(p); }}/>

      {supportOpen && <SupportPage role="founder" onClose={()=>setSupportOpen(false)}/>}
      {/* Pitch Deck Upload Modal */}
      <Modal open={deckModal} onClose={()=>setDeckModal(false)} title="Upload Pitch Deck">
        {deckUploaded
          ? <div style={{ textAlign:"center", padding:"20px 0" }}>
              <div style={{ width:56,height:56,borderRadius:28,background:"rgba(16,185,129,0.12)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px" }}>
                <Icon d={I.check} size={26} sw={2.5} style={{ color:C.green }}/>
              </div>
              <div style={{ fontWeight:700,fontSize:17,color:C.text,marginBottom:6 }}>Pitch Deck Uploaded!</div>
              <div style={{ fontSize:13,color:C.muted,marginBottom:6 }}>{deckName||"pitch_deck.pdf"}</div>
              <div style={{ fontSize:13,color:C.muted,marginBottom:20 }}>Investors can now view your deck when you share it. You can manage sharing in your Documents.</div>
              <div style={{ display:"flex",gap:10 }}>
                <Btn v="secondary" full onClick={()=>{ setDeckModal(false); setDeckUploaded(false); }}>Replace</Btn>
                <Btn v="primary" full onClick={()=>{ setDeckModal(false); nav("founderDocs"); }}>View in Docs</Btn>
              </div>
            </div>
          : <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
              <div onClick={()=>{ const i=document.createElement('input');i.type='file';i.accept='.pdf,.pptx';i.onchange=e=>{if(e.target.files[0]){setDeckUploaded(true);setDeckName(e.target.files[0].name);}};i.click(); }} style={{ border:`2px dashed ${C.tealBd}`,borderRadius:12,padding:"32px 20px",textAlign:"center",
                cursor:"pointer",background:C.tealDim,transition:"all 0.18s" }}
                onMouseEnter={e=>e.currentTarget.style.background="rgba(31,163,163,0.12)"}
                onMouseLeave={e=>e.currentTarget.style.background=C.tealDim}>
                <Icon d={I.upload} size={32} style={{ color:C.teal,margin:"0 auto 12px" }}/>
                <div style={{ fontWeight:700,fontSize:15,color:C.text,marginBottom:4 }}>Drop file here or click to browse</div>
                <div style={{ fontSize:12,color:C.muted }}>PDF or PPTX | Max 50 MB</div>
              </div>
              <FInput label="Or paste a link (Google Slides, Notion, etc.)" placeholder="https://docs.google.com/presentation/..."/>
              <div style={{ padding:"11px 14px",borderRadius:10,background:"rgba(31,163,163,0.06)",border:`1px solid ${C.tealBd}`,fontSize:12,color:C.text }}>
                🔒 Only investors you explicitly share with can view your deck. It will not be publicly visible.
              </div>
              <Btn v="primary" full onClick={()=>{ setDeckUploaded(true); setDeckName("GreenTech_Pitch_Deck_v4.pdf"); toast("Pitch deck uploaded successfully!","success"); }}>Upload Deck</Btn>
            </div>
        }
      </Modal>
    </div>
  );
};

const FounderProfile = () => {
  const [name,      setName]      = useState("GreenTech Solutions");
  const [tagline,   setTagline]   = useState("Clean energy for emerging markets");
  const [about,     setAbout]     = useState("We build affordable solar solutions for tier-2 and tier-3 cities in India.");
  const [website,   setWebsite]   = useState("https://greentechsolutions.in");
  const [sector,    setSector]    = useState("cleantech");
  const [stage,     setStage]     = useState("seed");
  const [ask,       setAsk]       = useState("2,50,00,000");
  const [linkedin,  setLinkedin]  = useState("linkedin.com/in/rahulverma");
  const [twitter,   setTwitter]   = useState("");
  const [saveState, setSaveState] = useState("idle"); // idle | saving | saved
  const [addTeamModal, setAddTeamModal] = useState(false);
  const [team, setTeam] = useState([
    {n:"Priya Sharma", r:"CEO & Co-founder"},
    {n:"Rahul Verma",  r:"CTO"},
  ]);
  const [newMember, setNewMember] = useState({n:"", r:""});

  const handleSave = () => {
    setSaveState("saving");
    setTimeout(() => { setSaveState("saved"); setTimeout(() => setSaveState("idle"), 2200); }, 900);
  };

  const sectors = [
    {value:"cleantech",  label:"CleanTech / Energy"},
    {value:"fintech",    label:"FinTech"},
    {value:"healthtech", label:"HealthTech"},
    {value:"edtech",     label:"EdTech"},
    {value:"agritech",   label:"AgriTech"},
    {value:"saas",       label:"B2B SaaS"},
    {value:"ecomm",      label:"E-Commerce / D2C"},
    {value:"ai",         label:"AI / ML"},
    {value:"logistics",  label:"Logistics"},
    {value:"other",      label:"Other"},
  ];
  const stages = [
    {value:"idea",       label:"Idea Stage"},
    {value:"mvp",        label:"MVP / Pre-revenue"},
    {value:"pre-seed",   label:"Pre-Seed"},
    {value:"seed",       label:"Seed"},
    {value:"series-a",   label:"Series A"},
    {value:"series-b",   label:"Series B+"},
  ];

  return (
  <div style={{ padding:20,maxWidth:580,margin:"0 auto",paddingBottom:80 }}>
    {/* Header card */}
    <Card style={{ padding:24,marginBottom:14 }}>
      <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:10,marginBottom:22 }}>
        <div onClick={()=>{ const i=document.createElement("input");i.type="file";i.accept="image/*";i.click(); }} style={{ width:80,height:80,borderRadius:20,background:C.tealDim,
          border:`2px dashed ${C.tealBd}`,display:"flex",alignItems:"center",
          justifyContent:"center",cursor:"pointer",color:C.teal,position:"relative" }}
          onMouseEnter={e=>e.currentTarget.style.background="rgba(31,163,163,0.15)"}
          onMouseLeave={e=>e.currentTarget.style.background=C.tealDim}>
          <Icon d={I.upload} size={24}/>
          <div style={{ position:"absolute",bottom:-8,right:-8,width:22,height:22,borderRadius:11,
            background:C.teal,border:"2px solid #fff",display:"flex",alignItems:"center",justifyContent:"center" }}>
            <Icon d={I.plus} size={10} sw={2.5} style={{ color:"#fff" }}/>
          </div>
        </div>
        <div style={{ textAlign:"center" }}>
          <div style={{ fontWeight:700,fontSize:18,color:C.text }}>{name||"Your Startup"}</div>
          <div style={{ color:C.muted,fontSize:13,marginTop:3 }}>{tagline}</div>
          <div style={{ display:"flex",gap:8,justifyContent:"center",marginTop:8,flexWrap:"wrap" }}>
            <VBadge/>
            <Badge v="teal">{stages.find(s=>s.value===stage)?.label||"Stage"}</Badge>
            <Badge v="indigo">{sectors.find(s=>s.value===sector)?.label||"Sector"}</Badge>
          </div>
        </div>
      </div>
      <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
        <FInput label="Startup Name"  value={name}    onChange={e=>{ setName(e.target.value); setSaveState("idle"); }}/>
        <FInput label="Tagline"       value={tagline} onChange={e=>{ setTagline(e.target.value); setSaveState("idle"); }}/>
        <FInput label="About"         rows={3} value={about} onChange={e=>{ setAbout(e.target.value); setSaveState("idle"); }}/>
        <FInput label="Website"       value={website}  onChange={e=>{ setWebsite(e.target.value); setSaveState("idle"); }} placeholder="https://yourstartup.com"/>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
          <FSelect label="Sector" value={sector} onChange={e=>{ setSector(e.target.value); setSaveState("idle"); }} options={sectors}/>
          <FSelect label="Stage"  value={stage}  onChange={e=>{ setStage(e.target.value);  setSaveState("idle"); }} options={stages}/>
        </div>
      </div>
    </Card>

    {/* Traction */}
    <Card style={{ padding:20,marginBottom:14 }}>
      <h3 style={{ fontWeight:700,fontSize:15,color:C.text,marginBottom:16 }}>Traction Metrics</h3>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(100px,1fr))",gap:10,marginBottom:16 }}>
        {[["₹18L","Revenue MRR"],["2,400","Users"],["28%","MoM Growth"]].map(([v,l])=>(
          <div key={l} style={{ padding:14,borderRadius:11,background:C.offWhite,
            border:`1px solid ${C.border}`,textAlign:"center" }}>
            <div style={{ fontSize:18,fontWeight:800,color:C.teal,letterSpacing:"-0.02em" }}>{v}</div>
            <div style={{ fontSize:11,color:C.muted,marginTop:3 }}>{l}</div>
          </div>
        ))}
      </div>
      <FInput label="Funding Ask (₹)" value={ask} onChange={e=>{ setAsk(e.target.value); setSaveState("idle"); }}/>
    </Card>

    {/* Social */}
    <Card style={{ padding:20,marginBottom:14 }}>
      <h3 style={{ fontWeight:700,fontSize:15,color:C.text,marginBottom:14 }}>Social & Links</h3>
      <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
        <FInput label="LinkedIn" value={linkedin} onChange={e=>{ setLinkedin(e.target.value); setSaveState("idle"); }} placeholder="linkedin.com/in/..."/>
        <FInput label="Twitter / X (optional)" value={twitter} onChange={e=>{ setTwitter(e.target.value); setSaveState("idle"); }} placeholder="twitter.com/..."/>
      </div>
    </Card>

    {/* Team */}
    <Card style={{ padding:20,marginBottom:14 }}>
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16 }}>
        <h3 style={{ fontWeight:700,fontSize:15,color:C.text }}>Team Members</h3>
        <Btn v="secondary" sz="sm" icon="plus" onClick={()=>setAddTeamModal(true)}>Add</Btn>
      </div>
      {team.map((m,i)=>(
        <div key={i} style={{ display:"flex",alignItems:"center",gap:11,marginBottom:12 }}>
          <Avatar name={m.n} size={38}/>
          <div style={{ flex:1 }}>
            <div style={{ fontWeight:600,fontSize:14,color:C.text }}>{m.n}</div>
            <div style={{ fontSize:12,color:C.muted }}>{m.r}</div>
          </div>
          <button onClick={()=>setTeam(p=>p.filter((_,j)=>j!==i))}
            style={{ background:"none",border:"none",cursor:"pointer",color:C.slateL,padding:4,fontSize:18 }}>×</button>
        </div>
      ))}
      {team.length===0 && <div style={{ textAlign:"center",padding:"16px 0",fontSize:13,color:C.muted }}>No team members added yet.</div>}
    </Card>

    {/* Save */}
    <Btn v={saveState==="saved"?"secondary":"primary"} full onClick={handleSave} disabled={saveState==="saving"}>
      {saveState==="saving" ? "Saving..." : saveState==="saved" ? "Saved!" : "Save Profile"}
    </Btn>
    {saveState==="saved" && (
      <div style={{ textAlign:"center",fontSize:12,color:C.green,marginTop:8 }}>
        Changes saved. Profile visible to matched investors.
      </div>
    )}

    <Modal open={addTeamModal} onClose={()=>setAddTeamModal(false)} title="Add Team Member">
      <div style={{ display:"flex",flexDirection:"column",gap:13 }}>
        <FInput label="Full Name"    value={newMember.n} onChange={e=>setNewMember(p=>({...p,n:e.target.value}))}/>
        <FInput label="Role / Title" value={newMember.r} onChange={e=>setNewMember(p=>({...p,r:e.target.value}))}/>
        <FInput label="LinkedIn (optional)" placeholder="https://linkedin.com/in/..."/>
        <div style={{ display:"flex",gap:10 }}>
          <Btn v="secondary" full onClick={()=>setAddTeamModal(false)}>Cancel</Btn>
          <Btn v="primary" full onClick={()=>{
            if(newMember.n && newMember.r){
              setTeam(p=>[...p,{n:newMember.n,r:newMember.r}]);
              setNewMember({n:"",r:""});
              setAddTeamModal(false);
            }
          }}>Add Member</Btn>
        </div>
      </div>
    </Modal>
  </div>
  );
};

// INVESTOR DASHBOARD
const InvestorDash = ({ nav }) => {
  const [sidebar, setSidebar] = useState(false);
  const [page, setPage] = useState("home");
  const [filterOpen, setFilterOpen] = useState(false);
  const [saved, setSaved] = useState(new Set());
  const [introModal, setIntroModal] = useState(null);
  const [introSent, setIntroSent] = useState(false);
  const [loadingDash,  setLoadingDash]  = useState(true);
  const [supportOpen,  setSupportOpen]  = useState(false);
  useEffect(()=>{ const t=setTimeout(()=>setLoadingDash(false),800); return ()=>clearTimeout(t); },[]);

  const [filters, setFilters] = useState({ sector:"", stage:"", ticket:"", geo:"" });

  const navItems = [
    {id:"home",      icon:"home",     label:"Dashboard",       short:"Home"},
    {id:"browse",    icon:"search",   label:"Browse Startups", short:"Browse"},
    {id:"saved",     icon:"bookmark", label:"Saved",           short:"Saved"},
    {id:"messages",  icon:"bell",     label:"Messages",        short:"Msgs", badge:"1"},
    {id:"portfolio", icon:"bar",      label:"Portfolio",       short:"Portfolio"},
    {id:"profile",   icon:"users",    label:"My Profile",      short:"Profile"},
    {id:"gear",      icon:"gear",     label:"Settings",        short:"Settings"},
  ];

  const startups = [
    {name:"GreenTech Solutions", sector:"CleanTech",  stage:"Seed",        ask:"₹2.5 Cr", mrr:"₹18L",   users:"2.4K", growth:"28%", verified:true},
    {name:"MediAI",              sector:"HealthTech", stage:"Pre-Series A",ask:"₹5 Cr",   mrr:"₹32L",   users:"8.1K", growth:"41%", verified:true},
    {name:"AgriLink",            sector:"AgriTech",   stage:"Seed",        ask:"₹1.8 Cr", mrr:"₹9L",    users:"1.2K", growth:"19%", verified:false},
    {name:"EduNation",           sector:"EdTech",     stage:"Pre-Seed",    ask:"₹80L",    mrr:"₹4L",    users:"3.5K", growth:"55%", verified:true},
    {name:"FinEase",             sector:"FinTech",    stage:"Series A",    ask:"₹15 Cr",  mrr:"₹1.2Cr", users:"45K",  growth:"22%", verified:true},
    {name:"LogiTrack",           sector:"Logistics",  stage:"Seed",        ask:"₹3 Cr",   mrr:"₹21L",   users:"500",  growth:"33%", verified:false},
  ];

  const toast = useToast();
  const toggle = name => setSaved(p=>{ const n=new Set(p); if(n.has(name)){ n.delete(name); toast("Removed from saved","info"); } else { n.add(name); toast("Saved! Find it in your Saved tab.","success"); } return n; });
  const [searchTerm, setSearchTerm] = useState("");

  const sendIntro = () => { setIntroSent(true); toast("Intro request sent to "+introModal?.name+"!","success"); setTimeout(()=>{ setIntroModal(null); setIntroSent(false); },1800); };

  const StartupCard = ({ s }) => {
    const [expanded, setExpanded] = useState(false);
    const isSaved = saved.has(s.name);
    // Extra detail data per startup
    const details = {
      desc: `${s.name} is building a ${s.sector.toLowerCase()} platform focused on India's growing market. The team has deep domain expertise and strong early traction.`,
      founded:"2023", team:4, location:"Bengaluru", prevRaise:"₹40L (Angel)",
      use:"Product development (40%), GTM (35%), Team (25%)",
    };
    return (
      <Card style={{ padding:20, transition:"all 0.18s" }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14 }}>
          <div style={{ display:"flex",gap:11,alignItems:"center",cursor:"pointer",flex:1 }} onClick={()=>setExpanded(p=>!p)}>
            <Avatar name={s.name} size={44}/>
            <div>
              <div style={{ display:"flex",alignItems:"center",gap:6,flexWrap:"wrap" }}>
                <span style={{ fontWeight:700,fontSize:15,color:C.text }}>{s.name}</span>
                {s.verified && <VBadge/>}
              </div>
              <div style={{ fontSize:12,color:C.muted,marginTop:2 }}>{s.sector} | {s.stage}</div>
            </div>
          </div>
          <div style={{ display:"flex",gap:6,alignItems:"center" }}>
            <button onClick={()=>toggle(s.name)}
              style={{ background:"none",border:"none",cursor:"pointer",
                color:isSaved?C.teal:C.slateL,padding:4,transition:"color 0.15s" }}>
              <Icon d={I.bookmark} size={18}/>
            </button>
            <button onClick={()=>setExpanded(p=>!p)}
              style={{ background:"none",border:"none",cursor:"pointer",color:C.slateL,padding:4,transition:"transform 0.2s",transform:expanded?"rotate(180deg)":"rotate(0deg)" }}>
              <Icon d={I.chevR} size={16} sw={2} style={{ transform:"rotate(90deg)" }}/>
            </button>
          </div>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(100px,1fr))",gap:8,marginBottom:14 }}>
          {[[s.mrr,"MRR"],[s.users,"Users"],[s.growth,"Growth"]].map(([v,l])=>(
            <div key={l} style={{ textAlign:"center",padding:8,borderRadius:9,background:C.offWhite }}>
              <div style={{ fontSize:14,fontWeight:700,color:C.text }}>{v}</div>
              <div style={{ fontSize:10,color:C.muted }}>{l}</div>
            </div>
          ))}
        </div>

        {/* Expanded detail */}
        {expanded && (
          <div style={{ borderTop:`1px solid ${C.slateXL}`,paddingTop:14,marginBottom:14 }}>
            <p style={{ fontSize:13,color:C.muted,lineHeight:1.7,marginBottom:14 }}>{details.desc}</p>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14 }}>
              {[["Founded",details.founded],["Team Size",details.team+" people"],["Location",details.location],["Previous Raise",details.prevRaise]].map(([l,v])=>(
                <div key={l} style={{ padding:"10px 12px",borderRadius:9,background:C.offWhite }}>
                  <div style={{ fontSize:10,color:C.muted,marginBottom:2,textTransform:"uppercase",letterSpacing:"0.06em",fontWeight:700 }}>{l}</div>
                  <div style={{ fontSize:13,fontWeight:600,color:C.text }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ padding:"10px 12px",borderRadius:9,background:C.offWhite,marginBottom:14 }}>
              <div style={{ fontSize:10,color:C.muted,marginBottom:2,textTransform:"uppercase",letterSpacing:"0.06em",fontWeight:700 }}>Use of Funds</div>
              <div style={{ fontSize:12,color:C.text }}>{details.use}</div>
            </div>
          </div>
        )}

        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between" }}>
          <div>
            <span style={{ fontSize:11,color:C.muted }}>Ask: </span>
            <span style={{ fontSize:14,fontWeight:700,color:C.text }}>{s.ask}</span>
          </div>
          <div style={{ display:"flex",gap:8 }}>
            {expanded && <Btn v="secondary" sz="sm" onClick={()=>nav("dealRoom")}>Data Room</Btn>}
            <Btn v="primary" sz="sm" onClick={()=>setIntroModal(s)}>Request Intro</Btn>
          </div>
        </div>
      </Card>
    );
  };

  const browseOrHome = (
    <div style={{ padding:20,maxWidth:660,margin:"0 auto" }}>
      {page==="home" && (
        <div style={{ marginBottom:20 }}>
          <h1 style={{ fontSize:22,fontWeight:800,color:C.text,marginBottom:4,letterSpacing:"-0.02em" }}>Deal Flow</h1>
          <p style={{ color:C.muted,fontSize:14 }}>Curated startups matching your investment thesis.</p>
        </div>
      )}
      <div style={{ display:"flex",gap:10,marginBottom:16 }}>
        <div style={{ flex:1,position:"relative" }}>
          <div style={{ position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:C.muted }}>
            <Icon d={I.search} size={16}/>
          </div>
          <input placeholder="Search startups..." value={searchTerm} onChange={e=>setSearchTerm(e.target.value)}
            style={{ width:"100%",padding:"10px 14px 10px 38px",
            borderRadius:10,border:`1.5px solid ${C.border}`,fontSize:14,outline:"none",
            boxSizing:"border-box",fontFamily:"inherit",color:C.text }}
            onFocus={e=>e.target.style.borderColor=C.teal} onBlur={e=>e.target.style.borderColor=C.border}/>
        </div>
        <Btn v="secondary" sz="md" icon="filter" onClick={()=>setFilterOpen(true)}>Filter</Btn>
      </div>
      {(()=>{
        const q = searchTerm.toLowerCase();
        const vis = startups.filter(s=>{
          const matchSearch = !q || s.name.toLowerCase().includes(q) || s.sector.toLowerCase().includes(q);
          const matchSector = !filters.sector || s.sector.toLowerCase().includes(filters.sector);
          const matchStage  = !filters.stage  || s.stage.toLowerCase().includes(filters.stage);
          return matchSearch && matchSector && matchStage;
        });
        return vis.length===0
          ? <EmptyState
              icon="🔍"
              title={searchTerm?"No startups match your search":"No startups match your filters"}
              body={searchTerm?`No results for "${searchTerm}". Try a different keyword.`:"Try broadening your filters — remove sector, stage or geography."}
              cta="Clear"
              onCta={()=>{ setSearchTerm(""); setFilters({sector:"",stage:"",ticket:"",geo:"",verifiedOnly:false}); }}
            />
          : <div style={{ display:"flex",flexDirection:"column",gap:14,paddingBottom:80 }}>
              {vis.map(s=><StartupCard key={s.name} s={s}/>)}
            </div>;
      })()}
    </div>
  );

  const [savedSort,   setSavedSort]   = useState("recent");   // recent | alpha | growth | ask
  const [savedView,   setSavedView]   = useState("list");     // list | grid
  const [savedFilter, setSavedFilter] = useState("all");      // all | cleantech | fintech | healthtech | edtech | agritech
  const [savedNotes,  setSavedNotes]  = useState({});         // name -> note string
  const [noteOpen,    setNoteOpen]    = useState(null);        // startup name
  const [noteDraft,   setNoteDraft]   = useState("");
  const [removeConfirm, setRemoveConfirm] = useState(null);   // startup name pending removal
  const [savedTags,   setSavedTags]   = useState({
    "GreenTech Solutions": ["high-interest","follow-up"],
    "MediAI":              ["high-interest"],
    "EduNation":           ["watchlist"],
  });
  const [tagInput,    setTagInput]    = useState({});
  const SAVED_META = {
    "GreenTech Solutions": { savedAt:"Mar 5, 2026", lastViewed:"Today",    views:3 },
    "MediAI":              { savedAt:"Mar 3, 2026", lastViewed:"Yesterday", views:5 },
    "AgriLink":            { savedAt:"Feb 28, 2026",lastViewed:"Mar 4",    views:1 },
    "EduNation":           { savedAt:"Mar 6, 2026", lastViewed:"Today",    views:2 },
    "FinEase":             { savedAt:"Feb 20, 2026",lastViewed:"Mar 2",    views:4 },
  };
  const TAG_COLORS = {
    "high-interest":"#6366F1","follow-up":C.teal,"watchlist":C.amber,"passed":C.muted,"due-diligence":C.green,
  };

  const savedStartups = startups.filter(s=>saved.has(s.name));
  const filteredSaved = savedStartups
    .filter(s=> savedFilter==="all" || s.sector.toLowerCase().replace(/\s/g,"")===savedFilter)
    .sort((a,b)=>{
      if(savedSort==="alpha")  return a.name.localeCompare(b.name);
      if(savedSort==="growth") return parseInt(b.growth)-parseInt(a.growth);
      if(savedSort==="ask")    return parseFloat(b.ask.replace(/[^\d.]/g,""))-parseFloat(a.ask.replace(/[^\d.]/g,""));
      return 0; // recent — keep insertion order
    });

  const addTag = (name, tag) => {
    const t = tag.trim().toLowerCase().replace(/\s+/g,"-");
    if(!t) return;
    setSavedTags(p=>({...p,[name]:[...new Set([...(p[name]||[]),t])]}));
    setTagInput(p=>({...p,[name]:""}));
  };
  const removeTag = (name, tag) => setSavedTags(p=>({...p,[name]:(p[name]||[]).filter(t=>t!==tag)}));
  const confirmRemove = name => { setSaved(p=>{ const n=new Set(p); n.delete(name); return n; }); setRemoveConfirm(null); toast(`${name} removed from saved`, "info"); };

  const SavedStartupCard = ({ s }) => {
    const meta = SAVED_META[s.name] || { savedAt:"Recently", lastViewed:"—", views:0 };
    const tags = savedTags[s.name] || [];
    const note = savedNotes[s.name] || "";
    const isGrid = savedView==="grid";
    return (
      <div style={{ background:"#fff", borderRadius:14, border:`1px solid ${C.border}`, overflow:"hidden",
        transition:"box-shadow 0.18s", cursor:"default" }}
        onMouseEnter={e=>e.currentTarget.style.boxShadow="0 4px 20px rgba(0,0,0,0.07)"}
        onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
        {/* Card header */}
        <div style={{ padding:isGrid?"16px 16px 12px":"16px 18px 12px", borderBottom:`1px solid ${C.slateXL}` }}>
          <div style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
            <Avatar name={s.name} size={isGrid?40:44}/>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:3, flexWrap:"wrap" }}>
                <span style={{ fontWeight:700, fontSize:isGrid?13:15, color:C.text }}>{s.name}</span>
                {s.verified && <VBadge/>}
              </div>
              <div style={{ fontSize:12, color:C.muted }}>{s.sector} · {s.stage}</div>
            </div>
            <button onClick={()=>setRemoveConfirm(s.name)}
              style={{ background:"none", border:"none", cursor:"pointer", color:C.muted, padding:4, borderRadius:6, display:"flex",
                transition:"all 0.15s", flexShrink:0 }}
              onMouseEnter={e=>{ e.currentTarget.style.color=C.red; e.currentTarget.style.background="rgba(239,68,68,0.08)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.color=C.muted; e.currentTarget.style.background="transparent"; }}
              title="Remove from saved">
              <Icon d={I.x} size={14} sw={2}/>
            </button>
          </div>

          {/* Metrics strip */}
          <div style={{ display:"flex", gap:8, marginTop:12, flexWrap:"wrap" }}>
            {[["Ask",s.ask],["MRR",s.mrr],["Growth",s.growth]].map(([l,v])=>(
              <div key={l} style={{ padding:"5px 10px", borderRadius:8, background:C.offWhite, textAlign:"center", minWidth:56 }}>
                <div style={{ fontSize:12, fontWeight:700, color:C.text }}>{v}</div>
                <div style={{ fontSize:10, color:C.muted }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tags row */}
        <div style={{ padding:"10px 18px", borderBottom:`1px solid ${C.slateXL}`, display:"flex", gap:6, flexWrap:"wrap", alignItems:"center" }}>
          {tags.map(tag=>(
            <span key={tag} style={{ display:"inline-flex", alignItems:"center", gap:4, padding:"3px 8px", borderRadius:99,
              background:`${TAG_COLORS[tag]||C.teal}14`, color:TAG_COLORS[tag]||C.teal, fontSize:11, fontWeight:600 }}>
              {tag}
              <span onClick={()=>removeTag(s.name,tag)} style={{ cursor:"pointer", opacity:0.6, fontSize:12, lineHeight:1 }}>×</span>
            </span>
          ))}
          {tagInput[s.name]!==undefined ? (
            <input autoFocus value={tagInput[s.name]||""} onChange={e=>setTagInput(p=>({...p,[s.name]:e.target.value}))}
              onKeyDown={e=>{ if(e.key==="Enter"){ addTag(s.name,tagInput[s.name]); } if(e.key==="Escape"){ setTagInput(p=>({...p,[s.name]:undefined})); }}}
              onBlur={()=>{ if(tagInput[s.name]) addTag(s.name,tagInput[s.name]); else setTagInput(p=>({...p,[s.name]:undefined})); }}
              placeholder="tag…"
              style={{ border:"none", outline:"none", fontSize:11, color:C.text, width:60, fontFamily:"inherit", background:"transparent" }}/>
          ) : (
            <button onClick={()=>setTagInput(p=>({...p,[s.name]:""}))}
              style={{ background:"none", border:`1px dashed ${C.border}`, borderRadius:99, padding:"3px 8px", fontSize:11, color:C.muted, cursor:"pointer", fontFamily:"inherit" }}>
              + tag
            </button>
          )}
        </div>

        {/* Note */}
        {note && (
          <div style={{ padding:"10px 18px", background:"rgba(245,158,11,0.04)", borderBottom:`1px solid ${C.slateXL}` }}>
            <div style={{ fontSize:12, color:"#92400E", lineHeight:1.6 }}>📝 {note}</div>
          </div>
        )}

        {/* Footer actions */}
        <div style={{ padding:"11px 18px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:8 }}>
          <div style={{ display:"flex", gap:12, alignItems:"center" }}>
            <span style={{ fontSize:11, color:C.muted }}>Saved {meta.savedAt}</span>
            <span style={{ fontSize:11, color:C.muted }}>·</span>
            <span style={{ fontSize:11, color:C.muted }}>Viewed {meta.views}x</span>
          </div>
          <div style={{ display:"flex", gap:6 }}>
            <button onClick={()=>{ setNoteOpen(s.name); setNoteDraft(savedNotes[s.name]||""); }}
              style={{ padding:"5px 11px", borderRadius:8, border:`1px solid ${C.border}`, background:"#fff",
                color:C.muted, fontSize:11, fontWeight:600, cursor:"pointer", fontFamily:"inherit",
                display:"flex", alignItems:"center", gap:4 }}>
              📝 {note?"Edit note":"Add note"}
            </button>
            <button onClick={()=>setIntroModal(s)}
              style={{ padding:"5px 11px", borderRadius:8, border:`1px solid ${C.teal}`,
                background:C.tealDim, color:C.teal, fontSize:11, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>
              Request Intro →
            </button>
          </div>
        </div>
      </div>
    );
  };

  const savedPage = (
    <div style={{ padding:20, maxWidth:660, margin:"0 auto", paddingBottom:80 }}>
      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16, flexWrap:"wrap", gap:10 }}>
        <div>
          <h2 style={{ fontSize:20, fontWeight:800, color:C.text, marginBottom:2, letterSpacing:"-0.02em" }}>Saved Startups</h2>
          <p style={{ fontSize:13, color:C.muted }}>{savedStartups.length} startup{savedStartups.length!==1?"s":""} saved</p>
        </div>
        <div style={{ display:"flex", gap:6 }}>
          {/* View toggle */}
          <div style={{ display:"flex", background:C.slateXL, borderRadius:9, padding:2, gap:1 }}>
            {[["list","☰"],["grid","⊞"]].map(([v,icon])=>(
              <button key={v} onClick={()=>setSavedView(v)}
                style={{ width:32, height:28, borderRadius:7, border:"none", cursor:"pointer", fontFamily:"inherit", fontSize:14,
                  background:savedView===v?"#fff":"transparent", color:savedView===v?C.text:C.muted,
                  boxShadow:savedView===v?"0 1px 3px rgba(0,0,0,0.08)":"none", transition:"all 0.15s" }}>
                {icon}
              </button>
            ))}
          </div>
        </div>
      </div>

      {savedStartups.length === 0 ? (
        <EmptyState
          icon="🔖"
          title="No saved startups yet"
          body="Browse startups and tap the bookmark icon to save ones you're interested in. They'll appear here for quick access."
          cta="Browse Startups"
          onCta={()=>setPage("browse")}
        />
      ) : (
        <>
          {/* Filter + Sort bar */}
          <div style={{ display:"flex", gap:8, marginBottom:16, overflowX:"auto", paddingBottom:2 }}>
            {[["all","All"],["cleantech","CleanTech"],["fintech","FinTech"],["healthtech","HealthTech"],["edtech","EdTech"],["agritech","AgriTech"]].map(([id,label])=>(
              <button key={id} onClick={()=>setSavedFilter(id)}
                style={{ padding:"6px 12px", borderRadius:99, border:`1.5px solid ${savedFilter===id?C.teal:C.border}`,
                  background:savedFilter===id?C.tealDim:"#fff", color:savedFilter===id?C.teal:C.muted,
                  fontSize:12, fontWeight:600, cursor:"pointer", whiteSpace:"nowrap", fontFamily:"inherit",
                  transition:"all 0.15s", flexShrink:0 }}>
                {label}
              </button>
            ))}
            <div style={{ marginLeft:"auto", flexShrink:0 }}>
              <select value={savedSort} onChange={e=>setSavedSort(e.target.value)}
                style={{ padding:"6px 10px", borderRadius:9, border:`1px solid ${C.border}`, fontSize:12,
                  fontFamily:"inherit", color:C.text, background:"#fff", cursor:"pointer", outline:"none" }}>
                <option value="recent">Most Recent</option>
                <option value="alpha">A → Z</option>
                <option value="growth">Highest Growth</option>
                <option value="ask">Largest Ask</option>
              </select>
            </div>
          </div>

          {filteredSaved.length === 0 ? (
            <EmptyState
              icon="🔍"
              title={`No ${savedFilter} startups saved`}
              body="Try a different sector filter, or browse and save more startups."
              cta="Clear Filter"
              onCta={()=>setSavedFilter("all")}
              compact
            />
          ) : (
            <div style={{ display:savedView==="grid"?"grid":"flex",
              gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",
              flexDirection:"column", gap:12 }}>
              {filteredSaved.map(s=><SavedStartupCard key={s.name} s={s}/>)}
            </div>
          )}

          {/* Summary footer */}
          <div style={{ marginTop:20, padding:"12px 16px", borderRadius:12, background:C.offWhite,
            border:`1px solid ${C.border}`, display:"flex", gap:20, flexWrap:"wrap" }}>
            {[
              ["🔖", savedStartups.length, "Saved"],
              ["🏷", Object.values(savedTags).flat().length, "Tags added"],
              ["📝", Object.values(savedNotes).filter(Boolean).length, "Notes written"],
              ["🤝", "5", "Intros sent"],
            ].map(([icon,v,l])=>(
              <div key={l} style={{ display:"flex", alignItems:"center", gap:6 }}>
                <span style={{ fontSize:14 }}>{icon}</span>
                <span style={{ fontWeight:700, fontSize:14, color:C.text }}>{v}</span>
                <span style={{ fontSize:12, color:C.muted }}>{l}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
  const homeOverview = (
    <div style={{ padding:20, maxWidth:660, margin:"0 auto" }}>
      {/* Greeting */}
      <div style={{ marginBottom:20 }}>
        <h1 style={{ fontSize:22,fontWeight:800,color:C.text,marginBottom:4,letterSpacing:"-0.02em" }}>Good morning, Arjun </h1>
        <p style={{ color:C.muted, fontSize:14 }}>TechBridge Capital | Early Stage Investor</p>
      </div>

      {/* Stats row */}
      <div style={{ display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:12,marginBottom:20 }}>
        {[
          {v:"12",  l:"Saved Startups",  icon:"bookmark", color:"#6366F1", fn:()=>setPage("saved")},
          {v:"5",   l:"Active Intros",   icon:"link",     color:C.teal,    fn:()=>setPage("browse")},
          {v:"3",   l:"Portfolio Cos.",  icon:"bar",      color:C.green,   fn:()=>setPage("portfolio")},
          {v:"8",   l:"New Matches",     icon:"star",     color:C.amber,   fn:()=>setPage("browse")},
        ].map(s=>(
          <Card key={s.l} style={{ padding:16, cursor:"pointer", transition:"all 0.15s" }} onClick={s.fn}
            onMouseEnter={e=>e.currentTarget.style.transform="translateY(-1px)"}
            onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
            <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:6 }}>
              <div style={{ width:30,height:30,borderRadius:9,background:s.color+"18",display:"flex",alignItems:"center",justifyContent:"center",color:s.color }}>
                <Icon d={I[s.icon]} size={14}/>
              </div>
              <div style={{ fontSize:22,fontWeight:800,color:C.text,letterSpacing:"-0.02em" }}>{s.v}</div>
            </div>
            <div style={{ fontSize:12,color:C.muted }}>{s.l}</div>
          </Card>
        ))}
      </div>

      {/* Recommended today */}
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12 }}>
        <h2 style={{ fontSize:16,fontWeight:700,color:C.text }}>Recommended Today</h2>
        <button onClick={()=>setPage("browse")} style={{ background:"none",border:"none",cursor:"pointer",fontSize:13,color:C.teal,fontWeight:600,fontFamily:"inherit" }}>See all</button>
      </div>
      <div style={{ display:"flex",flexDirection:"column",gap:12,marginBottom:20 }}>
        {startups.slice(0,3).map(s=><StartupCard key={s.name} s={s}/>)}
      </div>

      {/* Recent activity */}
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12 }}>
        <h2 style={{ fontSize:16,fontWeight:700,color:C.text }}>Recent Activity</h2>
      </div>
      <Card style={{ overflow:"hidden",marginBottom:80 }}>
        {[
          {icon:"link",   color:C.teal,  text:"Intro request sent to GreenTech Solutions",   time:"2h ago"},
          {icon:"star",   color:C.amber, text:"EduNation added to your watchlist",            time:"5h ago"},
          {icon:"check",  color:C.green, text:"FinEase intro accepted - check your inbox",   time:"1d ago"},
          {icon:"users",  color:"#6366F1",text:"MediAI viewed your investor profile",         time:"2d ago"},
          {icon:"calendar",color:C.muted,text:"Delhi Demo Day - registered to attend",       time:"3d ago"},
        ].map((a,i,arr)=>(
          <div key={i} style={{ display:"flex",alignItems:"center",gap:12,padding:"13px 16px",
            borderBottom:i<arr.length-1?`1px solid ${C.slateXL}`:"none" }}>
            <div style={{ width:32,height:32,borderRadius:9,background:a.color+"18",display:"flex",alignItems:"center",justifyContent:"center",color:a.color,flexShrink:0 }}>
              <Icon d={I[a.icon]} size={14}/>
            </div>
            <div style={{ flex:1,fontSize:13,color:C.text }}>{a.text}</div>
            <div style={{ fontSize:11,color:C.muted,whiteSpace:"nowrap" }}>{a.time}</div>
          </div>
        ))}
      </Card>
    </div>
  );

  const pageContent = {
    home: homeOverview,
    browse: browseOrHome,
    saved: savedPage,
    messages: <MessagesPage/>,
    gear: <SettingsPage nav={nav}/>,
  };

  const handleNav = p => {
    if(p==="portfolio") nav("portfolio");
    else if(p==="profile") nav("investorProfile");
    else setPage(p);
  };

  return (
    <div style={{ background:C.offWhite,minHeight:"100vh" }}>
      <Sidebar nav={navItems} active={page} onSelect={handleNav} role="Investor" open={sidebar} onClose={()=>setSidebar(false)} onSignOut={()=>nav("landing")}/>
      <div style={{ paddingBottom:62 }}>
        <TopBar title={navItems.find(n=>n.id===page)?.label||"Dashboard"} onMenu={()=>setSidebar(true)} nav={nav} onHelp={()=>setSupportOpen(true)}/>
        {loadingDash && page==="home"
          ? <div style={{ padding:20, maxWidth:720, margin:"0 auto", display:"flex", flexDirection:"column", gap:14 }}>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))", gap:10 }}>
                {[1,2,3,4].map(i=><SkeletonCard key={i} rows={2}/>)}
              </div>
              <SkeletonCard rows={1} hasAvatar/>
              <SkeletonCard rows={1} hasAvatar/>
              <SkeletonCard rows={1} hasAvatar/>
            </div>
          : (pageContent[page]||browseOrHome)
        }
      </div>
      <BottomNav nav={navItems} active={page} onSelect={handleNav}/>

      {supportOpen && <SupportPage role="investor" onClose={()=>setSupportOpen(false)}/>}
      {/* Filter Drawer */}
      <Drawer open={filterOpen} onClose={()=>setFilterOpen(false)} title="Filter Startups">
        <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
          <FSelect label="Sector" value={filters.sector} onChange={e=>setFilters(p=>({...p,sector:e.target.value}))}
            options={[{value:"",label:"All Sectors"},{value:"cleantech",label:"CleanTech"},{value:"fintech",label:"FinTech"},{value:"healthtech",label:"HealthTech"},{value:"edtech",label:"EdTech"},{value:"agritech",label:"AgriTech"}]}/>
          <FSelect label="Stage" value={filters.stage} onChange={e=>setFilters(p=>({...p,stage:e.target.value}))}
            options={[{value:"",label:"All Stages"},{value:"pre-seed",label:"Pre-Seed"},{value:"seed",label:"Seed"},{value:"pre-a",label:"Pre-Series A"},{value:"series-a",label:"Series A"}]}/>
          <FSelect label="Ticket Size" value={filters.ticket} onChange={e=>setFilters(p=>({...p,ticket:e.target.value}))}
            options={[{value:"",label:"Any"},{value:"50l",label:"< Rs50L"},{value:"1cr",label:"Rs50L - Rs1Cr"},{value:"5cr",label:"Rs1Cr - Rs5Cr"},{value:"5cr+",label:"> Rs5Cr"}]}/>
          <FSelect label="Geography" value={filters.geo} onChange={e=>setFilters(p=>({...p,geo:e.target.value}))}
            options={[{value:"",label:"All India"},{value:"delhi",label:"Delhi NCR"},{value:"mumbai",label:"Mumbai"},{value:"blr",label:"Bengaluru"},{value:"hyd",label:"Hyderabad"}]}/>
          <div style={{ display:"flex",alignItems:"center",gap:10,padding:"10px 14px",borderRadius:10,
            background:"rgba(31,163,163,0.06)",border:`1px solid ${C.tealBd}`,marginBottom:4 }}>
            <div onClick={()=>setFilters(p=>({...p,verifiedOnly:!p.verifiedOnly}))}
              style={{ width:20,height:20,borderRadius:5,border:`2px solid ${filters.verifiedOnly?C.teal:C.border}`,
                background:filters.verifiedOnly?C.teal:"transparent",
                display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer" }}>
              {filters.verifiedOnly && <Icon d={I.check} size={11} sw={3} style={{ color:"#fff" }}/>}
            </div>
            <span style={{ fontSize:13,color:C.text,fontWeight:500 }}>Verified founders only</span>
            <VBadge/>
          </div>
          <div style={{ display:"flex",gap:10,marginTop:4 }}>
            <Btn v="secondary" full onClick={()=>{ setFilters({sector:"",stage:"",ticket:"",geo:"",verifiedOnly:false}); setFilterOpen(false); }}>Reset</Btn>
            <Btn v="primary" full onClick={()=>setFilterOpen(false)}>Apply Filters</Btn>
          </div>
        </div>
      </Drawer>

      {/* Intro Modal */}
      <Modal open={!!introModal} onClose={()=>{ if(!introSent){ setIntroModal(null); }}} title="Request Introduction">
        {introModal && (
          introSent
            ? <div style={{ textAlign:"center",padding:"20px 0" }}>
                <div style={{ width:56,height:56,borderRadius:28,background:"rgba(16,185,129,0.12)",
                  display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px" }}>
                  <Icon d={I.check} size={26} sw={2.5} style={{ color:C.green }}/>
                </div>
                <div style={{ fontWeight:700,fontSize:17,color:C.text,marginBottom:6 }}>Request Sent!</div>
                <div style={{ fontSize:14,color:C.muted }}>FundLink will facilitate your introduction to {introModal.name}.</div>
              </div>
            : <>
                <div style={{ display:"flex",alignItems:"center",gap:12,padding:"12px 14px",
                  borderRadius:12,background:C.offWhite,marginBottom:16 }}>
                  <Avatar name={introModal.name} size={44}/>
                  <div>
                    <div style={{ fontWeight:700,fontSize:15,color:C.text }}>{introModal.name}</div>
                    <div style={{ fontSize:13,color:C.muted }}>{introModal.sector} | {introModal.stage}</div>
                  </div>
                </div>
                <p style={{ fontSize:14,color:C.muted,lineHeight:1.65,marginBottom:16 }}>
                  FundLink will facilitate a warm introduction via email. Both parties will receive a brief before connecting.
                </p>
                <div style={{ marginBottom:16 }}>
                  <FInput label="Message to Founder (optional)" rows={3} placeholder="Briefly describe your interest and investment thesis..."/>
                </div>
                <div style={{ display:"flex",gap:10 }}>
                  <Btn v="secondary" onClick={()=>setIntroModal(null)} full>Cancel</Btn>
                  <Btn v="primary" onClick={sendIntro} full>Send Request</Btn>
                </div>
              </>
        )}
      </Modal>

      {/* Note Modal */}
      <Modal open={!!noteOpen} onClose={()=>setNoteOpen(null)} title="Add Note">
        {noteOpen && (
          <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
            <div style={{ display:"flex",alignItems:"center",gap:12,padding:"10px 14px",borderRadius:11,background:C.offWhite }}>
              <Avatar name={noteOpen} size={36}/>
              <span style={{ fontWeight:600,fontSize:14,color:C.text }}>{noteOpen}</span>
            </div>
            <div>
              <label style={{ display:"block",fontSize:12,fontWeight:600,color:C.muted,marginBottom:6 }}>Your private note</label>
              <textarea value={noteDraft} onChange={e=>setNoteDraft(e.target.value)} rows={4}
                placeholder="E.g. Strong team, revisit after Series A close. Ask about CAC..."
                style={{ width:"100%",padding:"10px 12px",borderRadius:10,border:`1.5px solid ${C.border}`,
                  fontSize:13,fontFamily:"inherit",color:C.text,resize:"vertical",outline:"none",boxSizing:"border-box",lineHeight:1.6 }}
                onFocus={e=>e.target.style.borderColor=C.teal}
                onBlur={e=>e.target.style.borderColor=C.border}/>
            </div>
            <div style={{ fontSize:11,color:C.muted }}>Notes are private and only visible to you.</div>
            <div style={{ display:"flex",gap:10 }}>
              <Btn v="secondary" full onClick={()=>setNoteOpen(null)}>Cancel</Btn>
              <Btn v="primary" full onClick={()=>{ setSavedNotes(p=>({...p,[noteOpen]:noteDraft})); setNoteOpen(null); toast("Note saved", "success"); }}>Save Note</Btn>
            </div>
          </div>
        )}
      </Modal>

      {/* Remove Confirm Modal */}
      <Modal open={!!removeConfirm} onClose={()=>setRemoveConfirm(null)} title="Remove Startup?">
        {removeConfirm && (
          <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
            <div style={{ display:"flex",alignItems:"center",gap:12,padding:"10px 14px",borderRadius:11,background:C.offWhite }}>
              <Avatar name={removeConfirm} size={36}/>
              <div>
                <div style={{ fontWeight:600,fontSize:14,color:C.text }}>{removeConfirm}</div>
                <div style={{ fontSize:12,color:C.muted }}>Will be removed from your saved list</div>
              </div>
            </div>
            <p style={{ fontSize:13,color:C.muted,lineHeight:1.6 }}>
              Any notes and tags you added will also be deleted. This cannot be undone.
            </p>
            <div style={{ display:"flex",gap:10 }}>
              <Btn v="secondary" full onClick={()=>setRemoveConfirm(null)}>Keep Saved</Btn>
              <Btn v="danger" full onClick={()=>confirmRemove(removeConfirm)}>Remove</Btn>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

// PARTNER DASHBOARD
const PartnerDash = ({ nav }) => {
  const [sidebar, setSidebar] = useState(false);
  const [page, setPage] = useState("home");
  const [supportOpen, setSupportOpen] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [newEventName, setNewEventName] = useState("");
  const [newEventDate, setNewEventDate] = useState("");
  const [newEventLoc,  setNewEventLoc]  = useState("");
  const [newEventDesc, setNewEventDesc] = useState("");
  const [newEventDeadline, setNewEventDeadline] = useState("");
  const [newEventMaxS, setNewEventMaxS] = useState("");
  const [newEventMaxI, setNewEventMaxI] = useState("");
  const [newEventType, setNewEventType] = useState("demo");
  const [newEventFmt,  setNewEventFmt]  = useState("offline");
  const [editEventModal, setEditEventModal] = useState(null);
  const [viewAppsModal, setViewAppsModal] = useState(null);
  const [cohortDetail, setCohortDetail] = useState(null);
  const [apps, setApps] = useState([
    {name:"GreenTech Solutions",sector:"CleanTech", stage:"Seed",        st:"pending",  ask:"₹1.5 Cr", note:"Building solar micro-grids for tier-2 cities. 28% MoM growth."},
    {name:"MediAI",             sector:"HealthTech",stage:"Pre-Series A",  st:"approved", ask:"₹3 Cr",   note:"AI-driven diagnostic tool deployed in 40+ clinics."},
    {name:"EduNation",          sector:"EdTech",    stage:"Pre-Seed",      st:"pending",  ask:"₹50 L",   note:"Vernacular learning platform for rural students."},
    {name:"LogiTrack",          sector:"Logistics", stage:"Seed",          st:"rejected", ask:"₹2 Cr",   note:"Last-mile delivery optimisation. Outside current focus."},
    {name:"FinEase",            sector:"FinTech",   stage:"Series A",      st:"pending",  ask:"₹8 Cr",   note:"SME credit scoring using alternative data. 600+ paying clients."},
  ]);
  const partnerToast = useToast();
  const approveApp = name => { setApps(p=>p.map(a=>a.name===name?{...a,st:"approved"}:a)); partnerToast(`${name} approved!`,"success"); };
  const rejectApp  = name => setApps(p=>p.map(a=>a.name===name?{...a,st:"rejected"}:a));

  const navItems = [
    {id:"home",      icon:"home",     label:"Dashboard",    short:"Home"},
    {id:"events",    icon:"calendar", label:"My Events",    short:"Events"},
    {id:"cohort",    icon:"grid",     label:"Cohort",       short:"Cohort"},
    {id:"apps",      icon:"users",    label:"Applications", short:"Apps",  badge:"12"},
    {id:"analytics", icon:"bar",      label:"Analytics",    short:"Stats"},
    {id:"pprofile",  icon:"building", label:"Org Profile",  short:"Profile"},
    {id:"gear",      icon:"gear",     label:"Settings",     short:"Settings"},
  ];

  const stats = [
    {l:"Active Events",      v:"3",   icon:"calendar", color:C.teal},
    {l:"Registered Founders",v:"142", icon:"trending", color:"#6366F1"},
    {l:"Registered Investors",v:"38", icon:"star",     color:C.amber},
    {l:"Pending Reviews",    v:"12",  icon:"eye",      color:C.red},
  ];

  const activeEvents = [
    {name:"Delhi Demo Day",     date:"Mar 15",founders:24,investors:12,st:"live"},
    {name:"Mumbai Pitch Night", date:"Mar 22",founders:18,investors:8, st:"upcoming"},
    {name:"Hyderabad Funding Fair",date:"Apr 8",founders:32,investors:20,st:"upcoming"},
  ];

  const cohortData = [
    {name:"Cohort 12 - Spring 2025", founders:24,events:3,active:true},
    {name:"Cohort 11 - Winter 2024", founders:18,events:4,active:false},
    {name:"Cohort 10 - Fall 2024",   founders:20,events:5,active:false},
  ];

  const pendingApps  = apps.filter(a=>a.st==="pending");
  const approvedApps = apps.filter(a=>a.st==="approved");
  const rejectedApps = apps.filter(a=>a.st==="rejected");

  const pages = {
    home: (
      <div style={{ padding:20,maxWidth:660,margin:"0 auto" }}>
        <div style={{ marginBottom:20 }}>
          <h1 style={{ fontSize:22,fontWeight:800,color:C.text,marginBottom:4,letterSpacing:"-0.02em" }}>Partner Dashboard</h1>
          <p style={{ color:C.muted,fontSize:14 }}>NASSCOM Foundation | Ecosystem Partner</p>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:12,marginBottom:20 }}>
          {stats.map(s=>(
            <Card key={s.l} style={{ padding:16 }}>
              <div style={{ width:32,height:32,borderRadius:9,background:s.color+"18",
                display:"flex",alignItems:"center",justifyContent:"center",color:s.color,marginBottom:10 }}>
                <Icon d={I[s.icon]} size={16}/>
              </div>
              <div style={{ fontSize:24,fontWeight:800,color:C.text,letterSpacing:"-0.02em" }}>{s.v}</div>
              <div style={{ fontSize:12,color:C.muted,marginTop:2 }}>{s.l}</div>
            </Card>
          ))}
        </div>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12 }}>
          <h2 style={{ fontSize:16,fontWeight:700,color:C.text }}>Active Events</h2>
          <Btn v="primary" sz="sm" icon="plus" onClick={()=>setCreateModal(true)}>Create Event</Btn>
        </div>
        <div style={{ display:"flex",flexDirection:"column",gap:12,marginBottom:80 }}>
          {activeEvents.map((ev,i)=>(
            <Card key={i} style={{ padding:18 }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12 }}>
                <div>
                  <div style={{ fontWeight:700,fontSize:15,color:C.text }}>{ev.name}</div>
                  <div style={{ fontSize:13,color:C.muted,marginTop:2 }}>{ev.date}</div>
                </div>
                <Badge v={ev.st==="live"?"green":"amber"}>{ev.st}</Badge>
              </div>
              <div style={{ display:"flex",gap:20 }}>
                <div style={{ display:"flex",alignItems:"center",gap:6,fontSize:13,color:C.muted }}>
                  <Icon d={I.trending} size={14}/>{ev.founders} Founders
                </div>
                <div style={{ display:"flex",alignItems:"center",gap:6,fontSize:13,color:C.muted }}>
                  <Icon d={I.star} size={14}/>{ev.investors} Investors
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    ),
    events: (
      <div style={{ padding:20,maxWidth:660,margin:"0 auto" }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20 }}>
          <h2 style={{ fontSize:20,fontWeight:800,color:C.text }}>My Events</h2>
          <Btn v="primary" sz="sm" icon="plus" onClick={()=>setCreateModal(true)}>New Event</Btn>
        </div>
        <div style={{ display:"flex",flexDirection:"column",gap:12,paddingBottom:80 }}>
          {activeEvents.map((ev,i)=>(
            <Card key={i} style={{ padding:18 }}>
              <div style={{ display:"flex",justifyContent:"space-between",marginBottom:10 }}>
                <div style={{ fontWeight:700,fontSize:15,color:C.text }}>{ev.name}</div>
                <Badge v={ev.st==="live"?"green":"amber"}>{ev.st}</Badge>
              </div>
              <div style={{ fontSize:13,color:C.muted,marginBottom:12 }}>{ev.date}</div>
              <div style={{ display:"flex",gap:10 }}>
                <Btn v="secondary" sz="sm" full onClick={()=>setEditEventModal(ev)}>Edit</Btn>
                <Btn v="primary" sz="sm" full onClick={()=>setViewAppsModal(ev)}>View Applications</Btn>
              </div>
            </Card>
          ))}
        </div>
      </div>
    ),
    cohort: (
      <div style={{ padding:20,maxWidth:660,margin:"0 auto" }}>
        <h2 style={{ fontSize:20,fontWeight:800,color:C.text,marginBottom:16 }}>Cohort Management</h2>
        <div style={{ display:"flex",flexDirection:"column",gap:12,paddingBottom:80 }}>
          {cohortData.map((c,i)=>(
            <Card key={i} style={{ padding:18 }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10 }}>
                <div style={{ fontWeight:700,fontSize:15,color:C.text }}>{c.name}</div>
                <Badge v={c.active?"green":"navy"}>{c.active?"Active":"Completed"}</Badge>
              </div>
              <div style={{ display:"flex",gap:16,marginBottom:12 }}>
                <span style={{ fontSize:13,color:C.muted }}>{c.founders} Founders</span>
                <span style={{ fontSize:13,color:C.muted }}>{c.events} Events</span>
              </div>
              <Btn v="secondary" sz="sm" onClick={()=>setCohortDetail(c)}>View Cohort</Btn>
            </Card>
          ))}
        </div>
      </div>
    ),
    apps: (
      <div style={{ padding:20,maxWidth:660,margin:"0 auto" }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16,flexWrap:"wrap",gap:10 }}>
          <div>
            <h2 style={{ fontSize:20,fontWeight:800,color:C.text,marginBottom:4 }}>Applications</h2>
            <p style={{ fontSize:13,color:C.muted }}>{apps.length} total applications</p>
          </div>
        </div>

        {/* Stats strip */}
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(100px,1fr))",gap:10,marginBottom:18 }}>
          {[[pendingApps.length,"Pending",C.amber],[approvedApps.length,"Approved",C.green],[rejectedApps.length,"Rejected",C.red]].map(([v,l,c])=>(
            <div key={l} style={{ padding:"12px 14px",borderRadius:12,background:c+"12",border:`1px solid ${c}28`,textAlign:"center" }}>
              <div style={{ fontSize:22,fontWeight:800,color:c }}>{v}</div>
              <div style={{ fontSize:11,color:C.muted,marginTop:2 }}>{l}</div>
            </div>
          ))}
        </div>

        <div style={{ display:"flex",flexDirection:"column",gap:10,paddingBottom:80 }}>
          {apps.map((a,i)=>(
            <Card key={i} style={{ padding:18 }}>
              <div style={{ display:"flex",alignItems:"flex-start",gap:12,marginBottom:a.st==="pending"?14:0 }}>
                <Avatar name={a.name} size={44}/>
                <div style={{ flex:1,minWidth:0 }}>
                  <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8,flexWrap:"wrap",marginBottom:4 }}>
                    <div style={{ fontWeight:700,fontSize:14,color:C.text }}>{a.name}</div>
                    <Badge v={a.st==="approved"?"green":a.st==="rejected"?"red":"amber"}>{a.st}</Badge>
                  </div>
                  <div style={{ fontSize:12,color:C.muted,marginBottom:6 }}>{a.sector} | {a.stage}</div>
                  {a.ask && <div style={{ fontSize:12,color:C.teal,fontWeight:600 }}>Asking: {a.ask}</div>}
                  {a.note && <p style={{ fontSize:12,color:C.muted,lineHeight:1.5,marginTop:6,padding:"8px 10px",borderRadius:8,background:C.offWhite }}>{a.note}</p>}
                </div>
              </div>
              {a.st==="pending" && (
                <div style={{ display:"flex",gap:8 }}>
                  <Btn v="danger" sz="sm" full onClick={()=>rejectApp(a.name)}>Reject</Btn>
                  <Btn v="primary" sz="sm" full onClick={()=>approveApp(a.name)}>Approve</Btn>
                </div>
              )}
            </Card>
          ))}
          {apps.length===0 && (
            <EmptyState
              icon="📋"
              title="No applications yet"
              body="Applications will appear here when startups apply to your programs."
              compact
            />
          )}
        </div>
      </div>
    ),
    gear: <SettingsPage nav={nav}/>,
  };

  const handleNav = p => {
    if(p==="analytics") nav("partnerAnalytics");
    else if(p==="pprofile") nav("partnerProfile");
    else setPage(p);
  };

  return (
    <div style={{ background:C.offWhite,minHeight:"100vh" }}>
      <Sidebar nav={navItems} active={page} onSelect={handleNav} role="Ecosystem Partner" open={sidebar} onClose={()=>setSidebar(false)} onSignOut={()=>nav("landing")}/>
      <div style={{ paddingBottom:62 }}>
        <TopBar title={navItems.find(n=>n.id===page)?.label||"Dashboard"} onMenu={()=>setSidebar(true)} nav={nav} onHelp={()=>setSupportOpen(true)}/>
        {pages[page]||pages.home}
      </div>
      <BottomNav nav={navItems} active={page} onSelect={handleNav}/>

      {supportOpen && <SupportPage role="partner" onClose={()=>setSupportOpen(false)}/>}
      {/* Edit Event Modal */}
      <Modal open={!!editEventModal} onClose={()=>setEditEventModal(null)} title="Edit Event">
        {editEventModal && (
          <div style={{ display:"flex",flexDirection:"column",gap:13 }}>
            <FInput label="Event Name" defaultValue={editEventModal.name}/>
            <FSelect label="Event Type" options={[{value:"demo",label:"Demo Day"},{value:"pitch",label:"Pitch Event"},{value:"meetup",label:"Meetup"}]}/>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
              <FInput label="Date" defaultValue={editEventModal.date}/>
              <FSelect label="Format" options={[{value:"offline",label:"Offline"},{value:"online",label:"Online"},{value:"hybrid",label:"Hybrid"}]}/>
            </div>
            <FInput label="Location" placeholder="City or online platform" value={newEventLoc} onChange={e=>setNewEventLoc(e.target.value)}/>
            <FInput label="Description" rows={2} placeholder="Describe the event..."/>
            <div style={{ display:"flex",gap:10 }}>
              <Btn v="secondary" full onClick={()=>setEditEventModal(null)}>Cancel</Btn>
              <Btn v="primary" full onClick={()=>setEditEventModal(null)}>Save Changes</Btn>
            </div>
          </div>
        )}
      </Modal>

      {/* View Applications Modal */}
      <Modal open={!!viewAppsModal} onClose={()=>setViewAppsModal(null)} title={viewAppsModal?`Applications — ${viewAppsModal.name}`:""}>
        {viewAppsModal && (
          <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4 }}>
              <span style={{ fontSize:13,color:C.muted }}>{apps.filter(a=>a.st==="pending").length} pending | {apps.filter(a=>a.st==="approved").length} approved</span>
            </div>
            {apps.map((a,i)=>(
              <div key={i} style={{ display:"flex",alignItems:"center",gap:11,padding:"12px 14px",borderRadius:11,background:C.offWhite,border:`1px solid ${C.border}` }}>
                <Avatar name={a.name} size={36}/>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:600,fontSize:13,color:C.text }}>{a.name}</div>
                  <div style={{ fontSize:11,color:C.muted }}>{a.sector} | {a.stage}</div>
                </div>
                <Badge v={a.st==="approved"?"green":a.st==="rejected"?"red":"amber"}>{a.st}</Badge>
                {a.st==="pending" && (
                  <div style={{ display:"flex",gap:6 }}>
                    <Btn v="danger" sz="sm" onClick={()=>rejectApp(a.name)}>X</Btn>
                    <Btn v="primary" sz="sm" onClick={()=>approveApp(a.name)}>Done</Btn>
                  </div>
                )}
              </div>
            ))}
            <Btn v="secondary" full onClick={()=>setViewAppsModal(null)} style={{ marginTop:6 }}>Close</Btn>
          </div>
        )}
      </Modal>

      {/* Cohort Detail Modal */}
      <Modal open={!!cohortDetail} onClose={()=>setCohortDetail(null)} title={cohortDetail?.name||""}>
        {cohortDetail && (
          <div>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:16 }}>
              {[[cohortDetail.founders,"Founders"],[cohortDetail.events,"Events"],[cohortDetail.active?"Active":"Completed","Status"]].map(([v,l])=>(
                <div key={l} style={{ padding:12,borderRadius:10,background:C.offWhite,textAlign:"center" }}>
                  <div style={{ fontWeight:800,fontSize:18,color:C.teal }}>{v}</div>
                  <div style={{ fontSize:11,color:C.muted,marginTop:2 }}>{l}</div>
                </div>
              ))}
            </div>
            <div style={{ marginBottom:14 }}>
              <div style={{ fontWeight:700,fontSize:13,color:C.text,marginBottom:10 }}>Founders in Cohort</div>
              {["Priya Sharma - GreenTech","Rahul Verma - MediAI","Ananya Kapoor - EduNation"].slice(0,cohortDetail.founders>3?3:cohortDetail.founders).map((f,i)=>(
                <div key={i} style={{ display:"flex",alignItems:"center",gap:10,padding:"9px 0",borderBottom:`1px solid ${C.slateXL}` }}>
                  <Avatar name={f.split(" - ")[0]} size={30}/>
                  <span style={{ fontSize:13,color:C.text }}>{f}</span>
                </div>
              ))}
              {cohortDetail.founders>3 && <div style={{ fontSize:12,color:C.muted,paddingTop:8 }}>+{cohortDetail.founders-3} more founders</div>}
            </div>
            <Btn v="secondary" full onClick={()=>setCohortDetail(null)}>Close</Btn>
          </div>
        )}
      </Modal>

      <Modal open={createModal} onClose={()=>{ if(!submitted){ setCreateModal(false); }}} title="Create New Event" maxW={520}>
        {submitted
          ? <div style={{ textAlign:"center",padding:"20px 0" }}>
              <div style={{ width:56,height:56,borderRadius:28,background:"rgba(16,185,129,0.12)",
                display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px" }}>
                <Icon d={I.check} size={26} sw={2.5} style={{ color:C.green }}/>
              </div>
              <div style={{ fontWeight:700,fontSize:17,color:C.text,marginBottom:6 }}>Submitted for Review!</div>
              <div style={{ fontSize:14,color:C.muted,marginBottom:20 }}>Your event will go live once approved by the FundLink team.</div>
              <Btn v="primary" onClick={()=>{ setCreateModal(false); setSubmitted(false); }}>Done</Btn>
            </div>
          : <div style={{ display:"flex",flexDirection:"column",gap:13 }}>
              <FInput label="Event Name" placeholder="e.g. Delhi Demo Day Spring 2026" value={newEventName} onChange={e=>setNewEventName(e.target.value)}/>
              <FSelect label="Event Type" value={newEventType} onChange={e=>setNewEventType(e.target.value)} options={[{value:"demo",label:"Demo Day"},{value:"pitch",label:"Pitch Event"},{value:"meetup",label:"Meetup"}]}/>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
                <FInput label="Date" type="date" value={newEventDate} onChange={e=>setNewEventDate(e.target.value)}/>
                <FSelect label="Format" value={newEventFmt} onChange={e=>setNewEventFmt(e.target.value)} options={[{value:"online",label:"Online"},{value:"offline",label:"Offline"},{value:"hybrid",label:"Hybrid"}]}/>
              </div>
              <FInput label="Location" placeholder="City or online platform" value={newEventLoc} onChange={e=>setNewEventLoc(e.target.value)}/>
              <FInput label="Description" rows={3} placeholder="Describe the event..." value={newEventDesc} onChange={e=>setNewEventDesc(e.target.value)}/>
              <FInput label="Application Deadline" type="date" value={newEventDeadline} onChange={e=>setNewEventDeadline(e.target.value)}/>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
                <FInput label="Max Startups" type="number" placeholder="e.g. 20" value={newEventMaxS} onChange={e=>setNewEventMaxS(e.target.value)}/>
                <FInput label="Max Investors" type="number" placeholder="e.g. 40" value={newEventMaxI} onChange={e=>setNewEventMaxI(e.target.value)}/>
              </div>
              <div style={{ padding:"11px 14px",borderRadius:10,background:"rgba(245,158,11,0.08)",
                border:"1px solid rgba(245,158,11,0.25)",fontSize:13,color:"#B45309" }}>
                ⚡ Event will be submitted for Admin approval before going live.
              </div>
              <Btn v="primary" full onClick={()=>{ setSubmitted(true); setNewEventName(""); setNewEventDate(""); setNewEventLoc(""); setNewEventDesc(""); setNewEventDeadline(""); setNewEventMaxS(""); setNewEventMaxI(""); }}>Submit for Approval</Btn>
            </div>
        }
      </Modal>
    </div>
  );
};

// EVENTS PAGE
const EventsPage = () => {
  const [detail, setDetail] = useState(null);
  const [registered, setRegistered] = useState(new Set());

  const events = [
    {name:"Delhi Demo Day",         org:"Startup India", date:"Mar 15, 2026", loc:"New Delhi",  type:"Demo Day",   founders:24, investors:45, desc:"India largest government-backed startup showcase featuring top seed and Series A startups across 8 sectors."},
    {name:"Mumbai Pitch Night",     org:"TiE Mumbai",    date:"Mar 22, 2026", loc:"Mumbai",     type:"Pitch Event",founders:12, investors:30, desc:"An intimate evening of curated pitches for early-stage fintech and healthtech founders."},
    {name:"Bangalore VC Connect",   org:"NASSCOM",       date:"Apr 1, 2026",  loc:"Bengaluru",  type:"Meetup",     founders:50, investors:80, desc:"India premier networking event for founders and VCs in the tech ecosystem."},
    {name:"Hyderabad Funding Fair", org:"T-Hub",         date:"Apr 8, 2026",  loc:"Hyderabad",  type:"Demo Day",   founders:32, investors:60, desc:"T-Hub flagship annual funding event, now in its 5th edition."},
    {name:"Chennai SaaS Summit",    org:"SaaSBoomi",     date:"Apr 15, 2026", loc:"Chennai",    type:"Pitch Event",founders:18, investors:25, desc:"Focused exclusively on B2B SaaS startups building for global markets."},
  ];

  const toggle = (name) => setRegistered(p => { const n = new Set(p); n.has(name) ? n.delete(name) : n.add(name); return n; });
  const badgeColor = (type) => type === "Demo Day" ? "teal" : type === "Meetup" ? "green" : "amber";

  if (detail) return (
    <div style={{ padding:20, maxWidth:580, margin:"0 auto", paddingBottom:80 }}>
      <button onClick={() => setDetail(null)}
        style={{ display:"flex", alignItems:"center", gap:8, background:"none", border:"none",
          cursor:"pointer", color:C.muted, fontSize:14, marginBottom:20, padding:0, fontFamily:"inherit" }}>
        <Icon d={I.back} size={16} />Back to Events
      </button>
      <Card style={{ padding:24, marginBottom:14 }}>
        <div style={{ marginBottom:16 }}>
          <Badge v={badgeColor(detail.type)}>{detail.type}</Badge>
          <h1 style={{ fontSize:22, fontWeight:800, color:C.text, marginTop:10, marginBottom:8, letterSpacing:"-0.02em" }}>{detail.name}</h1>
          <div style={{ display:"flex", gap:14, fontSize:14, color:C.muted, flexWrap:"wrap" }}>
            <span>{detail.date}</span>
            <span>{detail.loc}</span>
            <span>{detail.org}</span>
          </div>
        </div>
        <p style={{ fontSize:14, color:C.text, lineHeight:1.7, marginBottom:16 }}>{detail.desc}</p>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:20 }}>
          {[[detail.founders,"Startups Attending"],[detail.investors,"Investors Registered"]].map(([v,l]) => (
            <div key={l} style={{ padding:14, borderRadius:11, background:C.offWhite, textAlign:"center" }}>
              <div style={{ fontSize:24, fontWeight:800, color:C.teal }}>{v}</div>
              <div style={{ fontSize:12, color:C.muted }}>{l}</div>
            </div>
          ))}
        </div>
        <Btn full v={registered.has(detail.name) ? "secondary" : "primary"} sz="lg"
          onClick={() => toggle(detail.name)}>
          {registered.has(detail.name) ? "Registered" : "Register for Event"}
        </Btn>
      </Card>
    </div>
  );

  return (
    <div style={{ padding:20, maxWidth:660, margin:"0 auto" }}>
      <div style={{ marginBottom:20 }}>
        <h2 style={{ fontSize:22, fontWeight:800, color:C.text, marginBottom:4, letterSpacing:"-0.02em" }}>Upcoming Events</h2>
        <p style={{ fontSize:14, color:C.muted }}>Curated demo days and pitch events across India.</p>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:14, paddingBottom:80 }}>
        {events.map((ev, idx) => (
          <Card key={idx} style={{ padding:20 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
              <Badge v={badgeColor(ev.type)}>{ev.type}</Badge>
              <span style={{ fontSize:12, color:C.muted }}>{ev.date}</span>
            </div>
            <h3 style={{ fontSize:16, fontWeight:700, color:C.text, marginBottom:4 }}>{ev.name}</h3>
            <p style={{ fontSize:13, color:C.muted, marginBottom:14 }}>{ev.org} | {ev.loc}</p>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", gap:10 }}>
              <div style={{ fontSize:12, color:C.slate }}>{ev.founders} startups | {ev.investors} investors</div>
              <div style={{ display:"flex", gap:8 }}>
                <Btn v="secondary" sz="sm" onClick={() => setDetail(ev)}>Details</Btn>
                <Btn v={registered.has(ev.name) ? "secondary" : "primary"} sz="sm"
                  onClick={() => toggle(ev.name)}>
                  {registered.has(ev.name) ? "Applied!" : "Apply"}
                </Btn>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// MESSAGES PAGE
const MessagesPage = () => {
  const [activeThread, setActiveThread] = useState(null);
  const [msgText, setMsgText] = useState("");
  const [threads, setThreads] = useState([
    {id:1, name:"Priya Sharma", org:"Sequoia India",   time:"2h ago", unread:2, preview:"Your traction numbers look promising...",
     msgs:[
       {from:"them", text:"Hi Rahul, we reviewed your pitch deck. Your traction numbers look really promising!", time:"10:24 AM"},
       {from:"them", text:"Could you share more details about your unit economics?", time:"10:25 AM"},
       {from:"me",   text:"Hi Priya! Thanks so much. Happy to share more details. Our CAC is around Rs850 and LTV is Rs6,200.", time:"10:48 AM"},
     ]},
    {id:2, name:"Arjun Mehta",  org:"TechBridge Capital", time:"1d ago", unread:0, preview:"Looking forward to our call tomorrow",
     msgs:[
       {from:"them", text:"Rahul, great meeting at the Delhi Demo Day. Looking forward to our call tomorrow!", time:"Yesterday 3:10 PM"},
       {from:"me",   text:"Same here! I'll send the calendar invite shortly.", time:"Yesterday 3:22 PM"},
       {from:"them", text:"Perfect. Talk soon.", time:"Yesterday 3:24 PM"},
     ]},
    {id:3, name:"Meera Nair",   org:"Nexus Venture",   time:"3d ago", unread:0, preview:"Thank you for your interest",
     msgs:[
       {from:"me",   text:"Hi Meera, following up on my intro request from last week.", time:"3 days ago"},
       {from:"them", text:"Thank you for your interest, Rahul. Unfortunately this falls outside our current investment focus.", time:"3 days ago"},
     ]},
    {id:4, name:"FundLink Team",org:"FundLink",         time:"1w ago", unread:0, preview:"Welcome to FundLink Pro!",
     msgs:[
       {from:"them", text:"Welcome to FundLink Pro, Rahul! Your profile is now live and visible to our network of 200+ verified investors.", time:"1 week ago"},
       {from:"them", text:"Complete your profile to improve your match score. Tip: Upload your pitch deck to get 3x more intro requests.", time:"1 week ago"},
     ]},
  ]);

  const msgToast = useToast();
  const sendMsg = () => {
    if (!msgText.trim() || !activeThread) return;
    const newMsg = { from:"me", text:msgText.trim(), time:"Just now" };
    setThreads(prev => prev.map(t => t.id === activeThread.id
      ? { ...t, msgs:[...t.msgs, newMsg], preview:msgText.trim(), time:"Just now" }
      : t
    ));
    setActiveThread(prev => prev ? {...prev, msgs:[...prev.msgs, newMsg]} : null);
    setMsgText("");
    msgToast("Message sent", "success");
  };

  if (activeThread) {
    const thread = threads.find(t => t.id === activeThread.id) || activeThread;
    return (
      <div style={{ display:"flex",flexDirection:"column",height:"calc(100vh - 96px)" }}>
        {/* Chat header */}
        <div style={{ display:"flex",alignItems:"center",gap:12,padding:"12px 16px",
          borderBottom:`1px solid ${C.border}`,background:C.card }}>
          <button onClick={()=>setActiveThread(null)}
            style={{ background:"none",border:"none",cursor:"pointer",color:C.muted,padding:4 }}>
            <Icon d={I.back} size={20}/>
          </button>
          <Avatar name={thread.name} size={36}/>
          <div>
            <div style={{ fontWeight:700,fontSize:14,color:C.text }}>{thread.name}</div>
            <div style={{ fontSize:12,color:C.muted }}>{thread.org}</div>
          </div>
          <div style={{ marginLeft:"auto" }}>
            <Badge v="green">Active</Badge>
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex:1,overflowY:"auto",padding:"16px",display:"flex",
          flexDirection:"column",gap:10,background:C.offWhite }}>
          {thread.msgs.map((msg,i)=>(
            <div key={i} style={{ display:"flex",justifyContent:msg.from==="me"?"flex-end":"flex-start" }}>
              {msg.from==="them" && (
                <Avatar name={thread.name} size={28} style={{ marginRight:8,flexShrink:0 }}/>
              )}
              <div>
                <div style={{
                  maxWidth:280,padding:"10px 14px",borderRadius:msg.from==="me"?"16px 16px 4px 16px":"16px 16px 16px 4px",
                  background:msg.from==="me"?C.teal:"#fff",
                  color:msg.from==="me"?"#fff":C.text,
                  fontSize:14,lineHeight:1.5,
                  boxShadow:"0 1px 3px rgba(0,0,0,0.06)" }}>
                  {msg.text}
                </div>
                <div style={{ fontSize:10,color:C.muted,marginTop:4,
                  textAlign:msg.from==="me"?"right":"left" }}>{msg.time}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div style={{ padding:"12px 16px",borderTop:`1px solid ${C.border}`,background:C.card,
          display:"flex",gap:10,alignItems:"flex-end" }}>
          <textarea value={msgText} onChange={e=>setMsgText(e.target.value)} rows={1}
            placeholder="Type a message..."
            onKeyDown={e=>{ if(e.key==="Enter"&&!e.shiftKey){ e.preventDefault(); sendMsg(); }}}
            style={{ flex:1,padding:"10px 14px",borderRadius:10,border:`1.5px solid ${C.border}`,
              fontSize:14,fontFamily:"inherit",resize:"none",outline:"none",color:C.text,lineHeight:1.5 }}
            onFocus={e=>e.target.style.borderColor=C.teal}
            onBlur={e=>e.target.style.borderColor=C.border}/>
          <Btn v="primary" onClick={sendMsg} disabled={!msgText.trim()}>Send</Btn>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding:0,maxWidth:660,margin:"0 auto" }}>
      <div style={{ padding:"16px 20px 12px",borderBottom:`1px solid ${C.border}` }}>
        <h2 style={{ fontSize:20,fontWeight:800,color:C.text,marginBottom:4 }}>Messages</h2>
        <p style={{ fontSize:13,color:C.muted }}>Your conversations with investors</p>
      </div>
      <div style={{ display:"flex",flexDirection:"column" }}>
        {threads.length===0 && (
          <EmptyState icon="💬" title="No messages yet" body="When investors send you messages or you request intros, conversations will appear here." compact/>
        )}
        {threads.map((t,i)=>(
          <div key={t.id} onClick={()=>{ setActiveThread(t); setThreads(prev=>prev.map(th=>th.id===t.id?{...th,unread:0}:th)); }}
            style={{ display:"flex",alignItems:"center",gap:12,padding:"14px 20px",cursor:"pointer",
              borderBottom:i<threads.length-1?`1px solid ${C.border}`:"none",
              background:t.unread>0?"rgba(31,163,163,0.04)":"transparent",transition:"background 0.15s" }}
            onMouseEnter={e=>e.currentTarget.style.background="rgba(31,163,163,0.06)"}
            onMouseLeave={e=>e.currentTarget.style.background=t.unread>0?"rgba(31,163,163,0.04)":"transparent"}>
            <div style={{ position:"relative",flexShrink:0 }}>
              <Avatar name={t.name} size={44}/>
              {t.unread > 0 && (
                <div style={{ position:"absolute",top:-2,right:-2,width:16,height:16,
                  borderRadius:8,background:C.teal,border:"2px solid #fff",
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:9,color:"#fff",fontWeight:700 }}>{t.unread}</div>
              )}
            </div>
            <div style={{ flex:1,minWidth:0 }}>
              <div style={{ display:"flex",justifyContent:"space-between",marginBottom:3 }}>
                <span style={{ fontWeight:t.unread>0?700:600,fontSize:14,color:C.text }}>{t.name}</span>
                <span style={{ fontSize:11,color:C.muted }}>{t.time}</span>
              </div>
              <div style={{ fontSize:12,color:C.muted,marginBottom:2 }}>{t.org}</div>
              <div style={{ fontSize:12,color:t.unread>0?C.text:C.muted,
                fontWeight:t.unread>0?500:400,
                overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>
                {t.preview}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// INTROS PAGE
const IntrosPage = () => {
  const [intros, setIntros] = useState([
    {from:"Arjun Mehta",   org:"TechBridge Capital",       time:"2h ago", st:"pending",  msg:"Interested in your CleanTech approach. Looking at seed stage deals."},
    {from:"Priya Sharma",  org:"Sequoia India",             time:"1d ago", st:"accepted", msg:"Your traction numbers are impressive. Let\u2019s schedule a call."},
    {from:"Rohan Gupta",   org:"Kalaari Capital",           time:"2d ago", st:"pending",  msg:"We\u2019ve been tracking your sector closely and want to connect."},
    {from:"Meera Nair",    org:"Nexus Venture Partners",    time:"3d ago", st:"declined", msg:"Outside our current investment focus."},
  ]);
  const [replyTarget, setReplyTarget] = useState(null);
  const [replyText, setReplyText]     = useState("");
  const [replySent, setReplySent]     = useState(new Set());

  const updateStatus = (i, st) => setIntros(p=>p.map((r,j)=>j===i?{...r,st}:r));
  const sendReply = () => {
    if(!replyText.trim()) return;
    setReplySent(p=>new Set([...p, replyTarget.from]));
    setReplyText("");
    setReplyTarget(null);
  };

  return (
    <div style={{ padding:20,maxWidth:580,margin:"0 auto" }}>
      <h2 style={{ fontSize:20,fontWeight:800,color:C.text,marginBottom:16 }}>Introduction Requests</h2>
      <div style={{ display:"flex",flexDirection:"column",gap:12,paddingBottom:80 }}>
        {intros.map((r,i)=>(
          <Card key={i} style={{ padding:18 }}>
            <div style={{ display:"flex",alignItems:"flex-start",gap:11,marginBottom:12 }}>
              <Avatar name={r.from} size={40}/>
              <div style={{ flex:1,minWidth:0 }}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:6 }}>
                  <span style={{ fontWeight:600,fontSize:14,color:C.text }}>{r.from}</span>
                  <Badge v={r.st==="accepted"?"green":r.st==="declined"?"red":"amber"}>{r.st}</Badge>
                </div>
                <div style={{ fontSize:12,color:C.muted,marginTop:2 }}>{r.org} | {r.time}</div>
              </div>
            </div>
            <p style={{ fontSize:13,color:C.text,lineHeight:1.6,padding:"10px 12px",
              borderRadius:9,background:C.offWhite,
              marginBottom:(r.st==="pending"||r.st==="accepted")?12:0 }}>"{r.msg}"</p>
            {r.st==="pending" && (
              <div style={{ display:"flex",gap:8 }}>
                <Btn v="secondary" sz="sm" full onClick={()=>updateStatus(i,"declined")}>Decline</Btn>
                <Btn v="primary" sz="sm" full onClick={()=>updateStatus(i,"accepted")}>Accept</Btn>
              </div>
            )}
            {r.st==="accepted" && (
              replySent.has(r.from)
                ? <div style={{ display:"flex",alignItems:"center",gap:8,padding:"9px 12px",borderRadius:9,background:"rgba(16,185,129,0.08)",border:`1px solid rgba(16,185,129,0.2)` }}>
                    <Icon d={I.check} size={14} sw={2.5} style={{ color:C.green }}/>
                    <span style={{ fontSize:13,color:C.green,fontWeight:600 }}>Message sent</span>
                  </div>
                : <Btn v="primary" sz="sm" full onClick={()=>setReplyTarget(r)}>Send Message</Btn>
            )}
          </Card>
        ))}
      </div>

      {/* Reply Modal */}
      <Modal open={!!replyTarget} onClose={()=>{ setReplyTarget(null); setReplyText(""); }} title={replyTarget?`Message ${replyTarget.from}`:""}>
        {replyTarget && (
          <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
            <div style={{ display:"flex",alignItems:"center",gap:11,padding:"12px 14px",borderRadius:11,background:C.offWhite }}>
              <Avatar name={replyTarget.from} size={38}/>
              <div>
                <div style={{ fontWeight:600,fontSize:14,color:C.text }}>{replyTarget.from}</div>
                <div style={{ fontSize:12,color:C.muted }}>{replyTarget.org}</div>
              </div>
            </div>
            <div style={{ padding:"11px 14px",borderRadius:10,background:"rgba(31,163,163,0.06)",border:`1px solid ${C.tealBd}`,fontSize:13,color:C.muted,lineHeight:1.6 }}>
              Their message: "{replyTarget.msg}"
            </div>
            <div>
              <label style={{ display:"block",fontSize:13,fontWeight:600,color:C.text,marginBottom:8 }}>Your reply</label>
              <textarea value={replyText} onChange={e=>setReplyText(e.target.value)} rows={4}
                placeholder={`Hi ${replyTarget.from.split(" ")[0]}, thanks for reaching out! I'd love to connect and share more about GreenTech Solutions...`}
                style={{ width:"100%",padding:"12px 14px",borderRadius:10,border:`1.5px solid ${C.border}`,fontSize:14,color:C.text,outline:"none",resize:"vertical",fontFamily:"inherit",boxSizing:"border-box",lineHeight:1.65 }}
                onFocus={e=>e.target.style.borderColor=C.teal} onBlur={e=>e.target.style.borderColor=C.border}/>
            </div>
            <div style={{ display:"flex",gap:10 }}>
              <Btn v="secondary" full onClick={()=>{ setReplyTarget(null); setReplyText(""); }}>Cancel</Btn>
              <Btn v="primary" full onClick={sendReply}>Send Message</Btn>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

// SETTINGS PAGE
const SettingsPage = ({ nav }) => {
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifSms,   setNotifSms]   = useState(false);
  const [notifPush,  setNotifPush]  = useState(true);
  const [changePwModal, setChangePwModal] = useState(false);
  const [tfaModal, setTfaModal]           = useState(false);
  const [tfaEnabled, setTfaEnabled]       = useState(false);
  const [privacyModal, setPrivacyModal]   = useState(null); // "visibility"|"data"|"delete"
  const [pwSaved, setPwSaved]             = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const Toggle2 = ({ on, onClick }) => (
    <div onClick={onClick} style={{ width:44,height:24,borderRadius:12,background:on?C.teal:C.slateXL,position:"relative",cursor:"pointer",flexShrink:0,transition:"background 0.2s" }}>
      <div style={{ position:"absolute",top:2,left:on?22:2,width:20,height:20,borderRadius:10,background:"#fff",transition:"left 0.2s",boxShadow:"0 1px 4px rgba(0,0,0,0.18)" }}/>
    </div>
  );

  return (
    <div style={{ padding:20,maxWidth:580,margin:"0 auto",paddingBottom:80 }}>
      <h2 style={{ fontSize:20,fontWeight:800,color:C.text,marginBottom:20 }}>Settings</h2>

      {/* Subscription card - links to sub-page */}
      <Card style={{ padding:20,marginBottom:14,background:C.navy,cursor:"pointer" }} onClick={()=>nav&&nav("subscription")}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
          <div>
            <div style={{ fontSize:11,color:"rgba(255,255,255,0.38)",fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:5 }}>Current Plan</div>
            <div style={{ color:"#fff",fontSize:20,fontWeight:800,letterSpacing:"-0.02em" }}>FundLink Pro</div>
            <div style={{ color:"rgba(255,255,255,0.45)",fontSize:13,marginTop:3 }}>₹1,999/mo | Renews Apr 1, 2026</div>
          </div>
          <div style={{ textAlign:"right" }}>
            <Badge v="teal">Active</Badge>
            <div style={{ fontSize:12,color:"rgba(255,255,255,0.38)",marginTop:8 }}>Manage</div>
          </div>
        </div>
      </Card>

      {/* Identity Verification Status */}
      <Card style={{ padding:18,marginBottom:14,border:`1px solid ${C.tealBd}`,background:"rgba(31,163,163,0.04)" }}>
        <div style={{ display:"flex",alignItems:"center",gap:12 }}>
          <div style={{ width:40,height:40,borderRadius:20,background:"rgba(16,185,129,0.12)",
            display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
            <Icon d={I.shield} size={20} sw={1.8} style={{ color:C.green }}/>
          </div>
          <div style={{ flex:1 }}>
            <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:3 }}>
              <span style={{ fontSize:14,fontWeight:700,color:C.text }}>Identity Verified</span>
              <VBadge/>
            </div>
            <div style={{ fontSize:12,color:C.muted }}>KYC approved on Mar 3, 2026. Full platform access enabled.</div>
          </div>
        </div>
      </Card>

      {/* Account */}
      <Card style={{ marginBottom:14,overflow:"hidden" }}>
        <div style={{ padding:"12px 18px",background:C.offWhite,borderBottom:`1px solid ${C.border}`,fontSize:12,fontWeight:700,color:C.muted,letterSpacing:"0.07em",textTransform:"uppercase" }}>Account</div>
        {[
          {l:"Email Notifications",d:"Receive updates via email",  tog:true,  val:notifEmail, fn:()=>setNotifEmail(p=>!p)},
          {l:"SMS Alerts",         d:"Get SMS for intro requests",  tog:true,  val:notifSms,   fn:()=>setNotifSms(p=>!p)},
          {l:"Push Notifications", d:"Browser push alerts",         tog:true,  val:notifPush,  fn:()=>setNotifPush(p=>!p)},
          {l:"Change Password",    d:"Update your login password",    tog:false, fn:()=>setChangePwModal(true)},
          {l:"Two-Factor Auth",    d:"Extra security for your account",tog:false, fn:()=>setTfaModal(true)},
        ].map((item,i,arr)=>(
          <div key={i} onClick={item.fn} style={{ padding:"14px 18px",borderBottom:i<arr.length-1?`1px solid ${C.slateXL}`:"none",display:"flex",alignItems:"center",cursor:"pointer",transition:"background 0.15s" }}
            onMouseEnter={e=>e.currentTarget.style.background=C.offWhite}
            onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:14,fontWeight:600,color:C.text }}>{item.l}</div>
              <div style={{ fontSize:12,color:C.muted,marginTop:2 }}>{item.d}</div>
            </div>
            {item.tog ? <Toggle2 on={item.val} onClick={item.fn}/> : <Icon d={I.chevR} size={16} sw={2} style={{ color:C.slateL }}/>}
          </div>
        ))}
      </Card>

      {/* Billing */}
      <Card style={{ marginBottom:14,overflow:"hidden" }}>
        <div style={{ padding:"12px 18px",background:C.offWhite,borderBottom:`1px solid ${C.border}`,fontSize:12,fontWeight:700,color:C.muted,letterSpacing:"0.07em",textTransform:"uppercase" }}>Billing</div>
        {[
          {l:"Billing History",     d:"View and download past invoices", fn:()=>nav&&nav("billing")},
          {l:"Payment Method",      d:"Visa ending in 4242",             fn:()=>nav&&nav("billing")},
          {l:"Apply Coupon Code",   d:"Redeem a promo or discount code", fn:()=>nav&&nav("couponUser")},
          {l:"Refer & Earn",        d:"Invite friends, earn ₹500 credit", fn:()=>nav&&nav("affiliate")},
        ].map((item,i,arr)=>(
          <div key={i} onClick={item.fn} style={{ padding:"14px 18px",borderBottom:i<arr.length-1?`1px solid ${C.slateXL}`:"none",display:"flex",alignItems:"center",cursor:"pointer",transition:"background 0.15s" }}
            onMouseEnter={e=>e.currentTarget.style.background=C.offWhite}
            onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:14,fontWeight:600,color:C.text }}>{item.l}</div>
              <div style={{ fontSize:12,color:C.muted,marginTop:2 }}>{item.d}</div>
            </div>
            <Icon d={I.chevR} size={16} sw={2} style={{ color:C.slateL }}/>
          </div>
        ))}
      </Card>

      {/* Privacy */}
      <Card style={{ overflow:"hidden" }}>
        <div style={{ padding:"12px 18px",background:C.offWhite,borderBottom:`1px solid ${C.border}`,fontSize:12,fontWeight:700,color:C.muted,letterSpacing:"0.07em",textTransform:"uppercase" }}>Privacy & Data</div>
        {[
          {l:"Profile Visibility",d:"Control who can see your profile",  fn:()=>setPrivacyModal("visibility")},
          {l:"Data & Privacy",    d:"Manage your personal data",          fn:()=>setPrivacyModal("data")},
          {l:"Delete Account",    d:"Permanently delete your account",    fn:()=>setPrivacyModal("delete"), danger:true},
        ].map((item,i,arr)=>(
          <div key={i} onClick={item.fn} style={{ padding:"14px 18px",borderBottom:i<arr.length-1?`1px solid ${C.slateXL}`:"none",display:"flex",alignItems:"center",cursor:"pointer",transition:"background 0.15s" }}
            onMouseEnter={e=>e.currentTarget.style.background=C.offWhite}
            onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:14,fontWeight:600,color:item.danger?C.red:C.text }}>{item.l}</div>
              <div style={{ fontSize:12,color:C.muted,marginTop:2 }}>{item.d}</div>
            </div>
            <Icon d={I.chevR} size={16} sw={2} style={{ color:C.slateL }}/>
          </div>
        ))}
      </Card>

      {/* Change Password Modal */}
      <Modal open={changePwModal} onClose={()=>{ setChangePwModal(false); setPwSaved(false); }} title="Change Password">
        {pwSaved
          ? <div style={{ textAlign:"center", padding:"16px 0" }}>
              <div style={{ width:52,height:52,borderRadius:26,background:"rgba(16,185,129,0.12)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px" }}>
                <Icon d={I.check} size={24} sw={2.5} style={{ color:C.green }}/>
              </div>
              <div style={{ fontWeight:700,fontSize:16,color:C.text,marginBottom:6 }}>Password updated!</div>
              <div style={{ fontSize:13,color:C.muted,marginBottom:18 }}>You'll be asked to log in again on other devices.</div>
              <Btn v="primary" full onClick={()=>{ setChangePwModal(false); setPwSaved(false); }}>Done</Btn>
            </div>
          : <div style={{ display:"flex",flexDirection:"column",gap:13 }}>
              <FInput label="Current Password" placeholder="password"/>
              <FInput label="New Password" placeholder="Min. 8 characters"/>
              <FInput label="Confirm New Password" placeholder="Re-enter new password"/>
              <div style={{ display:"flex",gap:10 }}>
                <Btn v="secondary" full onClick={()=>setChangePwModal(false)}>Cancel</Btn>
                <Btn v="primary" full onClick={()=>setPwSaved(true)}>Update Password</Btn>
              </div>
            </div>
        }
      </Modal>

      {/* 2FA Modal */}
      <Modal open={tfaModal} onClose={()=>setTfaModal(false)} title="Two-Factor Authentication">
        <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
          <div style={{ padding:"14px 16px",borderRadius:11,background:tfaEnabled?"rgba(16,185,129,0.08)":"rgba(245,158,11,0.06)",border:`1px solid ${tfaEnabled?"rgba(16,185,129,0.2)":"rgba(245,158,11,0.2)"}` }}>
            <div style={{ fontWeight:700,fontSize:14,color:tfaEnabled?C.green:C.amber,marginBottom:4 }}>
              {tfaEnabled ? "2FA Enabled" : "2FA is currently disabled"}
            </div>
            <div style={{ fontSize:13,color:C.muted }}>
              {tfaEnabled ? "Your account is protected with two-factor authentication." : "Add an extra layer of security to your account."}
            </div>
          </div>
          {!tfaEnabled && (
            <div style={{ padding:"12px 14px",borderRadius:10,background:C.offWhite,border:`1px solid ${C.border}` }}>
              <div style={{ fontSize:13,fontWeight:600,color:C.text,marginBottom:6 }}>How it works</div>
              <div style={{ fontSize:13,color:C.muted,lineHeight:1.65 }}>When you sign in, you'll enter your password, then verify with a code from your authenticator app (Google Authenticator, Authy, etc.).</div>
            </div>
          )}
          <div style={{ display:"flex",gap:10 }}>
            <Btn v="secondary" full onClick={()=>setTfaModal(false)}>Cancel</Btn>
            <Btn v={tfaEnabled?"danger":"primary"} full onClick={()=>{ setTfaEnabled(p=>!p); setTfaModal(false); }}>
              {tfaEnabled ? "Disable 2FA" : "Enable 2FA"}
            </Btn>
          </div>
        </div>
      </Modal>

      {/* Privacy modals */}
      <Modal open={privacyModal==="visibility"} onClose={()=>setPrivacyModal(null)} title="Profile Visibility">
        <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
          {[["public","Visible to all investors and partners"],["verified","Visible only to verified investors"],["private","Only visible to people you've connected with"]].map(([v,d])=>(
            <div key={v} onClick={()=>setPrivacyModal(null)} style={{ padding:"14px 16px",borderRadius:11,background:C.offWhite,border:`1px solid ${v==="verified"?C.teal:C.border}`,cursor:"pointer",transition:"all 0.15s" }}
              onMouseEnter={e=>e.currentTarget.style.borderColor=C.teal}
              onMouseLeave={e=>e.currentTarget.style.borderColor=v==="verified"?C.teal:C.border}>
              <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                <div style={{ width:16,height:16,borderRadius:8,border:`2px solid ${v==="verified"?C.teal:C.border}`,background:v==="verified"?C.teal:"transparent",flexShrink:0 }}/>
                <div>
                  <div style={{ fontWeight:600,fontSize:14,color:C.text,textTransform:"capitalize" }}>{v}</div>
                  <div style={{ fontSize:12,color:C.muted,marginTop:2 }}>{d}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Modal>
      <Modal open={privacyModal==="data"} onClose={()=>setPrivacyModal(null)} title="Data & Privacy">
        <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
          <div style={{ fontSize:14,color:C.muted,lineHeight:1.7 }}>Manage how FundLink uses your data. You can download a copy of your data or request deletion at any time.</div>
          {[["Download My Data","Export all your data as a JSON file"],["Opt out of analytics","Stop sharing usage analytics"],["Clear search history","Remove your recent searches"]].map(([l,d])=>(
            <div key={l} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 14px",borderRadius:10,background:C.offWhite }}>
              <div>
                <div style={{ fontWeight:600,fontSize:13,color:C.text }}>{l}</div>
                <div style={{ fontSize:12,color:C.muted }}>{d}</div>
              </div>
              <Btn v="secondary" sz="sm" onClick={()=>setPrivacyModal(null)}>Do it</Btn>
            </div>
          ))}
          <Btn v="secondary" full onClick={()=>setPrivacyModal(null)}>Close</Btn>
        </div>
      </Modal>
      <Modal open={privacyModal==="delete"} onClose={()=>{ setPrivacyModal(null); setDeleteConfirm(""); }} title="Delete Account">
        <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
          <div style={{ padding:"12px 14px",borderRadius:10,background:"rgba(239,68,68,0.06)",border:"1px solid rgba(239,68,68,0.2)" }}>
            <div style={{ fontWeight:700,fontSize:14,color:C.red,marginBottom:4 }}>This action is permanent</div>
            <div style={{ fontSize:13,color:C.muted,lineHeight:1.65 }}>All your data including your profile, connections, and documents will be permanently deleted and cannot be recovered.</div>
          </div>
          <div>
            <label style={{ display:"block",fontSize:13,fontWeight:600,color:C.text,marginBottom:8 }}>Type <strong>DELETE</strong> to confirm</label>
            <input value={deleteConfirm} onChange={e=>setDeleteConfirm(e.target.value)} placeholder="DELETE"
              style={{ width:"100%",padding:"11px 14px",borderRadius:10,border:`1.5px solid ${C.border}`,fontSize:14,outline:"none",fontFamily:"inherit",boxSizing:"border-box",color:C.text }}
              onFocus={e=>e.target.style.borderColor=C.red} onBlur={e=>e.target.style.borderColor=C.border}/>
          </div>
          <div style={{ display:"flex",gap:10 }}>
            <Btn v="secondary" full onClick={()=>{ setPrivacyModal(null); setDeleteConfirm(""); }}>Cancel</Btn>
            <Btn v="danger" full onClick={()=>{ if(deleteConfirm==="DELETE") nav&&nav("landing"); }}>Delete My Account</Btn>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// ADMIN DASHBOARD
const AdminDash = ({ nav }) => {
  const [sidebar, setSidebar] = useState(false);
  const [page, setPage] = useState("overview");
  const [loadingAdmin, setLoadingAdmin] = useState(true);
  useEffect(()=>{ const t=setTimeout(()=>setLoadingAdmin(false),650); return ()=>clearTimeout(t); },[]);
  const [approvals, setApprovals] = useState([
    {name:"FinEase Technologies",    type:"Startup",  time:"2h ago", st:"pending"},
    {name:"Delhi Startup Summit",    type:"Event",    time:"4h ago", st:"pending"},
    {name:"Ritu Kapoor",             type:"Investor", time:"6h ago", st:"pending"},
    {name:"EduNation",               type:"Startup",  time:"8h ago", st:"pending"},
    {name:"Mysore VC Meetup",        type:"Event",    time:"10h ago",st:"pending"},
  ]);
  const [userSearch, setUserSearch] = useState("");
  const [editUser, setEditUser]     = useState(null);
  const [editSaved, setEditSaved]   = useState(false);

  const [users, setUsers] = useState([
    {name:"Priya Sharma",  email:"priya@greentech.in",  role:"Founder",  st:"active",    joined:"Feb 2025"},
    {name:"Arjun Mehta",   email:"arjun@techbridge.vc", role:"Investor", st:"active",    joined:"Jan 2025"},
    {name:"Rohan Gupta",   email:"rohan@kalaari.com",   role:"Investor", st:"suspended", joined:"Mar 2025"},
    {name:"NASSCOM Team",  email:"events@nasscom.in",   role:"Partner",  st:"active",    joined:"Dec 2024"},
    {name:"Sneha Patel",   email:"sneha@edutech.in",    role:"Founder",  st:"active",    joined:"Mar 2025"},
    {name:"Vikram Singh",  email:"vikram@agrilink.co",  role:"Founder",  st:"active",    joined:"Feb 2025"},
  ]);

  const toggleSuspend = name => setUsers(p=>p.map(u=>u.name===name?{...u,st:u.st==="active"?"suspended":"active"}:u));
  const [mrrRange, setMrrRange] = useState("6M");

  const [adminEvents, setAdminEvents] = useState([
    {name:"Delhi Demo Day",       org:"Startup India",date:"Mar 15",st:"approved",featured:true},
    {name:"Mumbai Pitch Night",   org:"TiE Mumbai",   date:"Mar 22",st:"pending", featured:false},
    {name:"Hyderabad Funding Fair",org:"T-Hub",       date:"Apr 8", st:"approved",featured:false},
    {name:"Chennai SaaS Summit",  org:"SaaSBoomi",    date:"Apr 15",st:"pending", featured:false},
  ]);
  const toggleFeature  = name => setAdminEvents(p=>p.map(e=>e.name===name?{...e,featured:!e.featured}:e));
  const approveEvent   = name => setAdminEvents(p=>p.map(e=>e.name===name?{...e,st:"approved"}:e));
  const rejectEvent    = name => setAdminEvents(p=>p.map(e=>e.name===name?{...e,st:"rejected"}:e));

  const navItems = [
    {id:"overview",   icon:"grid",     label:"Overview"},
    {id:"users",      icon:"users",    label:"Users"},
    {id:"events",     icon:"calendar", label:"Events"},
    {id:"approvals",  icon:"shield",   label:"Approvals", badge:approvals.filter(a=>a.st==="pending").length.toString()},
    {id:"moderation", icon:"eye",      label:"Moderation"},
    {id:"analytics",  icon:"bar",      label:"Analytics"},
    {id:"revenue",    icon:"trending", label:"Revenue"},
    {id:"support",    icon:"shield",   label:"Support", badge:"3"},
    {id:"gear",       icon:"gear",     label:"Settings"},
  ];

  const overviewStats = [
    {l:"Total Founders",    v:"1,248",change:"+12%", icon:"trending",color:C.teal},
    {l:"Total Investors",   v:"342",  change:"+8%",  icon:"star",    color:"#6366F1"},
    {l:"Partners",          v:"67",   change:"+4%",  icon:"building",color:C.amber},
    {l:"Active Events",     v:"14",   change:"+2",   icon:"calendar",color:C.green},
    {l:"Pending Approvals", v:approvals.filter(a=>a.st==="pending").length.toString(), change:"", icon:"shield",color:C.red},
    {l:"Active Intros",     v:"58",   change:"+15%", icon:"link",    color:"#EC4899"},
  ];

  const filteredUsers = users.filter(u=>
    u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  const doApproval = (i, st) => setApprovals(p=>p.map((a,j)=>j===i?{...a,st}:a));

  const MiniBar = ({ data, label }) => {
    const max = Math.max(...data.map(d=>d.v));
    return (
      <div>
        <div style={{ fontSize:13,fontWeight:600,color:C.text,marginBottom:14 }}>{label}</div>
        <div style={{ display:"flex",alignItems:"flex-end",gap:6,height:90 }}>
          {data.map((d,i)=>(
            <div key={i} style={{ flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4 }}>
              <div style={{ fontSize:9,color:C.muted,whiteSpace:"nowrap" }}>{d.v}</div>
              <div style={{ width:"100%",background:C.teal,borderRadius:"4px 4px 0 0",
                height:Math.max(4,(d.v/max)*65)+"px",
                opacity:0.55+((i/data.length)*0.45) }}/>
              <div style={{ fontSize:9,color:C.muted,whiteSpace:"nowrap" }}>{d.l}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const pages = {
    overview: (
      <div style={{ padding:20,maxWidth:800,margin:"0 auto" }}>
        <div style={{ marginBottom:20 }}>
          <h1 style={{ fontSize:22,fontWeight:800,color:C.text,marginBottom:4,letterSpacing:"-0.02em" }}>Admin Overview</h1>
          <p style={{ color:C.muted,fontSize:14 }}>Platform health at a glance.</p>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:12,marginBottom:24 }}>
          {overviewStats.map(s=>(
            <Card key={s.l} style={{ padding:16 }}>
              <div style={{ width:32,height:32,borderRadius:9,background:s.color+"1A",
                display:"flex",alignItems:"center",justifyContent:"center",color:s.color,marginBottom:10 }}>
                <Icon d={I[s.icon]} size={16}/>
              </div>
              <div style={{ fontSize:22,fontWeight:800,color:C.text,letterSpacing:"-0.02em" }}>{s.v}</div>
              <div style={{ fontSize:11,color:C.muted,marginTop:2 }}>{s.l}</div>
              {s.change && <div style={{ fontSize:11,color:C.green,marginTop:4,fontWeight:600 }}>{s.change} this month</div>}
            </Card>
          ))}
        </div>
        <h2 style={{ fontSize:16,fontWeight:700,color:C.text,marginBottom:12 }}>Pending Approvals</h2>
        <div style={{ display:"flex",flexDirection:"column",gap:10,marginBottom:80 }}>
          {approvals.filter(a=>a.st==="pending").map((a,i)=>(
            <Card key={i} style={{ padding:"14px 16px" }}>
              <div style={{ display:"flex",alignItems:"center",gap:11 }}>
                <Avatar name={a.name} size={36}/>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:600,fontSize:14,color:C.text }}>{a.name}</div>
                  <div style={{ fontSize:12,color:C.muted }}>{a.type} | {a.time}</div>
                </div>
                <div style={{ display:"flex",gap:8 }}>
                  <Btn v="secondary" sz="sm" onClick={()=>doApproval(approvals.findIndex(x=>x.name===a.name),"rejected")}>Reject</Btn>
                  <Btn v="primary" sz="sm" onClick={()=>doApproval(approvals.findIndex(x=>x.name===a.name),"approved")}>Approve</Btn>
                </div>
              </div>
            </Card>
          ))}
          {approvals.filter(a=>a.st==="pending").length===0 && (
            <EmptyState icon="✅" title="All caught up!" body="No pending approvals right now." compact/>
          )}
        </div>
      </div>
    ),
    users: (
      <div style={{ padding:20,maxWidth:800,margin:"0 auto" }}>
        <h2 style={{ fontSize:20,fontWeight:800,color:C.text,marginBottom:16 }}>User Management</h2>
        <div style={{ display:"flex",gap:10,marginBottom:16,flexWrap:"wrap" }}>
          <div style={{ flex:1,minWidth:200,position:"relative" }}>
            <div style={{ position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:C.muted }}>
              <Icon d={I.search} size={16}/>
            </div>
            <input placeholder="Search users..." value={userSearch}
              onChange={e=>setUserSearch(e.target.value)}
              style={{ width:"100%",padding:"10px 14px 10px 38px",borderRadius:10,
                border:`1.5px solid ${C.border}`,fontSize:14,outline:"none",
                boxSizing:"border-box",fontFamily:"inherit",color:C.text }}/>
          </div>
        </div>
        <div style={{ overflowX:"auto",borderRadius:14,border:`1px solid ${C.border}`,boxShadow:"0 1px 4px rgba(0,0,0,0.06)" }}>
          <table style={{ width:"100%",borderCollapse:"collapse",minWidth:540 }}>
            <thead>
              <tr style={{ background:C.offWhite,borderBottom:`2px solid ${C.border}` }}>
                {["User","Role","KYC","Status","Joined","Actions"].map(h=>(
                  <th key={h} style={{ padding:"11px 14px",textAlign:"left",fontSize:11,
                    fontWeight:700,color:C.muted,letterSpacing:"0.05em",textTransform:"uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u,i)=>(
                <tr key={i} style={{ borderBottom:i<filteredUsers.length-1?`1px solid ${C.slateXL}`:"none",
                  transition:"background 0.15s" }}
                  onMouseEnter={e=>e.currentTarget.style.background=C.offWhite}
                  onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                  <td style={{ padding:"13px 14px" }}>
                    <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                      <Avatar name={u.name} size={32}/>
                      <div>
                        <div style={{ fontWeight:600,fontSize:13,color:C.text }}>{u.name}</div>
                        <div style={{ fontSize:11,color:C.muted }}>{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding:"13px 14px" }}><Badge v={u.role==="Founder"?"teal":u.role==="Investor"?"indigo":"amber"}>{u.role}</Badge></td>
                  <td style={{ padding:"13px 14px" }}><Badge v={u.kyc==="approved"?"green":u.kyc==="pending"?"amber":"red"}>{u.kyc==="approved"?"Verified":u.kyc==="pending"?"Pending":"N/A"}</Badge></td>
                  <td style={{ padding:"13px 14px" }}><Badge v={u.st==="active"?"green":"red"}>{u.st}</Badge></td>
                  <td style={{ padding:"13px 14px",fontSize:13,color:C.muted }}>{u.joined}</td>
                  <td style={{ padding:"13px 14px" }}>
                    <div style={{ display:"flex",gap:6 }}>
                      <Btn v="secondary" sz="sm" onClick={()=>nav("adminUserDetail")}>View</Btn>
                      <Btn v="secondary" sz="sm" onClick={()=>{ setEditUser(u); setEditSaved(false); }}>Edit</Btn>
                      <Btn v={u.st==="active"?"danger":"secondary"} sz="sm" onClick={()=>toggleSuspend(u.name)}>
                        {u.st==="active"?"Suspend":"Activate"}
                      </Btn>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredUsers.length===0 && (
                <tr><td colSpan={6}><EmptyState icon="👤" title="No users found" body="Try a different search term or clear the filter." compact/></td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    ),
    events: (
      <div style={{ padding:20,maxWidth:700,margin:"0 auto" }}>
        <h2 style={{ fontSize:20,fontWeight:800,color:C.text,marginBottom:16 }}>Event Moderation</h2>
        <div style={{ display:"flex",flexDirection:"column",gap:12,paddingBottom:80 }}>
          {adminEvents.map((ev,i)=>(
            <Card key={i} style={{ padding:18 }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12 }}>
                <div>
                  <div style={{ fontWeight:700,fontSize:15,color:C.text }}>{ev.name}</div>
                  <div style={{ fontSize:13,color:C.muted,marginTop:2 }}>{ev.org} | {ev.date}</div>
                </div>
                <div style={{ display:"flex",gap:6,flexWrap:"wrap",justifyContent:"flex-end" }}>
                  <Badge v={ev.st==="approved"?"green":ev.st==="rejected"?"red":"amber"}>{ev.st}</Badge>
                  {ev.featured && <Badge v="teal">Featured</Badge>}
                </div>
              </div>
              <div style={{ display:"flex",gap:8,flexWrap:"wrap" }}>
                <Btn v="secondary" sz="sm" onClick={()=>setPage("approvals")}>View Apps</Btn>
                <Btn v={ev.featured?"secondary":"primary"} sz="sm" onClick={()=>toggleFeature(ev.name)}>{ev.featured?"Unfeature":"Feature"}</Btn>
                {ev.st==="pending" && <><Btn v="danger" sz="sm" onClick={()=>rejectEvent(ev.name)}>Reject</Btn><Btn v="primary" sz="sm" onClick={()=>approveEvent(ev.name)}>Approve</Btn></>}
                {ev.st==="rejected" && <Btn v="secondary" sz="sm" onClick={()=>approveEvent(ev.name)}>Restore</Btn>}
              </div>
            </Card>
          ))}
        </div>
      </div>
    ),
    approvals: (
      <div style={{ padding:20,maxWidth:580,margin:"0 auto" }}>
        <h2 style={{ fontSize:20,fontWeight:800,color:C.text,marginBottom:16 }}>Pending Approvals</h2>
        <div style={{ display:"flex",flexDirection:"column",gap:12,paddingBottom:80 }}>
          {approvals.map((a,i)=>(
            <Card key={i} style={{ padding:18 }}>
              <div style={{ display:"flex",alignItems:"center",gap:11,marginBottom:a.st==="pending"?12:0 }}>
                <Avatar name={a.name} size={38}/>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:600,fontSize:14,color:C.text }}>{a.name}</div>
                  <div style={{ fontSize:12,color:C.muted }}>{a.type} | {a.time}</div>
                </div>
                <Badge v={a.st==="approved"?"green":a.st==="rejected"?"red":"amber"}>{a.st}</Badge>
              </div>
              {a.st==="pending" && (
                <div style={{ display:"flex",gap:8 }}>
                  <Btn v="danger" sz="sm" full onClick={()=>doApproval(i,"rejected")}>Reject</Btn>
                  <Btn v="primary" sz="sm" full onClick={()=>doApproval(i,"approved")}>Approve</Btn>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    ),
    analytics: (()=>{
      const [dateRange, setDateRange] = useState("30d");
      const [activeMetric, setActiveMetric] = useState("users");
      const ranges = [["7d","7D"],["30d","30D"],["90d","90D"],["12m","12M"]];
      const sparkData = {
        users:   [{l:"W1",v:52},{l:"W2",v:68},{l:"W3",v:73},{l:"W4",v:91},{l:"W5",v:88},{l:"W6",v:115},{l:"W7",v:122},{l:"W8",v:145}],
        intros:  [{l:"W1",v:18},{l:"W2",v:24},{l:"W3",v:31},{l:"W4",v:27},{l:"W5",v:38},{l:"W6",v:43},{l:"W7",v:52},{l:"W8",v:61}],
        revenue: [{l:"W1",v:120},{l:"W2",v:135},{l:"W3",v:128},{l:"W4",v:152},{l:"W5",v:178},{l:"W6",v:191},{l:"W7",v:204},{l:"W8",v:232}],
        events:  [{l:"W1",v:3},{l:"W2",v:4},{l:"W3",v:2},{l:"W4",v:5},{l:"W5",v:4},{l:"W6",v:6},{l:"W7",v:5},{l:"W8",v:7}],
      };
      const kpis = [
        { id:"users",   label:"New Users",      value:"245",  delta:"+18%", sub:"vs last period", color:C.teal,    icon:"👤" },
        { id:"intros",  label:"Intros Sent",    value:"61",   delta:"+23%", sub:"vs last period", color:"#6366F1", icon:"🤝" },
        { id:"revenue", label:"MRR",            value:"₹2.3L",delta:"+12%", sub:"vs last period", color:C.green,   icon:"💰" },
        { id:"events",  label:"Events",         value:"7",    delta:"+3",   sub:"this period",    color:C.amber,   icon:"📅" },
        { id:"kyc",     label:"KYC Approved",   value:"89%",  delta:"+4pp", sub:"approval rate",  color:C.teal,    icon:"✅" },
        { id:"fill",    label:"Event Fill Rate", value:"84%", delta:"+8pp", sub:"avg capacity",   color:C.purple,  icon:"🎟" },
      ].map(k=>({...k, value: k.value||"0"}));
      const funnelData = [
        { label:"Registered",     v:1247, pct:100, color:C.teal },
        { label:"KYC Approved",   v:891,  pct:71,  color:"#6366F1" },
        { label:"Profile Complete",v:634, pct:51,  color:C.green },
        { label:"First Intro",    v:312,  pct:25,  color:C.amber },
        { label:"Meeting Booked", v:187,  pct:15,  color:C.red   },
      ];
      const cohortData = [
        { month:"Oct 25", users:89,  w1:82, w2:71, w4:63, w8:58 },
        { month:"Nov 25", users:124, w1:79, w2:68, w4:57, w8:51 },
        { month:"Dec 25", users:98,  w1:84, w2:74, w4:65, w8:null },
        { month:"Jan 26", users:167, w1:81, w2:70, w4:null,w8:null },
        { month:"Feb 26", users:203, w1:78, w2:null,w4:null,w8:null },
        { month:"Mar 26", users:245, w1:null,w2:null,w4:null,w8:null },
      ];
      const geoData = [
        { city:"Bengaluru", users:412, pct:33, color:C.teal },
        { city:"Delhi NCR", users:298, pct:24, color:"#6366F1" },
        { city:"Mumbai",    users:276, pct:22, color:C.green },
        { city:"Hyderabad", users:149, pct:12, color:C.amber },
        { city:"Other",     users:112, pct:9,  color:C.slateL },
      ];
      const sectors = [["FinTech",32,C.teal],["HealthTech",24,"#6366F1"],["CleanTech",18,C.green],["EdTech",14,C.amber],["AgriTech",8,C.red],["Other",4,C.muted]];
      const sparkMax = Math.max(...(sparkData[activeMetric]||sparkData.users).map(d=>d.v));
      const retColor = v => v===null?"transparent":v>=75?C.green:v>=60?C.teal:v>=50?C.amber:C.red;
      return (
        <div style={{ padding:20,maxWidth:900,margin:"0 auto",paddingBottom:80 }}>
          {/* Header + date range */}
          <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20,flexWrap:"wrap",gap:10 }}>
            <div>
              <h2 style={{ fontSize:20,fontWeight:800,color:C.text,marginBottom:2,letterSpacing:"-0.02em" }}>Platform Analytics</h2>
              <p style={{ fontSize:13,color:C.muted }}>Real-time metrics across all user types and activities.</p>
            </div>
            <div style={{ display:"flex",gap:4,background:C.slateXL,borderRadius:9,padding:3 }}>
              {ranges.map(([id,label])=>(
                <button key={id} onClick={()=>setDateRange(id)}
                  style={{ padding:"5px 12px",borderRadius:7,border:"none",cursor:"pointer",fontFamily:"inherit",
                    fontSize:12,fontWeight:700,
                    background:dateRange===id?"#fff":"transparent",
                    color:dateRange===id?C.text:C.muted,
                    boxShadow:dateRange===id?"0 1px 4px rgba(0,0,0,0.1)":"none",
                    transition:"all 0.15s" }}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* KPI cards row */}
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:10,marginBottom:20 }}>
            {kpis.map(k=>(
              <Card key={k.id} style={{ padding:"14px 16px",cursor:"pointer",
                outline:activeMetric===k.id?`2px solid ${k.color}`:"none",
                boxShadow:activeMetric===k.id?`0 0 0 3px ${k.color}22`:"none",
                transition:"all 0.15s" }}
                onClick={()=>{ if(sparkData[k.id]) setActiveMetric(k.id); }}>
                <div style={{ display:"flex",alignItems:"center",gap:6,marginBottom:6 }}>
                  <span style={{ fontSize:16 }}>{k.icon}</span>
                  <span style={{ fontSize:11,color:C.muted,fontWeight:600 }}>{k.label}</span>
                </div>
                <div style={{ fontSize:22,fontWeight:800,color:C.text,letterSpacing:"-0.02em",marginBottom:4 }}>{k.value}</div>
                <div style={{ display:"flex",alignItems:"center",gap:6 }}>
                  <span style={{ fontSize:11,fontWeight:700,color:k.delta.startsWith("+")?C.green:C.red }}>{k.delta}</span>
                  <span style={{ fontSize:11,color:C.muted }}>{k.sub}</span>
                </div>
              </Card>
            ))}
          </div>

          {/* Main chart — custom SVG sparkline */}
          <Card style={{ padding:22,marginBottom:16 }}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18 }}>
              <div style={{ fontWeight:700,fontSize:15,color:C.text }}>
                {kpis.find(k=>k.id===activeMetric)?.label||"Trend"} — last 8 weeks
              </div>
              <div style={{ display:"flex",gap:4 }}>
                {(Object.keys(sparkData)).map(id=>(
                  <button key={id} onClick={()=>setActiveMetric(id)}
                    style={{ padding:"4px 10px",borderRadius:7,border:`1px solid ${activeMetric===id?C.teal:C.border}`,
                      background:activeMetric===id?C.tealDim:"transparent",
                      color:activeMetric===id?C.teal:C.muted,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"inherit" }}>
                    {id}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ position:"relative",height:140 }}>
              <svg width="100%" height="140" viewBox="0 0 600 140" preserveAspectRatio="none">
                {/* Grid lines */}
                {[0,33,67,100].map(pct=>(
                  <line key={pct} x1="0" y1={140-pct*1.4} x2="600" y2={140-pct*1.4}
                    stroke={C.slateXL} strokeWidth="1"/>
                ))}
                {/* Area fill */}
                {(()=>{
                  const pts = (sparkData[activeMetric]||[]).map((d,i,arr)=>{
                    const x = i*(600/(arr.length-1));
                    const y = 140 - (d.v/sparkMax)*130;
                    return [x,y];
                  });
                  const path = pts.map(([x,y],i)=>i===0?`M${x},${y}`:`C${x-20},${pts[i-1][1]} ${x-20},${y} ${x},${y}`).join(" ");
                  const area = path + ` L${pts[pts.length-1][0]},140 L0,140 Z`;
                  const col = kpis.find(k=>k.id===activeMetric)?.color||C.teal;
                  return (
                    <>
                      <defs>
                        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={col} stopOpacity="0.25"/>
                          <stop offset="100%" stopColor={col} stopOpacity="0.02"/>
                        </linearGradient>
                      </defs>
                      <path d={area} fill="url(#areaGrad)"/>
                      <path d={path} fill="none" stroke={col} strokeWidth="2.5" strokeLinecap="round"/>
                      {pts.map(([x,y],i)=>(
                        <circle key={i} cx={x} cy={y} r="4" fill={col} stroke="#fff" strokeWidth="2"/>
                      ))}
                    </>
                  );
                })()}
              </svg>
              {/* X-axis labels */}
              <div style={{ display:"flex",justifyContent:"space-between",marginTop:8 }}>
                {(sparkData[activeMetric]||[]).map(d=>(
                  <span key={d.l} style={{ fontSize:10,color:C.muted }}>{d.l}</span>
                ))}
              </div>
            </div>
          </Card>

          {/* Bottom row: Funnel + Sector + Geo */}
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:14,marginBottom:14 }}>
            {/* Conversion Funnel */}
            <Card style={{ padding:20 }}>
              <div style={{ fontWeight:700,fontSize:14,color:C.text,marginBottom:16 }}>Conversion Funnel</div>
              {funnelData.map((step,i)=>(
                <div key={step.label} style={{ marginBottom:i<funnelData.length-1?12:0 }}>
                  <div style={{ display:"flex",justifyContent:"space-between",marginBottom:5 }}>
                    <span style={{ fontSize:12,color:C.text,fontWeight:500 }}>{step.label}</span>
                    <span style={{ fontSize:12,fontWeight:700,color:step.color }}>{step.v.toLocaleString()}</span>
                  </div>
                  <div style={{ height:6,borderRadius:999,background:C.slateXL }}>
                    <div style={{ width:step.pct+"%",height:"100%",borderRadius:999,background:step.color,transition:"width 0.5s" }}/>
                  </div>
                </div>
              ))}
            </Card>

            {/* Sector mix */}
            <Card style={{ padding:20 }}>
              <div style={{ fontWeight:700,fontSize:14,color:C.text,marginBottom:16 }}>Sector Mix</div>
              {sectors.map(([s,p,c])=>(
                <div key={s} style={{ marginBottom:10 }}>
                  <div style={{ display:"flex",justifyContent:"space-between",marginBottom:4 }}>
                    <span style={{ fontSize:12,color:C.text }}>{s}</span>
                    <span style={{ fontSize:12,fontWeight:700,color:c }}>{p}%</span>
                  </div>
                  <div style={{ height:5,borderRadius:999,background:C.slateXL }}>
                    <div style={{ width:p+"%",height:"100%",borderRadius:999,background:c }}/>
                  </div>
                </div>
              ))}
            </Card>

            {/* Geography */}
            <Card style={{ padding:20 }}>
              <div style={{ fontWeight:700,fontSize:14,color:C.text,marginBottom:16 }}>Geography</div>
              {geoData.map(g=>(
                <div key={g.city} style={{ display:"flex",alignItems:"center",gap:10,marginBottom:11 }}>
                  <div style={{ width:8,height:8,borderRadius:4,background:g.color,flexShrink:0 }}/>
                  <span style={{ fontSize:12,color:C.text,flex:1 }}>{g.city}</span>
                  <span style={{ fontSize:12,fontWeight:700,color:C.text }}>{g.users}</span>
                  <span style={{ fontSize:11,color:C.muted,width:32,textAlign:"right" }}>{g.pct}%</span>
                </div>
              ))}
            </Card>
          </div>

          {/* Cohort retention table */}
          <Card style={{ padding:20 }}>
            <div style={{ fontWeight:700,fontSize:14,color:C.text,marginBottom:4 }}>Cohort Retention</div>
            <p style={{ fontSize:12,color:C.muted,marginBottom:16 }}>% of users still active after N weeks (by signup month)</p>
            <div style={{ overflowX:"auto" }}>
              <table style={{ width:"100%",borderCollapse:"collapse",minWidth:400 }}>
                <thead>
                  <tr>
                    {["Month","Size","Week 1","Week 2","Week 4","Week 8"].map(h=>(
                      <th key={h} style={{ padding:"8px 10px",textAlign:h==="Month"||h==="Size"?"left":"center",
                        fontSize:11,fontWeight:700,color:C.muted,letterSpacing:"0.05em",textTransform:"uppercase" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {cohortData.map((row,i)=>(
                    <tr key={i} style={{ borderTop:`1px solid ${C.slateXL}` }}>
                      <td style={{ padding:"10px 10px",fontSize:13,fontWeight:600,color:C.text }}>{row.month}</td>
                      <td style={{ padding:"10px 10px",fontSize:13,color:C.muted }}>{row.users}</td>
                      {[row.w1,row.w2,row.w4,row.w8].map((v,ci)=>(
                        <td key={ci} style={{ padding:"10px 10px",textAlign:"center" }}>
                          {v===null
                            ? <span style={{ color:C.slateL,fontSize:12 }}>—</span>
                            : <span style={{ display:"inline-block",padding:"3px 8px",borderRadius:6,
                                background:retColor(v)+"18",color:retColor(v),
                                fontSize:12,fontWeight:700 }}>{v}%</span>
                          }
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      );
    })(),
    revenue: (
      <div style={{ padding:20, maxWidth:760, margin:"0 auto", paddingBottom:80 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:24 }}>
          <div>
            <h2 style={{ fontSize:20, fontWeight:800, color:C.text, marginBottom:4, letterSpacing:"-0.02em" }}>Revenue & Monetization</h2>
            <p style={{ fontSize:13, color:C.muted }}>Platform revenue, subscriptions, and affiliate payouts.</p>
          </div>
          <Btn v="primary" sz="sm" onClick={()=>nav("adminPayment")}>⚙ Payment Setup</Btn>
        </div>

        {/* KPI row */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))", gap:12, marginBottom:20 }}>
          {[
            {v:"₹24.1L", l:"Total MRR",     c:C.teal,    ch:"+18%"},
            {v:"₹2.89 Cr",l:"ARR Run-rate", c:"#6366F1", ch:"+18%"},
            {v:"₹3.1L",  l:"Subscriptions", c:C.green,   ch:"+22%"},
            {v:"₹12.6L", l:"Event Hosting", c:C.amber,   ch:"+9%"},
            {v:"₹8.4L",  l:"Featured Listings",c:C.text, ch:"+5%"},
            {v:"4.2%",   l:"Churn Rate",    c:C.red,     ch:"-0.3%"},
          ].map(s=>(
            <Card key={s.l} style={{ padding:16 }}>
              <div style={{ fontSize:18, fontWeight:800, color:s.c, letterSpacing:"-0.02em", marginBottom:2 }}>{s.v}</div>
              <div style={{ fontSize:11, color:C.muted, marginBottom:6 }}>{s.l}</div>
              <div style={{ fontSize:11, fontWeight:700, color:s.ch.startsWith("-")?C.red:C.green }}>{s.ch} MoM</div>
            </Card>
          ))}
        </div>

        {/* MRR Chart */}
        <Card style={{ padding:22, marginBottom:14 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
            <div style={{ fontWeight:700, fontSize:15, color:C.text }}>Monthly Recurring Revenue</div>
            <div style={{ display:"flex", gap:6 }}>
              {["6M","1Y","All"].map(t=>(
                <button key={t} onClick={()=>setMrrRange(t)}
                  style={{ padding:"4px 10px", borderRadius:7, border:`1px solid ${t===mrrRange?C.teal:C.border}`, background:t===mrrRange?C.tealDim:"transparent", color:t===mrrRange?C.teal:C.muted, fontSize:11, fontWeight:600, cursor:"pointer", fontFamily:"inherit", transition:"all 0.15s" }}>{t}</button>
              ))}
            </div>
          </div>
          {/* SVG area chart */}
          {(()=>{
            const data = [
              {l:"Oct",sub:2.1,events:4.2,feat:2.8},
              {l:"Nov",sub:2.4,events:5.1,feat:3.1},
              {l:"Dec",sub:2.2,events:4.8,feat:2.9},
              {l:"Jan",sub:2.8,events:6.7,feat:3.4},
              {l:"Feb",sub:3.0,events:7.4,feat:3.8},
              {l:"Mar",sub:3.1,events:12.6,feat:8.4},
            ];
            const maxV = 25;
            const W=500, H=140, pad=36;
            const x = i => pad + (i/(data.length-1))*(W-pad*2);
            const y = v => H - 24 - (v/maxV)*(H-40);
            const path = (key, offset=0) => data.map((d,i)=>`${i===0?"M":"L"}${x(i)},${y(d[key]+offset)}`).join(" ");
            const stackedPath = (top,bot) => {
              const fwd = data.map((d,i)=>`${i===0?"M":"L"}${x(i)},${y(d[top]+d[bot])}`).join(" ");
              const rev = [...data].reverse().map((d,i,arr)=>`L${x(arr.length-1-i)},${y(d[bot])}`).join(" ");
              return fwd+" "+rev+" Z";
            };
            return (
              <div style={{ position:"relative" }}>
                <svg viewBox={`0 0 ${W} ${H}`} style={{ width:"100%", height:H }}>
                  {/* Grid lines */}
                  {[0,5,10,15,20,25].map(v=>(
                    <g key={v}>
                      <line x1={pad} y1={y(v)} x2={W-pad} y2={y(v)} stroke={C.border} strokeWidth={1}/>
                      <text x={pad-6} y={y(v)+4} textAnchor="end" fontSize={9} fill={C.muted}>₹{v}L</text>
                    </g>
                  ))}
                  {/* Stacked areas */}
                  <path d={stackedPath("sub","events")} fill="rgba(245,158,11,0.15)"/>
                  <path d={(() => {
                    const fwd = data.map((d,i)=>`${i===0?"M":"L"}${x(i)},${y(d.sub+d.events+d.feat)}`).join(" ");
                    const rev = [...data].reverse().map((d,i,arr)=>`L${x(arr.length-1-i)},${y(d.sub+d.events)}`).join(" ");
                    return fwd+" "+rev+" Z";
                  })()} fill="rgba(99,102,241,0.2)"/>
                  <path d={(() => {
                    const fwd = data.map((d,i)=>`${i===0?"M":"L"}${x(i)},${y(d.sub)}`).join(" ");
                    const bot = `L${x(data.length-1)},${y(0)} L${x(0)},${y(0)} Z`;
                    return fwd+" "+bot;
                  })()} fill={C.tealDim}/>
                  {/* Lines */}
                  <path d={data.map((d,i)=>`${i===0?"M":"L"}${x(i)},${y(d.sub)}`).join(" ")} fill="none" stroke={C.teal} strokeWidth={2}/>
                  <path d={data.map((d,i)=>`${i===0?"M":"L"}${x(i)},${y(d.sub+d.events)}`).join(" ")} fill="none" stroke={C.amber} strokeWidth={2}/>
                  <path d={data.map((d,i)=>`${i===0?"M":"L"}${x(i)},${y(d.sub+d.events+d.feat)}`).join(" ")} fill="none" stroke="#6366F1" strokeWidth={2}/>
                  {/* X labels */}
                  {data.map((d,i)=>(
                    <text key={i} x={x(i)} y={H-6} textAnchor="middle" fontSize={9} fill={C.muted}>{d.l}</text>
                  ))}
                  {/* Latest dot */}
                  <circle cx={x(data.length-1)} cy={y(data[data.length-1].sub+data[data.length-1].events+data[data.length-1].feat)} r={4} fill="#6366F1"/>
                </svg>
                {/* Legend */}
                <div style={{ display:"flex", gap:16, marginTop:8, flexWrap:"wrap" }}>
                  {[[C.teal,"Subscriptions"],[C.amber,"Event Hosting"],["#6366F1","Featured"]].map(([c,l])=>(
                    <div key={l} style={{ display:"flex", alignItems:"center", gap:6, fontSize:11, color:C.muted }}>
                      <div style={{ width:20, height:3, borderRadius:2, background:c }}/>
                      {l}
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </Card>

        {/* Plan distribution */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:14 }}>
          <Card style={{ padding:20 }}>
            <div style={{ fontWeight:700, fontSize:14, color:C.text, marginBottom:16 }}>Plan Distribution</div>
            {[
              {plan:"Starter (Free)", count:842, pct:67, color:C.slateL},
              {plan:"Pro",            count:298, pct:24, color:"#6366F1"},
              {plan:"Growth",         count:112, pct:9,  color:C.amber},
            ].map(p=>(
              <div key={p.plan} style={{ marginBottom:12 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                  <span style={{ fontSize:12, color:C.text, fontWeight:600 }}>{p.plan}</span>
                  <span style={{ fontSize:12, color:C.muted }}>{p.count} ({p.pct}%)</span>
                </div>
                <div style={{ height:6, borderRadius:999, background:C.slateXL }}>
                  <div style={{ width:p.pct+"%", height:"100%", borderRadius:999, background:p.color }}/>
                </div>
              </div>
            ))}
          </Card>

          <Card style={{ padding:20 }}>
            <div style={{ fontWeight:700, fontSize:14, color:C.text, marginBottom:16 }}>Revenue Breakdown</div>
            {[
              {l:"Subscriptions",    v:"₹3.1L",  pct:13, c:C.teal},
              {l:"Event Hosting",    v:"₹12.6L", pct:52, c:C.amber},
              {l:"Featured Listings",v:"₹8.4L",  pct:35, c:"#6366F1"},
            ].map(r=>(
              <div key={r.l} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 12px", borderRadius:9, background:C.offWhite, marginBottom:8 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <div style={{ width:8, height:8, borderRadius:4, background:r.c }}/>
                  <span style={{ fontSize:13, color:C.text }}>{r.l}</span>
                </div>
                <div style={{ textAlign:"right" }}>
                  <span style={{ fontSize:14, fontWeight:800, color:r.c }}>{r.v}</span>
                  <span style={{ fontSize:11, color:C.muted, marginLeft:6 }}>{r.pct}%</span>
                </div>
              </div>
            ))}
          </Card>
        </div>

        {/* Coupon performance */}
        <Card style={{ padding:20, marginBottom:14 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
            <div style={{ fontWeight:700, fontSize:14, color:C.text }}>Coupon Performance</div>
            <Btn v="secondary" sz="sm" onClick={()=>nav("adminCoupons")}>Manage</Btn>
          </div>
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead>
                <tr style={{ borderBottom:`1px solid ${C.border}` }}>
                  {["Code","Type","Uses","Revenue Impact","Status"].map(h=>(
                    <th key={h} style={{ padding:"8px 12px", textAlign:"left", fontSize:11, fontWeight:700, color:C.muted, letterSpacing:"0.05em", textTransform:"uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  {code:"LAUNCH50",   type:"50% off",  uses:142, impact:"-₹2.1L",  active:true},
                  {code:"FOUNDER500", type:"₹500 flat",uses:38,  impact:"-₹19K",   active:true},
                  {code:"NASSCOM25",  type:"25% off",  uses:67,  impact:"-₹84K",   active:true},
                  {code:"FREETRIAL",  type:"30d trial",uses:204, impact:"-₹0",     active:false},
                ].map((c,i)=>(
                  <tr key={i} style={{ borderBottom:`1px solid ${C.slateXL}` }}>
                    <td style={{ padding:"11px 12px", fontWeight:700, fontSize:13, color:C.text, fontFamily:"monospace" }}>{c.code}</td>
                    <td style={{ padding:"11px 12px", fontSize:13, color:C.muted }}>{c.type}</td>
                    <td style={{ padding:"11px 12px", fontSize:13, color:C.text, fontWeight:600 }}>{c.uses}</td>
                    <td style={{ padding:"11px 12px", fontSize:13, color:C.red, fontWeight:600 }}>{c.impact}</td>
                    <td style={{ padding:"11px 12px" }}><Badge v={c.active?"green":"red"}>{c.active?"Active":"Off"}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Affiliate payouts */}
        <Card style={{ padding:20, marginBottom:80 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
            <div>
              <div style={{ fontWeight:700, fontSize:14, color:C.text, marginBottom:2 }}>Affiliate Payouts</div>
              <div style={{ fontSize:12, color:C.muted }}>Pending referral credits to process this cycle</div>
            </div>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontWeight:800, fontSize:18, color:C.amber }}>₹8,500</div>
              <div style={{ fontSize:11, color:C.muted }}>Total pending</div>
            </div>
          </div>
          {(()=>{
            const [paid, setPaid] = useState(new Set(["Meera Kapoor"]));
            const payAll = () => setPaid(new Set(["Priya Sharma","Arjun Mehta","Sunita Nair","Vikram Rao","Meera Kapoor"]));
            const affiliates = [
              {name:"Priya Sharma", refs:3, pending:"₹500",  total:"₹2,500"},
              {name:"Arjun Mehta",  refs:7, pending:"₹1,000",total:"₹7,000"},
              {name:"Sunita Nair",  refs:2, pending:"₹500",  total:"₹1,000"},
              {name:"Vikram Rao",   refs:12,pending:"₹2,000",total:"₹12,000"},
              {name:"Meera Kapoor", refs:4, pending:"₹500",  total:"₹4,500"},
            ];
            return (<>
              {affiliates.map((a,i)=>(
                <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 0", borderBottom:i<4?`1px solid ${C.slateXL}`:"none" }}>
                  <Avatar name={a.name} size={36}/>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:600, fontSize:13, color:C.text }}>{a.name}</div>
                    <div style={{ fontSize:11, color:C.muted }}>{a.refs} referrals | {a.total} lifetime earned</div>
                  </div>
                  <div style={{ textAlign:"right", marginRight:10 }}>
                    <div style={{ fontWeight:700, fontSize:14, color:paid.has(a.name)?C.green:C.amber }}>{a.pending}</div>
                    <div style={{ fontSize:10, color:C.muted }}>{paid.has(a.name)?"paid":"pending"}</div>
                  </div>
                  {!paid.has(a.name)
                    ? <Btn v="primary" sz="sm" onClick={()=>setPaid(p=>new Set([...p,a.name]))}>Pay</Btn>
                    : <Badge v="green">Paid</Badge>
                  }
                </div>
              ))}
              <div style={{ marginTop:16, paddingTop:16, borderTop:`1px solid ${C.border}` }}>
                <Btn v="primary" full onClick={payAll}>
                  {paid.size>=5 ? "All Payouts Processed" : `Process All Pending Payouts (₹4,000)`}
                </Btn>
              </div>
            </>);
          })()}
        </Card>
      </div>
    ),
    gear: <SettingsPage nav={nav}/>,
    support: (()=>{
      const [tickets, setTickets] = useState([
        { id:"TKT-0042", user:"Priya Sharma",    role:"Founder",  subject:"KYC document not accepted",      category:"kyc",     priority:"high",   status:"open",     created:"Mar 7",  lastMsg:"2h ago",  msgs:[{from:"user",text:"My Aadhaar upload keeps failing with invalid format. I have tried PDF and JPG.",time:"Mar 7, 10:14"}] },
        { id:"TKT-0041", user:"Arjun Mehta",     role:"Investor", subject:"Intro request not delivered",    category:"intro",   priority:"medium", status:"open",     created:"Mar 6",  lastMsg:"5h ago",  msgs:[{from:"user",text:"I sent an intro request to GreenTech 2 days ago and have not heard anything.",time:"Mar 6, 14:30"}] },
        { id:"TKT-0040", user:"Sunita Patel",    role:"Partner",  subject:"Event capacity not updating",    category:"account", priority:"medium", status:"pending",  created:"Mar 5",  lastMsg:"1d ago",  msgs:[{from:"user",text:"Registered 45 attendees but dashboard still shows 32.",time:"Mar 5, 09:00"},{from:"admin",text:"Looking into this, may be a caching issue. We will update shortly.",time:"Mar 5, 11:30"}] },
        { id:"TKT-0039", user:"Karan Singh",     role:"Founder",  subject:"Billing charge dispute",         category:"billing", priority:"high",   status:"open",     created:"Mar 4",  lastMsg:"2d ago",  msgs:[{from:"user",text:"Charged twice in February. Need a refund.",time:"Mar 4, 16:00"}] },
        { id:"TKT-0038", user:"Meera Iyer",      role:"Investor", subject:"Profile visibility issue",       category:"account", priority:"low",    status:"pending",  created:"Mar 2",  lastMsg:"3d ago",  msgs:[{from:"user",text:"My profile is not showing in search even though it is set to public.",time:"Mar 2, 12:00"}] },
        { id:"TKT-0037", user:"Rahul Verma",     role:"Founder",  subject:"Pitch deck corrupted on upload", category:"docs",    priority:"medium", status:"resolved", created:"Feb 28", lastMsg:"Feb 28",  msgs:[{from:"user",text:"PDF uploads fine but renders blank in the data room.",time:"Feb 28, 08:00"},{from:"admin",text:"Fixed — this was a PDF version compatibility issue. Please re-upload.",time:"Feb 28, 15:00"}] },
      ]);
      const [activeTicket, setActiveTicket] = useState(null);
      const [reply,        setReply]        = useState("");
      const [filterStatus, setFilterStatus] = useState("all");
      const [filterPrio,   setFilterPrio]   = useState("all");
      const [srchTkt,      setSrchTkt]      = useState("");
      const adminToast = useToast();

      const STATUS_COL = {
        open:     { bg:"rgba(239,68,68,0.08)",  color:"#EF4444", label:"Open" },
        pending:  { bg:"rgba(245,158,11,0.08)", color:"#F59E0B", label:"Pending" },
        resolved: { bg:"rgba(16,185,129,0.08)", color:"#10B981", label:"Resolved" },
      };
      const PRIO_COL = { high:"#EF4444", medium:"#F59E0B", low:"#94A3B8" };
      const ROLE_COL = { Founder:C.teal, Investor:"#6366F1", Partner:C.amber };

      const filtered = tickets.filter(t=>
        (filterStatus==="all"||t.status===filterStatus) &&
        (filterPrio==="all"||t.priority===filterPrio) &&
        (srchTkt===""||t.subject.toLowerCase().includes(srchTkt.toLowerCase())||t.user.toLowerCase().includes(srchTkt.toLowerCase()))
      );

      const sendReply = id => {
        if(!reply.trim()) return;
        setTickets(p=>p.map(t=>t.id===id?{...t,status:"pending",lastMsg:"Just now",msgs:[...t.msgs,{from:"admin",text:reply.trim(),time:"Just now"}]}:t));
        setReply(""); adminToast("Reply sent","success");
      };
      const changeStatus = (id,status) => {
        setTickets(p=>p.map(t=>t.id===id?{...t,status}:t));
        adminToast(`Ticket ${id} marked as ${status}`,"info");
      };

      const openCnt = tickets.filter(t=>t.status==="open").length;
      const pendCnt = tickets.filter(t=>t.status==="pending").length;
      const highCnt = tickets.filter(t=>t.priority==="high"&&t.status!=="resolved").length;

      return (
        <div style={{ padding:20,maxWidth:900,margin:"0 auto",paddingBottom:80 }}>
          <div style={{ marginBottom:20 }}>
            <h2 style={{ fontSize:20,fontWeight:800,color:C.text,marginBottom:4,letterSpacing:"-0.02em" }}>Support Tickets</h2>
            <p style={{ fontSize:13,color:C.muted }}>Manage user issues, disputes, and requests.</p>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:10,marginBottom:20 }}>
            {[["Open",openCnt,"🔴","#EF4444"],["Pending",pendCnt,"🟡","#F59E0B"],["High Priority",highCnt,"🚨","#EF4444"],["Total",tickets.length,"🎫",C.teal]].map(([l,v,icon,c])=>(
              <Card key={l} style={{ padding:"14px 16px" }}>
                <div style={{ fontSize:16,marginBottom:4 }}>{icon}</div>
                <div style={{ fontSize:11,color:C.muted,marginBottom:4,fontWeight:600 }}>{l}</div>
                <div style={{ fontSize:24,fontWeight:800,color:c,letterSpacing:"-0.02em" }}>{v}</div>
              </Card>
            ))}
          </div>
          <div style={{ display:"flex",gap:8,marginBottom:14,flexWrap:"wrap",alignItems:"center" }}>
            <input value={srchTkt} onChange={e=>setSrchTkt(e.target.value)} placeholder="Search tickets or users..."
              style={{ flex:1,minWidth:160,padding:"8px 12px",borderRadius:9,border:`1px solid ${C.border}`,fontSize:13,fontFamily:"inherit",color:C.text,outline:"none" }}
              onFocus={e=>e.target.style.borderColor=C.teal} onBlur={e=>e.target.style.borderColor=C.border}/>
            <select value={filterStatus} onChange={e=>setFilterStatus(e.target.value)}
              style={{ padding:"8px 10px",borderRadius:9,border:`1px solid ${C.border}`,fontSize:12,fontFamily:"inherit",color:C.text,background:"#fff",outline:"none",cursor:"pointer" }}>
              <option value="all">All Status</option><option value="open">Open</option><option value="pending">Pending</option><option value="resolved">Resolved</option>
            </select>
            <select value={filterPrio} onChange={e=>setFilterPrio(e.target.value)}
              style={{ padding:"8px 10px",borderRadius:9,border:`1px solid ${C.border}`,fontSize:12,fontFamily:"inherit",color:C.text,background:"#fff",outline:"none",cursor:"pointer" }}>
              <option value="all">All Priority</option><option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option>
            </select>
          </div>
          <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
            {filtered.length===0
              ? <EmptyState icon="🎫" title="No tickets match" body="Try adjusting your filters." cta="Clear Filters" onCta={()=>{ setFilterStatus("all"); setFilterPrio("all"); setSrchTkt(""); }} compact/>
              : filtered.map(t=>{
                  const ss=STATUS_COL[t.status]; const isAct=activeTicket===t.id;
                  return (
                    <Card key={t.id} style={{ padding:0,overflow:"hidden",border:`1.5px solid ${isAct?C.teal:t.priority==="high"&&t.status!=="resolved"?"rgba(239,68,68,0.3)":C.border}` }}>
                      <div style={{ padding:"14px 16px",cursor:"pointer" }} onClick={()=>setActiveTicket(isAct?null:t.id)}>
                        <div style={{ display:"flex",alignItems:"flex-start",gap:10 }}>
                          <div style={{ width:3,alignSelf:"stretch",borderRadius:2,background:PRIO_COL[t.priority],flexShrink:0 }}/>
                          <div style={{ flex:1,minWidth:0 }}>
                            <div style={{ fontWeight:700,fontSize:14,color:C.text,marginBottom:4 }}>{t.subject}</div>
                            <div style={{ display:"flex",alignItems:"center",gap:8,flexWrap:"wrap" }}>
                              <span style={{ fontSize:11,color:C.muted }}>{t.id}</span>
                              <span style={{ fontSize:11,fontWeight:700,color:ROLE_COL[t.role]||C.teal,background:(ROLE_COL[t.role]||C.teal)+"15",padding:"1px 7px",borderRadius:99 }}>{t.role}</span>
                              <span style={{ fontSize:11,color:C.muted }}>{t.user}</span>
                              <span style={{ marginLeft:"auto",fontSize:11,color:C.muted }}>{t.lastMsg}</span>
                            </div>
                          </div>
                          <div style={{ display:"flex",flexDirection:"column",alignItems:"flex-end",gap:5,flexShrink:0 }}>
                            <span style={{ padding:"3px 8px",borderRadius:99,fontSize:11,fontWeight:700,background:ss.bg,color:ss.color }}>{ss.label}</span>
                            <span style={{ fontSize:10,fontWeight:700,color:PRIO_COL[t.priority],textTransform:"uppercase" }}>{t.priority}</span>
                          </div>
                        </div>
                      </div>
                      {isAct && (
                        <div style={{ borderTop:`1px solid ${C.slateXL}`,padding:"14px 16px",background:"rgba(248,250,252,0.6)" }}>
                          <div style={{ display:"flex",flexDirection:"column",gap:10,marginBottom:14 }}>
                            {t.msgs.map((m,i)=>(
                              <div key={i} style={{ display:"flex",justifyContent:m.from==="admin"?"flex-end":"flex-start" }}>
                                <div style={{ maxWidth:"80%",padding:"10px 14px",borderRadius:14,
                                  borderBottomRightRadius:m.from==="admin"?4:14,borderBottomLeftRadius:m.from==="user"?4:14,
                                  background:m.from==="admin"?C.navy:"#fff",border:m.from==="user"?`1px solid ${C.border}`:"none",
                                  fontSize:13,color:m.from==="admin"?"#fff":C.text,lineHeight:1.55 }}>
                                  <div style={{ fontSize:10,fontWeight:700,marginBottom:4,color:m.from==="admin"?"rgba(255,255,255,0.5)":C.muted }}>
                                    {m.from==="admin"?"🛡 Support Team":t.user} · {m.time}
                                  </div>
                                  {m.text}
                                </div>
                              </div>
                            ))}
                          </div>
                          {t.status!=="resolved" && (
                            <div style={{ display:"flex",gap:8,marginBottom:10 }}>
                              <textarea value={reply} onChange={e=>setReply(e.target.value)} rows={2} placeholder="Type your reply..."
                                style={{ flex:1,padding:"9px 12px",borderRadius:9,border:`1.5px solid ${C.border}`,fontSize:13,fontFamily:"inherit",color:C.text,resize:"vertical",outline:"none" }}
                                onFocus={e=>e.target.style.borderColor=C.teal} onBlur={e=>e.target.style.borderColor=C.border}/>
                              <Btn v="primary" sz="sm" onClick={()=>sendReply(t.id)}>Reply</Btn>
                            </div>
                          )}
                          <div style={{ display:"flex",gap:8,flexWrap:"wrap" }}>
                            {t.status!=="resolved" && (
                              <>
                                <Btn v="secondary" sz="sm" onClick={()=>changeStatus(t.id,"pending")}>Mark Pending</Btn>
                                <Btn v="primary" sz="sm" onClick={()=>{ changeStatus(t.id,"resolved"); setActiveTicket(null); }}>✓ Resolve</Btn>
                              </>
                            )}
                            {t.status==="resolved" && <Btn v="secondary" sz="sm" onClick={()=>changeStatus(t.id,"open")}>Reopen</Btn>}
                            <button onClick={()=>adminToast("Ticket escalated to senior team","warning")}
                              style={{ padding:"5px 12px",borderRadius:8,border:`1px solid ${C.amber}`,background:"rgba(245,158,11,0.06)",color:C.amber,fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"inherit" }}>
                              ⚡ Escalate
                            </button>
                          </div>
                        </div>
                      )}
                    </Card>
                  );
                })
            }
          </div>
        </div>
      );
    })(),
  };

  const handleNav = p => {
    if(p==="gear") nav("adminSettings");
    else if(p==="moderation") nav("adminModeration");
    else setPage(p);
  };

  return (
    <div style={{ background:C.offWhite,minHeight:"100vh" }}>
      <Sidebar nav={navItems} active={page} onSelect={handleNav} role="Super Admin" open={sidebar} onClose={()=>setSidebar(false)} onSignOut={()=>nav("landing")}/>
      <div>
        <div style={{ height:60,background:C.navy,borderBottom:"1px solid rgba(255,255,255,0.08)",
          display:"flex",alignItems:"center",padding:"0 20px",
          position:"sticky",top:0,zIndex:100 }}>
          <button onClick={()=>setSidebar(true)}
            style={{ background:"none",border:"none",cursor:"pointer",padding:4,
              color:"rgba(255,255,255,0.5)",marginRight:14,display:"flex" }}>
            <Icon d={I.menu} size={22}/>
          </button>
          <div style={{ flex:1,display:"flex",alignItems:"center",gap:9 }}>
            <div style={{ width:26,height:26,borderRadius:7,background:C.teal,
              display:"flex",alignItems:"center",justifyContent:"center" }}>
              <Icon d={I.link} size={13} sw={2.5}/>
            </div>
            <span style={{ color:"#fff",fontWeight:800,fontSize:16,letterSpacing:"-0.02em" }}>
              FundLink <span style={{ color:"rgba(255,255,255,0.28)",fontWeight:400 }}>Admin</span>
            </span>
          </div>
          <div style={{ display:"flex",alignItems:"center",gap:8 }}>
            <div style={{ width:7,height:7,borderRadius:4,background:C.green }}/>
            <span style={{ color:"rgba(255,255,255,0.38)",fontSize:12 }}>All systems nominal</span>
            <Avatar name="Admin" size={30}/>
          </div>
        </div>
        {loadingAdmin && page==="overview"
          ? <div style={{ padding:20, maxWidth:900, margin:"0 auto", display:"flex", flexDirection:"column", gap:14 }}>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:12 }}>
                {[1,2,3,4].map(i=><SkeletonCard key={i} rows={2}/>)}
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                <SkeletonCard rows={5}/><SkeletonCard rows={5}/>
              </div>
              <SkeletonCard rows={4}/>
            </div>
          : (pages[page]||pages.overview)
        }
      </div>

      {/* User Detail Modal */}
      <Modal open={!!editUser} onClose={()=>{ if(!editSaved) setEditUser(null); }} title={editUser?editUser.name:""}>
        {editUser && (
          editSaved
            ? <div style={{ textAlign:"center",padding:"20px 0" }}>
                <div style={{ width:56,height:56,borderRadius:28,background:"rgba(16,185,129,0.12)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px" }}>
                  <Icon d={I.check} size={26} sw={2.5} style={{ color:C.green }}/>
                </div>
                <div style={{ fontWeight:700,fontSize:17,color:C.text,marginBottom:6 }}>User Updated</div>
                <Btn v="primary" onClick={()=>{ setEditUser(null); setEditSaved(false); }}>Done</Btn>
              </div>
            : <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
                {/* User header */}
                <div style={{ display:"flex",alignItems:"center",gap:14,padding:"14px 16px",borderRadius:12,background:C.offWhite }}>
                  <Avatar name={editUser.name} size={52}/>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:800,fontSize:16,color:C.text }}>{editUser.name}</div>
                    <div style={{ fontSize:13,color:C.muted }}>{editUser.email}</div>
                    <div style={{ display:"flex",gap:6,marginTop:6,flexWrap:"wrap" }}>
                      <Badge v={editUser.role==="Founder"?"teal":editUser.role==="Investor"?"indigo":"amber"}>{editUser.role}</Badge>
                      <Badge v={editUser.kyc==="approved"?"green":editUser.kyc==="pending"?"amber":"red"}>{editUser.kyc||"unverified"}</Badge>
                      <Badge v={editUser.st==="active"?"green":"red"}>{editUser.st}</Badge>
                    </div>
                  </div>
                </div>
                {/* Stats */}
                <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(100px,1fr))",gap:8 }}>
                  {[{l:"Joined",v:editUser.joined},{l:"Intros",v:editUser.intros||"—"},{l:"Last active",v:editUser.lastActive||"Today"}].map(s=>(
                    <div key={s.l} style={{ padding:"10px 12px",borderRadius:10,background:C.offWhite,textAlign:"center" }}>
                      <div style={{ fontWeight:700,fontSize:14,color:C.text }}>{s.v}</div>
                      <div style={{ fontSize:11,color:C.muted,marginTop:2 }}>{s.l}</div>
                    </div>
                  ))}
                </div>
                {/* Edit fields */}
                <FInput label="Full Name" defaultValue={editUser.name}/>
                <FInput label="Email" defaultValue={editUser.email}/>
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10 }}>
                  <FSelect label="Role" defaultValue={editUser.role.toLowerCase()} options={[{value:"founder",label:"Founder"},{value:"investor",label:"Investor"},{value:"partner",label:"Partner"}]}/>
                  <FSelect label="Status" defaultValue={editUser.st} options={[{value:"active",label:"Active"},{value:"suspended",label:"Suspended"},{value:"pending",label:"Pending"}]}/>
                </div>
                <FSelect label="KYC Status" defaultValue={editUser.kyc||"pending"} options={[{value:"pending",label:"Pending"},{value:"approved",label:"Approved"},{value:"rejected",label:"Rejected"}]}/>
                <FInput label="Internal Notes" rows={2} placeholder="Notes visible only to admins..."/>
                {/* Danger zone */}
                <div style={{ padding:"12px 14px",borderRadius:10,background:"rgba(239,68,68,0.05)",border:"1px solid rgba(239,68,68,0.15)" }}>
                  <div style={{ fontSize:12,fontWeight:700,color:C.red,marginBottom:8 }}>Danger Zone</div>
                  <div style={{ display:"flex",gap:8,flexWrap:"wrap" }}>
                    <Btn v="danger" sz="sm" onClick={()=>toggleSuspend(editUser.name)}>{editUser.st==="active"?"Suspend Account":"Restore Account"}</Btn>
                    <Btn v="danger" sz="sm" onClick={()=>{}}>Reset Password</Btn>
                  </div>
                </div>
                <div style={{ display:"flex",gap:10 }}>
                  <Btn v="secondary" full onClick={()=>setEditUser(null)}>Cancel</Btn>
                  <Btn v="primary" full onClick={()=>setEditSaved(true)}>Save Changes</Btn>
                </div>
              </div>
        )}
      </Modal>
    </div>
  );
};

// ─── INVESTOR PROFILE PAGE ───────────────────────────────────────────────────
const InvestorProfilePage = ({ nav }) => {
  const [sidebar, setSidebar] = useState(false);
  const [page, setPage] = useState("profile");
  const [firstName,   setFirstName]   = useState("Arjun");
  const [lastName,    setLastName]    = useState("Mehta");
  const [firm,        setFirm]        = useState("TechBridge Capital");
  const [title,       setTitle]       = useState("Managing Partner");
  const [location,    setLocation]    = useState("Mumbai, Maharashtra");
  const [linkedinUrl, setLinkedinUrl] = useState("linkedin.com/in/arjunmehta");
  const [bio,         setBio]         = useState("Early-stage investor focused on deep tech and FinTech startups across India.");
  const [minTicket,   setMinTicket]   = useState("50,00,000");
  const [maxTicket,   setMaxTicket]   = useState("2,00,00,000");
  const [thesis,      setThesis]      = useState("We back mission-driven founders solving real problems with scalable tech.");
  const [sectors, setSectors] = useState(["FinTech","HealthTech"]);
  const [stages, setStages] = useState(["Seed","Pre-Series A"]);
  const [saveState, setSaveState] = useState("idle");
  const handleSave = () => { setSaveState("saving"); setTimeout(() => { setSaveState("saved"); setTimeout(() => setSaveState("idle"), 2200); }, 900); };

  const navItems = [
    {id:"home",      icon:"home",     label:"Dashboard",       short:"Home"},
    {id:"browse",    icon:"search",   label:"Browse Startups", short:"Browse"},
    {id:"saved",     icon:"bookmark", label:"Saved",           short:"Saved"},
    {id:"portfolio", icon:"bar",      label:"Portfolio",       short:"Portfolio"},
    {id:"profile",   icon:"users",    label:"My Profile",      short:"Profile"},
  ];

  const toggleSector = s => setSectors(p => p.includes(s) ? p.filter(x=>x!==s) : [...p,s]);
  const toggleStage  = s => setStages( p => p.includes(s) ? p.filter(x=>x!==s) : [...p,s]);

  return (
    <div style={{ background:C.offWhite, minHeight:"100vh" }}>
      <Sidebar nav={navItems} active={page} onSelect={p=>{ if(p!=="profile") nav("investor"); else setPage(p); }} role="Investor" open={sidebar} onClose={()=>setSidebar(false)} onSignOut={()=>nav("landing")}/>
      <div style={{ paddingBottom:62 }}>
        <TopBar title="My Profile" onMenu={()=>setSidebar(true)} nav={nav}/>
        <div style={{ padding:20, maxWidth:660, margin:"0 auto" }}>
          {/* Avatar card */}
          <Card style={{ padding:24, marginBottom:14, textAlign:"center" }}>
            <div style={{ position:"relative", display:"inline-block", marginBottom:14 }}>
              <Avatar name="Arjun Mehta" size={80}/>
              <button onClick={()=>{ const i=document.createElement('input');i.type='file';i.accept='image/*';i.onchange=e=>{if(e.target.files[0])alert('Profile photo updated!');};i.click(); }} style={{ position:"absolute", bottom:0, right:0, width:26, height:26, borderRadius:13, background:C.teal, border:"2px solid #fff", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
                <Icon d={I.upload} size={12} sw={2.5}/>
              </button>
            </div>
            <div style={{ fontWeight:800, fontSize:19, color:C.text, marginBottom:4 }}>Arjun Mehta</div>
            <div style={{ fontSize:14, color:C.muted, marginBottom:10 }}>Managing Partner | TechBridge Capital</div>
            <div style={{ display:"flex", gap:8, justifyContent:"center", flexWrap:"wrap" }}>
              <VBadge/>
              <Badge v="indigo">Angel Investor</Badge>
              <Badge v="teal">Active</Badge>
            </div>
          </Card>

          {/* Basic Info */}
          <Card style={{ padding:22, marginBottom:14 }}>
            <h3 style={{ fontWeight:700, fontSize:15, color:C.text, marginBottom:16 }}>Basic Information</h3>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12 }}>
              <FInput label="First Name" value={firstName} onChange={e=>setFirstName(e.target.value)}/>
              <FInput label="Last Name" value={lastName} onChange={e=>setLastName(e.target.value)}/>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              <FInput label="Firm / Organization" value={firm} onChange={e=>setFirm(e.target.value)}/>
              <FInput label="Title" value={title} onChange={e=>setTitle(e.target.value)}/>
              <FInput label="Location" value={location} onChange={e=>setLocation(e.target.value)}/>
              <FInput label="LinkedIn URL" value={linkedinUrl} onChange={e=>setLinkedinUrl(e.target.value)}/>
              <FInput label="Bio" rows={3} value={bio} onChange={e=>setBio(e.target.value)}/>
            </div>
          </Card>

          {/* Investment Preferences */}
          <Card style={{ padding:22, marginBottom:14 }}>
            <h3 style={{ fontWeight:700, fontSize:15, color:C.text, marginBottom:16 }}>Investment Preferences</h3>
            
            <div style={{ marginBottom:16 }}>
              <label style={{ display:"block", fontSize:13, fontWeight:600, color:C.text, marginBottom:10 }}>Investment Sectors</label>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                {["FinTech","HealthTech","CleanTech","EdTech","AgriTech","SaaS","Deep Tech","Logistics"].map(s=>(
                  <div key={s} onClick={()=>toggleSector(s)}
                    style={{ padding:"6px 14px", borderRadius:8, cursor:"pointer", fontSize:13, fontWeight:sectors.includes(s)?700:500,
                      background:sectors.includes(s)?C.tealDim:"rgba(0,0,0,0.04)",
                      color:sectors.includes(s)?C.teal:C.muted,
                      border:`1.5px solid ${sectors.includes(s)?C.tealBd:C.border}`,
                      transition:"all 0.15s" }}>
                    {sectors.includes(s) && "v "}{s}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginBottom:16 }}>
              <label style={{ display:"block", fontSize:13, fontWeight:600, color:C.text, marginBottom:10 }}>Preferred Stages</label>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                {["Pre-Seed","Seed","Pre-Series A","Series A","Series B"].map(s=>(
                  <div key={s} onClick={()=>toggleStage(s)}
                    style={{ padding:"6px 14px", borderRadius:8, cursor:"pointer", fontSize:13, fontWeight:stages.includes(s)?700:500,
                      background:stages.includes(s)?"rgba(99,102,241,0.1)":"rgba(0,0,0,0.04)",
                      color:stages.includes(s)?"#6366F1":C.muted,
                      border:`1.5px solid ${stages.includes(s)?"rgba(99,102,241,0.3)":C.border}`,
                      transition:"all 0.15s" }}>
                    {stages.includes(s) && "v "}{s}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              <FInput label="Min Ticket Size (₹)" value={minTicket} onChange={e=>setMinTicket(e.target.value)}/>
              <FInput label="Max Ticket Size (₹)" value={maxTicket} onChange={e=>setMaxTicket(e.target.value)}/>
            </div>
            <div style={{ marginTop:12 }}>
              <FInput label="Investment Thesis" rows={3} value={thesis} onChange={e=>setThesis(e.target.value)}/>
            </div>
          </Card>

          {/* Track Record */}
          <Card style={{ padding:22, marginBottom:80 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
              <h3 style={{ fontWeight:700, fontSize:15, color:C.text }}>Track Record</h3>
              <Badge v="teal">Verified</Badge>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:16 }}>
              {[["40+","Portfolio Co."],["₹85 Cr","Deployed"],["3","Exits"]].map(([v,l])=>(
                <div key={l} style={{ padding:14, borderRadius:11, background:C.offWhite, textAlign:"center" }}>
                  <div style={{ fontSize:20, fontWeight:800, color:C.teal, letterSpacing:"-0.02em" }}>{v}</div>
                  <div style={{ fontSize:11, color:C.muted, marginTop:3 }}>{l}</div>
                </div>
              ))}
            </div>
            <Btn v={saveState==="saved"?"secondary":"primary"} full onClick={handleSave} disabled={saveState==="saving"}>
              {saveState==="saving" ? "Saving..." : saveState==="saved" ? "Saved!" : "Save Changes"}
            </Btn>
            {saveState==="saved" && <div style={{ textAlign:"center",fontSize:12,color:C.green,marginTop:8 }}>Profile updated successfully.</div>}
          </Card>
        </div>
      </div>
      <BottomNav nav={navItems} active={page} onSelect={p=>{ if(p!=="profile") nav("investor"); else setPage(p); }}/>
    </div>
  );
};

// ─── PARTNER PROFILE PAGE ────────────────────────────────────────────────────
const PartnerProfilePage = ({ nav }) => {
  const [sidebar,   setSidebar]   = useState(false);
  const [page,      setPage]      = useState("pprofile");
  const [orgName,   setOrgName]   = useState("NASSCOM Foundation");
  const [desc,      setDesc]      = useState("India's premier tech industry association, connecting 3000+ companies.");
  const [location,  setLocation]  = useState("New Delhi");
  const [founded,   setFounded]   = useState("2000");
  const [website,   setWebsite]   = useState("https://nasscom.in");
  const [orgType,   setOrgType]   = useState("industry");
  const [email,     setEmail]     = useState("partnerships@nasscom.in");
  const [phone,     setPhone]     = useState("+91 11 4122 2222");
  const [focus,     setFocus]     = useState("Tech Policy, Startup Enablement, Digital Skills");
  const [services,  setServices]  = useState("Event hosting, Cohort programs, Mentorship, Policy advocacy");
  const [saveState, setSaveState] = useState("idle");

  const navItems = [
    {id:"home",     icon:"home",     label:"Dashboard",    short:"Home"},
    {id:"events",   icon:"calendar", label:"My Events",    short:"Events"},
    {id:"cohort",   icon:"grid",     label:"Cohort",       short:"Cohort"},
    {id:"apps",     icon:"users",    label:"Applications", short:"Apps"},
    {id:"pprofile", icon:"building", label:"Org Profile",  short:"Profile"},
  ];

  const handleSave = () => {
    setSaveState("saving");
    setTimeout(() => { setSaveState("saved"); setTimeout(() => setSaveState("idle"), 2200); }, 900);
  };

  return (
    <div style={{ background:C.offWhite, minHeight:"100vh" }}>
      <Sidebar nav={navItems} active={page} onSelect={p=>{ if(p!=="pprofile") nav("partner"); else setPage(p); }} role="Ecosystem Partner" open={sidebar} onClose={()=>setSidebar(false)} onSignOut={()=>nav("landing")}/>
      <div style={{ paddingBottom:62 }}>
        <TopBar title="Organization Profile" onMenu={()=>setSidebar(true)} nav={nav}/>
        <div style={{ padding:20, maxWidth:620, margin:"0 auto" }}>

          {/* Org header */}
          <Card style={{ padding:24, marginBottom:14, textAlign:"center" }}>
            <div style={{ position:"relative", display:"inline-block", marginBottom:14 }}>
              <div style={{ width:80, height:80, borderRadius:18, background:C.tealDim, border:`2px dashed ${C.tealBd}`, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:C.teal }}>
                <Icon d={I.upload} size={26}/>
              </div>
            </div>
            <div style={{ fontSize:12, color:C.muted, marginBottom:2 }}>Click to upload logo</div>
            <div style={{ fontWeight:800, fontSize:18, color:C.text, marginTop:10, marginBottom:4 }}>{orgName}</div>
            <div style={{ fontSize:13, color:C.muted, marginBottom:10 }}>Ecosystem Partner | {location}</div>
            <div style={{ display:"flex", gap:8, justifyContent:"center" }}>
              <VBadge/>
              <Badge v="green">Active Partner</Badge>
            </div>
          </Card>

          {/* Org Info */}
          <Card style={{ padding:22, marginBottom:14 }}>
            <h3 style={{ fontWeight:700, fontSize:15, color:C.text, marginBottom:16 }}>Organization Information</h3>
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              <FInput label="Organization Name" value={orgName} onChange={e=>setOrgName(e.target.value)}/>
              <FInput label="Description" rows={3} value={desc} onChange={e=>setDesc(e.target.value)}/>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                <FInput label="Location" value={location} onChange={e=>setLocation(e.target.value)}/>
                <FInput label="Founded Year" type="number" value={founded} onChange={e=>setFounded(e.target.value)}/>
              </div>
              <FInput label="Website" value={website} onChange={e=>setWebsite(e.target.value)}/>
              <FSelect label="Organization Type" value={orgType} onChange={e=>setOrgType(e.target.value)} options={[ {value:"accelerator",label:"Accelerator / Incubator"}, {value:"industry", label:"Industry Association"}, {value:"vc", label:"VC / Investment Firm"}, {value:"corporate", label:"Corporate Innovation"}, {value:"govt", label:"Government Program"}, {value:"community", label:"Community / Network"}, ]}/>
              <FInput label="Contact Email" value={email} onChange={e=>setEmail(e.target.value)}/>
              <FInput label="Phone" value={phone} onChange={e=>setPhone(e.target.value)}/>
            </div>
          </Card>

          {/* Focus Areas */}
          <Card style={{ padding:22, marginBottom:14 }}>
            <h3 style={{ fontWeight:700, fontSize:15, color:C.text, marginBottom:16 }}>Focus Areas & Services</h3>
            <FInput label="Areas of Focus" rows={2} value={focus} onChange={e=>setFocus(e.target.value)}/>
            <div style={{ marginTop:12 }}>
              <FInput label="Services Offered" rows={2} value={services} onChange={e=>setServices(e.target.value)}/>
            </div>
          </Card>

          {/* Stats */}
          <Card style={{ padding:22, marginBottom:80 }}>
            <h3 style={{ fontWeight:700, fontSize:15, color:C.text, marginBottom:16 }}>Platform Stats</h3>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:16 }}>
              {[["12","Events Hosted"],["434","Registrations"],["122","Leads"]].map(([v,l])=>(
                <div key={l} style={{ padding:14, borderRadius:11, background:C.offWhite, textAlign:"center" }}>
                  <div style={{ fontSize:20, fontWeight:800, color:C.teal }}>{v}</div>
                  <div style={{ fontSize:11, color:C.muted, marginTop:3 }}>{l}</div>
                </div>
              ))}
            </div>
            <Btn v={saveState==="saved"?"secondary":"primary"} full onClick={handleSave} disabled={saveState==="saving"}>
              {saveState==="saving" ? "Saving..." : saveState==="saved" ? "Saved!" : "Save Changes"}
            </Btn>
            {saveState==="saved" && <div style={{ textAlign:"center",fontSize:12,color:C.green,marginTop:8 }}>Profile updated successfully.</div>}
          </Card>
        </div>
      </div>
      <BottomNav nav={navItems} active={page} onSelect={p=>{ if(p!=="pprofile") nav("partner"); else setPage(p); }}/>
    </div>
  );
};

const FounderDocsPage = ({ nav }) => {
  const [sidebar,    setSidebar]    = useState(false);
  const [page,       setPage]       = useState("docs");
  const [activeTab,  setActiveTab]  = useState("files");   // files | access | activity
  const [uploadOpen, setUploadOpen] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [roomActive, setRoomActive] = useState(true);
  const [ndaRequired,setNdaRequired]= useState(true);
  const [previewDoc, setPreviewDoc] = useState(null);
  const [accessModal,setAccessModal]= useState(null);      // investor obj
  const [uploadType, setUploadType] = useState("pitch");
  const [uploadName, setUploadName] = useState("");
  const [uploadShared,setUploadShared]=useState(true);

  const copyLink = () => { setLinkCopied(true); setTimeout(()=>setLinkCopied(false),2000); };

  const [docs, setDocs] = useState([
    {id:1, name:"FundLink_PitchDeck_v3.pdf",   type:"Pitch Deck",  ext:"PDF",  size:"4.2 MB", date:"Mar 1",  shared:true,  nda:false, views:14, downloads:6,  status:"active"},
    {id:2, name:"Financial_Model_2026.xlsx",    type:"Financials",  ext:"XLSX", size:"1.8 MB", date:"Feb 28", shared:true,  nda:true,  views:3,  downloads:1,  status:"active"},
    {id:3, name:"Executive_Summary.pdf",        type:"Summary",     ext:"PDF",  size:"0.9 MB", date:"Feb 20", shared:true,  nda:false, views:22, downloads:8,  status:"active"},
    {id:4, name:"Term_Sheet_Draft.pdf",         type:"Legal",       ext:"PDF",  size:"0.4 MB", date:"Feb 15", shared:false, nda:true,  views:1,  downloads:0,  status:"draft"},
    {id:5, name:"Product_Demo_Video.mp4",       type:"Demo",        ext:"MP4",  size:"38 MB",  date:"Mar 3",  shared:true,  nda:false, views:9,  downloads:0,  status:"active"},
    {id:6, name:"Cap_Table_Mar2026.xlsx",       type:"Cap Table",   ext:"XLSX", size:"0.3 MB", date:"Mar 4",  shared:false, nda:true,  views:0,  downloads:0,  status:"draft"},
  ]);

  const [requests, setRequests] = useState([
    {id:1, name:"Ananya Krishnan",   firm:"Sequoia Capital India", stage:"Pre-Series A", time:"2h ago",  status:"pending", ndaSigned:false, avatar:"AK"},
    {id:2, name:"Rajiv Malhotra",    firm:"Blume Ventures",        stage:"Seed",         time:"1d ago",  status:"approved",ndaSigned:true,  avatar:"RM"},
    {id:3, name:"Sunita Patel",      firm:"Kalaari Capital",       stage:"Series A",     time:"2d ago",  status:"approved",ndaSigned:true,  avatar:"SP"},
    {id:4, name:"Vikram Nair",       firm:"Angel Investor",        stage:"Pre-Seed",     time:"3d ago",  status:"declined",ndaSigned:false, avatar:"VN"},
    {id:5, name:"Meera Iyer",        firm:"Accel India",           stage:"Seed",         time:"4d ago",  status:"pending", ndaSigned:false, avatar:"MI"},
  ]);

  const [activity, setActivity] = useState([
    {type:"view",      actor:"Rajiv Malhotra",  doc:"FundLink_PitchDeck_v3.pdf",  time:"35m ago"},
    {type:"download",  actor:"Sunita Patel",    doc:"Financial_Model_2026.xlsx",  time:"2h ago"},
    {type:"view",      actor:"Rajiv Malhotra",  doc:"Executive_Summary.pdf",      time:"4h ago"},
    {type:"nda",       actor:"Ananya Krishnan", doc:"",                           time:"2h ago"},
    {type:"request",   actor:"Meera Iyer",      doc:"",                           time:"4d ago"},
    {type:"view",      actor:"Sunita Patel",    doc:"Product_Demo_Video.mp4",     time:"1d ago"},
    {type:"download",  actor:"Rajiv Malhotra",  doc:"Executive_Summary.pdf",      time:"2d ago"},
  ]);

  const handleApprove = id => setRequests(p=>p.map(r=>r.id===id?{...r,status:"approved"}:r));
  const handleDecline = id => setRequests(p=>p.map(r=>r.id===id?{...r,status:"declined"}:r));

  const handleUpload = () => {
    if(!uploadName) return;
    const ext = uploadType==="financial"||uploadType==="captable"?"XLSX":"PDF";
    setDocs(p=>[{id:Date.now(),name:uploadName+(uploadName.includes(".")?"":(`.${ext.toLowerCase()}`)),type:uploadType==="pitch"?"Pitch Deck":uploadType==="financial"?"Financials":uploadType==="summary"?"Summary":uploadType==="legal"?"Legal":"Other",ext,size:"—",date:"Mar 7",shared:uploadShared,nda:false,views:0,downloads:0,status:"active"},...p]);
    setUploadOpen(false); setUploadName(""); setUploadType("pitch"); setUploadShared(true);
    setActivity(p=>[{type:"upload",actor:"You",doc:uploadName,time:"just now"},...p]);
  };

  const typeColor = t => t==="Pitch Deck"?"teal":t==="Financials"?"green":t==="Summary"?"indigo":t==="Legal"?"amber":t==="Demo"?"blue":"slate";
  const extColor  = e => e==="PDF"?"rgba(239,68,68,0.12)":e==="XLSX"?"rgba(16,185,129,0.1)":e==="MP4"?"rgba(99,102,241,0.12)":"rgba(107,114,128,0.1)";
  const extText   = e => e==="PDF"?C.red:e==="XLSX"?C.green:e==="MP4"?"#6366F1":C.muted;
  const actIcon   = t => t==="view"?"👁":t==="download"?"⬇":t==="nda"?"📝":t==="request"?"🔔":t==="upload"?"📤":"✓";

  const navItems = [
    {id:"home",   icon:"home",     label:"Dashboard", short:"Home"},
    {id:"events", icon:"calendar", label:"Events",    short:"Events"},
    {id:"intros", icon:"link",     label:"Intros",    short:"Intros", badge:"3"},
    {id:"docs",   icon:"upload",   label:"Data Room", short:"Docs"},
    {id:"profile",icon:"users",    label:"Profile",   short:"Profile"},
  ];

  const pendingCount = requests.filter(r=>r.status==="pending").length;

  // ── Files tab ──
  const filesTab = (
    <div>
      {/* Stats strip */}
      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:10,marginBottom:16 }}>
        {[
          {v:docs.filter(d=>d.shared).length,  l:"Shared",   c:C.teal},
          {v:docs.reduce((s,d)=>s+d.views,0),  l:"Total Views",c:C.text},
          {v:docs.reduce((s,d)=>s+d.downloads,0),l:"Downloads",c:"#6366F1"},
          {v:requests.filter(r=>r.status==="approved").length,l:"Investors In",c:C.green},
        ].map(s=>(
          <Card key={s.l} style={{ padding:14,textAlign:"center" }}>
            <div style={{ fontSize:20,fontWeight:800,color:s.c,letterSpacing:"-0.02em" }}>{s.v}</div>
            <div style={{ fontSize:10,color:C.muted,marginTop:2 }}>{s.l}</div>
          </Card>
        ))}
      </div>

      {/* Storage */}
      <Card style={{ padding:16,marginBottom:14 }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8 }}>
          <span style={{ fontWeight:600,fontSize:13,color:C.text }}>Storage</span>
          <span style={{ fontSize:12,color:C.muted }}>45.6 MB of 5 GB</span>
        </div>
        <div style={{ height:6,borderRadius:999,background:C.slateXL }}>
          <div style={{ width:"0.9%",height:"100%",background:`linear-gradient(90deg,${C.teal},${C.tealLt})`,borderRadius:999 }}/>
        </div>
      </Card>

      {/* Docs list */}
      <div style={{ display:"flex",flexDirection:"column",gap:10,marginBottom:16 }}>
        {docs.map((doc,i)=>(
          <Card key={doc.id} style={{ padding:16,transition:"box-shadow 0.15s" }}>
            <div style={{ display:"flex",alignItems:"flex-start",gap:12 }}>
              {/* Ext badge */}
              <div style={{ width:44,height:44,borderRadius:11,background:extColor(doc.ext),display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                <span style={{ fontSize:10,fontWeight:800,color:extText(doc.ext) }}>{doc.ext}</span>
              </div>
              <div style={{ flex:1,minWidth:0 }}>
                <div style={{ fontWeight:600,fontSize:14,color:C.text,marginBottom:4,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{doc.name}</div>
                <div style={{ display:"flex",gap:6,alignItems:"center",flexWrap:"wrap" }}>
                  <Badge v={typeColor(doc.type)}>{doc.type}</Badge>
                  <span style={{ fontSize:11,color:C.muted }}>{doc.size}</span>
                  <span style={{ fontSize:11,color:C.muted }}>·</span>
                  <span style={{ fontSize:11,color:C.muted }}>{doc.date}</span>
                  {doc.status==="draft" && <Badge v="amber">Draft</Badge>}
                </div>
              </div>
              {/* Actions */}
              <div style={{ display:"flex",flexDirection:"column",alignItems:"flex-end",gap:6,flexShrink:0 }}>
                <div style={{ display:"flex",gap:6 }}>
                  <button onClick={()=>setDocs(d=>d.map((x,j)=>j===i?{...x,shared:!x.shared}:x))}
                    style={{ padding:"3px 9px",borderRadius:7,border:`1px solid ${doc.shared?C.tealBd:C.border}`,background:doc.shared?"rgba(31,163,163,0.1)":"transparent",color:doc.shared?C.teal:C.muted,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"inherit",transition:"all 0.15s" }}>
                    {doc.shared?"Shared":"Private"}
                  </button>
                  <button onClick={()=>setDocs(d=>d.filter((_,j)=>j!==i))}
                    style={{ padding:"3px 8px",borderRadius:7,border:`1px solid ${C.border}`,background:"transparent",color:C.muted,fontSize:13,cursor:"pointer",fontFamily:"inherit" }}>✕</button>
                </div>
                {doc.shared && (
                  <div style={{ display:"flex",gap:6 }}>
                    <span style={{ fontSize:11,color:C.muted }}>{doc.views} views</span>
                    <span style={{ fontSize:11,color:C.muted }}>·</span>
                    <span style={{ fontSize:11,color:C.muted }}>{doc.downloads} dl</span>
                  </div>
                )}
                <div style={{ display:"flex",alignItems:"center",gap:5,cursor:"pointer" }}
                  onClick={()=>setDocs(d=>d.map((x,j)=>j===i?{...x,nda:!x.nda}:x))}>
                  <div style={{ width:15,height:15,borderRadius:3,border:`2px solid ${doc.nda?C.amber:C.border}`,background:doc.nda?"rgba(245,158,11,0.15)":"transparent",display:"flex",alignItems:"center",justifyContent:"center" }}>
                    {doc.nda && <Icon d={I.check} size={8} sw={3} style={{ color:C.amber }}/>}
                  </div>
                  <span style={{ fontSize:11,color:doc.nda?C.amber:C.muted,fontWeight:doc.nda?600:400 }}>NDA req.</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Data room link */}
      <Card style={{ padding:18,marginBottom:80 }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12 }}>
          <div>
            <div style={{ fontWeight:700,fontSize:14,color:C.text,marginBottom:2 }}>Data Room Link</div>
            <div style={{ fontSize:12,color:C.muted }}>Share with investors. Only "Shared" docs visible.</div>
          </div>
          <div style={{ display:"flex",alignItems:"center",gap:8 }}>
            <span style={{ fontSize:12,color:C.muted }}>Active</span>
            <div onClick={()=>setRoomActive(p=>!p)} style={{ width:36,height:20,borderRadius:10,background:roomActive?C.teal:C.slateXL,position:"relative",cursor:"pointer",transition:"background 0.2s" }}>
              <div style={{ position:"absolute",top:2,left:roomActive?18:2,width:16,height:16,borderRadius:8,background:"#fff",transition:"left 0.2s",boxShadow:"0 1px 3px rgba(0,0,0,0.2)" }}/>
            </div>
          </div>
        </div>
        <div style={{ display:"flex",gap:8,marginBottom:12 }}>
          <div style={{ flex:1,padding:"9px 12px",borderRadius:9,background:C.offWhite,border:`1px solid ${C.border}`,fontSize:12,color:C.muted,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>
            fundlink.in/dataroom/greentech-solutions-xyz
          </div>
          <Btn v={linkCopied?"secondary":"primary"} sz="sm" onClick={copyLink}>{linkCopied?"Copied!":"Copy"}</Btn>
        </div>
        <div style={{ display:"flex",alignItems:"center",gap:8 }}>
          <div onClick={()=>setNdaRequired(p=>!p)} style={{ width:15,height:15,borderRadius:3,border:`2px solid ${ndaRequired?C.teal:C.border}`,background:ndaRequired?C.tealDim:"#fff",flexShrink:0,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center" }}>
            {ndaRequired && <Icon d={I.check} size={8} sw={3} style={{ color:C.teal }}/>}
          </div>
          <span style={{ fontSize:12,color:C.text }}>Require NDA sign before granting access</span>
        </div>
      </Card>
    </div>
  );

  // ── Access Requests tab ──
  const accessTab = (
    <div>
      {pendingCount > 0 && (
        <div style={{ padding:"12px 16px",borderRadius:11,background:"rgba(245,158,11,0.08)",border:`1px solid rgba(245,158,11,0.25)`,fontSize:13,color:C.amber,marginBottom:16,fontWeight:600,display:"flex",alignItems:"center",gap:8 }}>
          <span>🔔</span> {pendingCount} investor{pendingCount>1?"s":""} waiting for access approval
        </div>
      )}
      <div style={{ display:"flex",flexDirection:"column",gap:10,marginBottom:80 }}>
        {requests.map(r=>(
          <Card key={r.id} style={{ padding:18 }}>
            <div style={{ display:"flex",alignItems:"flex-start",gap:12 }}>
              <Avatar name={r.name} size={44}/>
              <div style={{ flex:1,minWidth:0 }}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:6 }}>
                  <div>
                    <div style={{ fontWeight:700,fontSize:14,color:C.text }}>{r.name}</div>
                    <div style={{ fontSize:12,color:C.muted }}>{r.firm} · {r.stage}</div>
                  </div>
                  <div style={{ display:"flex",alignItems:"center",gap:6 }}>
                    {r.ndaSigned && <Badge v="green">NDA Signed</Badge>}
                    <Badge v={r.status==="approved"?"teal":r.status==="declined"?"red":"amber"}>
                      {r.status==="approved"?"Approved":r.status==="declined"?"Declined":"Pending"}
                    </Badge>
                  </div>
                </div>
                <div style={{ fontSize:11,color:C.muted,marginTop:4,marginBottom:10 }}>Requested {r.time}</div>
                {r.status==="pending" && (
                  <div style={{ display:"flex",gap:8 }}>
                    <Btn v="primary" sz="sm" onClick={()=>handleApprove(r.id)}>Approve Access</Btn>
                    <Btn v="secondary" sz="sm" onClick={()=>handleDecline(r.id)}>Decline</Btn>
                    <Btn v="secondary" sz="sm" onClick={()=>setAccessModal(r)}>View Profile</Btn>
                  </div>
                )}
                {r.status==="approved" && (
                  <div style={{ display:"flex",gap:8 }}>
                    <Btn v="secondary" sz="sm" onClick={()=>handleDecline(r.id)}>Revoke Access</Btn>
                    <Btn v="secondary" sz="sm" onClick={()=>setAccessModal(r)}>View Profile</Btn>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  // ── Activity tab ──
  const activityTab = (
    <div style={{ marginBottom:80 }}>
      <Card style={{ overflow:"hidden" }}>
        {activity.map((a,i)=>(
          <div key={i} style={{ display:"flex",alignItems:"center",gap:12,padding:"14px 18px",borderBottom:i<activity.length-1?`1px solid ${C.slateXL}`:"none" }}>
            <div style={{ width:34,height:34,borderRadius:10,background:C.offWhite,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0 }}>{actIcon(a.type)}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:13,color:C.text,fontWeight:500 }}>
                <strong>{a.actor}</strong>
                {a.type==="view"     && <span style={{ color:C.muted }}> viewed </span>}
                {a.type==="download" && <span style={{ color:C.muted }}> downloaded </span>}
                {a.type==="nda"      && <span style={{ color:C.muted }}> signed the NDA</span>}
                {a.type==="request"  && <span style={{ color:C.muted }}> requested data room access</span>}
                {a.type==="upload"   && <span style={{ color:C.muted }}> uploaded </span>}
                {(a.type==="view"||a.type==="download"||a.type==="upload") && <span style={{ color:C.teal,fontWeight:600 }}>{a.doc}</span>}
              </div>
            </div>
            <span style={{ fontSize:11,color:C.muted,flexShrink:0 }}>{a.time}</span>
          </div>
        ))}
      </Card>
    </div>
  );

  const tabContent = { files:filesTab, access:accessTab, activity:activityTab };

  return (
    <div style={{ background:C.offWhite,minHeight:"100vh" }}>
      <Sidebar nav={navItems} active={page} onSelect={p=>{ if(p!=="docs") nav("founder"); else setPage(p); }} role="Founder" open={sidebar} onClose={()=>setSidebar(false)} onSignOut={()=>nav("landing")}/>
      <div style={{ paddingBottom:62 }}>
        <TopBar title="Data Room" onMenu={()=>setSidebar(true)} nav={nav}/>
        <div style={{ padding:20,maxWidth:640,margin:"0 auto" }}>

          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20 }}>
            <div>
              <h1 style={{ fontSize:22,fontWeight:800,color:C.text,marginBottom:4,letterSpacing:"-0.02em" }}>Data Room</h1>
              <p style={{ fontSize:14,color:C.muted }}>Manage documents and investor access securely.</p>
            </div>
            <Btn v="primary" sz="sm" onClick={()=>setUploadOpen(true)}>+ Upload</Btn>
          </div>

          {/* Tab bar */}
          <div style={{ display:"flex",gap:4,marginBottom:20,background:C.slateXL,padding:4,borderRadius:11 }}>
            {[["files","📁 Documents"],["access",`🔐 Access${pendingCount>0?` (${pendingCount})`:`s`}`],["activity","📊 Activity"]].map(([id,label])=>(
              <button key={id} onClick={()=>setActiveTab(id)}
                style={{ flex:1,padding:"8px 4px",borderRadius:8,border:"none",cursor:"pointer",fontFamily:"inherit",fontWeight:600,fontSize:12,transition:"all 0.15s",background:activeTab===id?"#fff":"transparent",color:activeTab===id?C.text:C.muted,boxShadow:activeTab===id?"0 1px 4px rgba(0,0,0,0.08)":"none" }}>
                {label}
              </button>
            ))}
          </div>

          {tabContent[activeTab]}
        </div>
      </div>
      <BottomNav nav={navItems} active={page} onSelect={p=>{ if(p!=="docs") nav("founder"); else setPage(p); }}/>

      {/* Upload Modal */}
      <Modal open={uploadOpen} onClose={()=>setUploadOpen(false)} title="Upload Document">
        <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
          <div onClick={()=>{ const inp=document.createElement('input');inp.type='file';inp.accept='.pdf,.xlsx,.pptx,.docx,.mp4';inp.onchange=e=>{ if(e.target.files[0]){ setUploadName(e.target.files[0].name); } };inp.click(); }}
            style={{ border:`2px dashed ${C.tealBd}`,borderRadius:12,padding:"28px 20px",textAlign:"center",cursor:"pointer",background:uploadName?C.offWhite:C.tealDim,transition:"all 0.18s" }}>
            <Icon d={I.upload} size={28} style={{ color:C.teal,margin:"0 auto 10px" }}/>
            <div style={{ fontWeight:700,fontSize:14,color:C.text,marginBottom:3 }}>{uploadName||"Drop file or click to browse"}</div>
            <div style={{ fontSize:12,color:C.muted }}>PDF, XLSX, PPTX, DOCX, MP4 · Max 50 MB</div>
          </div>
          <FInput label="Document Name" placeholder="e.g. PitchDeck_v4.pdf" value={uploadName} onChange={e=>setUploadName(e.target.value)}/>
          <FSelect label="Document Type" value={uploadType} onChange={e=>setUploadType(e.target.value)} options={[{value:"pitch",label:"Pitch Deck"},{value:"financial",label:"Financial Model"},{value:"summary",label:"Executive Summary"},{value:"legal",label:"Legal Document"},{value:"demo",label:"Product Demo"},{value:"captable",label:"Cap Table"},{value:"other",label:"Other"}]}/>
          <div style={{ display:"flex",alignItems:"center",gap:10 }}>
            <div onClick={()=>setUploadShared(p=>!p)} style={{ width:18,height:18,borderRadius:5,border:`2px solid ${uploadShared?C.teal:C.border}`,background:uploadShared?C.tealDim:"#fff",flexShrink:0,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center" }}>
              {uploadShared && <Icon d={I.check} size={10} sw={3} style={{ color:C.teal }}/>}
            </div>
            <span style={{ fontSize:13,color:C.text }}>Share in data room immediately</span>
          </div>
          <Btn v="primary" full onClick={handleUpload} disabled={!uploadName}>Upload Document</Btn>
        </div>
      </Modal>

      {/* Investor profile preview modal */}
      <Modal open={!!accessModal} onClose={()=>setAccessModal(null)} title="Investor Profile">
        {accessModal && (
          <div style={{ display:"flex",flexDirection:"column",gap:16 }}>
            <div style={{ display:"flex",alignItems:"center",gap:14,padding:16,borderRadius:12,background:C.offWhite }}>
              <Avatar name={accessModal.name} size={52}/>
              <div>
                <div style={{ fontWeight:700,fontSize:16,color:C.text }}>{accessModal.name}</div>
                <div style={{ fontSize:13,color:C.muted }}>{accessModal.firm}</div>
                <div style={{ display:"flex",gap:6,marginTop:6 }}>
                  <Badge v="teal">{accessModal.stage}</Badge>
                  {accessModal.ndaSigned && <Badge v="green">NDA Signed</Badge>}
                </div>
              </div>
            </div>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10 }}>
              {[["Focus","SaaS, FinTech, CleanTech"],["Ticket","₹50L – ₹5Cr"],["Portfolio","22 companies"],["Location","Mumbai, India"]].map(([l,v])=>(
                <div key={l} style={{ padding:"10px 12px",borderRadius:9,background:C.offWhite }}>
                  <div style={{ fontSize:10,color:C.muted,textTransform:"uppercase",letterSpacing:"0.06em",fontWeight:700,marginBottom:2 }}>{l}</div>
                  <div style={{ fontSize:13,fontWeight:600,color:C.text }}>{v}</div>
                </div>
              ))}
            </div>
            {accessModal.status==="pending" && (
              <div style={{ display:"flex",gap:10 }}>
                <Btn v="secondary" full onClick={()=>{ handleDecline(accessModal.id); setAccessModal(null); }}>Decline</Btn>
                <Btn v="primary" full onClick={()=>{ handleApprove(accessModal.id); setAccessModal(null); }}>Approve Access</Btn>
              </div>
            )}
            {accessModal.status==="approved" && (
              <Btn v="secondary" full onClick={()=>{ handleDecline(accessModal.id); setAccessModal(null); }}>Revoke Access</Btn>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};


// ─── ADMIN SYSTEM SETTINGS ───────────────────────────────────────────────────
const AdminSettingsPage2 = ({ nav }) => {
  const [sidebar, setSidebar] = useState(false);
  const [page, setPage] = useState("settings2");
  const [settings, setSettings] = useState({
    maintenance:     false,
    registration:    true,
    eventModeration: true,
    profileModeration:false,
    emailNotifs:     true,
    smsNotifs:       false,
    systemLogs:      true,
    apiAccess:       true,
    betaFeatures:    false,
  });
  const [saved, setSaved] = useState(false);

  const toggle = k => { setSettings(p=>({...p,[k]:!p[k]})); setSaved(false); };

  const navItems = [
    {id:"overview",  icon:"grid",     label:"Overview"},
    {id:"users",     icon:"users",    label:"Users"},
    {id:"events",    icon:"calendar", label:"Events"},
    {id:"approvals", icon:"shield",   label:"Approvals"},
    {id:"analytics", icon:"bar",      label:"Analytics"},
    {id:"revenue",   icon:"trending", label:"Revenue"},
    {id:"settings2", icon:"gear",     label:"Settings"},
  ];

  const Toggle = ({ on, onClick }) => (
    <div onClick={onClick} style={{ width:44, height:24, borderRadius:12, background:on?C.teal:C.slateXL, position:"relative", cursor:"pointer", flexShrink:0, transition:"background 0.2s" }}>
      <div style={{ position:"absolute", top:2, left:on?22:2, width:20, height:20, borderRadius:10, background:"#fff", transition:"left 0.2s", boxShadow:"0 1px 4px rgba(0,0,0,0.2)" }}/>
    </div>
  );

  const Section = ({ title, items }) => (
    <Card style={{ marginBottom:14, overflow:"hidden" }}>
      <div style={{ padding:"12px 18px", background:C.offWhite, borderBottom:`1px solid ${C.border}`, fontSize:12, fontWeight:700, color:C.muted, letterSpacing:"0.07em", textTransform:"uppercase" }}>{title}</div>
      {items.map((item,i)=>(
        <div key={i} onClick={item.type==="link"?item.fn:undefined}
          style={{ padding:"14px 18px", borderBottom:i<items.length-1?`1px solid ${C.slateXL}`:"none", display:"flex", alignItems:"center", gap:14, cursor:item.type==="link"?"pointer":"default", transition:"background 0.15s" }}
          onMouseEnter={e=>{ if(item.type==="link") e.currentTarget.style.background=C.offWhite; }}
          onMouseLeave={e=>{ if(item.type==="link") e.currentTarget.style.background="transparent"; }}>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:14, fontWeight:600, color:C.text, marginBottom:2 }}>{item.l}</div>
            <div style={{ fontSize:12, color:C.muted }}>{item.d}</div>
          </div>
          {item.type==="toggle" && <Toggle on={settings[item.key]} onClick={()=>toggle(item.key)}/>}
          {item.type==="input" && <input defaultValue={item.val} style={{ padding:"7px 12px", borderRadius:8, border:`1.5px solid ${C.border}`, fontSize:13, outline:"none", fontFamily:"inherit", width:180 }} onFocus={e=>e.target.style.borderColor=C.teal} onBlur={e=>e.target.style.borderColor=C.border}/>}
          {item.type==="select" && <FSelect options={item.opts}/>}
          {item.type==="link" && <Icon d={I.chevR} size={16} sw={2} style={{ color:C.slateL }}/>}
        </div>
      ))}
    </Card>
  );

  return (
    <div style={{ background:C.offWhite, minHeight:"100vh" }}>
      <Sidebar nav={navItems} active={page} onSelect={p=>{ if(p!=="settings2") nav("admin"); }} role="Super Admin" open={sidebar} onClose={()=>setSidebar(false)} onSignOut={()=>nav("landing")}/>
      <div>
        {/* Admin topbar */}
        <div style={{ height:60, background:C.navy, borderBottom:"1px solid rgba(255,255,255,0.08)", display:"flex", alignItems:"center", padding:"0 20px", position:"sticky", top:0, zIndex:100 }}>
          <button onClick={()=>setSidebar(true)} style={{ background:"none", border:"none", cursor:"pointer", padding:4, color:"rgba(255,255,255,0.5)", marginRight:14, display:"flex" }}>
            <Icon d={I.menu} size={22}/>
          </button>
          <div style={{ flex:1, display:"flex", alignItems:"center", gap:9 }}>
            <div style={{ width:26, height:26, borderRadius:7, background:C.teal, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <Icon d={I.link} size={13} sw={2.5}/>
            </div>
            <span style={{ color:"#fff", fontWeight:800, fontSize:16, letterSpacing:"-0.02em" }}>FundLink <span style={{ color:"rgba(255,255,255,0.28)", fontWeight:400 }}>Admin</span></span>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ width:7, height:7, borderRadius:4, background:C.green }}/>
            <span style={{ color:"rgba(255,255,255,0.38)", fontSize:12 }}>All systems nominal</span>
            <Avatar name="Admin" size={30}/>
          </div>
        </div>

        <div style={{ padding:20, maxWidth:660, margin:"0 auto" }}>
          <div style={{ marginBottom:24 }}>
            <h1 style={{ fontSize:22, fontWeight:800, color:C.text, marginBottom:4, letterSpacing:"-0.02em" }}>System Settings</h1>
            <p style={{ fontSize:14, color:C.muted }}>Configure platform behaviour and preferences.</p>
          </div>

          <Section title="General" items={[
            {l:"Platform Name",    d:"Displayed in emails and page titles",            type:"input",  key:"", val:"FundLink"},
            {l:"Support Email",    d:"Shown to users for support queries",              type:"input",  key:"", val:"support@fundlink.in"},
          ]}/>

          <Section title="Access Control" items={[
            {l:"Maintenance Mode",     d:"Show maintenance page to all non-admin users",    type:"toggle", key:"maintenance"},
            {l:"Open Registration",    d:"Allow new users to create accounts",              type:"toggle", key:"registration"},
            {l:"Beta Features",        d:"Enable experimental features for all users",       type:"toggle", key:"betaFeatures"},
            {l:"API Access",           d:"Allow external API integrations",                  type:"toggle", key:"apiAccess"},
          ]}/>

          <Section title="Moderation" items={[
            {l:"Auto-moderate Events",      d:"New events require admin approval before going live", type:"toggle", key:"eventModeration"},
            {l:"Auto-moderate Profiles",    d:"New profiles require manual verification",           type:"toggle", key:"profileModeration"},
          ]}/>

          <Section title="Notifications" items={[
            {l:"Email Notifications",  d:"Send platform emails (intro requests, approvals)",  type:"toggle", key:"emailNotifs"},
            {l:"SMS Alerts",           d:"Send SMS for critical events and approvals",         type:"toggle", key:"smsNotifs"},
            {l:"System Logs",          d:"Log all admin actions for audit trail",              type:"toggle", key:"systemLogs"},
          ]}/>

          <Section title="Communications" items={[
            {l:"Email Templates",  d:"Edit and preview transactional & marketing emails",  type:"link", fn:()=>nav("emailTemplates")},
          ]}/>

          <Section title="Monetization" items={[
            {l:"Payment Setup",    d:"Gateway config, plan pricing, GST, bank & payouts", type:"link", fn:()=>nav("adminPayment")},
            {l:"Coupon Management",d:"Create and manage discount codes and promos",        type:"link", fn:()=>nav("adminCoupons")},
            {l:"Affiliate Payouts",d:"Review and process referral credit payouts",         type:"link", fn:()=>nav("adminPayment")},
          ]}/>

          {settings.maintenance && (
            <div style={{ padding:"12px 16px", borderRadius:11, background:"rgba(239,68,68,0.08)", border:`1px solid rgba(239,68,68,0.25)`, fontSize:13, color:C.red, marginBottom:14, fontWeight:600 }}>
              ⚠️ Maintenance mode is ON - all non-admin users will see the maintenance page.
            </div>
          )}

          <div style={{ display:"flex", gap:10, marginBottom:80 }}>
            <Btn v="secondary" full onClick={()=>setSaved(false)}>Reset to Defaults</Btn>
            <Btn v="primary" full onClick={()=>setSaved(true)}>{saved?"Saved!":"Save Settings"}</Btn>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── ADMIN MODERATION PAGE ────────────────────────────────────────────────────
const AdminModerationPage = ({ nav }) => {
  const [sidebar,    setSidebar]    = useState(false);
  const [mainTab,    setMainTab]    = useState("kyc");
  const [tab,        setTab]        = useState("pending");
  const [kycTab,     setKycTab]     = useState("pending");
  const [detailItem, setDetailItem] = useState(null);
  const [kycDetail,  setKycDetail]  = useState(null);
  const [rejectModal,setRejectModal]= useState(null);
  const [rejectNote, setRejectNote] = useState("");

  const [kycItems, setKycItems] = useState([
    {id:1,name:"Rahul Verma",    role:"Founder", email:"rahul@greentech.in", docType:"Aadhaar Card",   submitted:"2h ago", status:"pending", risk:"low", linkedin:"linkedin.com/in/rahulverma",company:"GreenTech Solutions"},
    {id:2,name:"Priya Nair",     role:"Investor",email:"priya@nexus.vc",    docType:"PAN Card",       submitted:"4h ago", status:"pending", risk:"low", linkedin:"linkedin.com/in/priyanair", company:"Nexus Ventures"},
    {id:3,name:"Vikram Malhotra",role:"Partner", email:"vikram@incubate.co",docType:"Passport",        submitted:"1d ago", status:"approved",risk:"low", linkedin:"",                          company:"Incubate.co"},
    {id:4,name:"Unknown User",   role:"Investor",email:"anon@temp-mail.com",docType:"Driving Licence", submitted:"1d ago", status:"pending", risk:"high",linkedin:"",                          company:"Unknown"},
    {id:5,name:"Sneha Kumar",    role:"Founder", email:"sneha@agrilink.io", docType:"Aadhaar Card",   submitted:"2d ago", status:"approved",risk:"low", linkedin:"linkedin.com/in/snehak",    company:"AgriLink"},
    {id:6,name:"Test Entity",    role:"Investor",email:"test@burner.com",   docType:"PAN Card",       submitted:"3d ago", status:"rejected",risk:"high",linkedin:"",                          company:""},
  ]);
  const actKyc = (id,st) => setKycItems(p=>p.map(x=>x.id===id?{...x,status:st}:x));
  const kycFiltered = kycTab==="all" ? kycItems : kycItems.filter(x=>x.status===kycTab);

  const [items, setItems] = useState([
    {id:1,type:"Startup Profile",title:"TechVenture AI",   submitter:"Rohit Shah",      date:"Mar 1, 2026", status:"pending", flagged:false},
    {id:2,type:"Event",          title:"Startup Showcase", submitter:"Innovation Hub",  date:"Feb 28",      status:"pending", flagged:true},
    {id:3,type:"Investor Profile",title:"Capital Ventures",submitter:"Michael Torres",  date:"Feb 25",      status:"pending", flagged:false},
    {id:4,type:"Startup Profile",title:"FinFlow",          submitter:"Jane Smith",      date:"Feb 20",      status:"approved",flagged:false},
    {id:5,type:"Event",          title:"Delhi VC Night",   submitter:"Startup India",   date:"Feb 18",      status:"approved",flagged:false},
    {id:6,type:"Startup Profile",title:"SpamCoin",         submitter:"Unknown User",    date:"Feb 15",      status:"rejected",flagged:true},
    {id:7,type:"Investor Profile",title:"FakeVC",          submitter:"Suspicious Actor",date:"Feb 12",      status:"rejected",flagged:true},
  ]);
  const act = (id,status) => setItems(p=>p.map(x=>x.id===id?{...x,status}:x));
  const filtered = tab==="all" ? items : items.filter(x=>x.status===tab);
  const statusColor = s => s==="approved"?"green":s==="rejected"?"red":"amber";
  const riskColor   = r => r==="high"?C.red:r==="medium"?C.amber:C.green;
  const roleColor   = r => r==="Founder"?"teal":r==="Investor"?"indigo":"amber";

  const tabs    = [{id:"pending",label:"Pending",count:items.filter(x=>x.status==="pending").length},{id:"approved",label:"Approved",count:items.filter(x=>x.status==="approved").length},{id:"rejected",label:"Rejected",count:items.filter(x=>x.status==="rejected").length},{id:"all",label:"All",count:items.length}];
  const kycTabs = [{id:"pending",label:"Pending",count:kycItems.filter(x=>x.status==="pending").length},{id:"approved",label:"Approved",count:kycItems.filter(x=>x.status==="approved").length},{id:"rejected",label:"Rejected",count:kycItems.filter(x=>x.status==="rejected").length},{id:"all",label:"All",count:kycItems.length}];
  const navItems = [
    {id:"overview",  icon:"grid",     label:"Overview"},
    {id:"users",     icon:"users",    label:"Users"},
    {id:"events",    icon:"calendar", label:"Events"},
    {id:"approvals", icon:"shield",   label:"Approvals"},
    {id:"moderation",icon:"eye",      label:"Moderation",badge:(items.filter(x=>x.status==="pending").length+kycItems.filter(x=>x.status==="pending").length).toString()},
    {id:"analytics", icon:"bar",      label:"Analytics"},
    {id:"revenue",   icon:"trending", label:"Revenue"},
  ];

  const TabBar = ({ tabs:ts, active, onSelect }) => (
    <div style={{ display:"flex",gap:6,marginBottom:16,overflowX:"auto",paddingBottom:4 }}>
      {ts.map(t=>(
        <button key={t.id} onClick={()=>onSelect(t.id)}
          style={{ padding:"7px 14px",borderRadius:9,border:`1px solid ${active===t.id?C.teal:C.border}`,cursor:"pointer",fontSize:13,fontWeight:600,whiteSpace:"nowrap",
            background:active===t.id?C.teal:"#fff",color:active===t.id?"#fff":C.muted,
            fontFamily:"inherit",transition:"all 0.15s" }}>
          {t.label}
          <span style={{ marginLeft:6,padding:"1px 7px",borderRadius:999,fontSize:10,fontWeight:700,
            background:active===t.id?"rgba(255,255,255,0.25)":"rgba(0,0,0,0.06)",
            color:active===t.id?"#fff":C.muted }}>
            {t.count}
          </span>
        </button>
      ))}
    </div>
  );

  return (
    <div style={{ background:C.offWhite,minHeight:"100vh" }}>
      <Sidebar nav={navItems} active="moderation" onSelect={p=>{ if(p!=="moderation") nav("admin"); }} role="Super Admin" open={sidebar} onClose={()=>setSidebar(false)} onSignOut={()=>nav("landing")}/>
      <div>
        <div style={{ height:60,background:C.navy,borderBottom:"1px solid rgba(255,255,255,0.08)",display:"flex",alignItems:"center",padding:"0 20px",position:"sticky",top:0,zIndex:100 }}>
          <button onClick={()=>setSidebar(true)} style={{ background:"none",border:"none",cursor:"pointer",padding:4,color:"rgba(255,255,255,0.5)",marginRight:14,display:"flex" }}>
            <Icon d={I.menu} size={22}/>
          </button>
          <div style={{ flex:1,display:"flex",alignItems:"center",gap:9 }}>
            <div style={{ width:26,height:26,borderRadius:7,background:C.teal,display:"flex",alignItems:"center",justifyContent:"center" }}>
              <Icon d={I.link} size={13} sw={2.5}/>
            </div>
            <span style={{ color:"#fff",fontWeight:800,fontSize:16,letterSpacing:"-0.02em" }}>FundLink <span style={{ color:"rgba(255,255,255,0.28)",fontWeight:400 }}>Admin</span></span>
          </div>
          <Avatar name="Admin" size={30}/>
        </div>

        <div style={{ padding:20,maxWidth:760,margin:"0 auto" }}>
          <div style={{ marginBottom:20 }}>
            <h1 style={{ fontSize:22,fontWeight:800,color:C.text,marginBottom:4,letterSpacing:"-0.02em" }}>Moderation & Verification</h1>
            <p style={{ fontSize:14,color:C.muted }}>Review identity documents and platform content.</p>
          </div>

          {/* Main toggle */}
          <div style={{ display:"flex",gap:0,marginBottom:24,background:"#fff",borderRadius:12,padding:4,border:`1px solid ${C.border}`,width:"fit-content" }}>
            {[{id:"kyc",label:"KYC / Identity",badge:kycItems.filter(x=>x.status==="pending").length},{id:"content",label:"Content Review",badge:items.filter(x=>x.status==="pending").length}].map(t=>(
              <button key={t.id} onClick={()=>setMainTab(t.id)}
                style={{ padding:"8px 18px",borderRadius:9,border:"none",cursor:"pointer",fontSize:13,fontWeight:700,
                  background:mainTab===t.id?C.navy:"transparent",color:mainTab===t.id?"#fff":C.muted,
                  fontFamily:"inherit",transition:"all 0.15s",display:"flex",alignItems:"center",gap:7 }}>
                {t.label}
                {t.badge>0&&<span style={{ padding:"1px 7px",borderRadius:999,fontSize:10,fontWeight:800,background:mainTab===t.id?"rgba(31,163,163,0.3)":C.amber+"22",color:mainTab===t.id?C.teal:C.amber }}>{t.badge}</span>}
              </button>
            ))}
          </div>

          {mainTab==="kyc" && (
            <div>
              <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:10,marginBottom:20 }}>
                {[["Pending",kycItems.filter(x=>x.status==="pending").length,C.amber],["Approved",kycItems.filter(x=>x.status==="approved").length,C.green],["Rejected",kycItems.filter(x=>x.status==="rejected").length,C.red],["High Risk",kycItems.filter(x=>x.risk==="high").length,"#EF4444"]].map(([l,v,c])=>(
                  <Card key={l} style={{ padding:"14px 16px" }}>
                    <div style={{ fontSize:11,color:C.muted,marginBottom:5 }}>{l}</div>
                    <div style={{ fontSize:22,fontWeight:800,color:c }}>{v}</div>
                  </Card>
                ))}
              </div>
              <TabBar tabs={kycTabs} active={kycTab} onSelect={setKycTab}/>
              <div style={{ display:"flex",flexDirection:"column",gap:12,paddingBottom:80 }}>
                {kycFiltered.length===0&&<EmptyState icon="✅" title="No pending KYC reviews" body="All submissions have been reviewed." compact/>}
                {kycFiltered.map(item=>(
                  <Card key={item.id} style={{ padding:18 }}>
                    <div style={{ display:"flex",alignItems:"flex-start",gap:14 }}>
                      <Avatar name={item.name} size={44}/>
                      <div style={{ flex:1,minWidth:0 }}>
                        <div style={{ display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:5 }}>
                          <span style={{ fontWeight:700,fontSize:15,color:C.text }}>{item.name}</span>
                          <Badge v={roleColor(item.role)}>{item.role}</Badge>
                          {item.risk==="high"&&<span style={{ fontSize:11,padding:"2px 8px",borderRadius:6,background:"rgba(239,68,68,0.1)",color:C.red,fontWeight:700 }}>&#9888; High Risk</span>}
                          <Badge v={statusColor(item.status)} style={{ marginLeft:"auto" }}>{item.status}</Badge>
                        </div>
                        <div style={{ display:"flex",gap:12,flexWrap:"wrap",marginBottom:item.status==="pending"?12:6 }}>
                          <span style={{ fontSize:12,color:C.muted }}>{item.email}</span>
                          <span style={{ fontSize:12,color:C.muted }}>|</span>
                          <span style={{ fontSize:12,color:C.muted }}>{item.docType}</span>
                          <span style={{ fontSize:12,color:C.muted }}>|</span>
                          <span style={{ fontSize:12,color:C.muted }}>{item.submitted}</span>
                        </div>
                        {item.status==="pending"&&(
                          <div style={{ display:"flex",gap:8,flexWrap:"wrap" }}>
                            <Btn v="secondary" sz="sm" onClick={()=>setKycDetail(item)}>Review Docs</Btn>
                            <Btn v="primary"   sz="sm" onClick={()=>actKyc(item.id,"approved")}>Approve</Btn>
                            <Btn v="danger"    sz="sm" onClick={()=>{ setRejectModal(item); setRejectNote(""); }}>Reject</Btn>
                          </div>
                        )}
                        {item.status!=="pending"&&(
                          <div style={{ display:"flex",gap:10 }}>
                            <button onClick={()=>setKycDetail(item)} style={{ fontSize:12,color:C.teal,background:"none",border:"none",cursor:"pointer",padding:0,fontFamily:"inherit" }}>View docs</button>
                            <button onClick={()=>actKyc(item.id,"pending")} style={{ fontSize:12,color:C.muted,background:"none",border:"none",cursor:"pointer",padding:0,fontFamily:"inherit" }}>&#8629; Revert</button>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {mainTab==="content" && (
            <div>
              <TabBar tabs={tabs} active={tab} onSelect={setTab}/>
              <div style={{ display:"flex",flexDirection:"column",gap:12,paddingBottom:80 }}>
                {filtered.length===0&&<EmptyState icon={tab==="flagged"?"🚩":tab==="reviews"?"⭐":"✅"} title={`No ${tab} items`} body={tab==="flagged"?"No flagged content to review right now.":tab==="reviews"?"No pending reviews at this time.":"All actions completed."} compact/>}
                {filtered.map(item=>(
                  <Card key={item.id} style={{ padding:18 }}>
                    <div style={{ display:"flex",alignItems:"flex-start",gap:12 }}>
                      <Avatar name={item.title} size={42}/>
                      <div style={{ flex:1,minWidth:0 }}>
                        <div style={{ display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:4 }}>
                          <span style={{ fontWeight:700,fontSize:15,color:C.text }}>{item.title}</span>
                          {item.flagged&&<span style={{ fontSize:11,padding:"2px 7px",borderRadius:6,background:"rgba(239,68,68,0.1)",color:C.red,fontWeight:700 }}>&#9873; Flagged</span>}
                        </div>
                        <div style={{ display:"flex",gap:8,alignItems:"center",flexWrap:"wrap",marginBottom:item.status==="pending"?12:0 }}>
                          <Badge v={item.type==="Startup Profile"?"teal":item.type==="Event"?"amber":"indigo"}>{item.type}</Badge>
                          <span style={{ fontSize:12,color:C.muted }}>by {item.submitter}</span>
                          <span style={{ fontSize:12,color:C.muted }}>| {item.date}</span>
                          <Badge v={statusColor(item.status)}>{item.status}</Badge>
                        </div>
                        {item.status==="pending"&&(
                          <div style={{ display:"flex",gap:8,flexWrap:"wrap" }}>
                            <Btn v="secondary" sz="sm" onClick={()=>setDetailItem(item)}>View Details</Btn>
                            <Btn v="danger"    sz="sm" onClick={()=>act(item.id,"rejected")}>Reject</Btn>
                            <Btn v="primary"   sz="sm" onClick={()=>act(item.id,"approved")}>Approve</Btn>
                          </div>
                        )}
                        {item.status!=="pending"&&<button onClick={()=>act(item.id,"pending")} style={{ fontSize:12,color:C.muted,background:"none",border:"none",cursor:"pointer",padding:0,fontFamily:"inherit" }}>&#8629; Revert</button>}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* KYC Detail Modal */}
      <Modal open={!!kycDetail} onClose={()=>setKycDetail(null)} title="Identity Document Review">
        {kycDetail&&(
          <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
            <div style={{ display:"flex",alignItems:"center",gap:12,padding:"14px 16px",borderRadius:12,background:C.offWhite }}>
              <Avatar name={kycDetail.name} size={50}/>
              <div>
                <div style={{ fontWeight:700,fontSize:16,color:C.text,marginBottom:4 }}>{kycDetail.name}</div>
                <div style={{ display:"flex",gap:6,flexWrap:"wrap" }}>
                  <Badge v={roleColor(kycDetail.role)}>{kycDetail.role}</Badge>
                  {kycDetail.risk==="high"&&<Badge v="red">High Risk</Badge>}
                  <Badge v={statusColor(kycDetail.status)}>{kycDetail.status}</Badge>
                </div>
              </div>
            </div>
            <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
              {[["Email",kycDetail.email],["Company",kycDetail.company||"N/A"],["Document",kycDetail.docType],["LinkedIn",kycDetail.linkedin||"Not provided"],["Submitted",kycDetail.submitted],["Risk",kycDetail.risk.toUpperCase()]].map(([l,v])=>(
                <div key={l} style={{ display:"flex",justifyContent:"space-between",padding:"9px 13px",borderRadius:9,background:C.offWhite }}>
                  <span style={{ fontSize:13,color:C.muted }}>{l}</span>
                  <span style={{ fontSize:13,fontWeight:600,color:l==="Risk"?riskColor(kycDetail.risk):C.text }}>{v}</span>
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize:12,fontWeight:700,color:C.muted,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:10 }}>Uploaded Documents</div>
              <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(100px,1fr))",gap:10 }}>
                {[["Front","ID Front"],["Back","ID Back"],["Selfie","With Doc"]].map(([k,l])=>(
                  <div key={k} style={{ borderRadius:10,background:C.offWhite,border:`1px solid ${C.border}`,aspectRatio:"4/3",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:6 }}>
                    <Icon d={I.eye} size={20} style={{ color:C.muted }}/>
                    <span style={{ fontSize:11,color:C.muted,fontWeight:600 }}>{l}</span>
                    <span style={{ fontSize:10,color:C.teal,fontWeight:600,cursor:"pointer" }}>View</span>
                  </div>
                ))}
              </div>
            </div>
            {kycDetail.risk==="high"&&(
              <div style={{ padding:"12px 14px",borderRadius:10,background:"rgba(239,68,68,0.06)",border:"1px solid rgba(239,68,68,0.2)" }}>
                <div style={{ fontSize:12,fontWeight:700,color:C.red,marginBottom:4 }}>High Risk Flags</div>
                <div style={{ fontSize:13,color:C.text,lineHeight:1.6 }}>Disposable email detected. No LinkedIn or company affiliation. Manual review required before approval.</div>
              </div>
            )}
            {kycDetail.status==="pending"&&(
              <div style={{ display:"flex",gap:10 }}>
                <Btn v="danger" full onClick={()=>{ setKycDetail(null); setRejectModal(kycDetail); setRejectNote(""); }}>Reject</Btn>
                <Btn v="primary" full onClick={()=>{ actKyc(kycDetail.id,"approved"); setKycDetail(null); }}>Approve Identity</Btn>
              </div>
            )}
            {kycDetail.status!=="pending"&&<Btn v="secondary" full onClick={()=>setKycDetail(null)}>Close</Btn>}
          </div>
        )}
      </Modal>

      {/* Reject reason modal */}
      <Modal open={!!rejectModal} onClose={()=>setRejectModal(null)} title="Reject & Notify User">
        {rejectModal&&(
          <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
            <div style={{ padding:"12px 14px",borderRadius:10,background:"rgba(239,68,68,0.06)",border:"1px solid rgba(239,68,68,0.2)" }}>
              <div style={{ fontSize:13,color:C.text }}>Rejecting KYC for <strong>{rejectModal.name}</strong>. They will receive an email with your reason and can re-submit.</div>
            </div>
            <FSelect label="Rejection reason" value={rejectNote} onChange={setRejectNote}
              options={[
                {value:"",label:"Select a reason..."},
                {value:"blurry",label:"Document image is blurry or unreadable"},
                {value:"mismatch",label:"Name or details do not match profile"},
                {value:"expired",label:"Document is expired"},
                {value:"invalid",label:"Document type not accepted"},
                {value:"suspicious",label:"Suspicious or potentially fraudulent"},
                {value:"incomplete",label:"Incomplete submission"},
                {value:"other",label:"Other"},
              ]}/>
            <div style={{ display:"flex",gap:10 }}>
              <Btn v="secondary" full onClick={()=>setRejectModal(null)}>Cancel</Btn>
              <Btn v="danger" full onClick={()=>{ actKyc(rejectModal.id,"rejected"); setRejectModal(null); }}>Reject & Notify</Btn>
            </div>
          </div>
        )}
      </Modal>

      {/* Content Detail Modal */}
      <Modal open={!!detailItem} onClose={()=>setDetailItem(null)} title="Review Submission">
        {detailItem&&(
          <div>
            <div style={{ display:"flex",alignItems:"center",gap:12,padding:"14px 16px",borderRadius:12,background:C.offWhite,marginBottom:16 }}>
              <Avatar name={detailItem.title} size={46}/>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:700,fontSize:16,color:C.text,marginBottom:4 }}>{detailItem.title}</div>
                <div style={{ display:"flex",gap:8,flexWrap:"wrap" }}>
                  <Badge v={detailItem.type==="Startup Profile"?"teal":detailItem.type==="Event"?"amber":"indigo"}>{detailItem.type}</Badge>
                  {detailItem.flagged&&<span style={{ fontSize:11,padding:"2px 7px",borderRadius:6,background:"rgba(239,68,68,0.1)",color:C.red,fontWeight:700 }}>&#9873; Flagged</span>}
                </div>
              </div>
            </div>
            <div style={{ display:"flex",flexDirection:"column",gap:10,marginBottom:18 }}>
              {[["Submitted by",detailItem.submitter],["Date",detailItem.date],["Type",detailItem.type],["Status",detailItem.status]].map(([l,v])=>(
                <div key={l} style={{ display:"flex",justifyContent:"space-between",padding:"10px 14px",borderRadius:9,background:C.offWhite }}>
                  <span style={{ fontSize:13,color:C.muted }}>{l}</span>
                  <span style={{ fontSize:13,fontWeight:600,color:C.text,textTransform:"capitalize" }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ padding:"12px 14px",borderRadius:10,background:"rgba(245,158,11,0.06)",border:"1px solid rgba(245,158,11,0.2)",marginBottom:16 }}>
              <div style={{ fontSize:12,fontWeight:700,color:C.amber,marginBottom:4 }}>Review Notes</div>
              <div style={{ fontSize:13,color:C.text }}>{detailItem.flagged?"Auto-flagged. Check for policy violations.":"No flags. Standard review applies."}</div>
            </div>
            {detailItem.status==="pending"&&(
              <div style={{ display:"flex",gap:10 }}>
                <Btn v="danger"  full onClick={()=>{ act(detailItem.id,"rejected"); setDetailItem(null); }}>Reject</Btn>
                <Btn v="primary" full onClick={()=>{ act(detailItem.id,"approved"); setDetailItem(null); }}>Approve</Btn>
              </div>
            )}
            {detailItem.status!=="pending"&&<Btn v="secondary" full onClick={()=>setDetailItem(null)}>Close</Btn>}
          </div>
        )}
      </Modal>
    </div>
  );
};
const AdminLoginPage = ({ nav }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!email || !password) { setError("Please fill in all fields."); return; }
    if (email !== "admin@fundlink.in" || password !== "admin123") {
      setError("Invalid admin credentials. Try admin@fundlink.in / admin123"); return;
    }
    setError(""); setLoading(true);
    setTimeout(() => { setLoading(false); nav("admin"); }, 1000);
  };

  return (
    <div style={{ minHeight:"100vh", background:C.navy, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:24 }}>
      {/* Logo */}
      <div style={{ display:"flex", alignItems:"center", gap:9, marginBottom:36 }}>
        <div style={{ width:32, height:32, borderRadius:9, background:C.teal, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <Icon d={I.link} size={15} sw={2.5}/>
        </div>
        <span onClick={()=>nav("landing")} style={{ color:"#fff", fontWeight:800, fontSize:20, letterSpacing:"-0.02em", cursor:"pointer" }}>
          Fund<span style={{ color:C.teal }}>Link</span>
        </span>
      </div>

      <div style={{ maxWidth:400, width:"100%" }}>
        <div style={{ textAlign:"center", marginBottom:28 }}>
          <div style={{ width:60, height:60, borderRadius:16, background:"rgba(31,163,163,0.15)", border:`1.5px solid ${C.tealBd}`, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px", color:C.teal }}>
            <Icon d={I.shield} size={28}/>
          </div>
          <h1 style={{ color:"#fff", fontSize:24, fontWeight:800, marginBottom:6, letterSpacing:"-0.02em" }}>Admin Access</h1>
          <p style={{ color:"rgba(255,255,255,0.4)", fontSize:14 }}>Sign in with your administrator credentials</p>
        </div>

        <div style={{ background:"rgba(255,255,255,0.04)", borderRadius:16, padding:24, border:"1px solid rgba(255,255,255,0.09)" }}>
          {error && (
            <div style={{ padding:"10px 14px", borderRadius:9, background:"rgba(239,68,68,0.12)", border:"1px solid rgba(239,68,68,0.3)", color:C.red, fontSize:13, marginBottom:14 }}>{error}</div>
          )}
          <div style={{ display:"flex", flexDirection:"column", gap:13 }}>
            <div>
              <label style={{ display:"block", fontSize:13, fontWeight:600, color:"rgba(255,255,255,0.6)", marginBottom:6 }}>Admin Email</label>
              <div style={{ position:"relative" }}>
                <div style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:"rgba(255,255,255,0.3)", pointerEvents:"none" }}>
                  <Icon d={I.mail||["M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z","M22 6l-10 7L2 6"]} size={15}/>
                </div>
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)}
                  placeholder="admin@fundlink.in"
                  style={{ width:"100%", padding:"11px 14px 11px 38px", borderRadius:10, border:"1.5px solid rgba(255,255,255,0.12)", background:"rgba(255,255,255,0.07)", color:"#fff", fontSize:14, outline:"none", boxSizing:"border-box", fontFamily:"inherit" }}
                  onFocus={e=>e.target.style.borderColor=C.teal} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.12)"}/>
              </div>
            </div>
            <div>
              <label style={{ display:"block", fontSize:13, fontWeight:600, color:"rgba(255,255,255,0.6)", marginBottom:6 }}>Password</label>
              <input type="password" value={password} onChange={e=>setPassword(e.target.value)}
                placeholder="password"
                style={{ width:"100%", padding:"11px 14px", borderRadius:10, border:"1.5px solid rgba(255,255,255,0.12)", background:"rgba(255,255,255,0.07)", color:"#fff", fontSize:14, outline:"none", boxSizing:"border-box", fontFamily:"inherit" }}
                onFocus={e=>e.target.style.borderColor=C.teal} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.12)"}
                onKeyDown={e=>e.key==="Enter"&&handleSubmit()}/>
            </div>
            <button onClick={handleSubmit} disabled={loading}
              style={{ width:"100%", padding:"12px", borderRadius:10, background:loading?"rgba(31,163,163,0.6)":C.teal, color:"#fff", fontWeight:700, fontSize:15, border:"none", cursor:loading?"not-allowed":"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
              {loading ? "Signing in..." : <><Icon d={I.shield} size={16}/>Sign In as Admin</>}
            </button>
          </div>

          {/* Demo creds box */}
          <div style={{ marginTop:20, padding:"12px 14px", borderRadius:10, background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ fontSize:11, fontWeight:700, color:"rgba(255,255,255,0.28)", letterSpacing:"0.07em", textTransform:"uppercase", marginBottom:8 }}>Demo Credentials</div>
            <div style={{ fontSize:13, color:"rgba(255,255,255,0.45)", marginBottom:4 }}>Email: admin@fundlink.in</div>
            <div style={{ fontSize:13, color:"rgba(255,255,255,0.45)" }}>Password: admin123</div>
          </div>
        </div>

        <p style={{ textAlign:"center", marginTop:20, color:"rgba(255,255,255,0.25)", fontSize:13 }}>
          Not an admin?{" "}
          <span onClick={()=>nav("login")} style={{ color:C.teal, fontWeight:600, cursor:"pointer" }}>User login</span>
        </p>
      </div>
    </div>
  );
};

// ─── LOGIN PAGE ───────────────────────────────────────────────────────────────
const LoginPage = ({ nav }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("founder");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [forgotModal, setForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);

  const handleSubmit = () => {
    if (!email || !password) { setError("Please fill in all fields."); return; }
    if (!email.includes("@")) { setError("Please enter a valid email address."); return; }
    setError(""); setLoading(true);
    setTimeout(() => { setLoading(false); nav(role); }, 1200);
  };

  return (
    <div style={{ minHeight:"100vh", background:C.navy, display:"flex", flexDirection:"column" }}>
      {/* Header */}
      <div style={{ padding:"16px 24px", borderBottom:"1px solid rgba(255,255,255,0.08)", display:"flex", alignItems:"center", gap:10 }}>
        <div style={{ width:28,height:28,borderRadius:8,background:C.teal,display:"flex",alignItems:"center",justifyContent:"center" }}>
          <Icon d={I.link} size={14} sw={2.5}/>
        </div>
        <span onClick={()=>nav("landing")} style={{ color:"#fff",fontWeight:800,fontSize:18,letterSpacing:"-0.02em",cursor:"pointer" }}>
          Fund<span style={{ color:C.teal }}>Link</span>
        </span>
      </div>

      <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:24 }}>
        <div style={{ maxWidth:420, width:"100%" }}>
          <div style={{ textAlign:"center", marginBottom:32 }}>
            <h1 style={{ color:"#fff", fontSize:26, fontWeight:800, marginBottom:8, letterSpacing:"-0.02em" }}>Welcome back</h1>
            <p style={{ color:"rgba(255,255,255,0.45)", fontSize:15 }}>Sign in to your FundLink account</p>
          </div>

          <div style={{ background:"rgba(255,255,255,0.04)", borderRadius:16, padding:28, border:"1px solid rgba(255,255,255,0.09)" }}>
            {error && (
              <div style={{ padding:"10px 14px", borderRadius:9, background:"rgba(239,68,68,0.12)", border:"1px solid rgba(239,68,68,0.3)", color:C.red, fontSize:13, marginBottom:16 }}>
                {error}
              </div>
            )}
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              <div>
                <label style={{ display:"block", fontSize:13, fontWeight:600, color:"rgba(255,255,255,0.7)", marginBottom:6 }}>Email address</label>
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)}
                  placeholder="you@example.com"
                  style={{ width:"100%", padding:"11px 14px", borderRadius:10, border:"1.5px solid rgba(255,255,255,0.12)", background:"rgba(255,255,255,0.07)", color:"#fff", fontSize:14, outline:"none", boxSizing:"border-box", fontFamily:"inherit" }}
                  onFocus={e=>e.target.style.borderColor=C.teal} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.12)"}/>
              </div>
              <div>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                  <label style={{ fontSize:13, fontWeight:600, color:"rgba(255,255,255,0.7)" }}>Password</label>
                  <span onClick={()=>setForgotModal(true)} style={{ fontSize:12, color:C.teal, cursor:"pointer" }}>Forgot password?</span>
                </div>
                <input type="password" value={password} onChange={e=>setPassword(e.target.value)}
                  placeholder="password"
                  style={{ width:"100%", padding:"11px 14px", borderRadius:10, border:"1.5px solid rgba(255,255,255,0.12)", background:"rgba(255,255,255,0.07)", color:"#fff", fontSize:14, outline:"none", boxSizing:"border-box", fontFamily:"inherit" }}
                  onFocus={e=>e.target.style.borderColor=C.teal} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.12)"}
                  onKeyDown={e=>e.key==="Enter"&&handleSubmit()}/>
              </div>

              {/* Role selector */}
              <div>
                <label style={{ display:"block",fontSize:13,fontWeight:600,color:"rgba(255,255,255,0.65)",marginBottom:8 }}>Sign in as</label>
                <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:6 }}>
                  {[["Founder","founder",C.teal],["Investor","investor","#6366F1"],["Partner","partner",C.amber],["Admin","admin","#94A3B8"]].map(([l,r,c])=>(
                    <button key={r} onClick={()=>setRole(r)}
                      style={{ padding:"8px 4px",borderRadius:9,border:`1.5px solid ${role===r?c:"rgba(255,255,255,0.1)"}`,
                        background:role===r?`${c}18`:"rgba(255,255,255,0.04)",
                        color:role===r?c:"rgba(255,255,255,0.4)",
                        fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit",transition:"all 0.15s" }}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={handleSubmit} disabled={loading}
                style={{ width:"100%", padding:"12px", borderRadius:10, background:loading?"rgba(31,163,163,0.6)":C.teal, color:"#fff", fontWeight:700, fontSize:15, border:"none", cursor:loading?"not-allowed":"pointer", fontFamily:"inherit", marginTop:4 }}>
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </div>

            {/* Social login */}
            <div style={{ display:"flex", alignItems:"center", gap:12, margin:"20px 0 16px" }}>
              <div style={{ flex:1, height:1, background:"rgba(255,255,255,0.1)" }}/>
              <span style={{ color:"rgba(255,255,255,0.25)", fontSize:12 }}>or continue with</span>
              <div style={{ flex:1, height:1, background:"rgba(255,255,255,0.1)" }}/>
            </div>
            <div style={{ display:"flex", gap:10, marginBottom:20 }}>
              {[
                { label:"Google",   icon:"G", bg:"#fff",                    color:"#1F2937", border:"transparent" },
                { label:"LinkedIn", icon:"in", bg:"#0A66C2",                color:"#fff",    border:"transparent" },
              ].map(({ label, icon, bg, color, border })=>(
                <button key={label} onClick={()=>nav(role)}
                  style={{ flex:1, padding:"10px", borderRadius:10, background:bg,
                    border:`1.5px solid ${border||"rgba(255,255,255,0.1)"}`,
                    color, fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"inherit",
                    display:"flex", alignItems:"center", justifyContent:"center", gap:8,
                    transition:"opacity 0.15s" }}
                  onMouseEnter={e=>e.currentTarget.style.opacity="0.88"}
                  onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
                  <span style={{ fontWeight:900, fontSize:14, lineHeight:1 }}>{icon}</span>
                  {label}
                </button>
              ))}
            </div>

            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12 }}>
              <div style={{ flex:1, height:1, background:"rgba(255,255,255,0.1)" }}/>
              <span style={{ color:"rgba(255,255,255,0.25)", fontSize:12 }}>or quick demo</span>
              <div style={{ flex:1, height:1, background:"rgba(255,255,255,0.1)" }}/>
            </div>

            {/* Quick demo logins */}
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {[["Founder","founder"],["Investor","investor"],["Partner","partner"],["Admin","admin"]].map(([l,r])=>(
                <button key={r} onClick={()=>nav(r)}
                  style={{ width:"100%", padding:"9px", borderRadius:9, background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", color:"rgba(255,255,255,0.65)", fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"inherit", transition:"all 0.15s" }}
                  onMouseEnter={e=>e.target.style.background="rgba(255,255,255,0.1)"}
                  onMouseLeave={e=>e.target.style.background="rgba(255,255,255,0.06)"}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          <p style={{ textAlign:"center", marginTop:20, color:"rgba(255,255,255,0.35)", fontSize:14 }}>
            Don't have an account?{" "}
            <span onClick={()=>nav("signup")} style={{ color:C.teal, fontWeight:600, cursor:"pointer" }}>Sign up free</span>
          </p>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <Modal open={forgotModal} onClose={()=>{ setForgotModal(false); setForgotSent(false); setForgotEmail(""); }} title="Reset Password">
        {forgotSent
          ? <div style={{ textAlign:"center", padding:"16px 0" }}>
              <div style={{ width:52,height:52,borderRadius:26,background:"rgba(16,185,129,0.12)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px" }}>
                <Icon d={I.check} size={24} sw={2.5} style={{ color:C.green }}/>
              </div>
              <div style={{ fontWeight:700,fontSize:16,color:C.text,marginBottom:6 }}>Check your inbox</div>
              <div style={{ fontSize:13,color:C.muted,marginBottom:18 }}>We sent a reset link to <strong>{forgotEmail}</strong>. It expires in 30 minutes.</div>
              <Btn v="primary" full onClick={()=>{ setForgotModal(false); setForgotSent(false); setForgotEmail(""); }}>Back to Login</Btn>
            </div>
          : <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
              <p style={{ fontSize:14,color:C.muted,margin:0 }}>Enter the email address you used to sign up and we'll send you a reset link.</p>
              <FInput label="Email Address" value={forgotEmail} onChange={e=>setForgotEmail(e.target.value)} placeholder="you@company.com"/>
              <div style={{ display:"flex",gap:10 }}>
                <Btn v="secondary" full onClick={()=>setForgotModal(false)}>Cancel</Btn>
                <Btn v="primary" full onClick={()=>{ if(forgotEmail.includes("@")) setForgotSent(true); }}>Send Reset Link</Btn>
              </div>
            </div>
        }
      </Modal>
    </div>
  );
};
const SignupPage = ({ nav }) => {
  const [step,     setStep]     = useState(1);
  const [role,     setRole]     = useState("");
  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [phone,    setPhone]    = useState("");
  const [password, setPassword] = useState("");
  const [showPw,   setShowPw]   = useState(false);
  const [org,      setOrg]      = useState("");
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");
  const [agreed,   setAgreed]   = useState(false);

  const roles2 = [
    {id:"founder",  label:"Founder",           icon:I.trending, desc:"I'm building a startup and looking for funding",       color:C.teal},
    {id:"investor", label:"Investor",           icon:I.star,     desc:"I invest in early-stage startups",                         color:"#6366F1"},
    {id:"partner",  label:"Ecosystem Partner",  icon:I.building, desc:"I run events, accelerators, or programs",                  color:C.amber},
  ];

  const pwStrength = p => {
    if(!p) return {score:0,label:"",color:"transparent"};
    let s=0;
    if(p.length>=8) s++;
    if(/[A-Z]/.test(p)) s++;
    if(/[0-9]/.test(p)) s++;
    if(/[^A-Za-z0-9]/.test(p)) s++;
    const labels = ["","Weak","Fair","Good","Strong"];
    const colors = ["transparent","#ef4444","#f59e0b",C.teal,C.green];
    return {score:s,label:labels[s],color:colors[s]};
  };
  const pw = pwStrength(password);

  const handleCreate = () => {
    if(!name||!email||!password) { setError("Please fill all required fields."); return; }
    if(!email.includes("@"))      { setError("Invalid email address."); return; }
    if(password.length<8)         { setError("Password must be at least 8 characters."); return; }
    if(!agreed)                   { setError("Please agree to the Terms of Service to continue."); return; }
    setError(""); setLoading(true);
    setTimeout(()=>{ setLoading(false); nav("verifyEmail"); }, 1400);
  };

  const inputStyle = { width:"100%",padding:"11px 14px",borderRadius:10,border:"1.5px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.07)",color:"#fff",fontSize:14,outline:"none",boxSizing:"border-box",fontFamily:"inherit" };

  return (
    <div style={{ minHeight:"100vh",background:C.navy,display:"flex",flexDirection:"column" }}>
      {/* Nav bar */}
      <div style={{ padding:"16px 24px",borderBottom:"1px solid rgba(255,255,255,0.08)",display:"flex",alignItems:"center",gap:10 }}>
        <div style={{ width:28,height:28,borderRadius:8,background:C.teal,display:"flex",alignItems:"center",justifyContent:"center" }}>
          <Icon d={I.link} size={14} sw={2.5}/>
        </div>
        <span onClick={()=>nav("landing")} style={{ color:"#fff",fontWeight:800,fontSize:18,letterSpacing:"-0.02em",cursor:"pointer" }}>
          Fund<span style={{ color:C.teal }}>Link</span>
        </span>
        <div style={{ flex:1 }}/>
        <span style={{ color:"rgba(255,255,255,0.35)",fontSize:13 }}>Already have an account?{" "}
          <span onClick={()=>nav("login")} style={{ color:C.teal,fontWeight:600,cursor:"pointer" }}>Sign in</span>
        </span>
      </div>

      <div style={{ flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:24 }}>
        <div style={{ maxWidth:460,width:"100%" }}>

          {/* Step progress */}
          <div style={{ display:"flex",alignItems:"center",gap:0,justifyContent:"center",marginBottom:28 }}>
            {[{n:1,l:"Role"},{n:2,l:"Details"},{n:3,l:"Verify"}].map((s,i)=>(
              <div key={s.n} style={{ display:"flex",alignItems:"center" }}>
                <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:4 }}>
                  <div style={{ width:30,height:30,borderRadius:15,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,transition:"all 0.25s",
                    background:step>s.n?C.green:step===s.n?C.teal:"rgba(255,255,255,0.1)",
                    color:step>=s.n?"#fff":"rgba(255,255,255,0.3)",
                    boxShadow:step===s.n?`0 0 0 3px rgba(31,163,163,0.25)`:"none" }}>
                    {step>s.n?<Icon d={I.check} size={14} sw={2.5}/>:s.n}
                  </div>
                  <span style={{ fontSize:10,fontWeight:600,color:step>=s.n?"rgba(255,255,255,0.65)":"rgba(255,255,255,0.2)" }}>{s.l}</span>
                </div>
                {i<2&&<div style={{ width:56,height:2,borderRadius:1,margin:"0 4px 16px",transition:"background 0.25s",background:step>s.n?C.teal:"rgba(255,255,255,0.1)" }}/>}
              </div>
            ))}
          </div>

          <div style={{ textAlign:"center",marginBottom:24 }}>
            <h1 style={{ color:"#fff",fontSize:24,fontWeight:800,marginBottom:6,letterSpacing:"-0.02em" }}>
              {step===1?"Join FundLink":step===2?"Create your account":"Almost there!"}
            </h1>
            <p style={{ color:"rgba(255,255,255,0.4)",fontSize:14 }}>
              {step===1?"Choose your role to get started":step===2?`Signing up as ${roles2.find(r=>r.id===role)?.label}`:"Verify your email to activate your account"}
            </p>
          </div>

          {/* Step 1 — Role */}
          {step===1 && (
            <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
              {roles2.map(r=>(
                <div key={r.id} onClick={()=>{ setRole(r.id); setStep(2); }}
                  style={{ padding:18,borderRadius:14,cursor:"pointer",background:"rgba(255,255,255,0.05)",border:"1.5px solid rgba(255,255,255,0.1)",display:"flex",gap:14,alignItems:"center",transition:"all 0.18s" }}
                  onMouseEnter={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.09)"; e.currentTarget.style.borderColor=r.color+"66"; }}
                  onMouseLeave={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.1)"; }}>
                  <div style={{ width:44,height:44,borderRadius:12,background:r.color+"22",display:"flex",alignItems:"center",justifyContent:"center",color:r.color,flexShrink:0 }}>
                    <Icon d={r.icon} size={21}/>
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ color:"#fff",fontWeight:700,fontSize:15,marginBottom:3 }}>{r.label}</div>
                    <div style={{ color:"rgba(255,255,255,0.4)",fontSize:13,lineHeight:1.5 }}>{r.desc}</div>
                  </div>
                  <Icon d={I.chevR} size={16} style={{ color:"rgba(255,255,255,0.25)" }}/>
                </div>
              ))}
            </div>
          )}

          {/* Step 2 — Details */}
          {step===2 && (
            <div style={{ background:"rgba(255,255,255,0.04)",borderRadius:16,padding:24,border:"1px solid rgba(255,255,255,0.09)" }}>
              {/* Social sign-up buttons */}
              <div style={{ display:"flex", gap:10, marginBottom:20 }}>
                {[
                  { label:"Continue with Google",   icon:"G",  bg:"#fff",     color:"#1F2937" },
                  { label:"Continue with LinkedIn", icon:"in", bg:"#0A66C2",  color:"#fff"    },
                ].map(({ label, icon, bg, color })=>(
                  <button key={label} onClick={()=>{ setStep(3); setTimeout(()=>nav("verifyEmail"),1400); }}
                    style={{ flex:1, padding:"10px 8px", borderRadius:10, background:bg,
                      color, fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"inherit",
                      display:"flex", alignItems:"center", justifyContent:"center", gap:6,
                      border:"none", transition:"opacity 0.15s" }}
                    onMouseEnter={e=>e.currentTarget.style.opacity="0.88"}
                    onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
                    <span style={{ fontWeight:900, fontSize:14, lineHeight:1 }}>{icon}</span>
                    {label}
                  </button>
                ))}
              </div>
              <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:18 }}>
                <div style={{ flex:1,height:1,background:"rgba(255,255,255,0.1)" }}/>
                <span style={{ color:"rgba(255,255,255,0.3)",fontSize:11 }}>or sign up with email</span>
                <div style={{ flex:1,height:1,background:"rgba(255,255,255,0.1)" }}/>
              </div>

              {error && (
                <div style={{ padding:"10px 14px",borderRadius:9,background:"rgba(239,68,68,0.12)",border:"1px solid rgba(239,68,68,0.3)",color:C.red,fontSize:13,marginBottom:14,display:"flex",alignItems:"center",gap:8 }}>
                  <span>⚠️</span>{error}
                </div>
              )}
              <div style={{ display:"flex",flexDirection:"column",gap:13 }}>
                {/* Name */}
                <div>
                  <label style={{ display:"block",fontSize:12,fontWeight:700,color:"rgba(255,255,255,0.5)",marginBottom:5,letterSpacing:"0.04em",textTransform:"uppercase" }}>Full Name *</label>
                  <input value={name} onChange={e=>setName(e.target.value)} placeholder="Priya Sharma" style={inputStyle}
                    onFocus={e=>e.target.style.borderColor=C.teal} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.12)"}/>
                </div>
                {/* Org */}
                <div>
                  <label style={{ display:"block",fontSize:12,fontWeight:700,color:"rgba(255,255,255,0.5)",marginBottom:5,letterSpacing:"0.04em",textTransform:"uppercase" }}>
                    {role==="partner"?"Organization Name":"Startup / Company Name"}
                  </label>
                  <input value={org} onChange={e=>setOrg(e.target.value)}
                    placeholder={role==="founder"?"GreenTech Solutions":role==="partner"?"NASSCOM Foundation":"TechBridge Capital"}
                    style={inputStyle} onFocus={e=>e.target.style.borderColor=C.teal} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.12)"}/>
                </div>
                {/* Email */}
                <div>
                  <label style={{ display:"block",fontSize:12,fontWeight:700,color:"rgba(255,255,255,0.5)",marginBottom:5,letterSpacing:"0.04em",textTransform:"uppercase" }}>Email Address *</label>
                  <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@company.com" style={inputStyle}
                    onFocus={e=>e.target.style.borderColor=C.teal} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.12)"}/>
                </div>
                {/* Phone */}
                <div>
                  <label style={{ display:"block",fontSize:12,fontWeight:700,color:"rgba(255,255,255,0.5)",marginBottom:5,letterSpacing:"0.04em",textTransform:"uppercase" }}>Phone <span style={{ fontWeight:400,textTransform:"none" }}>(Optional)</span></label>
                  <input type="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+91 98765 43210" style={inputStyle}
                    onFocus={e=>e.target.style.borderColor=C.teal} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.12)"}/>
                </div>
                {/* Password */}
                <div>
                  <label style={{ display:"block",fontSize:12,fontWeight:700,color:"rgba(255,255,255,0.5)",marginBottom:5,letterSpacing:"0.04em",textTransform:"uppercase" }}>Password *</label>
                  <div style={{ position:"relative" }}>
                    <input type={showPw?"text":"password"} value={password} onChange={e=>setPassword(e.target.value)} placeholder="Min. 8 characters"
                      style={{ ...inputStyle,paddingRight:44 }}
                      onFocus={e=>e.target.style.borderColor=C.teal} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.12)"}/>
                    <button onClick={()=>setShowPw(p=>!p)} type="button"
                      style={{ position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:"rgba(255,255,255,0.35)",padding:4,fontFamily:"inherit",fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.4)" }}>
                      {showPw?"Hide":"Show"}
                    </button>
                  </div>
                  {/* Strength bar */}
                  {password && (
                    <div style={{ marginTop:8 }}>
                      <div style={{ display:"flex",gap:3,marginBottom:4 }}>
                        {[1,2,3,4].map(i=>(
                          <div key={i} style={{ flex:1,height:3,borderRadius:2,background:i<=pw.score?pw.color:"rgba(255,255,255,0.1)",transition:"all 0.2s" }}/>
                        ))}
                      </div>
                      <div style={{ display:"flex",justifyContent:"space-between" }}>
                        <span style={{ fontSize:11,color:"rgba(255,255,255,0.3)" }}>Use 8+ chars, uppercase, numbers, symbols</span>
                        <span style={{ fontSize:11,fontWeight:700,color:pw.color }}>{pw.label}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Terms checkbox */}
                <div style={{ display:"flex",gap:10,alignItems:"flex-start",padding:"12px 14px",borderRadius:10,background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)" }}>
                  <div onClick={()=>setAgreed(p=>!p)} style={{ width:18,height:18,borderRadius:5,border:`2px solid ${agreed?C.teal:"rgba(255,255,255,0.2)"}`,background:agreed?C.teal:"transparent",flexShrink:0,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",marginTop:1,transition:"all 0.15s" }}>
                    {agreed&&<Icon d={I.check} size={10} sw={3} style={{ color:"#fff" }}/>}
                  </div>
                  <span style={{ fontSize:12,color:"rgba(255,255,255,0.4)",lineHeight:1.6 }}>
                    I agree to the{" "}
                    <span style={{ color:C.teal,cursor:"pointer",fontWeight:600 }}>Terms of Service</span>
                    {" "}and{" "}
                    <span style={{ color:C.teal,cursor:"pointer",fontWeight:600 }}>Privacy Policy</span>.
                    {" "}I consent to receiving product updates by email.
                  </span>
                </div>

                {/* Buttons */}
                <div style={{ display:"flex",gap:10,marginTop:4 }}>
                  <button onClick={()=>setStep(1)}
                    style={{ flex:1,padding:"12px",borderRadius:10,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.55)",fontWeight:600,fontSize:14,cursor:"pointer",fontFamily:"inherit" }}>
                    ← Back
                  </button>
                  <button onClick={handleCreate} disabled={loading||!agreed}
                    style={{ flex:2,padding:"12px",borderRadius:10,background:loading||!agreed?"rgba(31,163,163,0.35)":C.teal,color:"#fff",fontWeight:700,fontSize:15,border:"none",cursor:loading||!agreed?"not-allowed":"pointer",fontFamily:"inherit",transition:"all 0.2s" }}>
                    {loading?"Creating account…":"Create Account →"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3 — post-signup info (shown briefly before redirect) */}
          {step===3 && (
            <div style={{ textAlign:"center" }}>
              <div style={{ width:72,height:72,borderRadius:36,background:"rgba(16,185,129,0.15)",border:"2px solid rgba(16,185,129,0.4)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px" }}>
                <Icon d={I.check} size={30} sw={2.5} style={{ color:C.green }}/>
              </div>
              <div style={{ fontWeight:800,fontSize:22,color:"#fff",marginBottom:6 }}>Account created!</div>
              <div style={{ fontSize:14,color:"rgba(255,255,255,0.4)",marginBottom:0 }}>Redirecting to email verification…</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── PRICING PAGE ─────────────────────────────────────────────────────────────
// ─── VERIFY EMAIL PAGE ────────────────────────────────────────────────────────
const VerifyEmailPage = ({ nav }) => {
  const [otp, setOtp] = useState(["","","","","",""]);
  const [verified, setVerified] = useState(false);
  const [resent, setResent] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const refs = [useRef(),useRef(),useRef(),useRef(),useRef(),useRef()];

  const handleDigit = (idx, val) => {
    const clean = val.replace(/[^0-9]/g,"").slice(-1);
    const next = [...otp]; next[idx] = clean; setOtp(next);
    if (clean && idx < 5) refs[idx+1].current?.focus();
    if (!clean && idx > 0) refs[idx-1].current?.focus();
    setError("");
  };
  const handleKeyDown = (idx, e) => {
    if (e.key==="Backspace" && !otp[idx] && idx>0) refs[idx-1].current?.focus();
    if (e.key==="ArrowLeft" && idx>0) refs[idx-1].current?.focus();
    if (e.key==="ArrowRight" && idx<5) refs[idx+1].current?.focus();
  };
  const handlePaste = e => {
    const digits = e.clipboardData.getData("text").replace(/[^0-9]/g,"").slice(0,6).split("");
    const next = ["","","","","",""];
    digits.forEach((d,i)=>{ next[i]=d; });
    setOtp(next);
    if (digits.length===6) refs[5].current?.focus();
    e.preventDefault();
  };
  const handleVerify = () => {
    const code = otp.join("");
    if (code.length < 6) { setError("Please enter the 6-digit code."); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setVerified(true); setTimeout(()=>nav("kycUpload"),1800); }, 1200);
  };
  const handleResend = () => {
    setResent(true); setResendTimer(30); setError("");
    const t = setInterval(() => setResendTimer(p => { if(p<=1){ clearInterval(t); return 0; } return p-1; }), 1000);
  };

  const StepPill = ({ steps, active }) => (
    <div style={{ display:"flex",gap:6,alignItems:"center" }}>
      {steps.map((s,i)=>(
        <div key={s} style={{ display:"flex",alignItems:"center",gap:6 }}>
          <div style={{ padding:"3px 10px",borderRadius:99,fontSize:11,fontWeight:700,
            background:i===active?"rgba(31,163,163,0.25)":i<active?"rgba(31,163,163,0.12)":"rgba(255,255,255,0.06)",
            color:i===active?C.teal:i<active?"rgba(31,163,163,0.7)":"rgba(255,255,255,0.25)",
            border:`1px solid ${i===active?C.tealBd:i<active?"rgba(31,163,163,0.2)":"rgba(255,255,255,0.08)"}` }}>
            {i<active?"+ ":""}{s}
          </div>
          {i<steps.length-1&&<div style={{ width:10,height:1,background:"rgba(255,255,255,0.1)" }}/>}
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ minHeight:"100vh",background:C.navy,display:"flex",flexDirection:"column" }}>
      <div style={{ padding:"16px 24px",borderBottom:"1px solid rgba(255,255,255,0.08)",display:"flex",alignItems:"center",gap:10 }}>
        <div style={{ width:28,height:28,borderRadius:8,background:C.teal,display:"flex",alignItems:"center",justifyContent:"center" }}>
          <Icon d={I.link} size={14} sw={2.5}/>
        </div>
        <span onClick={()=>nav("landing")} style={{ color:"#fff",fontWeight:800,fontSize:18,letterSpacing:"-0.02em",cursor:"pointer" }}>
          Fund<span style={{ color:C.teal }}>Link</span>
        </span>
        <div style={{ marginLeft:"auto" }}>
          <StepPill steps={["Account","Verify Email","KYC","Done"]} active={1}/>
        </div>
      </div>

      <div style={{ flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:"24px 20px" }}>
        <div style={{ maxWidth:420,width:"100%",textAlign:"center" }}>
          {verified ? (
            <div>
              <div style={{ width:72,height:72,borderRadius:36,background:"rgba(16,185,129,0.15)",border:"2px solid rgba(16,185,129,0.4)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px" }}>
                <Icon d={I.check} size={32} sw={2.5} style={{ color:C.green }}/>
              </div>
              <h2 style={{ color:"#fff",fontSize:22,fontWeight:800,marginBottom:8,letterSpacing:"-0.02em" }}>Email Verified!</h2>
              <p style={{ color:"rgba(255,255,255,0.45)",fontSize:14,marginBottom:16 }}>Taking you to identity verification...</p>
              <div style={{ width:40,height:3,borderRadius:2,margin:"0 auto",background:C.teal }}/>
            </div>
          ) : (
            <>
              <div style={{ width:64,height:64,borderRadius:32,background:"rgba(31,163,163,0.12)",border:`1.5px solid ${C.tealBd}`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px" }}>
                <Icon d={I.bell} size={28} sw={1.6} style={{ color:C.teal }}/>
              </div>
              <h2 style={{ color:"#fff",fontSize:22,fontWeight:800,marginBottom:8,letterSpacing:"-0.02em" }}>Check your email</h2>
              <p style={{ color:"rgba(255,255,255,0.45)",fontSize:14,marginBottom:4 }}>We sent a 6-digit code to</p>
              <p style={{ color:C.teal,fontSize:14,fontWeight:600,marginBottom:28 }}>rahul@greentech.in</p>

              {error&&<div style={{ padding:"10px 14px",borderRadius:9,background:"rgba(239,68,68,0.12)",border:"1px solid rgba(239,68,68,0.3)",color:C.red,fontSize:13,marginBottom:16 }}>{error}</div>}

              <div style={{ display:"flex",gap:10,justifyContent:"center",marginBottom:24 }} onPaste={handlePaste}>
                {otp.map((digit,i)=>(
                  <input key={i} ref={refs[i]} value={digit}
                    onChange={e=>handleDigit(i,e.target.value)}
                    onKeyDown={e=>handleKeyDown(i,e)}
                    maxLength={1} inputMode="numeric"
                    style={{ width:48,height:58,borderRadius:12,textAlign:"center",fontSize:24,fontWeight:700,color:"#fff",
                      background:digit?"rgba(31,163,163,0.18)":"rgba(255,255,255,0.06)",
                      border:`2px solid ${digit?C.teal:"rgba(255,255,255,0.12)"}`,
                      outline:"none",fontFamily:"inherit",transition:"all 0.15s",cursor:"text" }}
                    onFocus={e=>e.target.style.borderColor=C.teal}
                    onBlur={e=>{ if(!e.target.value) e.target.style.borderColor="rgba(255,255,255,0.12)"; }}
                  />
                ))}
              </div>

              <button onClick={handleVerify} disabled={loading||otp.join("").length<6}
                style={{ width:"100%",padding:"13px",borderRadius:11,
                  background:otp.join("").length===6&&!loading?C.teal:"rgba(31,163,163,0.3)",
                  color:"#fff",fontWeight:700,fontSize:15,border:"none",
                  cursor:otp.join("").length===6&&!loading?"pointer":"not-allowed",
                  fontFamily:"inherit",marginBottom:16,transition:"all 0.15s" }}>
                {loading?"Verifying...":"Verify Email"}
              </button>

              <p style={{ color:"rgba(255,255,255,0.35)",fontSize:13 }}>
                {"Didn't receive it? "}
                {resendTimer>0
                  ? <span style={{ color:"rgba(255,255,255,0.3)" }}>Resend in {resendTimer}s</span>
                  : <span onClick={handleResend} style={{ color:C.teal,fontWeight:600,cursor:"pointer" }}>{resent?"Resend again":"Resend code"}</span>
                }
              </p>
              {resent&&resendTimer>0&&<p style={{ color:"rgba(31,163,163,0.7)",fontSize:12,marginTop:6 }}>New code sent.</p>}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── KYC UPLOAD PAGE ──────────────────────────────────────────────────────────
const KycUploadPage = ({ nav }) => {
  const [step, setStep] = useState(1);
  const [docType, setDocType] = useState("");
  const [front, setFront] = useState(false);
  const [back, setBack] = useState(false);
  const [selfie, setSelfie] = useState(false);
  const [linkedin, setLinkedin] = useState("");
  const [companyDoc, setCompanyDoc] = useState(false);
  const [loading, setLoading] = useState(false);

  const docTypes = [
    {id:"aadhaar",label:"Aadhaar Card",     sub:"Recommended for India residents", icon:I.shield},
    {id:"pan",    label:"PAN Card",          sub:"Permanent Account Number",        icon:I.dollar},
    {id:"passport",label:"Passport",         sub:"Indian or international passport",icon:I.eye},
    {id:"driving",label:"Driving Licence",   sub:"Valid state-issued licence",      icon:I.trending},
  ];

  const UploadBox = ({ label, done, onDone }) => (
    <div onClick={()=>{ if(!done){ const i=document.createElement("input");i.type="file";i.accept="image/*,.pdf";i.onchange=()=>onDone(true);i.click(); }}} style={{ padding:"18px 14px",borderRadius:12,border:`2px dashed ${done?C.teal:"rgba(255,255,255,0.14)"}`,
        background:done?"rgba(31,163,163,0.07)":"rgba(255,255,255,0.03)",
        textAlign:"center",cursor:done?"default":"pointer",transition:"all 0.18s" }}
      onMouseEnter={e=>{ if(!done) e.currentTarget.style.borderColor="rgba(31,163,163,0.45)"; }}
      onMouseLeave={e=>{ if(!done) e.currentTarget.style.borderColor="rgba(255,255,255,0.14)"; }}>
      <div style={{ width:38,height:38,borderRadius:19,margin:"0 auto 8px",
        background:done?"rgba(31,163,163,0.2)":"rgba(255,255,255,0.07)",
        display:"flex",alignItems:"center",justifyContent:"center" }}>
        <Icon d={done?I.check:I.upload} size={17} sw={2} style={{ color:done?C.teal:"rgba(255,255,255,0.35)" }}/>
      </div>
      <div style={{ fontSize:13,fontWeight:600,color:done?"#fff":"rgba(255,255,255,0.5)",marginBottom:3 }}>{done?"Uploaded":"Click to upload"}</div>
      <div style={{ fontSize:11,color:"rgba(255,255,255,0.28)" }}>{label}</div>
    </div>
  );

  const StepPill = ({ active }) => (
    <div style={{ display:"flex",gap:6,alignItems:"center" }}>
      {["Account","Verify Email","KYC","Done"].map((s,i)=>(
        <div key={s} style={{ display:"flex",alignItems:"center",gap:6 }}>
          <div style={{ padding:"3px 10px",borderRadius:99,fontSize:11,fontWeight:700,
            background:i===active?"rgba(31,163,163,0.25)":i<active?"rgba(31,163,163,0.12)":"rgba(255,255,255,0.06)",
            color:i===active?C.teal:i<active?"rgba(31,163,163,0.7)":"rgba(255,255,255,0.25)",
            border:`1px solid ${i===active?C.tealBd:i<active?"rgba(31,163,163,0.2)":"rgba(255,255,255,0.08)"}` }}>
            {i<active?"+ ":""}{s}
          </div>
          {i<3&&<div style={{ width:10,height:1,background:"rgba(255,255,255,0.1)" }}/>}
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ minHeight:"100vh",background:C.navy,display:"flex",flexDirection:"column" }}>
      <div style={{ padding:"16px 24px",borderBottom:"1px solid rgba(255,255,255,0.08)",display:"flex",alignItems:"center",gap:10 }}>
        <div style={{ width:28,height:28,borderRadius:8,background:C.teal,display:"flex",alignItems:"center",justifyContent:"center" }}>
          <Icon d={I.link} size={14} sw={2.5}/>
        </div>
        <span style={{ color:"#fff",fontWeight:800,fontSize:18,letterSpacing:"-0.02em" }}>Fund<span style={{ color:C.teal }}>Link</span></span>
        <div style={{ marginLeft:"auto" }}><StepPill active={2}/></div>
      </div>

      <div style={{ flex:1,overflowY:"auto",padding:"28px 20px 80px" }}>
        <div style={{ maxWidth:500,margin:"0 auto" }}>

          {step===3 ? (
            <div style={{ textAlign:"center",paddingTop:40 }}>
              <div style={{ width:80,height:80,borderRadius:40,background:"rgba(16,185,129,0.15)",border:"2px solid rgba(16,185,129,0.4)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 24px" }}>
                <Icon d={I.check} size={36} sw={2.5} style={{ color:C.green }}/>
              </div>
              <h2 style={{ color:"#fff",fontSize:24,fontWeight:800,marginBottom:10,letterSpacing:"-0.02em" }}>Documents Submitted!</h2>
              <p style={{ color:"rgba(255,255,255,0.45)",fontSize:14,lineHeight:1.7,marginBottom:8 }}>Our team will review your documents within 24-48 hours. You will receive an email once approved.</p>
              <p style={{ color:"rgba(255,255,255,0.3)",fontSize:13 }}>Redirecting to dashboard...</p>
              <div style={{ width:48,height:3,borderRadius:2,margin:"20px auto 0",background:C.teal }}/>
            </div>
          ) : step===1 ? (
            <>
              <div style={{ marginBottom:24 }}>
                <h2 style={{ color:"#fff",fontSize:22,fontWeight:800,marginBottom:6,letterSpacing:"-0.02em" }}>Identity Verification</h2>
                <p style={{ color:"rgba(255,255,255,0.4)",fontSize:14,lineHeight:1.6 }}>FundLink verifies all members to maintain a trusted network. Select a government-issued ID to proceed.</p>
              </div>
              <div style={{ padding:"12px 14px",borderRadius:11,background:"rgba(31,163,163,0.07)",border:`1px solid ${C.tealBd}`,marginBottom:22,display:"flex",gap:10 }}>
                <Icon d={I.shield} size={16} sw={2} style={{ color:C.teal,flexShrink:0,marginTop:2 }}/>
                <div style={{ fontSize:12,color:"rgba(255,255,255,0.5)",lineHeight:1.6 }}>Your documents are end-to-end encrypted and only used for identity verification. They are never shared with investors or third parties.</div>
              </div>
              <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
                {docTypes.map(d=>(
                  <div key={d.id} onClick={()=>{ setDocType(d.id); setStep(2); }}
                    style={{ padding:"16px 18px",borderRadius:13,cursor:"pointer",
                      background:"rgba(255,255,255,0.04)",border:"1.5px solid rgba(255,255,255,0.08)",
                      display:"flex",alignItems:"center",gap:14,transition:"all 0.15s" }}
                    onMouseEnter={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.08)"; e.currentTarget.style.borderColor="rgba(31,163,163,0.4)"; }}
                    onMouseLeave={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.08)"; }}>
                    <div style={{ width:42,height:42,borderRadius:11,background:"rgba(31,163,163,0.12)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                      <Icon d={d.icon} size={19} style={{ color:C.teal }}/>
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ color:"#fff",fontWeight:700,fontSize:14,marginBottom:2 }}>{d.label}</div>
                      <div style={{ color:"rgba(255,255,255,0.35)",fontSize:12 }}>{d.sub}</div>
                    </div>
                    <Icon d={I.chevR} size={16} style={{ color:"rgba(255,255,255,0.25)" }}/>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <button onClick={()=>setStep(1)} style={{ display:"flex",alignItems:"center",gap:6,background:"none",border:"none",color:"rgba(255,255,255,0.4)",fontSize:13,cursor:"pointer",padding:0,marginBottom:20,fontFamily:"inherit" }}>
                <Icon d={I.back} size={14}/> Back
              </button>
              <h2 style={{ color:"#fff",fontSize:20,fontWeight:800,marginBottom:4,letterSpacing:"-0.02em" }}>
                Upload {docTypes.find(d=>d.id===docType)?.label}
              </h2>
              <p style={{ color:"rgba(255,255,255,0.4)",fontSize:13,marginBottom:22 }}>Upload clear, well-lit photos. All four corners of the document must be visible.</p>

              <div style={{ marginBottom:18 }}>
                <div style={{ fontSize:12,fontWeight:700,color:"rgba(255,255,255,0.45)",letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:10 }}>Document Photos</div>
                <div style={{ display:"grid",gridTemplateColumns:docType==="pan"?"1fr":"1fr 1fr",gap:12 }}>
                  <UploadBox label="Front side" done={front} onDone={setFront}/>
                  {docType!=="pan"&&<UploadBox label="Back side" done={back} onDone={setBack}/>}
                </div>
              </div>

              <div style={{ marginBottom:18 }}>
                <div style={{ fontSize:12,fontWeight:700,color:"rgba(255,255,255,0.45)",letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:10 }}>Selfie with Document</div>
                <UploadBox label="Hold your ID next to your face" done={selfie} onDone={setSelfie}/>
              </div>

              <div style={{ marginBottom:18 }}>
                <div style={{ fontSize:12,fontWeight:700,color:"rgba(255,255,255,0.45)",letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:8 }}>LinkedIn Profile <span style={{ fontWeight:400,color:"rgba(255,255,255,0.2)" }}>(Optional)</span></div>
                <input value={linkedin} onChange={e=>setLinkedin(e.target.value)} placeholder="linkedin.com/in/yourprofile"
                  style={{ width:"100%",padding:"11px 14px",borderRadius:10,border:"1.5px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.06)",color:"#fff",fontSize:14,outline:"none",boxSizing:"border-box",fontFamily:"inherit" }}
                  onFocus={e=>e.target.style.borderColor=C.teal} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.12)"}/>
              </div>

              <div style={{ marginBottom:24 }}>
                <div style={{ fontSize:12,fontWeight:700,color:"rgba(255,255,255,0.45)",letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:8 }}>Company Registration <span style={{ fontWeight:400,color:"rgba(255,255,255,0.2)" }}>(Optional)</span></div>
                <UploadBox label="Incorporation cert or GST certificate (PDF/image)" done={companyDoc} onDone={setCompanyDoc}/>
              </div>

              <div style={{ padding:"12px 14px",borderRadius:11,background:"rgba(245,158,11,0.07)",border:"1px solid rgba(245,158,11,0.2)",marginBottom:24,display:"flex",gap:10 }}>
                <Icon d={I.zap} size={14} sw={2} style={{ color:C.amber,flexShrink:0,marginTop:2 }}/>
                <div style={{ fontSize:12,color:"rgba(255,255,255,0.45)",lineHeight:1.6 }}>
                  <strong style={{ color:"rgba(255,255,255,0.65)" }}>Tips:</strong> Use good lighting, avoid glare, ensure all text is readable. JPG or PNG under 10MB.
                </div>
              </div>

              <button onClick={()=>{ setLoading(true); setTimeout(()=>{ setLoading(false); setStep(3); setTimeout(()=>nav("verifyPending"),1800); },1600); }}
                disabled={!front||!selfie||loading}
                style={{ width:"100%",padding:"14px",borderRadius:11,
                  background:front&&selfie&&!loading?C.teal:"rgba(31,163,163,0.3)",
                  color:"#fff",fontWeight:700,fontSize:15,border:"none",
                  cursor:front&&selfie&&!loading?"pointer":"not-allowed",fontFamily:"inherit",transition:"all 0.15s" }}>
                {loading?"Uploading...":"Submit for Verification"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── VERIFY PENDING PAGE ───────────────────────────────────────────────────────
const VerifyPendingPage = ({ nav }) => {
  const [showTips, setShowTips] = useState(false);
  const [eta] = useState("~18 hours");

  const checks = [
    {label:"Email address",       done:true,  amber:false, time:"Mar 7, 10:02 AM"},
    {label:"Identity document",   done:true,  amber:false, time:"Mar 7, 10:05 AM"},
    {label:"Selfie verification", done:true,  amber:false, time:"Mar 7, 10:05 AM"},
    {label:"Manual review",       done:false, amber:true,  time:"In progress"},
    {label:"Profile activation",  done:false, amber:false, time:"Pending"},
  ];

  return (
    <div style={{ minHeight:"100vh",background:C.navy,display:"flex",flexDirection:"column" }}>
      {/* Nav */}
      <div style={{ padding:"16px 24px",borderBottom:"1px solid rgba(255,255,255,0.08)",display:"flex",alignItems:"center",gap:10 }}>
        <div style={{ width:28,height:28,borderRadius:8,background:C.teal,display:"flex",alignItems:"center",justifyContent:"center" }}>
          <Icon d={I.link} size={14} sw={2.5}/>
        </div>
        <span style={{ color:"#fff",fontWeight:800,fontSize:18,letterSpacing:"-0.02em" }}>Fund<span style={{ color:C.teal }}>Link</span></span>
      </div>

      <div style={{ flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:24 }}>
        <div style={{ maxWidth:480,width:"100%",textAlign:"center" }}>

          {/* Animated spinner */}
          <div style={{ position:"relative",width:96,height:96,margin:"0 auto 28px" }}>
            <div style={{ position:"absolute",inset:0,borderRadius:48,border:"3px solid rgba(31,163,163,0.12)" }}/>
            <div style={{ position:"absolute",inset:0,borderRadius:48,border:"3px solid transparent",borderTopColor:C.teal,animation:"spin 1.4s linear infinite" }}/>
            <div style={{ position:"absolute",inset:12,borderRadius:36,background:"rgba(31,163,163,0.1)",display:"flex",alignItems:"center",justifyContent:"center" }}>
              <Icon d={I.shield} size={30} sw={1.5} style={{ color:C.teal }}/>
            </div>
          </div>

          <h2 style={{ color:"#fff",fontSize:24,fontWeight:800,marginBottom:8,letterSpacing:"-0.02em" }}>Verification in Progress</h2>

          {/* ETA pill */}
          <div style={{ display:"inline-flex",alignItems:"center",gap:7,padding:"7px 16px",borderRadius:99,background:"rgba(245,158,11,0.1)",border:"1px solid rgba(245,158,11,0.25)",marginBottom:16 }}>
            <span style={{ fontSize:14 }}>⏱</span>
            <span style={{ fontSize:13,color:C.amber,fontWeight:600 }}>Estimated wait: {eta}</span>
          </div>

          <p style={{ color:"rgba(255,255,255,0.4)",fontSize:14,lineHeight:1.7,marginBottom:24,maxWidth:360,margin:"0 auto 24px" }}>
            Our team is reviewing your identity documents. You will receive an email at <strong style={{ color:"rgba(255,255,255,0.65)" }}>priya@greentech.in</strong> once approved.
          </p>

          {/* Status checklist */}
          <div style={{ background:"rgba(255,255,255,0.03)",borderRadius:16,border:"1px solid rgba(255,255,255,0.08)",padding:20,marginBottom:16,textAlign:"left" }}>
            <div style={{ fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.3)",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:16 }}>Verification Steps</div>
            <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
              {checks.map((c,i)=>(
                <div key={i} style={{ display:"flex",alignItems:"center",gap:12 }}>
                  <div style={{ width:28,height:28,borderRadius:14,flexShrink:0,
                    background:c.done?"rgba(16,185,129,0.15)":c.amber?"rgba(245,158,11,0.12)":"rgba(255,255,255,0.05)",
                    border:`1.5px solid ${c.done?"rgba(16,185,129,0.4)":c.amber?"rgba(245,158,11,0.3)":"rgba(255,255,255,0.08)"}`,
                    display:"flex",alignItems:"center",justifyContent:"center" }}>
                    {c.done
                      ? <Icon d={I.check} size={13} sw={2.5} style={{ color:C.green }}/>
                      : c.amber
                        ? <div style={{ width:8,height:8,borderRadius:4,background:C.amber }}/>
                        : <div style={{ width:8,height:8,borderRadius:4,background:"rgba(255,255,255,0.15)" }}/>
                    }
                  </div>
                  <span style={{ fontSize:14,fontWeight:500,flex:1,color:c.done?"rgba(255,255,255,0.8)":c.amber?"rgba(245,158,11,0.9)":"rgba(255,255,255,0.25)" }}>{c.label}</span>
                  <span style={{ fontSize:11,color:c.done?"rgba(16,185,129,0.6)":c.amber?C.amber:"rgba(255,255,255,0.2)" }}>{c.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* While you wait tips */}
          <div style={{ background:"rgba(255,255,255,0.03)",borderRadius:14,border:"1px solid rgba(255,255,255,0.07)",overflow:"hidden",marginBottom:20 }}>
            <div onClick={()=>setShowTips(p=>!p)} style={{ padding:"14px 18px",display:"flex",alignItems:"center",justifyContent:"space-between",cursor:"pointer" }}>
              <span style={{ color:"rgba(255,255,255,0.55)",fontSize:13,fontWeight:600 }}>💡 While you wait…</span>
              <Icon d={I.chevR} size={14} sw={2} style={{ color:"rgba(255,255,255,0.3)",transform:showTips?"rotate(270deg)":"rotate(90deg)",transition:"transform 0.2s" }}/>
            </div>
            {showTips && (
              <div style={{ padding:"0 18px 16px",borderTop:"1px solid rgba(255,255,255,0.06)" }}>
                {[
                  {icon:"✏️", text:"Complete your startup profile so investors see it the moment you're approved"},
                  {icon:"📄", text:"Upload your pitch deck to the Data Room — it'll be ready to share instantly"},
                  {icon:"📅", text:"Browse upcoming events and shortlist ones you want to attend"},
                  {icon:"🔔", text:"Turn on email notifications so you don't miss your approval"},
                ].map((t,i)=>(
                  <div key={i} style={{ display:"flex",gap:10,padding:"9px 0",borderBottom:i<3?"1px solid rgba(255,255,255,0.05)":"none" }}>
                    <span style={{ fontSize:16,flexShrink:0 }}>{t.icon}</span>
                    <span style={{ fontSize:13,color:"rgba(255,255,255,0.4)",lineHeight:1.6 }}>{t.text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* CTAs */}
          <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
            <button onClick={()=>nav("founder")}
              style={{ width:"100%",padding:"13px",borderRadius:11,background:C.teal,color:"#fff",fontWeight:700,fontSize:15,border:"none",cursor:"pointer",fontFamily:"inherit",transition:"all 0.15s" }}
              onMouseEnter={e=>e.currentTarget.style.background=C.tealLt}
              onMouseLeave={e=>e.currentTarget.style.background=C.teal}>
              Continue to Dashboard →
            </button>
            <button onClick={()=>nav("landing")}
              style={{ width:"100%",padding:"11px",borderRadius:11,background:"transparent",color:"rgba(255,255,255,0.35)",fontWeight:600,fontSize:14,border:"1px solid rgba(255,255,255,0.08)",cursor:"pointer",fontFamily:"inherit" }}>
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PricingPage = ({ nav }) => {
  const [billing, setBilling] = useState("annual"); // monthly | annual

  const plans = [
    {
      name:"Starter", price:{ monthly:0, annual:0 }, badge:null,
      desc:"Perfect for early-stage founders just getting started.",
      color:C.teal, cta:"Join Free",
      features:["Verified startup profile","Access public events","Basic search visibility","5 intro requests/month","Community access"],
    },
    {
      name:"Pro", price:{ monthly:2999, annual:1999 }, badge:"Most Popular",
      desc:"For serious founders actively raising their seed round.",
      color:"#6366F1", cta:"Start Pro",
      features:["Everything in Starter","Priority profile placement","Unlimited intro requests","Pitch deck hosting (5GB)","Investor match score","Event application priority","Analytics dashboard"],
    },
    {
      name:"Growth", price:{ monthly:7999, annual:5499 }, badge:null,
      desc:"For scaling startups targeting Series A and beyond.",
      color:C.amber, cta:"Start Growth",
      features:["Everything in Pro","Featured listing on homepage","Deal room access","Due diligence prep kit","1-on-1 onboarding call","Priority support","Custom intro templates","API access"],
    },
  ];

  const investorPlans = [
    { name:"Explorer", price:{ monthly:0, annual:0 }, desc:"Browse and save startups. Limited intros.", features:["Browse all verified startups","Save up to 10 startups","3 intro requests/month","Event attendance"] },
    { name:"Active", price:{ monthly:4999, annual:3499 }, badge:"Most Popular", desc:"For active investors building deal flow.", features:["Everything in Explorer","Unlimited saves & intros","Advanced filters","Portfolio tracker","Deal alerts","Early access to new listings","Priority event registration"] },
  ];

  const PlanCard = ({ p, isHighlight }) => (
    <Card style={{ padding:28, flex:1, minWidth:240, position:"relative", border:`1.5px solid ${isHighlight?p.color+"55":C.border}` }}>
      {p.badge && (
        <div style={{ position:"absolute", top:-12, left:"50%", transform:"translateX(-50%)",
          padding:"3px 12px", borderRadius:999, background:p.color, color:"#fff", fontSize:11, fontWeight:700, whiteSpace:"nowrap" }}>
          {p.badge}
        </div>
      )}
      <div style={{ fontSize:13, fontWeight:700, color:p.color, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:8 }}>{p.name}</div>
      <div style={{ marginBottom:6 }}>
        {p.price[billing]===0
          ? <span style={{ fontSize:32, fontWeight:800, color:C.text, letterSpacing:"-0.02em" }}>Free</span>
          : <>
              <span style={{ fontSize:32, fontWeight:800, color:C.text, letterSpacing:"-0.02em" }}>₹{p.price[billing].toLocaleString()}</span>
              <span style={{ fontSize:14, color:C.muted }}>/mo</span>
            </>
        }
      </div>
      {billing==="annual" && p.price.annual>0 && (
        <div style={{ fontSize:12, color:C.green, fontWeight:600, marginBottom:8 }}>
          Save ₹{((p.price.monthly - p.price.annual)*12).toLocaleString()}/yr
        </div>
      )}
      <p style={{ fontSize:13, color:C.muted, lineHeight:1.6, marginBottom:20 }}>{p.desc}</p>
      <Btn v={isHighlight?"primary":"secondary"} full onClick={()=>nav("signup")}>{p.cta||"Get Started"}</Btn>
      <div style={{ borderTop:`1px solid ${C.border}`, marginTop:20, paddingTop:16 }}>
        {p.features.map(f=>(
          <div key={f} style={{ display:"flex", alignItems:"center", gap:9, marginBottom:9 }}>
            <Icon d={I.check} size={14} sw={2.5} style={{ color:p.color, flexShrink:0 }}/>
            <span style={{ fontSize:13, color:C.text }}>{f}</span>
          </div>
        ))}
      </div>
    </Card>
  );

  return (
    <div style={{ minHeight:"100vh", background:C.offWhite }}>
      {/* Navbar */}
      <nav style={{ background:C.navy, padding:"0 24px", height:60, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <span onClick={()=>nav("landing")} style={{ color:"#fff",fontWeight:800,fontSize:18,letterSpacing:"-0.02em",cursor:"pointer" }}>
          Fund<span style={{ color:C.teal }}>Link</span>
        </span>
        <div style={{ display:"flex", gap:8 }}>
          <Btn v="ghost" sz="sm" onClick={()=>nav("login")}>Login</Btn>
          <Btn v="primary" sz="sm" onClick={()=>nav("signup")}>Get Started</Btn>
        </div>
      </nav>

      <div style={{ padding:"60px 20px", maxWidth:1060, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:48 }}>
          <Badge>Pricing</Badge>
          <h1 style={{ fontSize:"clamp(1.8rem,5vw,2.8rem)", fontWeight:800, color:C.text, marginTop:14, marginBottom:12, letterSpacing:"-0.03em" }}>Simple, transparent pricing</h1>
          <p style={{ fontSize:16, color:C.muted, maxWidth:480, margin:"0 auto 28px" }}>Start free. Upgrade when you're ready to raise.</p>

          {/* Billing toggle */}
          <div style={{ display:"inline-flex", background:"#fff", border:`1px solid ${C.border}`, borderRadius:12, padding:4, gap:4 }}>
            {["monthly","annual"].map(b=>(
              <button key={b} onClick={()=>setBilling(b)}
                style={{ padding:"7px 18px", borderRadius:9, border:"none", cursor:"pointer", fontSize:13, fontWeight:600,
                  background:billing===b?C.teal:"transparent", color:billing===b?"#fff":C.muted, transition:"all 0.15s", fontFamily:"inherit" }}>
                {b==="monthly"?"Monthly":"Annual"} {b==="annual"&&<span style={{ fontSize:11, color:billing==="annual"?"rgba(255,255,255,0.8)":C.green }}>-33%</span>}
              </button>
            ))}
          </div>
        </div>

        {/* For Founders */}
        <div style={{ marginBottom:52 }}>
          <h2 style={{ fontSize:18, fontWeight:700, color:C.text, marginBottom:20 }}>For Founders</h2>
          <div style={{ display:"flex", gap:18, flexWrap:"wrap" }}>
            {plans.map((p,i)=><PlanCard key={p.name} p={p} isHighlight={i===1}/>)}
          </div>
        </div>

        {/* For Investors */}
        <div style={{ marginBottom:52 }}>
          <h2 style={{ fontSize:18, fontWeight:700, color:C.text, marginBottom:20 }}>For Investors</h2>
          <div style={{ display:"flex", gap:18, flexWrap:"wrap", maxWidth:680 }}>
            {investorPlans.map((p,i)=><PlanCard key={p.name} p={{...p,color:i===1?"#6366F1":C.teal,cta:"Get Started"}} isHighlight={i===1}/>)}
          </div>
        </div>

        {/* Feature Comparison Table */}
        <div style={{ marginBottom:52 }}>
          <h2 style={{ fontSize:20,fontWeight:800,color:C.text,marginBottom:8,letterSpacing:"-0.02em" }}>Compare Features</h2>
          <p style={{ fontSize:14,color:C.muted,marginBottom:24 }}>See everything that's included in each founder plan.</p>
          <div style={{ overflowX:"auto",borderRadius:16,border:`1px solid ${C.border}` }}>
            <table style={{ width:"100%",borderCollapse:"collapse",fontSize:13,background:C.card }}>
              <thead>
                <tr style={{ borderBottom:`2px solid ${C.border}` }}>
                  <th style={{ padding:"14px 16px",textAlign:"left",color:C.muted,fontWeight:600,width:"40%" }}>Feature</th>
                  {["Starter","Pro","Growth"].map(n=>(
                    <th key={n} style={{ padding:"14px 12px",textAlign:"center",color:n==="Pro"?"#6366F1":C.text,fontWeight:700 }}>{n}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Startup profile",           true,  true,  true ],
                  ["Public event access",        true,  true,  true ],
                  ["Intro requests (monthly)",   "5",   "Unlimited","Unlimited"],
                  ["Profile boost",              false, true,  true ],
                  ["Pitch deck hosting",         false, true,  true ],
                  ["Investor analytics",         false, true,  true ],
                  ["Featured homepage listing",  false, false, true ],
                  ["Deal room access",           false, false, true ],
                  ["Due diligence portal",       false, false, true ],
                  ["Dedicated account manager",  false, false, true ],
                ].map(([feat,...vals],ri)=>(
                  <tr key={ri} style={{ borderBottom:ri<9?`1px solid ${C.slateXL}`:"none",
                    background:ri%2===0?"transparent":"rgba(248,250,252,0.6)" }}>
                    <td style={{ padding:"12px 16px",color:C.text,fontWeight:500 }}>{feat}</td>
                    {vals.map((v,ci)=>(
                      <td key={ci} style={{ padding:"12px 12px",textAlign:"center" }}>
                        {typeof v === "boolean"
                          ? v
                            ? <span style={{ color:C.green,fontWeight:700,fontSize:16 }}>+</span>
                            : <span style={{ color:C.slateL,fontSize:16 }}>-</span>
                          : <span style={{ fontSize:12,fontWeight:600,color:ci===1?"#6366F1":C.text }}>{v}</span>
                        }
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h2 style={{ fontSize:20, fontWeight:800, color:C.text, marginBottom:24, letterSpacing:"-0.02em" }}>Frequently asked questions</h2>
          <div style={{ display:"flex", flexDirection:"column", gap:12, maxWidth:700 }}>
            {[
              ["How does the verification process work?", "Our team manually reviews each profile within 48 hours. We verify company registration, founder identity, and basic traction claims before granting the Verified badge."],
              ["Can I switch plans anytime?", "Yes. Upgrades take effect immediately. Downgrades take effect at the next billing cycle. No lock-in contracts."],
              ["What happens to my data if I cancel?", "You can export all your data before cancellation. We retain it for 90 days post-cancellation before permanent deletion."],
              ["Is there a free trial for paid plans?", "Yes, all paid plans come with a 14-day free trial. No credit card required to start."],
              ["Do ecosystem partners have a different pricing structure?", "Yes. Partners are priced based on event volume. Contact us at partners@fundlink.in for custom pricing."],
            ].map(([q,a],i)=>(
              <FaqItem key={i} q={q} a={a}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const FaqItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <Card style={{ overflow:"hidden" }}>
      <div onClick={()=>setOpen(p=>!p)}
        style={{ padding:"16px 20px", display:"flex", justifyContent:"space-between", alignItems:"center", cursor:"pointer", transition:"background 0.15s" }}
        onMouseEnter={e=>e.currentTarget.style.background=C.offWhite}
        onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
        <span style={{ fontWeight:600, fontSize:15, color:C.text, flex:1, paddingRight:16 }}>{q}</span>
        <div style={{ transform:open?"rotate(180deg)":"rotate(0deg)", transition:"transform 0.2s", color:C.muted, flexShrink:0 }}>
          <Icon d={["M6 9l6 6 6-6"]} size={18}/>
        </div>
      </div>
      {open && (
        <div style={{ padding:"0 20px 16px", fontSize:14, color:C.muted, lineHeight:1.7, borderTop:`1px solid ${C.border}`, paddingTop:14 }}>
          {a}
        </div>
      )}
    </Card>
  );
};

// ─── INVESTOR PORTFOLIO PAGE ──────────────────────────────────────────────────
const PortfolioPage = ({ nav }) => {
  const [sidebar,     setSidebar]     = useState(false);
  const [page,        setPage]        = useState("portfolio");
  const [expandedCo,  setExpandedCo]  = useState(null);
  const [updateModal, setUpdateModal] = useState(null);
  const [addModal,    setAddModal]    = useState(false);
  const [addSaved,    setAddSaved]    = useState(false);
  const [sortBy,      setSortBy]      = useState("growth");
  const [filterStage, setFilterStage] = useState("all");
  const [loading,     setLoading]     = useState(true);
  const toast = useToast();

  useEffect(()=>{ const t=setTimeout(()=>setLoading(false),900); return ()=>clearTimeout(t); },[]);

  const navItems = [
    {id:"home",      icon:"home",     label:"Dashboard",       short:"Home"},
    {id:"browse",    icon:"search",   label:"Browse Startups", short:"Browse"},
    {id:"saved",     icon:"bookmark", label:"Saved",           short:"Saved"},
    {id:"portfolio", icon:"bar",      label:"Portfolio",       short:"Portfolio"},
    {id:"gear",      icon:"gear",     label:"Settings",        short:"Settings"},
  ];

  const [companies, setCompanies] = useState([
    {name:"DataVault",  sector:"Data Mgmt",     stage:"Series A",  date:"Jan 2025", invested:"₹42L",   equity:"5%",  val:"₹8.3Cr",  currVal:"₹60L",    growth:45,  mrr:"₹34L",  runway:"18 mo", team:12, nextRound:"Series B – Q3 2026"},
    {name:"CloudScale", sector:"Infrastructure",stage:"Series B",  date:"Oct 2024", invested:"₹62L",   equity:"3%",  val:"₹20.8Cr", currVal:"₹1.37Cr", growth:120, mrr:"₹1.1Cr",runway:"24 mo", team:41, nextRound:"Series C – Q1 2027"},
    {name:"SecureID",   sector:"Security",      stage:"Seed",      date:"Jun 2024", invested:"₹25L",   equity:"8%",  val:"₹2.9Cr",  currVal:"₹46L",    growth:85,  mrr:"₹12L",  runway:"14 mo", team:8,  nextRound:"Series A – Q4 2026"},
    {name:"HealthSync", sector:"Healthcare",    stage:"Series A",  date:"Mar 2024", invested:"₹33L",   equity:"4%",  val:"₹6.6Cr",  currVal:"₹26L",    growth:-20, mrr:"₹19L",  runway:"9 mo",  team:15, nextRound:"Bridge round needed"},
    {name:"FinFlow",    sector:"FinTech",       stage:"Pre-Seed",  date:"Dec 2023", invested:"₹8.3L",  equity:"2%",  val:"₹3.3Cr",  currVal:"₹16.6L",  growth:100, mrr:"₹5.4L", runway:"12 mo", team:4,  nextRound:"Seed – Q2 2026"},
    {name:"EduHub",     sector:"EdTech",        stage:"Series A",  date:"Sep 2023", invested:"₹20.8L", equity:"3%",  val:"₹5Cr",    currVal:"₹25L",    growth:20,  mrr:"₹22L",  runway:"20 mo", team:19, nextRound:"Series B – Q2 2027"},
  ]);

  const stageOptions = ["all","Pre-Seed","Seed","Series A","Series B"];
  const filtered = companies
    .filter(c => filterStage==="all" || c.stage===filterStage)
    .sort((a,b) => {
      if(sortBy==="growth") return b.growth - a.growth;
      if(sortBy==="invested") return parseFloat(b.invested) - parseFloat(a.invested);
      if(sortBy==="alpha") return a.name.localeCompare(b.name);
      return 0;
    });

  const totalInvested = "₹1.91 Cr";
  const currentValue  = "₹2.70 Cr";
  const gain          = "+₹79L";
  const roi           = "+41.4%";

  // Sector breakdown for mini donut-style bars
  const sectors = [...new Set(companies.map(c=>c.sector))].map(s=>({
    label:s, count:companies.filter(c=>c.sector===s).length
  }));
  const sectorColors = ["#1FA3A3","#6366F1","#F59E0B","#10B981","#EF4444","#94A3B8"];

  // Portfolio value sparkline data (mock monthly)
  const sparkPoints = [148,162,171,185,198,212,241,270];
  const sparkMax = Math.max(...sparkPoints);
  const sparkMin = Math.min(...sparkPoints);

  return (
    <div style={{ background:C.offWhite, minHeight:"100vh" }}>
      <Sidebar nav={navItems} active={page} onSelect={p=>{ if(p!=="portfolio") nav("investor"); else setPage(p); }} role="Investor" open={sidebar} onClose={()=>setSidebar(false)} onSignOut={()=>nav("landing")}/>
      <div style={{ paddingBottom:62 }}>
        <TopBar title="Portfolio" onMenu={()=>setSidebar(true)} nav={nav}/>
        <div style={{ padding:20, maxWidth:820, margin:"0 auto" }}>

          {loading ? (
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))", gap:12 }}>
                {[1,2,3,4].map(i=><SkeletonCard key={i} rows={2}/>)}
              </div>
              {[1,2,3].map(i=><SkeletonCard key={i} rows={3} hasAvatar/>)}
            </div>
          ) : (
            <>
              {/* Header */}
              <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:20, flexWrap:"wrap", gap:12 }}>
                <div>
                  <h1 style={{ fontSize:22, fontWeight:800, color:C.text, marginBottom:4, letterSpacing:"-0.02em" }}>Investment Portfolio</h1>
                  <p style={{ color:C.muted, fontSize:14 }}>{companies.length} companies · last updated today</p>
                </div>
                <Btn v="primary" sz="sm" icon="upload" onClick={()=>setAddModal(true)}>Add Investment</Btn>
              </div>

              {/* KPI row */}
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))", gap:12, marginBottom:20 }}>
                {[
                  ["Total Invested", totalInvested, C.text,  "💼"],
                  ["Current Value",  currentValue,  C.teal,  "📈"],
                  ["Unrealized Gain",gain,           C.green, "💰"],
                  ["Portfolio ROI",  roi,            C.green, "🎯"],
                ].map(([l,v,c,icon])=>(
                  <Card key={l} style={{ padding:"14px 16px" }}>
                    <div style={{ fontSize:16, marginBottom:6 }}>{icon}</div>
                    <div style={{ fontSize:11, color:C.muted, marginBottom:4, fontWeight:600 }}>{l}</div>
                    <div style={{ fontSize:20, fontWeight:800, color:c, letterSpacing:"-0.02em" }}>{v}</div>
                  </Card>
                ))}
              </div>

              {/* Portfolio value chart + sector breakdown side by side */}
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:14, marginBottom:20 }}>
                <Card style={{ padding:20 }}>
                  <div style={{ fontWeight:700, fontSize:14, color:C.text, marginBottom:4 }}>Portfolio Value</div>
                  <div style={{ fontSize:11, color:C.muted, marginBottom:14 }}>8-month trend (₹ Lakhs)</div>
                  <svg width="100%" height="80" viewBox="0 0 280 80" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="portGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={C.teal} stopOpacity="0.3"/>
                        <stop offset="100%" stopColor={C.teal} stopOpacity="0.02"/>
                      </linearGradient>
                    </defs>
                    {(()=>{
                      const range = sparkMax - sparkMin || 1;
                      const pts = sparkPoints.map((v,i)=>[
                        i * (280/7),
                        80 - ((v - sparkMin)/range) * 68 - 6
                      ]);
                      const path = pts.map(([x,y],i)=>i===0?`M${x},${y}`:`C${x-18},${pts[i-1][1]} ${x-18},${y} ${x},${y}`).join(" ");
                      const area = path + ` L${pts[pts.length-1][0]},80 L0,80 Z`;
                      return (
                        <>
                          <path d={area} fill="url(#portGrad)"/>
                          <path d={path} fill="none" stroke={C.teal} strokeWidth="2.5" strokeLinecap="round"/>
                          {pts.map(([x,y],i)=>(
                            <circle key={i} cx={x} cy={y} r="3.5" fill={C.teal} stroke="#fff" strokeWidth="1.5"/>
                          ))}
                        </>
                      );
                    })()}
                  </svg>
                  <div style={{ display:"flex", justifyContent:"space-between", marginTop:6 }}>
                    {["Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar"].map(m=>(
                      <span key={m} style={{ fontSize:9, color:C.muted }}>{m}</span>
                    ))}
                  </div>
                </Card>

                <Card style={{ padding:20 }}>
                  <div style={{ fontWeight:700, fontSize:14, color:C.text, marginBottom:14 }}>Sector Breakdown</div>
                  {sectors.map((s,i)=>(
                    <div key={s.label} style={{ marginBottom:10 }}>
                      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                        <span style={{ fontSize:12, color:C.text }}>{s.label}</span>
                        <span style={{ fontSize:12, fontWeight:700, color:sectorColors[i]||C.teal }}>{s.count} co.</span>
                      </div>
                      <div style={{ height:5, borderRadius:999, background:C.slateXL }}>
                        <div style={{ width:`${(s.count/companies.length)*100}%`, height:"100%", borderRadius:999, background:sectorColors[i]||C.teal }}/>
                      </div>
                    </div>
                  ))}
                </Card>
              </div>

              {/* Sort / filter bar */}
              <div style={{ display:"flex", gap:8, marginBottom:14, flexWrap:"wrap", alignItems:"center" }}>
                <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
                  {stageOptions.map(s=>(
                    <button key={s} onClick={()=>setFilterStage(s)}
                      style={{ padding:"5px 12px", borderRadius:99, border:`1.5px solid ${filterStage===s?C.teal:C.border}`,
                        background:filterStage===s?C.tealDim:"#fff", color:filterStage===s?C.teal:C.muted,
                        fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"inherit", whiteSpace:"nowrap",
                        transition:"all 0.15s" }}>
                      {s==="all"?"All Stages":s}
                    </button>
                  ))}
                </div>
                <div style={{ marginLeft:"auto" }}>
                  <select value={sortBy} onChange={e=>setSortBy(e.target.value)}
                    style={{ padding:"6px 10px", borderRadius:9, border:`1px solid ${C.border}`, fontSize:12,
                      fontFamily:"inherit", color:C.text, background:"#fff", cursor:"pointer", outline:"none" }}>
                    <option value="growth">Best Growth</option>
                    <option value="invested">Largest Investment</option>
                    <option value="alpha">A → Z</option>
                  </select>
                </div>
              </div>

              {/* Company cards */}
              {filtered.length === 0 ? (
                <EmptyState icon="📊" title={`No ${filterStage} companies`} body="Try a different stage filter." cta="Clear Filter" onCta={()=>setFilterStage("all")} compact/>
              ) : (
                <div style={{ display:"flex", flexDirection:"column", gap:12, paddingBottom:80 }}>
                  {filtered.map((co,i)=>{
                    const isExp = expandedCo === co.name;
                    const isDown = co.growth < 0;
                    return (
                      <Card key={i} style={{ padding:18, cursor:"pointer", transition:"box-shadow 0.15s",
                        boxShadow:isExp?"0 4px 20px rgba(0,0,0,0.08)":"none" }}
                        onClick={()=>setExpandedCo(isExp?null:co.name)}>
                        {/* Top row */}
                        <div style={{ display:"flex", alignItems:"flex-start", gap:12, marginBottom:12 }}>
                          <Avatar name={co.name} size={44}/>
                          <div style={{ flex:1, minWidth:0 }}>
                            <div style={{ fontWeight:700, fontSize:15, color:C.text, marginBottom:2 }}>{co.name}</div>
                            <div style={{ fontSize:12, color:C.muted, marginBottom:6 }}>{co.sector}</div>
                            <Badge v={co.stage.includes("Series B")?"indigo":co.stage.includes("Series A")?"teal":co.stage==="Seed"?"green":"amber"}>{co.stage}</Badge>
                          </div>
                          <div style={{ textAlign:"right", flexShrink:0 }}>
                            <div style={{ fontSize:20, fontWeight:800, color:isDown?C.red:C.green, letterSpacing:"-0.02em" }}>
                              {co.growth > 0 ? "+" : ""}{co.growth}%
                            </div>
                            <div style={{ fontSize:11, color:C.muted, marginTop:2 }}>return</div>
                          </div>
                        </div>

                        {/* Metrics strip */}
                        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, marginBottom:isExp?14:0 }}>
                          {[["Invested",co.invested],["Equity",co.equity],["Valuation",co.val]].map(([l,v])=>(
                            <div key={l} style={{ padding:"8px 10px", borderRadius:9, background:C.offWhite, textAlign:"center" }}>
                              <div style={{ fontSize:10, color:C.muted, marginBottom:2, textTransform:"uppercase", letterSpacing:"0.04em" }}>{l}</div>
                              <div style={{ fontSize:13, fontWeight:700, color:C.text }}>{v}</div>
                            </div>
                          ))}
                        </div>

                        {/* Expanded detail */}
                        {isExp && (
                          <div style={{ borderTop:`1px solid ${C.border}`, paddingTop:14 }}
                            onClick={e=>e.stopPropagation()}>
                            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:14 }}>
                              {[["MRR",co.mrr],["Runway",co.runway],["Team",`${co.team} FTEs`],["Next Round",co.nextRound]].map(([k,v])=>(
                                <div key={k} style={{ padding:"9px 12px", borderRadius:9, background:C.offWhite,
                                  gridColumn: k==="Next Round"?"1 / -1":undefined }}>
                                  <div style={{ fontSize:10, color:C.muted, marginBottom:2, textTransform:"uppercase", letterSpacing:"0.04em", fontWeight:700 }}>{k}</div>
                                  <div style={{ fontSize:13, fontWeight:600, color:C.text }}>{v}</div>
                                </div>
                              ))}
                            </div>
                            {/* Health indicator */}
                            <div style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 12px", borderRadius:9,
                              background: co.growth<0 ? "rgba(239,68,68,0.06)" : co.growth>80 ? "rgba(16,185,129,0.06)" : "rgba(31,163,163,0.06)",
                              border:`1px solid ${co.growth<0?"rgba(239,68,68,0.2)":co.growth>80?"rgba(16,185,129,0.2)":"rgba(31,163,163,0.2)"}`,
                              marginBottom:14 }}>
                              <span style={{ fontSize:14 }}>{co.growth<0?"⚠️":co.growth>80?"🚀":"✅"}</span>
                              <span style={{ fontSize:12, color:C.text, fontWeight:500 }}>
                                {co.growth<0?"Needs attention — consider requesting an update.":co.growth>80?"Outperformer — top quartile return.":"On track — healthy growth trajectory."}
                              </span>
                            </div>
                            <div style={{ display:"flex", gap:10 }}>
                              <Btn v="secondary" sz="sm" full onClick={()=>setUpdateModal(co)}>Request Update</Btn>
                              <Btn v="primary" sz="sm" full onClick={()=>{ setUpdateModal(co); }}>Contact Founder</Btn>
                            </div>
                          </div>
                        )}
                      </Card>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <BottomNav nav={navItems} active={page} onSelect={p=>{ if(p!=="portfolio") nav("investor"); else setPage(p); }}/>

      {/* Contact / Request Update Modal */}
      <Modal open={!!updateModal} onClose={()=>setUpdateModal(null)}
        title={updateModal ? "Contact " + updateModal.name : ""}>
        {updateModal && (
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            <div style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 14px", borderRadius:11, background:C.offWhite }}>
              <Avatar name={updateModal.name} size={40}/>
              <div>
                <div style={{ fontWeight:700, fontSize:14, color:C.text }}>{updateModal.name}</div>
                <div style={{ fontSize:12, color:C.muted }}>{updateModal.sector} · {updateModal.stage}</div>
              </div>
            </div>
            <FSelect label="Message Type" value="" onChange={()=>{}}
              options={[{value:"update",label:"Request quarterly update"},{value:"intro",label:"Board check-in"},{value:"data",label:"Request financials"},{value:"custom",label:"Custom message"}]}/>
            <FInput label="Message" rows={3} placeholder="Hi team, wanted to check in on Q1 progress..."/>
            <div style={{ display:"flex", gap:10 }}>
              <Btn v="secondary" full onClick={()=>setUpdateModal(null)}>Cancel</Btn>
              <Btn v="primary" full onClick={()=>{ setUpdateModal(null); toast("Message sent to "+updateModal.name,"success"); }}>Send Message</Btn>
            </div>
          </div>
        )}
      </Modal>

      {/* Add Investment Modal */}
      <Modal open={addModal} onClose={()=>{ setAddModal(false); setAddSaved(false); }} title="Add Investment">
        {addSaved
          ? <div style={{ textAlign:"center", padding:"20px 0" }}>
              <div style={{ width:56,height:56,borderRadius:28,background:"rgba(16,185,129,0.12)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px" }}>
                <Icon d={I.check} size={26} sw={2.5} style={{ color:C.green }}/>
              </div>
              <div style={{ fontWeight:700,fontSize:17,color:C.text,marginBottom:6 }}>Investment Added!</div>
              <Btn v="primary" onClick={()=>{ setAddModal(false); setAddSaved(false); }}>Done</Btn>
            </div>
          : <div style={{ display:"flex", flexDirection:"column", gap:13 }}>
              <FInput label="Company Name" placeholder="e.g. NovaTech AI"/>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                <FInput label="Amount Invested" placeholder="e.g. ₹25L"/>
                <FInput label="Equity %" placeholder="e.g. 5%"/>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                <FSelect label="Stage" value="" onChange={()=>{}} options={[{value:"",label:"Select..."},{value:"pre",label:"Pre-Seed"},{value:"seed",label:"Seed"},{value:"a",label:"Series A"},{value:"b",label:"Series B"}]}/>
                <FInput label="Investment Date" placeholder="e.g. Mar 2026"/>
              </div>
              <FInput label="Valuation at Entry" placeholder="e.g. ₹5Cr"/>
              <div style={{ display:"flex", gap:10 }}>
                <Btn v="secondary" full onClick={()=>setAddModal(false)}>Cancel</Btn>
                <Btn v="primary" full onClick={()=>setAddSaved(true)}>Add Investment</Btn>
              </div>
            </div>
        }
      </Modal>
    </div>
  );
};

const SubscriptionPage = ({ nav }) => {
  const [plan, setPlan] = useState("pro");
  const [billing, setBilling] = useState("annual");
  const [cancelModal, setCancelModal] = useState(false);
  const [upgradeModal, setUpgradeModal] = useState(null);
  const [upgraded, setUpgraded] = useState(false);

  const plans = [
    { id:"starter", name:"Starter",  price:{monthly:0,    annual:0    }, color:C.teal,   features:["Verified profile","5 intro requests/mo","Public events","Community access"] },
    { id:"pro",     name:"Pro",      price:{monthly:2999, annual:1999 }, color:"#6366F1",features:["Everything in Starter","Unlimited intros","Pitch deck hosting","Analytics dashboard","Priority placement"] },
    { id:"growth",  name:"Growth",   price:{monthly:7999, annual:5499 }, color:C.amber,  features:["Everything in Pro","Featured listing","Due diligence kit","Deal room","1-on-1 onboarding","API access"] },
  ];

  const currentPlan = plans.find(p=>p.id===plan);

  return (
    <div style={{ minHeight:"100vh", background:C.offWhite }}>
      <div style={{ background:C.navy, padding:"0 20px", height:54, display:"flex", alignItems:"center", gap:12 }}>
        <button onClick={()=>nav("founder")} style={{ background:"none", border:"none", cursor:"pointer", color:"rgba(255,255,255,0.5)", display:"flex", padding:4 }}><Icon d={I.back} size={18}/></button>
        <span style={{ color:"#fff", fontWeight:700, fontSize:15 }}>Subscription</span>
      </div>

      <div style={{ padding:20, maxWidth:560, margin:"0 auto" }}>
        {/* Current plan hero */}
        <Card style={{ padding:24, marginBottom:16, background:C.navy }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 }}>
            <div>
              <div style={{ fontSize:11, color:"rgba(255,255,255,0.35)", fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:6 }}>Your Plan</div>
              <div style={{ fontSize:26, fontWeight:800, color:"#fff", letterSpacing:"-0.02em" }}>{currentPlan.name}</div>
              <div style={{ fontSize:14, color:"rgba(255,255,255,0.45)", marginTop:4 }}>
                {currentPlan.price[billing]===0 ? "Free forever" : `₹${currentPlan.price[billing].toLocaleString()}/mo | Renews Apr 1, 2026`}
              </div>
            </div>
            <Badge v="teal">Active</Badge>
          </div>
          <div style={{ borderTop:"1px solid rgba(255,255,255,0.1)", paddingTop:14, display:"flex", gap:8, flexWrap:"wrap" }}>
            {currentPlan.features.map(f=>(
              <div key={f} style={{ display:"flex", alignItems:"center", gap:6, fontSize:12, color:"rgba(255,255,255,0.6)" }}>
                <Icon d={I.check} size={12} sw={2.5} style={{ color:C.teal }}/>
                {f}
              </div>
            ))}
          </div>
        </Card>

        {/* Billing toggle */}
        <div style={{ display:"flex", justifyContent:"center", marginBottom:18 }}>
          <div style={{ display:"inline-flex", background:"#fff", border:`1px solid ${C.border}`, borderRadius:11, padding:3, gap:3 }}>
            {["monthly","annual"].map(b=>(
              <button key={b} onClick={()=>setBilling(b)}
                style={{ padding:"6px 16px", borderRadius:9, border:"none", cursor:"pointer", fontSize:12, fontWeight:600,
                  background:billing===b?C.teal:"transparent", color:billing===b?"#fff":C.muted, transition:"all 0.15s", fontFamily:"inherit" }}>
                {b==="monthly"?"Monthly":"Annual"}{b==="annual"&&<span style={{ marginLeft:4, fontSize:10, color:billing==="annual"?"rgba(255,255,255,0.8)":C.green }}>-33%</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Plan cards */}
        <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:20 }}>
          {plans.map(p=>(
            <Card key={p.id} style={{ padding:18, border:`1.5px solid ${p.id===plan?p.color+"55":C.border}`, cursor:"pointer", transition:"all 0.18s" }}
              onClick={()=>{ if(p.id!==plan){ setUpgradeModal(p); } }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ width:10, height:10, borderRadius:5, background:p.id===plan?p.color:"transparent", border:`2px solid ${p.id===plan?p.color:C.border}`, flexShrink:0 }}/>
                  <span style={{ fontWeight:700, fontSize:15, color:C.text }}>{p.name}</span>
                  {p.id===plan && <Badge v="teal">Current</Badge>}
                </div>
                <span style={{ fontWeight:800, fontSize:16, color:C.text }}>
                  {p.price[billing]===0?"Free":`₹${p.price[billing].toLocaleString()}`}
                  {p.price[billing]>0&&<span style={{ fontSize:12, fontWeight:400, color:C.muted }}>/mo</span>}
                </span>
              </div>
              <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
                {p.features.slice(0,3).map(f=>(
                  <span key={f} style={{ fontSize:11, color:C.muted }}>{f}</span>
                ))}
                {p.features.length>3 && <span style={{ fontSize:11, color:p.color }}>+{p.features.length-3} more</span>}
              </div>
            </Card>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:80 }}>
          <Btn v="secondary" full onClick={()=>nav("billing")}>View Billing History & Invoices</Btn>
          <Btn v="secondary" full onClick={()=>nav("couponUser")}>Apply Coupon / Promo Code</Btn>
          {plan!=="starter" && (
            <button onClick={()=>setCancelModal(true)}
              style={{ padding:"10px", borderRadius:10, border:`1px solid rgba(239,68,68,0.3)`, background:"transparent", color:C.red, fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>
              Cancel Subscription
            </button>
          )}
        </div>
      </div>

      {/* Upgrade modal */}
      <Modal open={!!upgradeModal} onClose={()=>{ if(!upgraded){ setUpgradeModal(null); }}} title={upgraded?"":"Change Plan"}>
        {upgradeModal && (
          upgraded
            ? <div style={{ textAlign:"center", padding:"20px 0" }}>
                <div style={{ width:56, height:56, borderRadius:28, background:"rgba(16,185,129,0.12)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 14px" }}>
                  <Icon d={I.check} size={26} sw={2.5} style={{ color:C.green }}/>
                </div>
                <div style={{ fontWeight:700, fontSize:17, color:C.text, marginBottom:6 }}>Plan Updated!</div>
                <div style={{ fontSize:14, color:C.muted, marginBottom:20 }}>You're now on <strong>{upgradeModal.name}</strong>. Changes take effect immediately.</div>
                <Btn v="primary" onClick={()=>{ setPlan(upgradeModal.id); setUpgradeModal(null); setUpgraded(false); }}>Done</Btn>
              </div>
            : <div>
                <p style={{ fontSize:14, color:C.muted, lineHeight:1.65, marginBottom:20 }}>
                  Switch from <strong>{currentPlan.name}</strong> to <strong>{upgradeModal.name}</strong>?
                  {upgradeModal.price[billing] > currentPlan.price[billing]
                    ? " You'll be charged the prorated difference immediately."
                    : " Your downgrade will take effect at the next billing cycle."}
                </p>
                <Card style={{ padding:16, marginBottom:20 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                    <span style={{ fontSize:13, color:C.muted }}>New plan</span>
                    <span style={{ fontWeight:700, color:C.text }}>{upgradeModal.name}</span>
                  </div>
                  <div style={{ display:"flex", justifyContent:"space-between" }}>
                    <span style={{ fontSize:13, color:C.muted }}>New price</span>
                    <span style={{ fontWeight:700, color:C.text }}>
                      {upgradeModal.price[billing]===0?"Free":`₹${upgradeModal.price[billing].toLocaleString()}/mo`}
                    </span>
                  </div>
                </Card>
                <div style={{ display:"flex", gap:10 }}>
                  <Btn v="secondary" full onClick={()=>setUpgradeModal(null)}>Cancel</Btn>
                  <Btn v="primary" full onClick={()=>setUpgraded(true)}>Confirm Change</Btn>
                </div>
              </div>
        )}
      </Modal>

      {/* Cancel modal */}
      <Modal open={cancelModal} onClose={()=>setCancelModal(false)} title="Cancel Subscription">
        <div style={{ padding:"4px 0" }}>
          <div style={{ padding:16, borderRadius:11, background:"rgba(239,68,68,0.06)", border:"1px solid rgba(239,68,68,0.2)", marginBottom:18 }}>
            <div style={{ fontWeight:700, fontSize:14, color:C.red, marginBottom:6 }}>Are you sure?</div>
            <div style={{ fontSize:13, color:C.text, lineHeight:1.65 }}>
              Your plan will remain active until <strong>Apr 1, 2026</strong>. After that you'll be moved to the free Starter plan and lose access to Pro features.
            </div>
          </div>
          <div style={{ display:"flex", gap:10 }}>
            <Btn v="primary" full onClick={()=>setCancelModal(false)}>Keep My Plan</Btn>
            <Btn v="danger" full onClick={()=>{ setPlan("starter"); setCancelModal(false); }}>Yes, Cancel</Btn>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// ─── BILLING & INVOICES PAGE ──────────────────────────────────────────────────
const BillingPage = ({ nav }) => {
  const [payModal,       setPayModal]       = useState(false);
  const [cardSaved,      setCardSaved]      = useState(false);
  const [cancelModal,    setCancelModal]    = useState(false);
  const [cancelStep,     setCancelStep]     = useState(1);
  const [downloadedPdfs, setDownloadedPdfs] = useState(new Set());
  const toast = useToast();
  const downloadPdf = id => {
    setDownloadedPdfs(p=>new Set([...p,id]));
    toast("Invoice downloaded","success");
    setTimeout(()=>setDownloadedPdfs(p=>{ const n=new Set(p); n.delete(id); return n; }), 2500);
  };

  const invoices = [
    {id:"inv-006", date:"Mar 1, 2026",  amount:"₹999",  status:"paid",    plan:"Pro Monthly"},
    {id:"inv-005", date:"Feb 1, 2026",  amount:"₹999",  status:"paid",    plan:"Pro Monthly"},
    {id:"inv-004", date:"Jan 1, 2026",  amount:"₹999",  status:"paid",    plan:"Pro Monthly"},
    {id:"inv-003", date:"Dec 1, 2025",  amount:"₹999",  status:"paid",    plan:"Pro Monthly"},
    {id:"inv-002", date:"Nov 1, 2025",  amount:"₹499",  status:"paid",    plan:"Starter Monthly"},
    {id:"inv-001", date:"Oct 1, 2025",  amount:"₹0",    status:"paid",    plan:"Free Trial"},
  ];

  const usageItems = [
    { label:"Intro Requests",  used:18, limit:25, icon:"🤝", color:C.teal },
    { label:"Saved Startups",  used:12, limit:50, icon:"🔖", color:"#6366F1" },
    { label:"Messages Sent",   used:34, limit:100,icon:"💬", color:C.green },
    { label:"Data Room Views", used:8,  limit:20, icon:"📂", color:C.amber },
  ];

  return (
    <div style={{ padding:20, maxWidth:660, margin:"0 auto", paddingBottom:80 }}>
      {/* Header */}
      <div style={{ marginBottom:24 }}>
        <h1 style={{ fontSize:22, fontWeight:800, color:C.text, marginBottom:4, letterSpacing:"-0.02em" }}>Billing & Subscription</h1>
        <p style={{ fontSize:14, color:C.muted }}>Manage your plan, payment method, and invoices.</p>
      </div>

      {/* Current plan card */}
      <Card style={{ padding:22, marginBottom:14, background:C.navy }}>
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:14 }}>
          <div>
            <div style={{ fontSize:11, color:"rgba(255,255,255,0.38)", fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:6 }}>Current Plan</div>
            <div style={{ fontSize:24, fontWeight:800, color:"#fff", letterSpacing:"-0.02em" }}>Pro Monthly</div>
            <div style={{ fontSize:14, color:"rgba(255,255,255,0.5)", marginTop:2 }}>₹999 / month · renews Apr 1, 2026</div>
          </div>
          <Badge v="teal">Active</Badge>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(110px,1fr))", gap:8 }}>
          {[["Unlimited","Profile views"],["25","Monthly intros"],["Priority","Support"],["100","Messages/mo"]].map(([v,l])=>(
            <div key={l} style={{ padding:"10px 12px", borderRadius:10, background:"rgba(255,255,255,0.07)", textAlign:"center" }}>
              <div style={{ color:C.teal, fontWeight:800, fontSize:15 }}>{v}</div>
              <div style={{ color:"rgba(255,255,255,0.38)", fontSize:10, marginTop:2 }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ display:"flex", gap:10, marginTop:16, flexWrap:"wrap" }}>
          <Btn v="primary" sz="sm" onClick={()=>nav("subscription")}>Upgrade Plan</Btn>
          <button onClick={()=>setCancelModal(true)}
            style={{ padding:"6px 14px", borderRadius:8, border:"1px solid rgba(255,255,255,0.15)",
              background:"transparent", color:"rgba(255,255,255,0.45)", fontSize:12, fontWeight:600,
              cursor:"pointer", fontFamily:"inherit", transition:"all 0.15s" }}
            onMouseEnter={e=>{ e.currentTarget.style.borderColor="rgba(239,68,68,0.5)"; e.currentTarget.style.color=C.red; }}
            onMouseLeave={e=>{ e.currentTarget.style.borderColor="rgba(255,255,255,0.15)"; e.currentTarget.style.color="rgba(255,255,255,0.45)"; }}>
            Cancel plan
          </button>
        </div>
      </Card>

      {/* Usage meters */}
      <Card style={{ padding:20, marginBottom:14 }}>
        <div style={{ fontWeight:700, fontSize:15, color:C.text, marginBottom:4 }}>Usage This Month</div>
        <p style={{ fontSize:13, color:C.muted, marginBottom:16 }}>Resets Apr 1, 2026</p>
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          {usageItems.map(u=>{
            const pct = Math.round((u.used/u.limit)*100);
            const warn = pct >= 80;
            return (
              <div key={u.label}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                    <span style={{ fontSize:14 }}>{u.icon}</span>
                    <span style={{ fontSize:13, color:C.text, fontWeight:500 }}>{u.label}</span>
                    {warn && <span style={{ fontSize:10, fontWeight:700, color:C.amber, background:"rgba(245,158,11,0.1)", padding:"1px 6px", borderRadius:99 }}>Almost full</span>}
                  </div>
                  <span style={{ fontSize:12, fontWeight:700, color:warn?C.amber:C.muted }}>{u.used} / {u.limit}</span>
                </div>
                <div style={{ height:6, borderRadius:999, background:C.slateXL }}>
                  <div style={{ width:`${Math.min(pct,100)}%`, height:"100%", borderRadius:999,
                    background:warn?C.amber:u.color, transition:"width 0.5s" }}/>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Next invoice */}
      <Card style={{ padding:18, marginBottom:14, border:`1.5px solid ${C.tealBd}`, background:"rgba(31,163,163,0.03)" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <div style={{ width:40, height:40, borderRadius:11, background:C.tealDim, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <span style={{ fontSize:18 }}>📅</span>
            </div>
            <div>
              <div style={{ fontWeight:700, fontSize:14, color:C.text }}>Next Invoice</div>
              <div style={{ fontSize:13, color:C.muted }}>Apr 1, 2026 · Pro Monthly</div>
            </div>
          </div>
          <div style={{ textAlign:"right" }}>
            <div style={{ fontSize:20, fontWeight:800, color:C.teal }}>₹999</div>
            <div style={{ fontSize:11, color:C.muted }}>billed to •••• 4242</div>
          </div>
        </div>
      </Card>

      {/* Payment method */}
      <Card style={{ padding:18, marginBottom:14 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
          <div style={{ fontWeight:700, fontSize:15, color:C.text }}>Payment Method</div>
          <Btn v="secondary" sz="sm" onClick={()=>setPayModal(true)}>Update</Btn>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 14px", borderRadius:11, background:C.offWhite }}>
          <div style={{ width:44, height:30, borderRadius:6, background:"#1A1F71", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ color:"#fff", fontSize:11, fontWeight:900, letterSpacing:"-0.03em" }}>VISA</span>
          </div>
          <div>
            <div style={{ fontWeight:600, fontSize:14, color:C.text }}>Visa ending in 4242</div>
            <div style={{ fontSize:12, color:C.muted }}>Expires 08/27 · Priya Sharma</div>
          </div>
          <Badge v="green" style={{ marginLeft:"auto" }}>Default</Badge>
        </div>
      </Card>

      {/* Invoice history */}
      <Card style={{ padding:0, overflow:"hidden", marginBottom:14 }}>
        <div style={{ padding:"16px 18px 12px", borderBottom:`1px solid ${C.border}` }}>
          <div style={{ fontWeight:700, fontSize:15, color:C.text }}>Invoice History</div>
        </div>
        {invoices.map((inv,i)=>(
          <div key={inv.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"13px 18px",
            borderBottom:i<invoices.length-1?`1px solid ${C.slateXL}`:"none",
            transition:"background 0.12s" }}
            onMouseEnter={e=>e.currentTarget.style.background=C.offWhite}
            onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
            <div style={{ width:36, height:36, borderRadius:9, background:"rgba(16,185,129,0.08)",
              display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <span style={{ fontSize:16 }}>🧾</span>
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontWeight:600, fontSize:13, color:C.text }}>{inv.plan}</div>
              <div style={{ fontSize:12, color:C.muted }}>{inv.date}</div>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:10, flexShrink:0 }}>
              <span style={{ fontWeight:700, fontSize:14, color:C.text }}>{inv.amount}</span>
              <Badge v="green">{inv.status}</Badge>
              {inv.amount!=="₹0" && (
                <button onClick={()=>downloadPdf(inv.id)}
                  style={{ padding:"4px 10px", borderRadius:7,
                    border:`1px solid ${downloadedPdfs.has(inv.id)?C.green:C.border}`,
                    background:downloadedPdfs.has(inv.id)?"rgba(16,185,129,0.08)":"#fff",
                    color:downloadedPdfs.has(inv.id)?C.green:C.muted,
                    fontSize:11, fontWeight:700, cursor:"pointer", fontFamily:"inherit",
                    transition:"all 0.2s" }}>
                  {downloadedPdfs.has(inv.id)?"✓ Saved":"PDF"}
                </button>
              )}
            </div>
          </div>
        ))}
      </Card>

      {/* Update Card Modal */}
      <Modal open={payModal} onClose={()=>{ setPayModal(false); setCardSaved(false); }} title="Update Payment Method">
        {cardSaved
          ? <div style={{ textAlign:"center", padding:"20px 0" }}>
              <div style={{ width:56,height:56,borderRadius:28,background:"rgba(16,185,129,0.12)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px" }}>
                <Icon d={I.check} size={26} sw={2.5} style={{ color:C.green }}/>
              </div>
              <div style={{ fontWeight:700,fontSize:17,color:C.text,marginBottom:6 }}>Card Updated!</div>
              <Btn v="primary" onClick={()=>{ setPayModal(false); setCardSaved(false); }}>Done</Btn>
            </div>
          : <div style={{ display:"flex",flexDirection:"column",gap:13 }}>
              <FInput label="Card Number" placeholder="1234 5678 9012 3456"/>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10 }}>
                <FInput label="Expiry" placeholder="MM/YY"/>
                <FInput label="CVC" placeholder="123"/>
              </div>
              <FInput label="Name on Card" placeholder="Priya Sharma"/>
              <div style={{ fontSize:12, color:C.muted, display:"flex", alignItems:"center", gap:6 }}>
                <span>🔒</span> Secured by Stripe. FundLink never stores card data.
              </div>
              <div style={{ display:"flex",gap:10 }}>
                <Btn v="secondary" full onClick={()=>setPayModal(false)}>Cancel</Btn>
                <Btn v="primary" full onClick={()=>setCardSaved(true)}>Save Card</Btn>
              </div>
            </div>
        }
      </Modal>

      {/* Cancel Plan Modal */}
      <Modal open={cancelModal} onClose={()=>{ setCancelModal(false); setCancelStep(1); }} title="Cancel Subscription">
        {cancelStep===1
          ? <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              <div style={{ padding:"14px 16px", borderRadius:12, background:"rgba(239,68,68,0.05)", border:"1px solid rgba(239,68,68,0.15)" }}>
                <div style={{ fontWeight:700, fontSize:14, color:C.red, marginBottom:6 }}>Before you go…</div>
                <p style={{ fontSize:13, color:C.muted, lineHeight:1.65, margin:0 }}>
                  Cancelling will end your Pro access on <strong>Apr 1, 2026</strong>. You'll lose 25 monthly intros, priority support, and data room access.
                </p>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {["Too expensive","Not using it enough","Missing a feature I need","Switching to another platform","Other"].map(r=>(
                  <label key={r} style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer", padding:"8px 10px", borderRadius:8, transition:"background 0.12s" }}
                    onMouseEnter={e=>e.currentTarget.style.background=C.offWhite}
                    onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                    <input type="radio" name="cancel_reason" style={{ accentColor:C.teal }}/>
                    <span style={{ fontSize:13, color:C.text }}>{r}</span>
                  </label>
                ))}
              </div>
              <div style={{ display:"flex", gap:10 }}>
                <Btn v="secondary" full onClick={()=>setCancelModal(false)}>Keep My Plan</Btn>
                <Btn v="danger" full onClick={()=>setCancelStep(2)}>Continue →</Btn>
              </div>
            </div>
          : <div style={{ display:"flex", flexDirection:"column", gap:14, textAlign:"center" }}>
              <div style={{ width:56,height:56,borderRadius:28,background:"rgba(239,68,68,0.08)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto" }}>
                <span style={{ fontSize:24 }}>😢</span>
              </div>
              <div style={{ fontWeight:700, fontSize:16, color:C.text }}>We're sorry to see you go</div>
              <p style={{ fontSize:13, color:C.muted, margin:0, lineHeight:1.65 }}>Your Pro access continues until <strong>Apr 1, 2026</strong>. You can reactivate at any time.</p>
              <div style={{ display:"flex", gap:10 }}>
                <Btn v="secondary" full onClick={()=>{ setCancelModal(false); setCancelStep(1); }}>Never mind</Btn>
                <Btn v="danger" full onClick={()=>{ setCancelModal(false); setCancelStep(1); toast("Subscription cancelled. Access ends Apr 1.","warning"); }}>Confirm Cancel</Btn>
              </div>
            </div>
        }
      </Modal>
    </div>
  );
};

const CouponUserPage = ({ nav }) => {
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null); // null | {valid, msg, discount, plan}
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  const validCodes = {
    "LAUNCH50":   { discount:"50% off first 3 months", plan:"Any paid plan", type:"percent", value:50 },
    "FOUNDER500": { discount:"₹500 credit", plan:"Pro or Growth", type:"flat", value:500 },
    "NASSCOM25":  { discount:"25% off annual plan", plan:"Annual billing only", type:"percent", value:25 },
    "FREETRIAL":  { discount:"30-day free trial extension", plan:"Any plan", type:"trial", value:30 },
  };

  const check = () => {
    if(!code.trim()){ setResult({valid:false, msg:"Please enter a coupon code."}); return; }
    setApplying(true);
    setTimeout(()=>{
      setApplying(false);
      const match = validCodes[code.trim().toUpperCase()];
      if(match) setResult({ valid:true, ...match });
      else setResult({ valid:false, msg:"This code is invalid or has expired." });
    }, 900);
  };

  return (
    <div style={{ minHeight:"100vh", background:C.offWhite }}>
      <div style={{ background:C.navy, padding:"0 20px", height:54, display:"flex", alignItems:"center", gap:12 }}>
        <button onClick={()=>nav("subscription")} style={{ background:"none", border:"none", cursor:"pointer", color:"rgba(255,255,255,0.5)", display:"flex", padding:4 }}><Icon d={I.back} size={18}/></button>
        <span style={{ color:"#fff", fontWeight:700, fontSize:15 }}>Apply Coupon Code</span>
      </div>

      <div style={{ padding:20, maxWidth:480, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:32, paddingTop:12 }}>
          <div style={{ fontSize:52, marginBottom:12 }}></div>
          <h2 style={{ fontSize:22, fontWeight:800, color:C.text, marginBottom:8, letterSpacing:"-0.02em" }}>Got a promo code?</h2>
          <p style={{ fontSize:14, color:C.muted }}>Enter your coupon below to unlock a discount or special offer.</p>
        </div>

        {applied
          ? <Card style={{ padding:28, textAlign:"center", marginBottom:20 }}>
              <div style={{ width:64, height:64, borderRadius:32, background:"rgba(16,185,129,0.1)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>
                <Icon d={I.check} size={30} sw={2.5} style={{ color:C.green }}/>
              </div>
              <div style={{ fontWeight:800, fontSize:18, color:C.text, marginBottom:6 }}>Coupon Applied! </div>
              <div style={{ fontSize:14, color:C.muted, marginBottom:4 }}><strong>{code.toUpperCase()}</strong></div>
              <div style={{ fontSize:15, fontWeight:600, color:C.green, marginBottom:20 }}>{result?.discount}</div>
              <Btn v="primary" full onClick={()=>nav("subscription")}>Back to Subscription</Btn>
            </Card>
          : <>
              <Card style={{ padding:22, marginBottom:14 }}>
                <label style={{ display:"block", fontSize:13, fontWeight:600, color:C.text, marginBottom:10 }}>Coupon Code</label>
                <div style={{ display:"flex", gap:10 }}>
                  <input value={code} onChange={e=>{ setCode(e.target.value.toUpperCase()); setResult(null); }}
                    placeholder="e.g. LAUNCH50"
                    style={{ flex:1, padding:"11px 14px", borderRadius:10, border:`1.5px solid ${result?.valid===false?C.red:result?.valid===true?C.teal:C.border}`, background:"#fff", color:C.text, fontSize:14, outline:"none", fontFamily:"inherit", fontWeight:600, letterSpacing:"0.04em" }}
                    onFocus={e=>e.target.style.borderColor=C.teal} onBlur={e=>!result&&(e.target.style.borderColor=C.border)}
                    onKeyDown={e=>e.key==="Enter"&&check()}/>
                  <Btn v="primary" onClick={check} disabled={applying}>{applying?"...":"Apply"}</Btn>
                </div>

                {result && (
                  <div style={{ marginTop:14, padding:"12px 14px", borderRadius:10,
                    background:result.valid?"rgba(16,185,129,0.08)":"rgba(239,68,68,0.06)",
                    border:`1px solid ${result.valid?"rgba(16,185,129,0.25)":"rgba(239,68,68,0.25)"}` }}>
                    {result.valid
                      ? <div>
                          <div style={{ fontWeight:700, fontSize:14, color:C.green, marginBottom:4 }}>Valid coupon!</div>
                          <div style={{ fontSize:13, color:C.text }}>{result.discount} - <span style={{ color:C.muted }}>{result.plan}</span></div>
                        </div>
                      : <div style={{ fontWeight:600, fontSize:13, color:C.red }}>X {result.msg}</div>
                    }
                  </div>
                )}
              </Card>

              {result?.valid && (
                <Btn v="primary" full onClick={()=>setApplied(true)}>Confirm & Apply Coupon</Btn>
              )}

              {/* Available codes hint */}
              <Card style={{ padding:18, marginTop:14 }}>
                <div style={{ fontSize:12, fontWeight:700, color:C.muted, letterSpacing:"0.07em", textTransform:"uppercase", marginBottom:12 }}>Try these demo codes</div>
                {Object.entries(validCodes).map(([k,v])=>(
                  <div key={k} onClick={()=>{ setCode(k); setResult(null); }}
                    style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"9px 12px", borderRadius:9, cursor:"pointer", marginBottom:6, background:C.offWhite, border:`1px solid ${C.border}`, transition:"all 0.15s" }}
                    onMouseEnter={e=>{ e.currentTarget.style.borderColor=C.teal; e.currentTarget.style.background=C.tealDim; }}
                    onMouseLeave={e=>{ e.currentTarget.style.borderColor=C.border; e.currentTarget.style.background=C.offWhite; }}>
                    <span style={{ fontWeight:700, fontSize:13, color:C.text, fontFamily:"monospace" }}>{k}</span>
                    <span style={{ fontSize:12, color:C.muted }}>{v.discount}</span>
                  </div>
                ))}
              </Card>
            </>
        }
      </div>
    </div>
  );
};

// ─── AFFILIATE / REFERRAL PAGE ────────────────────────────────────────────────
const AffiliatePage = ({ nav }) => {
  const [copied, setCopied] = useState(false);
  const [redeemed, setRedeemed] = useState(false);
  const [tab, setTab] = useState("overview");

  const refLink = "fundlink.in/ref/priya-sharma-4f2k";
  const earnings = [
    {name:"Rahul Verma",      date:"Mar 2, 2026",  plan:"Pro",    credit:"₹500",  status:"paid"},
    {name:"Meera Nair",       date:"Feb 20, 2026", plan:"Growth", credit:"₹1,000",status:"paid"},
    {name:"Vikram Singh",     date:"Feb 5, 2026",  plan:"Pro",    credit:"₹500",  status:"paid"},
    {name:"Ananya Kapoor",    date:"Jan 15, 2026", plan:"Pro",    credit:"₹500",  status:"pending"},
    {name:"Sanjay Mehta",     date:"Jan 8, 2026",  plan:"Starter",credit:"₹0",    status:"free"},
  ];

  const totalEarned = "₹2,500";
  const totalPending = "₹500";
  const totalRefs = earnings.length;
  const converted = earnings.filter(e=>e.plan!=="Starter").length;

  const copy = () => { setCopied(true); setTimeout(()=>setCopied(false), 2000); };

  return (
    <div style={{ minHeight:"100vh", background:C.offWhite }}>
      <div style={{ background:C.navy, padding:"0 20px", height:54, display:"flex", alignItems:"center", gap:12 }}>
        <button onClick={()=>nav("subscription")} style={{ background:"none", border:"none", cursor:"pointer", color:"rgba(255,255,255,0.5)", display:"flex", padding:4 }}><Icon d={I.back} size={18}/></button>
        <span style={{ color:"#fff", fontWeight:700, fontSize:15 }}>Refer & Earn</span>
      </div>

      <div style={{ padding:20, maxWidth:540, margin:"0 auto" }}>
        {/* Hero */}
        <div style={{ textAlign:"center", padding:"24px 0 20px" }}>
          <div style={{ fontSize:48, marginBottom:12 }}></div>
          <h2 style={{ fontSize:22, fontWeight:800, color:C.text, marginBottom:8, letterSpacing:"-0.02em" }}>Refer friends, earn credits</h2>
          <p style={{ fontSize:14, color:C.muted, maxWidth:360, margin:"0 auto", lineHeight:1.65 }}>
            Earn <strong>₹500 account credit</strong> for every friend who upgrades to a paid plan - and they get their first month free.
          </p>
        </div>

        {/* Stats */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10, marginBottom:18 }}>
          {[["₹2,500","Total Earned",C.teal],["₹500","Pending",C.amber],[totalRefs.toString(),"Referrals",C.text],[converted.toString(),"Converted","#6366F1"]].map(([v,l,c])=>(
            <Card key={l} style={{ padding:14, textAlign:"center" }}>
              <div style={{ fontSize:18, fontWeight:800, color:c, letterSpacing:"-0.02em" }}>{v}</div>
              <div style={{ fontSize:10, color:C.muted, marginTop:3 }}>{l}</div>
            </Card>
          ))}
        </div>

        {/* Ref link */}
        <Card style={{ padding:20, marginBottom:16 }}>
          <div style={{ fontSize:13, fontWeight:600, color:C.text, marginBottom:10 }}>Your Referral Link</div>
          <div style={{ display:"flex", gap:8, marginBottom:14 }}>
            <div style={{ flex:1, padding:"10px 14px", borderRadius:10, background:C.offWhite, border:`1px solid ${C.border}`, fontSize:13, color:C.muted, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
              {refLink}
            </div>
            <Btn v={copied?"secondary":"primary"} sz="sm" onClick={copy}>{copied?"Copied!":"Copy"}</Btn>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            {[
              {ch:"WhatsApp", color:"#25D366", fn:()=>{ const msg=encodeURIComponent(`Join FundLink — India's top platform for startup funding. Use my referral link: https://${refLink}`); window.open(`https://wa.me/?text=${msg}`,'_blank'); }},
              {ch:"LinkedIn", color:"#0A66C2", fn:()=>{ window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://'+refLink)}`,'_blank'); }},
              {ch:"Email",    color:C.teal,    fn:()=>{ window.open(`mailto:?subject=Join FundLink&body=Hey! I've been using FundLink to connect with investors. Join with my link: https://${refLink}`,'_blank'); }},
            ].map(({ch,color,fn})=>(
              <button key={ch} onClick={fn}
                style={{ flex:1, padding:"8px", borderRadius:9, border:`1px solid ${C.border}`, background:"transparent", fontSize:12, fontWeight:600, color:C.text, cursor:"pointer", fontFamily:"inherit", transition:"all 0.15s" }}
                onMouseEnter={e=>{ e.currentTarget.style.borderColor=color; e.currentTarget.style.color=color; }}
                onMouseLeave={e=>{ e.currentTarget.style.borderColor=C.border; e.currentTarget.style.color=C.text; }}>
                {ch}
              </button>
            ))}
          </div>
        </Card>

        {/* Tabs */}
        <div style={{ display:"flex", gap:6, marginBottom:14 }}>
          {["overview","earnings","how-it-works"].map(t=>(
            <button key={t} onClick={()=>setTab(t)}
              style={{ padding:"7px 14px", borderRadius:9, border:`1px solid ${tab===t?C.teal:C.border}`, background:tab===t?C.tealDim:"transparent", color:tab===t?C.teal:C.muted, fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"inherit", transition:"all 0.15s", whiteSpace:"nowrap" }}>
              {t==="overview"?"Overview":t==="earnings"?"Earnings History":"How It Works"}
            </button>
          ))}
        </div>

        {tab==="overview" && (
          <Card style={{ padding:18, marginBottom:80 }}>
            <div style={{ fontWeight:700, fontSize:14, color:C.text, marginBottom:14 }}>Pending Payout</div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 16px", borderRadius:11, background:C.offWhite, marginBottom:14 }}>
              <span style={{ fontSize:14, color:C.text }}>Available credit balance</span>
              <span style={{ fontWeight:800, fontSize:18, color:C.teal }}>₹500</span>
            </div>
            <Btn v={redeemed?"secondary":"primary"} full onClick={()=>setRedeemed(true)}>
              {redeemed ? "Credit Applied!" : "Redeem Credit Against Next Invoice"}
            </Btn>
          </Card>
        )}

        {tab==="earnings" && (
          <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:80 }}>
            {earnings.map((e,i)=>(
              <Card key={i} style={{ padding:16 }}>
                <div style={{ display:"flex", alignItems:"center", gap:11 }}>
                  <Avatar name={e.name} size={38}/>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:600, fontSize:14, color:C.text }}>{e.name}</div>
                    <div style={{ fontSize:12, color:C.muted }}>{e.date} | {e.plan} plan</div>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <div style={{ fontWeight:700, fontSize:14, color:e.plan==="Starter"?C.muted:C.green }}>{e.credit}</div>
                    <Badge v={e.status==="paid"?"green":e.status==="pending"?"amber":"teal"}>{e.status}</Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {tab==="how-it-works" && (
          <Card style={{ padding:22, marginBottom:80 }}>
            {[
              {n:"01", t:"Share your link",    d:"Copy your unique referral link and share it with founders, investors, or ecosystem builders."},
              {n:"02", t:"They sign up",       d:"Your friend creates a FundLink account using your referral link."},
              {n:"03", t:"They upgrade",       d:"When they upgrade to any paid plan, you earn ₹500 account credit instantly."},
              {n:"04", t:"They get rewarded",  d:"Your referred friend gets their first month free - a win-win."},
            ].map((s,i,arr)=>(
              <div key={i} style={{ display:"flex", gap:14, paddingBottom:i<arr.length-1?20:0, marginBottom:i<arr.length-1?20:0, borderBottom:i<arr.length-1?`1px solid ${C.slateXL}`:"none" }}>
                <div style={{ fontSize:22, fontWeight:800, color:"rgba(31,163,163,0.3)", letterSpacing:"-0.02em", minWidth:32 }}>{s.n}</div>
                <div>
                  <div style={{ fontWeight:700, fontSize:14, color:C.text, marginBottom:4 }}>{s.t}</div>
                  <div style={{ fontSize:13, color:C.muted, lineHeight:1.65 }}>{s.d}</div>
                </div>
              </div>
            ))}
          </Card>
        )}
      </div>
    </div>
  );
};

// ─── ADMIN: COUPON MANAGEMENT ─────────────────────────────────────────────────
const AdminCouponsPage = ({ nav }) => {
  const [showCreate, setShowCreate] = useState(false);
  const [coupons, setCoupons] = useState([
    {code:"LAUNCH50",   type:"Percent", value:"50%",   plan:"Any",    uses:142, limit:500, expiry:"Apr 30, 2026", active:true},
    {code:"FOUNDER500", type:"Flat",    value:"₹500",  plan:"Pro+",   uses:38,  limit:100, expiry:"Mar 31, 2026", active:true},
    {code:"NASSCOM25",  type:"Percent", value:"25%",   plan:"Annual", uses:67,  limit:200, expiry:"Jun 30, 2026", active:true},
    {code:"FREETRIAL",  type:"Trial",   value:"30d",   plan:"Any",    uses:204, limit:1000,expiry:"Dec 31, 2026", active:false},
    {code:"BETA2025",   type:"Percent", value:"100%",  plan:"Starter",uses:500, limit:500, expiry:"Jan 1, 2026",  active:false},
  ]);
  const [newCode, setNewCode] = useState({ code:"", type:"Percent", value:"", plan:"Any", limit:"100", expiry:"" });

  const toggle = code => setCoupons(p=>p.map(c=>c.code===code?{...c,active:!c.active}:c));
  const del    = code => setCoupons(p=>p.filter(c=>c.code!==code));

  const create = () => {
    if(!newCode.code||!newCode.value) return;
    setCoupons(p=>[{ ...newCode, uses:0, limit:parseInt(newCode.limit)||100, active:true }, ...p]);
    setNewCode({ code:"", type:"Percent", value:"", plan:"Any", limit:"100", expiry:"" });
    setShowCreate(false);
  };

  return (
    <div style={{ minHeight:"100vh", background:C.offWhite }}>
      <div style={{ background:C.navy, padding:"0 20px", height:54, display:"flex", alignItems:"center", gap:12 }}>
        <button onClick={()=>nav("adminSettings")} style={{ background:"none", border:"none", cursor:"pointer", color:"rgba(255,255,255,0.5)", display:"flex", padding:4 }}><Icon d={I.back} size={18}/></button>
        <span style={{ color:"#fff", fontWeight:700, fontSize:15, flex:1 }}>Coupon Management</span>
        <Btn v="primary" sz="sm" onClick={()=>setShowCreate(true)}>+ New Coupon</Btn>
      </div>

      <div style={{ padding:20, maxWidth:680, margin:"0 auto" }}>
        {/* Stats */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))", gap:10, marginBottom:18 }}>
          {[
            ["5","Total Codes",C.text],
            [coupons.filter(c=>c.active).length.toString(),"Active",C.green],
            [coupons.reduce((s,c)=>s+c.uses,0).toString(),"Total Uses",C.teal],
            ["₹1.2L","Revenue Impact","#6366F1"],
          ].map(([v,l,c])=>(
            <Card key={l} style={{ padding:14, textAlign:"center" }}>
              <div style={{ fontSize:20, fontWeight:800, color:c, letterSpacing:"-0.02em" }}>{v}</div>
              <div style={{ fontSize:11, color:C.muted, marginTop:3 }}>{l}</div>
            </Card>
          ))}
        </div>

        {/* Coupon list */}
        <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:80 }}>
          {coupons.map((c,i)=>(
            <Card key={i} style={{ padding:18, opacity:c.active?1:0.6 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
                <div>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                    <span style={{ fontWeight:800, fontSize:16, color:C.text, fontFamily:"monospace", letterSpacing:"0.04em" }}>{c.code}</span>
                    <Badge v={c.active?"green":"red"}>{c.active?"Active":"Inactive"}</Badge>
                  </div>
                  <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                    <Badge v="teal">{c.type}</Badge>
                    <span style={{ fontSize:13, fontWeight:700, color:C.text }}>{c.value} off</span>
                    <span style={{ fontSize:12, color:C.muted }}>| {c.plan} plan</span>
                    <span style={{ fontSize:12, color:C.muted }}>| Expires {c.expiry}</span>
                  </div>
                </div>
                <div style={{ display:"flex", gap:6 }}>
                  <button onClick={()=>toggle(c.code)}
                    style={{ padding:"5px 10px", borderRadius:8, border:`1px solid ${c.active?"rgba(239,68,68,0.3)":C.tealBd}`, background:c.active?"rgba(239,68,68,0.06)":C.tealDim, color:c.active?C.red:C.teal, fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>
                    {c.active?"Disable":"Enable"}
                  </button>
                  <button onClick={()=>del(c.code)}
                    style={{ padding:"5px 8px", borderRadius:8, border:`1px solid ${C.border}`, background:"transparent", color:C.muted, fontSize:12, cursor:"pointer", fontFamily:"inherit" }}>
                    ✕
                  </button>
                </div>
              </div>
              {/* Usage bar */}
              <div>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                  <span style={{ fontSize:11, color:C.muted }}>Usage</span>
                  <span style={{ fontSize:11, color:C.muted }}>{c.uses} / {c.limit}</span>
                </div>
                <div style={{ height:5, borderRadius:999, background:C.slateXL }}>
                  <div style={{ width:Math.min(100,(c.uses/c.limit*100))+"%", height:"100%", borderRadius:999, background:c.uses/c.limit>0.9?C.red:C.teal, transition:"width 0.3s" }}/>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Create coupon modal */}
      <Modal open={showCreate} onClose={()=>setShowCreate(false)} title="Create New Coupon">
        <div style={{ display:"flex", flexDirection:"column", gap:13 }}>
          <FInput label="Coupon Code" value={newCode.code} onChange={e=>setNewCode(p=>({...p,code:e.target.value.toUpperCase()}))} placeholder="e.g. SUMMER30"/>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <FSelect label="Discount Type" value={newCode.type} onChange={e=>setNewCode(p=>({...p,type:e.target.value}))}
              options={[{value:"Percent",label:"Percentage %"},{value:"Flat",label:"Flat Amount ₹"},{value:"Trial",label:"Free Trial Days"}]}/>
            <FInput label={newCode.type==="Percent"?"Discount %":newCode.type==="Flat"?"Amount (₹)":"Days"} value={newCode.value} onChange={e=>setNewCode(p=>({...p,value:e.target.value}))} placeholder={newCode.type==="Percent"?"e.g. 25":newCode.type==="Flat"?"e.g. 500":"e.g. 30"}/>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <FSelect label="Applicable Plan" value={newCode.plan} onChange={e=>setNewCode(p=>({...p,plan:e.target.value}))}
              options={[{value:"Any",label:"Any Plan"},{value:"Pro+",label:"Pro & Growth"},{value:"Annual",label:"Annual Only"},{value:"Starter",label:"Starter Only"}]}/>
            <FInput label="Usage Limit" type="number" value={newCode.limit} onChange={e=>setNewCode(p=>({...p,limit:e.target.value}))} placeholder="e.g. 100"/>
          </div>
          <FInput label="Expiry Date" type="date" value={newCode.expiry} onChange={e=>setNewCode(p=>({...p,expiry:e.target.value}))}/>
          <Btn v="primary" full onClick={create}>Create Coupon</Btn>
        </div>
      </Modal>
    </div>
  );
};

// ─── DEMO NAV + ROOT ──────────────────────────────────────────────────────────
// ─── ADMIN PAYMENT SETUP PAGE ────────────────────────────────────────────────
const AdminPaymentPage = ({ nav }) => {
  const [sidebar,       setSidebar]       = useState(false);
  const [activeTab,     setActiveTab]     = useState("gateway");
  const [saved,         setSaved]         = useState({});
  const [testMode,      setTestMode]      = useState(true);
  const [razorpayKey,   setRazorpayKey]   = useState("rzp_test_9xKq2Mf7bLpA3Z");
  const [razorpaySecret,setRazorpaySecret]= useState("••••••••••••••••••••••••");
  const [webhookSecret, setWebhookSecret] = useState("whsec_fundlink_••••••••");
  const [showSecret,    setShowSecret]    = useState(false);
  const [showWebhook,   setShowWebhook]   = useState(false);
  const [gstEnabled,    setGstEnabled]    = useState(true);
  const [gstNo,         setGstNo]         = useState("27AABCF1234A1Z5");
  const [gstRate,       setGstRate]       = useState("18");
  const [invoicePrefix, setInvoicePrefix] = useState("FL-INV");
  const [currency,      setCurrency]      = useState("INR");
  const [settleDays,    setSettleDays]    = useState("2");
  const [payoutThresh,  setPayoutThresh]  = useState("10000");
  const [payoutDay,     setPayoutDay]     = useState("1");
  const [bankName,      setBankName]      = useState("HDFC Bank");
  const [bankAccount,   setBankAccount]   = useState("••••••••4821");
  const [bankIfsc,      setBankIfsc]      = useState("HDFC0001234");
  const [autoRefund,    setAutoRefund]    = useState(true);
  const [refundDays,    setRefundDays]    = useState("7");
  const [planPrices,    setPlanPrices]    = useState([
    {id:"starter",  name:"Starter",  monthlyINR:0,     annualINR:0,      monthlyUSD:0,   annualUSD:0,   active:true},
    {id:"pro",      name:"Pro",      monthlyINR:1999,  annualINR:19990,  monthlyUSD:24,  annualUSD:240, active:true},
    {id:"growth",   name:"Growth",   monthlyINR:4999,  annualINR:49990,  monthlyUSD:59,  annualUSD:590, active:true},
    {id:"enterprise",name:"Enterprise",monthlyINR:0,   annualINR:0,      monthlyUSD:0,   annualUSD:0,   active:true},
  ]);
  const [editingPlan,   setEditingPlan]   = useState(null);
  const [webhookLog,    setWebhookLog]    = useState([
    {id:"evt_001", event:"payment.captured",  amount:"₹1,999", user:"Rahul Verma",    time:"2m ago",  status:"ok"},
    {id:"evt_002", event:"subscription.created",amount:"₹19,990",user:"Priya Sharma", time:"14m ago", status:"ok"},
    {id:"evt_003", event:"payment.failed",    amount:"₹4,999", user:"Amit Joshi",     time:"1h ago",  status:"fail"},
    {id:"evt_004", event:"refund.processed",  amount:"₹1,999", user:"Neha Singh",     time:"3h ago",  status:"ok"},
    {id:"evt_005", event:"subscription.cancelled",amount:"₹0", user:"Vijay Kumar",   time:"5h ago",  status:"ok"},
    {id:"evt_006", event:"payment.captured",  amount:"₹1,999", user:"Sunita Nair",    time:"6h ago",  status:"ok"},
  ]);
  const [payMethods,    setPayMethods]    = useState([true,true,true,false,false,false]);
  const [webhookToggles,setWebhookToggles]= useState([true,true,true,true,true,false]);

  const navItems = [
    {id:"overview",   icon:"grid",     label:"Overview"},
    {id:"users",      icon:"users",    label:"Users"},
    {id:"events",     icon:"calendar", label:"Events"},
    {id:"approvals",  icon:"shield",   label:"Approvals"},
    {id:"analytics",  icon:"bar",      label:"Analytics"},
    {id:"revenue",    icon:"trending", label:"Revenue"},
    {id:"support",    icon:"shield",   label:"Support", badge:"3"},
    {id:"gear",       icon:"gear",     label:"Settings"},
  ];

  const handleNav = p => {
    if(p==="gear") nav("adminSettings");
    else nav("admin");
  };

  const saveFn = (key) => { setSaved(p=>({...p,[key]:true})); setTimeout(()=>setSaved(p=>({...p,[key]:false})),2200); };

  const tabs = [
    {id:"gateway",  label:"Payment Gateway"},
    {id:"plans",    label:"Plan Pricing"},
    {id:"tax",      label:"Tax & GST"},
    {id:"payouts",  label:"Payouts & Bank"},
    {id:"webhooks", label:"Webhook Logs"},
  ];

  const Toggle = ({ on, onClick }) => (
    <div onClick={onClick} style={{ width:44,height:24,borderRadius:12,background:on?C.teal:C.slateXL,position:"relative",cursor:"pointer",flexShrink:0,transition:"background 0.2s" }}>
      <div style={{ position:"absolute",top:2,left:on?22:2,width:20,height:20,borderRadius:10,background:"#fff",transition:"left 0.2s",boxShadow:"0 1px 4px rgba(0,0,0,0.15)" }}/>
    </div>
  );

  const Field = ({ label, hint, children }) => (
    <div style={{ marginBottom:18 }}>
      <label style={{ display:"block",fontSize:13,fontWeight:600,color:C.text,marginBottom:4 }}>{label}</label>
      {hint && <div style={{ fontSize:12,color:C.muted,marginBottom:6 }}>{hint}</div>}
      {children}
    </div>
  );

  const Input = ({ value, onChange, type="text", mono=false, readOnly=false, suffix }) => (
    <div style={{ position:"relative",display:"flex",alignItems:"center" }}>
      <input type={type} value={value} onChange={onChange} readOnly={readOnly}
        style={{ width:"100%",padding:"10px 14px",borderRadius:10,fontSize:13,fontFamily:mono?"monospace":"inherit",
          color:C.text,background:readOnly?"#f8fafc":"#fff",outline:"none",
          border:`1.5px solid ${C.border}`,transition:"border 0.18s",boxSizing:"border-box",
          paddingRight:suffix?42:14 }}
        onFocus={e=>{ if(!readOnly) e.target.style.borderColor=C.teal; }}
        onBlur={e=>e.target.style.borderColor=C.border}/>
      {suffix && <div style={{ position:"absolute",right:12,fontSize:12,color:C.muted,fontWeight:600 }}>{suffix}</div>}
    </div>
  );

  const Section = ({ title, children }) => (
    <div style={{ marginBottom:28 }}>
      <div style={{ fontSize:11,fontWeight:700,color:C.muted,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:14 }}>{title}</div>
      {children}
    </div>
  );

  // ── GATEWAY TAB ──
  const gatewayTab = (
    <div>
      {/* Live / Test mode banner */}
      <Card style={{ padding:16,marginBottom:20,background:testMode?"rgba(245,158,11,0.05)":"rgba(16,185,129,0.05)",border:`1.5px solid ${testMode?"rgba(245,158,11,0.3)":"rgba(16,185,129,0.3)"}` }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
          <div style={{ display:"flex",alignItems:"center",gap:10 }}>
            <div style={{ width:10,height:10,borderRadius:5,background:testMode?C.amber:C.green }}/>
            <div>
              <div style={{ fontWeight:700,fontSize:14,color:C.text }}>{testMode?"Test Mode Active":"Live Mode Active"}</div>
              <div style={{ fontSize:12,color:C.muted }}>{testMode?"Payments are simulated — no real money moves":"Real payments are being processed"}</div>
            </div>
          </div>
          <div style={{ display:"flex",alignItems:"center",gap:10 }}>
            <span style={{ fontSize:12,color:C.muted }}>Test</span>
            <Toggle on={!testMode} onClick={()=>setTestMode(p=>!p)}/>
            <span style={{ fontSize:12,color:C.muted }}>Live</span>
          </div>
        </div>
      </Card>

      <Section title="Razorpay Configuration">
        <Card style={{ padding:20,marginBottom:14 }}>
          <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:18 }}>
            <div style={{ width:36,height:36,borderRadius:10,background:"#3395FF18",display:"flex",alignItems:"center",justifyContent:"center" }}>
              <Icon d={I.dollar} size={18} style={{ color:"#3395FF" }}/>
            </div>
            <div>
              <div style={{ fontWeight:700,fontSize:14,color:C.text }}>Razorpay</div>
              <div style={{ fontSize:12,color:C.muted }}>Primary payment gateway for INR transactions</div>
            </div>
            <Badge v="green" style={{ marginLeft:"auto" }}>Connected</Badge>
          </div>

          <Field label={testMode?"Test API Key":"Live API Key"} hint="Found in your Razorpay Dashboard → Settings → API Keys">
            <Input value={razorpayKey} onChange={e=>setRazorpayKey(e.target.value)} mono/>
          </Field>

          <Field label="API Secret" hint="Keep this confidential — never expose in client-side code">
            <div style={{ position:"relative",display:"flex",alignItems:"center" }}>
              <input type={showSecret?"text":"password"} value={razorpaySecret} onChange={e=>setRazorpaySecret(e.target.value)}
                style={{ width:"100%",padding:"10px 44px 10px 14px",borderRadius:10,fontSize:13,fontFamily:"monospace",
                  color:C.text,background:"#fff",outline:"none",border:`1.5px solid ${C.border}`,
                  transition:"border 0.18s",boxSizing:"border-box" }}
                onFocus={e=>e.target.style.borderColor=C.teal} onBlur={e=>e.target.style.borderColor=C.border}/>
              <button onClick={()=>setShowSecret(p=>!p)} style={{ position:"absolute",right:12,background:"none",border:"none",cursor:"pointer",color:C.muted,display:"flex",padding:2 }}>
                <Icon d={I.eye} size={16}/>
              </button>
            </div>
          </Field>

          <Field label="Webhook Secret" hint="Used to verify webhook signatures from Razorpay">
            <div style={{ position:"relative",display:"flex",alignItems:"center" }}>
              <input type={showWebhook?"text":"password"} value={webhookSecret} onChange={e=>setWebhookSecret(e.target.value)}
                style={{ width:"100%",padding:"10px 44px 10px 14px",borderRadius:10,fontSize:13,fontFamily:"monospace",
                  color:C.text,background:"#fff",outline:"none",border:`1.5px solid ${C.border}`,
                  transition:"border 0.18s",boxSizing:"border-box" }}
                onFocus={e=>e.target.style.borderColor=C.teal} onBlur={e=>e.target.style.borderColor=C.border}/>
              <button onClick={()=>setShowWebhook(p=>!p)} style={{ position:"absolute",right:12,background:"none",border:"none",cursor:"pointer",color:C.muted,display:"flex",padding:2 }}>
                <Icon d={I.eye} size={16}/>
              </button>
            </div>
          </Field>

          <Field label="Webhook URL" hint="Add this URL in your Razorpay Dashboard → Webhooks">
            <div style={{ display:"flex",gap:8 }}>
              <Input value="https://api.fundlink.in/webhooks/razorpay" readOnly mono/>
              <button onClick={()=>{}} style={{ padding:"10px 14px",borderRadius:10,border:`1.5px solid ${C.border}`,background:"#fff",cursor:"pointer",fontSize:12,fontWeight:600,color:C.muted,whiteSpace:"nowrap",fontFamily:"inherit" }}>Copy</button>
            </div>
          </Field>

          <div style={{ display:"flex",gap:10 }}>
            <Btn v="secondary" sz="sm" onClick={()=>{}}>Test Connection</Btn>
            <Btn v="primary" full onClick={()=>saveFn("gateway")}>{saved.gateway?"✓ Saved":"Save Gateway Config"}</Btn>
          </div>
        </Card>
      </Section>

      <Section title="Payment Methods">
        <Card style={{ overflow:"hidden" }}>
          {[
            {label:"UPI / QR Code",      desc:"PhonePe, GPay, Paytm, BHIM",     icon:"⚡"},
            {label:"Cards",              desc:"Visa, Mastercard, RuPay, Amex",   icon:"💳"},
            {label:"Net Banking",        desc:"100+ banks supported",             icon:"🏦"},
            {label:"Wallets",            desc:"Paytm, MobiKwik, Freecharge",     icon:"👛"},
            {label:"EMI",                desc:"No-cost EMI on HDFC, ICICI, Axis", icon:"📅"},
            {label:"International Cards",desc:"Enable for global investors",      icon:"🌍"},
          ].map((m,i,arr)=>(
            <div key={i} style={{ display:"flex",alignItems:"center",gap:14,padding:"14px 18px",borderBottom:i<arr.length-1?`1px solid ${C.slateXL}`:"none" }}>
              <div style={{ width:36,height:36,borderRadius:10,background:C.offWhite,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0 }}>{m.icon}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:600,fontSize:14,color:C.text }}>{m.label}</div>
                <div style={{ fontSize:12,color:C.muted }}>{m.desc}</div>
              </div>
              <Toggle on={payMethods[i]} onClick={()=>setPayMethods(p=>p.map((v,j)=>j===i?!v:v))}/>
            </div>
          ))}
        </Card>
      </Section>

      <Section title="Settlement">
        <Card style={{ padding:20 }}>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:14 }}>
            <Field label="Settlement Cycle">
              <FSelect value={settleDays} onChange={e=>setSettleDays(e.target.value)} options={[{value:"1",label:"T+1 (Next Day)"},{value:"2",label:"T+2 (Default)"},{value:"3",label:"T+3"},{value:"7",label:"T+7 (Weekly)"}]}/>
            </Field>
            <Field label="Default Currency">
              <FSelect value={currency} onChange={e=>setCurrency(e.target.value)} options={[{value:"INR",label:"INR — Indian Rupee"},{value:"USD",label:"USD — US Dollar"},{value:"SGD",label:"SGD — Singapore Dollar"}]}/>
            </Field>
          </div>
        </Card>
      </Section>
    </div>
  );

  // ── PLANS TAB ──
  const plansTab = (
    <div>
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16 }}>
        <div>
          <h3 style={{ fontSize:16,fontWeight:700,color:C.text,marginBottom:2 }}>Subscription Plans</h3>
          <div style={{ fontSize:13,color:C.muted }}>Manage pricing and availability for each plan tier.</div>
        </div>
      </div>

      <div style={{ display:"flex",flexDirection:"column",gap:12,marginBottom:24 }}>
        {planPrices.map((plan,idx)=>(
          <Card key={plan.id} style={{ padding:20 }}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:editingPlan===plan.id?16:0 }}>
              <div style={{ display:"flex",alignItems:"center",gap:12 }}>
                <div style={{ width:40,height:40,borderRadius:12,background:plan.id==="pro"?"#6366F118":plan.id==="growth"?C.tealDim:plan.id==="enterprise"?"rgba(245,158,11,0.1)":C.offWhite,display:"flex",alignItems:"center",justifyContent:"center" }}>
                  <Icon d={I.star} size={18} style={{ color:plan.id==="pro"?"#6366F1":plan.id==="growth"?C.teal:plan.id==="enterprise"?C.amber:C.slateL }}/>
                </div>
                <div>
                  <div style={{ fontWeight:700,fontSize:15,color:C.text }}>{plan.name}</div>
                  <div style={{ fontSize:12,color:C.muted }}>
                    {plan.monthlyINR===0?"Free":(`₹${plan.monthlyINR.toLocaleString()}/mo · ₹${plan.annualINR.toLocaleString()}/yr`)}
                    {plan.monthlyUSD>0 && ` · $${plan.monthlyUSD}/mo`}
                  </div>
                </div>
              </div>
              <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                <Badge v={plan.active?"green":"red"}>{plan.active?"Active":"Inactive"}</Badge>
                <Btn v="secondary" sz="sm" onClick={()=>setEditingPlan(editingPlan===plan.id?null:plan.id)}>
                  {editingPlan===plan.id?"Cancel":"Edit"}
                </Btn>
              </div>
            </div>

            {editingPlan===plan.id && (
              <div style={{ borderTop:`1px solid ${C.border}`,paddingTop:16,marginTop:2 }}>
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12 }}>
                  <Field label="Monthly Price (INR)">
                    <Input value={plan.monthlyINR} onChange={e=>setPlanPrices(p=>p.map((pl,i)=>i===idx?{...pl,monthlyINR:e.target.value}:pl))} suffix="₹"/>
                  </Field>
                  <Field label="Annual Price (INR)">
                    <Input value={plan.annualINR} onChange={e=>setPlanPrices(p=>p.map((pl,i)=>i===idx?{...pl,annualINR:e.target.value}:pl))} suffix="₹"/>
                  </Field>
                  <Field label="Monthly Price (USD)">
                    <Input value={plan.monthlyUSD} onChange={e=>setPlanPrices(p=>p.map((pl,i)=>i===idx?{...pl,monthlyUSD:e.target.value}:pl))} suffix="$"/>
                  </Field>
                  <Field label="Annual Price (USD)">
                    <Input value={plan.annualUSD} onChange={e=>setPlanPrices(p=>p.map((pl,i)=>i===idx?{...pl,annualUSD:e.target.value}:pl))} suffix="$"/>
                  </Field>
                </div>
                <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 14px",borderRadius:10,background:C.offWhite,marginBottom:12 }}>
                  <div>
                    <div style={{ fontSize:13,fontWeight:600,color:C.text }}>Plan Active</div>
                    <div style={{ fontSize:12,color:C.muted }}>Visible to users on pricing page</div>
                  </div>
                  <Toggle on={plan.active} onClick={()=>setPlanPrices(p=>p.map((pl,i)=>i===idx?{...pl,active:!pl.active}:pl))}/>
                </div>
                <Btn v="primary" full onClick={()=>{ setEditingPlan(null); saveFn("plans"); }}>{saved.plans?"✓ Saved":"Save Plan"}</Btn>
              </div>
            )}
          </Card>
        ))}
      </div>

      <Card style={{ padding:20 }}>
        <div style={{ fontWeight:700,fontSize:14,color:C.text,marginBottom:12 }}>Trial & Discount Settings</div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:14 }}>
          <Field label="Free Trial Period" hint="Days before first charge">
            <FSelect value="14" onChange={()=>{}} options={[{value:"0",label:"No Trial"},{value:"7",label:"7 Days"},{value:"14",label:"14 Days"},{value:"30",label:"30 Days"}]}/>
          </Field>
          <Field label="Annual Discount" hint="Shown to users on pricing page">
            <Input value="17" suffix="%" onChange={()=>{}}/>
          </Field>
        </div>
        <Btn v="primary" full onClick={()=>saveFn("trial")}>{saved.trial?"✓ Saved":"Save Trial Settings"}</Btn>
      </Card>
    </div>
  );

  // ── TAX TAB ──
  const taxTab = (
    <div>
      <Section title="GST Configuration">
        <Card style={{ padding:20,marginBottom:14 }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 14px",borderRadius:10,background:C.offWhite,marginBottom:16 }}>
            <div>
              <div style={{ fontSize:13,fontWeight:600,color:C.text }}>GST Enabled</div>
              <div style={{ fontSize:12,color:C.muted }}>Apply GST to all subscription invoices</div>
            </div>
            <Toggle on={gstEnabled} onClick={()=>setGstEnabled(p=>!p)}/>
          </div>

          {gstEnabled && (
            <div>
              <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:14,marginBottom:0 }}>
                <Field label="GST Registration Number">
                  <Input value={gstNo} onChange={e=>setGstNo(e.target.value)} mono/>
                </Field>
                <Field label="GST Rate">
                  <FSelect value={gstRate} onChange={e=>setGstRate(e.target.value)} options={[{value:"5",label:"5%"},{value:"12",label:"12%"},{value:"18",label:"18% (Standard)"},{value:"28",label:"28%"}]}/>
                </Field>
              </div>
              <div style={{ padding:"12px 14px",borderRadius:10,background:"rgba(31,163,163,0.06)",border:`1px solid ${C.tealBd}`,fontSize:12,color:C.teal,marginBottom:14 }}>
                ₹1,999 plan → ₹1,999 + ₹359.82 GST ({gstRate}%) = <strong>₹2,358.82 billed</strong>
              </div>
            </div>
          )}
          <Btn v="primary" full onClick={()=>saveFn("gst")}>{saved.gst?"✓ Saved":"Save GST Settings"}</Btn>
        </Card>
      </Section>

      <Section title="Invoice Configuration">
        <Card style={{ padding:20,marginBottom:14 }}>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:14 }}>
            <Field label="Invoice Number Prefix">
              <Input value={invoicePrefix} onChange={e=>setInvoicePrefix(e.target.value)} mono/>
            </Field>
            <Field label="Next Invoice Number">
              <Input value="FL-INV-1247" readOnly mono/>
            </Field>
          </div>
          <Field label="Business Address" hint="Printed on all invoices">
            <textarea rows={3} defaultValue={"FundLink Technologies Pvt. Ltd.\n91 Springboard, Koramangala\nBengaluru, Karnataka 560034"}
              style={{ width:"100%",padding:"10px 14px",borderRadius:10,fontSize:13,fontFamily:"inherit",color:C.text,background:"#fff",outline:"none",border:`1.5px solid ${C.border}`,resize:"vertical",boxSizing:"border-box" }}
              onFocus={e=>e.target.style.borderColor=C.teal} onBlur={e=>e.target.style.borderColor=C.border}/>
          </Field>
          <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 14px",borderRadius:10,background:C.offWhite,marginBottom:14 }}>
            <div>
              <div style={{ fontSize:13,fontWeight:600,color:C.text }}>Auto-send Invoices</div>
              <div style={{ fontSize:12,color:C.muted }}>Email PDF invoice to user on every charge</div>
            </div>
            <Toggle on={true} onClick={()=>{}}/>
          </div>
          <Btn v="primary" full onClick={()=>saveFn("invoice")}>{saved.invoice?"✓ Saved":"Save Invoice Settings"}</Btn>
        </Card>
      </Section>

      <Section title="TDS / Withholding Tax">
        <Card style={{ padding:20 }}>
          <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 14px",borderRadius:10,background:C.offWhite,marginBottom:14 }}>
            <div>
              <div style={{ fontSize:13,fontWeight:600,color:C.text }}>Apply TDS on Affiliate Payouts</div>
              <div style={{ fontSize:12,color:C.muted }}>Deduct 10% TDS on payouts above ₹30,000/year (Sec 194H)</div>
            </div>
            <Toggle on={true} onClick={()=>{}}/>
          </div>
          <Field label="PAN Number" hint="Required for TDS filings">
            <Input value="AABCF1234A" mono onChange={()=>{}}/>
          </Field>
          <Btn v="primary" full onClick={()=>saveFn("tds")}>{saved.tds?"✓ Saved":"Save TDS Settings"}</Btn>
        </Card>
      </Section>
    </div>
  );

  // ── PAYOUTS TAB ──
  const payoutsTab = (
    <div>
      <Section title="Bank Account">
        <Card style={{ padding:20,marginBottom:14 }}>
          <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:20,padding:16,borderRadius:12,background:C.offWhite }}>
            <div style={{ width:44,height:44,borderRadius:12,background:"#fff",border:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0 }}>🏦</div>
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:700,fontSize:14,color:C.text }}>{bankName}</div>
              <div style={{ fontSize:12,color:C.muted }}>Account ending {bankAccount.slice(-4)} · IFSC {bankIfsc}</div>
            </div>
            <Badge v="green">Verified</Badge>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:14 }}>
            <Field label="Bank Name">
              <Input value={bankName} onChange={e=>setBankName(e.target.value)}/>
            </Field>
            <Field label="Account Number">
              <Input value={bankAccount} onChange={e=>setBankAccount(e.target.value)} mono/>
            </Field>
            <Field label="IFSC Code">
              <Input value={bankIfsc} onChange={e=>setBankIfsc(e.target.value)} mono/>
            </Field>
            <Field label="Account Type">
              <FSelect value="current" onChange={()=>{}} options={[{value:"current",label:"Current Account"},{value:"savings",label:"Savings Account"}]}/>
            </Field>
          </div>
          <Btn v="primary" full onClick={()=>saveFn("bank")}>{saved.bank?"✓ Saved":"Save Bank Details"}</Btn>
        </Card>
      </Section>

      <Section title="Payout Schedule">
        <Card style={{ padding:20,marginBottom:14 }}>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:14 }}>
            <Field label="Minimum Payout Threshold" hint="Won't process payouts below this amount">
              <Input value={payoutThresh} onChange={e=>setPayoutThresh(e.target.value)} suffix="₹"/>
            </Field>
            <Field label="Payout Day of Month" hint="1 = 1st of every month">
              <FSelect value={payoutDay} onChange={e=>setPayoutDay(e.target.value)} options={[{value:"1",label:"1st"},{value:"15",label:"15th"},{value:"last",label:"Last day"}]}/>
            </Field>
          </div>
          <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 14px",borderRadius:10,background:C.offWhite,marginBottom:14 }}>
            <div>
              <div style={{ fontSize:13,fontWeight:600,color:C.text }}>Auto-process Payouts</div>
              <div style={{ fontSize:12,color:C.muted }}>Automatically initiate affiliate payouts on schedule</div>
            </div>
            <Toggle on={false} onClick={()=>{}}/>
          </div>
          <Btn v="primary" full onClick={()=>saveFn("payout")}>{saved.payout?"✓ Saved":"Save Payout Settings"}</Btn>
        </Card>
      </Section>

      <Section title="Refund Policy">
        <Card style={{ padding:20 }}>
          <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 14px",borderRadius:10,background:C.offWhite,marginBottom:14 }}>
            <div>
              <div style={{ fontSize:13,fontWeight:600,color:C.text }}>Auto-refund on Cancellation</div>
              <div style={{ fontSize:12,color:C.muted }}>Automatically process prorated refund when user cancels</div>
            </div>
            <Toggle on={autoRefund} onClick={()=>setAutoRefund(p=>!p)}/>
          </div>
          {autoRefund && (
            <Field label="Refund Window (Days)" hint="Maximum days after purchase to allow refund">
              <FSelect value={refundDays} onChange={e=>setRefundDays(e.target.value)} options={[{value:"0",label:"No refunds"},{value:"3",label:"3 days"},{value:"7",label:"7 days (Recommended)"},{value:"14",label:"14 days"},{value:"30",label:"30 days"}]}/>
            </Field>
          )}
          <Btn v="primary" full onClick={()=>saveFn("refund")}>{saved.refund?"✓ Saved":"Save Refund Policy"}</Btn>
        </Card>
      </Section>
    </div>
  );

  // ── WEBHOOKS TAB ──
  const webhooksTab = (
    <div>
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16 }}>
        <div>
          <h3 style={{ fontSize:16,fontWeight:700,color:C.text,marginBottom:2 }}>Webhook Event Log</h3>
          <div style={{ fontSize:13,color:C.muted }}>Recent payment events from Razorpay</div>
        </div>
        <Btn v="secondary" sz="sm" onClick={()=>setWebhookLog(p=>[{id:`evt_${Date.now()}`,event:"payment.captured",amount:"₹1,999",user:"Test User",time:"just now",status:"ok"},...p.slice(0,9)])}>Simulate Event</Btn>
      </div>

      <Card style={{ overflow:"hidden",marginBottom:20 }}>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%",borderCollapse:"collapse",minWidth:520 }}>
            <thead>
              <tr style={{ background:C.offWhite }}>
                {["Event","Amount","User","Time","Status"].map(h=>(
                  <th key={h} style={{ padding:"10px 14px",textAlign:"left",fontSize:11,fontWeight:700,color:C.muted,letterSpacing:"0.05em",textTransform:"uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {webhookLog.map((ev,i)=>(
                <tr key={ev.id} style={{ borderBottom:i<webhookLog.length-1?`1px solid ${C.slateXL}`:"none",transition:"background 0.12s" }}
                  onMouseEnter={e=>e.currentTarget.style.background=C.offWhite}
                  onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                  <td style={{ padding:"12px 14px" }}>
                    <div style={{ fontSize:12,fontWeight:700,color:C.text,fontFamily:"monospace" }}>{ev.event}</div>
                    <div style={{ fontSize:11,color:C.muted,marginTop:2 }}>{ev.id}</div>
                  </td>
                  <td style={{ padding:"12px 14px",fontWeight:600,fontSize:13,color:C.text }}>{ev.amount}</td>
                  <td style={{ padding:"12px 14px",fontSize:13,color:C.text }}>{ev.user}</td>
                  <td style={{ padding:"12px 14px",fontSize:12,color:C.muted }}>{ev.time}</td>
                  <td style={{ padding:"12px 14px" }}>
                    <div style={{ display:"inline-flex",alignItems:"center",gap:5,padding:"3px 10px",borderRadius:99,fontSize:11,fontWeight:700,background:ev.status==="ok"?"rgba(16,185,129,0.1)":"rgba(239,68,68,0.1)",color:ev.status==="ok"?C.green:C.red }}>
                      <div style={{ width:6,height:6,borderRadius:3,background:ev.status==="ok"?C.green:C.red }}/>
                      {ev.status==="ok"?"Success":"Failed"}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Section title="Subscribed Webhook Events">
        <Card style={{ overflow:"hidden" }}>
          {[
            {event:"payment.captured",      desc:"Fired when a payment succeeds"},
            {event:"payment.failed",        desc:"Fired when a payment attempt fails"},
            {event:"subscription.charged",  desc:"Recurring charge processed successfully"},
            {event:"subscription.cancelled",desc:"User cancels their subscription"},
            {event:"refund.created",        desc:"A refund has been initiated"},
            {event:"refund.processed",      desc:"Refund successfully returned to customer"},
          ].map((w,i,arr)=>(
            <div key={i} style={{ display:"flex",alignItems:"center",gap:14,padding:"13px 18px",borderBottom:i<arr.length-1?`1px solid ${C.slateXL}`:"none" }}>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:600,fontSize:13,color:C.text,fontFamily:"monospace" }}>{w.event}</div>
                <div style={{ fontSize:12,color:C.muted }}>{w.desc}</div>
              </div>
              <Toggle on={webhookToggles[i]} onClick={()=>setWebhookToggles(p=>p.map((v,j)=>j===i?!v:v))}/>
            </div>
          ))}
        </Card>
      </Section>
    </div>
  );

  const tabContent = { gateway:gatewayTab, plans:plansTab, tax:taxTab, payouts:payoutsTab, webhooks:webhooksTab };

  return (
    <div style={{ background:C.offWhite,minHeight:"100vh" }}>
      <Sidebar nav={navItems} active="revenue" onSelect={handleNav} role="Super Admin" open={sidebar} onClose={()=>setSidebar(false)} onSignOut={()=>nav("landing")}/>
      <div style={{ paddingBottom:80 }}>
        {/* Admin top bar */}
        <div style={{ height:60,background:C.navy,borderBottom:"1px solid rgba(255,255,255,0.08)",display:"flex",alignItems:"center",padding:"0 20px",position:"sticky",top:0,zIndex:100 }}>
          <button onClick={()=>setSidebar(true)} style={{ background:"none",border:"none",cursor:"pointer",padding:4,color:"rgba(255,255,255,0.5)",marginRight:14,display:"flex" }}>
            <Icon d={I.menu} size={22}/>
          </button>
          <div style={{ flex:1,display:"flex",alignItems:"center",gap:9 }}>
            <div style={{ width:26,height:26,borderRadius:7,background:C.teal,display:"flex",alignItems:"center",justifyContent:"center" }}>
              <Icon d={I.link} size={13} sw={2.5}/>
            </div>
            <span style={{ color:"#fff",fontWeight:800,fontSize:16,letterSpacing:"-0.02em" }}>FundLink <span style={{ color:"rgba(255,255,255,0.28)",fontWeight:400 }}>Admin</span></span>
          </div>
          <div style={{ display:"flex",alignItems:"center",gap:8 }}>
            <div style={{ width:7,height:7,borderRadius:4,background:testMode?C.amber:C.green }}/>
            <span style={{ color:"rgba(255,255,255,0.38)",fontSize:12 }}>{testMode?"Test Mode":"Live"}</span>
            <Avatar name="Admin" size={30}/>
          </div>
        </div>

        <div style={{ padding:20,maxWidth:720,margin:"0 auto" }}>
          <div style={{ marginBottom:20 }}>
            <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:6 }}>
              <button onClick={()=>nav("admin")} style={{ background:"none",border:"none",cursor:"pointer",padding:0,color:C.muted,display:"flex" }}>
                <Icon d={I.chevR} size={16} sw={2} style={{ transform:"rotate(180deg)" }}/>
              </button>
              <h1 style={{ fontSize:22,fontWeight:800,color:C.text,letterSpacing:"-0.02em" }}>Payment Setup</h1>
              {testMode && <Badge v="amber">Test Mode</Badge>}
            </div>
            <p style={{ fontSize:14,color:C.muted }}>Configure your payment gateway, pricing, tax settings, and payouts.</p>
          </div>

          {/* Tab bar */}
          <div style={{ display:"flex",gap:4,marginBottom:24,overflowX:"auto",padding:"2px 0" }}>
            {tabs.map(t=>(
              <button key={t.id} onClick={()=>setActiveTab(t.id)}
                style={{ padding:"8px 14px",borderRadius:9,border:"none",cursor:"pointer",fontFamily:"inherit",fontWeight:600,fontSize:13,whiteSpace:"nowrap",transition:"all 0.15s",
                  background:activeTab===t.id?C.navy:"transparent",
                  color:activeTab===t.id?"#fff":C.muted }}>
                {t.label}
              </button>
            ))}
          </div>

          {tabContent[activeTab]}
        </div>
      </div>
    </div>
  );
};

// ─── GLOBAL SEARCH PAGE ──────────────────────────────────────────────────────
const SearchPage = ({ nav }) => {
  const [query,       setQuery]       = useState("");
  const [filter,      setFilter]      = useState("all");
  const [focused,     setFocused]     = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [sector,      setSector]      = useState("all");
  const [stage,       setStage]       = useState("all");
  const [location,    setLocation]    = useState("all");
  const [recentSearches, setRecentSearches] = useState(["CleanTech startups","Seed stage","Bengaluru founders","Angel investors"]);
  const [savedItems,  setSavedItems]  = useState(new Set());

  const toggleSave = name => setSavedItems(p=>{ const n=new Set(p); n.has(name)?n.delete(name):n.add(name); return n; });

  const allResults = [
    {type:"startup",  name:"GreenTech Solutions",  desc:"Building solar micro-grid solutions for tier-2 cities. Proven unit economics, scaling fast.",    sector:"CleanTech",  stage:"Seed",        location:"Bengaluru", ask:"₹2.5 Cr", mrr:"₹18L",   growth:"28%", tags:["solar","cleantech","b2b"],      verified:true,  team:4},
    {type:"startup",  name:"MediAI",               desc:"AI-powered diagnostic platform connecting patients to specialists. 8K+ active users.",            sector:"HealthTech", stage:"Pre-Series A", location:"Mumbai",    ask:"₹5 Cr",   mrr:"₹32L",   growth:"41%", tags:["AI","healthtech","diagnostics"], verified:true,  team:9},
    {type:"startup",  name:"AgriLink",             desc:"Direct-to-consumer agri marketplace connecting 1200+ farmers to urban buyers.",                   sector:"AgriTech",   stage:"Seed",        location:"Pune",      ask:"₹1.8 Cr", mrr:"₹9L",    growth:"19%", tags:["agritech","marketplace"],       verified:false, team:6},
    {type:"startup",  name:"EduNation",            desc:"Gamified learning platform for K-12 students. 3500+ active learners, 55% MoM growth.",            sector:"EdTech",     stage:"Pre-Seed",    location:"Hyderabad", ask:"₹80L",    mrr:"₹4L",    growth:"55%", tags:["edtech","gamification"],       verified:true,  team:3},
    {type:"startup",  name:"FinEase",              desc:"SMB lending platform using alternative credit scoring. ₹1.2 Cr MRR, Series A fundraising.",       sector:"FinTech",    stage:"Series A",    location:"Chennai",   ask:"₹15 Cr",  mrr:"₹1.2Cr", growth:"22%", tags:["fintech","lending","smb"],     verified:true,  team:22},
    {type:"startup",  name:"LogiTrack",            desc:"Last-mile logistics SaaS for D2C brands. Real-time tracking and route optimization.",              sector:"Logistics",  stage:"Seed",        location:"Delhi",     ask:"₹3 Cr",   mrr:"₹21L",   growth:"33%", tags:["logistics","saas","d2c"],      verified:false, team:11},
    {type:"investor", name:"Ananya Krishnan",      desc:"Partner at Sequoia Capital India. Focus: SaaS, FinTech, CleanTech. 22 portfolio companies.",       sector:"SaaS",       stage:"Seed",        location:"Mumbai",    ticket:"₹50L–5Cr",  exits:3, tags:["saas","fintech","cleantech"],  verified:true},
    {type:"investor", name:"Rajiv Malhotra",       desc:"Principal at Blume Ventures. Deep tech and consumer internet. Led 18 deals in 5 years.",           sector:"DeepTech",   stage:"Pre-Series A",location:"Bengaluru", ticket:"₹25L–2Cr",  exits:2, tags:["deeptech","consumer","b2b"],  verified:true},
    {type:"investor", name:"Vikram Nair",          desc:"Angel investor, ex-Flipkart. Consumer, agritech, edtech. Writes ₹10L–50L cheques.",               sector:"Consumer",   stage:"Pre-Seed",    location:"Bengaluru", ticket:"₹10L–50L",  exits:1, tags:["consumer","agritech","edtech"],verified:false},
    {type:"investor", name:"Sunita Patel",         desc:"Managing Director, Kalaari Capital. Series A specialist. 40+ portfolio companies.",                sector:"FinTech",    stage:"Series A",    location:"Bengaluru", ticket:"₹2Cr–10Cr", exits:7, tags:["fintech","healthtech","saas"], verified:true},
    {type:"event",    name:"Delhi Demo Day",       desc:"Pitch to 50+ investors. 12 startups presenting. Hosted by Startup India.",                         sector:"All",        stage:"All",         location:"Delhi",     date:"Mar 15",  registered:340, tags:["demo","pitch","investors"],    featured:true},
    {type:"event",    name:"Mumbai Pitch Night",   desc:"Curated pitch event for seed-stage startups. Limited to 8 presenting companies.",                  sector:"All",        stage:"Seed",        location:"Mumbai",    date:"Mar 22",  registered:210, tags:["pitch","seed","networking"],   featured:false},
    {type:"event",    name:"Bangalore VC Connect", desc:"Informal networking dinner for founders and investors. 60+ VCs confirmed attending.",              sector:"All",        stage:"All",         location:"Bengaluru", date:"Apr 1",   registered:180, tags:["networking","vc","dinner"],    featured:true},
    {type:"event",    name:"Hyderabad Funding Fair",desc:"Full-day event with panel discussions, 1:1 meetings, and startup showcase.",                     sector:"All",        stage:"All",         location:"Hyderabad", date:"Apr 8",   registered:420, tags:["funding","showcase","panels"], featured:false},
    {type:"partner",  name:"NASSCOM Foundation",  desc:"India's premier tech industry association. Cohort programs, mentorship, policy access.",            sector:"Technology", stage:"All",         location:"Delhi",     services:"Mentorship, Cohorts, Policy", tags:["accelerator","mentorship"],  verified:true},
    {type:"partner",  name:"T-Hub",               desc:"Asia's largest startup incubator. Grants, workspace, investor connects, and global exposure.",      sector:"All",        stage:"Pre-Seed",    location:"Hyderabad", services:"Grants, Workspace, Connects", tags:["incubator","grants","space"], verified:true},
    {type:"partner",  name:"iCreate",             desc:"Government-backed accelerator program with non-dilutive funding up to ₹25L.",                       sector:"Hardware",   stage:"Pre-Seed",    location:"Ahmedabad", services:"Funding, Mentorship, IP",    tags:["hardware","government","grant"],verified:false},
  ];

  const typeIcon  = t => t==="startup"?"🚀":t==="investor"?"💼":t==="event"?"📅":"🤝";
  const typeColor = t => t==="startup"?C.teal:t==="investor"?"#6366F1":t==="event"?C.amber:C.green;
  const typeLabel = t => t==="startup"?"Startup":t==="investor"?"Investor":t==="event"?"Event":"Partner";

  const filtered = allResults.filter(r => {
    const matchesType = filter==="all" || r.type===filter;
    const q = query.toLowerCase().trim();
    const matchesQuery = !q
      || r.name.toLowerCase().includes(q)
      || r.desc.toLowerCase().includes(q)
      || r.tags.some(t=>t.includes(q))
      || (r.sector||"").toLowerCase().includes(q)
      || (r.location||"").toLowerCase().includes(q);
    const matchesSector = sector==="all" || (r.sector||"").toLowerCase()===sector.toLowerCase();
    const matchesStage  = stage==="all"  || (r.stage||"").toLowerCase()===stage.toLowerCase();
    const matchesLoc    = location==="all"|| (r.location||"").toLowerCase()===location.toLowerCase();
    return matchesType && matchesQuery && matchesSector && matchesStage && matchesLoc;
  });

  const grouped = filtered.reduce((acc,r)=>{
    const g = typeLabel(r.type)+"s";
    if(!acc[g]) acc[g]=[];
    acc[g].push(r);
    return acc;
  },{});

  const handleSearch = q => { setQuery(q); if(q&&!recentSearches.includes(q)) setRecentSearches(p=>[q,...p].slice(0,6)); };
  const clearSearch  = () => setQuery("");

  const trendingTags = ["CleanTech","Seed Stage","Bengaluru","FinTech","AI/ML","Delhi Demo Day","Series A","AgriTech"];
  const hasActiveFilters = sector!=="all"||stage!=="all"||location!=="all";

  const actionForType = t => t==="startup"?"View Profile":t==="investor"?"Request Intro":t==="event"?"Register":"Learn More";
  const routeForType  = t => t==="startup"?"founder":t==="investor"?"dealRoom":t==="event"?"founder":"partner";

  return (
    <div style={{ background:C.offWhite,minHeight:"100vh" }}>
      {/* Sticky search header */}
      <div style={{ background:"#fff",borderBottom:`1px solid ${C.border}`,position:"sticky",top:0,zIndex:100,padding:"12px 20px" }}>
        <div style={{ maxWidth:640,margin:"0 auto" }}>
          <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:0 }}>
            <button onClick={()=>nav("founder")} style={{ background:"none",border:"none",cursor:"pointer",padding:4,color:C.muted,display:"flex",flexShrink:0 }}>
              <Icon d={I.chevR} size={18} sw={2} style={{ transform:"rotate(180deg)" }}/>
            </button>
            <div style={{ position:"relative",flex:1 }}>
              <div style={{ position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",color:focused?C.teal:C.muted,display:"flex",transition:"color 0.15s" }}>
                <Icon d={I.search} size={18}/>
              </div>
              <input autoFocus value={query}
                onChange={e=>handleSearch(e.target.value)}
                onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}
                placeholder="Search startups, investors, events, partners…"
                style={{ width:"100%",padding:"12px 40px 12px 44px",borderRadius:12,fontSize:14,fontFamily:"inherit",color:C.text,background:focused?C.offWhite:"#fff",outline:"none",boxSizing:"border-box",border:`2px solid ${focused?C.teal:C.border}`,transition:"all 0.18s" }}/>
              {query && (
                <button onClick={clearSearch} style={{ position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:C.muted,display:"flex",padding:4 }}>
                  <Icon d={I.x} size={14}/>
                </button>
              )}
            </div>
            <button onClick={()=>setShowFilters(p=>!p)}
              style={{ padding:"10px 14px",borderRadius:11,border:`2px solid ${hasActiveFilters?C.teal:C.border}`,background:hasActiveFilters?C.tealDim:"#fff",color:hasActiveFilters?C.teal:C.muted,cursor:"pointer",fontFamily:"inherit",fontSize:12,fontWeight:700,display:"flex",alignItems:"center",gap:5,flexShrink:0,transition:"all 0.15s" }}>
              <Icon d={I.gear} size={14}/> {hasActiveFilters?"Filtered":"Filter"}
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:640,margin:"0 auto",padding:"16px 16px 80px" }}>

        {/* Advanced filters panel */}
        {showFilters && (
          <div style={{ background:"#fff",borderRadius:14,border:`1px solid ${C.border}`,padding:18,marginBottom:16,boxShadow:"0 4px 20px rgba(0,0,0,0.07)" }}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14 }}>
              <span style={{ fontWeight:700,fontSize:14,color:C.text }}>Advanced Filters</span>
              {hasActiveFilters && <button onClick={()=>{ setSector("all"); setStage("all"); setLocation("all"); }} style={{ background:"none",border:"none",cursor:"pointer",fontSize:12,color:C.teal,fontWeight:600,fontFamily:"inherit" }}>Clear all</button>}
            </div>
            <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:10 }}>
              <FSelect label="Sector" value={sector} onChange={e=>setSector(e.target.value)} options={[{value:"all",label:"All Sectors"},{value:"CleanTech",label:"CleanTech"},{value:"FinTech",label:"FinTech"},{value:"HealthTech",label:"HealthTech"},{value:"EdTech",label:"EdTech"},{value:"AgriTech",label:"AgriTech"},{value:"SaaS",label:"SaaS"},{value:"DeepTech",label:"DeepTech"},{value:"Logistics",label:"Logistics"},{value:"Consumer",label:"Consumer"}]}/>
              <FSelect label="Stage" value={stage} onChange={e=>setStage(e.target.value)} options={[{value:"all",label:"All Stages"},{value:"Pre-Seed",label:"Pre-Seed"},{value:"Seed",label:"Seed"},{value:"Pre-Series A",label:"Pre-Series A"},{value:"Series A",label:"Series A"}]}/>
              <FSelect label="Location" value={location} onChange={e=>setLocation(e.target.value)} options={[{value:"all",label:"All Cities"},{value:"Bengaluru",label:"Bengaluru"},{value:"Mumbai",label:"Mumbai"},{value:"Delhi",label:"Delhi"},{value:"Hyderabad",label:"Hyderabad"},{value:"Pune",label:"Pune"},{value:"Chennai",label:"Chennai"}]}/>
            </div>
          </div>
        )}

        {/* Type filter chips */}
        <div style={{ display:"flex",gap:6,marginBottom:16,overflowX:"auto",paddingBottom:2 }}>
          {[["all","All"],["startup","Startups"],["investor","Investors"],["event","Events"],["partner","Partners"]].map(([id,label])=>(
            <button key={id} onClick={()=>setFilter(id)}
              style={{ padding:"7px 14px",borderRadius:99,border:`1.5px solid ${filter===id?C.teal:C.border}`,background:filter===id?C.tealDim:"#fff",color:filter===id?C.teal:C.muted,fontSize:12,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap",fontFamily:"inherit",transition:"all 0.15s",flexShrink:0 }}>
              {label}
            </button>
          ))}
        </div>

        {/* Empty / pre-search state */}
        {!query && filtered.length===allResults.length && (
          <div>
            {recentSearches.length>0 && (
              <div style={{ marginBottom:24 }}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10 }}>
                  <span style={{ fontSize:12,fontWeight:700,color:C.muted,letterSpacing:"0.07em",textTransform:"uppercase" }}>Recent</span>
                  <button onClick={()=>setRecentSearches([])} style={{ background:"none",border:"none",cursor:"pointer",fontSize:12,color:C.muted,fontFamily:"inherit" }}>Clear</button>
                </div>
                <div style={{ display:"flex",flexDirection:"column",gap:2 }}>
                  {recentSearches.map((s,i)=>(
                    <div key={i} onClick={()=>setQuery(s)}
                      style={{ display:"flex",alignItems:"center",gap:12,padding:"11px 14px",borderRadius:10,cursor:"pointer",transition:"background 0.12s" }}
                      onMouseEnter={e=>e.currentTarget.style.background=C.offWhite}
                      onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                      <Icon d={I.search} size={14} style={{ color:C.muted }}/>
                      <span style={{ fontSize:14,color:C.text }}>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div style={{ marginBottom:24 }}>
              <div style={{ fontSize:12,fontWeight:700,color:C.muted,letterSpacing:"0.07em",textTransform:"uppercase",marginBottom:10 }}>Trending</div>
              <div style={{ display:"flex",gap:8,flexWrap:"wrap" }}>
                {trendingTags.map(tag=>(
                  <button key={tag} onClick={()=>handleSearch(tag)}
                    style={{ padding:"7px 14px",borderRadius:99,border:`1px solid ${C.border}`,background:"#fff",color:C.text,fontSize:12,fontWeight:500,cursor:"pointer",fontFamily:"inherit",transition:"all 0.15s" }}
                    onMouseEnter={e=>{ e.currentTarget.style.borderColor=C.teal; e.currentTarget.style.color=C.teal; e.currentTarget.style.background=C.tealDim; }}
                    onMouseLeave={e=>{ e.currentTarget.style.borderColor=C.border; e.currentTarget.style.color=C.text; e.currentTarget.style.background="#fff"; }}>
                    🔥 {tag}
                  </button>
                ))}
              </div>
            </div>
            {/* Quick stats */}
            <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:10,marginBottom:4 }}>
              {[["6","Startups",C.teal],["4","Investors","#6366F1"],["4","Events",C.amber],["3","Partners",C.green]].map(([v,l,c])=>(
                <div key={l} onClick={()=>setFilter(l.toLowerCase().slice(0,-1)+(l==="Startups"?"startup":l==="Investors"?"investor":l==="Events"?"event":"partner"))}
                  style={{ padding:"14px 10px",borderRadius:12,background:"#fff",border:`1px solid ${C.border}`,textAlign:"center",cursor:"pointer",transition:"all 0.15s" }}
                  onMouseEnter={e=>{ e.currentTarget.style.borderColor=c; e.currentTarget.style.boxShadow=`0 4px 16px ${c}18`; }}
                  onMouseLeave={e=>{ e.currentTarget.style.borderColor=C.border; e.currentTarget.style.boxShadow="none"; }}>
                  <div style={{ fontSize:22,fontWeight:800,color:c,letterSpacing:"-0.02em" }}>{v}</div>
                  <div style={{ fontSize:11,color:C.muted,marginTop:2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results count */}
        {query && (
          <div style={{ fontSize:13,color:C.muted,marginBottom:14 }}>
            <strong style={{ color:C.text }}>{filtered.length}</strong> result{filtered.length!==1?"s":""} for <strong style={{ color:C.text }}>"{query}"</strong>
            {hasActiveFilters && <span> · filtered</span>}
          </div>
        )}

        {/* No results */}
        {(query||hasActiveFilters) && filtered.length===0 && (
          <EmptyState
            icon="🔍"
            title="No results found"
            body="Try a different search term, or adjust your sector, stage, or location filters."
            cta="Clear All Filters"
            onCta={()=>{ clearSearch(); setSector("all"); setStage("all"); setLocation("all"); }}
          />
        )}

        {/* Grouped results */}
        {filtered.length>0 && (query||hasActiveFilters||filter!=="all") && (
          <div style={{ display:"flex",flexDirection:"column",gap:24 }}>
            {Object.entries(grouped).map(([group,items])=>(
              <div key={group}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10 }}>
                  <span style={{ fontSize:12,fontWeight:700,color:C.muted,letterSpacing:"0.07em",textTransform:"uppercase" }}>{group} ({items.length})</span>
                </div>
                <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
                  {items.map((r,i)=>(
                    <div key={i} style={{ background:"#fff",borderRadius:14,border:`1px solid ${C.border}`,padding:"18px",cursor:"pointer",transition:"all 0.15s" }}
                      onMouseEnter={e=>{ e.currentTarget.style.borderColor=typeColor(r.type); e.currentTarget.style.boxShadow=`0 4px 16px ${typeColor(r.type)}18`; }}
                      onMouseLeave={e=>{ e.currentTarget.style.borderColor=C.border; e.currentTarget.style.boxShadow="none"; }}>
                      <div style={{ display:"flex",alignItems:"flex-start",gap:14 }}>
                        {/* Icon */}
                        <div style={{ width:48,height:48,borderRadius:13,background:`${typeColor(r.type)}15`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0 }}>
                          {typeIcon(r.type)}
                        </div>
                        <div style={{ flex:1,minWidth:0 }}>
                          {/* Name + type badge */}
                          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8,marginBottom:4 }}>
                            <div style={{ display:"flex",alignItems:"center",gap:7 }}>
                              <span style={{ fontWeight:700,fontSize:15,color:C.text }}>{r.name}</span>
                              {r.verified && <VBadge/>}
                              {r.featured && <Badge v="teal">Featured</Badge>}
                            </div>
                            <button onClick={e=>{ e.stopPropagation(); toggleSave(r.name); }}
                              style={{ background:"none",border:"none",cursor:"pointer",color:savedItems.has(r.name)?C.teal:C.slateL,padding:2,flexShrink:0,transition:"color 0.15s" }}>
                              <Icon d={I.bookmark} size={17}/>
                            </button>
                          </div>
                          {/* Subtitle row */}
                          <div style={{ fontSize:12,color:C.muted,marginBottom:8 }}>
                            {r.type==="startup"  && <>{r.sector} · {r.stage} · {r.location}</>}
                            {r.type==="investor" && <>{r.location} · {r.ticket} ticket</>}
                            {r.type==="event"    && <>{r.date} · {r.location} · {r.registered} registered</>}
                            {r.type==="partner"  && <>{r.location} · {r.services}</>}
                          </div>
                          <div style={{ fontSize:13,color:C.muted,lineHeight:1.6,marginBottom:10 }}>{r.desc}</div>
                          {/* Metrics for startups */}
                          {r.type==="startup" && (
                            <div style={{ display:"flex",gap:10,marginBottom:10 }}>
                              {[["Ask",r.ask],[" MRR",r.mrr],["Growth",r.growth]].map(([l,v])=>(
                                <div key={l} style={{ padding:"5px 10px",borderRadius:7,background:C.offWhite,textAlign:"center" }}>
                                  <div style={{ fontSize:12,fontWeight:700,color:C.text }}>{v}</div>
                                  <div style={{ fontSize:10,color:C.muted }}>{l}</div>
                                </div>
                              ))}
                            </div>
                          )}
                          {/* Tags + action */}
                          <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8 }}>
                            <div style={{ display:"flex",gap:5,flexWrap:"wrap" }}>
                              {r.tags.slice(0,3).map(t=>(
                                <span key={t} onClick={e=>{ e.stopPropagation(); handleSearch(t); }}
                                  style={{ padding:"2px 8px",borderRadius:6,background:C.offWhite,border:`1px solid ${C.border}`,fontSize:11,color:C.muted,cursor:"pointer",transition:"all 0.12s" }}
                                  onMouseEnter={e=>{ e.currentTarget.style.borderColor=C.teal; e.currentTarget.style.color=C.teal; }}
                                  onMouseLeave={e=>{ e.currentTarget.style.borderColor=C.border; e.currentTarget.style.color=C.muted; }}>
                                  #{t}
                                </span>
                              ))}
                            </div>
                            <Btn v="primary" sz="sm" onClick={()=>nav(routeForType(r.type))}>{actionForType(r.type)}</Btn>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── INVESTOR DEAL ROOM VIEW ─────────────────────────────────────────────────
const InvestorDealRoom = ({ nav }) => {
  const [ndaStep,    setNdaStep]    = useState("request"); // request | nda | granted
  const [ndaChecked, setNdaChecked] = useState(false);
  const [requested,  setRequested]  = useState(false);
  const [activeTab,  setActiveTab]  = useState("docs");
  const [previewDoc, setPreviewDoc] = useState(null);
  const [msgText,    setMsgText]    = useState("");
  const [msgSent,    setMsgSent]    = useState(false);

  const startup = {
    name:"GreenTech Solutions", sector:"CleanTech", stage:"Seed", ask:"₹2.5 Cr",
    mrr:"₹18L", users:"2.4K", growth:"28%", founded:"2023", location:"Bengaluru",
    team:4, desc:"Building affordable solar micro-grid solutions for tier-2 and tier-3 cities across India. We have proven unit economics and are scaling to 50 cities in 18 months.",
  };

  const docs = [
    {id:1, name:"FundLink_PitchDeck_v3.pdf",  type:"Pitch Deck", ext:"PDF",  size:"4.2 MB", date:"Mar 1",  nda:false, locked:false},
    {id:2, name:"Executive_Summary.pdf",       type:"Summary",    ext:"PDF",  size:"0.9 MB", date:"Feb 20", nda:false, locked:false},
    {id:3, name:"Product_Demo_Video.mp4",      type:"Demo",       ext:"MP4",  size:"38 MB",  date:"Mar 3",  nda:false, locked:false},
    {id:4, name:"Financial_Model_2026.xlsx",   type:"Financials", ext:"XLSX", size:"1.8 MB", date:"Feb 28", nda:true,  locked:ndaStep!=="granted"},
    {id:5, name:"Cap_Table_Mar2026.xlsx",      type:"Cap Table",  ext:"XLSX", size:"0.3 MB", date:"Mar 4",  nda:true,  locked:ndaStep!=="granted"},
  ];

  const extColor = e => e==="PDF"?"rgba(239,68,68,0.12)":e==="XLSX"?"rgba(16,185,129,0.1)":e==="MP4"?"rgba(99,102,241,0.12)":"rgba(107,114,128,0.1)";
  const extText  = e => e==="PDF"?C.red:e==="XLSX"?C.green:e==="MP4"?"#6366F1":C.muted;
  const typeColor= t => t==="Pitch Deck"?"teal":t==="Financials"?"green":t==="Summary"?"indigo":t==="Legal"?"amber":"blue";

  const sendMsg = () => { if(!msgText.trim()) return; setMsgSent(true); setTimeout(()=>{ setMsgSent(false); setMsgText(""); },2000); };

  return (
    <div style={{ background:C.offWhite,minHeight:"100vh" }}>
      {/* Top bar */}
      <div style={{ height:56,background:"#fff",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",padding:"0 20px",position:"sticky",top:0,zIndex:100,gap:12 }}>
        <button onClick={()=>nav("investor")} style={{ background:"none",border:"none",cursor:"pointer",padding:4,color:C.muted,display:"flex" }}>
          <Icon d={I.chevR} size={18} sw={2} style={{ transform:"rotate(180deg)" }}/>
        </button>
        <Avatar name={startup.name} size={30}/>
        <div style={{ flex:1 }}>
          <div style={{ fontWeight:700,fontSize:14,color:C.text }}>{startup.name}</div>
          <div style={{ fontSize:11,color:C.muted }}>{startup.sector} · {startup.stage}</div>
        </div>
        <Badge v={ndaStep==="granted"?"green":ndaStep==="nda"?"amber":"slate"}>
          {ndaStep==="granted"?"Full Access":ndaStep==="nda"?"NDA Pending":"Limited Access"}
        </Badge>
      </div>

      <div style={{ padding:20,maxWidth:640,margin:"0 auto",paddingBottom:60 }}>

        {/* Startup header card */}
        <Card style={{ padding:22,marginBottom:16 }}>
          <div style={{ display:"flex",alignItems:"center",gap:14,marginBottom:16 }}>
            <Avatar name={startup.name} size={56}/>
            <div style={{ flex:1 }}>
              <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:4 }}>
                <span style={{ fontWeight:800,fontSize:18,color:C.text }}>{startup.name}</span>
                <VBadge/>
              </div>
              <div style={{ fontSize:13,color:C.muted }}>{startup.sector} · {startup.stage} · {startup.location}</div>
            </div>
          </div>
          <p style={{ fontSize:13,color:C.muted,lineHeight:1.7,marginBottom:14 }}>{startup.desc}</p>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(100px,1fr))",gap:10 }}>
            {[[startup.mrr,"MRR"],[startup.users,"Users"],[startup.growth,"Growth"]].map(([v,l])=>(
              <div key={l} style={{ textAlign:"center",padding:10,borderRadius:9,background:C.offWhite }}>
                <div style={{ fontSize:16,fontWeight:800,color:C.teal,letterSpacing:"-0.01em" }}>{v}</div>
                <div style={{ fontSize:10,color:C.muted,marginTop:2 }}>{l}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Access banner */}
        {ndaStep==="request" && !requested && (
          <div style={{ padding:"14px 18px",borderRadius:12,background:"rgba(99,102,241,0.07)",border:`1px solid rgba(99,102,241,0.2)`,marginBottom:16,display:"flex",justifyContent:"space-between",alignItems:"center",gap:12 }}>
            <div>
              <div style={{ fontWeight:700,fontSize:14,color:"#6366F1",marginBottom:2 }}>🔐 Unlock Full Data Room</div>
              <div style={{ fontSize:12,color:C.muted }}>Financial model and cap table require NDA + founder approval.</div>
            </div>
            <Btn v="primary" sz="sm" onClick={()=>{ setRequested(true); setNdaStep("nda"); }}>Request Access</Btn>
          </div>
        )}
        {ndaStep==="nda" && (
          <div style={{ padding:"14px 18px",borderRadius:12,background:"rgba(245,158,11,0.07)",border:`1px solid rgba(245,158,11,0.25)`,marginBottom:16 }}>
            <div style={{ fontWeight:700,fontSize:14,color:C.amber,marginBottom:8 }}>📝 Sign NDA to Continue</div>
            <div style={{ fontSize:13,color:C.text,lineHeight:1.7,marginBottom:12 }}>
              By signing this NDA you agree to keep all confidential information shared in this data room strictly private and not disclose it to third parties without the founder's written consent.
            </div>
            <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:12 }}>
              <div onClick={()=>setNdaChecked(p=>!p)} style={{ width:18,height:18,borderRadius:5,border:`2px solid ${ndaChecked?C.teal:C.border}`,background:ndaChecked?C.tealDim:"#fff",flexShrink:0,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center" }}>
                {ndaChecked && <Icon d={I.check} size={10} sw={3} style={{ color:C.teal }}/>}
              </div>
              <span style={{ fontSize:13,color:C.text }}>I agree to the Non-Disclosure Agreement and confidentiality terms</span>
            </div>
            <Btn v="primary" full disabled={!ndaChecked} onClick={()=>setNdaStep("granted")}>Sign & Get Full Access</Btn>
          </div>
        )}
        {ndaStep==="granted" && (
          <div style={{ padding:"12px 16px",borderRadius:11,background:"rgba(16,185,129,0.07)",border:`1px solid rgba(16,185,129,0.2)`,marginBottom:16,display:"flex",alignItems:"center",gap:10 }}>
            <Icon d={I.check} size={16} sw={2.5} style={{ color:C.green,flexShrink:0 }}/>
            <div style={{ fontSize:13,color:C.green,fontWeight:600 }}>Full data room access granted. NDA signed on Mar 7, 2026.</div>
          </div>
        )}

        {/* Tabs */}
        <div style={{ display:"flex",gap:4,marginBottom:16,background:C.slateXL,padding:4,borderRadius:11 }}>
          {[["docs","📁 Documents"],["about","ℹ About"],["contact","💬 Contact"]].map(([id,label])=>(
            <button key={id} onClick={()=>setActiveTab(id)}
              style={{ flex:1,padding:"8px 4px",borderRadius:8,border:"none",cursor:"pointer",fontFamily:"inherit",fontWeight:600,fontSize:12,transition:"all 0.15s",background:activeTab===id?"#fff":"transparent",color:activeTab===id?C.text:C.muted,boxShadow:activeTab===id?"0 1px 4px rgba(0,0,0,0.08)":"none" }}>
              {label}
            </button>
          ))}
        </div>

        {/* Documents tab */}
        {activeTab==="docs" && (
          <div style={{ display:"flex",flexDirection:"column",gap:10,marginBottom:60 }}>
            {docs.map(doc=>(
              <Card key={doc.id} style={{ padding:16,opacity:doc.locked?0.65:1,transition:"opacity 0.2s" }}>
                <div style={{ display:"flex",alignItems:"center",gap:12 }}>
                  <div style={{ width:44,height:44,borderRadius:11,background:doc.locked?"rgba(107,114,128,0.1)":extColor(doc.ext),display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                    {doc.locked
                      ? <Icon d={I.shield} size={18} style={{ color:C.slateL }}/>
                      : <span style={{ fontSize:10,fontWeight:800,color:extText(doc.ext) }}>{doc.ext}</span>}
                  </div>
                  <div style={{ flex:1,minWidth:0 }}>
                    <div style={{ fontWeight:600,fontSize:14,color:doc.locked?C.muted:C.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{doc.locked?"🔒 "+doc.name:doc.name}</div>
                    <div style={{ display:"flex",gap:6,alignItems:"center",marginTop:4 }}>
                      <Badge v={typeColor(doc.type)}>{doc.type}</Badge>
                      <span style={{ fontSize:11,color:C.muted }}>{doc.size}</span>
                      {doc.nda && !doc.locked && <Badge v="green">NDA Required ✓</Badge>}
                      {doc.locked && <Badge v="amber">Sign NDA to unlock</Badge>}
                    </div>
                  </div>
                  {!doc.locked && (
                    <div style={{ display:"flex",gap:6,flexShrink:0 }}>
                      <button onClick={()=>setPreviewDoc(doc)}
                        style={{ padding:"6px 12px",borderRadius:8,border:`1px solid ${C.border}`,background:"#fff",cursor:"pointer",fontSize:12,fontWeight:600,color:C.text,fontFamily:"inherit" }}>
                        View
                      </button>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* About tab */}
        {activeTab==="about" && (
          <div style={{ marginBottom:60 }}>
            <Card style={{ padding:22,marginBottom:14 }}>
              <h3 style={{ fontWeight:700,fontSize:15,color:C.text,marginBottom:14 }}>Company Details</h3>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10 }}>
                {[["Founded",startup.founded],["Team Size",startup.team+" people"],["Location",startup.location],["Stage",startup.stage],["Raising",startup.ask],["Sector",startup.sector]].map(([l,v])=>(
                  <div key={l} style={{ padding:"10px 12px",borderRadius:9,background:C.offWhite }}>
                    <div style={{ fontSize:10,color:C.muted,textTransform:"uppercase",letterSpacing:"0.06em",fontWeight:700,marginBottom:2 }}>{l}</div>
                    <div style={{ fontSize:13,fontWeight:600,color:C.text }}>{v}</div>
                  </div>
                ))}
              </div>
            </Card>
            <Card style={{ padding:22 }}>
              <h3 style={{ fontWeight:700,fontSize:15,color:C.text,marginBottom:10 }}>Use of Funds</h3>
              {[["Product Development","40%",C.teal],["Go-to-Market","35%","#6366F1"],["Team Hiring","25%",C.amber]].map(([l,p,c])=>(
                <div key={l} style={{ marginBottom:12 }}>
                  <div style={{ display:"flex",justifyContent:"space-between",marginBottom:4 }}>
                    <span style={{ fontSize:13,color:C.text }}>{l}</span>
                    <span style={{ fontSize:13,fontWeight:700,color:c }}>{p}</span>
                  </div>
                  <div style={{ height:6,borderRadius:999,background:C.slateXL }}>
                    <div style={{ width:p,height:"100%",borderRadius:999,background:c }}/>
                  </div>
                </div>
              ))}
            </Card>
          </div>
        )}

        {/* Contact tab */}
        {activeTab==="contact" && (
          <div style={{ marginBottom:60 }}>
            <Card style={{ padding:22 }}>
              <h3 style={{ fontWeight:700,fontSize:15,color:C.text,marginBottom:4 }}>Message Founder</h3>
              <p style={{ fontSize:13,color:C.muted,marginBottom:16 }}>Send a direct message to {startup.name}'s founding team.</p>
              <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
                <FSelect label="Subject" value="intro" onChange={()=>{}} options={[{value:"intro",label:"Introduction"},{value:"diligence",label:"Due Diligence Question"},{value:"meeting",label:"Request a Meeting"},{value:"other",label:"Other"}]}/>
                <FInput label="Message" rows={4} placeholder="Write your message here…" value={msgText} onChange={e=>setMsgText(e.target.value)}/>
                <Btn v="primary" full disabled={!msgText.trim()||msgSent} onClick={sendMsg}>
                  {msgSent?"✓ Message Sent!":"Send Message"}
                </Btn>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Doc preview modal */}
      <Modal open={!!previewDoc} onClose={()=>setPreviewDoc(null)} title={previewDoc?.name||""}>
        {previewDoc && (
          <div>
            <div style={{ padding:"60px 20px",borderRadius:12,background:C.offWhite,border:`1px solid ${C.border}`,textAlign:"center",marginBottom:16 }}>
              <div style={{ fontSize:48,marginBottom:12 }}>{previewDoc.ext==="PDF"?"📄":previewDoc.ext==="MP4"?"🎥":"📊"}</div>
              <div style={{ fontWeight:700,fontSize:15,color:C.text,marginBottom:4 }}>{previewDoc.name}</div>
              <div style={{ fontSize:12,color:C.muted }}>{previewDoc.size} · {previewDoc.date}</div>
            </div>
            <div style={{ display:"flex",gap:10 }}>
              <Btn v="secondary" full onClick={()=>setPreviewDoc(null)}>Close</Btn>
              <Btn v="primary" full onClick={()=>setPreviewDoc(null)}>Download</Btn>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

// ─── ADMIN USER DETAIL PAGE ──────────────────────────────────────────────────
const AdminUserDetailPage = ({ nav, userId }) => {
  const [sidebar,    setSidebar]    = useState(false);
  const [activeTab,  setActiveTab]  = useState("profile");
  const [suspended,  setSuspended]  = useState(false);
  const [verified,   setVerified]   = useState(true);
  const [featured,   setFeatured]   = useState(false);
  const [noteText,   setNoteText]   = useState("");
  const [notes,      setNotes]      = useState([
    {text:"User flagged for suspicious login attempt from unknown IP. Monitoring.",  author:"Admin Sharma", time:"Mar 5"},
    {text:"KYC documents manually re-verified after initial mismatch. Cleared.",    author:"Admin Verma",  time:"Feb 28"},
  ]);
  const [confirmModal, setConfirmModal] = useState(null); // "suspend"|"delete"|"resetpw"
  const [actionDone,   setActionDone]   = useState(null);
  const [planOverride, setPlanOverride] = useState("pro");

  // Rich mock user — in real app this would be fetched by userId
  const user = {
    id:"USR-00142", name:"Priya Sharma", email:"priya@greentech.in",
    role:"Founder", plan:"Pro", joined:"Feb 14, 2025", lastSeen:"2h ago",
    location:"Bengaluru, Karnataka", phone:"+91 98765 43210",
    company:"GreenTech Solutions", sector:"CleanTech", stage:"Seed",
    kyc:"approved", kycDate:"Feb 20, 2025",
    avatar:"PS", verified:true,
    devices:["Chrome / macOS","Android 14 / Samsung"],
    loginCount:142, lastLogin:"Mar 7, 2026 · 10:42 AM",
    mrr:"₹1,999/mo", billingCycle:"Annual", nextBilling:"Feb 14, 2027",
    totalPaid:"₹19,990", invoices:4,
    intros:{ sent:8, received:12, accepted:5 },
    dataRoom:{ docs:6, views:54, downloads:14, accessGiven:3 },
    events:{ registered:4, attended:3 },
  };

  const activity = [
    {type:"login",   desc:"Logged in from Chrome / macOS",             time:"2h ago"},
    {type:"doc",     desc:"Uploaded Cap_Table_Mar2026.xlsx to data room", time:"1d ago"},
    {type:"intro",   desc:"Intro request sent to Rajiv Malhotra",       time:"1d ago"},
    {type:"event",   desc:"Registered for Delhi Demo Day",              time:"2d ago"},
    {type:"payment", desc:"Annual subscription renewed · ₹19,990",     time:"Feb 14"},
    {type:"kyc",     desc:"KYC documents approved",                     time:"Feb 20"},
    {type:"login",   desc:"Logged in from Android / Samsung",           time:"Feb 18"},
    {type:"profile", desc:"Updated startup profile — sector, stage",    time:"Feb 16"},
    {type:"signup",  desc:"Account created",                             time:"Feb 14"},
  ];

  const actIcon = t => t==="login"?"🔐":t==="doc"?"📄":t==="intro"?"🤝":t==="event"?"📅":t==="payment"?"💳":t==="kyc"?"✅":t==="profile"?"✏️":"🎉";

  const navItems = [
    {id:"overview",  icon:"grid",     label:"Overview"},
    {id:"users",     icon:"users",    label:"Users"},
    {id:"events",    icon:"calendar", label:"Events"},
    {id:"approvals", icon:"shield",   label:"Approvals"},
    {id:"analytics", icon:"bar",      label:"Analytics"},
    {id:"revenue",   icon:"trending", label:"Revenue"},
    {id:"gear",      icon:"gear",     label:"Settings"},
  ];

  const addNote = () => {
    if(!noteText.trim()) return;
    setNotes(p=>[{text:noteText, author:"You", time:"just now"},...p]);
    setNoteText("");
  };

  const doAction = (type) => {
    setConfirmModal(null);
    setActionDone(type);
    if(type==="suspend") setSuspended(p=>!p);
    setTimeout(()=>setActionDone(null), 2500);
  };

  const Toggle = ({ on, onClick }) => (
    <div onClick={onClick} style={{ width:40,height:22,borderRadius:11,background:on?C.teal:C.slateXL,position:"relative",cursor:"pointer",flexShrink:0,transition:"background 0.2s" }}>
      <div style={{ position:"absolute",top:2,left:on?20:2,width:18,height:18,borderRadius:9,background:"#fff",transition:"left 0.2s",boxShadow:"0 1px 3px rgba(0,0,0,0.15)" }}/>
    </div>
  );

  const Stat = ({ label, value, sub, color }) => (
    <div style={{ padding:"14px 16px", borderRadius:12, background:C.offWhite, textAlign:"center" }}>
      <div style={{ fontSize:20, fontWeight:800, color:color||C.text, letterSpacing:"-0.02em" }}>{value}</div>
      {sub && <div style={{ fontSize:11, color:color||C.teal, fontWeight:600, marginBottom:2 }}>{sub}</div>}
      <div style={{ fontSize:11, color:C.muted, marginTop:2 }}>{label}</div>
    </div>
  );

  // ── Profile tab ──
  const profileTab = (
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
      <Card style={{ padding:22 }}>
        <div style={{ fontSize:11,fontWeight:700,color:C.muted,letterSpacing:"0.07em",textTransform:"uppercase",marginBottom:14 }}>Personal Information</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          {[
            ["Full Name",    user.name],
            ["Email",        user.email],
            ["Phone",        user.phone],
            ["Location",     user.location],
            ["User ID",      user.id],
            ["Joined",       user.joined],
            ["Last Seen",    user.lastSeen],
            ["Last Login",   user.lastLogin],
          ].map(([l,v])=>(
            <div key={l} style={{ padding:"10px 14px", borderRadius:10, background:C.offWhite }}>
              <div style={{ fontSize:10,fontWeight:700,color:C.muted,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:3 }}>{l}</div>
              <div style={{ fontSize:13,fontWeight:600,color:C.text,wordBreak:"break-all" }}>{v}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card style={{ padding:22 }}>
        <div style={{ fontSize:11,fontWeight:700,color:C.muted,letterSpacing:"0.07em",textTransform:"uppercase",marginBottom:14 }}>Startup / Business</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          {[["Company",user.company],["Sector",user.sector],["Stage",user.stage],["Role",user.role]].map(([l,v])=>(
            <div key={l} style={{ padding:"10px 14px", borderRadius:10, background:C.offWhite }}>
              <div style={{ fontSize:10,fontWeight:700,color:C.muted,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:3 }}>{l}</div>
              <div style={{ fontSize:13,fontWeight:600,color:C.text }}>{v}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card style={{ padding:22 }}>
        <div style={{ fontSize:11,fontWeight:700,color:C.muted,letterSpacing:"0.07em",textTransform:"uppercase",marginBottom:14 }}>KYC & Verification</div>
        <div style={{ display:"flex", alignItems:"center", gap:14, padding:"14px 16px", borderRadius:12, background:C.offWhite, marginBottom:12 }}>
          <div style={{ width:44,height:44,borderRadius:13,background:"rgba(16,185,129,0.1)",display:"flex",alignItems:"center",justifyContent:"center" }}>
            <Icon d={I.shield} size={20} style={{ color:C.green }}/>
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontWeight:700,fontSize:14,color:C.text }}>KYC {user.kyc==="approved"?"Approved":"Pending"}</div>
            <div style={{ fontSize:12,color:C.muted }}>Verified on {user.kycDate}</div>
          </div>
          <Badge v={user.kyc==="approved"?"green":"amber"}>{user.kyc}</Badge>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {[
            {l:"Profile Verified",    v:verified,  fn:()=>setVerified(p=>!p)},
            {l:"Featured Profile",    v:featured,  fn:()=>setFeatured(p=>!p)},
          ].map(item=>(
            <div key={item.l} style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"11px 14px",borderRadius:10,background:C.offWhite }}>
              <span style={{ fontSize:14,color:C.text,fontWeight:500 }}>{item.l}</span>
              <Toggle on={item.v} onClick={item.fn}/>
            </div>
          ))}
        </div>
      </Card>

      <Card style={{ padding:22 }}>
        <div style={{ fontSize:11,fontWeight:700,color:C.muted,letterSpacing:"0.07em",textTransform:"uppercase",marginBottom:14 }}>Active Devices</div>
        {user.devices.map((d,i)=>(
          <div key={i} style={{ display:"flex",alignItems:"center",gap:12,padding:"12px 14px",borderRadius:10,background:C.offWhite,marginBottom:8 }}>
            <span style={{ fontSize:20 }}>{d.includes("Android")||d.includes("iOS")?"📱":"💻"}</span>
            <div style={{ flex:1,fontSize:13,color:C.text,fontWeight:500 }}>{d}</div>
            <button style={{ fontSize:12,color:C.red,background:"none",border:"none",cursor:"pointer",fontWeight:600,fontFamily:"inherit" }}>Revoke</button>
          </div>
        ))}
      </Card>
    </div>
  );

  // ── Activity tab ──
  const activityTab = (
    <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(100px,1fr))",gap:10 }}>
        <Stat label="Logins" value={user.loginCount} color={C.teal}/>
        <Stat label="Intros Sent" value={user.intros.sent}/>
        <Stat label="Accepted" value={user.intros.accepted} color={C.green}/>
        <Stat label="Data Room Views" value={user.dataRoom.views} color="#6366F1"/>
        <Stat label="Downloads" value={user.dataRoom.downloads}/>
        <Stat label="Events" value={user.events.attended} sub={`/ ${user.events.registered} registered`}/>
      </div>
      <Card style={{ overflow:"hidden" }}>
        <div style={{ padding:"12px 18px",background:C.offWhite,borderBottom:`1px solid ${C.border}`,fontSize:12,fontWeight:700,color:C.muted,letterSpacing:"0.07em",textTransform:"uppercase" }}>Recent Activity</div>
        {activity.map((a,i)=>(
          <div key={i} style={{ display:"flex",alignItems:"center",gap:12,padding:"13px 18px",borderBottom:i<activity.length-1?`1px solid ${C.slateXL}`:"none" }}>
            <div style={{ width:34,height:34,borderRadius:10,background:C.offWhite,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0 }}>{actIcon(a.type)}</div>
            <div style={{ flex:1,fontSize:13,color:C.text }}>{a.desc}</div>
            <span style={{ fontSize:11,color:C.muted,whiteSpace:"nowrap",flexShrink:0 }}>{a.time}</span>
          </div>
        ))}
      </Card>
    </div>
  );

  // ── Subscription tab ──
  const subscriptionTab = (
    <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
      <Card style={{ padding:22 }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18 }}>
          <div>
            <div style={{ fontWeight:800,fontSize:18,color:C.text,marginBottom:2 }}>{user.plan} Plan</div>
            <div style={{ fontSize:13,color:C.muted }}>{user.billingCycle} · {user.mrr}</div>
          </div>
          <Badge v="green">Active</Badge>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16 }}>
          {[["Total Paid",user.totalPaid],["Invoices",user.invoices],["Next Billing",user.nextBilling],["Member Since",user.joined]].map(([l,v])=>(
            <div key={l} style={{ padding:"10px 14px",borderRadius:10,background:C.offWhite }}>
              <div style={{ fontSize:10,fontWeight:700,color:C.muted,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:3 }}>{l}</div>
              <div style={{ fontSize:13,fontWeight:700,color:C.text }}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{ marginBottom:14 }}>
          <label style={{ fontSize:13,fontWeight:600,color:C.text,display:"block",marginBottom:8 }}>Override Plan</label>
          <div style={{ display:"flex",gap:10 }}>
            <FSelect value={planOverride} onChange={e=>setPlanOverride(e.target.value)} options={[{value:"starter",label:"Starter (Free)"},{value:"pro",label:"Pro — ₹1,999/mo"},{value:"growth",label:"Growth — ₹4,999/mo"},{value:"enterprise",label:"Enterprise"}]}/>
            <Btn v="primary" sz="sm" onClick={()=>setActionDone("plan")}>Apply</Btn>
          </div>
          {actionDone==="plan" && <div style={{ fontSize:12,color:C.green,marginTop:6,fontWeight:600 }}>✓ Plan updated to {planOverride}</div>}
        </div>
      </Card>

      <Card style={{ padding:22 }}>
        <div style={{ fontSize:11,fontWeight:700,color:C.muted,letterSpacing:"0.07em",textTransform:"uppercase",marginBottom:14 }}>Invoice History</div>
        {[
          {inv:"FL-INV-1247",date:"Feb 14, 2026",amount:"₹19,990",status:"paid"},
          {inv:"FL-INV-0884",date:"Feb 14, 2025",amount:"₹19,990",status:"paid"},
          {inv:"FL-INV-0612",date:"Aug 14, 2024",amount:"₹1,999", status:"paid"},
          {inv:"FL-INV-0401",date:"Feb 14, 2024",amount:"₹1,999", status:"paid"},
        ].map((inv,i,arr)=>(
          <div key={i} style={{ display:"flex",alignItems:"center",gap:12,padding:"12px 0",borderBottom:i<arr.length-1?`1px solid ${C.slateXL}`:"none" }}>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:13,fontWeight:600,color:C.text,fontFamily:"monospace" }}>{inv.inv}</div>
              <div style={{ fontSize:11,color:C.muted }}>{inv.date}</div>
            </div>
            <div style={{ fontWeight:700,fontSize:14,color:C.text }}>{inv.amount}</div>
            <Badge v="green">{inv.status}</Badge>
          </div>
        ))}
      </Card>
    </div>
  );

  // ── Admin notes tab ──
  const notesTab = (
    <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
      <Card style={{ padding:22 }}>
        <div style={{ fontSize:11,fontWeight:700,color:C.muted,letterSpacing:"0.07em",textTransform:"uppercase",marginBottom:12 }}>Add Internal Note</div>
        <textarea rows={3} value={noteText} onChange={e=>setNoteText(e.target.value)}
          placeholder="Write an internal note about this user (only visible to admins)..."
          style={{ width:"100%",padding:"12px 14px",borderRadius:10,border:`1.5px solid ${C.border}`,fontSize:13,fontFamily:"inherit",color:C.text,resize:"vertical",outline:"none",boxSizing:"border-box",marginBottom:10 }}
          onFocus={e=>e.target.style.borderColor=C.teal} onBlur={e=>e.target.style.borderColor=C.border}/>
        <Btn v="primary" full disabled={!noteText.trim()} onClick={addNote}>Add Note</Btn>
      </Card>
      <Card style={{ overflow:"hidden" }}>
        <div style={{ padding:"12px 18px",background:C.offWhite,borderBottom:`1px solid ${C.border}`,fontSize:12,fontWeight:700,color:C.muted,letterSpacing:"0.07em",textTransform:"uppercase" }}>Internal Notes ({notes.length})</div>
        {notes.length===0
          ? <EmptyState icon="📝" title="No notes yet" body="Add internal notes visible only to admins." compact/>
          : notes.map((n,i)=>(
            <div key={i} style={{ padding:"16px 18px",borderBottom:i<notes.length-1?`1px solid ${C.slateXL}`:"none" }}>
              <div style={{ fontSize:13,color:C.text,lineHeight:1.6,marginBottom:6 }}>{n.text}</div>
              <div style={{ fontSize:11,color:C.muted }}>{n.author} · {n.time}</div>
            </div>
          ))
        }
      </Card>
    </div>
  );

  const tabContent = { profile:profileTab, activity:activityTab, subscription:subscriptionTab, notes:notesTab };
  const tabs = [["profile","👤 Profile"],["activity","📊 Activity"],["subscription","💳 Subscription"],["notes","📝 Notes"]];

  return (
    <div style={{ background:C.offWhite,minHeight:"100vh" }}>
      <Sidebar nav={navItems} active="users" onSelect={p=>{ if(p!=="users") nav("admin"); else nav("admin"); }} role="Super Admin" open={sidebar} onClose={()=>setSidebar(false)} onSignOut={()=>nav("landing")}/>
      <div style={{ paddingBottom:80 }}>
        {/* Admin top bar */}
        <div style={{ height:60,background:C.navy,borderBottom:"1px solid rgba(255,255,255,0.08)",display:"flex",alignItems:"center",padding:"0 20px",position:"sticky",top:0,zIndex:100 }}>
          <button onClick={()=>setSidebar(true)} style={{ background:"none",border:"none",cursor:"pointer",padding:4,color:"rgba(255,255,255,0.5)",marginRight:14,display:"flex" }}>
            <Icon d={I.menu} size={22}/>
          </button>
          <button onClick={()=>nav("admin")} style={{ background:"none",border:"none",cursor:"pointer",padding:4,color:"rgba(255,255,255,0.5)",marginRight:10,display:"flex" }}>
            <Icon d={I.chevR} size={16} sw={2} style={{ transform:"rotate(180deg)" }}/>
          </button>
          <div style={{ flex:1,display:"flex",alignItems:"center",gap:9 }}>
            <div style={{ width:26,height:26,borderRadius:7,background:C.teal,display:"flex",alignItems:"center",justifyContent:"center" }}>
              <Icon d={I.link} size={13} sw={2.5}/>
            </div>
            <span style={{ color:"#fff",fontWeight:800,fontSize:16,letterSpacing:"-0.02em" }}>FundLink <span style={{ color:"rgba(255,255,255,0.28)",fontWeight:400 }}>Admin</span></span>
          </div>
          <Avatar name={user.name} size={30}/>
        </div>

        <div style={{ padding:20,maxWidth:720,margin:"0 auto" }}>
          {/* User hero card */}
          <Card style={{ padding:22,marginBottom:20 }}>
            <div style={{ display:"flex",alignItems:"flex-start",gap:16,marginBottom:16 }}>
              <div style={{ position:"relative" }}>
                <Avatar name={user.name} size={64}/>
                <div style={{ position:"absolute",bottom:-2,right:-2,width:18,height:18,borderRadius:9,background:suspended?C.red:C.green,border:"2px solid #fff" }}/>
              </div>
              <div style={{ flex:1 }}>
                <div style={{ display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:4 }}>
                  <span style={{ fontWeight:800,fontSize:20,color:C.text }}>{user.name}</span>
                  {verified && <VBadge/>}
                  {suspended && <Badge v="red">Suspended</Badge>}
                </div>
                <div style={{ fontSize:13,color:C.muted,marginBottom:6 }}>{user.email} · {user.company}</div>
                <div style={{ display:"flex",gap:6,flexWrap:"wrap" }}>
                  <Badge v={user.role==="Founder"?"teal":user.role==="Investor"?"indigo":"amber"}>{user.role}</Badge>
                  <Badge v="green">{user.plan}</Badge>
                  <span style={{ fontSize:12,color:C.muted,display:"flex",alignItems:"center" }}>ID: {user.id}</span>
                </div>
              </div>
            </div>
            {/* Action buttons */}
            <div style={{ display:"flex",gap:8,flexWrap:"wrap",paddingTop:16,borderTop:`1px solid ${C.border}` }}>
              <Btn v={suspended?"primary":"danger"} sz="sm" onClick={()=>setConfirmModal("suspend")}>
                {suspended?"Activate User":"Suspend User"}
              </Btn>
              <Btn v="secondary" sz="sm" onClick={()=>setConfirmModal("resetpw")}>Reset Password</Btn>
              <Btn v="secondary" sz="sm" onClick={()=>nav("adminModeration")}>View KYC Docs</Btn>
              <Btn v="secondary" sz="sm" onClick={()=>setConfirmModal("delete")} style={{ marginLeft:"auto",color:C.red,borderColor:"rgba(239,68,68,0.3)" }}>Delete Account</Btn>
            </div>
            {actionDone==="suspend" && <div style={{ fontSize:12,color:suspended?C.red:C.green,marginTop:8,fontWeight:600 }}>✓ User {suspended?"suspended":"reactivated"} successfully.</div>}
            {actionDone==="resetpw" && <div style={{ fontSize:12,color:C.green,marginTop:8,fontWeight:600 }}>✓ Password reset email sent to {user.email}</div>}
          </Card>

          {/* Tabs */}
          <div style={{ display:"flex",gap:4,marginBottom:20,background:C.slateXL,padding:4,borderRadius:12 }}>
            {tabs.map(([id,label])=>(
              <button key={id} onClick={()=>setActiveTab(id)}
                style={{ flex:1,padding:"9px 4px",borderRadius:9,border:"none",cursor:"pointer",fontFamily:"inherit",fontWeight:600,fontSize:12,transition:"all 0.15s",whiteSpace:"nowrap",background:activeTab===id?"#fff":"transparent",color:activeTab===id?C.text:C.muted,boxShadow:activeTab===id?"0 1px 4px rgba(0,0,0,0.08)":"none" }}>
                {label}
              </button>
            ))}
          </div>

          {tabContent[activeTab]}
        </div>
      </div>

      {/* Confirm modals */}
      <Modal open={confirmModal==="suspend"} onClose={()=>setConfirmModal(null)} title={suspended?"Activate User":"Suspend User"}>
        <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
          <div style={{ padding:"12px 14px",borderRadius:10,background:suspended?"rgba(16,185,129,0.06)":"rgba(239,68,68,0.06)",border:`1px solid ${suspended?"rgba(16,185,129,0.2)":"rgba(239,68,68,0.2)"}` }}>
            <div style={{ fontWeight:700,fontSize:14,color:suspended?C.green:C.red,marginBottom:4 }}>{suspended?"Reactivate account?":"Suspend this account?"}</div>
            <div style={{ fontSize:13,color:C.muted,lineHeight:1.65 }}>
              {suspended
                ? `${user.name} will regain full access to FundLink immediately.`
                : `${user.name} will lose access to FundLink. Their data will be preserved.`}
            </div>
          </div>
          <div style={{ display:"flex",gap:10 }}>
            <Btn v="secondary" full onClick={()=>setConfirmModal(null)}>Cancel</Btn>
            <Btn v={suspended?"primary":"danger"} full onClick={()=>doAction("suspend")}>{suspended?"Activate":"Suspend"}</Btn>
          </div>
        </div>
      </Modal>

      <Modal open={confirmModal==="resetpw"} onClose={()=>setConfirmModal(null)} title="Reset Password">
        <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
          <div style={{ fontSize:14,color:C.muted,lineHeight:1.7 }}>
            A password reset link will be sent to <strong style={{ color:C.text }}>{user.email}</strong>. The link expires in 24 hours.
          </div>
          <div style={{ display:"flex",gap:10 }}>
            <Btn v="secondary" full onClick={()=>setConfirmModal(null)}>Cancel</Btn>
            <Btn v="primary" full onClick={()=>doAction("resetpw")}>Send Reset Email</Btn>
          </div>
        </div>
      </Modal>

      <Modal open={confirmModal==="delete"} onClose={()=>setConfirmModal(null)} title="Delete Account">
        <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
          <div style={{ padding:"12px 14px",borderRadius:10,background:"rgba(239,68,68,0.06)",border:"1px solid rgba(239,68,68,0.2)" }}>
            <div style={{ fontWeight:700,fontSize:14,color:C.red,marginBottom:4 }}>⚠️ This is permanent</div>
            <div style={{ fontSize:13,color:C.muted,lineHeight:1.65 }}>All data for <strong>{user.name}</strong> — profile, documents, intros, and billing history — will be permanently deleted.</div>
          </div>
          <div style={{ display:"flex",gap:10 }}>
            <Btn v="secondary" full onClick={()=>setConfirmModal(null)}>Cancel</Btn>
            <Btn v="danger" full onClick={()=>{ setConfirmModal(null); nav("admin"); }}>Delete Account</Btn>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// ─── ADMIN EMAIL TEMPLATES PAGE ──────────────────────────────────────────────
const AdminEmailTemplatesPage = ({ nav }) => {
  const [sidebar,    setSidebar]    = useState(false);
  const [activeId,   setActiveId]   = useState("welcome_founder");
  const [editMode,   setEditMode]   = useState(false);
  const [saved,      setSaved]      = useState(false);
  const [preview,    setPreview]    = useState("desktop"); // desktop | mobile
  const [sendTestOpen, setSendTestOpen] = useState(false);
  const [testEmail,  setTestEmail]  = useState("admin@fundlink.in");
  const [testSent,   setTestSent]   = useState(false);
  const [searchQ,    setSearchQ]    = useState("");

  const VARS = {
    "{{name}}":        "Priya Sharma",
    "{{startup_name}}":"GreenTech Solutions",
    "{{email}}":       "priya@greentech.in",
    "{{platform}}":    "FundLink",
    "{{otp}}":         "847291",
    "{{link}}":        "https://fundlink.in/verify/abc123",
    "{{investor_name}}":"Rajiv Malhotra",
    "{{event_name}}":  "Delhi Demo Day",
    "{{event_date}}":  "March 15, 2026",
    "{{amount}}":      "₹19,990",
    "{{plan}}":        "Pro",
    "{{expiry}}":      "March 14, 2027",
    "{{support_email}}":"support@fundlink.in",
    "{{days}}":        "2",
  };

  const interpolate = s => Object.entries(VARS).reduce((t,[k,v])=>t.replaceAll(k,`<span style="color:#1fa3a3;font-weight:700">${v}</span>`),s);

  const [templates, setTemplates] = useState([
    {
      id:"welcome_founder", cat:"Onboarding", tag:"Auto-send",
      name:"Welcome — Founder",
      subject:"Welcome to FundLink, {{name}}! 🚀",
      preheader:"Your startup journey starts here. Here's everything you need to know.",
      body:`<p>Hi {{name}},</p>
<p>Welcome to <strong>{{platform}}</strong> — India's most trusted platform for founder-investor connections.</p>
<p>You've taken the first step. Here's what happens next:</p>
<ul>
  <li>✅ <strong>Complete your profile</strong> so investors can discover you</li>
  <li>🔐 <strong>Upload your KYC</strong> to get verified (usually 24-48 hours)</li>
  <li>📄 <strong>Set up your Data Room</strong> with your pitch deck and financials</li>
  <li>📅 <strong>Register for events</strong> to meet investors in person</li>
</ul>
<p>Your startup, <strong>{{startup_name}}</strong>, is now listed. Make it shine.</p>
<p>If you need help, reach us at <a href="mailto:{{support_email}}">{{support_email}}</a>.</p>
<p style="margin-top:24px">Best,<br/>The {{platform}} Team</p>`,
      active:true,
    },
    {
      id:"welcome_investor", cat:"Onboarding", tag:"Auto-send",
      name:"Welcome — Investor",
      subject:"Welcome to FundLink, {{name}}",
      preheader:"Your curated deal flow is ready. Here's how to get started.",
      body:`<p>Hi {{name}},</p>
<p>Welcome to <strong>{{platform}}</strong>. You now have access to India's most curated early-stage deal flow.</p>
<p>What you can do right now:</p>
<ul>
  <li>🔍 <strong>Browse verified startups</strong> filtered by sector, stage, and traction</li>
  <li>🤝 <strong>Request warm intros</strong> to founders you're interested in</li>
  <li>🔐 <strong>Access data rooms</strong> with NDA-protected documents</li>
  <li>📅 <strong>Attend curated pitch events</strong> across India</li>
</ul>
<p>Questions? Write to <a href="mailto:{{support_email}}">{{support_email}}</a>.</p>
<p style="margin-top:24px">Best,<br/>The {{platform}} Team</p>`,
      active:true,
    },
    {
      id:"verify_email", cat:"Auth", tag:"Transactional",
      name:"Email Verification",
      subject:"Your FundLink verification code: {{otp}}",
      preheader:"Enter this code to verify your email address.",
      body:`<p>Hi {{name}},</p>
<p>Use the code below to verify your email address:</p>
<div style="text-align:center;margin:28px 0">
  <div style="display:inline-block;padding:18px 32px;border-radius:12px;background:#f0fafa;border:2px solid #1fa3a3;font-size:36px;font-weight:800;letter-spacing:12px;color:#1fa3a3">{{otp}}</div>
</div>
<p style="text-align:center;color:#888;font-size:13px">This code expires in 10 minutes. Do not share it with anyone.</p>
<p>If you didn't request this, you can safely ignore this email.</p>
<p style="margin-top:24px">— {{platform}} Security Team</p>`,
      active:true,
    },
    {
      id:"kyc_approved", cat:"KYC", tag:"Auto-send",
      name:"KYC Approved",
      subject:"✅ Your identity has been verified, {{name}}",
      preheader:"You're fully verified on FundLink. Here's what's unlocked.",
      body:`<p>Hi {{name}},</p>
<p>Great news — your identity has been verified on <strong>{{platform}}</strong>.</p>
<p>Here's what's now unlocked for you:</p>
<ul>
  <li>🟢 <strong>Full profile visibility</strong> to investors</li>
  <li>🤝 <strong>Investor introductions</strong> — send and receive intro requests</li>
  <li>🔐 <strong>Data room access</strong> — share documents securely</li>
  <li>📅 <strong>Priority event registration</strong></li>
</ul>
<p>Log in to <strong>{{platform}}</strong> and start connecting with investors today.</p>
<p style="margin-top:24px">Best,<br/>The {{platform}} Team</p>`,
      active:true,
    },
    {
      id:"kyc_rejected", cat:"KYC", tag:"Auto-send",
      name:"KYC Rejected",
      subject:"Action required: Identity verification for {{name}}",
      preheader:"We couldn't verify your documents. Here's how to fix it.",
      body:`<p>Hi {{name}},</p>
<p>Unfortunately, we were unable to verify your identity documents at this time.</p>
<p><strong>Common reasons for rejection:</strong></p>
<ul>
  <li>Image was blurry or too dark</li>
  <li>Document was expired</li>
  <li>Name didn't match account registration</li>
  <li>All four corners of the document weren't visible</li>
</ul>
<p>Please <a href="{{link}}">re-submit your documents</a> with clear, well-lit photos.</p>
<p>If you need help, contact us at <a href="mailto:{{support_email}}">{{support_email}}</a>.</p>
<p style="margin-top:24px">— {{platform}} Verification Team</p>`,
      active:true,
    },
    {
      id:"intro_request", cat:"Intros", tag:"Transactional",
      name:"New Intro Request",
      subject:"{{investor_name}} wants to connect with {{startup_name}}",
      preheader:"You have a new introduction request waiting for your response.",
      body:`<p>Hi {{name}},</p>
<p><strong>{{investor_name}}</strong> has requested an introduction to <strong>{{startup_name}}</strong> via {{platform}}.</p>
<p>Log in to review the request and accept or decline within <strong>{{days}} days</strong>.</p>
<p><a href="{{link}}" style="display:inline-block;margin-top:12px;padding:12px 24px;background:#1fa3a3;color:#fff;text-decoration:none;border-radius:9px;font-weight:700">Review Intro Request</a></p>
<p style="color:#888;font-size:13px;margin-top:20px">Requests expire after 7 days if not responded to.</p>
<p style="margin-top:24px">— The {{platform}} Team</p>`,
      active:true,
    },
    {
      id:"intro_accepted", cat:"Intros", tag:"Transactional",
      name:"Intro Accepted",
      subject:"Your intro request was accepted! 🎉",
      preheader:"Connect with your new introduction on FundLink.",
      body:`<p>Hi {{name}},</p>
<p>Great news — <strong>{{startup_name}}</strong> has accepted your introduction request.</p>
<p>You can now message them directly through {{platform}}. <a href="{{link}}">Open the conversation</a>.</p>
<p>Tips for a great first message:</p>
<ul>
  <li>Keep it brief and specific — mention what you liked about them</li>
  <li>Ask one clear question rather than multiple</li>
  <li>Suggest a specific call time to reduce back-and-forth</li>
</ul>
<p style="margin-top:24px">— The {{platform}} Team</p>`,
      active:true,
    },
    {
      id:"event_reminder", cat:"Events", tag:"Scheduled",
      name:"Event Reminder",
      subject:"⏰ Reminder: {{event_name}} is tomorrow",
      preheader:"Your event starts in 24 hours. Here's everything you need.",
      body:`<p>Hi {{name}},</p>
<p>This is a reminder that <strong>{{event_name}}</strong> is happening tomorrow, <strong>{{event_date}}</strong>.</p>
<p><strong>What to prepare:</strong></p>
<ul>
  <li>Your 2-minute elevator pitch</li>
  <li>Printed or digital copies of your one-pager</li>
  <li>Business cards (physical or digital)</li>
  <li>3 specific questions for investors you want to meet</li>
</ul>
<p><a href="{{link}}" style="display:inline-block;margin-top:12px;padding:12px 24px;background:#1fa3a3;color:#fff;text-decoration:none;border-radius:9px;font-weight:700">View Event Details</a></p>
<p style="margin-top:24px">See you there!<br/>The {{platform}} Team</p>`,
      active:true,
    },
    {
      id:"subscription_renewal", cat:"Billing", tag:"Scheduled",
      name:"Subscription Renewal",
      subject:"Your {{platform}} {{plan}} plan renews soon",
      preheader:"Your subscription renews on {{expiry}}. Here are your billing details.",
      body:`<p>Hi {{name}},</p>
<p>Your <strong>{{platform}} {{plan}}</strong> subscription will automatically renew on <strong>{{expiry}}</strong> for <strong>{{amount}}</strong>.</p>
<p>No action needed — we'll charge the card on file. To update payment details or cancel, visit your <a href="{{link}}">billing settings</a>.</p>
<p>Questions? Email <a href="mailto:{{support_email}}">{{support_email}}</a>.</p>
<p style="margin-top:24px">— {{platform}} Billing Team</p>`,
      active:true,
    },
    {
      id:"password_reset", cat:"Auth", tag:"Transactional",
      name:"Password Reset",
      subject:"Reset your {{platform}} password",
      preheader:"You requested a password reset. The link expires in 24 hours.",
      body:`<p>Hi {{name}},</p>
<p>We received a request to reset your password. Click the button below to set a new one.</p>
<p><a href="{{link}}" style="display:inline-block;margin-top:12px;padding:12px 24px;background:#1fa3a3;color:#fff;text-decoration:none;border-radius:9px;font-weight:700">Reset Password</a></p>
<p style="color:#888;font-size:13px;margin-top:16px">This link expires in 24 hours. If you didn't request a password reset, you can safely ignore this email — your account is still secure.</p>
<p style="margin-top:24px">— {{platform}} Security Team</p>`,
      active:true,
    },
  ]);

  const categories = [...new Set(templates.map(t=>t.cat))];
  const catColor = c => c==="Onboarding"?C.teal:c==="Auth"?"#6366F1":c==="KYC"?C.amber:c==="Intros"?"#EC4899":c==="Events"?C.green:"#8B5CF6";
  const tagColor  = t => t==="Auto-send"?C.green:t==="Transactional"?"#6366F1":C.amber;

  const active = templates.find(t=>t.id===activeId);
  const [editSubject,  setEditSubject]  = useState("");
  const [editPreheader,setEditPreheader]= useState("");
  const [editBody,     setEditBody]     = useState("");

  const startEdit = () => { setEditSubject(active.subject); setEditPreheader(active.preheader); setEditBody(active.body); setEditMode(true); setSaved(false); };
  const saveEdit  = () => {
    setTemplates(p=>p.map(t=>t.id===activeId?{...t,subject:editSubject,preheader:editPreheader,body:editBody}:t));
    setEditMode(false); setSaved(true); setTimeout(()=>setSaved(false),2500);
  };
  const cancelEdit = () => { setEditMode(false); };
  const sendTest = () => { setTestSent(true); setTimeout(()=>{ setTestSent(false); setSendTestOpen(false); },2000); };
  const toggleActive = id => setTemplates(p=>p.map(t=>t.id===id?{...t,active:!t.active}:t));

  const filtered = templates.filter(t=>
    !searchQ || t.name.toLowerCase().includes(searchQ.toLowerCase()) || t.cat.toLowerCase().includes(searchQ.toLowerCase())
  );

  const navItems = [
    {id:"overview",  icon:"grid",     label:"Overview"},
    {id:"users",     icon:"users",    label:"Users"},
    {id:"events",    icon:"calendar", label:"Events"},
    {id:"approvals", icon:"shield",   label:"Approvals"},
    {id:"analytics", icon:"bar",      label:"Analytics"},
    {id:"revenue",   icon:"trending", label:"Revenue"},
    {id:"gear",      icon:"gear",     label:"Settings"},
  ];

  // ── Email HTML renderer ──
  const EmailPreview = ({ tpl, editBody:eb, editSubject:es, editPreheader:ep, isEditing }) => {
    const subj = isEditing ? es : tpl.subject;
    const pre  = isEditing ? ep : tpl.preheader;
    const body = isEditing ? eb : tpl.body;
    return (
      <div style={{ background:"#f5f5f5",borderRadius:14,overflow:"hidden",border:`1px solid ${C.border}` }}>
        {/* Email client chrome */}
        <div style={{ background:"#e8e8e8",padding:"10px 16px",display:"flex",alignItems:"center",gap:10,borderBottom:`1px solid ${C.border}` }}>
          <div style={{ display:"flex",gap:5 }}>
            {["#f87171","#fbbf24","#34d399"].map(c=><div key={c} style={{ width:10,height:10,borderRadius:5,background:c }}/>)}
          </div>
          <div style={{ flex:1,background:"#fff",borderRadius:6,padding:"4px 12px",fontSize:11,color:"#888",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>
            📧 {interpolate(subj).replace(/<[^>]+>/g,"")}
          </div>
          <div style={{ display:"flex",gap:8 }}>
            <button onClick={()=>setPreview("desktop")} style={{ padding:"3px 8px",borderRadius:5,border:`1px solid ${preview==="desktop"?C.teal:C.border}`,background:preview==="desktop"?C.tealDim:"#fff",color:preview==="desktop"?C.teal:C.muted,fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:"inherit" }}>🖥 Desktop</button>
            <button onClick={()=>setPreview("mobile")}  style={{ padding:"3px 8px",borderRadius:5,border:`1px solid ${preview==="mobile"?C.teal:C.border}`, background:preview==="mobile"?C.tealDim:"#fff", color:preview==="mobile"?C.teal:C.muted, fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:"inherit" }}>📱 Mobile</button>
          </div>
        </div>
        {/* Email body */}
        <div style={{ padding:16,display:"flex",justifyContent:"center",background:"#f0f0f0" }}>
          <div style={{ width:preview==="mobile"?320:"100%",maxWidth:560,background:"#fff",borderRadius:10,overflow:"hidden",boxShadow:"0 2px 16px rgba(0,0,0,0.08)" }}>
            {/* Header */}
            <div style={{ background:C.navy,padding:"24px 32px",textAlign:"center" }}>
              <div style={{ display:"inline-flex",alignItems:"center",gap:8 }}>
                <div style={{ width:26,height:26,borderRadius:7,background:C.teal,display:"flex",alignItems:"center",justifyContent:"center" }}>
                  <Icon d={I.link} size={13} sw={2.5}/>
                </div>
                <span style={{ color:"#fff",fontWeight:800,fontSize:18,letterSpacing:"-0.02em" }}>Fund<span style={{ color:C.teal }}>Link</span></span>
              </div>
            </div>
            {/* Preheader bar */}
            <div style={{ background:"rgba(31,163,163,0.06)",borderBottom:`1px solid rgba(31,163,163,0.1)`,padding:"8px 32px",fontSize:12,color:C.muted,fontStyle:"italic" }}
              dangerouslySetInnerHTML={{ __html:interpolate(pre) }}/>
            {/* Body */}
            <div style={{ padding:"28px 32px",fontSize:14,lineHeight:1.75,color:"#333",fontFamily:"Georgia,serif" }}
              dangerouslySetInnerHTML={{ __html:interpolate(body) }}/>
            {/* Footer */}
            <div style={{ background:"#f9f9f9",borderTop:`1px solid #eee`,padding:"16px 32px",textAlign:"center",fontSize:11,color:"#aaa",lineHeight:1.6 }}>
              FundLink · 22 Koramangala, Bengaluru 560034<br/>
              <span style={{ cursor:"pointer",textDecoration:"underline" }}>Unsubscribe</span> · <span style={{ cursor:"pointer",textDecoration:"underline" }}>Privacy Policy</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ background:C.offWhite,minHeight:"100vh" }}>
      <Sidebar nav={navItems} active="gear" onSelect={p=>{ if(p!=="gear") nav("admin"); else nav("adminSettings"); }} role="Super Admin" open={sidebar} onClose={()=>setSidebar(false)} onSignOut={()=>nav("landing")}/>
      <div style={{ paddingBottom:60 }}>
        {/* Admin top bar */}
        <div style={{ height:60,background:C.navy,borderBottom:"1px solid rgba(255,255,255,0.08)",display:"flex",alignItems:"center",padding:"0 20px",position:"sticky",top:0,zIndex:100 }}>
          <button onClick={()=>setSidebar(true)} style={{ background:"none",border:"none",cursor:"pointer",padding:4,color:"rgba(255,255,255,0.5)",marginRight:14,display:"flex" }}>
            <Icon d={I.menu} size={22}/>
          </button>
          <button onClick={()=>nav("adminSettings")} style={{ background:"none",border:"none",cursor:"pointer",padding:4,color:"rgba(255,255,255,0.5)",marginRight:10,display:"flex" }}>
            <Icon d={I.chevR} size={16} sw={2} style={{ transform:"rotate(180deg)" }}/>
          </button>
          <div style={{ flex:1,display:"flex",alignItems:"center",gap:9 }}>
            <div style={{ width:26,height:26,borderRadius:7,background:C.teal,display:"flex",alignItems:"center",justifyContent:"center" }}>
              <Icon d={I.link} size={13} sw={2.5}/>
            </div>
            <span style={{ color:"#fff",fontWeight:800,fontSize:16,letterSpacing:"-0.02em" }}>FundLink <span style={{ color:"rgba(255,255,255,0.28)",fontWeight:400 }}>/ Email Templates</span></span>
          </div>
          {saved && <div style={{ fontSize:12,color:C.green,fontWeight:700,padding:"5px 12px",borderRadius:8,background:"rgba(16,185,129,0.1)",border:"1px solid rgba(16,185,129,0.2)" }}>✓ Saved</div>}
          <Avatar name="Admin" size={30} style={{ marginLeft:12 }}/>
        </div>

        <div style={{ display:"flex",height:"calc(100vh - 60px)",flexDirection:"column" }} className="email-templates-layout">
          <style>{`.email-templates-layout{flex-direction:row!important} @media(max-width:900px){.email-templates-layout{flex-direction:column!important}.email-tpl-sidebar{width:100%!important;height:200px!important;border-right:none!important;border-bottom:1px solid #e2e8f0!important}}`}</style>

          {/* Left sidebar — template list */}
          <div className="email-tpl-sidebar" style={{ width:280,flexShrink:0,background:"#fff",borderRight:`1px solid ${C.border}`,overflowY:"auto",display:"flex",flexDirection:"column" }}>
            <div style={{ padding:"14px 16px",borderBottom:`1px solid ${C.border}` }}>
              <div style={{ fontWeight:700,fontSize:14,color:C.text,marginBottom:10 }}>Templates ({templates.length})</div>
              <div style={{ position:"relative" }}>
                <div style={{ position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:C.muted,display:"flex" }}>
                  <Icon d={I.search} size={13}/>
                </div>
                <input value={searchQ} onChange={e=>setSearchQ(e.target.value)} placeholder="Search templates…"
                  style={{ width:"100%",padding:"7px 10px 7px 30px",borderRadius:8,border:`1px solid ${C.border}`,fontSize:12,outline:"none",boxSizing:"border-box",fontFamily:"inherit",color:C.text }}
                  onFocus={e=>e.target.style.borderColor=C.teal} onBlur={e=>e.target.style.borderColor=C.border}/>
              </div>
            </div>
            <div style={{ flex:1,overflowY:"auto" }}>
              {categories.map(cat=>{
                const items = filtered.filter(t=>t.cat===cat);
                if(!items.length) return null;
                return (
                  <div key={cat}>
                    <div style={{ padding:"10px 16px 6px",fontSize:10,fontWeight:700,color:C.muted,letterSpacing:"0.08em",textTransform:"uppercase",background:C.offWhite,borderBottom:`1px solid ${C.slateXL}` }}>
                      {cat}
                    </div>
                    {items.map(t=>(
                      <div key={t.id} onClick={()=>{ setActiveId(t.id); setEditMode(false); setSaved(false); }}
                        style={{ padding:"12px 16px",cursor:"pointer",transition:"background 0.12s",borderBottom:`1px solid ${C.slateXL}`,background:activeId===t.id?C.tealDim:"transparent",borderLeft:`3px solid ${activeId===t.id?C.teal:"transparent"}` }}
                        onMouseEnter={e=>{ if(activeId!==t.id) e.currentTarget.style.background=C.offWhite; }}
                        onMouseLeave={e=>{ if(activeId!==t.id) e.currentTarget.style.background="transparent"; }}>
                        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:4 }}>
                          <span style={{ fontSize:13,fontWeight:activeId===t.id?700:600,color:activeId===t.id?C.teal:C.text }}>{t.name}</span>
                          <div style={{ width:7,height:7,borderRadius:4,background:t.active?C.green:"#d1d5db",flexShrink:0 }}/>
                        </div>
                        <div style={{ display:"flex",gap:5 }}>
                          <span style={{ fontSize:10,fontWeight:700,padding:"1px 6px",borderRadius:4,background:`${tagColor(t.tag)}14`,color:tagColor(t.tag) }}>{t.tag}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Main panel */}
          <div style={{ flex:1,overflowY:"auto",padding:24 }}>
            {active && (
              <div style={{ maxWidth:760,margin:"0 auto" }}>
                {/* Template header */}
                <div style={{ display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:20,flexWrap:"wrap",gap:12 }}>
                  <div>
                    <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:6 }}>
                      <h1 style={{ fontSize:20,fontWeight:800,color:C.text,letterSpacing:"-0.02em" }}>{active.name}</h1>
                      <span style={{ fontSize:11,fontWeight:700,padding:"2px 9px",borderRadius:99,background:`${catColor(active.cat)}14`,color:catColor(active.cat) }}>{active.cat}</span>
                      <span style={{ fontSize:11,fontWeight:700,padding:"2px 9px",borderRadius:99,background:`${tagColor(active.tag)}14`,color:tagColor(active.tag) }}>{active.tag}</span>
                    </div>
                    <div style={{ fontSize:13,color:C.muted }}>ID: <code style={{ fontSize:11,background:C.offWhite,padding:"1px 6px",borderRadius:4,color:C.text }}>{active.id}</code></div>
                  </div>
                  <div style={{ display:"flex",gap:8,flexWrap:"wrap" }}>
                    <div style={{ display:"flex",alignItems:"center",gap:8,padding:"7px 12px",borderRadius:9,background:C.offWhite,border:`1px solid ${C.border}` }}>
                      <div style={{ width:8,height:8,borderRadius:4,background:active.active?C.green:"#d1d5db" }}/>
                      <span style={{ fontSize:12,fontWeight:600,color:C.text }}>{active.active?"Enabled":"Disabled"}</span>
                      <div onClick={()=>toggleActive(active.id)} style={{ width:34,height:18,borderRadius:9,background:active.active?C.teal:C.slateXL,position:"relative",cursor:"pointer",transition:"background 0.2s" }}>
                        <div style={{ position:"absolute",top:1,left:active.active?17:1,width:16,height:16,borderRadius:8,background:"#fff",transition:"left 0.2s",boxShadow:"0 1px 3px rgba(0,0,0,0.15)" }}/>
                      </div>
                    </div>
                    <Btn v="secondary" sz="sm" onClick={()=>setSendTestOpen(true)}>📤 Send Test</Btn>
                    {!editMode
                      ? <Btn v="primary"   sz="sm" onClick={startEdit}>✏️ Edit Template</Btn>
                      : <><Btn v="secondary" sz="sm" onClick={cancelEdit}>Cancel</Btn><Btn v="primary" sz="sm" onClick={saveEdit}>Save Changes</Btn></>
                    }
                  </div>
                </div>

                {/* Edit fields */}
                {editMode && (
                  <Card style={{ padding:20,marginBottom:20 }}>
                    <div style={{ fontSize:12,fontWeight:700,color:C.muted,letterSpacing:"0.07em",textTransform:"uppercase",marginBottom:14 }}>Editing Template</div>
                    <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
                      <div>
                        <label style={{ display:"block",fontSize:12,fontWeight:600,color:C.text,marginBottom:5 }}>Subject Line</label>
                        <input value={editSubject} onChange={e=>setEditSubject(e.target.value)}
                          style={{ width:"100%",padding:"10px 14px",borderRadius:9,border:`1.5px solid ${C.border}`,fontSize:13,outline:"none",boxSizing:"border-box",fontFamily:"inherit",color:C.text }}
                          onFocus={e=>e.target.style.borderColor=C.teal} onBlur={e=>e.target.style.borderColor=C.border}/>
                      </div>
                      <div>
                        <label style={{ display:"block",fontSize:12,fontWeight:600,color:C.text,marginBottom:5 }}>Preheader</label>
                        <input value={editPreheader} onChange={e=>setEditPreheader(e.target.value)}
                          style={{ width:"100%",padding:"10px 14px",borderRadius:9,border:`1.5px solid ${C.border}`,fontSize:13,outline:"none",boxSizing:"border-box",fontFamily:"inherit",color:C.text }}
                          onFocus={e=>e.target.style.borderColor=C.teal} onBlur={e=>e.target.style.borderColor=C.border}/>
                      </div>
                      <div>
                        <label style={{ display:"block",fontSize:12,fontWeight:600,color:C.text,marginBottom:5 }}>Body HTML</label>
                        <textarea rows={10} value={editBody} onChange={e=>setEditBody(e.target.value)}
                          style={{ width:"100%",padding:"10px 14px",borderRadius:9,border:`1.5px solid ${C.border}`,fontSize:12,outline:"none",boxSizing:"border-box",fontFamily:"monospace",color:C.text,resize:"vertical",lineHeight:1.6 }}
                          onFocus={e=>e.target.style.borderColor=C.teal} onBlur={e=>e.target.style.borderColor=C.border}/>
                      </div>
                    </div>
                  </Card>
                )}

                {/* Variables reference */}
                <Card style={{ padding:16,marginBottom:20 }}>
                  <div style={{ fontSize:11,fontWeight:700,color:C.muted,letterSpacing:"0.07em",textTransform:"uppercase",marginBottom:10 }}>Available Variables</div>
                  <div style={{ display:"flex",gap:6,flexWrap:"wrap" }}>
                    {Object.entries(VARS).map(([k,v])=>(
                      <div key={k} style={{ padding:"4px 10px",borderRadius:6,background:C.offWhite,border:`1px solid ${C.border}`,fontSize:11 }}>
                        <span style={{ color:C.teal,fontFamily:"monospace",fontWeight:700 }}>{k}</span>
                        <span style={{ color:C.muted,marginLeft:5 }}>→ {v}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Live preview */}
                <div style={{ marginBottom:8 }}>
                  <div style={{ fontSize:12,fontWeight:700,color:C.muted,letterSpacing:"0.07em",textTransform:"uppercase",marginBottom:12 }}>Live Preview</div>
                  <EmailPreview tpl={active} editBody={editBody} editSubject={editSubject} editPreheader={editPreheader} isEditing={editMode}/>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Send test modal */}
      <Modal open={sendTestOpen} onClose={()=>{ setSendTestOpen(false); setTestSent(false); }} title="Send Test Email">
        {testSent
          ? <div style={{ textAlign:"center",padding:"16px 0" }}>
              <div style={{ width:52,height:52,borderRadius:26,background:"rgba(16,185,129,0.12)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px" }}>
                <Icon d={I.check} size={24} sw={2.5} style={{ color:C.green }}/>
              </div>
              <div style={{ fontWeight:700,fontSize:16,color:C.text,marginBottom:4 }}>Test email sent!</div>
              <div style={{ fontSize:13,color:C.muted }}>Check your inbox at <strong>{testEmail}</strong></div>
            </div>
          : <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
              <div style={{ padding:"12px 14px",borderRadius:10,background:C.offWhite,border:`1px solid ${C.border}` }}>
                <div style={{ fontSize:12,color:C.muted,marginBottom:3 }}>Template</div>
                <div style={{ fontWeight:700,fontSize:14,color:C.text }}>{active?.name}</div>
              </div>
              <FInput label="Send to email" value={testEmail} onChange={e=>setTestEmail(e.target.value)}/>
              <div style={{ fontSize:12,color:C.muted }}>Variables will be substituted with sample data shown in the preview.</div>
              <div style={{ display:"flex",gap:10 }}>
                <Btn v="secondary" full onClick={()=>setSendTestOpen(false)}>Cancel</Btn>
                <Btn v="primary" full onClick={sendTest}>Send Test Email</Btn>
              </div>
            </div>
        }
      </Modal>
    </div>
  );
};

const PartnerAnalyticsPage = ({ nav }) => {
  const [sidebar,   setSidebar]   = useState(false);
  const [page,      setPage]      = useState("analytics");
  const [dateRange, setDateRange] = useState("90d");
  const [activeTab, setActiveTab] = useState("events");

  const navItems = [
    {id:"home",      icon:"home",     label:"Dashboard",    short:"Home"},
    {id:"events",    icon:"calendar", label:"My Events",    short:"Events"},
    {id:"cohort",    icon:"grid",     label:"Cohort",       short:"Cohort"},
    {id:"apps",      icon:"users",    label:"Applications", short:"Apps", badge:"12"},
    {id:"analytics", icon:"bar",      label:"Analytics",    short:"Stats"},
    {id:"pprofile",  icon:"building", label:"Org Profile",  short:"Profile"},
    {id:"gear",      icon:"gear",     label:"Settings",     short:"Settings"},
  ];

  const kpis = [
    { label:"Events Hosted",   value:"12",  delta:"+3",   sub:"vs last period", icon:"📅", color:C.teal },
    { label:"Total Reg.",      value:"434", delta:"+22%", sub:"vs last period", icon:"👤", color:"#6366F1" },
    { label:"Avg. Attendance", value:"91%", delta:"+6pp", sub:"fill rate",      icon:"🎟", color:C.green },
    { label:"Leads Generated", value:"122", delta:"+18%", sub:"via events",     icon:"🤝", color:C.amber },
    { label:"Avg. Conv. Rate", value:"27%", delta:"+4pp", sub:"lead → meeting", icon:"📊", color:C.teal },
    { label:"NPS Score",       value:"8.4", delta:"+0.6", sub:"out of 10",      icon:"⭐", color:"#6366F1" },
  ];

  const eventData = [
    {name:"Delhi Demo Day",    reg:82,  att:74,  leads:28, conv:34, nps:8.8, month:"Mar"},
    {name:"Startup Saturday",  reg:45,  att:39,  leads:14, conv:31, nps:7.9, month:"Feb"},
    {name:"Investor Meetup",   reg:110, att:96,  leads:41, conv:37, nps:9.1, month:"Feb"},
    {name:"EdTech Summit",     reg:67,  att:58,  leads:19, conv:28, nps:8.2, month:"Jan"},
    {name:"HealthTech Forum",  reg:53,  att:44,  leads:11, conv:21, nps:7.6, month:"Jan"},
    {name:"CleanTech Cohort",  reg:77,  att:71,  leads:9,  conv:12, nps:8.5, month:"Dec"},
  ];

  const weeklyReg = [
    {l:"W1",v:38},{l:"W2",v:51},{l:"W3",v:44},{l:"W4",v:67},
    {l:"W5",v:72},{l:"W6",v:58},{l:"W7",v:83},{l:"W8",v:91},
  ];
  const sparkMax = Math.max(...weeklyReg.map(d=>d.v));

  const leadSources = [
    {label:"Event Registrations", pct:42, color:C.teal},
    {label:"Direct Referrals",    pct:28, color:"#6366F1"},
    {label:"Platform Browse",     pct:18, color:C.green},
    {label:"Organic / Other",     pct:12, color:C.amber},
  ];

  const cohortRetention = [
    {cohort:"Dec 25", size:77,  w1:88, w2:79, w4:68},
    {cohort:"Jan 26", size:120, w1:91, w2:83, w4:71},
    {cohort:"Feb 26", size:155, w1:87, w2:76, w4:null},
    {cohort:"Mar 26", size:82,  w1:94, w2:null,w4:null},
  ];
  const retColor = v => v===null?"transparent":v>=85?C.green:v>=75?C.teal:v>=65?C.amber:C.red;

  const ranges = [["30d","30D"],["90d","90D"],["6m","6M"],["12m","1Y"]];

  return (
    <div style={{ background:C.offWhite, minHeight:"100vh" }}>
      <Sidebar nav={navItems} active={page}
        onSelect={p=>{ if(p!=="analytics"&&p!=="pprofile") nav("partner"); else if(p==="pprofile") nav("partnerProfile"); else setPage(p); }}
        role="Ecosystem Partner" open={sidebar} onClose={()=>setSidebar(false)} onSignOut={()=>nav("landing")}/>
      <div style={{ paddingBottom:62 }}>
        <TopBar title="Analytics" onMenu={()=>setSidebar(true)} nav={nav}/>
        <div style={{ padding:20, maxWidth:900, margin:"0 auto", paddingBottom:80 }}>

          {/* Header + range */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20, flexWrap:"wrap", gap:10 }}>
            <div>
              <h1 style={{ fontSize:22, fontWeight:800, color:C.text, marginBottom:4, letterSpacing:"-0.02em" }}>Event Analytics</h1>
              <p style={{ color:C.muted, fontSize:14 }}>Performance metrics across all your hosted events.</p>
            </div>
            <div style={{ display:"flex", gap:4, background:C.slateXL, borderRadius:9, padding:3 }}>
              {ranges.map(([id,label])=>(
                <button key={id} onClick={()=>setDateRange(id)}
                  style={{ padding:"5px 12px", borderRadius:7, border:"none", cursor:"pointer", fontFamily:"inherit",
                    fontSize:12, fontWeight:700,
                    background:dateRange===id?"#fff":"transparent",
                    color:dateRange===id?C.text:C.muted,
                    boxShadow:dateRange===id?"0 1px 4px rgba(0,0,0,0.1)":"none",
                    transition:"all 0.15s" }}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* KPI cards */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))", gap:10, marginBottom:20 }}>
            {kpis.map(k=>(
              <Card key={k.label} style={{ padding:"14px 16px" }}>
                <div style={{ fontSize:16, marginBottom:6 }}>{k.icon}</div>
                <div style={{ fontSize:11, color:C.muted, marginBottom:4, fontWeight:600 }}>{k.label}</div>
                <div style={{ fontSize:20, fontWeight:800, color:C.text, letterSpacing:"-0.02em" }}>{k.value}</div>
                <span style={{ fontSize:11, fontWeight:700, color:k.delta.startsWith("+")?C.green:C.red }}>{k.delta}</span>
                <span style={{ fontSize:11, color:C.muted, marginLeft:4 }}>{k.sub}</span>
              </Card>
            ))}
          </div>

          {/* Tab switch */}
          <div style={{ display:"flex", gap:4, background:C.slateXL, borderRadius:11, padding:4, marginBottom:16, width:"fit-content" }}>
            {[["events","Events Table"],["trend","Registration Trend"],["sources","Lead Sources"],["cohort","Cohort Retention"]].map(([id,label])=>(
              <button key={id} onClick={()=>setActiveTab(id)}
                style={{ padding:"7px 14px", borderRadius:8, border:"none", cursor:"pointer", fontFamily:"inherit",
                  fontSize:12, fontWeight:700, whiteSpace:"nowrap",
                  background:activeTab===id?"#fff":"transparent",
                  color:activeTab===id?C.text:C.muted,
                  boxShadow:activeTab===id?"0 1px 4px rgba(0,0,0,0.1)":"none",
                  transition:"all 0.15s" }}>
                {label}
              </button>
            ))}
          </div>

          {/* Events table */}
          {activeTab==="events" && (
            <Card style={{ padding:0, overflow:"hidden" }}>
              <div style={{ overflowX:"auto" }}>
                <table style={{ width:"100%", borderCollapse:"collapse", minWidth:500 }}>
                  <thead>
                    <tr style={{ borderBottom:`1px solid ${C.border}`, background:C.offWhite }}>
                      {["Event","Month","Registrations","Attended","Leads","Conv.","NPS"].map(h=>(
                        <th key={h} style={{ padding:"11px 14px", textAlign:"left", fontSize:11, fontWeight:700, color:C.muted, letterSpacing:"0.05em", textTransform:"uppercase", whiteSpace:"nowrap" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {eventData.map((ev,i)=>(
                      <tr key={i} style={{ borderBottom:i<eventData.length-1?`1px solid ${C.slateXL}`:"none" }}>
                        <td style={{ padding:"12px 14px", fontWeight:600, fontSize:14, color:C.text }}>{ev.name}</td>
                        <td style={{ padding:"12px 14px", fontSize:12, color:C.muted }}>{ev.month}</td>
                        <td style={{ padding:"12px 14px", fontSize:13, fontWeight:700, color:C.text }}>{ev.reg}</td>
                        <td style={{ padding:"12px 14px" }}>
                          <span style={{ fontSize:13, fontWeight:700, color:ev.att/ev.reg>0.85?C.green:ev.att/ev.reg>0.7?C.teal:C.amber }}>
                            {ev.att} <span style={{ fontSize:11, fontWeight:500, color:C.muted }}>({Math.round(ev.att/ev.reg*100)}%)</span>
                          </span>
                        </td>
                        <td style={{ padding:"12px 14px", fontSize:13, fontWeight:700, color:C.text }}>{ev.leads}</td>
                        <td style={{ padding:"12px 14px" }}>
                          <span style={{ display:"inline-block", padding:"2px 8px", borderRadius:6,
                            background:ev.conv>30?"rgba(16,185,129,0.1)":"rgba(245,158,11,0.1)",
                            color:ev.conv>30?C.green:C.amber, fontSize:12, fontWeight:700 }}>
                            {ev.conv}%
                          </span>
                        </td>
                        <td style={{ padding:"12px 14px" }}>
                          <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                            <span style={{ fontSize:13, fontWeight:700, color:ev.nps>=8.5?C.green:ev.nps>=7?C.teal:C.amber }}>{ev.nps}</span>
                            <span style={{ fontSize:10, color:C.muted }}>/10</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {/* Registration trend chart */}
          {activeTab==="trend" && (
            <Card style={{ padding:22 }}>
              <div style={{ fontWeight:700, fontSize:14, color:C.text, marginBottom:4 }}>Weekly Registrations</div>
              <div style={{ fontSize:12, color:C.muted, marginBottom:18 }}>Total registrations across all events per week</div>
              <svg width="100%" height="150" viewBox="0 0 560 150" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="regGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366F1" stopOpacity="0.25"/>
                    <stop offset="100%" stopColor="#6366F1" stopOpacity="0.02"/>
                  </linearGradient>
                </defs>
                {[0,25,50,75,100].map(p=>(
                  <line key={p} x1="0" y1={150-p*1.4} x2="560" y2={150-p*1.4} stroke={C.slateXL} strokeWidth="1"/>
                ))}
                {(()=>{
                  const pts = weeklyReg.map((d,i,arr)=>[
                    i*(560/(arr.length-1)),
                    150 - (d.v/sparkMax)*138 - 6
                  ]);
                  const path = pts.map(([x,y],i)=>i===0?`M${x},${y}`:`C${x-26},${pts[i-1][1]} ${x-26},${y} ${x},${y}`).join(" ");
                  const area = path + ` L${pts[pts.length-1][0]},150 L0,150 Z`;
                  return (
                    <>
                      <path d={area} fill="url(#regGrad)"/>
                      <path d={path} fill="none" stroke="#6366F1" strokeWidth="2.5" strokeLinecap="round"/>
                      {pts.map(([x,y],i)=>(
                        <circle key={i} cx={x} cy={y} r="4" fill="#6366F1" stroke="#fff" strokeWidth="2"/>
                      ))}
                    </>
                  );
                })()}
              </svg>
              <div style={{ display:"flex", justifyContent:"space-between", marginTop:8 }}>
                {weeklyReg.map(d=>(
                  <span key={d.l} style={{ fontSize:10, color:C.muted }}>{d.l}</span>
                ))}
              </div>
            </Card>
          )}

          {/* Lead sources */}
          {activeTab==="sources" && (
            <Card style={{ padding:22 }}>
              <div style={{ fontWeight:700, fontSize:14, color:C.text, marginBottom:16 }}>Lead Source Breakdown</div>
              {leadSources.map(s=>(
                <div key={s.label} style={{ marginBottom:14 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                    <span style={{ fontSize:13, color:C.text, fontWeight:500 }}>{s.label}</span>
                    <span style={{ fontSize:13, fontWeight:700, color:s.color }}>{s.pct}%</span>
                  </div>
                  <div style={{ height:8, borderRadius:999, background:C.slateXL }}>
                    <div style={{ width:`${s.pct}%`, height:"100%", borderRadius:999, background:s.color, transition:"width 0.5s" }}/>
                  </div>
                  <div style={{ fontSize:11, color:C.muted, marginTop:3 }}>
                    {Math.round(122 * s.pct/100)} leads this period
                  </div>
                </div>
              ))}
            </Card>
          )}

          {/* Cohort retention */}
          {activeTab==="cohort" && (
            <Card style={{ padding:20 }}>
              <div style={{ fontWeight:700, fontSize:14, color:C.text, marginBottom:4 }}>Attendee Retention</div>
              <p style={{ fontSize:12, color:C.muted, marginBottom:16 }}>% of attendees who returned to a subsequent event</p>
              <div style={{ overflowX:"auto" }}>
                <table style={{ width:"100%", borderCollapse:"collapse", minWidth:360 }}>
                  <thead>
                    <tr>
                      {["Cohort","Size","Event 1","Event 2","Event 4+"].map(h=>(
                        <th key={h} style={{ padding:"8px 12px", textAlign:h==="Cohort"||h==="Size"?"left":"center",
                          fontSize:11, fontWeight:700, color:C.muted, textTransform:"uppercase", letterSpacing:"0.05em" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {cohortRetention.map((row,i)=>(
                      <tr key={i} style={{ borderTop:`1px solid ${C.slateXL}` }}>
                        <td style={{ padding:"10px 12px", fontSize:13, fontWeight:600, color:C.text }}>{row.cohort}</td>
                        <td style={{ padding:"10px 12px", fontSize:13, color:C.muted }}>{row.size}</td>
                        {[row.w1, row.w2, row.w4].map((v,ci)=>(
                          <td key={ci} style={{ padding:"10px 12px", textAlign:"center" }}>
                            {v===null
                              ? <span style={{ color:C.slateL, fontSize:12 }}>—</span>
                              : <span style={{ display:"inline-block", padding:"3px 8px", borderRadius:6,
                                  background:retColor(v)+"18", color:retColor(v), fontSize:12, fontWeight:700 }}>{v}%</span>
                            }
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

        </div>
      </div>
      <BottomNav nav={navItems} active={page} onSelect={p=>{ if(p!=="analytics"&&p!=="pprofile") nav("partner"); else if(p==="pprofile") nav("partnerProfile"); else setPage(p); }}/>
    </div>
  );
};

export default function App() {
  useEffect(()=>{
    // Prevent double-tap zoom on mobile
    let lastTap = 0;
    const handler = e => {
      const now = Date.now();
      if(now - lastTap < 300) e.preventDefault();
      lastTap = now;
    };
    document.addEventListener("touchend", handler, {passive:false});
    return ()=>document.removeEventListener("touchend", handler);
  },[]);
  const [page, setPage] = useState("landing");

  const demoPages = [
    ["landing","Landing"],
    ["role","Role"],
    ["login","Login"],
    ["adminLogin","Admin Login"],
    ["signup","Signup"],
    ["verifyEmail","Email OTP"],
    ["kycUpload","KYC Upload"],
    ["verifyPending","Pending Review"],
    ["pricing","Pricing"],
    ["subscription","Subs"],
    ["billing","Billing"],
    ["couponUser","Coupon"],
    ["affiliate","Affiliate"],
    ["founder","Founder"],
    ["founderDocs","F.Docs"],
    ["investor","Investor"],
    ["investorProfile","I.Profile"],
    ["portfolio","Portfolio"],
    ["partner","Partner"],
    ["partnerProfile","P.Profile"],
    ["partnerAnalytics","P.Analytics"],
    ["admin","Admin"],
    ["adminModeration","Moderation"],
    ["adminSettings","A.Settings"],
    ["adminCoupons","A Coupons"],
    ["adminPayment","A.Payment"],
    ["dealRoom","Deal Room"],
    ["adminUserDetail","User Detail"],
    ["emailTemplates","Email Templates"],
    ["notifications","Notifs"],
    ["search","Search"],
  ];

  const render = () => {
    switch(page){
      case "landing":          return <Landing nav={setPage}/>;
      case "role":             return <RoleSelect nav={setPage}/>;
      case "login":            return <LoginPage nav={setPage}/>;
      case "adminLogin":       return <AdminLoginPage nav={setPage}/>;
      case "signup":           return <SignupPage nav={setPage}/>;
      case "verifyEmail":      return <VerifyEmailPage nav={setPage}/>;
      case "kycUpload":        return <KycUploadPage nav={setPage}/>;
      case "verifyPending":    return <VerifyPendingPage nav={setPage}/>;
      case "pricing":          return <PricingPage nav={setPage}/>;
      case "subscription":     return <SubscriptionPage nav={setPage}/>;
      case "billing":          return <BillingPage nav={setPage}/>;
      case "couponUser":       return <CouponUserPage nav={setPage}/>;
      case "affiliate":        return <AffiliatePage nav={setPage}/>;
      case "founder":          return <FounderDash nav={setPage}/>;
      case "founderDocs":      return <FounderDocsPage nav={setPage}/>;
      case "investor":         return <InvestorDash nav={setPage}/>;
      case "investorProfile":  return <InvestorProfilePage nav={setPage}/>;
      case "portfolio":        return <PortfolioPage nav={setPage}/>;
      case "partner":          return <PartnerDash nav={setPage}/>;
      case "partnerProfile":   return <PartnerProfilePage nav={setPage}/>;
      case "partnerAnalytics": return <PartnerAnalyticsPage nav={setPage}/>;
      case "admin":            return <AdminDash nav={setPage}/>;
      case "adminModeration":  return <AdminModerationPage nav={setPage}/>;
      case "adminSettings":    return <AdminSettingsPage2 nav={setPage}/>;
      case "adminCoupons":     return <AdminCouponsPage nav={setPage}/>;
      case "adminPayment":     return <AdminPaymentPage nav={setPage}/>;
      case "dealRoom":         return <InvestorDealRoom nav={setPage}/>;
      case "adminUserDetail":  return <AdminUserDetailPage nav={setPage}/>;
      case "emailTemplates":   return <AdminEmailTemplatesPage nav={setPage}/>;
      case "notifications":    return <NotificationsPage nav={setPage}/>;
      case "search":           return <SearchPage nav={setPage}/>;
      default:                 return <Landing nav={setPage}/>;
    }
  };

  return (
    <ToastProvider>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        body{font-family:'DM Sans',sans-serif;-webkit-font-smoothing:antialiased;}
        ::-webkit-scrollbar{width:4px;height:4px;}
        ::-webkit-scrollbar-thumb{background:#CBD5E1;border-radius:2px;}
        @keyframes slideUp{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}
        @keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
        input,select,textarea,button{font-family:'DM Sans',sans-serif;}
      `}</style>

      {/* Demo switcher */}
      <div style={{ position:"fixed",top:0,left:0,right:0,zIndex:9999,
        background:C.navy,borderBottom:"1px solid rgba(255,255,255,0.08)",
        display:"flex",alignItems:"center",gap:4,padding:"5px 12px",
        overflowX:"auto",boxShadow:"0 2px 12px rgba(0,0,0,0.25)" }}>
        <span style={{ color:"rgba(255,255,255,0.25)",fontSize:10,fontWeight:700,
          letterSpacing:"0.1em",whiteSpace:"nowrap",marginRight:4 }}>DEMO:</span>
        {demoPages.map(([id,label])=>(
          <button key={id} onClick={()=>setPage(id)}
            style={{ padding:"4px 10px",borderRadius:6,border:"none",
              background:page===id?C.teal:"rgba(255,255,255,0.07)",
              color:page===id?"#fff":"rgba(255,255,255,0.5)",
              fontSize:11,fontWeight:600,cursor:"pointer",
              whiteSpace:"nowrap",fontFamily:"'DM Sans',sans-serif",
              transition:"all 0.15s" }}>
            {label}
          </button>
        ))}
      </div>

      <div style={{ paddingTop:34 }}>
        {render()}
      </div>
    </ToastProvider>
  );
}
