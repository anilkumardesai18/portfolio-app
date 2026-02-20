"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Menu, X, Code2 } from "lucide-react";

const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "AI Chat", href: "#ai-chat" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState("Home");
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 30);
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
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 9000,
                    padding: scrolled ? "0.75rem 2rem" : "1.25rem 2rem",
                    background: scrolled ? "rgba(5,6,16,0.85)" : "transparent",
                    backdropFilter: scrolled ? "blur(20px)" : "none",
                    borderBottom: scrolled ? "1px solid rgba(99,120,255,0.1)" : "none",
                    transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                {/* Logo */}
                <button
                    onClick={() => handleNav("#hero", "Home")}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                    }}
                >
                    <div
                        style={{
                            width: 36,
                            height: 36,
                            borderRadius: 8,
                            background: "linear-gradient(135deg, #6378ff 0%, #a855f7 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 0 15px rgba(99,120,255,0.4)",
                        }}
                    >
                        <Code2 size={18} color="white" />
                    </div>
                    <span
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontWeight: 700,
                            fontSize: "1rem",
                            color: "var(--color-text)",
                        }}
                    >
                        Anil<span style={{ color: "var(--color-primary)" }}>.dev</span>
                    </span>
                </button>

                {/* Desktop Nav */}
                <nav
                    style={{
                        display: "flex",
                        gap: "2rem",
                        listStyle: "none",
                    }}
                    className="hidden md:flex"
                >
                    {navLinks.map((link) => (
                        <button
                            key={link.label}
                            onClick={() => handleNav(link.href, link.label)}
                            className={`nav-link ${active === link.label ? "active" : ""}`}
                            style={{ background: "none", border: "none", cursor: "pointer" }}
                        >
                            {link.label}
                        </button>
                    ))}
                </nav>

                {/* CTA */}
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <button
                        onClick={() => handleNav("#contact", "Contact")}
                        className="btn-primary hidden md:inline-flex"
                        style={{ padding: "0.5rem 1.25rem", fontSize: "0.875rem" }}
                    >
                        Hire Me
                    </button>
                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        style={{
                            background: "none",
                            border: "1px solid var(--color-border)",
                            borderRadius: 8,
                            color: "var(--color-text)",
                            cursor: "pointer",
                            padding: "0.4rem",
                            display: "flex",
                            alignItems: "center",
                        }}
                        className="md:hidden"
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
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                            position: "fixed",
                            top: 0, right: 0, bottom: 0,
                            width: "75vw",
                            maxWidth: 320,
                            background: "rgba(10,13,31,0.98)",
                            backdropFilter: "blur(24px)",
                            borderLeft: "1px solid var(--color-border)",
                            zIndex: 8999,
                            display: "flex",
                            flexDirection: "column",
                            padding: "6rem 2rem 2rem",
                            gap: "1rem",
                        }}
                    >
                        {navLinks.map((link, i) => (
                            <motion.button
                                key={link.label}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.07 }}
                                onClick={() => handleNav(link.href, link.label)}
                                style={{
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    textAlign: "left",
                                    fontSize: "1.1rem",
                                    fontWeight: 600,
                                    color: active === link.label ? "var(--color-primary)" : "var(--color-text)",
                                    padding: "0.75rem 0",
                                    borderBottom: "1px solid var(--color-border)",
                                    transition: "color 0.2s",
                                }}
                            >
                                {link.label}
                            </motion.button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
