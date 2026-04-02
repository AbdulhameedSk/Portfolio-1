import { useEffect, useRef } from "react";
import * as THREE from "three";

export function SpaceBackground({ mouseRef, scrollRef }) {
  const mount = useRef(null);

  useEffect(() => {
    if (!mount.current) return;
    const el = mount.current;
    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const ren = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    ren.setSize(window.innerWidth, window.innerHeight);
    ren.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(ren.domElement);

    // Stars
    const starsGeo = new THREE.BufferGeometry();
    const starsPos = new Float32Array(2500 * 3);
    for (let i = 0; i < 2500; i++) {
      starsPos[i * 3] = (Math.random() - 0.5) * 100;
      starsPos[i * 3 + 1] = (Math.random() - 0.5) * 100;
      starsPos[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    starsGeo.setAttribute("position", new THREE.BufferAttribute(starsPos, 3));
    const stars = new THREE.Points(starsGeo, new THREE.PointsMaterial({ color: 0x7788cc, size: 0.06, transparent: true, opacity: 0.9, sizeAttenuation: true }));
    scene.add(stars);

    // Main icosahedron
    const icoMat = new THREE.MeshBasicMaterial({ color: 0x6c9cff, wireframe: true, transparent: true, opacity: 0.2 });
    const ico = new THREE.Mesh(new THREE.IcosahedronGeometry(2.5, 1), icoMat);
    ico.position.set(window.innerWidth < 768 ? 2 : 6, 0.5, -4);
    scene.add(ico);

    // Inner glow sphere
    const innerMat = new THREE.MeshBasicMaterial({ color: 0x5cffb1, transparent: true, opacity: 0.03 });
    const inner = new THREE.Mesh(new THREE.SphereGeometry(1.8, 32, 32), innerMat);
    inner.position.copy(ico.position);
    scene.add(inner);

    // Torus rings
    const torusGeo = new THREE.TorusGeometry(3.5, 0.015, 16, 120);
    const t1 = new THREE.Mesh(torusGeo, new THREE.MeshBasicMaterial({ color: 0x6c9cff, transparent: true, opacity: 0.1 }));
    t1.position.copy(ico.position); t1.rotation.x = 0.6; scene.add(t1);
    const t2 = new THREE.Mesh(torusGeo, new THREE.MeshBasicMaterial({ color: 0x5cffb1, transparent: true, opacity: 0.07 }));
    t2.position.copy(ico.position); t2.rotation.set(-0.8, 0.5, 0.3); scene.add(t2);
    const t3 = new THREE.Mesh(new THREE.TorusGeometry(4.2, 0.008, 16, 140), new THREE.MeshBasicMaterial({ color: 0xff6c6c, transparent: true, opacity: 0.05 }));
    t3.position.copy(ico.position); t3.rotation.set(1.2, 0.8, -0.4); scene.add(t3);

    // Orbiting mini shapes
    const minis = [];
    const geos = [new THREE.OctahedronGeometry(0.15), new THREE.TetrahedronGeometry(0.12), new THREE.DodecahedronGeometry(0.1)];
    const colors = [0x6c9cff, 0x5cffb1, 0xff6c6c, 0xffb86c];
    for (let i = 0; i < 18; i++) {
      const m = new THREE.Mesh(geos[i % 3], new THREE.MeshBasicMaterial({ color: colors[i % 4], wireframe: true, transparent: true, opacity: 0.25 }));
      const angle = (i / 18) * Math.PI * 2;
      const radius = 4 + Math.random() * 3;
      m.position.set(ico.position.x + Math.cos(angle) * radius, ico.position.y + (Math.random() - 0.5) * 5, ico.position.z + Math.sin(angle) * radius);
      m.userData = { angle, radius, speed: 0.002 + Math.random() * 0.003 };
      scene.add(m);
      minis.push(m);
    }

    // Particle ring
    const partGeo = new THREE.BufferGeometry();
    const partPos = new Float32Array(300 * 3);
    for (let i = 0; i < 300; i++) {
      const a = Math.random() * Math.PI * 2, r = 3 + Math.random() * 2.5;
      partPos[i * 3] = ico.position.x + Math.cos(a) * r;
      partPos[i * 3 + 1] = ico.position.y + (Math.random() - 0.5) * 5;
      partPos[i * 3 + 2] = ico.position.z + Math.sin(a) * r;
    }
    partGeo.setAttribute("position", new THREE.BufferAttribute(partPos, 3));
    const particles = new THREE.Points(partGeo, new THREE.PointsMaterial({ color: 0x5cffb1, size: 0.035, transparent: true, opacity: 0.5 }));
    scene.add(particles);

    cam.position.z = 9;
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = Date.now() * 0.001;

      stars.rotation.y += 0.00015; stars.rotation.x += 0.00008;
      ico.rotation.x += 0.002; ico.rotation.y += 0.004;
      t1.rotation.z += 0.003; t1.rotation.x += 0.001;
      t2.rotation.z -= 0.002; t2.rotation.y += 0.0015;
      t3.rotation.x += 0.001; t3.rotation.z += 0.002;

      const pulse = 1 + Math.sin(time * 1.5) * 0.06;
      inner.scale.set(pulse, pulse, pulse);
      innerMat.opacity = 0.025 + Math.sin(time * 2) * 0.015;
      particles.rotation.y += 0.0015;

      minis.forEach((m) => {
        m.userData.angle += m.userData.speed;
        m.position.x = ico.position.x + Math.cos(m.userData.angle) * m.userData.radius;
        m.position.z = ico.position.z + Math.sin(m.userData.angle) * m.userData.radius;
        m.rotation.x += 0.01; m.rotation.y += 0.015;
      });

      // Mouse parallax
      cam.position.x += (mouseRef.current.x * 0.6 - cam.position.x) * 0.04;
      cam.position.y += (mouseRef.current.y * 0.35 - cam.position.y) * 0.04;

      // Scroll shift + fade
      const sf = scrollRef.current * 0.0008;
      [ico, inner, t1, t2, t3].forEach((o) => (o.position.y = 0.5 - sf * 2.5));
      particles.position.y = -sf * 0.8;
      icoMat.opacity = 0.2 * Math.max(0, 1 - sf * 0.7);

      cam.lookAt(0, 0, 0);
      ren.render(scene, cam);
    };
    animate();

    const onResize = () => { cam.aspect = window.innerWidth / window.innerHeight; cam.updateProjectionMatrix(); ren.setSize(window.innerWidth, window.innerHeight); };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", onResize); if (el.contains(ren.domElement)) el.removeChild(ren.domElement); ren.dispose(); };
  }, [mouseRef, scrollRef]);

  return <div ref={mount} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
}
