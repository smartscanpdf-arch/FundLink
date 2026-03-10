import React, { useState } from "react";
import { C } from "../../utils/colors";

export const FInput = ({ label, placeholder, type="text", defaultValue, value, onChange, rows, disabled }) => {
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
