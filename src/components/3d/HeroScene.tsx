import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron } from "@react-three/drei";
import type { Group } from "three";
import { TechChip } from "./TechChip";
import { Particles } from "./Particles";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ChipDef {
  position: [number, number, number];
  color: string;
}

// Decorative floating blocks arranged around the hero photo area.
const CHIPS: ChipDef[] = [
  { position: [-2.3, 1.3, -0.4], color: "#f59e0b" },
  { position: [2.2, 1.5, -0.8], color: "#22d3ee" },
  { position: [-2.4, -0.8, -0.6], color: "#5b7cfa" },
  { position: [2.3, -0.4, 0.2], color: "#5b7cfa" },
  { position: [0, 2.1, -1.2], color: "#22d3ee" },
  { position: [-0.2, -2.0, 0.2], color: "#a78bfa" },
  { position: [2.3, 1.9, 0.8], color: "#a78bfa" },
];

function CoreNode({ animate }: { animate: boolean }) {
  const ref = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current || !animate) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.18;
    ref.current.rotation.x = t * 0.08;
  });
  return (
    <group ref={ref}>
      <Icosahedron args={[0.62, 1]}>
        <meshStandardMaterial
          color="#0d1220"
          emissive="#5b7cfa"
          emissiveIntensity={0.35}
          wireframe
          transparent
          opacity={0.7}
        />
      </Icosahedron>
      <Icosahedron args={[0.42, 0]}>
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.6}
          transparent
          opacity={0.85}
        />
      </Icosahedron>
    </group>
  );
}

function Rig({ children, animate }: { children: React.ReactNode; animate: boolean }) {
  const ref = useRef<Group>(null);
  useFrame(({ clock, pointer }) => {
    if (!ref.current || !animate) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = Math.sin(t * 0.05) * 0.15 + pointer.x * 0.12;
    ref.current.rotation.x = pointer.y * -0.08;
  });
  return <group ref={ref}>{children}</group>;
}

interface HeroSceneProps {
  disableEffects?: boolean;
  onError?: () => void;
}

export function HeroScene({ disableEffects = false, onError }: HeroSceneProps) {
  const reducedMotion = useReducedMotion();
  const lite = disableEffects || reducedMotion;

  return (
    <Canvas
      dpr={[1, lite ? 1 : 1.5]}
      camera={{ position: [0, 0, 6.4], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      frameloop={lite ? "demand" : "always"}
      onCreated={(state) => {
        state.gl.setClearColor(0x000000, 0); // transparent background
      }}
      onError={() => onError?.()}
      style={{ position: "absolute", inset: 0 }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[4, 4, 4]} intensity={1.1} color="#5b7cfa" />
      <pointLight position={[-4, -3, -2]} intensity={0.7} color="#22d3ee" />

      <Rig animate={!lite}>
        <CoreNode animate={!lite} />
        {!lite && <Particles count={90} />}
        {CHIPS.map((chip, i) => (
          <TechChip
            key={i}
            position={chip.position}
            color={chip.color}
            speed={0.6 + i * 0.05}
            floatOffset={i * 1.4}
            animate={!lite}
          />
        ))}
      </Rig>
    </Canvas>
  );
}
