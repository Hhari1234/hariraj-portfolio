import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import type { Mesh } from "three";

interface TechChipProps {
  label?: string;
  position: [number, number, number];
  color: string;
  speed?: number;
  floatOffset?: number;
  animate?: boolean;
}

/**
 * Floating 3D element representing a technology.
 *
 * NOTE: This intentionally does NOT use drei's <Text> component. drei's <Text>
 * fetches a default font from an external CDN at runtime, which can fail or
 * hang when offline/blocked and leave the canvas blank/white. Labels are
 * rendered as lightweight HTML badges in the Hero instead, so the 3D layer
 * never depends on a network font fetch.
 */
export function TechChip({
  position,
  color,
  speed = 1,
  floatOffset = 0,
  animate = true,
}: TechChipProps) {
  const ref = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current || !animate) return;
    const t = clock.getElapsedTime() * speed + floatOffset;
    ref.current.position.y = position[1] + Math.sin(t) * 0.28;
    ref.current.rotation.y = Math.sin(t * 0.4) * 0.25;
    ref.current.rotation.x = Math.cos(t * 0.3) * 0.08;
  });

  return (
    <group ref={ref} position={position}>
      <RoundedBox args={[0.62, 0.62, 0.62]} radius={0.14} smoothness={4}>
        <meshStandardMaterial
          color="#0d1220"
          emissive={color}
          emissiveIntensity={0.5}
          roughness={0.3}
          metalness={0.5}
        />
      </RoundedBox>
    </group>
  );
}
