"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Github, ExternalLink, Plus } from "lucide-react";

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

const STORAGE_KEY = "portfolio_projects";

const defaultProjects: Project[] = [
    {
        id: 1,
        title: "Smart Object Awareness",
        description:
            "An assistive technology device built on Raspberry Pi using OpenCV to capture, identify, and audibly describe real-world objects — enhancing environmental awareness and navigation for visually impaired individuals.",
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
            "A full-stack web application that analyzes AI prompts to help users write better instructions. Provides scores and detailed feedback on clarity and structure by using the Google AI API via a Node.js backend.",
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
            "A full-stack analytics dashboard for marketing agencies built with Next.js, React, and TypeScript. Features real-time interactive charts, advanced data tables with filtering/sorting, and a complete authentication system.",
        tags: ["Next.js", "React", "TypeScript", "Dashboard", "Analytics"],
        color: "#22d3ee",
        gradient: "linear-gradient(135deg, #22d3ee22, #6378ff22)",
        demoUrl: "#",
        githubUrl: "#",
        comingSoon: false,
    },
    ...Array.from({ length: 7 }, (_, i) => ({
        id: i + 4,
        title: "",
        description: "",
        tags: [] as string[],
        color: ["#f59e0b", "#ec4899", "#22c55e", "#6378ff", "#a855f7", "#f59e0b", "#22d3ee"][i],
        gradient: [
            "linear-gradient(135deg, #f59e0b22, #ec489922)",
            "linear-gradient(135deg, #ec489922, #a855f722)",
            "linear-gradient(135deg, #22c55e22, #22d3ee22)",
            "linear-gradient(135deg, #6378ff22, #a855f722)",
            "linear-gradient(135deg, #a855f722, #f59e0b22)",
            "linear-gradient(135deg, #f59e0b22, #6378ff22)",
            "linear-gradient(135deg, #22d3ee22, #ec489922)",
        ][i],
        demoUrl: "#",
        githubUrl: "#",
        comingSoon: true,
    })),
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
    const [hovered, setHovered] = useState(false);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    if (project.comingSoon) {
        return (
            <motion.article
                ref={ref}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
                style={{
                    position: "relative",
                    background: "rgba(13, 17, 40, 0.4)",
                    backdropFilter: "blur(24px)",
                    border: `1px dashed ${project.color}30`,
                    borderRadius: 16,
                    padding: "2rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: 220,
                    gap: "0.75rem",
                    cursor: "default",
                    textAlign: "center",
                }}
            >
                <div
                    style={{
                        width: 48,
                        height: 48,
                        borderRadius: 10,
                        background: `${project.color}15`,
                        border: `1px dashed ${project.color}40`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: project.color,
                        opacity: 0.6,
                    }}
                >
                    <Plus size={22} />
                </div>
                <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--color-text-muted)", opacity: 0.5, fontFamily: "var(--font-mono)" }}>
                    Coming Soon
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--color-text-subtle)", opacity: 0.4 }}>
                    Slot {index + 1}
                </div>
            </motion.article>
        );
    }

    return (
        <motion.article
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                position: "relative",
                background: hovered ? project.gradient : "rgba(13, 17, 40, 0.7)",
                backdropFilter: "blur(24px)",
                border: `1px solid ${hovered ? project.color + "60" : "rgba(99,120,255,0.1)"}`,
                borderRadius: 16,
                padding: "2rem",
                transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
                transform: hovered ? "translateY(-8px)" : "translateY(0)",
                boxShadow: hovered ? `0 20px 40px ${project.color}20` : "none",
                cursor: "default",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* Top Glow */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "60%",
                    height: 1,
                    background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`,
                    opacity: hovered ? 1 : 0,
                    transition: "opacity 0.4s",
                }}
            />

            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                <div
                    style={{
                        width: 44,
                        height: 44,
                        borderRadius: 10,
                        background: `${project.color}20`,
                        border: `1px solid ${project.color}40`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <span style={{ fontSize: "1.2rem" }}>⚡</span>
                </div>
            </div>

            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.75rem", color: "var(--color-text)" }}>
                {project.title}
            </h3>

            <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", lineHeight: 1.7, marginBottom: "1.25rem", flex: 1 }}>
                {project.description}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.25rem" }}>
                {project.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                ))}
            </div>

            {/* Action Buttons */}
            <div
                style={{
                    display: "flex",
                    gap: "0.75rem",
                    paddingTop: "1rem",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                }}
            >
                <a
                    href={project.githubUrl !== "#" ? project.githubUrl : undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => { if (project.githubUrl === "#") e.preventDefault(); }}
                    style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.4rem",
                        padding: "0.55rem 0.75rem",
                        background: project.githubUrl !== "#" ? `${project.color}15` : "rgba(255,255,255,0.04)",
                        border: `1px solid ${project.githubUrl !== "#" ? project.color + "35" : "rgba(255,255,255,0.07)"}`,
                        borderRadius: 9,
                        color: project.githubUrl !== "#" ? project.color : "var(--color-text-subtle)",
                        textDecoration: "none",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        transition: "all 0.25s",
                        cursor: project.githubUrl !== "#" ? "pointer" : "default",
                        opacity: project.githubUrl !== "#" ? 1 : 0.4,
                    }}
                    onMouseEnter={(e) => { if (project.githubUrl !== "#") { (e.currentTarget as HTMLElement).style.background = `${project.color}28`; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; } }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = project.githubUrl !== "#" ? `${project.color}15` : "rgba(255,255,255,0.04)"; (e.currentTarget as HTMLElement).style.transform = "none"; }}
                >
                    <Github size={14} />
                    GitHub
                </a>
                <a
                    href={project.demoUrl !== "#" ? project.demoUrl : undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => { if (project.demoUrl === "#") e.preventDefault(); }}
                    style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.4rem",
                        padding: "0.55rem 0.75rem",
                        background: project.demoUrl !== "#" ? `${project.color}15` : "rgba(255,255,255,0.04)",
                        border: `1px solid ${project.demoUrl !== "#" ? project.color + "35" : "rgba(255,255,255,0.07)"}`,
                        borderRadius: 9,
                        color: project.demoUrl !== "#" ? project.color : "var(--color-text-subtle)",
                        textDecoration: "none",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        transition: "all 0.25s",
                        cursor: project.demoUrl !== "#" ? "pointer" : "default",
                        opacity: project.demoUrl !== "#" ? 1 : 0.4,
                    }}
                    onMouseEnter={(e) => { if (project.demoUrl !== "#") { (e.currentTarget as HTMLElement).style.background = `${project.color}28`; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; } }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = project.demoUrl !== "#" ? `${project.color}15` : "rgba(255,255,255,0.04)"; (e.currentTarget as HTMLElement).style.transform = "none"; }}
                >
                    <ExternalLink size={14} />
                    Live Demo
                </a>
            </div>
        </motion.article>
    );
}

export function loadProjects(): Project[] {
    if (typeof window === "undefined") return defaultProjects;
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) return JSON.parse(stored);
    } catch { /* ignore */ }
    return defaultProjects;
}

export function saveProjects(projects: Project[]) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch { /* ignore */ }
}

export { defaultProjects, STORAGE_KEY };

export default function ProjectsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [projects, setProjects] = useState<Project[]>(defaultProjects);

    useEffect(() => {
        setProjects(loadProjects());
        const onStorage = () => setProjects(loadProjects());
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);

    return (
        <section
            id="projects"
            ref={ref}
            style={{
                padding: "var(--section-padding) clamp(1.5rem, 5vw, 4rem)",
                maxWidth: 1320,
                margin: "0 auto",
                position: "relative",
            }}
        >
            {/* Label */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
            >
                <div className="section-label">
                    <span>03</span>
                    <span>Projects</span>
                </div>
                <h2
                    style={{
                        fontSize: "clamp(2rem, 4vw, 3rem)",
                        fontWeight: 800,
                        marginBottom: "0.75rem",
                        letterSpacing: "-0.02em",
                    }}
                >
                    Things I&apos;ve{" "}
                    <span className="text-gradient">Built</span>
                </h2>
                <p style={{ color: "var(--color-text-muted)", marginBottom: "3rem", maxWidth: 520 }}>
                    A showcase of AI-powered tools, IoT systems, and full-stack applications — with more coming soon.
                </p>
            </motion.div>

            {/* Project Grid */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                    gap: "1.5rem",
                }}
            >
                {projects.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                ))}
            </div>

            {/* Admin Link */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.6 }}
                style={{ textAlign: "center", marginTop: "3rem" }}
            >
                <a
                    href="/admin"
                    className="btn-outline"
                    style={{ textDecoration: "none", display: "inline-flex", opacity: 0.4, fontSize: "0.8rem" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.4")}
                >
                    Manage Projects
                </a>
            </motion.div>
        </section>
    );
}
