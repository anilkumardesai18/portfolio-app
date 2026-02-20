"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Bot, Send, Sparkles, User } from "lucide-react";

type Message = {
    id: number;
    role: "user" | "ai";
    text: string;
};

const suggestions = [
    "What are your top skills?",
    "Tell me about your projects",
    "Are you available for work?",
    "What certifications do you have?",
    "How can I contact Anil?",
];

function getBotReply(text: string): string {
    const q = text.toLowerCase();

    if (q.includes("skill") || q.includes("stack") || q.includes("tech") || q.includes("language"))
        return "🚀 Anil specializes in Python, SQL, Gen AI (Google AI API), Prompt Engineering, OpenCV for computer vision, and IoT with Raspberry Pi. He also builds full-stack web apps with Next.js and React.";

    if (q.includes("project") || q.includes("built") || q.includes("build"))
        return "⚡ Anil has built 3 projects: a Smart Object Awareness device (Raspberry Pi + OpenCV) for visually impaired users, an AI Prompt Analyzer (Google AI API + Node.js), and ADmyBRAND Insights — a full-stack analytics dashboard with Next.js and TypeScript.";

    if (q.includes("available") || q.includes("hire") || q.includes("job") || q.includes("opportunit") || q.includes("freelance") || q.includes("intern"))
        return "✅ Yes! Anil is a final-year CSE student (graduating 2026) and is open to internships, freelance work, and full-time opportunities. Feel free to reach out!";

    if (q.includes("contact") || q.includes("email") || q.includes("reach") || q.includes("phone") || q.includes("call"))
        return "📧 You can reach Anil at anilkumardesai18@gmail.com or call +91 9108124418. He's based in Nagadevanahalli, Bengaluru, India.";

    if (q.includes("education") || q.includes("college") || q.includes("degree") || q.includes("university") || q.includes("cgpa"))
        return "🎓 Anil is pursuing B.E in Computer Science at Don Bosco Institute, Bengaluru (CGPA 7.6, graduating 2026). He's also a Sainik School Kodagu alumnus with NCC A, B & C certificates.";

    if (q.includes("certif") || q.includes("training") || q.includes("course") || q.includes("deloitte") || q.includes("apna"))
        return "📋 Anil holds certifications in AI/ML (Apna College), Data Analytics — SQL, Excel, Python (Tutedude), AI Essentials & Prompt Engineering, Android Development (MindMatrix), and a Deloitte Australia Data Analytics Virtual Experience Certificate.";

    if (q.includes("ncc") || q.includes("leadership") || q.includes("sainik"))
        return "🎖️ Anil holds NCC A, B & C certificates from Sainik School Kodagu. He's a disciplined leader with strong team management and adaptability skills developed through his NCC training.";

    if (q.includes("location") || q.includes("where") || q.includes("bengaluru") || q.includes("bangalore"))
        return "📍 Anil is based in Nagadevanahalli, Bengaluru (560056), Karnataka, India. He is open to remote opportunities as well.";

    if (q.includes("hello") || q.includes("hi") || q.includes("hey") || q.includes("good"))
        return "👋 Hello! I'm Anil's portfolio assistant. I can tell you about his skills, projects, certifications, education, or how to contact him. What would you like to know?";

    return "🤖 Great question! I can tell you about Anil's skills, projects, certifications, education, location, or availability. Try one of the suggested questions above, or ask me anything!";
}

export default function AIChatSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 0,
            role: "ai",
            text: "👋 Hi! I'm Anil's portfolio assistant. Ask me anything about his skills, projects, certifications, or availability!",
        },
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const sendMessage = (text: string) => {
        if (!text.trim() || isTyping) return;

        const userMsg: Message = { id: Date.now(), role: "user", text };
        setMessages((m) => [...m, userMsg]);
        setInput("");
        setIsTyping(true);

        setTimeout(() => {
            const reply = getBotReply(text);
            setMessages((m) => [...m, { id: Date.now() + 1, role: "ai", text: reply }]);
            setIsTyping(false);
            setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
        }, 700 + Math.random() * 500);
    };

    return (
        <section
            id="ai-chat"
            ref={ref}
            style={{
                padding: "var(--section-padding) clamp(1.5rem, 5vw, 4rem)",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(99,120,255,0.07) 0%, transparent 70%)",
                    pointerEvents: "none",
                }}
            />

            <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1 }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: "center", marginBottom: "3rem" }}
                >
                    <div className="section-label" style={{ justifyContent: "center" }}>
                        <Sparkles size={12} />
                        <span>05 • AI Feature</span>
                    </div>
                    <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, marginBottom: "0.75rem", letterSpacing: "-0.02em" }}>
                        Chat with My{" "}
                        <span className="text-gradient-cool">AI Assistant</span>
                    </h2>
                    <p style={{ color: "var(--color-text-muted)", maxWidth: 480, margin: "0 auto" }}>
                        Ask anything about my skills, experience, or availability.
                    </p>
                </motion.div>

                {/* Chat Window */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="glass"
                    style={{ borderRadius: 20, overflow: "hidden", border: "1px solid rgba(99,120,255,0.2)", boxShadow: "0 0 60px rgba(99,120,255,0.08)" }}
                >
                    {/* Header */}
                    <div style={{ padding: "1rem 1.5rem", borderBottom: "1px solid rgba(99,120,255,0.1)", display: "flex", alignItems: "center", gap: "0.75rem", background: "rgba(99,120,255,0.05)" }}>
                        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #6378ff, #a855f7)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 12px rgba(99,120,255,0.4)" }}>
                            <Bot size={18} color="white" />
                        </div>
                        <div>
                            <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>Portfolio Assistant</div>
                            <div style={{ fontSize: "0.7rem", color: "#22c55e", fontFamily: "var(--font-mono)", display: "flex", alignItems: "center", gap: "0.35rem" }}>
                                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
                                Online • Always available
                            </div>
                        </div>
                    </div>

                    {/* Messages */}
                    <div style={{ height: 380, overflowY: "auto", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                        <AnimatePresence initial={false}>
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    style={{ display: "flex", gap: "0.75rem", justifyContent: msg.role === "user" ? "flex-end" : "flex-start", alignItems: "flex-end" }}
                                >
                                    {msg.role === "ai" && (
                                        <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, #6378ff, #a855f7)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                            <Bot size={14} color="white" />
                                        </div>
                                    )}
                                    <div className={msg.role === "user" ? "chat-bubble-user" : "chat-bubble-ai"} style={{ lineHeight: 1.6 }}>
                                        {msg.text}
                                    </div>
                                    {msg.role === "user" && (
                                        <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(99,120,255,0.2)", border: "1px solid rgba(99,120,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                            <User size={14} color="var(--color-primary)" />
                                        </div>
                                    )}
                                </motion.div>
                            ))}

                            {isTyping && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-end" }}>
                                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, #6378ff, #a855f7)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <Bot size={14} color="white" />
                                    </div>
                                    <div className="chat-bubble-ai" style={{ display: "flex", gap: "4px", alignItems: "center", padding: "0.75rem 1rem" }}>
                                        {[0, 1, 2].map((i) => (
                                            <motion.span key={i} animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                                                style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--color-primary)", display: "inline-block" }}
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Suggestions */}
                    <div style={{ padding: "0.75rem 1.5rem", borderTop: "1px solid rgba(99,120,255,0.08)", display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                        {suggestions.map((s) => (
                            <button
                                key={s}
                                onClick={() => sendMessage(s)}
                                style={{ padding: "0.3rem 0.85rem", background: "rgba(99,120,255,0.08)", border: "1px solid rgba(99,120,255,0.2)", borderRadius: 99, fontSize: "0.75rem", color: "var(--color-text-muted)", cursor: "pointer", transition: "all 0.2s" }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(99,120,255,0.18)"; e.currentTarget.style.color = "var(--color-primary)"; e.currentTarget.style.borderColor = "rgba(99,120,255,0.4)"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(99,120,255,0.08)"; e.currentTarget.style.color = "var(--color-text-muted)"; e.currentTarget.style.borderColor = "rgba(99,120,255,0.2)"; }}
                            >
                                {s}
                            </button>
                        ))}
                    </div>

                    {/* Input */}
                    <div style={{ padding: "1rem 1.5rem", borderTop: "1px solid rgba(99,120,255,0.1)", display: "flex", gap: "0.75rem" }}>
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                            placeholder="Ask me anything about Anil..."
                            style={{ flex: 1, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(99,120,255,0.15)", borderRadius: 10, padding: "0.75rem 1rem", color: "var(--color-text)", fontSize: "0.875rem", outline: "none", transition: "border-color 0.2s", fontFamily: "var(--font-sans)" }}
                            onFocus={(e) => (e.target.style.borderColor = "rgba(99,120,255,0.5)")}
                            onBlur={(e) => (e.target.style.borderColor = "rgba(99,120,255,0.15)")}
                        />
                        <button
                            onClick={() => sendMessage(input)}
                            disabled={!input.trim() || isTyping}
                            style={{ width: 44, height: 44, borderRadius: 10, background: input.trim() ? "linear-gradient(135deg, #6378ff, #a855f7)" : "rgba(255,255,255,0.05)", border: "none", cursor: input.trim() ? "pointer" : "default", color: "white", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s", boxShadow: input.trim() ? "0 0 20px rgba(99,120,255,0.3)" : "none", flexShrink: 0 }}
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
