"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Github, Linkedin, Mail, Download, ChevronDown, Cpu } from "lucide-react";
import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("@/components/3d/HeroScene"), { ssr: false });

const roles = [
    "AI-Powered Web Developer",
    "Gen AI & Prompt Engineer",
    "IoT & Computer Vision",
    "Data Analytics with SQL",
    "NCC Certified Leader",
];

const stats = [
    { label: "Projects", value: "3+" },
    { label: "Certifications", value: "5+" },
    { label: "Location", value: "Bengaluru" },
];

const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.4 } },
};
const item = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export default function HeroSection() {
    const [roleIndex, setRoleIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [charIdx, setCharIdx] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: sectionRef });
    const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
    const y = useTransform(scrollYProgress, [0, 0.4], [0, -40]);

    // Typewriter
    useEffect(() => {
        const current = roles[roleIndex];
        let t: ReturnType<typeof setTimeout>;
        if (!isDeleting && charIdx <= current.length) {
            setDisplayText(current.slice(0, charIdx));
            t = setTimeout(() => setCharIdx((c) => c + 1), 80);
        } else if (!isDeleting && charIdx > current.length) {
            t = setTimeout(() => setIsDeleting(true), 2000);
        } else if (isDeleting && charIdx > 0) {
            setDisplayText(current.slice(0, charIdx));
            t = setTimeout(() => setCharIdx((c) => c - 1), 38);
        } else {
            setIsDeleting(false);
            setRoleIndex((i) => (i + 1) % roles.length);
        }
        return () => clearTimeout(t);
    }, [charIdx, isDeleting, roleIndex]);

    return (
        <section
            id="hero"
            ref={sectionRef}
            style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}
            className="grid-bg"
        >
            {/* Backgrounds */}
            <div className="hero-gradient" style={{ position: "absolute", inset: 0 }} />
            <HeroScene />
            <div className="scan-line" />

            {/* Radial vignette */}
            <div style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                background: "radial-gradient(ellipse 50% 80% at 80% 50%, transparent 40%, rgba(5,6,16,0.7) 100%)",
            }} />

            {/* Content */}
            <motion.div
                style={{
                    position: "relative", zIndex: 10, opacity, y,
                    maxWidth: 1320, margin: "0 auto", width: "100%",
                    padding: "0 clamp(1.5rem, 5vw, 4rem)",
                    paddingTop: "7rem", paddingBottom: "4rem",
                }}
            >
                <motion.div variants={container} initial="hidden" animate="visible" style={{ maxWidth: 660 }}>

                    {/* Status badge */}
                    <motion.div variants={item} style={{ marginBottom: "1.75rem" }}>
                        <span className="status-badge">
                            <span className="status-dot" />
                            Available for opportunities
                        </span>
                    </motion.div>

                    {/* Name */}
                    <motion.h1
                        variants={item}
                        style={{
                            fontSize: "clamp(2.6rem, 6vw, 4.5rem)",
                            fontWeight: 800,
                            lineHeight: 1.08,
                            letterSpacing: "-0.03em",
                            marginBottom: "0.5rem",
                            color: "var(--color-text)",
                        }}
                    >
                        Hi, I&apos;m{" "}
                        <span className="text-gradient-animated" style={{ display: "inline-block" }}>
                            Anil Kumar Desai
                        </span>
                    </motion.h1>

                    {/* Typing role */}
                    <motion.div
                        variants={item}
                        style={{
                            marginBottom: "1.5rem",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.6rem",
                        }}
                    >
                        <span style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            background: "rgba(99,120,255,0.08)",
                            border: "1px solid rgba(99,120,255,0.18)",
                            borderRadius: 8,
                            padding: "0.35rem 0.9rem",
                        }}>
                            <Cpu size={13} color="var(--color-primary)" />
                            <span
                                className="typing-cursor"
                                style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "clamp(0.85rem, 2vw, 1rem)",
                                    color: "var(--color-primary)",
                                    fontWeight: 500,
                                    minHeight: "1.4em",
                                    display: "inline-block",
                                }}
                            >
                                {displayText}
                            </span>
                        </span>
                    </motion.div>

                    {/* Description */}
                    <motion.p
                        variants={item}
                        style={{
                            fontSize: "1rem",
                            lineHeight: 1.8,
                            color: "var(--color-text-muted)",
                            maxWidth: 500,
                            marginBottom: "2rem",
                        }}
                    >
                        A tech enthusiast building intelligent web solutions with Google AI, OpenCV, and IoT.
                        Disciplined leader with NCC certification and a passion for real-world impact.
                    </motion.p>

                    {/* Stats row */}
                    <motion.div
                        variants={item}
                        style={{ display: "flex", gap: "1.5rem", marginBottom: "2.25rem", flexWrap: "wrap" }}
                    >
                        {stats.map((s, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                <span style={{ fontWeight: 700, fontSize: "1rem", color: "var(--color-primary)", fontFamily: "var(--font-mono)" }}>
                                    {s.value}
                                </span>
                                <span style={{ fontSize: "0.8rem", color: "var(--color-text-subtle)" }}>{s.label}</span>
                                {i < stats.length - 1 && (
                                    <span style={{ color: "var(--color-text-subtle)", marginLeft: "0.75rem", fontSize: "0.7rem" }}>·</span>
                                )}
                            </div>
                        ))}
                    </motion.div>

                    {/* CTAs */}
                    <motion.div variants={item} style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "2.5rem" }}>
                        <button
                            className="btn-primary"
                            onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
                        >
                            View Projects
                        </button>
                        <a href="/resume.pdf" download className="btn-outline" style={{ textDecoration: "none" }}>
                            <Download size={15} />
                            Resume
                        </a>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div variants={item} style={{ display: "flex", gap: "0.65rem" }}>
                        {[
                            { Icon: Github, href: "https://github.com/anilkumardesai18", label: "GitHub" },
                            { Icon: Linkedin, href: "https://www.linkedin.com/in/anil-kumar-desai-b3818b32b", label: "LinkedIn" },
                            { Icon: Mail, href: "mailto:anilkumardesai18@gmail.com", label: "Email" },
                        ].map(({ Icon, href, label }) => (
                            <a
                                key={label}
                                href={href}
                                target={href.startsWith("http") ? "_blank" : undefined}
                                rel="noopener noreferrer"
                                aria-label={label}
                                style={{
                                    width: 40, height: 40,
                                    borderRadius: "50%",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    background: "rgba(99,120,255,0.08)",
                                    border: "1px solid rgba(99,120,255,0.15)",
                                    color: "var(--color-text-muted)",
                                    textDecoration: "none",
                                    transition: "all 0.25s",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = "rgba(99,120,255,0.18)";
                                    e.currentTarget.style.borderColor = "rgba(99,120,255,0.4)";
                                    e.currentTarget.style.color = "var(--color-primary)";
                                    e.currentTarget.style.transform = "translateY(-2px)";
                                    e.currentTarget.style.boxShadow = "0 0 14px rgba(99,120,255,0.2)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = "rgba(99,120,255,0.08)";
                                    e.currentTarget.style.borderColor = "rgba(99,120,255,0.15)";
                                    e.currentTarget.style.color = "var(--color-text-muted)";
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.boxShadow = "none";
                                }}
                            >
                                <Icon size={17} />
                            </a>
                        ))}
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <div
                className="scroll-indicator"
                style={{
                    position: "absolute",
                    bottom: "2.5rem",
                    left: "50%",
                    zIndex: 10,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.3rem",
                    cursor: "pointer",
                }}
                onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
            >
                <span style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-text-subtle)", fontFamily: "var(--font-mono)" }}>
                    scroll
                </span>
                <ChevronDown size={16} color="var(--color-text-subtle)" />
            </div>
        </section>
    );
}
