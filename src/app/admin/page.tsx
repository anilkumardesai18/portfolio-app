"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Save, Trash2, Plus, X, ArrowLeft, Eye, EyeOff, CheckCircle } from "lucide-react";
import {
    Project,
    loadProjects,
    saveProjects,
    defaultProjects,
    STORAGE_KEY,
} from "@/components/sections/ProjectsSection";

const ADMIN_KEY = process.env.NEXT_PUBLIC_ADMIN_KEY ?? "";
const SESSION_KEY = "admin_unlocked";

const COLORS = [
    "#6378ff", "#a855f7", "#22d3ee", "#f59e0b",
    "#ec4899", "#22c55e", "#f97316", "#e11d48",
];

function colorToGradient(color: string) {
    const pairs: Record<string, string> = {
        "#6378ff": "linear-gradient(135deg, #6378ff22, #a855f722)",
        "#a855f7": "linear-gradient(135deg, #a855f722, #ec489922)",
        "#22d3ee": "linear-gradient(135deg, #22d3ee22, #6378ff22)",
        "#f59e0b": "linear-gradient(135deg, #f59e0b22, #ec489922)",
        "#ec4899": "linear-gradient(135deg, #ec489922, #a855f722)",
        "#22c55e": "linear-gradient(135deg, #22c55e22, #22d3ee22)",
        "#f97316": "linear-gradient(135deg, #f9731622, #f59e0b22)",
        "#e11d48": "linear-gradient(135deg, #e11d4822, #ec489922)",
    };
    return pairs[color] ?? `linear-gradient(135deg, ${color}22, ${color}44)`;
}

// ── Login Screen ─────────────────────────────────────────────────────────────
function LoginScreen({ onUnlock }: { onUnlock: () => void }) {
    const [key, setKey] = useState("");
    const [error, setError] = useState("");
    const [showKey, setShowKey] = useState(false);
    const [shaking, setShaking] = useState(false);

    const attempt = () => {
        if (key === ADMIN_KEY) {
            sessionStorage.setItem(SESSION_KEY, "1");
            onUnlock();
        } else {
            setError("Incorrect key. Access denied.");
            setShaking(true);
            setTimeout(() => setShaking(false), 500);
        }
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "var(--color-bg)",
                padding: "2rem",
            }}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{ width: "100%", maxWidth: 420 }}
            >
                {/* Back */}
                <a
                    href="/"
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.4rem",
                        color: "var(--color-text-muted)",
                        textDecoration: "none",
                        fontSize: "0.85rem",
                        marginBottom: "2rem",
                        transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--color-text)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--color-text-muted)")}
                >
                    <ArrowLeft size={14} /> Back to Portfolio
                </a>

                <motion.div
                    animate={shaking ? { x: [-8, 8, -6, 6, -4, 4, 0] } : {}}
                    transition={{ duration: 0.4 }}
                    className="glass-card"
                    style={{ padding: "2.5rem" }}
                >
                    {/* Icon */}
                    <div
                        style={{
                            width: 56,
                            height: 56,
                            borderRadius: 14,
                            background: "rgba(99,120,255,0.12)",
                            border: "1px solid rgba(99,120,255,0.25)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "0 auto 1.5rem",
                            color: "var(--color-primary)",
                        }}
                    >
                        <Lock size={24} />
                    </div>

                    <h1 style={{ textAlign: "center", fontWeight: 800, fontSize: "1.5rem", marginBottom: "0.4rem" }}>
                        Admin Panel
                    </h1>
                    <p style={{ textAlign: "center", color: "var(--color-text-muted)", fontSize: "0.875rem", marginBottom: "2rem" }}>
                        Enter your secret key to manage projects
                    </p>

                    {/* Input */}
                    <div style={{ position: "relative", marginBottom: "1rem" }}>
                        <input
                            type={showKey ? "text" : "password"}
                            placeholder="Secret key"
                            value={key}
                            onChange={(e) => { setKey(e.target.value); setError(""); }}
                            onKeyDown={(e) => e.key === "Enter" && attempt()}
                            style={{
                                width: "100%",
                                padding: "0.875rem 3rem 0.875rem 1rem",
                                background: "rgba(255,255,255,0.04)",
                                border: `1px solid ${error ? "#ef4444" : "rgba(99,120,255,0.2)"}`,
                                borderRadius: 10,
                                color: "var(--color-text)",
                                fontSize: "1rem",
                                outline: "none",
                                boxSizing: "border-box",
                                fontFamily: "var(--font-mono)",
                                letterSpacing: "0.1em",
                                transition: "border-color 0.2s",
                            }}
                        />
                        <button
                            onClick={() => setShowKey(!showKey)}
                            style={{
                                position: "absolute",
                                right: "0.875rem",
                                top: "50%",
                                transform: "translateY(-50%)",
                                background: "none",
                                border: "none",
                                color: "var(--color-text-muted)",
                                cursor: "pointer",
                                display: "flex",
                                padding: 0,
                            }}
                        >
                            {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    {error && (
                        <p style={{ color: "#ef4444", fontSize: "0.8rem", marginBottom: "1rem", textAlign: "center" }}>
                            {error}
                        </p>
                    )}

                    <button
                        className="btn-primary"
                        style={{ width: "100%", justifyContent: "center" }}
                        onClick={attempt}
                    >
                        <Lock size={16} />
                        Unlock
                    </button>
                </motion.div>
            </motion.div>
        </div>
    );
}

// ── Project Editor Card ───────────────────────────────────────────────────────
function ProjectEditor({
    project,
    index,
    onChange,
    onDelete,
}: {
    project: Project;
    index: number;
    onChange: (updated: Project) => void;
    onDelete: () => void;
}) {
    const [tagsInput, setTagsInput] = useState(project.tags.join(", "));
    const [saved, setSaved] = useState(false);
    const [local, setLocal] = useState<Project>(project);

    const update = (field: keyof Project, value: string | boolean | string[]) => {
        setLocal((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        const updated: Project = {
            ...local,
            tags: tagsInput.split(",").map((t) => t.trim()).filter(Boolean),
            gradient: colorToGradient(local.color),
            comingSoon: !local.title.trim(),
        };
        onChange(updated);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const inputStyle: React.CSSProperties = {
        width: "100%",
        padding: "0.6rem 0.875rem",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(99,120,255,0.15)",
        borderRadius: 8,
        color: "var(--color-text)",
        fontSize: "0.875rem",
        outline: "none",
        boxSizing: "border-box",
        transition: "border-color 0.2s",
        fontFamily: "inherit",
    };

    const labelStyle: React.CSSProperties = {
        fontSize: "0.7rem",
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "var(--color-text-muted)",
        marginBottom: "0.35rem",
        display: "block",
    };

    return (
        <div
            className="glass-card"
            style={{
                padding: "1.5rem",
                borderColor: local.comingSoon ? "rgba(99,120,255,0.08)" : `${local.color}30`,
                position: "relative",
            }}
        >
            {/* Slot badge */}
            <div
                style={{
                    position: "absolute",
                    top: "1rem",
                    right: "1rem",
                    fontSize: "0.65rem",
                    fontFamily: "var(--font-mono)",
                    color: "var(--color-text-subtle)",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 6,
                    padding: "0.15rem 0.5rem",
                }}
            >
                Slot {index + 1}
            </div>

            {/* Color dot */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: local.color }} />
                <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--color-text-muted)" }}>
                    {local.comingSoon ? "Slot Available" : local.title || "Untitled"}
                </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                {/* Title */}
                <div>
                    <label style={labelStyle}>Title</label>
                    <input
                        style={inputStyle}
                        placeholder="Project Title"
                        value={local.title}
                        onChange={(e) => update("title", e.target.value)}
                        onFocus={(e) => (e.target.style.borderColor = "rgba(99,120,255,0.4)")}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(99,120,255,0.15)")}
                    />
                </div>

                {/* Description */}
                <div>
                    <label style={labelStyle}>Description</label>
                    <textarea
                        style={{ ...inputStyle, minHeight: 80, resize: "vertical", lineHeight: 1.6 }}
                        placeholder="What does this project do?"
                        value={local.description}
                        onChange={(e) => update("description", e.target.value)}
                        onFocus={(e) => (e.target.style.borderColor = "rgba(99,120,255,0.4)")}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(99,120,255,0.15)")}
                    />
                </div>

                {/* Tags */}
                <div>
                    <label style={labelStyle}>Tags (comma-separated)</label>
                    <input
                        style={inputStyle}
                        placeholder="Python, Gen AI, Next.js"
                        value={tagsInput}
                        onChange={(e) => setTagsInput(e.target.value)}
                        onFocus={(e) => (e.target.style.borderColor = "rgba(99,120,255,0.4)")}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(99,120,255,0.15)")}
                    />
                </div>

                {/* URLs */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                    <div>
                        <label style={labelStyle}>GitHub URL</label>
                        <input
                            style={inputStyle}
                            placeholder="https://github.com/..."
                            value={local.githubUrl === "#" ? "" : local.githubUrl}
                            onChange={(e) => update("githubUrl", e.target.value || "#")}
                            onFocus={(e) => (e.target.style.borderColor = "rgba(99,120,255,0.4)")}
                            onBlur={(e) => (e.target.style.borderColor = "rgba(99,120,255,0.15)")}
                        />
                    </div>
                    <div>
                        <label style={labelStyle}>Demo URL</label>
                        <input
                            style={inputStyle}
                            placeholder="https://demo.example.com"
                            value={local.demoUrl === "#" ? "" : local.demoUrl}
                            onChange={(e) => update("demoUrl", e.target.value || "#")}
                            onFocus={(e) => (e.target.style.borderColor = "rgba(99,120,255,0.4)")}
                            onBlur={(e) => (e.target.style.borderColor = "rgba(99,120,255,0.15)")}
                        />
                    </div>
                </div>

                {/* Color picker */}
                <div>
                    <label style={labelStyle}>Color Theme</label>
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                        {COLORS.map((c) => (
                            <button
                                key={c}
                                onClick={() => update("color", c)}
                                title={c}
                                style={{
                                    width: 26,
                                    height: 26,
                                    borderRadius: "50%",
                                    background: c,
                                    border: `2px solid ${local.color === c ? "white" : "transparent"}`,
                                    cursor: "pointer",
                                    boxShadow: local.color === c ? `0 0 8px ${c}` : "none",
                                    transition: "all 0.2s",
                                    flexShrink: 0,
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Actions */}
                <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.25rem" }}>
                    <button
                        className="btn-primary"
                        style={{ flex: 1, justifyContent: "center", fontSize: "0.85rem", padding: "0.6rem 1rem" }}
                        onClick={handleSave}
                    >
                        {saved ? <CheckCircle size={15} /> : <Save size={15} />}
                        {saved ? "Saved!" : "Save"}
                    </button>
                    <button
                        onClick={onDelete}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.4rem",
                            padding: "0.6rem 1rem",
                            background: "rgba(239,68,68,0.08)",
                            border: "1px solid rgba(239,68,68,0.2)",
                            borderRadius: 10,
                            color: "#ef4444",
                            cursor: "pointer",
                            fontSize: "0.85rem",
                            fontWeight: 600,
                            transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.15)";
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.08)";
                        }}
                    >
                        <Trash2 size={15} />
                        Clear
                    </button>
                </div>
            </div>
        </div>
    );
}

// ── Main Admin Page ───────────────────────────────────────────────────────────
export default function AdminPage() {
    const [unlocked, setUnlocked] = useState(false);
    const [projects, setProjects] = useState<Project[]>([]);
    const [globalSaved, setGlobalSaved] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (sessionStorage.getItem(SESSION_KEY) === "1") {
            setUnlocked(true);
        }
        setProjects(loadProjects());
    }, []);

    if (!mounted) return null;
    if (!unlocked) return <LoginScreen onUnlock={() => { setUnlocked(true); setProjects(loadProjects()); }} />;

    const handleChange = (index: number, updated: Project) => {
        setProjects((prev) => {
            const next = [...prev];
            next[index] = updated;
            return next;
        });
    };

    const handleDelete = (index: number) => {
        setProjects((prev) => {
            const next = [...prev];
            const slot = next[index];
            next[index] = {
                ...defaultProjects[index] ?? slot,
                id: slot.id,
                title: "",
                description: "",
                tags: [],
                githubUrl: "#",
                demoUrl: "#",
                comingSoon: true,
                color: slot.color,
                gradient: slot.gradient,
            };
            return next;
        });
    };

    const handleSaveAll = () => {
        saveProjects(projects);
        // Trigger storage event for main page
        window.dispatchEvent(new Event("storage"));
        setGlobalSaved(true);
        setTimeout(() => setGlobalSaved(false), 2500);
    };

    const handleLogout = () => {
        sessionStorage.removeItem(SESSION_KEY);
        setUnlocked(false);
    };

    const liveCount = projects.filter((p) => !p.comingSoon).length;

    return (
        <div style={{ minHeight: "100vh", background: "var(--color-bg)", padding: "2rem clamp(1rem, 4vw, 3rem)" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                {/* Header */}
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem", marginBottom: "2.5rem" }}>
                    <div>
                        <a
                            href="/"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "0.4rem",
                                color: "var(--color-text-muted)",
                                textDecoration: "none",
                                fontSize: "0.85rem",
                                marginBottom: "0.75rem",
                                transition: "color 0.2s",
                            }}
                            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--color-text)")}
                            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--color-text-muted)")}
                        >
                            <ArrowLeft size={14} /> Back to Portfolio
                        </a>
                        <h1 style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 800, letterSpacing: "-0.02em" }}>
                            Project{" "}
                            <span
                                style={{
                                    background: "linear-gradient(135deg, #6378ff, #a855f7)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}
                            >
                                Manager
                            </span>
                        </h1>
                        <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem", marginTop: "0.25rem" }}>
                            {liveCount} / {projects.length} slots active
                        </p>
                    </div>

                    <div style={{ display: "flex", gap: "0.75rem" }}>
                        <motion.button
                            key={globalSaved ? "saved" : "save"}
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            className="btn-primary"
                            onClick={handleSaveAll}
                            style={{ gap: "0.5rem" }}
                        >
                            {globalSaved ? <CheckCircle size={16} /> : <Save size={16} />}
                            {globalSaved ? "All Saved!" : "Save All"}
                        </motion.button>
                        <button
                            onClick={handleLogout}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                padding: "0.6rem 1.2rem",
                                background: "rgba(255,255,255,0.04)",
                                border: "1px solid rgba(255,255,255,0.08)",
                                borderRadius: 10,
                                color: "var(--color-text-muted)",
                                cursor: "pointer",
                                fontSize: "0.875rem",
                                fontWeight: 600,
                                transition: "all 0.2s",
                            }}
                            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--color-text)")}
                            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--color-text-muted)")}
                        >
                            <X size={15} />
                            Lock
                        </button>
                    </div>
                </div>

                {/* Info Banner */}
                <div
                    style={{
                        padding: "1rem 1.5rem",
                        background: "rgba(99,120,255,0.06)",
                        border: "1px solid rgba(99,120,255,0.15)",
                        borderRadius: 12,
                        marginBottom: "2rem",
                        fontSize: "0.875rem",
                        color: "var(--color-text-muted)",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                    }}
                >
                    <Plus size={16} style={{ color: "var(--color-primary)", flexShrink: 0 }} />
                    Edit any slot below, then click <strong style={{ color: "var(--color-text)" }}>&ldquo;Save&rdquo;</strong> per card or{" "}
                    <strong style={{ color: "var(--color-text)" }}>&ldquo;Save All&rdquo;</strong> to persist all changes to your portfolio. Clearing a slot resets it to &ldquo;Coming Soon&rdquo;.
                </div>

                {/* Project Grid */}
                <AnimatePresence>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                            gap: "1.5rem",
                        }}
                    >
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                            >
                                <ProjectEditor
                                    project={project}
                                    index={index}
                                    onChange={(updated) => handleChange(index, updated)}
                                    onDelete={() => handleDelete(index)}
                                />
                            </motion.div>
                        ))}
                    </div>
                </AnimatePresence>

                {/* Footer note */}
                <p style={{ textAlign: "center", color: "var(--color-text-subtle)", fontSize: "0.75rem", marginTop: "3rem", fontFamily: "var(--font-mono)" }}>
                    Changes saved to browser localStorage · Visit <a href="/" style={{ color: "var(--color-primary)", textDecoration: "none" }}>portfolio</a> to see updates
                </p>
            </div>
        </div>
    );
}
