"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Torus, OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";

function AnimatedSphere() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame(({ clock }) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = clock.elapsedTime * 0.15;
            meshRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.3) * 0.2;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
            <mesh ref={meshRef} castShadow>
                <Sphere args={[1.6, 64, 64]}>
                    <MeshDistortMaterial
                        color="#6378ff"
                        attach="material"
                        distort={0.45}
                        speed={2.5}
                        roughness={0.1}
                        metalness={0.9}
                        emissive="#2a1a8f"
                        emissiveIntensity={0.3}
                    />
                </Sphere>
            </mesh>
        </Float>
    );
}

function AnimatedRing() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame(({ clock }) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = clock.elapsedTime * 0.4;
            meshRef.current.rotation.z = clock.elapsedTime * 0.2;
        }
    });

    return (
        <mesh ref={meshRef} position={[0, 0, 0]}>
            <Torus args={[2.5, 0.05, 16, 100]}>
                <meshStandardMaterial
                    color="#a855f7"
                    emissive="#a855f7"
                    emissiveIntensity={0.8}
                    roughness={0}
                    metalness={1}
                />
            </Torus>
        </mesh>
    );
}

function AnimatedRing2() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame(({ clock }) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = -clock.elapsedTime * 0.3;
            meshRef.current.rotation.y = clock.elapsedTime * 0.5;
        }
    });

    return (
        <mesh ref={meshRef} position={[0, 0, 0]}>
            <Torus args={[3.2, 0.03, 16, 100]}>
                <meshStandardMaterial
                    color="#22d3ee"
                    emissive="#22d3ee"
                    emissiveIntensity={0.6}
                    roughness={0}
                    metalness={1}
                />
            </Torus>
        </mesh>
    );
}

function Scene() {
    const { mouse } = useThree();
    const groupRef = useRef<THREE.Group>(null);

    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y += (mouse.x * 0.3 - groupRef.current.rotation.y) * 0.05;
            groupRef.current.rotation.x += (-mouse.y * 0.2 - groupRef.current.rotation.x) * 0.05;
        }
    });

    return (
        <group ref={groupRef}>
            <Stars radius={80} depth={50} count={3000} factor={4} saturation={0} fade speed={1.5} />
            <AnimatedSphere />
            <AnimatedRing />
            <AnimatedRing2 />
            <pointLight position={[10, 10, 10]} color="#6378ff" intensity={2} />
            <pointLight position={[-10, -10, -10]} color="#a855f7" intensity={1.5} />
            <ambientLight intensity={0.2} />
        </group>
    );
}

export default function HeroScene() {
    return (
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
            <Canvas
                camera={{ position: [0, 0, 6], fov: 60 }}
                gl={{ antialias: true, alpha: true }}
                style={{ background: "transparent" }}
            >
                <Suspense fallback={null}>
                    <Scene />
                </Suspense>
            </Canvas>
        </div>
    );
}
