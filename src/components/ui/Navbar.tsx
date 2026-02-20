"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Code2, Menu, X } from "lucide-react";

const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Chat", href: "#ai-chat" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [active, setActive] = useState("Home");
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleNav = (href: string, label: string) => {
        setActive(label);
        setMobileOpen(false);
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            {/* ── Floating Pill Navbar ── */}
            <motion.div
                initial={{ y: -60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                style={{
                    position: "fixed",
                    top: 20,
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 9000,
                    width: "calc(100% - 3rem)",
                    maxWidth: 820,
                }}
            >
                <div
                    style={{
                        background: scrolled ? "rgba(8,9,26,0.92)" : "rgba(8,9,26,0.7)",
                        backdropFilter: "blur(24px)",
                        WebkitBackdropFilter: "blur(24px)",
                        border: "1px solid rgba(99,120,255,0.15)",
                        borderRadius: 99,
                        padding: "0.55rem 0.55rem 0.55rem 1.25rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        boxShadow: scrolled
                            ? "0 4px 30px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,120,255,0.08)"
                            : "0 4px 20px rgba(0,0,0,0.3)",
                        transition: "background 0.4s, box-shadow 0.4s",
                    }}
                >
                    {/* Logo */}
                    <button
                        onClick={() => handleNav("#hero", "Home")}
                        style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}
                    >
                        <div
                            style={{
                                width: 30,
                                height: 30,
                                borderRadius: "50%",
                                background: "linear-gradient(135deg, #6378ff, #a855f7)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: "0 0 12px rgba(99,120,255,0.4)",
                            }}
                        >
                            <Code2 size={15} color="white" />
                        </div>
                        <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "0.875rem", color: "var(--color-text)" }}>
                            Anil<span style={{ color: "var(--color-primary)" }}>.dev</span>
                        </span>
                    </button>

                    {/* Desktop Nav Links */}
                    <LayoutGroup>
                        <nav
                            className="hidden md:flex"
                            style={{ display: "flex", alignItems: "center", gap: "0.15rem" }}
                        >
                            {navLinks.map((link) => (
                                <button
                                    key={link.label}
                                    onClick={() => handleNav(link.href, link.label)}
                                    style={{
                                        position: "relative",
                                        background: "none",
                                        border: "none",
                                        cursor: "pointer",
                                        padding: "0.4rem 0.85rem",
                                        borderRadius: 99,
                                        fontSize: "0.82rem",
                                        fontWeight: 500,
                                        color: active === link.label ? "white" : "var(--color-text-muted)",
                                        transition: "color 0.2s",
                                        fontFamily: "var(--font-sans)",
                                    }}
                                >
                                    {active === link.label && (
                                        <motion.div
                                            layoutId="nav-pill"
                                            style={{
                                                position: "absolute",
                                                inset: 0,
                                                borderRadius: 99,
                                                background: "linear-gradient(135deg, #6378ff, #a855f7)",
                                                zIndex: -1,
                                            }}
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                    {link.label}
                                </button>
                            ))}
                        </nav>
                    </LayoutGroup>

                    {/* Right side */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
                        {/* Hire Me pill button */}
                        <button
                            onClick={() => handleNav("#contact", "Contact")}
                            className="btn-primary hidden md:inline-flex"
                            style={{ padding: "0.45rem 1.1rem", fontSize: "0.8rem", borderRadius: 99 }}
                        >
                            Hire Me
                        </button>
                        {/* Mobile toggle */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden"
                            style={{
                                background: "rgba(99,120,255,0.1)",
                                border: "1px solid rgba(99,120,255,0.2)",
                                borderRadius: "50%",
                                width: 34,
                                height: 34,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "var(--color-text)",
                                cursor: "pointer",
                            }}
                        >
                            {mobileOpen ? <X size={17} /> : <Menu size={17} />}
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileOpen(false)}
                            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 8990, backdropFilter: "blur(4px)" }}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                            style={{
                                position: "fixed",
                                top: 80,
                                left: "1.5rem",
                                right: "1.5rem",
                                background: "rgba(10,13,28,0.97)",
                                backdropFilter: "blur(24px)",
                                border: "1px solid rgba(99,120,255,0.15)",
                                borderRadius: 20,
                                zIndex: 8999,
                                padding: "1.25rem",
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.25rem",
                                boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                            }}
                        >
                            {navLinks.map((link, i) => (
                                <motion.button
                                    key={link.label}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    onClick={() => handleNav(link.href, link.label)}
                                    style={{
                                        background: active === link.label ? "rgba(99,120,255,0.12)" : "none",
                                        border: "none",
                                        borderRadius: 10,
                                        cursor: "pointer",
                                        textAlign: "left",
                                        fontSize: "0.95rem",
                                        fontWeight: 600,
                                        color: active === link.label ? "var(--color-primary)" : "var(--color-text-muted)",
                                        padding: "0.7rem 1rem",
                                        transition: "all 0.2s",
                                        width: "100%",
                                    }}
                                >
                                    {link.label}
                                </motion.button>
                            ))}
                            <div style={{ marginTop: "0.5rem", paddingTop: "0.75rem", borderTop: "1px solid var(--color-border)" }}>
                                <button
                                    onClick={() => handleNav("#contact", "Contact")}
                                    className="btn-primary"
                                    style={{ width: "100%", justifyContent: "center", borderRadius: 10 }}
                                >
                                    Hire Me
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
