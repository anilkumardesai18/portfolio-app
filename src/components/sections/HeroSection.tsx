"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Download, Mail } from "lucide-react";
import BrutalistShape from "@/components/3d/BrutalistShape";

const roles = [
    "Full Stack Developer",
    "Android & Mobile Developer",
    "Gen AI & Prompt Engineer",
    "AI-Powered Web Developer",
    "IoT & Computer Vision",
];

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
            timeout = setTimeout(() => setCharIdx((c) => c + 1), 85);
        } else if (!isDeleting && charIdx > current.length) {
            timeout = setTimeout(() => setIsDeleting(true), 2200);
        } else if (isDeleting && charIdx > 0) {
            setDisplayText(current.slice(0, charIdx));
            timeout = setTimeout(() => setCharIdx((c) => c - 1), 40);
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
            <div className="container" style={{ position: "relative", zIndex: 10, paddingTop: "7rem" }}>
                <div style={{ maxWidth: 800 }}>
                    {/* Main heading */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                    >
                        <h1
                            className="display"
                            style={{
                                fontSize: "clamp(3.5rem, 9vw, 8rem)",
                                lineHeight: 0.95,
                                marginBottom: "1.5rem",
                                textTransform: "uppercase",
                            }}
                        >
                            Anil<br />
                            <span style={{ color: "var(--red)" }}>Kumar</span><br />
                            Desai
                        </h1>
                    </motion.div>

                    {/* Typewriter role */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        style={{ marginBottom: "2rem", height: "2rem" }}
                    >
                        <span
                            className="typing-cursor font-mono"
                            style={{
                                fontSize: "clamp(1rem, 3vw, 1.5rem)",
                                fontWeight: 700,
                                color: "var(--red)",
                                textTransform: "uppercase",
                            }}
                        >
                            {displayText}
                        </span>
                    </motion.div>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        style={{
                            fontSize: "1.1rem",
                            lineHeight: 1.7,
                            color: "var(--muted)",
                            maxWidth: 580,
                            marginBottom: "2.5rem",
                            fontWeight: 500,
                        }}
                    >
                        A tech enthusiast skilled in AI-powered web &amp; Android development,
                        data analytics, and IoT. Interned at MindMatrix, freelancing in full-stack
                        development — currently advancing with Google AI &amp; Prompt Engineering.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "3.5rem" }}
                    >
                        <button
                            className="btn btn-primary"
                            onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
                        >
                            View Projects
                            <ArrowDown size={15} />
                        </button>
                        <a href="/resume.pdf" download className="btn btn-outline">
                            <Download size={15} />
                            Resume
                        </a>
                    </motion.div>

                    {/* Social icons */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        style={{ display: "flex", gap: "1rem", alignItems: "center" }}
                    >
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
                                    width: 44, height: 44,
                                    border: "1px solid var(--border)",
                                    color: "var(--red)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    transition: "all 0.2s",
                                    background: "var(--surface)",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = "var(--red)";
                                    e.currentTarget.style.color = "var(--surface)";
                                    e.currentTarget.style.transform = "translate(-2px, -2px)";
                                    e.currentTarget.style.boxShadow = "2px 2px 0px var(--border)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = "var(--surface)";
                                    e.currentTarget.style.color = "var(--red)";
                                    e.currentTarget.style.transform = "translate(0, 0)";
                                    e.currentTarget.style.boxShadow = "none";
                                }}
                            >
                                <Icon size={20} />
                            </a>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Huge background text decoration */}
            <div
                className="font-display"
                style={{
                    position: "absolute",
                    right: "-10%",
                    bottom: "-10%",
                    fontSize: "clamp(20rem, 40vw, 40rem)",
                    fontWeight: 900,
                    lineHeight: 0.8,
                    color: "transparent",
                    WebkitTextStroke: "2px var(--border-light)",
                    zIndex: 0,
                    pointerEvents: "none",
                    userSelect: "none",
                }}
            >
                DEV
            </div>

            {/* Brutalist 3D Wireframe */}
            <div style={{ position: "absolute", right: "5%", top: "50%", transform: "translateY(-50%)", width: "40vw", height: "60vh", minWidth: 300, minHeight: 300, zIndex: 1, pointerEvents: "none", opacity: 0.7 }} className="hidden md:block">
                <BrutalistShape />
            </div>
        </section>
    );
}
