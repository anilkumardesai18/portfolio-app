"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Bot, Send, User } from "lucide-react";

type Message = { id: number; role: "user" | "ai"; text: string };

const suggestions = [
    "What are your top skills?",
    "Tell me about your projects",
    "Do you have internship experience?",
    "What certifications do you have?",
    "How can I contact Anil?",
];

function getBotReply(text: string): string {
    const q = text.toLowerCase();
    if (q.includes("skill") || q.includes("stack") || q.includes("tech") || q.includes("language"))
        return "Anil specializes in Python, Kotlin, JavaScript, SQL, Gen AI (Google AI API), Prompt Engineering, OpenCV, IoT with Raspberry Pi, Firebase, Supabase, Next.js, React, Node.js, React Native, and Jetpack Compose — across web, Android, and IoT domains.";
    if (q.includes("project") || q.includes("built") || q.includes("build"))
        return "Anil has built 5 real projects:\n1. PDT – Personal Digital Twin: AI health & fitness Android app (Freelancing)\n2. Nalla-Nudi: Kannada bridge dictionary for rural students (MindMatrix Internship)\n3. Smart Object Awareness: Raspberry Pi + OpenCV assistive device\n4. AI Prompt Analyzer: Full-stack prompt quality tool with Google AI API\n5. ADmyBRAND Insights: Full-stack analytics dashboard with Next.js + TypeScript";
    if (q.includes("intern") || q.includes("mindmatrix") || q.includes("experience") || q.includes("work"))
        return "Anil interned at MindMatrix as an Android App Development Intern (Generative AI). He built AI-powered Android apps using Kotlin + Jetpack Compose, integrated Generative AI APIs, and managed offline databases. He also freelances in full-stack web development.";
    if (q.includes("available") || q.includes("hire") || q.includes("job") || q.includes("opportunit") || q.includes("freelance"))
        return "Yes! Anil is a final-year CSE student (graduating 2026, CGPA 7.8) and is open to internships, freelance work, and full-time opportunities in AI development, Android/mobile dev, and full-stack web. Feel free to reach out!";
    if (q.includes("contact") || q.includes("email") || q.includes("reach") || q.includes("phone"))
        return "Reach Anil at anilkumardesai18@gmail.com or call +91 9108124418. Based in Nagadevanahalli, Bengaluru. Also on LinkedIn and GitHub @anilkumardesai18.";
    if (q.includes("education") || q.includes("college") || q.includes("degree") || q.includes("cgpa"))
        return "Anil is pursuing B.E in Computer Science at Don Bosco Institute, Bengaluru (CGPA 7.8, graduating 2026). Also a Sainik School Kodagu alumnus with NCC A, B & C certificates.";
    if (q.includes("certif") || q.includes("training") || q.includes("course"))
        return "Certifications:\n• AI/ML Training — Apna College (Ongoing)\n• Data Analytics: SQL, Excel, Python — Tutedude\n• AI Essentials & Prompt Engineering — Google\n• Data Analytics Virtual Experience — Deloitte Australia\n• Android App Development — MindMatrix";
    if (q.includes("kotlin") || q.includes("android") || q.includes("mobile"))
        return "Anil builds native Android apps with Kotlin + Jetpack Compose. Interned at MindMatrix building AI-powered Android apps and built the PDT Health App (freelancing) with wearable integration and Health Connect support.";
    if (q.includes("hello") || q.includes("hi") || q.includes("hey"))
        return "Hello. I am Anil's portfolio assistant. Ask me about his skills, projects (PDT health app, Nalla-Nudi & more!), MindMatrix internship, or availability.";
    return "I can tell you about Anil's skills (Kotlin, Python, Gen AI, Next.js), 5 real projects, internship experience at MindMatrix, certifications, or how to contact him. Try a suggested question.";
}

export default function AIChatSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });
    const [messages, setMessages] = useState<Message[]>([
        { id: 0, role: "ai", text: "Hello. I am Anil's portfolio assistant. Ask me about his skills, projects (PDT health app, Nalla-Nudi & more!), MindMatrix internship, or availability." },
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const endRef = useRef<HTMLDivElement>(null);

    const send = (text: string) => {
        if (!text.trim() || isTyping) return;
        setMessages((m) => [...m, { id: Date.now(), role: "user", text }]);
        setInput("");
        setIsTyping(true);
        setTimeout(() => {
            setMessages((m) => [...m, { id: Date.now() + 1, role: "ai", text: getBotReply(text) }]);
            setIsTyping(false);
            setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
        }, 600 + Math.random() * 300);
    };

    return (
        <section id="ai-chat" className="section section-alt" ref={ref}>
            <div className="section-num">05</div>

            <div className="container" style={{ position: "relative", zIndex: 1 }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    style={{ marginBottom: "3rem", textAlign: "center" }}
                >
                    <div className="label-tag" style={{ margin: "0 auto 1.5rem" }}>
                        AI Feature
                    </div>
                    <h2 className="display" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", marginBottom: "0.75rem", textTransform: "uppercase" }}>
                        Ask the <span style={{ color: "var(--red)" }}>AI Assistant</span>
                    </h2>
                </motion.div>

                {/* Chat window - brutalist */}
                <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    style={{ maxWidth: 820, margin: "0 auto" }}
                >
                    <div
                        className="card"
                        style={{ overflow: "hidden", border: "2px solid var(--border)" }}
                    >
                        {/* Chat header */}
                        <div
                            style={{
                                padding: "1.25rem 1.5rem",
                                borderBottom: "2px solid var(--border)",
                                display: "flex",
                                alignItems: "center",
                                gap: "1rem",
                                background: "var(--bg)",
                            }}
                        >
                            <div
                                style={{
                                    width: 40, height: 40,
                                    border: "1px solid var(--border)",
                                    background: "var(--surface)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                }}
                            >
                                <Bot size={20} color="var(--red)" />
                            </div>
                            <div>
                                <div className="font-display" style={{ fontWeight: 800, fontSize: "1rem", textTransform: "uppercase" }}>Portfolio Assistant</div>
                                <div className="font-mono" style={{ fontSize: "0.75rem", color: "var(--red)", fontWeight: 600 }}>
                                    [ ONLINE ]
                                </div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div style={{ height: 380, overflowY: "auto", padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem", background: "var(--surface)" }}>
                            <AnimatePresence initial={false}>
                                {messages.map((msg) => (
                                    <motion.div
                                        key={msg.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.2 }}
                                        style={{ display: "flex", gap: "1rem", justifyContent: msg.role === "user" ? "flex-end" : "flex-start", alignItems: "flex-start" }}
                                    >
                                        {msg.role === "ai" && (
                                            <div style={{ width: 32, height: 32, border: "1px solid var(--border)", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "0.25rem" }}>
                                                <Bot size={16} color="var(--red)" />
                                            </div>
                                        )}
                                        <div className={msg.role === "user" ? "bubble-user" : "bubble-ai"} style={{ lineHeight: 1.65, whiteSpace: "pre-line", borderRadius: 0 }}>
                                            {msg.text}
                                        </div>
                                        {msg.role === "user" && (
                                            <div style={{ width: 32, height: 32, border: "1px solid var(--surface)", background: "var(--red)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "0.25rem" }}>
                                                <User size={16} color="var(--surface)" />
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                                {isTyping && (
                                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                                        <div style={{ width: 32, height: 32, border: "1px solid var(--border)", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "0.25rem" }}>
                                            <Bot size={16} color="var(--red)" />
                                        </div>
                                        <div className="bubble-ai" style={{ display: "flex", gap: "6px", alignItems: "center", borderRadius: 0, height: "45px" }}>
                                            {[0, 1, 2].map((i) => (
                                                <motion.span key={i} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                                                    style={{ width: 6, height: 6, background: "var(--red)", display: "inline-block" }} />
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <div ref={endRef} />
                        </div>

                        {/* Suggestions */}
                        <div style={{ padding: "1rem 1.5rem", borderTop: "2px solid var(--border)", display: "flex", flexWrap: "wrap", gap: "0.5rem", background: "var(--bg)" }}>
                            {suggestions.map((s) => (
                                <button
                                    key={s}
                                    onClick={() => send(s)}
                                    className="chip"
                                    style={{ cursor: "pointer", borderRadius: 0 }}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>

                        {/* Input */}
                        <div style={{ padding: "1.5rem", borderTop: "2px solid var(--border)", display: "flex", gap: "1rem", background: "var(--surface)" }}>
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && send(input)}
                                placeholder="TYPE MESSAGE..."
                                style={{
                                    flex: 1, background: "var(--bg)", border: "1px solid var(--border)",
                                    padding: "1rem", color: "var(--text)", fontSize: "0.9rem", outline: "none",
                                    fontFamily: "var(--font-mono)", textTransform: "uppercase",
                                    transition: "box-shadow 0.2s"
                                }}
                                onFocus={(e) => (e.target.style.boxShadow = "2px 2px 0px var(--border)")}
                                onBlur={(e) => (e.target.style.boxShadow = "none")}
                            />
                            <button
                                onClick={() => send(input)}
                                disabled={!input.trim() || isTyping}
                                className="btn-primary"
                                style={{ width: 54, height: 54, padding: 0, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, opacity: !input.trim() || isTyping ? 0.5 : 1 }}
                            >
                                <Send size={20} />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
