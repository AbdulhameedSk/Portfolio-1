import { useState, useEffect, useRef } from "react";

// Hook for scrambling text
export function useScramble(text, duration = 30) {
  const [scrambled, setScrambled] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

  useEffect(() => {
    let interval;
    let current = "";
    let index = 0;

    const scramble = () => {
      if (index < text.length) {
        current = text.slice(0, index + 1) + chars[Math.floor(Math.random() * chars.length)] + chars[Math.floor(Math.random() * chars.length)];
        setScrambled(current);
        index++;
      } else {
        setScrambled(text);
        clearInterval(interval);
      }
    };

    interval = setInterval(scramble, duration);
    return () => clearInterval(interval);
  }, [text, duration]);

  return scrambled;
}

// Hook for typing roles
export function useTypingRole(roles) {
  const [currentRole, setCurrentRole] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    if (!roles || roles.length === 0) return;

    let currentText = "";
    let charIndex = 0;
    let timeout;

    const type = () => {
      if (charIndex < roles[roleIndex].length) {
        currentText += roles[roleIndex][charIndex];
        setCurrentRole(currentText);
        charIndex++;
        timeout = setTimeout(type, 100);
      } else {
        // Wait then erase
        setTimeout(() => {
          const erase = () => {
            if (currentText.length > 0) {
              currentText = currentText.slice(0, -1);
              setCurrentRole(currentText);
              timeout = setTimeout(erase, 50);
            } else {
              setRoleIndex((prev) => (prev + 1) % roles.length);
            }
          };
          erase();
        }, 2000);
      }
    };

    type();
    return () => clearTimeout(timeout);
  }, [roles, roleIndex]);

  return currentRole;
}

// Hook for particle burst
export function useParticleBurst() {
  const canvasRef = useRef(null);
  const particles = useRef([]);

  const burst = (x, y) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    for (let i = 0; i < 20; i++) {
      particles.current.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 10,
        life: 60,
        color: `hsl(${Math.random() * 360}, 70%, 60%)`,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.current = particles.current.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.1;
        p.life--;

        if (p.life > 0) {
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.life / 60;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
          ctx.fill();
          return true;
        }
        return false;
      });

      if (particles.current.length > 0) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  };

  return { canvasRef, burst };
}

// Hook for ambient music
export function useAmbientMusic() {
  const [playing, setPlaying] = useState(true); // Start with music on
  const audioRef = useRef(null);

  useEffect(() => {
    // Create a simple audio context for ambient sound
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(220, audioContext.currentTime); // A3 note
    oscillator.type = "sine";
    gainNode.gain.setValueAtTime(0.01, audioContext.currentTime); // Very low volume

    if (playing) {
      oscillator.start();
    }

    audioRef.current = { oscillator, gainNode, audioContext };

    return () => {
      if (oscillator) oscillator.stop();
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      const { oscillator, gainNode, audioContext } = audioRef.current;
      if (playing) {
        if (audioContext.state === "suspended") {
          audioContext.resume();
        }
        oscillator.start();
      } else {
        oscillator.stop();
      }
    }
  }, [playing]);

  const toggle = () => setPlaying(!playing);

  return { playing, toggle };
}