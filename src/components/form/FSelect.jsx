import React, { useState } from "react";
import { C } from "../../utils/colors";

export const FSelect = ({ label, options, value, onChange }) => {
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
