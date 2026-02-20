"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Github, ExternalLink, Layers } from "lucide-react";

export type Project = {
    id: number;
    title: string;
    description: string;
    tags: string[];
    color: string;
    gradient: string;
    demoUrl: string;
    githubUrl: string;
    comingSoon: boolean;
};

export const STORAGE_KEY = "portfolio_projects";

export function loadProjects(): Project[] {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) return JSON.parse(saved) as Project[];
    } catch { /* noop */ }
    return defaultProjects;
}

export function saveProjects(projects: Project[]) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch { /* noop */ }
}

export const defaultProjects: Project[] = [
    {
        id: 1,
        title: "Smart Object Awareness",
        description:
            "An assistive technology device built on Raspberry Pi using OpenCV to capture, identify, and audibly describe real-world objects — enhancing navigation for visually impaired individuals.",
        tags: ["Raspberry Pi", "OpenCV", "Python", "IoT", "Computer Vision"],
        color: "#6378ff",
        gradient: "linear-gradient(135deg, #6378ff22, #a855f722)",
        demoUrl: "#",
        githubUrl: "#",
        comingSoon: false,
    },
    {
        id: 2,
        title: "AI Prompt Analyzer",
        description:
            "A full-stack web application that analyzes AI prompts and provides detailed clarity and structure scores, powered by Google AI API via a Node.js backend.",
        tags: ["Google AI API", "Node.js", "Next.js", "Gen AI", "Prompt Engineering"],
        color: "#a855f7",
        gradient: "linear-gradient(135deg, #a855f722, #ec489922)",
        demoUrl: "#",
        githubUrl: "#",
        comingSoon: false,
    },
    {
        id: 3,
        title: "ADmyBRAND Insights",
        description:
            "A full-stack analytics dashboard for marketing agencies. Features real-time interactive charts, advanced data tables with filtering/sorting, dark/light mode, and a complete auth system.",
        tags: ["Next.js", "React", "TypeScript", "Dashboard", "Analytics"],
        color: "#22d3ee",
        gradient: "linear-gradient(135deg, #22d3ee22, #6378ff22)",
        demoUrl: "#",
        githubUrl: "#",
        comingSoon: false,
    },
];

const icons = ["🤖", "👁️", "📊", "🔌", "⚡", "🧠", "🛰️"];

function SpotlightCard({ project, index }: { project: Project; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });
    const [spotX, setSpotX] = useState(50);
    const [spotY, setSpotY] = useState(50);
    const [hovered, setHovered] = useState(false);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setSpotX(((e.clientX - rect.left) / rect.width) * 100);
        setSpotY(((e.clientY - rect.top) / rect.height) * 100);
    }, []);

    if (project.comingSoon) return null;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="spotlight-card"
            style={{ cursor: "default" }}
        >
            {/* Spotlight gradient */}
            <div style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                background: `radial-gradient(600px circle at ${spotX}% ${spotY}%, ${project.color}18 0%, transparent 60%)`,
                opacity: hovered ? 1 : 0,
                transition: "opacity 0.3s",
                borderRadius: "inherit",
            }} />

            {/* Left accent stripe */}
            <div style={{
                position: "absolute", left: 0, top: "15%", bottom: "15%",
                width: 3, borderRadius: "0 3px 3px 0",
                background: `linear-gradient(to bottom, ${project.color}00, ${project.color}, ${project.color}00)`,
                opacity: hovered ? 1 : 0.5,
                transition: "opacity 0.3s",
            }} />

            <div style={{ padding: "2rem 2rem 2rem 2.5rem", display: "flex", gap: "1.75rem", flexWrap: "wrap" }}>
                {/* Icon */}
                <div style={{ flexShrink: 0 }}>
                    <div style={{
                        width: 52, height: 52, borderRadius: 14,
                        background: `${project.color}18`,
                        border: `1px solid ${project.color}35`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "1.4rem",
                        transition: "box-shadow 0.3s",
                        boxShadow: hovered ? `0 0 20px ${project.color}30` : "none",
                    }}>
                        {icons[index % icons.length]}
                    </div>
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 220 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem", marginBottom: "0.6rem" }}>
                        <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--color-text)", letterSpacing: "-0.01em" }}>
                            {project.title}
                        </h3>
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                            {project.githubUrl !== "#" && (
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                                    style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: "0.78rem", color: "var(--color-text-muted)", textDecoration: "none", padding: "0.3rem 0.7rem", border: "1px solid var(--color-border)", borderRadius: 7, transition: "all 0.2s" }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = project.color + "60"; e.currentTarget.style.color = project.color; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--color-border)"; e.currentTarget.style.color = "var(--color-text-muted)"; }}>
                                    <Github size={12} /> Code
                                </a>
                            )}
                            {project.demoUrl !== "#" && (
                                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
                                    style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: "0.78rem", color: "white", textDecoration: "none", padding: "0.3rem 0.7rem", borderRadius: 7, background: project.color, transition: "opacity 0.2s" }}
                                    onMouseEnter={e => { e.currentTarget.style.opacity = "0.85"; }}
                                    onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}>
                                    <ExternalLink size={12} /> Live
                                </a>
                            )}
                        </div>
                    </div>
                    <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", lineHeight: 1.75, marginBottom: "1rem" }}>
                        {project.description}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                        {project.tags.map((t) => (
                            <span key={t} className="tag" style={{ borderColor: `${project.color}25`, color: project.color + "bb" }}>
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function ComingSoonRow({ count }: { count: number }) {
    if (count <= 0) return null;
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{
                display: "flex", alignItems: "center", gap: "1rem",
                padding: "1rem 1.5rem",
                border: "1px dashed rgba(99,120,255,0.15)",
                borderRadius: 12,
                color: "var(--color-text-subtle)",
            }}
        >
            <Layers size={15} />
            <span style={{ fontSize: "0.82rem", fontFamily: "var(--font-mono)" }}>
                +{count} more projects in progress — check back soon
            </span>
        </motion.div>
    );
}

export default function ProjectsSection() {
    const [projects, setProjects] = useState<Project[]>(defaultProjects);
    const headerRef = useRef(null);
    const headerInView = useInView(headerRef, { once: true });

    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) setProjects(JSON.parse(saved));
        } catch { /* noop */ }
    }, []);

    const realProjects = projects.filter((p) => !p.comingSoon);
    const comingSoonCount = projects.filter((p) => p.comingSoon).length;

    return (
        <section id="projects" style={{ padding: "var(--section-padding) clamp(1.5rem, 5vw, 4rem)" }}>
            <div style={{ maxWidth: 900, margin: "0 auto" }}>
                {/* Header */}
                <motion.div
                    ref={headerRef}
                    initial={{ opacity: 0, y: 24 }}
                    animate={headerInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: "center", marginBottom: "3.5rem" }}
                >
                    <div className="section-label" style={{ margin: "0 auto 1rem" }}>
                        <span>🚀</span> Projects
                    </div>
                    <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.025em", marginBottom: "0.75rem" }}>
                        Things I&apos;ve <span className="text-gradient">Built</span>
                    </h2>
                    <p style={{ color: "var(--color-text-muted)", maxWidth: 440, margin: "0 auto", fontSize: "0.95rem", lineHeight: 1.7 }}>
                        Real-world projects blending AI, web, and hardware to solve actual problems.
                    </p>
                </motion.div>

                {/* Project Cards */}
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    {realProjects.map((p, i) => <SpotlightCard key={p.id} project={p} index={i} />)}
                    <ComingSoonRow count={comingSoonCount} />
                </div>
            </div>
        </section>
    );
}
