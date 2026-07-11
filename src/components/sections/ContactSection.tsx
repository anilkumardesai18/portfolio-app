"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, MapPin, Phone, Send, Github, Linkedin } from "lucide-react";

const contactInfo = [
    { Icon: Mail, label: "Email", value: "anilkumardesai18@gmail.com", href: "mailto:anilkumardesai18@gmail.com" },
    { Icon: Phone, label: "Phone", value: "+91 91081 24418", href: "tel:+919108124418" },
    { Icon: MapPin, label: "Location", value: "Nagadevanahalli, Bengaluru 560056", href: "https://maps.google.com/?q=Nagadevanahalli+Bengaluru" },
];

const socials = [
    { Icon: Github, href: "https://github.com/anilkumardesai18", label: "GitHub" },
    { Icon: Linkedin, href: "https://www.linkedin.com/in/anil-kumar-desai-b3818b32b", label: "LinkedIn" },
];

export default function ContactSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [submitted, setSubmitted] = useState(false);

    const inputStyle: React.CSSProperties = {
        width: "100%",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        padding: "1rem",
        color: "var(--text)",
        fontSize: "0.9rem",
        outline: "none",
        fontFamily: "var(--font-body)",
        transition: "box-shadow 0.2s",
    };

    return (
        <section id="contact" className="section" style={{ background: "var(--surface)" }} ref={ref}>
            <div className="section-num">06</div>

            <div className="container" style={{ position: "relative", zIndex: 1 }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    style={{ marginBottom: "4rem" }}
                >
                    <div className="label-tag">Contact</div>
                    <h2 className="display" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", marginBottom: "0.75rem", textTransform: "uppercase" }}>
                        Let&apos;s Build <span style={{ color: "var(--red)" }}>Together</span>
                    </h2>
                    <p style={{ color: "var(--muted)", maxWidth: 500, lineHeight: 1.7, fontWeight: 500 }}>
                        Whether you have a project idea, a job opportunity, or just want to say hi — I&apos;m always open.
                    </p>
                </motion.div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "4rem",
                        alignItems: "start",
                    }}
                >
                    {/* Left — contact info */}
                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as const }}
                    >
                        <div style={{ display: "flex", flexDirection: "column", gap: "2rem", marginBottom: "3.5rem" }}>
                            {contactInfo.map(({ Icon, label, value, href }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target={label === "Location" ? "_blank" : undefined}
                                    rel="noopener noreferrer"
                                    style={{
                                        display: "flex", alignItems: "center", gap: "1.25rem",
                                        color: "var(--text)", textDecoration: "none",
                                        transition: "transform 0.2s",
                                    }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget.querySelector('.icon-box') as HTMLElement).style.background = 'var(--red)';
                                        (e.currentTarget.querySelector('.icon-box') as HTMLElement).style.color = 'var(--surface)';
                                        e.currentTarget.style.transform = 'translateX(4px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget.querySelector('.icon-box') as HTMLElement).style.background = 'var(--surface)';
                                        (e.currentTarget.querySelector('.icon-box') as HTMLElement).style.color = 'var(--red)';
                                        e.currentTarget.style.transform = 'translateX(0)';
                                    }}
                                >
                                    <div className="icon-box" style={{ width: 48, height: 48 }}>
                                        <Icon size={20} />
                                    </div>
                                    <div>
                                        <div className="font-mono" style={{ fontSize: "0.75rem", color: "var(--red)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.1rem" }}>
                                            {label}
                                        </div>
                                        <div className="font-display" style={{ fontWeight: 700, fontSize: "1.1rem" }}>
                                            {value}
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>

                        <div style={{ height: 2, background: "var(--border)", marginBottom: "2.5rem" }} />

                        <div>
                            <div className="font-mono" style={{ fontSize: "0.75rem", color: "var(--red)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.25rem" }}>
                                Connect with me
                            </div>
                            <div style={{ display: "flex", gap: "1rem" }}>
                                {socials.map(({ Icon, href, label }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                        className="btn-outline"
                                        style={{
                                            display: "flex", alignItems: "center", gap: "0.5rem",
                                            padding: "0.75rem 1.25rem",
                                            border: "1px solid var(--border)",
                                            textDecoration: "none",
                                            fontSize: "0.85rem",
                                            fontWeight: 700,
                                            textTransform: "uppercase",
                                            transition: "all 0.2s",
                                        }}
                                    >
                                        <Icon size={16} />
                                        {label}
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div
                            style={{
                                marginTop: "3.5rem",
                                padding: "1.5rem",
                                border: "1px solid var(--border)",
                                borderLeft: "6px solid var(--red)",
                                background: "var(--bg)",
                            }}
                        >
                            <div className="font-mono" style={{ fontSize: "0.85rem", color: "var(--red)", fontWeight: 700, textTransform: "uppercase", marginBottom: "0.5rem" }}>
                                [ AVAILABLE ]
                            </div>
                            <p style={{ fontSize: "0.95rem", color: "var(--text)", lineHeight: 1.6, fontWeight: 500 }}>
                                Open to internships, freelance work, and full-time roles in AI development, Android/mobile dev, and full-stack web.
                            </p>
                        </div>
                    </motion.div>

                    {/* Right — form */}
                    <motion.div
                        initial={{ opacity: 0, x: 24 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
                    >
                        {submitted ? (
                            <div
                                className="card"
                                style={{ padding: "4rem 3rem", textAlign: "center", background: "var(--bg)" }}
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", bounce: 0.5 }}
                                    style={{
                                        width: 64, height: 64,
                                        border: "2px solid var(--border)",
                                        background: "var(--red)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        margin: "0 auto 2rem",
                                    }}
                                >
                                    <Send size={24} color="var(--surface)" />
                                </motion.div>
                                <h3 className="display" style={{ fontSize: "1.8rem", marginBottom: "1rem", textTransform: "uppercase" }}>
                                    Message Sent
                                </h3>
                                <p style={{ color: "var(--muted)", fontSize: "1.05rem", lineHeight: 1.7, fontWeight: 500 }}>
                                    Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                                </p>
                            </div>
                        ) : (
                            <form
                                onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                                className="card"
                                style={{ padding: "2.5rem", display: "flex", flexDirection: "column", gap: "1.5rem", background: "var(--bg)" }}
                            >
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                                    <div>
                                        <label style={{ display: "block", fontSize: "0.8rem", color: "var(--red)", marginBottom: "0.5rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                                            Name
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            value={form.name}
                                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                                            placeholder="JOHN DOE"
                                            style={inputStyle}
                                            onFocus={(e) => (e.target.style.boxShadow = "2px 2px 0px var(--border)")}
                                            onBlur={(e) => (e.target.style.boxShadow = "none")}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: "block", fontSize: "0.8rem", color: "var(--red)", marginBottom: "0.5rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                                            Email
                                        </label>
                                        <input
                                            required
                                            type="email"
                                            value={form.email}
                                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                                            placeholder="JOHN@EXAMPLE.COM"
                                            style={inputStyle}
                                            onFocus={(e) => (e.target.style.boxShadow = "2px 2px 0px var(--border)")}
                                            onBlur={(e) => (e.target.style.boxShadow = "none")}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label style={{ display: "block", fontSize: "0.8rem", color: "var(--red)", marginBottom: "0.5rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                                        Subject
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        value={form.subject}
                                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                                        placeholder="PROJECT OPPORTUNITY"
                                        style={inputStyle}
                                        onFocus={(e) => (e.target.style.boxShadow = "2px 2px 0px var(--border)")}
                                        onBlur={(e) => (e.target.style.boxShadow = "none")}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: "block", fontSize: "0.8rem", color: "var(--red)", marginBottom: "0.5rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                                        Message
                                    </label>
                                    <textarea
                                        required
                                        rows={5}
                                        value={form.message}
                                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                                        placeholder="HELLO ANIL..."
                                        style={{ ...inputStyle, resize: "vertical" }}
                                        onFocus={(e) => (e.target.style.boxShadow = "2px 2px 0px var(--border)")}
                                        onBlur={(e) => (e.target.style.boxShadow = "none")}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn-primary"
                                    style={{ justifyContent: "center", width: "100%", padding: "1rem", marginTop: "1rem" }}
                                >
                                    <Send size={18} />
                                    SEND MESSAGE
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
