import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function NetworkLines() {
  const pointsRef = useRef();
  const linesRef = useRef();
  const numPoints = 50;
  
  const { positions, connections } = useMemo(() => {
    const positions = new Float32Array(numPoints * 3);
    const connections = [];
    
    for (let i = 0; i < numPoints; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    
    for (let i = 0; i < numPoints; i++) {
      for (let j = i + 1; j < numPoints; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
        
        if (distance < 2) {
          connections.push(i, j);
        }
      }
    }
    
    return { positions, connections };
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array;
      for (let i = 0; i < numPoints; i++) {
        positions[i * 3 + 1] += Math.sin(time + i) * 0.001;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      pointsRef.current.rotation.y = time * 0.05;
    }
    
    if (linesRef.current) {
      linesRef.current.rotation.y = time * 0.05;
    }
  });

  const linePositions = useMemo(() => {
    const linePos = new Float32Array(connections.length * 3);
    for (let i = 0; i < connections.length; i++) {
      const pointIndex = connections[i];
      linePos[i * 3] = positions[pointIndex * 3];
      linePos[i * 3 + 1] = positions[pointIndex * 3 + 1];
      linePos[i * 3 + 2] = positions[pointIndex * 3 + 2];
    }
    return linePos;
  }, [connections, positions]);

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={numPoints}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          transparent
          color="#33FFE0"
          size={0.05}
          sizeAttenuation={true}
        />
      </points>
      
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={connections.length}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          transparent
          color="#33CCFF"
          opacity={0.2}
        />
      </lineSegments>
    </group>
  );
}

const NetworkBackground = () => {
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
        <NetworkLines />
      </Canvas>
    </div>
  );
};

export default NetworkBackground;
