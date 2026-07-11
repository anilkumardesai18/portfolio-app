"use client";

import { useState } from "react";
import { Palette, X } from "lucide-react";

const accents = [
    { name: "Cyan (Default)", cyan: "#00CFFF", amber: "#FF9F1C" },
    { name: "Emerald", cyan: "#10B981", amber: "#F59E0B" },
    { name: "Violet", cyan: "#8B5CF6", amber: "#EC4899" },
    { name: "Orange", cyan: "#FF6B35", amber: "#FFAA00" },
    { name: "Rose", cyan: "#F43F5E", amber: "#FB923C" },
];

export default function ThemeSwitcher() {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(0);

    const applyAccent = (a: (typeof accents)[0], i: number) => {
        const root = document.documentElement;
        root.style.setProperty("--cyan", a.cyan);
        root.style.setProperty("--cyan-dim", a.cyan + "18");
        root.style.setProperty("--border-cyan", a.cyan + "30");
        root.style.setProperty("--border-hover", a.cyan + "48");
        root.style.setProperty("--amber", a.amber);
        root.style.setProperty("--amber-dim", a.amber + "20");
        setActive(i);
    };

    return (
        <div
            style={{
                position: "fixed",
                right: "1.25rem",
                bottom: "1.75rem",
                zIndex: 8990,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: "0.6rem",
            }}
        >
            {/* Panel */}
            {open && (
                <div
                    style={{
                        background: "var(--surface)",
                        border: "1px solid var(--border)",
                        borderRadius: "var(--radius-md)",
                        padding: "1.25rem",
                        width: 200,
                        boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
                    }}
                >
                    <div
                        className="font-mono"
                        style={{ fontSize: "0.62rem", color: "var(--muted)", marginBottom: "0.875rem", letterSpacing: "0.14em", textTransform: "uppercase" }}
                    >
                        Accent Color
                    </div>
                    {accents.map((a, i) => (
                        <button
                            key={a.name}
                            onClick={() => applyAccent(a, i)}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.75rem",
                                width: "100%",
                                background: i === active ? `${a.cyan}18` : "transparent",
                                border: i === active ? `1px solid ${a.cyan}40` : "1px solid transparent",
                                borderRadius: "var(--radius-sm)",
                                padding: "0.5rem 0.65rem",
                                cursor: "pointer",
                                marginBottom: "0.35rem",
                                transition: "all 0.15s",
                            }}
                        >
                            <div style={{ display: "flex", gap: "3px" }}>
                                <div style={{ width: 12, height: 12, borderRadius: "50%", background: a.cyan }} />
                                <div style={{ width: 12, height: 12, borderRadius: "50%", background: a.amber }} />
                            </div>
                            <span style={{ fontSize: "0.78rem", color: "var(--text)", fontWeight: 500 }}>
                                {a.name}
                            </span>
                        </button>
                    ))}
                </div>
            )}

            {/* Toggle */}
            <button
                onClick={() => setOpen(!open)}
                style={{
                    width: 42, height: 42,
                    borderRadius: "var(--radius-sm)",
                    background: "var(--cyan)",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--bg)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.2s",
                    boxShadow: "0 4px 16px rgba(0,207,255,0.25)",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.08)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 20px rgba(0,207,255,0.4)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(0,207,255,0.25)"; }}
                title="Change accent color"
            >
                {open ? <X size={17} /> : <Palette size={17} />}
            </button>
        </div>
    );
}
