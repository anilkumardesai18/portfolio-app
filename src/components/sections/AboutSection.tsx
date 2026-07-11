"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, MapPin, Briefcase, Shield } from "lucide-react";

const stats = [
    { value: "5+", label: "Projects Built" },
    { value: "15+", label: "Technologies" },
    { value: "5+", label: "Certifications" },
    { value: "7.8", label: "CGPA" },
];

const quickInfo = [
    { Icon: GraduationCap, label: "B.E Computer Science", sub: "Don Bosco Institute, Bengaluru · 2026" },
    { Icon: MapPin, label: "Bengaluru, Karnataka", sub: "Nagadevanahalli · 560056 · Open to Remote" },
    { Icon: Briefcase, label: "MindMatrix Intern + Freelancing", sub: "Android Dev · Gen AI · Full Stack" },
    { Icon: Shield, label: "NCC Certified (A, B, C)", sub: "Sainik School Kodagu Alumni" },
];

export default function AboutSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const fade = (delay = 0) => ({
        initial: { opacity: 0, y: 28 },
        animate: isInView ? { opacity: 1, y: 0 } : {},
        transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
    });

    return (
        <section id="about" className="section section-alt" ref={ref}>
            <div className="section-num">01</div>

            <div className="container" style={{ position: "relative", zIndex: 1 }}>
                <motion.div {...fade(0)}>
                    <div className="label-tag">About Me</div>
                </motion.div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                        gap: "4rem",
                        alignItems: "start",
                    }}
                >
                    {/* Left — biography */}
                    <div>
                        <motion.h2 {...fade(0.05)} className="display"
                            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", marginBottom: "1.75rem", textTransform: "uppercase" }}
                        >
                            Building the<br />
                            <span style={{ color: "var(--red)" }}>AI Future</span>
                        </motion.h2>

                        <div style={{ paddingLeft: "1.5rem", borderLeft: "4px solid var(--red)" }}>
                            <motion.p {...fade(0.1)} style={{ color: "var(--muted)", fontWeight: 500, lineHeight: 1.85, marginBottom: "1rem" }}>
                                I&apos;m a final-year Computer Science student at Don Bosco Institute, Bengaluru
                                (CGPA 7.8), passionate about building real-world solutions at the intersection
                                of AI, mobile development, web, and IoT.
                            </motion.p>
                            <motion.p {...fade(0.15)} style={{ color: "var(--muted)", fontWeight: 500, lineHeight: 1.85, marginBottom: "1rem" }}>
                                As an intern at <strong style={{ color: "var(--text)" }}>MindMatrix</strong>,
                                I built AI-powered Android applications with Generative AI, Kotlin, and Jetpack
                                Compose. I also freelance in full-stack web development — from responsive front-ends
                                to optimized back-ends.
                            </motion.p>
                            <motion.p {...fade(0.2)} style={{ color: "var(--muted)", fontWeight: 500, lineHeight: 1.85, marginBottom: "2.5rem" }}>
                                As an NCC-certified leader from Sainik School Kodagu, I bring discipline and a
                                hands-on problem-solving mindset to every project.
                            </motion.p>
                        </div>

                        {/* Stats row - Brutalist grid */}
                        <motion.div
                            {...fade(0.25)}
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(4, 1fr)",
                                borderTop: "1px solid var(--border)",
                                borderLeft: "1px solid var(--border)",
                                marginTop: "3rem",
                            }}
                        >
                            {stats.map((s) => (
                                <div
                                    key={s.label}
                                    style={{
                                        padding: "1.5rem 0.5rem",
                                        borderRight: "1px solid var(--border)",
                                        borderBottom: "1px solid var(--border)",
                                        textAlign: "center",
                                        background: "var(--surface)",
                                    }}
                                >
                                    <div
                                        className="display"
                                        style={{ fontSize: "2.5rem", color: "var(--red)", marginBottom: "0.5rem" }}
                                    >
                                        {s.value}
                                    </div>
                                    <div className="font-mono" style={{ fontSize: "0.65rem", color: "var(--text)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                                        {s.label}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right — quick info */}
                    <motion.div {...fade(0.15)} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        {quickInfo.map(({ Icon, label, sub }) => (
                            <div
                                key={label}
                                className="card"
                                style={{ padding: "1.5rem", display: "flex", alignItems: "center", gap: "1.25rem" }}
                            >
                                <div className="icon-box">
                                    <Icon size={20} />
                                </div>
                                <div>
                                    <div className="font-display" style={{ fontWeight: 700, fontSize: "1.05rem", color: "var(--text)", textTransform: "uppercase", marginBottom: "0.25rem" }}>
                                        {label}
                                    </div>
                                    <div className="font-mono" style={{ fontSize: "0.75rem", color: "var(--red)", fontWeight: 600 }}>
                                        {sub}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Quote */}
                        <div
                            className="card"
                            style={{
                                marginTop: "1rem",
                                padding: "2rem",
                                background: "var(--bg)",
                            }}
                        >
                            <p className="font-display" style={{ fontWeight: 600, color: "var(--text)", fontSize: "1.1rem", lineHeight: 1.6, marginBottom: "1rem" }}>
                                &ldquo;A disciplined tech enthusiast building AI-powered web &amp; mobile solutions that make a real difference — one project at a time.&rdquo;
                            </p>
                            <div className="font-mono" style={{ fontSize: "0.75rem", color: "var(--red)", fontWeight: 700, textTransform: "uppercase" }}>
                                — Career Objective
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
