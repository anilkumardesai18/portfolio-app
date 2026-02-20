"use client";

import { Code2, Heart, Github, Linkedin, ArrowUp } from "lucide-react";

export default function Footer() {
    const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    return (
        <footer
            style={{
                background: "var(--color-bg)",
                borderTop: "1px solid rgba(99,120,255,0.08)",
                padding: "3rem clamp(1.5rem, 5vw, 4rem) 2rem",
                position: "relative",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "40%",
                    height: 1,
                    background: "linear-gradient(90deg, transparent, rgba(99,120,255,0.5), transparent)",
                }}
            />

            <div
                style={{
                    maxWidth: 1320,
                    margin: "0 auto",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "1.5rem",
                }}
            >
                {/* Logo & Name */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <div
                        style={{
                            width: 32,
                            height: 32,
                            borderRadius: 8,
                            background: "linear-gradient(135deg, #6378ff, #a855f7)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Code2 size={16} color="white" />
                    </div>
                    <div>
                        <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--color-text)" }}>
                            Anil Kumar Desai
                        </div>
                        <div
                            style={{
                                fontSize: "0.7rem",
                                color: "var(--color-text-muted)",
                                fontFamily: "var(--font-mono)",
                            }}
                        >
                            Engineering Student & Developer
                        </div>
                    </div>
                </div>

                {/* Credit */}
                <div
                    style={{
                        fontSize: "0.8rem",
                        color: "var(--color-text-muted)",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.4rem",
                    }}
                >
                    Built with{" "}
                    <Heart size={12} style={{ color: "#ec4899" }} fill="#ec4899" />
                    {" "}using Next.js, R3F & Framer Motion
                </div>

                {/* Back to top */}
                <button
                    onClick={scrollTop}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.4rem",
                        background: "rgba(99,120,255,0.08)",
                        border: "1px solid rgba(99,120,255,0.2)",
                        borderRadius: 8,
                        padding: "0.5rem 1rem",
                        color: "var(--color-primary)",
                        cursor: "pointer",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        transition: "all 0.3s",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(99,120,255,0.18)";
                        e.currentTarget.style.boxShadow = "0 0 15px rgba(99,120,255,0.2)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(99,120,255,0.08)";
                        e.currentTarget.style.boxShadow = "none";
                    }}
                >
                    Back to top
                    <ArrowUp size={14} />
                </button>
            </div>

            <div
                style={{
                    maxWidth: 1320,
                    margin: "1.5rem auto 0",
                    paddingTop: "1.5rem",
                    borderTop: "1px solid rgba(255,255,255,0.04)",
                    textAlign: "center",
                    fontSize: "0.75rem",
                    color: "var(--color-text-subtle)",
                    fontFamily: "var(--font-mono)",
                }}
            >
                © {new Date().getFullYear()} Anil Kumar Desai. All rights reserved.{" "}
                <span style={{ color: "var(--color-primary)" }}>v1.0.0</span>
            </div>
        </footer>
    );
}
