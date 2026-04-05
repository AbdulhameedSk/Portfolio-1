import { useState, useEffect } from "react";
import { Reveal, Counter, SectionHead, GlassCard, TiltCard, SkillPill, Badge, ContactChip } from "../ui";
import { Globe } from "../three/Globe";
import { PERSONAL, STATS, EXPERIENCE, PROJECTS, SKILLS, SERVICES, EDUCATION, CERTS, SKILL_COLORS } from "../../data/resume";

/* ═══════════ HERO ═══════════ */
export function Hero({ heroName, typedRole, onBurstClick, scrollTo }) {
  return (
    <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "100px clamp(20px,6vw,8vw) 0", position: "relative" }}>
      <Reveal delay={0.1}><div style={{ fontFamily: "var(--fm)", fontSize: "clamp(0.55rem,1.2vw,0.7rem)", letterSpacing: 5, textTransform: "uppercase", color: "#5a5a7a", marginBottom: "clamp(12px,2vw,20px)" }}>{"// portfolio.2026"}</div></Reveal>
      <Reveal delay={0.15}><div style={{ fontFamily: "var(--fd)", fontSize: "clamp(0.9rem,1.8vw,1.4rem)", fontWeight: 600, color: "#6c9cff", letterSpacing: "clamp(2px,0.4vw,4px)", textTransform: "uppercase", marginBottom: "clamp(4px,1vw,8px)" }}>SHAIK</div></Reveal>
      <Reveal delay={0.2}><h1 className="hero-name grad-text" style={{ fontFamily: "var(--fd)", fontSize: "clamp(2.8rem,9.5vw,8rem)", fontWeight: 800, lineHeight: 0.95, letterSpacing: "clamp(-2px,-0.4vw,-4px)", marginBottom: "clamp(12px,2vw,20px)", overflowWrap: "break-word" }}>{heroName}</h1></Reveal>
      <Reveal delay={0.3}><div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "clamp(16px,3vw,28px)" }}><div style={{ width: "clamp(20px,4vw,40px)", height: 1, background: "#6c9cff" }} /><span style={{ fontFamily: "var(--fm)", fontSize: "clamp(0.8rem,1.5vw,1rem)", color: "#6c9cff" }}>{typedRole}<span style={{ animation: "blink 1s step-end infinite", color: "#5cffb1" }}>|</span></span></div></Reveal>
      <Reveal delay={0.4}><p style={{ fontSize: "clamp(0.9rem,1.5vw,1.1rem)", color: "#5a5a7a", maxWidth: 520, lineHeight: 1.8 }}>Transforming ideas into scalable systems. Building backend architectures, real-time apps, and enterprise solutions that actually work.</p></Reveal>
      <Reveal delay={0.5}>
        <div className="hero-cta" style={{ marginTop: "clamp(24px,4vw,40px)", display: "flex", gap: 14, flexWrap: "wrap" }}>
          <a onClick={e => onBurstClick(e, () => scrollTo("contact"))} style={{ padding: "14px 36px", background: "linear-gradient(135deg,#6c9cff,#4a7aff)", color: "#fff", border: "none", borderRadius: 50, fontFamily: "var(--fm)", fontSize: "0.75rem", letterSpacing: 1, textTransform: "uppercase", cursor: "pointer", textDecoration: "none" }}>Get in Touch</a>
          <a onClick={e => onBurstClick(e, () => scrollTo("projects"))} style={{ padding: "14px 36px", background: "transparent", color: "#e8e6e3", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 50, fontFamily: "var(--fm)", fontSize: "0.75rem", letterSpacing: 1, textTransform: "uppercase", cursor: "pointer", textDecoration: "none" }}>View Projects</a>
          <a onClick={e => { onBurstClick(e); window.open( "https://drive.google.com/file/d/1p6mPRRfhCx2n355y_H_mc-tbR1DWbbVi/view?usp=sharing"); }} style={{ padding: "14px 36px", background: "transparent", color: "#5cffb1", border: "1px solid rgba(92,255,177,0.2)", borderRadius: 50, fontFamily: "var(--fm)", fontSize: "0.75rem", letterSpacing: 1, textTransform: "uppercase", cursor: "pointer", textDecoration: "none" }}>📥 Resume</a>
        </div>
      </Reveal>
      <Reveal delay={0.6}>
        <div className="hero-stats" style={{ display: "flex", gap: "clamp(24px,5vw,56px)", marginTop: "clamp(32px,5vw,56px)", flexWrap: "wrap" }}>
          {STATS.map((s, i) => (
            <div key={i}>
              <div className="hero-stat-num grad-blue" style={{ fontFamily: "var(--fd)", fontSize: "clamp(1.4rem,3vw,2.2rem)", fontWeight: 800 }}><Counter end={s.end} suffix={s.suf} /></div>
              <div style={{ fontFamily: "var(--fm)", fontSize: "clamp(0.5rem,0.9vw,0.6rem)", letterSpacing: 2, textTransform: "uppercase", color: "#4a4a6a", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </Reveal>
      <div style={{ position: "absolute", bottom: "clamp(20px,4vw,40px)", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <div style={{ width: 20, height: 32, border: "1.5px solid rgba(108,156,255,0.3)", borderRadius: 12, display: "flex", justifyContent: "center", paddingTop: 6 }}>
          <div style={{ width: 3, height: 8, background: "#6c9cff", borderRadius: 3, animation: "float 1.5s ease infinite" }} />
        </div>
        <span style={{ fontFamily: "var(--fm)", fontSize: "0.5rem", letterSpacing: 3, color: "#4a4a6a", textTransform: "uppercase" }}>scroll</span>
      </div>
    </section>
  );
}

/* ═══════════ MARQUEE ═══════════ */
export function Marquee() {
  const text = "GO • JAVA • PYTHON • REACT • NODE.JS • MONGODB • POSTGRESQL • DOCKER • AWS • PEGA CSA • TYPESCRIPT • EXPRESS • REDIS • ";
  return (
    <div style={{ overflow: "hidden", padding: "24px 0", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.09)" }}>
      <div style={{ display: "flex", animation: "marquee 25s linear infinite", whiteSpace: "nowrap" }}>
        {[0, 1].map((i) => <span key={i} style={{ fontFamily: "var(--fd)", fontSize: "clamp(0.65rem,1vw,0.85rem)", fontWeight: 600, letterSpacing: 4, color: "rgba(108,156,255,0.18)", textTransform: "uppercase", paddingRight: 24 }}>{text}</span>)}
      </div>
    </div>
  );
}

/* ═══════════ ABOUT ═══════════ */
export function About() {
  return (
    <section id="about" className="sect" style={{ padding: "100px clamp(20px,6vw,8vw)" }}>
      <Reveal><SectionHead num="01" label="About" title="What I Do" /></Reveal>
      <Reveal delay={0.1}>
        <div className="about-row" style={{ display: "flex", gap: 48, alignItems: "center", marginBottom: 48 }}>
          <p style={{ color: "#5a5a7a", lineHeight: 1.9, fontSize: "clamp(0.9rem,1.3vw,1.05rem)", maxWidth: 600, flex: 1 }}>
            Full Stack Developer passionate about building scalable web applications. Expert in the MERN stack with growing experience in Go, DevOps & AWS. Currently engineering healthcare solutions at Cognizant from <span style={{ color: "#6c9cff", fontWeight: 600 }}>{PERSONAL.location}</span>.
          </p>
          <div className="globe-wrap"><Globe /></div>
        </div>
      </Reveal>
      <div className="g-svc" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
        {SERVICES.map((s, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <GlassCard>
              <div style={{ padding: "24px 20px" }}>
                <div style={{ fontSize: "1.4rem", marginBottom: 12 }}>{s.icon}</div>
                <div style={{ fontFamily: "var(--fd)", fontWeight: 700, fontSize: "0.95rem", marginBottom: 6 }}>{s.title}</div>
                <div style={{ color: "#5a5a7a", fontSize: "0.8rem", lineHeight: 1.6 }}>{s.desc}</div>
              </div>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ═══════════ GITHUB ═══════════ */
function StatBox({ val, label }) {
  return (
    <div style={{ padding: "14px 20px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, flex: "1 1 auto", minWidth: 80 }}>
      <div style={{ fontFamily: "var(--fd)", fontSize: "1.3rem", fontWeight: 800, color: "#6c9cff" }}>{val}</div>
      <div style={{ fontFamily: "var(--fm)", fontSize: "0.5rem", letterSpacing: 1, textTransform: "uppercase", color: "#5a5a7a", marginTop: 2 }}>{label}</div>
    </div>
  );
}
function GHLink() {
  return (
    <div style={{ marginTop: 14, display: "flex", justifyContent: "flex-end" }}>
      <a href={PERSONAL.github} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--fm)", fontSize: "0.7rem", color: "#6c9cff", textDecoration: "none", padding: "8px 20px", background: "rgba(108,156,255,0.06)", border: "1px solid rgba(108,156,255,0.13)", borderRadius: 50 }}>
        AbdulhameedSk on GitHub →
      </a>
    </div>
  );
}

export function GitHub() {
  const [contribs, setContribs] = useState(null);
  const [err, setErr] = useState(false);
  const baseStats = [{ val: "41", label: "Repos" }, { val: "20", label: "Followers" }, { val: "🦈", label: "Pull Shark" }];

  useEffect(() => {
    fetch(`https://github-contributions-api.jogruber.de/v4/${PERSONAL.githubUsername}?y=last`)
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((json) => { if (json?.contributions) setContribs(json); else setErr(true); })
      .catch(() => setErr(true));
  }, []);

  // Loading
  if (!contribs && !err) return (
    <section className="sect" style={{ padding: "60px clamp(20px,6vw,8vw)" }}>
      <Reveal><SectionHead label="Contributions" title="GitHub Activity" /></Reveal>
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>{baseStats.map((s, i) => <StatBox key={i} {...s} />)}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 16, height: 16, border: "2px solid #6c9cff", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
        <span style={{ fontFamily: "var(--fm)", fontSize: "0.75rem", color: "#5a5a7a" }}>Loading contributions...</span>
      </div>
    </section>
  );

  // Fallback (sandbox / offline)
  if (err) return (
    <section className="sect" style={{ padding: "60px clamp(20px,6vw,8vw)" }}>
      <Reveal><SectionHead label="Contributions" title="GitHub Activity" /></Reveal>
      <Reveal delay={0.1}>
        <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>{baseStats.map((s, i) => <StatBox key={i} {...s} />)}</div>
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: 24, overflowX: "auto" }}>
          <div style={{ fontFamily: "var(--fm)", fontSize: "0.6rem", letterSpacing: 2, textTransform: "uppercase", color: "#5a5a7a", marginBottom: 12 }}>Contribution Graph</div>
          <img src={`https://ghchart.rshah.org/6c9cff/${PERSONAL.githubUsername}`} alt="GitHub Contributions" style={{ width: "100%", minWidth: 650, borderRadius: 8 }} onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "block"; }} />
          <p style={{ display: "none", fontFamily: "var(--fm)", fontSize: "0.75rem", color: "#5a5a7a", textAlign: "center", padding: "30px 0" }}>Contribution graph loads on deploy → <a href={PERSONAL.github} target="_blank" style={{ color: "#6c9cff" }}>View on GitHub</a></p>
        </div>
        <GHLink />
      </Reveal>
    </section>
  );

  // Success — real data
  const c = contribs.contributions;
  const total = contribs.total ? Object.values(contribs.total).reduce((a, b) => a + b, 0) : c.reduce((s, d) => s + d.count, 0);
  let streak = 0;
  for (let i = c.length - 1; i >= 0; i--) { if (c[i].count > 0) streak++; else break; }
  const weeks = [];
  for (let i = 0; i < c.length; i += 7) weeks.push(c.slice(i, i + 7));
  const colors = ["rgba(108,156,255,0.06)", "rgba(108,156,255,0.25)", "rgba(108,156,255,0.5)", "rgba(108,156,255,0.8)", "#6c9cff"];
  const monthLabels = [];
  let lastMonth = -1;
  weeks.forEach((w, i) => { const m = new Date(w[0]?.date).getMonth(); if (m !== lastMonth) { monthLabels.push({ i, name: new Date(w[0]?.date).toLocaleString("en", { month: "short" }) }); lastMonth = m; } });

  return (
    <section className="sect" style={{ padding: "60px clamp(20px,6vw,8vw)" }}>
      <Reveal><SectionHead label="Contributions" title="GitHub Activity" /></Reveal>
      <Reveal delay={0.1}>
        <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
          <StatBox val={total} label="Contributions" />
          {baseStats.map((s, i) => <StatBox key={i} {...s} />)}
          <StatBox val={streak} label="Day Streak" />
        </div>
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: 20, overflowX: "auto" }}>
          <div style={{ position: "relative", paddingTop: 18, minWidth: weeks.length * 13.5 + 30 }}>
            {monthLabels.map((m, i) => <span key={i} style={{ position: "absolute", top: 0, left: 28 + m.i * 13.5, fontFamily: "var(--fm)", fontSize: "0.5rem", color: "#5a5a7a" }}>{m.name}</span>)}
            <div style={{ display: "flex" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 2.5, marginRight: 4, flexShrink: 0 }}>
                {["", "Mon", "", "Wed", "", "Fri", ""].map((d, i) => <div key={i} style={{ height: 11, fontFamily: "var(--fm)", fontSize: "0.45rem", color: "#5a5a7a", display: "flex", alignItems: "center", justifyContent: "flex-end", width: 22 }}>{d}</div>)}
              </div>
              <div style={{ display: "flex", gap: 2.5 }}>
                {weeks.map((w, wi) => <div key={wi} style={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                  {w.map((d, di) => <div key={di} title={`${d.date}: ${d.count} contributions`} style={{ width: 11, height: 11, borderRadius: 2, background: colors[d.level] || colors[0], border: "1px solid rgba(255,255,255,0.06)", cursor: "default", transition: "transform .15s" }}
                    onMouseEnter={(e) => { e.target.style.transform = "scale(1.5)"; e.target.style.outline = "1px solid #6c9cff"; }}
                    onMouseLeave={(e) => { e.target.style.transform = ""; e.target.style.outline = ""; }} />)}
                </div>)}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 4, marginTop: 12 }}>
            <span style={{ fontFamily: "var(--fm)", fontSize: "0.5rem", color: "#5a5a7a" }}>Less</span>
            {colors.map((c, i) => <div key={i} style={{ width: 11, height: 11, borderRadius: 2, background: c, border: "1px solid rgba(255,255,255,0.06)" }} />)}
            <span style={{ fontFamily: "var(--fm)", fontSize: "0.5rem", color: "#5a5a7a" }}>More</span>
          </div>
        </div>
        <GHLink />
      </Reveal>
    </section>
  );
}

/* ═══════════ EXPERIENCE ═══════════ */
export function Experience() {
  return (
    <section id="experience" className="sect" style={{ padding: "100px clamp(20px,6vw,8vw)" }}>
      <Reveal><SectionHead num="02" label="Experience" title="Where I've Built" /></Reveal>
      {EXPERIENCE.map((exp, i) => (
        <Reveal key={i} delay={i * 0.1}>
          <GlassCard left>
            <div style={{ padding: "clamp(24px,3vw,36px)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
                <div>
                  <div style={{ fontFamily: "var(--fd)", fontSize: "clamp(1.1rem,2vw,1.35rem)", fontWeight: 700 }}>{exp.role}</div>
                  <div style={{ color: "#6c9cff", fontWeight: 600, marginTop: 2 }}>{exp.company}</div>
                  <div style={{ color: "#5a5a7a", fontSize: "0.78rem", marginTop: 2 }}>{exp.sub}</div>
                </div>
                <div style={{ fontFamily: "var(--fm)", fontSize: "0.65rem", color: "#4a4a6a", whiteSpace: "nowrap", padding: "4px 12px", background: "rgba(108,156,255,0.06)", borderRadius: 20 }}>{exp.date}</div>
              </div>
              <ul style={{ color: "#5a5a7a", lineHeight: 1.85, fontSize: "clamp(0.82rem,1.2vw,0.9rem)", listStyle: "none", marginTop: 14 }}>
                {exp.points.map((p, j) => <li key={j} style={{ paddingLeft: 18, position: "relative", marginBottom: 6 }}><span style={{ position: "absolute", left: 0, color: "#5cffb1", fontWeight: 700 }}>→</span>{p}</li>)}
              </ul>
            </div>
          </GlassCard>
        </Reveal>
      ))}
    </section>
  );
}

/* ═══════════ PROJECTS ═══════════ */
export function Projects() {
  return (
    <section id="projects" className="sect" style={{ padding: "100px clamp(20px,6vw,8vw)" }}>
      <Reveal><SectionHead num="03" label="Projects" title="Featured Work" /></Reveal>
      <div className="g-proj" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 18 }}>
        {PROJECTS.map((p, i) => (
          <Reveal key={i} delay={i * 0.07}>
            <TiltCard color={p.color}>
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <span style={{ fontFamily: "var(--fd)", fontSize: "clamp(2rem,3.5vw,2.8rem)", fontWeight: 800, color: p.color, opacity: 0.12, lineHeight: 1 }}>0{i + 1}</span>
                  <span style={{ fontFamily: "var(--fm)", fontSize: "0.6rem", letterSpacing: 2, textTransform: "uppercase", color: p.color, padding: "3px 12px", background: `${p.color}10`, border: `1px solid ${p.color}20`, borderRadius: 16 }}>{p.type}</span>
                </div>
                <div style={{ fontFamily: "var(--fd)", fontSize: "clamp(1.2rem,2vw,1.5rem)", fontWeight: 700, marginBottom: 10 }}>{p.name}</div>
                <p style={{ color: "#5a5a7a", lineHeight: 1.7, fontSize: "clamp(0.8rem,1.1vw,0.88rem)", marginBottom: 16 }}>{p.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {p.tech.map((t, j) => <span key={j} style={{ padding: "3px 10px", background: `${p.color}0D`, border: `1px solid ${p.color}1A`, borderRadius: 14, fontSize: "0.65rem", color: p.color, fontFamily: "var(--fm)" }}>{t}</span>)}
                </div>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ═══════════ SKILLS ═══════════ */
export function Skills() {
  return (
    <section id="skills" className="sect" style={{ padding: "100px clamp(20px,6vw,8vw)" }}>
      <Reveal><SectionHead num="04" label="Skills" title="Tech Arsenal" /></Reveal>
      <div className="g-skill" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
        {SKILLS.map((g, i) => {
          const color = SKILL_COLORS[i % SKILL_COLORS.length];
          return (
            <Reveal key={i} delay={i * 0.05}>
              <GlassCard>
                <div style={{ padding: 24 }}>
                  <div style={{ fontFamily: "var(--fd)", fontWeight: 700, fontSize: "0.95rem", marginBottom: 16, color }}>{g.cat}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                    {g.items.map((item, j) => <SkillPill key={j} label={item} color={color} />)}
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          );
        })}
      </div>
      <Reveal delay={0.3}>
        <div style={{ marginTop: 40, display: "flex", gap: 16, flexWrap: "wrap" }}>
          {CERTS.map((c, i) => <Badge key={i} {...c} />)}
        </div>
      </Reveal>
    </section>
  );
}

/* ═══════════ EDUCATION ═══════════ */
export function Education() {
  return (
    <section className="sect" style={{ padding: "100px clamp(20px,6vw,8vw)" }}>
      <Reveal><SectionHead num="05" label="Education" title="Academic Path" /></Reveal>
      <div style={{ position: "relative", paddingLeft: "clamp(28px,4vw,40px)" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 1, background: "linear-gradient(to bottom,#6c9cff,#5cffb1,transparent)" }} />
        {EDUCATION.map((ed, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div style={{ position: "relative", marginBottom: 36, padding: "clamp(16px,2.5vw,22px) clamp(18px,3vw,28px)", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14 }}>
              <div style={{ position: "absolute", left: "clamp(-34px,-4.2vw,-47px)", top: 26, width: 12, height: 12, borderRadius: "50%", background: "#6c9cff", border: "3px solid #050510", boxShadow: "0 0 12px rgba(108,156,255,0.6)" }} />
              <div style={{ fontFamily: "var(--fd)", fontSize: "clamp(0.95rem,1.5vw,1.1rem)", fontWeight: 700 }}>{ed.degree}</div>
              <div style={{ color: "#5a5a7a", marginTop: 3, fontSize: "0.85rem" }}>{ed.school}</div>
              <div style={{ display: "flex", gap: 20, marginTop: 10 }}>
                <span style={{ fontFamily: "var(--fm)", fontSize: "0.68rem", color: "#6c9cff" }}>{ed.score}</span>
                <span style={{ fontFamily: "var(--fm)", fontSize: "0.68rem", color: "#5a5a7a" }}>{ed.year}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ═══════════ CONTACT ═══════════ */
export function Contact() {
  return (
    <section id="contact" className="sect" style={{ textAlign: "center", padding: "120px clamp(20px,6vw,8vw) 80px" }}>
      <Reveal>
        <SectionHead num="06" label="Connect" center />
        <h2 style={{ fontFamily: "var(--fd)", fontSize: "clamp(2rem,5vw,4rem)", fontWeight: 800, letterSpacing: -2, marginBottom: 16, lineHeight: 1.1 }}>
          Let's Build<br /><span className="grad-blue">Something Epic</span>
        </h2>
        <p style={{ color: "#5a5a7a", fontSize: "clamp(0.9rem,1.3vw,1.05rem)", maxWidth: 460, margin: "0 auto 40px", lineHeight: 1.8 }}>
          Open to opportunities, collaborations, and conversations about building great software.
        </p>
      </Reveal>
      <Reveal delay={0.15}>
        <div className="c-chips" style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
          <ContactChip icon="✉" text={PERSONAL.email} href={`mailto:${PERSONAL.email}`} />
          <ContactChip icon="📱" text={PERSONAL.phone} href={`tel:${PERSONAL.phone.replace(/-/g, "")}`} />
          <ContactChip icon="🔗" text="LinkedIn" href={PERSONAL.linkedin} />
        </div>
      </Reveal>
    </section>
  );
}

/* ═══════════ FOOTER ═══════════ */
export function Footer() {
  return (
    <footer style={{ padding: "28px clamp(20px,6vw,8vw)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="ftr" style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <span style={{ fontFamily: "var(--fm)", fontSize: "0.6rem", color: "#4a4a6a", letterSpacing: 1 }}>© 2026 {PERSONAL.name}</span>
        <span style={{ fontFamily: "var(--fm)", fontSize: "0.6rem", color: "#4a4a6a", letterSpacing: 1 }}>THREE.JS • REACT • ♥</span>
      </div>
    </footer>
  );
}
