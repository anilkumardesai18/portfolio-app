"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Calendar } from "lucide-react";

const certifications = [
    {
        role: "AI/ML Training",
        company: "Apna College",
        period: "Ongoing",
        type: "Training",
        color: "#6378ff",
        description:
            "Currently undergoing comprehensive AI/ML training covering machine learning fundamentals, neural networks, and practical application of AI algorithms in real-world scenarios.",
        tags: ["Python", "Machine Learning", "Neural Networks", "AI"],
    },
    {
        role: "Data Analytics Certificate",
        company: "Tutedude",
        period: "2024",
        type: "Certification",
        color: "#a855f7",
        description:
            "Completed a structured data analytics program covering SQL for database querying, Excel for data manipulation and visualization, and Python for data analysis and automation pipelines.",
        tags: ["SQL", "Excel", "Python", "Data Analytics"],
    },
    {
        role: "AI Essentials & Prompt Engineering",
        company: "Google (via Training)",
        period: "2024",
        type: "Certification",
        color: "#22d3ee",
        description:
            "Trained in Google AI essentials including responsible AI usage, prompt design strategies, and hands-on experience with the Google AI API for building AI-powered applications.",
        tags: ["Gen AI", "Prompt Engineering", "Google AI API"],
    },
    {
        role: "Android App Development",
        company: "MindMatrix",
        period: "2023",
        type: "Training",
        color: "#f59e0b",
        description:
            "Completed Android application development training, learning to build, test and deploy native Android apps including UI design, activity lifecycle management, and API integration.",
        tags: ["Android", "Java", "Mobile Dev", "UI/UX"],
    },
    {
        role: "Data Analytics Virtual Experience",
        company: "Deloitte Australia",
        period: "2024",
        type: "Certificate",
        color: "#ec4899",
        description:
            "Completed the Deloitte Australia Data Analytics job simulation on Forage. Performed data analysis, created dashboards, and delivered data-driven insights in a simulated professional environment.",
        tags: ["Data Analytics", "Dashboards", "Business Insights"],
    },
    {
        role: "NCC Certification (A, B, C)",
        company: "Sainik School Kodagu",
        period: "2018 – 2022",
        type: "Leadership",
        color: "#22c55e",
        description:
            "Earned all three levels of NCC (National Cadet Corps) certification — A, B, and C certificates. Trained in discipline, leadership, teamwork, and national service over four years at Sainik School Kodagu.",
        tags: ["Leadership", "Discipline", "Teamwork", "NCC"],
    },
];

export default function ExperienceSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            id="experience"
            ref={ref}
            style={{
                padding: "var(--section-padding) clamp(1.5rem, 5vw, 4rem)",
                background: "var(--color-bg-secondary)",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.3, pointerEvents: "none" }} />

            <div style={{ maxWidth: 1320, margin: "0 auto", position: "relative", zIndex: 1 }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <div className="section-label">
                        <span>04</span>
                        <span>Training &amp; Certifications</span>
                    </div>
                    <h2
                        style={{
                            fontSize: "clamp(2rem, 4vw, 3rem)",
                            fontWeight: 800,
                            marginBottom: "0.75rem",
                            letterSpacing: "-0.02em",
                        }}
                    >
                        My <span className="text-gradient">Journey</span>
                    </h2>
                    <p style={{ color: "var(--color-text-muted)", marginBottom: "4rem", maxWidth: 520 }}>
                        From AI/ML training to national leadership — continuously learning and growing.
                    </p>
                </motion.div>

                {/* Timeline */}
                <div style={{ position: "relative", paddingLeft: "2rem" }}>
                    {/* Vertical line */}
                    <div className="timeline-line" />

                    {certifications.map((cert, index) => (
                        <motion.div
                            key={cert.company + cert.role}
                            initial={{ opacity: 0, x: -30 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                            style={{ position: "relative", marginBottom: "2.5rem" }}
                        >
                            {/* Timeline dot */}
                            <div
                                style={{
                                    position: "absolute",
                                    left: -34,
                                    top: 24,
                                    width: 12,
                                    height: 12,
                                    borderRadius: "50%",
                                    background: cert.color,
                                    boxShadow: `0 0 12px ${cert.color}`,
                                    border: "2px solid var(--color-bg-secondary)",
                                }}
                            />

                            <div className="glass-card" style={{ padding: "1.75rem" }}>
                                {/* Header */}
                                <div
                                    style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        justifyContent: "space-between",
                                        gap: "0.5rem",
                                        marginBottom: "1rem",
                                    }}
                                >
                                    <div>
                                        <h3 style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: "0.2rem" }}>
                                            {cert.role}
                                        </h3>
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "0.5rem",
                                                color: cert.color,
                                                fontWeight: 600,
                                                fontSize: "0.9rem",
                                            }}
                                        >
                                            <Award size={14} />
                                            {cert.company}
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.35rem" }}>
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "0.4rem",
                                                fontSize: "0.8rem",
                                                color: "var(--color-text-muted)",
                                                fontFamily: "var(--font-mono)",
                                            }}
                                        >
                                            <Calendar size={12} />
                                            {cert.period}
                                        </div>
                                        <span
                                            style={{
                                                padding: "0.2rem 0.7rem",
                                                background: `${cert.color}15`,
                                                border: `1px solid ${cert.color}30`,
                                                borderRadius: 99,
                                                fontSize: "0.7rem",
                                                fontWeight: 600,
                                                color: cert.color,
                                                fontFamily: "var(--font-mono)",
                                                textTransform: "uppercase",
                                            }}
                                        >
                                            {cert.type}
                                        </span>
                                    </div>
                                </div>

                                <p
                                    style={{
                                        fontSize: "0.875rem",
                                        color: "var(--color-text-muted)",
                                        lineHeight: 1.75,
                                        marginBottom: "1.25rem",
                                    }}
                                >
                                    {cert.description}
                                </p>

                                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                                    {cert.tags.map((tag) => (
                                        <span key={tag} className="tag">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
