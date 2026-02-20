"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type Skill = { name: string; level: number; color: string };

const skillCategories = [
    {
        title: "Languages & Data",
        icon: "⌨️",
        skills: [
            { name: "Python", level: 80, color: "#6378ff" },
            { name: "SQL", level: 75, color: "#a855f7" },
            { name: "JavaScript / Node.js", level: 70, color: "#f59e0b" },
        ],
    },
    {
        title: "AI & Technologies",
        icon: "🤖",
        skills: [
            { name: "Generative AI (Google AI API)", level: 82, color: "#6378ff" },
            { name: "Prompt Engineering", level: 85, color: "#a855f7" },
            { name: "API Integration", level: 80, color: "#22d3ee" },
            { name: "OpenCV / Computer Vision", level: 70, color: "#f59e0b" },
        ],
    },
    {
        title: "Tools & Platforms",
        icon: "🛠️",
        skills: [
            { name: "Raspberry Pi / IoT", level: 72, color: "#6378ff" },
            { name: "VS Code / Linux", level: 85, color: "#a855f7" },
            { name: "Next.js / React", level: 68, color: "#22d3ee" },
            { name: "Excel / Data Analytics", level: 75, color: "#f59e0b" },
        ],
    },
];

const techMarquee = [
    "Python", "SQL", "Gen AI", "Google AI API", "Prompt Engineering",
    "OpenCV", "Raspberry Pi", "Node.js", "Next.js", "React",
    "API Integration", "VS Code", "Linux", "Windows", "Excel",
    "Data Analytics", "IoT", "TypeScript",
];

function SkillBar({ skill, index }: { skill: Skill; index: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <div ref={ref} style={{ marginBottom: "1.25rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "0.875rem", color: "var(--color-text)", fontWeight: 500 }}>
                    {skill.name}
                </span>
                <span
                    style={{
                        fontSize: "0.75rem",
                        fontFamily: "var(--font-mono)",
                        color: skill.color,
                        fontWeight: 700,
                    }}
                >
                    {skill.level}%
                </span>
            </div>
            <div
                style={{
                    height: 6,
                    background: "rgba(255,255,255,0.06)",
                    borderRadius: 99,
                    overflow: "hidden",
                }}
            >
                <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                    transition={{ duration: 1.2, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="skill-bar-fill"
                    style={{
                        background: `linear-gradient(90deg, ${skill.color}99, ${skill.color})`,
                    }}
                />
            </div>
        </div>
    );
}

export default function SkillsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            id="skills"
            ref={ref}
            style={{
                padding: "var(--section-padding) clamp(1.5rem, 5vw, 4rem)",
                background: "var(--color-bg-secondary)",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Grid bg */}
            <div
                className="grid-bg"
                style={{ position: "absolute", inset: 0, opacity: 0.5, pointerEvents: "none" }}
            />

            <div style={{ maxWidth: 1320, margin: "0 auto", position: "relative", zIndex: 1 }}>
                {/* Label */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <div className="section-label">
                        <span>02</span>
                        <span>Skills &amp; Technologies</span>
                    </div>
                    <h2
                        style={{
                            fontSize: "clamp(2rem, 4vw, 3rem)",
                            fontWeight: 800,
                            marginBottom: "0.75rem",
                            letterSpacing: "-0.02em",
                        }}
                    >
                        My <span className="text-gradient">Technical Arsenal</span>
                    </h2>
                    <p style={{ color: "var(--color-text-muted)", marginBottom: "3rem", maxWidth: 520 }}>
                        From AI APIs and Python to IoT hardware and data analytics — tools I use to build impactful products.
                    </p>
                </motion.div>

                {/* Skill Grids */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: "1.5rem",
                        marginBottom: "4rem",
                    }}
                >
                    {skillCategories.map((cat, ci) => (
                        <motion.div
                            key={cat.title}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: ci * 0.15 }}
                            className="glass-card"
                            style={{ padding: "1.75rem" }}
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
                                <span style={{ fontSize: "1.5rem" }}>{cat.icon}</span>
                                <h3 style={{ fontWeight: 700, fontSize: "1.1rem" }}>{cat.title}</h3>
                            </div>
                            {cat.skills.map((skill, i) => (
                                <SkillBar key={skill.name} skill={skill} index={i} />
                            ))}
                        </motion.div>
                    ))}
                </div>

                {/* Marquee */}
                <div style={{ overflow: "hidden", padding: "1rem 0" }}>
                    <p
                        style={{
                            textAlign: "center",
                            fontSize: "0.75rem",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            fontFamily: "var(--font-mono)",
                            color: "var(--color-text-subtle)",
                            marginBottom: "1.5rem",
                        }}
                    >
                        Technologies I&apos;ve worked with
                    </p>
                    <div style={{ overflow: "hidden" }}>
                        <div className="marquee-track">
                            {[...techMarquee, ...techMarquee].map((tech, i) => (
                                <div
                                    key={i}
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "0.75rem",
                                        padding: "0.5rem 1.5rem",
                                        margin: "0 0.5rem",
                                        background: "rgba(99,120,255,0.06)",
                                        border: "1px solid rgba(99,120,255,0.12)",
                                        borderRadius: 8,
                                        fontSize: "0.875rem",
                                        fontWeight: 600,
                                        color: "var(--color-text-muted)",
                                        whiteSpace: "nowrap",
                                        flexShrink: 0,
                                    }}
                                >
                                    <span
                                        style={{
                                            width: 6,
                                            height: 6,
                                            borderRadius: "50%",
                                            background: "var(--color-primary)",
                                            flexShrink: 0,
                                        }}
                                    />
                                    {tech}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
