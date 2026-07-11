"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar } from "lucide-react";

const experiences = [
    {
        role: "Android App Development Intern",
        company: "MindMatrix",
        period: "2023 – 2024",
        type: "Internship",
        description:
            "Built AI-powered Android applications using Kotlin and Jetpack Compose. Integrated Generative AI APIs, engineered prompts for in-app AI features, and managed offline databases for seamless offline UX.",
        highlights: ["Kotlin", "Jetpack Compose", "Generative AI", "API Integration", "Offline DB"],
    },
    {
        role: "Full Stack Developer",
        company: "Freelancing",
        period: "2023 – Present",
        type: "Work",
        description:
            "Developed full-stack web applications with admin support, delivering scalable and secure client solutions. End-to-end ownership from responsive front-end design to optimized back-end integration.",
        highlights: ["Next.js", "Node.js", "React", "TypeScript", "Admin Systems"],
    },
];

const certifications = [
    {
        role: "AI/ML Training",
        company: "Apna College",
        period: "Ongoing",
        type: "Training",
        chips: ["Python", "Machine Learning", "Neural Networks", "AI"],
    },
    {
        role: "Data Analytics Certificate",
        company: "Tutedude",
        period: "2024",
        type: "Certification",
        chips: ["SQL", "Excel", "Python", "Data Analytics"],
    },
    {
        role: "AI Essentials & Prompt Engineering",
        company: "Google (via Training)",
        period: "2024",
        type: "Certification",
        chips: ["Gen AI", "Prompt Engineering", "Google AI API"],
    },
    {
        role: "Data Analytics Virtual Experience",
        company: "Deloitte Australia",
        period: "2024",
        type: "Certificate",
        chips: ["Data Analytics", "Dashboards", "Business Insights"],
    },
    {
        role: "Android App Development",
        company: "MindMatrix",
        period: "2023",
        type: "Training",
        chips: ["Android", "Kotlin", "Mobile Dev", "UI/UX"],
    },
    {
        role: "NCC Certification (A, B, C)",
        company: "Sainik School Kodagu",
        period: "2018 – 2022",
        type: "Leadership",
        chips: ["Leadership", "Discipline", "Teamwork", "NCC"],
    },
];

type SectionDivider = { title: string };

function Divider({ title }: SectionDivider) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "3rem" }}>
            <span
                className="font-display"
                style={{
                    fontSize: "1.2rem", fontWeight: 800,
                    textTransform: "uppercase",
                    color: "var(--text)",
                }}
            >
                {title}
            </span>
            <div style={{ flex: 1, height: 2, background: "var(--border)" }} />
        </div>
    );
}

export default function ExperienceSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    const fade = (delay = 0) => ({
        initial: { opacity: 0, x: -24 },
        animate: isInView ? { opacity: 1, x: 0 } : {},
        transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
    });

    return (
        <section id="experience" className="section" ref={ref}>
            <div className="section-num">04</div>

            <div className="container" style={{ position: "relative", zIndex: 1 }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    style={{ marginBottom: "4rem" }}
                >
                    <div className="label-tag">Experience &amp; Certifications</div>
                    <h2 className="display" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", marginBottom: "0.75rem", textTransform: "uppercase" }}>
                        My Professional <br /><span style={{ color: "var(--red)" }}>Journey</span>
                    </h2>
                </motion.div>

                {/* Work Experience */}
                <Divider title="Work Experience" />

                <div className="timeline-root" style={{ marginBottom: "5rem" }}>
                    {experiences.map((exp, i) => (
                        <motion.div
                            key={exp.company}
                            {...fade(i * 0.15)}
                            style={{ position: "relative", marginBottom: "2.5rem" }}
                        >
                            <div className="timeline-dot" />

                            <div
                                className="card"
                                style={{
                                    padding: "2rem",
                                    borderLeft: "6px solid var(--red)",
                                    background: "var(--surface)",
                                }}
                            >
                                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "1rem", marginBottom: "1.25rem" }}>
                                    <div>
                                        <h3 className="display" style={{ fontSize: "1.5rem", marginBottom: "0.4rem" }}>
                                            {exp.role}
                                        </h3>
                                        <div style={{ fontWeight: 700, fontSize: "1rem", color: "var(--red)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                                            {exp.company}
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.5rem" }}>
                                        <div className="font-mono" style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "var(--muted)", fontWeight: 600 }}>
                                            <Calendar size={14} />
                                            {exp.period}
                                        </div>
                                        <span
                                            className="font-mono"
                                            style={{
                                                padding: "0.25rem 0.75rem",
                                                border: "1px solid var(--border)",
                                                fontSize: "0.7rem",
                                                fontWeight: 700,
                                                color: "var(--red)",
                                                textTransform: "uppercase",
                                                letterSpacing: "0.1em",
                                                background: "var(--bg)",
                                            }}
                                        >
                                            {exp.type}
                                        </span>
                                    </div>
                                </div>
                                <p style={{ fontSize: "1rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1.75rem", fontWeight: 500 }}>
                                    {exp.description}
                                </p>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                                    {exp.highlights.map((h) => (
                                        <span key={h} className="chip">{h}</span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Certifications */}
                <Divider title="Training &amp; Certifications" />

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                        gap: "1.5rem",
                    }}
                >
                    {certifications.map((cert, i) => (
                        <motion.div
                            key={cert.company + cert.role}
                            initial={{ opacity: 0, y: 24 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.1 + i * 0.05 }}
                            className="card-sm"
                            style={{
                                padding: "1.5rem",
                                borderLeft: "4px solid var(--red)",
                                background: "var(--surface)",
                            }}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem", marginBottom: "1rem" }}>
                                <div>
                                    <h4 className="font-display" style={{ fontWeight: 800, fontSize: "1.05rem", color: "var(--text)", marginBottom: "0.25rem" }}>
                                        {cert.role}
                                    </h4>
                                    <div style={{ fontSize: "0.85rem", color: "var(--red)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                                        {cert.company}
                                    </div>
                                </div>
                                <div className="font-mono" style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.75rem", color: "var(--muted)", fontWeight: 600, whiteSpace: "nowrap" }}>
                                    <Calendar size={12} />
                                    {cert.period}
                                </div>
                            </div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                                {cert.chips.map((c) => (
                                    <span key={c} className="chip">{c}</span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
