"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars, Float } from "@react-three/drei";
import * as THREE from "three";

// ─── Neural Network Node ────────────────────────────────────────────────────
function NeuronNode({ position, color, size = 0.12, delay = 0 }: {
    position: [number, number, number];
    color: string;
    size?: number;
    delay?: number;
}) {
    const ref = useRef<THREE.Mesh>(null);
    useFrame(({ clock }) => {
        if (!ref.current) return;
        const t = clock.elapsedTime + delay;
        const mat = ref.current.material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity = 0.4 + Math.sin(t * 2.5) * 0.35;
        ref.current.scale.setScalar(1 + Math.sin(t * 2.5) * 0.12);
    });
    return (
        <mesh ref={ref} position={position}>
            <sphereGeometry args={[size, 16, 16]} />
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.6}
                roughness={0.1}
                metalness={0.8}
            />
        </mesh>
    );
}

// ─── Synapse (connection with animated signal pulse) ─────────────────────────
function Synapse({ start, end, color, speed = 1, delay = 0 }: {
    start: THREE.Vector3;
    end: THREE.Vector3;
    color: string;
    speed?: number;
    delay?: number;
}) {
    const pulseRef = useRef<THREE.Mesh>(null);

    const wireLine = useMemo(() => {
        const geo = new THREE.BufferGeometry().setFromPoints([start, end]);
        const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.15 });
        return new THREE.Line(geo, mat);
    }, [start, end, color]);

    useFrame(({ clock }) => {
        if (!pulseRef.current) return;
        const t = ((clock.elapsedTime * speed + delay) % 1);
        pulseRef.current.position.lerpVectors(start, end, t);
        const mat = pulseRef.current.material as THREE.MeshStandardMaterial;
        const fade = Math.sin(t * Math.PI);
        mat.emissiveIntensity = fade * 1.5;
        mat.opacity = fade * 0.9;
    });

    return (
        <group>
            <primitive object={wireLine} />
            <mesh ref={pulseRef}>
                <sphereGeometry args={[0.04, 8, 8]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={1.5}
                    transparent
                    opacity={0.8}
                />
            </mesh>
        </group>
    );
}

// ─── Full Neural Network ─────────────────────────────────────────────────────
function NeuralNetwork() {
    // 4-layer network: 3 → 5 → 5 → 3 nodes
    const layers: [number, number, number][][] = useMemo(() => {
        const spacing = 1.1;
        const layerX = [-1.8, -0.6, 0.6, 1.8];
        const counts = [3, 5, 5, 3];
        return layerX.map((x, li) => {
            const n = counts[li];
            return Array.from({ length: n }, (_, i) => [
                x,
                (i - (n - 1) / 2) * spacing,
                (Math.random() - 0.5) * 0.3,
            ] as [number, number, number]);
        });
    }, []);

    const nodeColors = ["#6378ff", "#a855f7", "#a855f7", "#22d3ee"];
    const synapseColors = ["#6378ff", "#8b5cf6", "#22d3ee"];

    // Build connections between adjacent layers
    const connections = useMemo(() => {
        const conns: { start: THREE.Vector3; end: THREE.Vector3; color: string; speed: number; delay: number }[] = [];
        for (let l = 0; l < layers.length - 1; l++) {
            layers[l].forEach((a, ai) => {
                layers[l + 1].forEach((b, bi) => {
                    // Connect selectively (not all-to-all) for less clutter
                    if ((ai + bi) % 2 === 0 || layers[l].length <= 3) {
                        conns.push({
                            start: new THREE.Vector3(...a),
                            end: new THREE.Vector3(...b),
                            color: synapseColors[l % synapseColors.length],
                            speed: 0.5 + Math.random() * 0.8,
                            delay: Math.random(),
                        });
                    }
                });
            });
        }
        return conns;
    }, [layers]);

    return (
        <group>
            {/* Nodes */}
            {layers.map((layer, li) =>
                layer.map((pos, ni) => (
                    <NeuronNode
                        key={`n-${li}-${ni}`}
                        position={pos}
                        color={nodeColors[li]}
                        size={li === 0 || li === 3 ? 0.14 : 0.11}
                        delay={ni * 0.4 + li * 0.8}
                    />
                ))
            )}
            {/* Synapses */}
            {connections.map((c, i) => (
                <Synapse key={`s-${i}`} {...c} />
            ))}
        </group>
    );
}

// ─── Orbiting Electron Rings ─────────────────────────────────────────────────
function ElectronRing({ radius, thickness, speed, tilt, color }: {
    radius: number;
    thickness: number;
    speed: number;
    tilt: [number, number, number];
    color: string;
}) {
    const ringRef = useRef<THREE.Mesh>(null);
    const dotRef = useRef<THREE.Mesh>(null);

    useFrame(({ clock }) => {
        if (ringRef.current) {
            ringRef.current.rotation.x = tilt[0] + clock.elapsedTime * speed * 0.3;
            ringRef.current.rotation.y = tilt[1] + clock.elapsedTime * speed * 0.5;
        }
        if (dotRef.current) {
            const t = clock.elapsedTime * speed;
            dotRef.current.position.set(
                Math.cos(t) * radius,
                Math.sin(t) * radius * Math.cos(tilt[0]),
                Math.sin(t) * radius * Math.sin(tilt[0])
            );
        }
    });

    return (
        <group>
            <mesh ref={ringRef}>
                <torusGeometry args={[radius, thickness, 16, 120]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={0.5}
                    roughness={0}
                    metalness={1}
                    transparent
                    opacity={0.5}
                />
            </mesh>
            {/* Orbiting electron dot */}
            <mesh ref={dotRef}>
                <sphereGeometry args={[0.07, 12, 12]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
            </mesh>
        </group>
    );
}

// ─── Floating Data Particles ─────────────────────────────────────────────────
function DataParticles() {
    const ref = useRef<THREE.Points>(null);
    const { positions, colors } = useMemo(() => {
        const count = 120;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const palette = [
            new THREE.Color("#6378ff"),
            new THREE.Color("#a855f7"),
            new THREE.Color("#22d3ee"),
        ];
        for (let i = 0; i < count; i++) {
            const r = 3.5 + Math.random() * 1.5;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = r * Math.cos(phi);
            const c = palette[Math.floor(Math.random() * palette.length)];
            colors[i * 3] = c.r;
            colors[i * 3 + 1] = c.g;
            colors[i * 3 + 2] = c.b;
        }
        return { positions, colors };
    }, []);

    useFrame(({ clock }) => {
        if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.04;
    });

    const geo = useMemo(() => {
        const g = new THREE.BufferGeometry();
        g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
        return g;
    }, [positions, colors]);

    return (
        <points ref={ref} geometry={geo}>
            <pointsMaterial size={0.045} vertexColors transparent opacity={0.7} sizeAttenuation />
        </points>
    );
}

// ─── Scene with mouse parallax ────────────────────────────────────────────────
function Scene() {
    const { mouse } = useThree();
    const groupRef = useRef<THREE.Group>(null);

    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y += (mouse.x * 0.25 - groupRef.current.rotation.y) * 0.04;
            groupRef.current.rotation.x += (-mouse.y * 0.15 - groupRef.current.rotation.x) * 0.04;
        }
    });

    return (
        <group ref={groupRef}>
            <Stars radius={90} depth={50} count={2500} factor={4} saturation={0} fade speed={1} />

            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.6}>
                <NeuralNetwork />
            </Float>

            {/* Three orbital rings like electron shells */}
            <ElectronRing radius={2.8} thickness={0.025} speed={0.6} tilt={[0.4, 0, 0]} color="#6378ff" />
            <ElectronRing radius={3.4} thickness={0.018} speed={-0.4} tilt={[1.1, 0.5, 0]} color="#a855f7" />
            <ElectronRing radius={3.9} thickness={0.014} speed={0.3} tilt={[0.2, 1.2, 0.3]} color="#22d3ee" />

            <DataParticles />

            {/* Lighting */}
            <pointLight position={[5, 5, 5]} color="#6378ff" intensity={3} />
            <pointLight position={[-5, -5, 3]} color="#a855f7" intensity={2} />
            <pointLight position={[0, 5, -5]} color="#22d3ee" intensity={1.5} />
            <ambientLight intensity={0.15} />
        </group>
    );
}

// ─── Export ───────────────────────────────────────────────────────────────────
export default function HeroScene() {
    return (
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
            <Canvas
                camera={{ position: [0, 0, 7], fov: 58 }}
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
