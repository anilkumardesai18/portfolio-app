"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron, Edges } from "@react-three/drei";
import * as THREE from "three";

function RotatingShape() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.2;
            meshRef.current.rotation.y += delta * 0.3;
        }
    });

    return (
        <mesh ref={meshRef}>
            {/* A sharp geometric shape */}
            <Icosahedron args={[1.8, 0]}>
                {/* Transparent inner material so only the wireframe edges are visible, or a very faint red */}
                <meshBasicMaterial color="#F9F8F6" transparent opacity={0.8} />
                {/* Cherry Red edges for the brutalist 2-color aesthetic */}
                <Edges scale={1.05} color="#D2042D" />
            </Icosahedron>
        </mesh>
    );
}

export default function BrutalistShape() {
    return (
        <div style={{ width: "100%", height: "100%", position: "absolute", top: 0, right: 0, zIndex: 0, pointerEvents: "none" }}>
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 2]}>
                <RotatingShape />
            </Canvas>
        </div>
    );
}
