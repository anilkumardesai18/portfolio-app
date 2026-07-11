"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Github, ExternalLink, ArrowRight } from "lucide-react";

export type Project = {
    id: number;
    title: string;
    description: string;
    tags: string[];
    accent: string;
    /** @deprecated use accent */
    color?: string;
    /** @deprecated */
    gradient?: string;
    /** @deprecated */
    comingSoon?: boolean;
    demoUrl: string;
    githubUrl: string;
    type: string;
    icon: string;
    featured?: boolean;
};

export const STORAGE_KEY = "portfolio_projects_v2";

const defaultProjectsList: Project[] = [
    {
        id: 1,
        title: "PDT – Personal Digital Twin",
        description:
            "An AI-powered health & fitness tracking Android app featuring activity recognition, wearable integration, heart rate monitoring, Health Connect support, outdoor GPS tracking, and personalized AI fitness insights. Built for real-world health impact.",
        tags: ["Kotlin", "Jetpack Compose", "Firebase", "Google Cloud", "AI APIs", "Health Connect"],
        accent: "#D2042D",
        demoUrl: "#",
        githubUrl: "https://github.com/anilkumardesai18",
        type: "Freelancing",
        icon: "🏃",
        featured: true,
    },
    {
        id: 2,
        title: "Nalla-Nudi",
        description:
            "A bridge-dictionary for technical terms, helping rural students search English scientific terms and get clear Kannada explanations with pronunciation guides. Built during MindMatrix internship.",
        tags: ["Android", "Kotlin", "Firebase", "AI APIs", "Education"],
        accent: "#D2042D",
        demoUrl: "#",
        githubUrl: "https://github.com/anilkumardesai18",
        type: "Internship",
        icon: "📖",
    },
    {
        id: 3,
        title: "Smart Object Awareness",
        description:
            "Assistive IoT device on Raspberry Pi using OpenCV to identify and audibly describe real-world objects — enhancing navigation for visually impaired users.",
        tags: ["Raspberry Pi", "OpenCV", "Python", "IoT", "Computer Vision"],
        accent: "#D2042D",
        demoUrl: "#",
        githubUrl: "https://github.com/anilkumardesai18",
        type: "Personal Project",
        icon: "👁️",
    },
    {
        id: 4,
        title: "AI Prompt Analyzer",
        description:
            "Full-stack web app that analyzes AI prompts for clarity and structure, providing scores and detailed feedback using the Google AI API via a Node.js backend.",
        tags: ["Google AI API", "Node.js", "Next.js", "Gen AI"],
        accent: "#D2042D",
        demoUrl: "#",
        githubUrl: "https://github.com/anilkumardesai18",
        type: "Personal Project",
        icon: "🧠",
    },
    {
        id: 5,
        title: "ADmyBRAND Insights",
        description:
            "Full-stack analytics dashboard for marketing agencies with real-time charts, advanced filtering, auth system, and dark/light mode. Built with Next.js + TypeScript.",
        tags: ["Next.js", "React", "TypeScript", "Analytics", "Auth"],
        accent: "#D2042D",
        demoUrl: "#",
        githubUrl: "https://github.com/anilkumardesai18",
        type: "Personal Project",
        icon: "📊",
    },
];

export function loadProjects(): Project[] {
    if (typeof window === "undefined") return defaultProjectsList;
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) return JSON.parse(stored);
    } catch { /* ignore */ }
    return defaultProjectsList;
}

export function saveProjects(p: Project[]) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); } catch { /* ignore */ }
}

export { defaultProjectsList as defaultProjects };

function ProjectLink({ href, label }: { href: string; label: string }) {
    const isDisabled = href === "#";
    return (
        <a
            href={isDisabled ? undefined : href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => { if (isDisabled) e.preventDefault(); }}
            style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                padding: "0.5rem 1rem",
                background: isDisabled ? "var(--bg)" : "var(--surface)",
                border: "1px solid var(--border)",
                color: isDisabled ? "var(--muted)" : "var(--red)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem", fontWeight: 700,
                textTransform: "uppercase",
                opacity: isDisabled ? 0.5 : 1,
                cursor: isDisabled ? "default" : "pointer",
                transition: "all 0.2s",
                textDecoration: "none",
            }}
            onMouseEnter={(e) => {
                if (!isDisabled) {
                    (e.currentTarget as HTMLElement).style.background = "var(--red)";
                    (e.currentTarget as HTMLElement).style.color = "var(--surface)";
                }
            }}
            onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = isDisabled ? "var(--bg)" : "var(--surface)";
                (e.currentTarget as HTMLElement).style.color = isDisabled ? "var(--muted)" : "var(--red)";
            }}
        >
            {label === "GitHub" ? <Github size={14} /> : <ExternalLink size={14} />}
            {label}
        </a>
    );
}

export default function ProjectsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    const projects = loadProjects();
    // Default fallback if local storage gives something weird
    const safeProjects = projects.length > 0 ? projects : defaultProjectsList;
    const featured = safeProjects.find((p) => p.featured) || safeProjects[0];
    const rest = safeProjects.filter((p) => !p.featured && p.id !== featured.id);

    return (
        <section id="projects" className="section section-alt" ref={ref}>
            <div className="section-num">03</div>

            <div className="container" style={{ position: "relative", zIndex: 1 }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    style={{ marginBottom: "3.5rem" }}
                >
                    <div className="label-tag">Projects</div>
                    <h2 className="display" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", marginBottom: "0.75rem", textTransform: "uppercase" }}>
                        Featured <span style={{ color: "var(--red)" }}>Work</span>
                    </h2>
                    <p style={{ color: "var(--muted)", maxWidth: 520, lineHeight: 1.7, fontWeight: 500 }}>
                        From AI-powered Android apps to IoT systems and full-stack dashboards — spanning freelancing, internship, and personal R&amp;D.
                    </p>
                </motion.div>

                {/* Featured project */}
                {featured && (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.05 }}
                        style={{ marginBottom: "2rem" }}
                    >
                        <div
                            className="card-featured"
                            style={{ padding: "3rem", background: "var(--bg)" }}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1.5rem", marginBottom: "2rem" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                    <span style={{ fontSize: "2.5rem", filter: "grayscale(100%) brightness(0%) sepia(100%) hue-rotate(-50deg) saturate(600%) contrast(0.8)", opacity: 0.9 }}>{featured.icon}</span>
                                    <div>
                                        <div
                                            className="font-mono"
                                            style={{ fontSize: "0.75rem", color: "var(--red)", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.25rem" }}
                                        >
                                            Featured Project
                                        </div>
                                        <span
                                            className="font-mono"
                                            style={{ fontSize: "0.75rem", fontWeight: 700, background: "var(--text)", color: "var(--surface)", padding: "0.25rem 0.5rem", textTransform: "uppercase" }}
                                        >
                                            {featured.type}
                                        </span>
                                    </div>
                                </div>
                                <div style={{ display: "flex", gap: "0.75rem" }}>
                                    <ProjectLink href={featured.githubUrl} label="GitHub" />
                                    <ProjectLink href={featured.demoUrl} label="Live Demo" />
                                </div>
                            </div>

                            <h3
                                className="display"
                                style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--text)", marginBottom: "1rem" }}
                            >
                                {featured.title}
                            </h3>
                            <div style={{ borderLeft: "4px solid var(--red)", paddingLeft: "1.5rem", marginBottom: "2rem" }}>
                                <p style={{ color: "var(--muted)", lineHeight: 1.8, maxWidth: 720, fontSize: "1.05rem", fontWeight: 500 }}>
                                    {featured.description}
                                </p>
                            </div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                                {featured.tags.map((tag) => (
                                    <span key={tag} className="chip">{tag}</span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Rest of projects */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                        gap: "2rem",
                    }}
                >
                    {rest.map((project, i) => (
                        <ProjectCard key={project.id} project={project} index={i} isInView={isInView} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ProjectCard({ project, index, isInView }: { project: Project; index: number; isInView: boolean }) {
    const [hovered, setHovered] = useState(false);

    // Filter out empty coming soon placeholders if loaded from admin without proper clearing
    if (project.comingSoon) return null;

    return (
        <motion.article
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
            className="card"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                background: hovered ? "var(--bg)" : "var(--surface)",
            }}
        >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                <span style={{ fontSize: "1.75rem", filter: "grayscale(100%) brightness(0%) sepia(100%) hue-rotate(-50deg) saturate(600%) contrast(0.8)", opacity: 0.9 }}>{project.icon}</span>
                <span
                    className="font-mono"
                    style={{
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--red)",
                        borderBottom: "2px solid var(--red)",
                        paddingBottom: "0.1rem",
                    }}
                >
                    {project.type}
                </span>
            </div>

            <h3
                className="display"
                style={{ fontSize: "1.3rem", marginBottom: "1rem", color: "var(--text)" }}
            >
                {project.title}
            </h3>

            <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.7, marginBottom: "1.5rem", flex: 1, fontWeight: 500 }}>
                {project.description}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2rem" }}>
                {project.tags.slice(0, 4).map((tag) => (
                    <span key={tag} className="chip">{tag}</span>
                ))}
            </div>

            <div
                style={{
                    paddingTop: "1.5rem",
                    borderTop: "1px solid var(--border)",
                    display: "flex",
                    gap: "0.75rem",
                }}
            >
                <ProjectLink href={project.githubUrl} label="GitHub" />
                <ProjectLink href={project.demoUrl} label="Demo" />
                {hovered && (
                    <motion.span
                        initial={{ opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        style={{ marginLeft: "auto", color: "var(--red)", display: "flex", alignItems: "center" }}
                    >
                        <ArrowRight size={20} />
                    </motion.span>
                )}
            </div>
        </motion.article>
    );
}
