import React from "react";
import { C } from "../../utils/colors";

export const ProgressBar = ({ value }) => (
  <div style={{ height:8, borderRadius:999, background:C.slateXL, overflow:"hidden" }}>
    <div style={{ width:`${value}%`, height:"100%",
      background:`linear-gradient(90deg,${C.teal},${C.tealLt})`,
      borderRadius:999, transition:"width 0.6s ease" }}/>
  </div>
);
