import React, { createContext, useState } from "react";
import { C } from "../utils/colors";

export const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
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
