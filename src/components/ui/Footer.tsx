"use client";

import { motion } from "framer-motion";
import { Code2, Heart, Github, Linkedin, Mail, ArrowUp } from "lucide-react";

const socials = [
    { Icon: Github, href: "https://github.com/anilkumardesai18", label: "GitHub" },
    { Icon: Linkedin, href: "https://www.linkedin.com/in/anil-kumar-desai-b3818b32b", label: "LinkedIn" },
    { Icon: Mail, href: "mailto:anilkumardesai18@gmail.com", label: "Email" },
];

export default function Footer() {
    const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    return (
        <footer style={{ background: "var(--color-bg)", position: "relative", padding: "3rem clamp(1.5rem, 5vw, 4rem) 1.75rem" }}>
            {/* Top gradient line */}
            <div style={{
                position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
                width: "55%", height: 1,
                background: "linear-gradient(90deg, transparent, rgba(99,120,255,0.45), rgba(168,85,247,0.45), transparent)",
            }} />

            <div style={{ maxWidth: 900, margin: "0 auto" }}>
                {/* Main row */}
                <div style={{
                    display: "flex", flexWrap: "wrap",
                    alignItems: "center", justifyContent: "space-between",
                    gap: "1.5rem", marginBottom: "1.75rem",
                }}>
                    {/* Brand */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                        <div style={{
                            width: 34, height: 34, borderRadius: "50%",
                            background: "linear-gradient(135deg, #6378ff, #a855f7)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            boxShadow: "0 0 10px rgba(99,120,255,0.3)",
                        }}>
                            <Code2 size={16} color="white" />
                        </div>
                        <div>
                            <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--color-text)", fontFamily: "var(--font-mono)" }}>
                                Anil<span style={{ color: "var(--color-primary)" }}>.dev</span>
                            </div>
                            <div style={{ fontSize: "0.68rem", color: "var(--color-text-muted)", marginTop: 1 }}>
                                Engineering Student &amp; AI Developer
                            </div>
                        </div>
                    </div>

                    {/* Social icons */}
                    <div style={{ display: "flex", gap: "0.55rem" }}>
                        {socials.map(({ Icon, href, label }) => (
                            <a
                                key={label}
                                href={href}
                                target={href.startsWith("http") ? "_blank" : undefined}
                                rel="noopener noreferrer"
                                aria-label={label}
                                style={{
                                    width: 36, height: 36, borderRadius: "50%",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    background: "rgba(99,120,255,0.07)",
                                    border: "1px solid rgba(99,120,255,0.12)",
                                    color: "var(--color-text-muted)",
                                    textDecoration: "none",
                                    transition: "all 0.25s",
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.background = "rgba(99,120,255,0.15)";
                                    e.currentTarget.style.borderColor = "rgba(99,120,255,0.35)";
                                    e.currentTarget.style.color = "var(--color-primary)";
                                    e.currentTarget.style.transform = "translateY(-2px)";
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.background = "rgba(99,120,255,0.07)";
                                    e.currentTarget.style.borderColor = "rgba(99,120,255,0.12)";
                                    e.currentTarget.style.color = "var(--color-text-muted)";
                                    e.currentTarget.style.transform = "translateY(0)";
                                }}
                            >
                                <Icon size={15} />
                            </a>
                        ))}
                    </div>

                    {/* Back to top */}
                    <button
                        onClick={scrollTop}
                        style={{
                            display: "flex", alignItems: "center", gap: "0.4rem",
                            background: "rgba(99,120,255,0.07)",
                            border: "1px solid rgba(99,120,255,0.15)",
                            borderRadius: 99,
                            padding: "0.45rem 1rem",
                            color: "var(--color-primary)",
                            cursor: "pointer",
                            fontSize: "0.78rem",
                            fontWeight: 600,
                            transition: "all 0.25s",
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.background = "rgba(99,120,255,0.15)";
                            e.currentTarget.style.boxShadow = "0 0 14px rgba(99,120,255,0.2)";
                            e.currentTarget.style.transform = "translateY(-1px)";
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.background = "rgba(99,120,255,0.07)";
                            e.currentTarget.style.boxShadow = "none";
                            e.currentTarget.style.transform = "translateY(0)";
                        }}
                    >
                        <ArrowUp size={13} />
                        Back to top
                    </button>
                </div>

                {/* Bottom divider + copyright */}
                <div style={{
                    paddingTop: "1.25rem",
                    borderTop: "1px solid rgba(255,255,255,0.04)",
                    display: "flex", flexWrap: "wrap",
                    justifyContent: "space-between", alignItems: "center", gap: "0.75rem",
                }}>
                    <span style={{ fontSize: "0.72rem", color: "var(--color-text-subtle)", fontFamily: "var(--font-mono)" }}>
                        © {new Date().getFullYear()} Anil Kumar Desai
                        <span style={{ color: "var(--color-primary)", marginLeft: "0.5rem" }}>v1.0.0</span>
                    </span>
                    <span style={{
                        fontSize: "0.72rem", color: "var(--color-text-subtle)",
                        display: "flex", alignItems: "center", gap: "0.35rem",
                    }}>
                        Built with <Heart size={10} style={{ color: "#ec4899" }} fill="#ec4899" /> Next.js &amp; R3F
                    </span>
                </div>
            </div>
        </footer>
    );
}
