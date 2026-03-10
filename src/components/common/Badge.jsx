import React from "react";
import { C } from "../../utils/colors";
import { Icon } from "./Icon";
import { I } from "../../utils/icons";

export const Badge = ({ children, v = "teal" }) => {
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

export const VBadge = () => (
  <span style={{ display:"inline-flex", alignItems:"center", gap:3, padding:"2px 7px",
    borderRadius:999, fontSize:11, fontWeight:700, letterSpacing:"0.04em",
    background:"rgba(31,163,163,0.12)", color:C.teal, border:`1px solid ${C.tealBd}` }}>
    <Icon d={I.shield} size={11} sw={2.5}/>Verified
  </span>
);
