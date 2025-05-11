"use client";

import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

function Model({ imageSrc }: { imageSrc: string }) {
  const gltf = useGLTF(imageSrc);
  const modelRef = useRef<THREE.Group>(null);
  const [isHovered, setIsHovered] = useState(false);

  useFrame((state, delta) => {
    if (modelRef.current && !isHovered) {
      // Auto-rotate when hovered
      modelRef.current.rotation.y += delta * 2;
    }
  });

  return (
    <mesh
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      <primitive
        ref={modelRef}
        object={gltf.scene}
        scale={5}
        position={[0, 0, 0]}
      />
    </mesh>
  );
}
export default function LaptopModel({ imageSrc }: { imageSrc: string }) {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 1000,
          position: [0, 2, 5],
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Model imageSrc={imageSrc} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
}
