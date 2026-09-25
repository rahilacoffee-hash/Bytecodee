import { useEffect, useRef } from "react";
import { animate } from "framer-motion";

export default function MotionCounter({ value, isInView }) {
  let ref = useRef(null);
  let hasRun = useRef(false);

  useEffect(() => {
    if (!isInView) {
      // reset so it re-animates next time it comes into view
      hasRun.current = false;
      if (ref.current) ref.current.textContent = "0";
      return;
    }
    if (hasRun.current) return;
    hasRun.current = true;

    let controls = animate(0, value, {
      duration: 2,
      ease: "easeOut",
      onUpdate(v) {
        if (ref.current) ref.current.textContent = Math.floor(v);
      },
    });

    return () => controls.stop();
  }, [isInView, value]);

  return <span ref={ref}>0</span>;
}