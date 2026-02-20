"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, MapPin, Phone, Send, Github, Linkedin } from "lucide-react";

export default function ContactSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    const inputStyle = {
        width: "100%",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(99,120,255,0.15)",
        borderRadius: 10,
        padding: "0.875rem 1rem",
        color: "var(--color-text)",
        fontSize: "0.9rem",
        outline: "none",
        fontFamily: "var(--font-sans)",
        transition: "border-color 0.2s, box-shadow 0.2s",
    };

    const contactInfo = [
        { Icon: Mail, label: "Email", value: "anilkumardesai18@gmail.com", href: "mailto:anilkumardesai18@gmail.com" },
        { Icon: MapPin, label: "Location", value: "Nagadevanahalli, Bengaluru", href: "https://maps.google.com/?q=Nagadevanahalli+Bengaluru" },
        { Icon: Phone, label: "Phone", value: "+91 91081 24418", href: "tel:+919108124418" },
    ];

    const socials = [
        { Icon: Github, href: "https://github.com/anilkumardesai18", label: "GitHub" },
        { Icon: Linkedin, href: "https://www.linkedin.com/in/anil-kumar-desai-b3818b32b", label: "LinkedIn" },
        { Icon: Mail, href: "mailto:anilkumardesai18@gmail.com", label: "Email" },
    ];

    return (
        <section
            id="contact"
            ref={ref}
            style={{
                padding: "var(--section-padding) clamp(1.5rem, 5vw, 4rem)",
                background: "var(--color-bg-secondary)",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.4, pointerEvents: "none" }} />
            <div
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "60%",
                    height: "50%",
                    background: "radial-gradient(ellipse, rgba(99,120,255,0.08) 0%, transparent 70%)",
                    pointerEvents: "none",
                }}
            />

            <div style={{ maxWidth: 1320, margin: "0 auto", position: "relative", zIndex: 1 }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <div className="section-label">
                        <span>06</span>
                        <span>Contact</span>
                    </div>
                    <h2
                        style={{
                            fontSize: "clamp(2rem, 4vw, 3rem)",
                            fontWeight: 800,
                            marginBottom: "0.75rem",
                            letterSpacing: "-0.02em",
                        }}
                    >
                        Let&apos;s Build Something{" "}
                        <span className="text-gradient">Together</span>
                    </h2>
                    <p style={{ color: "var(--color-text-muted)", marginBottom: "3rem", maxWidth: 520 }}>
                        Whether you have a project idea, a job opportunity, or just want to say hi — my inbox is always open.
                    </p>
                </motion.div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: "3rem",
                        alignItems: "start",
                    }}
                >
                    {/* Left: Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "2.5rem" }}>
                            {contactInfo.map(({ Icon, label, value, href }) => (
                                <a
                                    key={label}
                                    href={href}
                                    style={{ textDecoration: "none" }}
                                >
                                    <div
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
                                                background: "rgba(99,120,255,0.1)",
                                                border: "1px solid rgba(99,120,255,0.2)",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                color: "var(--color-primary)",
                                                flexShrink: 0,
                                            }}
                                        >
                                            <Icon size={18} />
                                        </div>
                                        <div>
                                            <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginBottom: "0.1rem" }}>
                                                {label}
                                            </div>
                                            <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--color-text)" }}>
                                                {value}
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>

                        {/* Social */}
                        <div>
                            <div style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", marginBottom: "1rem", fontFamily: "var(--font-mono)" }}>
                                Follow / Connect
                            </div>
                            <div style={{ display: "flex", gap: "0.75rem" }}>
                                {socials.map(({ Icon, href, label }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                        style={{
                                            width: 44,
                                            height: 44,
                                            borderRadius: 10,
                                            border: "1px solid var(--color-border)",
                                            color: "var(--color-text-muted)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            textDecoration: "none",
                                            transition: "all 0.3s",
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.borderColor = "var(--color-primary)";
                                            e.currentTarget.style.color = "var(--color-primary)";
                                            e.currentTarget.style.background = "rgba(99,120,255,0.08)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.borderColor = "var(--color-border)";
                                            e.currentTarget.style.color = "var(--color-text-muted)";
                                            e.currentTarget.style.background = "transparent";
                                        }}
                                    >
                                        <Icon size={18} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {submitted ? (
                            <div
                                className="glass-card"
                                style={{
                                    padding: "3rem",
                                    textAlign: "center",
                                }}
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", bounce: 0.5 }}
                                    style={{
                                        width: 64,
                                        height: 64,
                                        borderRadius: "50%",
                                        background: "linear-gradient(135deg, #22c55e, #15803d)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        margin: "0 auto 1.5rem",
                                        boxShadow: "0 0 30px rgba(34,197,94,0.3)",
                                    }}
                                >
                                    <Send size={28} color="white" />
                                </motion.div>
                                <h3 style={{ fontWeight: 700, fontSize: "1.3rem", marginBottom: "0.75rem" }}>
                                    Message Sent!
                                </h3>
                                <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem", lineHeight: 1.7 }}>
                                    Thanks for reaching out! I&apos;ll get back to you within 24 hours.
                                </p>
                            </div>
                        ) : (
                            <form
                                onSubmit={handleSubmit}
                                className="glass-card"
                                style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}
                            >
                                <div style={{ display: "flex", gap: "1rem" }}>
                                    <div style={{ flex: 1 }}>
                                        <label style={{ display: "block", fontSize: "0.8rem", color: "var(--color-text-muted)", marginBottom: "0.5rem", fontWeight: 500 }}>
                                            Name
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            value={form.name}
                                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                                            placeholder="John Doe"
                                            style={inputStyle}
                                            onFocus={(e) => { e.target.style.borderColor = "rgba(99,120,255,0.5)"; e.target.style.boxShadow = "0 0 15px rgba(99,120,255,0.1)"; }}
                                            onBlur={(e) => { e.target.style.borderColor = "rgba(99,120,255,0.15)"; e.target.style.boxShadow = "none"; }}
                                        />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <label style={{ display: "block", fontSize: "0.8rem", color: "var(--color-text-muted)", marginBottom: "0.5rem", fontWeight: 500 }}>
                                            Email
                                        </label>
                                        <input
                                            required
                                            type="email"
                                            value={form.email}
                                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                                            placeholder="john@company.com"
                                            style={inputStyle}
                                            onFocus={(e) => { e.target.style.borderColor = "rgba(99,120,255,0.5)"; e.target.style.boxShadow = "0 0 15px rgba(99,120,255,0.1)"; }}
                                            onBlur={(e) => { e.target.style.borderColor = "rgba(99,120,255,0.15)"; e.target.style.boxShadow = "none"; }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label style={{ display: "block", fontSize: "0.8rem", color: "var(--color-text-muted)", marginBottom: "0.5rem", fontWeight: 500 }}>
                                        Subject
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        value={form.subject}
                                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                                        placeholder="Job Opportunity / Project Collaboration"
                                        style={inputStyle}
                                        onFocus={(e) => { e.target.style.borderColor = "rgba(99,120,255,0.5)"; e.target.style.boxShadow = "0 0 15px rgba(99,120,255,0.1)"; }}
                                        onBlur={(e) => { e.target.style.borderColor = "rgba(99,120,255,0.15)"; e.target.style.boxShadow = "none"; }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: "block", fontSize: "0.8rem", color: "var(--color-text-muted)", marginBottom: "0.5rem", fontWeight: 500 }}>
                                        Message
                                    </label>
                                    <textarea
                                        required
                                        rows={5}
                                        value={form.message}
                                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                                        placeholder="Tell me about your project or opportunity..."
                                        style={{ ...inputStyle, resize: "vertical" }}
                                        onFocus={(e) => { e.target.style.borderColor = "rgba(99,120,255,0.5)"; e.target.style.boxShadow = "0 0 15px rgba(99,120,255,0.1)"; }}
                                        onBlur={(e) => { e.target.style.borderColor = "rgba(99,120,255,0.15)"; e.target.style.boxShadow = "none"; }}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn-primary"
                                    style={{ justifyContent: "center", width: "100%", fontSize: "0.95rem" }}
                                >
                                    <Send size={16} />
                                    Send Message
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
