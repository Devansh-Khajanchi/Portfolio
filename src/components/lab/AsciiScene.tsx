"use client";

import { useEffect, useLayoutEffect, useRef, useSyncExternalStore } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useScroll } from "motion/react";
import { AsciiEffect } from "three-stdlib";
import type { Mesh } from "three";

function subscribeTheme(cb: () => void): () => void {
  const o = new MutationObserver(cb);
  o.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => o.disconnect();
}
const getDark = () => document.documentElement.classList.contains("dark");
const getDarkSSR = () => true;

function Scene({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const meshRef = useRef<Mesh>(null);

  useFrame(({ camera }) => {
    const p = progressRef.current;
    if (meshRef.current) {
      meshRef.current.rotation.x = p * Math.PI * 4;
      meshRef.current.rotation.y = p * Math.PI * 2;
    }
    camera.position.z = 5 - p * 2.5;
    camera.updateProjectionMatrix();
  });

  return (
    <>
      <color attach="background" args={["#000000"]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <directionalLight position={[-3, -2, -3]} intensity={0.4} />
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1, 0.35, 200, 32]} />
        <meshStandardMaterial color="white" />
      </mesh>
    </>
  );
}

type AsciiProps = {
  bgColor: string;
  fgColor: string;
  characters: string;
  invert?: boolean;
  resolution?: number;
};

// Drei's AsciiRenderer races: useFrame fires render() before useEffect runs
// setSize(), so AsciiEffect's iWidth/iHeight are undefined and getImageData
// throws. We construct + size in the same useLayoutEffect to guarantee order.
function AsciiOverlay({
  bgColor,
  fgColor,
  characters,
  invert = true,
  resolution = 0.18,
}: AsciiProps) {
  const { size, gl, scene, camera } = useThree();
  const effectRef = useRef<AsciiEffect | null>(null);

  useLayoutEffect(() => {
    if (size.width === 0 || size.height === 0) return;
    const effect = new AsciiEffect(gl, characters, { invert, resolution });
    effect.setSize(size.width, size.height);
    const el = effect.domElement;
    el.style.position = "absolute";
    el.style.inset = "0";
    el.style.color = fgColor;
    el.style.backgroundColor = bgColor;
    el.style.pointerEvents = "none";
    gl.domElement.style.opacity = "0";
    const parent = gl.domElement.parentNode;
    parent?.appendChild(el);
    effectRef.current = effect;
    return () => {
      gl.domElement.style.opacity = "1";
      el.remove();
      effectRef.current = null;
    };
  }, [size.width, size.height, gl, characters, invert, resolution]);

  // Hot-swap colors without rebuilding the effect.
  useEffect(() => {
    const el = effectRef.current?.domElement;
    if (!el) return;
    el.style.color = fgColor;
    el.style.backgroundColor = bgColor;
  }, [bgColor, fgColor]);

  useFrame(() => {
    effectRef.current?.render(scene, camera);
  }, 1);

  return null;
}

export default function AsciiScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Underlying canvas is always black-on-white-subject for stable sampling.
  // Theme only swaps the <pre> overlay's bg/fg colors.
  const dark = useSyncExternalStore(subscribeTheme, getDark, getDarkSSR);
  const bgColor = dark ? "#000000" : "#ffffff";
  const fgColor = dark ? "#ffffff" : "#0a0a0a";

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      progressRef.current = v;
    });
  }, [scrollYProgress]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ height: "300vh", background: bgColor }}
    >
      <div className="sticky top-0 h-screen w-full">
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0, 0, 5], fov: 50 }}
          style={{ width: "100%", height: "100%" }}
        >
          <Scene progressRef={progressRef} />
          <AsciiOverlay
            bgColor={bgColor}
            fgColor={fgColor}
            characters=" .:-+*=%@#"
            invert
            resolution={0.18}
          />
        </Canvas>
      </div>
    </section>
  );
}
