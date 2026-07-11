"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "AI Chat", href: "#ai-chat" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState("");
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNav = (href: string, label: string) => {
        setActive(label);
        setMobileOpen(false);
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <motion.header
                initial={{ y: -60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{
                    position: "fixed",
                    top: 0, left: 0, right: 0,
                    zIndex: 9000,
                    padding: scrolled ? "0.875rem clamp(1.25rem, 5vw, 3.5rem)" : "1.5rem clamp(1.25rem, 5vw, 3.5rem)",
                    background: scrolled ? "var(--bg)" : "transparent",
                    borderBottom: scrolled ? "1px solid var(--border)" : "none",
                    transition: "all 0.3s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    maxWidth: "100%",
                }}
            >
                {/* Logo */}
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    style={{
                        background: "none", border: "none", cursor: "pointer",
                        display: "flex", alignItems: "center", gap: "0.5rem",
                    }}
                    aria-label="Go to top"
                >
                    <span
                        className="font-display"
                        style={{
                            fontWeight: 800,
                            fontSize: "1.2rem",
                            color: "var(--text)",
                            letterSpacing: "-0.04em",
                            textTransform: "uppercase",
                        }}
                    >
                        Anil<span style={{ color: "var(--red)" }}>.</span>Desai
                    </span>
                </button>

                {/* Desktop Nav */}
                <nav
                    className="hidden md:flex"
                    style={{ display: "flex", gap: "2.5rem", listStyle: "none" }}
                >
                    {navLinks.map((link) => (
                        <button
                            key={link.label}
                            onClick={() => handleNav(link.href, link.label)}
                            className={`nav-item ${active === link.label ? "active" : ""}`}
                        >
                            {link.label}
                        </button>
                    ))}
                </nav>

                {/* CTA */}
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <button
                        onClick={() => handleNav("#contact", "Contact")}
                        className="btn btn-primary hidden md:inline-flex"
                        style={{ padding: "0.5rem 1.25rem", fontSize: "0.82rem" }}
                    >
                        Hire Me
                    </button>
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        style={{
                            background: "none",
                            border: "1px solid var(--border)",
                            color: "var(--red)",
                            cursor: "pointer",
                            padding: "0.4rem",
                            display: "flex",
                            alignItems: "center",
                        }}
                        className="md:hidden"
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                            position: "fixed",
                            top: 0, right: 0, bottom: 0,
                            width: "75vw", maxWidth: 300,
                            background: "var(--surface)",
                            borderLeft: "1px solid var(--border)",
                            zIndex: 8999,
                            display: "flex",
                            flexDirection: "column",
                            padding: "6rem 2rem 2rem",
                            gap: "0.25rem",
                        }}
                    >
                        {navLinks.map((link, i) => (
                            <motion.button
                                key={link.label}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.06 }}
                                onClick={() => handleNav(link.href, link.label)}
                                style={{
                                    background: "none", border: "none", cursor: "pointer",
                                    textAlign: "left",
                                    fontSize: "1.2rem", fontWeight: 700,
                                    color: active === link.label ? "var(--red)" : "var(--text)",
                                    padding: "1rem 0",
                                    borderBottom: "1px solid var(--border)",
                                    transition: "color 0.2s",
                                    fontFamily: "var(--font-display)",
                                    textTransform: "uppercase",
                                }}
                            >
                                {link.label}
                            </motion.button>
                        ))}
                        <button
                            onClick={() => handleNav("#contact", "Contact")}
                            className="btn btn-primary"
                            style={{ marginTop: "1.5rem", justifyContent: "center" }}
                        >
                            Hire Me
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
