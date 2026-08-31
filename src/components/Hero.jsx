import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate, useReducedMotion } from "framer-motion";
import { Logo } from "./Logo";
import "./Hero.css";

// Precomputed (not random-per-render) so the stack looks the same on every
// mount/scroll instead of jittering. Six bills is enough to read as "a stack"
// without needing a real 3D engine — CSS perspective carries the depth.
const BILLS = [
  { rotate: -3, dx: -6 },
  { rotate: 2, dx: 8 },
  { rotate: -1.5, dx: -3 },
  { rotate: 3, dx: 5 },
  { rotate: -2, dx: -8 },
  { rotate: 1.5, dx: 4 },
];

function Bill({ index, scrollYProgress }) {
  const start = 0.04 + index * 0.075;
  const end = start + 0.09;
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const y = useTransform(scrollYProgress, [start, end], [46, 0]);
  const rotate = useTransform(scrollYProgress, [start, end], [BILLS[index].rotate * 4, BILLS[index].rotate]);

  return (
    <motion.div
      className="hero-bill"
      style={{
        opacity,
        y,
        rotate,
        x: BILLS[index].dx,
        bottom: index * 17,
        zIndex: index,
      }}
    >
      <span className="hero-bill__corner hero-bill__corner--tl">₱</span>
      <span className="hero-bill__mark" aria-hidden="true">
        STRAKD
      </span>
      <span className="hero-bill__corner hero-bill__corner--br">₱</span>
    </motion.div>
  );
}

function ScrollHero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  const wordmarkOpacity = useTransform(scrollYProgress, [0.48, 0.82], [0, 1]);
  const wordmarkY = useTransform(scrollYProgress, [0.48, 0.82], [26, 0]);
  const wordmarkBlur = useTransform(scrollYProgress, [0.48, 0.82], [14, 0]);
  const wordmarkFilter = useMotionTemplate`blur(${wordmarkBlur}px)`;

  const taglineOpacity = useTransform(scrollYProgress, [0.6, 0.92], [0, 1]);
  const taglineY = useTransform(scrollYProgress, [0.6, 0.92], [18, 0]);

  const hintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.6], [0.25, 0.7]);

  return (
    <section className="hero" ref={containerRef} aria-label="STRAKD introduction">
      <div className="hero__pin">
        <motion.div className="hero__glow" style={{ opacity: glowOpacity }} aria-hidden="true" />
        <div className="hero__ring hero__ring--a" aria-hidden="true" />
        <div className="hero__ring hero__ring--b" aria-hidden="true" />

        <div className="hero__stage">
          <div className="hero__bills" aria-hidden="true">
            {BILLS.map((_, i) => (
              <Bill key={i} index={i} scrollYProgress={scrollYProgress} />
            ))}
          </div>

          <motion.div
            className="hero__wordmark"
            style={{ opacity: wordmarkOpacity, y: wordmarkY, filter: wordmarkFilter }}
          >
            <Logo size="lg" />
          </motion.div>

          <motion.div className="hero__tagline" style={{ opacity: taglineOpacity, y: taglineY }}>
            <p className="hero__tagline-primary">TRACK. STACK. REPEAT.</p>
            <p className="hero__tagline-secondary">Track your flow. Stack your future.</p>
          </motion.div>
        </div>

        <motion.div className="hero__hint" style={{ opacity: hintOpacity }} aria-hidden="true">
          <span>SCROLL TO BUILD YOUR STACK</span>
          <span className="hero__hint-arrow">↓</span>
        </motion.div>
      </div>
    </section>
  );
}

function StaticHero() {
  return (
    <section className="hero hero--static" aria-label="STRAKD introduction">
      <div className="hero__stage">
        <div className="hero__bills hero__bills--static" aria-hidden="true">
          {BILLS.map((_, i) => (
            <div
              key={i}
              className="hero-bill"
              style={{ transform: `translateY(0) rotate(${BILLS[i].rotate}deg) translateX(${BILLS[i].dx}px)`, bottom: i * 17, zIndex: i, opacity: 1 }}
            >
              <span className="hero-bill__corner hero-bill__corner--tl">₱</span>
              <span className="hero-bill__mark">STRAKD</span>
              <span className="hero-bill__corner hero-bill__corner--br">₱</span>
            </div>
          ))}
        </div>
        <div className="hero__wordmark">
          <Logo size="lg" />
        </div>
        <div className="hero__tagline">
          <p className="hero__tagline-primary">TRACK. STACK. REPEAT.</p>
          <p className="hero__tagline-secondary">Track your flow. Stack your future.</p>
        </div>
      </div>
    </section>
  );
}

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  return prefersReducedMotion ? <StaticHero /> : <ScrollHero />;
}
