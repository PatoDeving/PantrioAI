import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function RotatingBoxes() {
  const groupRef = useRef();

  const boxes = useMemo(() => {
    const boxData = [];
    for (let i = 0; i < 30; i++) {
      boxData.push({
        position: [
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10
        ],
        scale: Math.random() * 0.3 + 0.1,
        rotationSpeed: [
          Math.random() * 0.02,
          Math.random() * 0.02,
          Math.random() * 0.02
        ]
      });
    }
    return boxData;
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
      groupRef.current.rotation.x += 0.0005;
      groupRef.current.children.forEach((child, i) => {
        child.rotation.x += boxes[i].rotationSpeed[0];
        child.rotation.y += boxes[i].rotationSpeed[1];
        child.rotation.z += boxes[i].rotationSpeed[2];
      });
    }
  });

  return (
    <group ref={groupRef}>
      {boxes.map((box, i) => (
        <mesh key={i} position={box.position} scale={box.scale}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial
            color="#3366FF"
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

const GeometricBackground = () => {
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
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: false, powerPreference: 'high-performance', alpha: false }}
      >
        <color attach="background" args={['#0A0A0F']} />
        <RotatingBoxes />
      </Canvas>
    </div>
  );
};

export default GeometricBackground;
