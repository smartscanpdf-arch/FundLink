import React from "react";
import { C } from "../../utils/colors";
import { Icon } from "./Icon";
import { I } from "../../utils/icons";

export const Btn = ({ children, v="primary", sz="md", onClick, full, icon, disabled }) => {
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
