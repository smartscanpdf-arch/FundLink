import React from "react";
import { C } from "../../utils/colors";

export const Skeleton = ({ w="100%", h=14, r=8, style={} }) => (
  <div style={{ width:w, height:h, borderRadius:r, background:"linear-gradient(90deg,#E2E8F0 25%,#F1F5F9 50%,#E2E8F0 75%)", backgroundSize:"200% 100%", animation:"shimmer 1.4s ease infinite", flexShrink:0, ...style }}/>
);

export const SkeletonCard = ({ rows=3, hasAvatar=false, style={} }) => (
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
