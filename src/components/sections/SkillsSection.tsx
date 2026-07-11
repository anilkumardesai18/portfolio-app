"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type BentoCell = {
    title: string;
    icon: string;
    span: number;
    featured?: string;
    chips: string[];
};

const bento: BentoCell[] = [
    {
        title: "Languages",
        icon: "⌨️",
        span: 7,
        featured: "Kotlin  ·  Python",
        chips: ["JavaScript", "TypeScript", "HTML", "CSS"],
    },
    {
        title: "AI & Gen AI",
        icon: "🤖",
        span: 5,
        featured: "Google AI API",
        chips: ["Prompt Engineering", "OpenCV", "Computer Vision", "Machine Learning"],
    },
    {
        title: "Mobile Dev",
        icon: "📱",
        span: 4,
        featured: "Android (Kotlin)",
        chips: ["Jetpack Compose", "React Native", "Health Connect", "Wearable APIs"],
    },
    {
        title: "Web & Frontend",
        icon: "🌐",
        span: 4,
        featured: "Next.js  ·  React",
        chips: ["Tailwind CSS", "Framer Motion", "TypeScript", "Responsive Design"],
    },
    {
        title: "Backend",
        icon: "⚙️",
        span: 4,
        featured: "Node.js  ·  Express",
        chips: ["REST APIs", "Firebase", "Supabase", "Google Cloud"],
    },
    {
        title: "Databases",
        icon: "🗄️",
        span: 5,
        featured: "SQL  ·  PostgreSQL",
        chips: ["Supabase", "Firebase", "Render", "Google Cloud"],
    },
    {
        title: "IoT & Hardware",
        icon: "🔌",
        span: 4,
        featured: "Raspberry Pi",
        chips: ["OpenCV", "Computer Vision", "Python", "Linux"],
    },
    {
        title: "Workflow",
        icon: "🛠️",
        span: 3,
        featured: "VS Code",
        chips: ["Android Studio", "Git", "Linux", "Windows"],
    },
];

const techMarquee = [
    "Python", "Kotlin", "SQL", "PostgreSQL", "JavaScript", "TypeScript",
    "Next.js", "React", "Node.js", "Express", "React Native",
    "Gen AI", "Google AI API", "Prompt Engineering", "OpenCV",
    "Raspberry Pi", "IoT", "Firebase", "Supabase", "Google Cloud",
    "Render", "Tailwind CSS", "Jetpack Compose", "Android Studio",
    "VS Code", "Linux", "Excel", "Data Analytics", "Git",
];

export default function SkillsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="skills" className="section" ref={ref}>
            <div className="section-num">02</div>

            <div className="container" style={{ position: "relative", zIndex: 1 }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    style={{ marginBottom: "3.5rem" }}
                >
                    <div className="label-tag">Skills &amp; Technologies</div>
                    <h2 className="display" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", marginBottom: "0.75rem", textTransform: "uppercase" }}>
                        My Technical <br /><span style={{ color: "var(--red)" }}>Arsenal</span>
                    </h2>
                    <p style={{ color: "var(--muted)", maxWidth: 520, lineHeight: 1.7, fontWeight: 500 }}>
                        From AI APIs and Kotlin to IoT hardware — tools I use to build impactful products across web, mobile, and embedded systems.
                    </p>
                </motion.div>

                {/* BENTO GRID - Brutalist styling */}
                <div className="bento-grid" style={{ marginBottom: "5rem" }}>
                    {bento.map((cell, i) => (
                        <motion.div
                            key={cell.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: i * 0.05 }}
                            className="bento-cell"
                            style={{
                                gridColumn: `span ${cell.span}`,
                                padding: "2rem",
                                position: "relative",
                                overflow: "hidden",
                                minWidth: 0,
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
                                <span style={{ fontSize: "1.5rem", filter: "grayscale(100%) brightness(0%) sepia(100%) hue-rotate(-50deg) saturate(600%) contrast(0.8)", opacity: 0.9 }}>{cell.icon}</span>
                                <h3 className="font-mono" style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--red)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                                    {cell.title}
                                </h3>
                            </div>

                            {cell.featured && (
                                <div
                                    className="display"
                                    style={{
                                        fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
                                        color: "var(--text)",
                                        marginBottom: "1.5rem",
                                    }}
                                >
                                    {cell.featured}
                                </div>
                            )}

                            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "auto" }}>
                                {cell.chips.map((chip) => (
                                    <span key={chip} className="chip">{chip}</span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Marquee */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                        <span className="font-mono" style={{ fontSize: "0.75rem", color: "var(--red)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em" }}>
                            Technologies Overview
                        </span>
                    </div>
                    <div className="marquee-wrap">
                        <div className="marquee-track">
                            {[...techMarquee, ...techMarquee].map((tech, i) => (
                                <div
                                    key={i}
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "0.75rem",
                                        padding: "0 1.5rem",
                                        fontFamily: "var(--font-display)",
                                        fontSize: "1.2rem",
                                        fontWeight: 700,
                                        color: "var(--text)",
                                        textTransform: "uppercase",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    <span style={{ color: "var(--red)" }}>/</span>
                                    {tech}
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
