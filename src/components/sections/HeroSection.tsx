"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Download, Terminal, Mail } from "lucide-react";
import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("@/components/3d/HeroScene"), { ssr: false });

const roles = [
    "AI-Powered Web Developer",
    "Gen AI & Prompt Engineer",
    "IoT & Computer Vision",
    "Data Analytics (SQL)",
    "NCC Certified Leader",
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.3 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: "easeOut" as const },
    },
};

export default function HeroSection() {
    const [roleIndex, setRoleIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [charIdx, setCharIdx] = useState(0);

    useEffect(() => {
        const current = roles[roleIndex];
        let timeout: ReturnType<typeof setTimeout>;

        if (!isDeleting && charIdx <= current.length) {
            setDisplayText(current.slice(0, charIdx));
            timeout = setTimeout(() => setCharIdx((c) => c + 1), 90);
        } else if (!isDeleting && charIdx > current.length) {
            timeout = setTimeout(() => setIsDeleting(true), 1800);
        } else if (isDeleting && charIdx > 0) {
            setDisplayText(current.slice(0, charIdx));
            timeout = setTimeout(() => setCharIdx((c) => c - 1), 45);
        } else {
            setIsDeleting(false);
            setRoleIndex((i) => (i + 1) % roles.length);
        }

        return () => clearTimeout(timeout);
    }, [charIdx, isDeleting, roleIndex]);

    return (
        <section
            id="hero"
            style={{
                position: "relative",
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                overflow: "hidden",
            }}
            className="grid-bg"
        >
            <div className="hero-gradient" style={{ position: "absolute", inset: 0 }} />
            <HeroScene />
            <div className="scan-line" />

            <div
                style={{
                    position: "relative",
                    zIndex: 10,
                    maxWidth: 1320,
                    margin: "0 auto",
                    padding: "0 clamp(1.5rem, 5vw, 4rem)",
                    width: "100%",
                    paddingTop: "6rem",
                }}
            >
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    style={{ maxWidth: 700 }}
                >
                    {/* Badge */}
                    <motion.div variants={itemVariants}>
                        <div
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                padding: "0.35rem 1rem",
                                background: "rgba(99,120,255,0.1)",
                                border: "1px solid rgba(99,120,255,0.25)",
                                borderRadius: 99,
                                marginBottom: "1.5rem",
                                fontSize: "0.75rem",
                                fontFamily: "var(--font-mono)",
                                fontWeight: 600,
                                letterSpacing: "0.08em",
                                textTransform: "uppercase",
                                color: "var(--color-primary)",
                            }}
                        >
                            <Terminal size={12} />
                            <span>Open to Opportunities</span>
                            <span
                                style={{
                                    display: "inline-block",
                                    width: 7,
                                    height: 7,
                                    borderRadius: "50%",
                                    background: "#22c55e",
                                    boxShadow: "0 0 8px #22c55e",
                                    animation: "pulse 2s infinite",
                                }}
                            />
                        </div>
                    </motion.div>

                    {/* Name */}
                    <motion.h1
                        variants={itemVariants}
                        style={{
                            fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
                            fontWeight: 800,
                            lineHeight: 1.05,
                            marginBottom: "0.75rem",
                            letterSpacing: "-0.03em",
                            color: "var(--color-text)",
                        }}
                    >
                        Hi, I&apos;m{" "}
                        <span
                            className="glitch"
                            data-text="Anil Kumar Desai"
                            style={{ display: "inline-block" }}
                        >
                            <span className="text-gradient">Anil Kumar Desai</span>
                        </span>
                    </motion.h1>

                    {/* Typewriter Role */}
                    <motion.div
                        variants={itemVariants}
                        style={{
                            fontSize: "clamp(1.1rem, 3vw, 1.75rem)",
                            fontWeight: 500,
                            color: "var(--color-text-muted)",
                            marginBottom: "1.5rem",
                            height: "2.2rem",
                        }}
                    >
                        <span
                            className="text-gradient typing-cursor"
                            style={{ fontFamily: "var(--font-mono)" }}
                        >
                            {displayText}
                        </span>
                    </motion.div>

                    {/* Description */}
                    <motion.p
                        variants={itemVariants}
                        style={{
                            fontSize: "1rem",
                            lineHeight: 1.75,
                            color: "var(--color-text-muted)",
                            maxWidth: 520,
                            marginBottom: "2.5rem",
                        }}
                    >
                        A tech enthusiast skilled in AI-powered web development, data analytics,
                        and IoT — building real-world solutions with Google AI, OpenCV, and Node.js.
                        Currently advancing with Google AI & Prompt Engineering training.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        variants={itemVariants}
                        style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "3rem" }}
                    >
                        <button
                            className="btn-primary"
                            onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
                        >
                            View Projects
                            <ArrowDown size={16} />
                        </button>
                        <a href="/resume.pdf" download className="btn-outline" style={{ textDecoration: "none" }}>
                            <Download size={16} />
                            Resume
                        </a>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div variants={itemVariants} style={{ display: "flex", gap: "1rem" }}>
                        {[
                            { Icon: Github, href: "https://github.com/anilkumardesai18", label: "GitHub" },
                            { Icon: Linkedin, href: "https://www.linkedin.com/in/anil-kumar-desai-b3818b32b", label: "LinkedIn" },
                            { Icon: Mail, href: "mailto:anilkumardesai18@gmail.com", label: "Email" },
                        ].map(({ Icon, href, label }) => (
                            <a
                                key={label}
                                href={href}
                                target={label === "Email" ? undefined : "_blank"}
                                rel="noopener noreferrer"
                                aria-label={label}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: 44,
                                    height: 44,
                                    borderRadius: 10,
                                    border: "1px solid var(--color-border)",
                                    color: "var(--color-text-muted)",
                                    textDecoration: "none",
                                    transition: "all 0.3s",
                                }}
                                onMouseEnter={(e) => {
                                    const el = e.currentTarget;
                                    el.style.borderColor = "var(--color-primary)";
                                    el.style.color = "var(--color-primary)";
                                    el.style.background = "rgba(99,120,255,0.08)";
                                    el.style.boxShadow = "0 0 15px rgba(99,120,255,0.2)";
                                }}
                                onMouseLeave={(e) => {
                                    const el = e.currentTarget;
                                    el.style.borderColor = "var(--color-border)";
                                    el.style.color = "var(--color-text-muted)";
                                    el.style.background = "transparent";
                                    el.style.boxShadow = "none";
                                }}
                            >
                                <Icon size={18} />
                            </a>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                    style={{
                        position: "absolute",
                        bottom: "2.5rem",
                        left: "50%",
                        transform: "translateX(-50%)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "0.5rem",
                    }}
                >
                    <span
                        style={{
                            fontSize: "0.7rem",
                            fontFamily: "var(--font-mono)",
                            color: "var(--color-text-subtle)",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                        }}
                    >
                        Scroll to explore
                    </span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        style={{ color: "var(--color-primary)" }}
                    >
                        <ArrowDown size={18} />
                    </motion.div>
                </motion.div>
            </div>

            <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
        </section>
    );
}
