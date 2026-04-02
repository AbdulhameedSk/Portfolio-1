import { useState, useEffect, useRef, useCallback } from "react";
import { SpaceBackground } from "./components/three/SpaceBackground";
import { Nav } from "./components/sections/Nav";
import { Hero, Marquee, About, GitHub, Experience, Projects, Skills, Education, Contact, Footer } from "./components/sections/Sections";
import { useScramble, useTypingRole, useParticleBurst, useAmbientMusic } from "./hooks";
import { ROLES } from "./data/resume";

export default function App() {
  // Refs for Three.js (no re-renders)
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);

  // UI state
  const [scrollY, setScrollY] = useState(0);

  // Cursor refs (RAF-driven)
  const dotRef = useRef(null);
  const glowRef = useRef(null);
  const cursorPos = useRef({ x: -100, y: -100 });
  const glowPos = useRef({ x: -100, y: -100 });

  // Animated text
  const heroName = useScramble("ABDULHAMEED", 38);
  const typedRole = useTypingRole(ROLES);

  // Particle burst + music
  const { canvasRef, burst } = useParticleBurst();
  const { playing, toggle: toggleMusic } = useAmbientMusic();

  // Event listeners + cursor RAF loop
  useEffect(() => {
    const onMouseMove = (e) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
      cursorPos.current = { x: e.clientX, y: e.clientY };
    };
    const onScroll = () => {
      scrollRef.current = window.scrollY;
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll);

    // Cursor animation (GPU-accelerated, zero re-renders)
    let rafId;
    const tick = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${cursorPos.current.x - 4}px, ${cursorPos.current.y - 4}px)`;
      }
      glowPos.current.x += (cursorPos.current.x - glowPos.current.x) * 0.12;
      glowPos.current.y += (cursorPos.current.y - glowPos.current.y) * 0.12;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${glowPos.current.x - 200}px, ${glowPos.current.y - 200}px)`;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Helpers
  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const scrollProgress = Math.min(1, scrollY / 400);
  const pageProgress = Math.min(1, scrollY / (document.documentElement?.scrollHeight - window.innerHeight || 1));

  const handleBurstClick = (e, action) => {
    burst(e.clientX, e.clientY);
    if (action) action();
  };

  return (
    <div style={{ background: "#050510", color: "#e8e6e3", fontFamily: "var(--fb)", minHeight: "100vh", overflowX: "hidden" }}>

      {/* 3D Space background */}
      <SpaceBackground mouseRef={mouseRef} scrollRef={scrollRef} />

      {/* Progress bar */}
      <div style={{
        position: "fixed", top: 0, left: 0,
        width: `${pageProgress * 100}%`, height: 3,
        background: "linear-gradient(90deg,#6c9cff,#5cffb1)",
        zIndex: 200, borderRadius: "0 2px 2px 0",
        boxShadow: "0 0 10px rgba(108,156,255,0.6)",
      }} />

      {/* Particle burst canvas */}
      <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 150, pointerEvents: "none" }} />

      {/* Custom cursor */}
      <div ref={glowRef} className="cursor-glow" style={{
        position: "fixed", top: 0, left: 0, width: 400, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle,rgba(108,156,255,0.07) 0%,transparent 70%)",
        pointerEvents: "none", zIndex: 1, willChange: "transform",
      }} />
      <div ref={dotRef} className="cursor-dot" style={{
        position: "fixed", top: 0, left: 0, width: 8, height: 8, borderRadius: "50%",
        background: "#6c9cff", pointerEvents: "none", zIndex: 1000, willChange: "transform",
        boxShadow: "0 0 15px rgba(108,156,255,0.56),0 0 30px rgba(108,156,255,0.25)",
      }} />

      {/* Floating orbs */}
      {[
        { w: 500, bg: "rgba(108,156,255,0.05)", top: "5%", right: "-8%", dur: "16s" },
        { w: 400, bg: "rgba(92,255,177,0.035)", bottom: "15%", left: "-5%", dur: "22s", dir: "reverse" },
      ].map((o, i) => (
        <div key={i} style={{
          position: "fixed", width: o.w, height: o.w, borderRadius: "50%",
          background: o.bg, filter: "blur(80px)", pointerEvents: "none", zIndex: 0,
          top: o.top, bottom: o.bottom, left: o.left, right: o.right,
          animation: `orbFloat ${o.dur} ease-in-out infinite ${o.dir || ""}`,
        }} />
      ))}

      {/* Navigation */}
      <Nav scrollTo={scrollTo} scrollProgress={scrollProgress} playing={playing} toggleMusic={toggleMusic} />

      {/* Page sections */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <Hero heroName={heroName} typedRole={typedRole} onBurstClick={handleBurstClick} scrollTo={scrollTo} />
        <Marquee />
        <About />
        <GitHub />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
