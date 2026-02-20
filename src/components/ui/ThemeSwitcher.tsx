"use client";

import { useState } from "react";
import { Palette, X } from "lucide-react";

const themes = [
    { name: "Indigo (Default)", primary: "#6378ff", secondary: "#a855f7", accent: "#22d3ee" },
    { name: "Emerald Tech", primary: "#10b981", secondary: "#06b6d4", accent: "#f59e0b" },
    { name: "Rose Gold", primary: "#f43f5e", secondary: "#ec4899", accent: "#f59e0b" },
    { name: "Amber", primary: "#f59e0b", secondary: "#f97316", accent: "#22d3ee" },
    { name: "Cyan", primary: "#22d3ee", secondary: "#6378ff", accent: "#a855f7" },
];

export default function ThemeSwitcher() {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(0);

    const applyTheme = (theme: (typeof themes)[0], index: number) => {
        const root = document.documentElement;
        root.style.setProperty("--color-primary", theme.primary);
        root.style.setProperty("--color-primary-glow", theme.primary + "66");
        root.style.setProperty("--color-secondary", theme.secondary);
        root.style.setProperty("--color-accent", theme.accent);
        root.style.setProperty(
            "--gradient-primary",
            `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`
        );
        setActive(index);
    };

    return (
        <div
            style={{
                position: "fixed",
                right: "1.5rem",
                bottom: "2rem",
                zIndex: 8990,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: "0.75rem",
            }}
        >
            {/* Panel */}
            {open && (
                <div
                    className="glass"
                    style={{
                        borderRadius: 16,
                        padding: "1.25rem",
                        width: 220,
                        border: "1px solid rgba(99,120,255,0.2)",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                    }}
                >
                    <div
                        style={{
                            fontSize: "0.75rem",
                            fontFamily: "var(--font-mono)",
                            color: "var(--color-text-muted)",
                            marginBottom: "1rem",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                        }}
                    >
                        Color Theme
                    </div>
                    {themes.map((theme, i) => (
                        <button
                            key={theme.name}
                            onClick={() => applyTheme(theme, i)}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.75rem",
                                width: "100%",
                                background: i === active ? "rgba(99,120,255,0.1)" : "transparent",
                                border: i === active ? "1px solid rgba(99,120,255,0.3)" : "1px solid transparent",
                                borderRadius: 8,
                                padding: "0.5rem 0.75rem",
                                cursor: "pointer",
                                marginBottom: "0.5rem",
                                transition: "all 0.2s",
                            }}
                        >
                            <div style={{ display: "flex", gap: "4px" }}>
                                {[theme.primary, theme.secondary, theme.accent].map((color) => (
                                    <div
                                        key={color}
                                        style={{
                                            width: 14,
                                            height: 14,
                                            borderRadius: "50%",
                                            background: color,
                                        }}
                                    />
                                ))}
                            </div>
                            <span style={{ fontSize: "0.8rem", color: "var(--color-text)", fontWeight: 500 }}>
                                {theme.name}
                            </span>
                        </button>
                    ))}
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setOpen(!open)}
                style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
                    border: "none",
                    cursor: "pointer",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 20px var(--color-primary-glow)",
                    transition: "transform 0.3s, box-shadow 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                title="Change color theme"
            >
                {open ? <X size={20} /> : <Palette size={20} />}
            </button>
        </div>
    );
}
