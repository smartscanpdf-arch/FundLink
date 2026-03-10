import React from "react";
import { C } from "../../utils/colors";
import { Btn } from "../common/Button";

export const EmptyState = ({ icon="📭", title, body, cta, onCta, ctaSecondary, onCtaSecondary, compact=false }) => (
  <div style={{ textAlign:"center", padding:compact?"32px 20px":"64px 20px" }}>
    <div style={{ fontSize:compact?36:52, marginBottom:compact?10:16, lineHeight:1 }}>{icon}</div>
    <div style={{ fontWeight:700, fontSize:compact?15:17, color:C.text, marginBottom:6 }}>{title}</div>
    {body && <div style={{ fontSize:13, color:C.muted, lineHeight:1.65, maxWidth:280, margin:"0 auto", marginBottom:cta?20:0 }}>{body}</div>}
    {cta && (
      <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap", marginTop:body?0:16 }}>
        <Btn v="primary" sz="sm" onClick={onCta}>{cta}</Btn>
        {ctaSecondary && <Btn v="secondary" sz="sm" onClick={onCtaSecondary}>{ctaSecondary}</Btn>}
      </div>
    )}
  </div>
);
