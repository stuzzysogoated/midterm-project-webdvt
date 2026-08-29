import { useCallback, useRef } from "react";

/**
 * useTilt — subtle cursor-driven 3D tilt using plain CSS transforms.
 * Chosen over a WebGL/Three.js solution per the "simplest appropriate
 * technology" rule: a floating glass card only needs perspective + rotateX/Y,
 * which CSS handles at full frame rate with zero extra dependencies.
 */
export function useTilt({ max = 6, scale = 1.015 } = {}) {
  const ref = useRef(null);
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const onMouseMove = useCallback(
    (e) => {
      if (reduceMotion || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rotateY = (px - 0.5) * max * 2;
      const rotateX = (0.5 - py) * max * 2;
      ref.current.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`;
      ref.current.style.setProperty("--glare-x", `${px * 100}%`);
      ref.current.style.setProperty("--glare-y", `${py * 100}%`);
    },
    [max, scale, reduceMotion]
  );

  const onMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
