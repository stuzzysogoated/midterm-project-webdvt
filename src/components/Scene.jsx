import { memo, useEffect, useRef } from "react";
import "./Scene.css";

const ORBS = [
  { size: 340, top: "-8%", left: "-6%", color: "gold", depth: 0.02 },
  { size: 220, top: "58%", left: "88%", color: "maroon", depth: 0.035 },
  { size: 160, top: "78%", left: "8%", color: "gold", depth: 0.015 },
];

const RINGS = [
  { size: 420, top: "6%", left: "72%", depth: 0.05 },
  { size: 260, top: "70%", left: "-4%", depth: 0.03 },
];

// Background decoration only — memoized so it never re-renders when
// transaction/theme state changes elsewhere in the tree.
function SceneBase() {
  const sceneRef = useRef(null);
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduceMotion) return;
    let raf = null;
    const handlePointer = (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        sceneRef.current?.style.setProperty("--px", x.toFixed(3));
        sceneRef.current?.style.setProperty("--py", y.toFixed(3));
      });
    };
    window.addEventListener("pointermove", handlePointer, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointer);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduceMotion]);

  return (
    <div className="scene" ref={sceneRef} aria-hidden="true">
      <div className="scene__grid" />
      {ORBS.map((orb, i) => (
        <div
          key={i}
          className="scene__parallax"
          style={{ top: orb.top, left: orb.left, "--depth": orb.depth }}
        >
          <div
            className={`scene__orb scene__orb--${orb.color}`}
            style={{ width: orb.size, height: orb.size, animationDelay: `${i * 1.4}s` }}
          />
        </div>
      ))}
      {RINGS.map((ring, i) => (
        <div
          key={i}
          className="scene__parallax"
          style={{ top: ring.top, left: ring.left, "--depth": ring.depth }}
        >
          <div
            className="scene__ring"
            style={{ width: ring.size, height: ring.size, animationDelay: `${i * 2}s` }}
          />
        </div>
      ))}
    </div>
  );
}

export const Scene = memo(SceneBase);
