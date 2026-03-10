import React, { useEffect } from "react";
import { C } from "../../utils/colors";
import { Icon } from "../common/Icon";
import { I } from "../../utils/icons";

export const Drawer = ({ open, onClose, title, children }) => {
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
