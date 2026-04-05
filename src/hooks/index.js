import { useState, useEffect, useRef } from "react";
import * as Tone from "tone";

/** Text scramble / decode effect */
export function useScramble(text, speed = 35) {
  const [display, setDisplay] = useState("");
  useEffect(() => {
    const chars = "!@#$%^&*_+-={}|<>?ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let i = 0;
    const iv = setInterval(() => {
      if (i <= text.length) {
        const solved = text.slice(0, i);
        const noise = Array.from({ length: Math.min(4, text.length - i) }, () =>
          chars[Math.floor(Math.random() * chars.length)]
        ).join("");
        setDisplay(solved + noise);
        i++;
      } else {
        clearInterval(iv);
        setDisplay(text);
      }
    }, speed);
    return () => clearInterval(iv);
  }, [text, speed]);
  return display;
}

/** Typing + deleting role cycler */
export function useTypingRole(roles, typeSpeed = 80, deleteSpeed = 40, pause = 2000) {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  useEffect(() => {
    const current = roles[idx];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) setTimeout(() => setIsDeleting(true), pause);
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length - 1 === 0) { setIsDeleting(false); setIdx((idx + 1) % roles.length); }
      }
    }, isDeleting ? deleteSpeed : typeSpeed);
    return () => clearTimeout(timeout);
  }, [text, idx, isDeleting, roles, typeSpeed, deleteSpeed, pause]);
  return text;
}

/** Canvas-based particle burst on click */
export function useParticleBurst() {
  const canvasRef = useRef(null);
  const particles = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const onResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener("resize", onResize);

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.current = particles.current.filter((p) => p.life > 0);
      particles.current.forEach((p) => {
        p.x += p.vx; p.y += p.vy; p.vy += 0.12; p.life -= 2; p.size *= 0.97;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor((p.life / 100) * 255).toString(16).padStart(2, "0");
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);

  const burst = (x, y) => {
    const colors = ["#6c9cff", "#5cffb1", "#ff6c6c", "#ffb86c", "#b86cff"];
    for (let i = 0; i < 24; i++) {
      const angle = (Math.PI * 2 / 24) * i + (Math.random() - 0.5) * 0.5;
      const speed = 2 + Math.random() * 4;
      particles.current.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        size: 2 + Math.random() * 3,
        life: 60 + Math.random() * 40,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
  };

  return { canvasRef, burst };
}

/** Ambient space music using Tone.js synth */
export function useAmbientMusic() {
  const synthRef = useRef(null);
  const loopRef = useRef(null);
  const initializedRef = useRef(false);
  const [playing, setPlaying] = useState(() => {
    if (typeof window === "undefined") return true;
    const stored = window.localStorage.getItem("ambientPlaying");
    return stored === null ? true : stored === "true";
  });

  const initSynth = async () => {
    if (initializedRef.current) return;
    await Tone.start();
    const reverb = new Tone.Reverb({ decay: 6, wet: 0.7 }).toDestination();
    const delay = new Tone.FeedbackDelay("8n", 0.4).connect(reverb);
    synthRef.current = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "sine" },
      envelope: { attack: 2, decay: 3, sustain: 0.4, release: 4 },
      volume: -18,
    }).connect(delay);
    const chords = [["C3","E3","G3","B3"], ["A2","C3","E3","G3"], ["F2","A2","C3","E3"], ["G2","B2","D3","F3"]];
    let ci = 0;
    loopRef.current = new Tone.Loop((time) => {
      synthRef.current.triggerAttackRelease(chords[ci++ % 4], "2n", time);
    }, "2m").start(0);
    Tone.Transport.stop();
    initializedRef.current = true;
  };

  const startMusic = async () => {
    setPlaying(true);
    try {
      await initSynth();
      if (Tone.Transport.state !== "started") {
        Tone.Transport.start();
      }
    } catch (error) {
      console.warn("Ambient music start blocked until user interaction.", error);
    }
  };

  const stopMusic = () => {
    if (Tone.Transport.state === "started") {
      Tone.Transport.stop();
    }
    setPlaying(false);
  };

  useEffect(() => {
    if (playing) startMusic();
  }, []);

  useEffect(() => {
    window.localStorage.setItem("ambientPlaying", playing.toString());
  }, [playing]);

  useEffect(() => {
    const handleUserGesture = async () => {
      if (playing && Tone.Transport.state !== "started") {
        await startMusic();
      }
    };
    window.addEventListener("click", handleUserGesture, { once: true });
    return () => window.removeEventListener("click", handleUserGesture);
  }, [playing]);

  const toggle = async () => {
    if (playing) stopMusic();
    else await startMusic();
  };

  return { playing, toggle };
}



