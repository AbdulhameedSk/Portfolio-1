import { useEffect, useRef } from "react";
import * as THREE from "three";

export function Globe() {
  const mount = useRef(null);

  useEffect(() => {
    if (!mount.current) return;
    const el = mount.current;
    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    const ren = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    ren.setSize(280, 280);
    ren.setPixelRatio(2);
    el.appendChild(ren.domElement);

    // Wireframe globe
    const globe = new THREE.Mesh(
      new THREE.SphereGeometry(1.4, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0x6c9cff, wireframe: true, transparent: true, opacity: 0.15 })
    );
    scene.add(globe);

    // Surface dots
    const dotGeo = new THREE.SphereGeometry(0.02, 8, 8);
    const dotMat = new THREE.MeshBasicMaterial({ color: 0x6c9cff, transparent: true, opacity: 0.5 });
    for (let i = 0; i < 200; i++) {
      const lat = (Math.random() - 0.5) * Math.PI;
      const lon = Math.random() * Math.PI * 2;
      const r = 1.41;
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.set(r * Math.cos(lat) * Math.cos(lon), r * Math.sin(lat), r * Math.cos(lat) * Math.sin(lon));
      globe.add(dot);
    }

    // Hyderabad pin (17.385°N, 78.4867°E)
    const lat = (17.385 * Math.PI) / 180;
    const lon = (-78.4867 * Math.PI) / 180 + Math.PI;
    const r = 1.45;
    const pin = new THREE.Mesh(new THREE.SphereGeometry(0.05, 16, 16), new THREE.MeshBasicMaterial({ color: 0xff6c6c }));
    pin.position.set(r * Math.cos(lat) * Math.cos(lon), r * Math.sin(lat), r * Math.cos(lat) * Math.sin(lon));
    globe.add(pin);

    // Pulse ring
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xff6c6c, transparent: true, opacity: 0.5, side: THREE.DoubleSide });
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.06, 0.1, 32), ringMat);
    ring.position.copy(pin.position);
    ring.lookAt(0, 0, 0);
    globe.add(ring);

    cam.position.z = 4;
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      globe.rotation.y += 0.003;
      const s = 1 + Math.sin(Date.now() * 0.003) * 0.3;
      ring.scale.set(s, s, s);
      ringMat.opacity = 0.5 * (1 - (s - 1) / 0.3);
      ren.render(scene, cam);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      if (el.contains(ren.domElement)) el.removeChild(ren.domElement);
      ren.dispose();
    };
  }, []);

  return <div ref={mount} style={{ width: 280, height: 280, flexShrink: 0 }} />;
}
