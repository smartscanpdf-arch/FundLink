import React from "react";

export const Avatar = ({ name="?", size=40 }) => {
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
