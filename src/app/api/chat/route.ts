import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are an AI assistant for Anil Kumar Desai's personal portfolio website.
Your ONLY job is to answer questions about Anil and his work. Always be friendly, concise, and professional.
Keep all answers to 2-4 sentences. Use emojis sparingly.

Here is everything you know about Anil:

NAME: Anil Kumar Desai
LOCATION: Nagadevanahalli, Bengaluru – 560056
EMAIL: anilkumardesai18@gmail.com
PHONE: +91 9108124418

EDUCATION:
- B.E in Computer Science and Engineering, Don Bosco Institute Bengaluru (2026, CGPA: 7.6)
- XII CBSE – Sainik School Kodagu (2022, 61.4%)
- X CBSE – Sainik School Kodagu (2020, 67.4%)

SKILLS:
- Programming: Python, SQL, JavaScript / Node.js
- AI & Gen AI: Google AI API, Prompt Engineering, OpenCV / Computer Vision, API Integration
- Tools: VS Code, Linux, Raspberry Pi, Next.js, React, Excel / Data Analytics
- OS: Windows, Linux, Raspberry Pi

PROJECTS:
1. Smart Object Awareness for Visually Impaired (Academic) – Raspberry Pi + OpenCV device that captures, identifies, and audibly describes objects for visually impaired users.
2. AI Prompt Analyzer (Personal) – Full-stack web app that analyzes AI prompts and gives clarity/structure scores using Google AI API via a Node.js backend.
3. ADmyBRAND Insights Dashboard (Personal) – Full-stack marketing analytics dashboard built with Next.js, React, TypeScript — includes real-time charts, data tables, auth system, dark/light mode.

TRAINING & CERTIFICATIONS:
- Apna College – AI/ML Training (Ongoing)
- Tutedude – Data Analytics: SQL, Excel, Python
- AI Essentials and Prompt Engineering
- Android App Development – MindMatrix
- Deloitte Australia – Data Analytics Virtual Experience Certificate

CO-CURRICULAR:
- NCC Certification: A, B, and C certificates (Sainik School Kodagu)
- Technical Analysis

SOFT SKILLS: Time Management, Problem Solving, Team Management, Adaptability, Analytical Mindset, Multitasking

CAREER OBJECTIVE: A tech enthusiast skilled in AI-powered web development, data analytics with SQL, and executing web, CV, and IoT projects. A disciplined leader (NCC certified) and hands-on problem-solver, currently advancing skills with Google AI and Prompt Engineering training.

AVAILABILITY: Currently a final-year student (graduating 2026). Open to internships, freelance, and full-time opportunities.

RULES:
- Only answer questions about Anil or his work. If asked anything unrelated, politely say you can only discuss Anil's portfolio.
- Do NOT make up information not listed above.
- Keep answers short and conversational.`;

export async function POST(req: NextRequest) {
    try {
        const { message, history } = await req.json();

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey || apiKey === "your_gemini_api_key_here") {
            return NextResponse.json({ reply: getFallbackReply(message), fallback: true });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        // gemini-1.5-flash has a higher free-tier quota (15 RPM, 1M TPD)
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: SYSTEM_PROMPT,
        });

        const chatHistory = (history ?? []).slice(-8).map(
            (m: { role: string; text: string }) => ({
                role: m.role === "ai" ? "model" : "user",
                parts: [{ text: m.text }],
            })
        );

        const chat = model.startChat({ history: chatHistory });
        const result = await chat.sendMessage(message);
        const reply = result.response.text();

        return NextResponse.json({ reply });
    } catch (err: unknown) {
        console.error("Gemini API error:", err);

        // Check for specific HTTP error codes from the Gemini SDK
        const errObj = err as { status?: number; statusCode?: number };
        const status = errObj?.status ?? errObj?.statusCode;

        if (status === 429) {
            return NextResponse.json(
                {
                    reply: "⏳ I'm getting too many requests right now — please wait a few seconds and try again!",
                    rateLimited: true,
                },
                { headers: { "Retry-After": "10" } }
            );
        }

        if (status === 400) {
            return NextResponse.json({
                reply: "🔑 There's a configuration issue with the AI. Please contact Anil directly at anilkumardesai18@gmail.com!",
                error: true,
            });
        }

        return NextResponse.json({
            reply: "⚠️ Something went wrong on my end. Please try again in a moment, or reach out at anilkumardesai18@gmail.com!",
            error: true,
        });
    }
}

// Smart keyword fallback used when no API key is configured
function getFallbackReply(text: string): string {
    const lower = text.toLowerCase();
    if (lower.includes("skill") || lower.includes("stack") || lower.includes("tech"))
        return "🚀 Anil specializes in Python, SQL, Gen AI (Google AI API), Prompt Engineering, OpenCV for computer vision, and IoT with Raspberry Pi. He also builds full-stack web apps with Next.js and React.";
    if (lower.includes("project") || lower.includes("built"))
        return "⚡ Anil has built 3 projects: a Smart Object Awareness device (Raspberry Pi + OpenCV), an AI Prompt Analyzer (Google AI API + Node.js), and ADmyBRAND Insights — a full-stack analytics dashboard with Next.js and TypeScript.";
    if (lower.includes("available") || lower.includes("hire") || lower.includes("job"))
        return "✅ Yes! Anil is a final-year CSE student (graduating 2026) and is open to internships, freelance work, and full-time opportunities.";
    if (lower.includes("contact") || lower.includes("email") || lower.includes("reach"))
        return "📧 You can reach Anil at anilkumardesai18@gmail.com or call +91 9108124418. He's based in Bengaluru, India.";
    if (lower.includes("education") || lower.includes("college") || lower.includes("degree"))
        return "🎓 Anil is pursuing B.E in Computer Science at Don Bosco Institute, Bengaluru (CGPA 7.6, graduating 2026). He's a Sainik School Kodagu alumnus with NCC A, B & C certificates.";
    if (lower.includes("certif") || lower.includes("training") || lower.includes("course"))
        return "📋 Anil holds certifications in AI/ML (Apna College), Data Analytics — SQL, Excel, Python (Tutedude), Prompt Engineering, Android Development (MindMatrix), and a Deloitte Australia Data Analytics certificate.";
    return "🤖 Hi! I'm Anil's portfolio assistant. Ask me about his skills, projects, certifications, or how to contact him!";
}
