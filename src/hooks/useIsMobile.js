import { useState, useEffect } from "react";

export const useIsMobile = (bp=768) => {
  const [mobile, setMobile] = useState(typeof window!=="undefined"?window.innerWidth<bp:false);
  useEffect(()=>{
    const fn=()=>setMobile(window.innerWidth<bp);
    fn();
    window.addEventListener("resize",fn);
    return ()=>window.removeEventListener("resize",fn);
  },[bp]);
  return mobile;
};
