import React, { useState } from "react";
import { C } from "../../utils/colors";

export const Card = ({ children, style, onClick }) => {
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
