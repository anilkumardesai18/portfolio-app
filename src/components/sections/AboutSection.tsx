"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, MapPin, Code, Shield } from "lucide-react";

const stats = [
    { label: "Projects Built", value: "3+" },
    { label: "Technologies", value: "10+" },
    { label: "Certifications", value: "5+" },
    { label: "NCC Certificates", value: "A, B, C" },
];

const infoCards = [
    {
        Icon: GraduationCap,
        label: "Education",
        value: "B.E – Computer Science",
        sub: "Don Bosco Institute, Bengaluru · 2026",
    },
    {
        Icon: MapPin,
        label: "Location",
        value: "Bengaluru, Karnataka",
        sub: "Nagadevanahalli · 560056",
    },
    {
        Icon: Code,
        label: "Specialty",
        value: "AI-Powered Web Dev",
        sub: "Python · Gen AI · SQL · IoT",
    },
    {
        Icon: Shield,
        label: "Leadership",
        value: "NCC Certified (A, B, C)",
        sub: "Sainik School Kodagu Alumni",
    },
];

export default function AboutSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const container = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    };
    const item = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" as const },
        },
    };

    return (
        <section
            id="about"
            ref={ref}
            style={{
                padding: "var(--section-padding) clamp(1.5rem, 5vw, 4rem)",
                maxWidth: 1320,
                margin: "0 auto",
                position: "relative",
            }}
        >
            <div className="section-gradient" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />

            <motion.div
                variants={container}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                style={{ position: "relative", zIndex: 1 }}
            >
                {/* Label */}
                <motion.div variants={item}>
                    <div className="section-label">
                        <span>01</span>
                        <span>About Me</span>
                    </div>
                </motion.div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: "4rem",
                        alignItems: "start",
                    }}
                >
                    {/* Left: Text */}
                    <div>
                        <motion.h2
                            variants={item}
                            style={{
                                fontSize: "clamp(2rem, 4vw, 3rem)",
                                fontWeight: 800,
                                lineHeight: 1.15,
                                marginBottom: "1.5rem",
                                letterSpacing: "-0.02em",
                            }}
                        >
                            Building the{" "}
                            <span className="text-gradient">AI-Powered</span>{" "}
                            Future
                        </motion.h2>

                        <motion.p variants={item} style={{ color: "var(--color-text-muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
                            I&apos;m a final-year Computer Science student at Don Bosco Institute, Bengaluru,
                            passionate about building real-world solutions at the intersection of AI, web development,
                            and IoT. From wiring Raspberry Pi circuits to deploying full-stack dashboards — I love the
                            entire build cycle.
                        </motion.p>
                        <motion.p variants={item} style={{ color: "var(--color-text-muted)", lineHeight: 1.8, marginBottom: "2rem" }}>
                            My background spans AI-powered web development, data analytics with SQL, computer vision,
                            and Google AI API integration. As an NCC-certified leader from Sainik School Kodagu, I bring
                            discipline and a hands-on problem-solving mindset to every project I take on.
                        </motion.p>

                        {/* Stats */}
                        <motion.div
                            variants={item}
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(2, 1fr)",
                                gap: "1rem",
                            }}
                        >
                            {stats.map((stat) => (
                                <div
                                    key={stat.label}
                                    className="glass-card"
                                    style={{ padding: "1.25rem", textAlign: "center" }}
                                >
                                    <div
                                        style={{
                                            fontSize: "2rem",
                                            fontWeight: 800,
                                            background: "linear-gradient(135deg, #6378ff, #a855f7)",
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent",
                                            backgroundClip: "text",
                                        }}
                                    >
                                        {stat.value}
                                    </div>
                                    <div style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", marginTop: "0.25rem" }}>
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right: Info Cards */}
                    <motion.div
                        variants={item}
                        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
                    >
                        {infoCards.map(({ Icon, label, value, sub }) => (
                            <div
                                key={label}
                                className="glass-card"
                                style={{
                                    padding: "1.25rem 1.5rem",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "1rem",
                                }}
                            >
                                <div
                                    style={{
                                        width: 44,
                                        height: 44,
                                        borderRadius: 10,
                                        background: "rgba(99,120,255,0.12)",
                                        border: "1px solid rgba(99,120,255,0.2)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0,
                                        color: "var(--color-primary)",
                                    }}
                                >
                                    <Icon size={20} />
                                </div>
                                <div>
                                    <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginBottom: "0.15rem" }}>
                                        {label}
                                    </div>
                                    <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--color-text)" }}>
                                        {value}
                                    </div>
                                    <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>
                                        {sub}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Career Objective */}
                        <div
                            style={{
                                marginTop: "0.5rem",
                                padding: "1.25rem",
                                borderLeft: "3px solid var(--color-primary)",
                                background: "rgba(99,120,255,0.05)",
                                borderRadius: "0 8px 8px 0",
                                fontStyle: "italic",
                                color: "var(--color-text-muted)",
                                fontSize: "0.9rem",
                                lineHeight: 1.7,
                            }}
                        >
                            &ldquo;A disciplined tech enthusiast building AI-powered tools that make a difference — one project at a time.&rdquo;
                            <div style={{ marginTop: "0.5rem", fontSize: "0.75rem", color: "var(--color-text-subtle)", fontStyle: "normal", fontFamily: "var(--font-mono)" }}>
                                — Career Objective
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
