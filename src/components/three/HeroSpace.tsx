import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as React from "react";

function FloatingSpheres() {
  return (
    <group>
      {[...Array(12)].map((_, i) => (
        <mesh key={i} position={[Math.sin(i) * 3, Math.cos(i * 1.3) * 2, -2 - i * 0.2]}>
          <sphereGeometry args={[0.08 + (i % 3) * 0.03, 24, 24]} />
          <meshStandardMaterial color={"hsl(var(--primary))" as unknown as any} metalness={0.3} roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
}

const HeroSpace: React.FC = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 3, 2]} intensity={0.8} />
        <Stars radius={60} depth={40} count={2000} factor={3} fade speed={0.4} />
        <FloatingSpheres />
      </Canvas>
      {/* Readability overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/70 via-background/30 to-background/70" />
    </div>
  );
};

export default HeroSpace;
