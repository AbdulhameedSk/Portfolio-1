import { useState } from "react";
import { MagLink } from "../ui";
import { PERSONAL } from "../../data/resume";

const NAV_ITEMS = ["about", "experience", "projects", "skills", "contact"];

export function Nav({ scrollTo, scrollProgress, playing, toggleMusic }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const go = (id) => { setMobileOpen(false); scrollTo(id); };

  return (
    <>
      {/* Hidden text that reveals behind nav on scroll */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 90, height: 60, overflow: "hidden", pointerEvents: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontFamily: "var(--fd)", fontSize: "0.6rem", letterSpacing: 6, textTransform: "uppercase", color: "#5cffb1", opacity: scrollProgress * 0.6, whiteSpace: "nowrap" }}>
          ✦ OPEN TO WORK &nbsp;•&nbsp; BACKEND ENGINEER &nbsp;•&nbsp; PEGA CSA CERTIFIED &nbsp;•&nbsp; BUILDING COOL THINGS ✦
        </div>
      </div>

      <nav style={{ position: "fixed", top: 3, left: 0, right: 0, zIndex: 100, padding: "14px clamp(16px,4vw,48px)", display: "flex", justifyContent: "space-between", alignItems: "center", backdropFilter: "blur(24px)", background: `rgba(5,5,16,${0.3 + scrollProgress * 0.4})`, borderBottom: `1px solid rgba(255,255,255,${0.04 + scrollProgress * 0.04})` }}>
        <div onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="grad-blue" style={{ fontFamily: "var(--fd)", fontWeight: 800, fontSize: "1.3rem", cursor: "pointer" }}>
          SA<span style={{ WebkitTextFillColor: "#ff6c6c", color: "#ff6c6c" }}>.</span>
        </div>

        {/* Desktop links */}
        <div className="nav-desk" style={{ display: "flex", gap: 22, alignItems: "center" }}>
          {NAV_ITEMS.map((s) => <MagLink key={s} onClick={() => go(s)}>{s}</MagLink>)}
          <div style={{ width: 1, height: 16, background: "rgba(255,255,255,0.06)" }} />
          <div onClick={toggleMusic} style={{ cursor: "pointer", fontSize: "0.9rem", opacity: playing ? 1 : 0.4, transition: "opacity .3s" }} title={playing ? "Pause" : "Play ambient music"}>
            {playing ? "🔊" : "🔇"}
          </div>
          <a href={`mailto:${PERSONAL.email}`} style={{ padding: "8px 20px", background: "rgba(108,156,255,0.1)", border: "1px solid rgba(108,156,255,0.2)", borderRadius: 50, color: "#6c9cff", textDecoration: "none", fontFamily: "var(--fm)", fontSize: "0.62rem", letterSpacing: 1, textTransform: "uppercase" }}>
            Hire Me
          </a>
        </div>

        {/* Mobile burger */}
        <div className="burger" onClick={() => setMobileOpen(!mobileOpen)} style={{ display: "none", flexDirection: "column", gap: 5, cursor: "pointer", padding: 8, zIndex: 200 }}>
          <div style={{ width: 24, height: 2, background: "#e8e6e3", borderRadius: 2, transition: "all .3s", transform: mobileOpen ? "rotate(45deg) translateY(7px)" : "none" }} />
          <div style={{ width: 24, height: 2, background: "#e8e6e3", borderRadius: 2, transition: "all .3s", opacity: mobileOpen ? 0 : 1 }} />
          <div style={{ width: 24, height: 2, background: "#e8e6e3", borderRadius: 2, transition: "all .3s", transform: mobileOpen ? "rotate(-45deg) translateY(-7px)" : "none" }} />
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 99, background: "rgba(5,5,16,0.95)", backdropFilter: "blur(20px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32 }}>
          {NAV_ITEMS.map((s) => (
            <a key={s} onClick={() => go(s)} style={{ color: "#e8e6e3", textDecoration: "none", fontFamily: "var(--fd)", fontSize: "1.5rem", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer" }}>{s}</a>
          ))}
          <div onClick={toggleMusic} style={{ padding: "10px 20px", background: "rgba(255,255,255,0.03)", borderRadius: 50, cursor: "pointer" }}>
            {playing ? "🔊 Music On" : "🔇 Music Off"}
          </div>
        </div>
      )}
    </>
  );
}
