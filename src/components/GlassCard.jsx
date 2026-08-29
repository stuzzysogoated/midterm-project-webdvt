import { memo } from "react";
import { motion } from "framer-motion";
import { useTilt } from "../hooks/useTilt";
import "./GlassCard.css";

function GlassCardBase({ children, tilt = true, strong = false, className = "", ...rest }) {
  const { ref, onMouseMove, onMouseLeave } = useTilt({ max: 5, scale: 1.012 });

  return (
    <motion.div
      ref={tilt ? ref : undefined}
      onMouseMove={tilt ? onMouseMove : undefined}
      onMouseLeave={tilt ? onMouseLeave : undefined}
      className={`glass-card ${strong ? "glass-card--strong" : ""} ${tilt ? "glass-card--tilt" : ""} ${className}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      <div className="glass-card__glare" aria-hidden="true" />
      <div className="glass-card__content">{children}</div>
    </motion.div>
  );
}

// Cards re-render whenever a parent list re-renders; the tilt effect and
// content are stable per transaction, so memoizing avoids re-rendering every
// card in the list when only one transaction changes.
export const GlassCard = memo(GlassCardBase);
