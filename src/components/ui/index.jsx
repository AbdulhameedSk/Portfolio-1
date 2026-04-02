import { useState, useEffect, useRef } from "react";

/** Scroll-triggered fade-in + slide-up */
export function Reveal({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.05 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(40px)",
      transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
      ...style,
    }}>{children}</div>
  );
}

/** Animated counter that counts up when visible */
export function Counter({ end, suffix = "" }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.5 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!started) return;
    let cur = 0;
    const inc = end / 50;
    const iv = setInterval(() => {
      cur += inc;
      if (cur >= end) { setVal(end); clearInterval(iv); }
      else setVal(Math.floor(cur * 10) / 10);
    }, 30);
    return () => clearInterval(iv);
  }, [started, end]);
  return <span ref={ref}>{end % 1 !== 0 ? val.toFixed(1) : Math.floor(val)}{suffix}</span>;
}

/** Section header with number + label + title */
export function SectionHead({ num, label, title, center }) {
  return (
    <div style={{ textAlign: center ? "center" : "left", marginBottom: title ? 48 : 16 }}>
      <div style={{ fontFamily: "var(--fm)", fontSize: "clamp(0.6rem,1vw,0.7rem)", letterSpacing: 4, textTransform: "uppercase", color: "#6c9cff", marginBottom: title ? 12 : 8 }}>
        {num ? `// ${num} — ${label}` : `// ${label}`}
      </div>
      {title && <h2 className="s-title" style={{ fontFamily: "var(--fd)", fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 700, letterSpacing: -1 }}>{title}</h2>}
    </div>
  );
}

/** Glass card with hover effect */
export function GlassCard({ children, left }) {
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{
      background: h ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.03)",
      border: `1px solid ${h ? "rgba(108,156,255,0.15)" : "rgba(255,255,255,0.06)"}`,
      borderLeft: left ? (h ? "3px solid #6c9cff" : "3px solid rgba(108,156,255,0.1)") : undefined,
      borderRadius: 16, transition: "all .35s", cursor: "default",
      marginBottom: left ? 18 : 0,
      transform: h ? (left ? "translateX(4px)" : "translateY(-3px)") : "none",
    }}>{children}</div>
  );
}

/** 3D parallax tilt card for projects */
export function TiltCard({ children, color }) {
  const ref = useRef(null);
  const [style, setStyle] = useState({});
  const [hovered, setHovered] = useState(false);
  return (
    <div ref={ref}
      onMouseMove={e => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        setStyle({
          transform: `perspective(600px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale(1.02)`,
          boxShadow: `${-x * 20}px ${y * 20}px 40px ${color}18`,
        });
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setStyle({}); setHovered(false); }}
      style={{
        ...style,
        background: `linear-gradient(135deg, rgba(255,255,255,0.03), ${hovered ? "rgba(255,255,255,0.04)" : "transparent"})`,
        border: `1px solid ${hovered ? color + "33" : "rgba(255,255,255,0.06)"}`,
        borderRadius: 18, padding: "clamp(24px,3vw,36px)",
        transition: "transform .15s ease-out, box-shadow .3s, border-color .3s",
        position: "relative", overflow: "hidden", willChange: "transform",
      }}>
      <div style={{ position: "absolute", top: -50, right: -50, width: 100, height: 100, borderRadius: "50%", background: color, filter: "blur(50px)", opacity: hovered ? 0.12 : 0.03, transition: "opacity .4s" }} />
      {children}
    </div>
  );
}

/** Magnetic hover nav link */
export function MagLink({ children, onClick }) {
  const ref = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  return (
    <a ref={ref} onClick={onClick}
      onMouseMove={e => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        setOffset({ x: (e.clientX - r.left - r.width / 2) * 0.35, y: (e.clientY - r.top - r.height / 2) * 0.35 });
      }}
      onMouseEnter={e => e.target.style.color = "#e8e6e3"}
      onMouseLeave={e => { e.target.style.color = "#5a5a7a"; setOffset({ x: 0, y: 0 }); }}
      style={{
        color: "#5a5a7a", textDecoration: "none", fontFamily: "var(--fm)",
        fontSize: "0.68rem", letterSpacing: 2, textTransform: "uppercase",
        cursor: "pointer", transition: "color .3s, transform .2s ease-out",
        display: "inline-block", transform: `translate(${offset.x}px, ${offset.y}px)`,
      }}>
      {children}
    </a>
  );
}

/** Skill pill with hover color */
export function SkillPill({ label, color }) {
  const [h, setH] = useState(false);
  return (
    <span onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{
      padding: "4px 13px", borderRadius: 7, fontSize: "0.8rem", fontWeight: 500,
      cursor: "default", display: "inline-block",
      background: h ? `${color}18` : "rgba(255,255,255,0.03)",
      border: `1px solid ${h ? color + "30" : "rgba(255,255,255,0.06)"}`,
      color: h ? color : "#e8e6e3", transition: "all .25s",
      transform: h ? "translateY(-2px) scale(1.04)" : "none",
    }}>{label}</span>
  );
}

/** Certification / achievement badge */
export function Badge({ title, date, icon = "🏆" }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 10, padding: "12px 20px",
      background: "linear-gradient(135deg,rgba(108,156,255,0.07),rgba(92,255,177,0.04))",
      border: "1px solid rgba(108,156,255,0.12)", borderRadius: 12,
    }}>
      <span style={{ fontSize: "1.2rem" }}>{icon}</span>
      <div>
        <div style={{ fontSize: "clamp(0.75rem,1.1vw,0.85rem)", fontWeight: 600 }}>{title}</div>
        <div style={{ fontFamily: "var(--fm)", fontSize: "0.6rem", color: "#5a5a7a" }}>{date}</div>
      </div>
    </div>
  );
}

/** Contact chip link */
export function ContactChip({ icon, text, href }) {
  const [h, setH] = useState(false);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        padding: "12px 24px",
        background: h ? "rgba(108,156,255,0.06)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${h ? "#6c9cff" : "rgba(255,255,255,0.06)"}`,
        borderRadius: 50, color: "#e8e6e3", textDecoration: "none",
        fontFamily: "var(--fm)", fontSize: "clamp(0.65rem,1vw,0.78rem)", letterSpacing: 1,
        transition: "all .3s", display: "inline-flex", alignItems: "center", gap: 8,
        transform: h ? "translateY(-3px)" : "none",
        boxShadow: h ? "0 8px 30px rgba(108,156,255,0.15)" : "none",
      }}>{icon} {text}</a>
  );
}
