import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function SpiralParticles() {
  const ref = useRef();
  const count = 800;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const t = i / count;
      const angle = t * Math.PI * 20;
      const radius = t * 5;

      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = (t - 0.5) * 10;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        transparent
        color="#7A33FF"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </points>
  );
}

const SpiralBackground = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        gl={{ antialias: false, powerPreference: 'high-performance', alpha: false }}
      >
        <color attach="background" args={['#0A0A0F']} />
        <SpiralParticles />
      </Canvas>
    </div>
  );
};

export default SpiralBackground;
