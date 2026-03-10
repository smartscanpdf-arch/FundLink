import React, { useEffect } from "react";
import { C } from "../../utils/colors";
import { Icon } from "../common/Icon";
import { I } from "../../utils/icons";

export const Modal = ({ open, onClose, title, children, maxW=480 }) => {
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
