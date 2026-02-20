"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const skills = [
    { name: "Python", icon: "🐍", color: "#6378ff", desc: "Data, scripting & AI" },
    { name: "Gen AI / Google AI API", icon: "🤖", color: "#a855f7", desc: "Prompt Eng · API Integration" },
    { name: "Next.js & React", icon: "⚡", color: "#22d3ee", desc: "Full-stack web apps" },
    { name: "SQL & Data Analytics", icon: "📊", color: "#f59e0b", desc: "Excel · Reporting" },
    { name: "Computer Vision", icon: "👁️", color: "#ec4899", desc: "OpenCV · Detection" },
    { name: "IoT & Raspberry Pi", icon: "🔌", color: "#22c55e", desc: "Hardware · GPIO" },
    { name: "JavaScript / Node.js", icon: "🟡", color: "#f59e0b", desc: "Backend APIs" },
    { name: "Prompt Engineering", icon: "✨", color: "#a855f7", desc: "Structured prompts" },
    { name: "VS Code & Linux", icon: "🛠️", color: "#6378ff", desc: "Dev environments" },
];

const certifications = [
    { name: "AI Essentials & Prompt Eng.", org: "Self-paced", color: "#a855f7" },
    { name: "Data Analytics: SQL, Excel, Python", org: "Tutedude", color: "#f59e0b" },
    { name: "Deloitte Data Analytics", org: "Virtual Experience", color: "#22d3ee" },
    { name: "Android App Dev", org: "MindMatrix", color: "#22c55e" },
    { name: "AI/ML Training", org: "Apna College", color: "#6378ff" },
];

const techMarquee = [
    "Python", "SQL", "Gen AI", "Google AI API", "Prompt Engineering",
    "OpenCV", "Raspberry Pi", "Node.js", "Next.js", "React",
    "API Integration", "VS Code", "Linux", "Excel",
    "Data Analytics", "IoT", "TypeScript", "JavaScript",
    "Python", "SQL", "Gen AI", "Google AI API", "Prompt Engineering",
    "OpenCV", "Raspberry Pi", "Node.js", "Next.js", "React",
    "API Integration", "VS Code", "Linux", "Excel",
    "Data Analytics", "IoT", "TypeScript", "JavaScript",
];

function SkillTile({ skill, index }: { skill: typeof skills[0]; index: number }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
            className="bento-card"
            style={{ padding: "1.4rem 1.25rem", cursor: "default" }}
            onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = skill.color + "55";
                el.style.boxShadow = `0 0 28px ${skill.color}22`;
                el.style.transform = "translateY(-4px)";
            }}
            onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "var(--color-border)";
                el.style.boxShadow = "none";
                el.style.transform = "translateY(0)";
            }}
        >
            {/* Color accent top bar */}
            <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 2,
                background: skill.color,
                borderRadius: "16px 16px 0 0",
                opacity: 0.7,
            }} />
            <div style={{ fontSize: "1.75rem", marginBottom: "0.6rem", lineHeight: 1 }}>{skill.icon}</div>
            <div style={{ fontWeight: 650, fontSize: "0.92rem", color: "var(--color-text)", marginBottom: "0.3rem", lineHeight: 1.3 }}>
                {skill.name}
            </div>
            <div style={{ fontSize: "0.72rem", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>
                {skill.desc}
            </div>
        </motion.div>
    );
}

export default function SkillsSection() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section id="skills" style={{ padding: "var(--section-padding) clamp(1.5rem, 5vw, 4rem)" }} className="section-gradient">
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>

                {/* Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 24 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: "center", marginBottom: "3.5rem" }}
                >
                    <div className="section-label" style={{ margin: "0 auto 1rem" }}>
                        <span>⚙️</span> Skills
                    </div>
                    <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.025em", marginBottom: "0.75rem" }}>
                        Tools of My <span className="text-gradient">Trade</span>
                    </h2>
                    <p style={{ color: "var(--color-text-muted)", maxWidth: 480, margin: "0 auto", fontSize: "0.95rem", lineHeight: 1.7 }}>
                        A blend of AI, web, and hardware — everything I use to build real-world solutions.
                    </p>
                </motion.div>

                {/* Bento Grid */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))",
                    gap: "1rem",
                    marginBottom: "2.5rem",
                }}>
                    {skills.map((s, i) => <SkillTile key={s.name} skill={s} index={i} />)}
                </div>

                {/* Certifications strip */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    style={{
                        background: "var(--color-surface)",
                        border: "1px solid var(--color-border)",
                        borderRadius: 16,
                        padding: "1.5rem 1.75rem",
                        marginBottom: "2.5rem",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.1rem" }}>
                        <span style={{ fontSize: "0.68rem", fontFamily: "var(--font-mono)", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-text-muted)" }}>
                            🎓 Certifications &amp; Training
                        </span>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
                        {certifications.map((c) => (
                            <div key={c.name} style={{
                                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                                padding: "0.4rem 0.9rem",
                                border: `1px solid ${c.color}33`,
                                borderRadius: 8,
                                background: `${c.color}0d`,
                            }}>
                                <span style={{ width: 6, height: 6, borderRadius: "50%", background: c.color, flexShrink: 0 }} />
                                <span style={{ fontSize: "0.8rem", fontWeight: 500, color: "var(--color-text)" }}>{c.name}</span>
                                <span style={{ fontSize: "0.68rem", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>· {c.org}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Marquee */}
                <div style={{ overflow: "hidden", borderRadius: 12 }}>
                    <div className="marquee-track" style={{ gap: "2rem" }}>
                        {techMarquee.map((t, i) => (
                            <span key={i} style={{
                                whiteSpace: "nowrap",
                                fontSize: "0.78rem",
                                fontFamily: "var(--font-mono)",
                                color: "var(--color-text-muted)",
                                display: "flex", alignItems: "center", gap: "1.5rem",
                            }}>
                                {t}
                                <span style={{ color: "var(--color-text-subtle)", fontSize: "0.6rem" }}>◆</span>
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
