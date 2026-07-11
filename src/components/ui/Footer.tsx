"use client";

import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

const links = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
];

export default function Footer() {
    return (
        <footer
            style={{
                background: "var(--surface)",
                borderTop: "2px solid var(--border)",
                padding: "3rem 0 2rem",
            }}
        >
            <div className="container">
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "2rem",
                        marginBottom: "2.5rem",
                    }}
                >
                    {/* Brand */}
                    <div>
                        <div
                            className="font-display"
                            style={{ fontWeight: 900, fontSize: "1.5rem", color: "var(--text)", textTransform: "uppercase", letterSpacing: "-0.04em", marginBottom: "0.25rem" }}
                        >
                            Anil<span style={{ color: "var(--red)" }}>.</span>Desai
                        </div>
                        <div className="font-mono" style={{ fontSize: "0.75rem", color: "var(--red)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                            AI &amp; Mobile Developer
                        </div>
                    </div>

                    {/* Nav */}
                    <nav style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
                        {links.map((l) => (
                            <button
                                key={l.label}
                                onClick={() => document.querySelector(l.href)?.scrollIntoView({ behavior: "smooth" })}
                                className="font-mono"
                                style={{
                                    background: "none", border: "none", cursor: "pointer",
                                    fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase",
                                    color: "var(--text)", transition: "color 0.2s",
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--red)")}
                                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text)")}
                            >
                                {l.label}
                            </button>
                        ))}
                    </nav>

                    {/* Social + Back to top */}
                    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
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
                                    border: "1px solid var(--border)", color: "var(--red)",
                                    background: "var(--surface)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    transition: "all 0.2s",
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = "var(--red)"; e.currentTarget.style.color = "var(--surface)"; e.currentTarget.style.transform = "translate(-2px, -2px)"; e.currentTarget.style.boxShadow = "2px 2px 0px var(--border)"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = "var(--surface)"; e.currentTarget.style.color = "var(--red)"; e.currentTarget.style.transform = "translate(0, 0)"; e.currentTarget.style.boxShadow = "none"; }}
                            >
                                <Icon size={18} />
                            </a>
                        ))}
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                            style={{
                                marginLeft: "1rem",
                                width: 44, height: 44,
                                background: "var(--red)", border: "1px solid var(--border)", color: "var(--surface)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                cursor: "pointer", transition: "all 0.2s",
                            }}
                            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--bg)"; (e.currentTarget as HTMLElement).style.color = "var(--red)"; (e.currentTarget as HTMLElement).style.transform = "translate(-2px, -2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "2px 2px 0px var(--border)"; }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--red)"; (e.currentTarget as HTMLElement).style.color = "var(--surface)"; (e.currentTarget as HTMLElement).style.transform = "translate(0, 0)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                            aria-label="Back to top"
                        >
                            <ArrowUp size={18} />
                        </button>
                    </div>
                </div>

                {/* Bottom bar */}
                <div
                    style={{
                        paddingTop: "2rem",
                        borderTop: "2px solid var(--border)",
                        display: "flex", flexWrap: "wrap", justifyContent: "space-between",
                        gap: "1rem",
                    }}
                >
                    <span className="font-mono" style={{ fontSize: "0.75rem", color: "var(--text)", fontWeight: 700, textTransform: "uppercase" }}>
                        © {new Date().getFullYear()} Anil Kumar Desai.
                    </span>
                    <span className="font-mono" style={{ fontSize: "0.75rem", color: "var(--text)", fontWeight: 700, textTransform: "uppercase" }}>
                        Built with Next.js
                        <span style={{ marginLeft: "0.75rem", color: "var(--red)" }}>v3.0.0</span>
                    </span>
                </div>
            </div>
        </footer>
    );
}
