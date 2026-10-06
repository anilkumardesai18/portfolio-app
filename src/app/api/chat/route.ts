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
GITHUB: github.com/anilkumardesai18

CAREER OBJECTIVE: Computer Science graduate with hands-on experience building and deploying Machine Learning and Generative AI systems – from training and benchmarking classification models to building LLM-powered agents with semantic search and retrieval. Skilled in Python, scikit-learn, NLP (spaCy, Sentence-Transformers), and REST API design. Seeking an AI/ML Engineer role to design, train, evaluate, and ship intelligent, production-ready models that solve real business problems.

EDUCATION:
- B.E in Computer Science and Engineering, Don Bosco Institute of Technology, Bengaluru (2022 – 2026, CGPA: 7.8/10)
- XII CBSE – Sainik School Kodagu (2020 – 2022, 67.4%)
- X CBSE – Sainik School Kodagu (2020, 61.4%)

TECHNICAL SKILLS:
- Machine Learning: scikit-learn, Random Forest, SVM, KNN, Logistic Regression, Gradient Boosting, Naive Bayes, Feature Engineering, Model Evaluation (Accuracy, Precision, Recall, F1-score, ROC-AUC), Hyperparameter Tuning
- NLP & Generative AI: spaCy (Named Entity Recognition), Sentence-Transformers, Semantic Similarity Matching, Cosine Similarity, Prompt Engineering, LLM Integration (Groq Llama-3.3-70B, Google Generative AI), Retrieval-Augmented Generation (RAG)
- Languages & Data: Python, SQL, PostgreSQL, Supabase, pandas, NumPy, JSON/REST payload design, JavaScript, TypeScript, Kotlin
- Backend & Deployment: FastAPI, Flask, Streamlit, REST API Design, Node.js, Express, Git/GitHub, Next.js
- Data Visualization: Matplotlib, Seaborn, Chart.js, Recharts, Confusion Matrices, ROC Curves, Vector Embeddings
- Mobile & Hardware: Android (Kotlin, Jetpack Compose), Raspberry Pi, OpenCV / Computer Vision

EXPERIENCE:
1. Android App Development Intern (Generative AI) – MindMatrix: Built AI-powered Android apps using Gen AI APIs & prompt engineering, managed API integration and offline database management.
2. Data & Systems Operations – Freelancing: Designed database-driven synthetic data pipelines modeling real-world transaction environments (1,000+ records), validated data quality for reporting and model pipelines.
3. Full Stack & AI Developer – Freelancing: Built end-to-end full-stack web applications with custom admin systems.

PROJECTS:
1. HealthGuard AI – Multi-Disease Prediction System: Benchmark 6 ML algorithms across 3 medical datasets (Heart, Diabetes, Breast Cancer), Flask REST API (5 endpoints), interactive dashboard evaluating ROC-AUC/Accuracy with Chart.js.
2. AI Resume ATS Scorer & Screening Agent: PDF/DOCX resume parser with spaCy NER, Sentence-Transformers semantic job-fit scoring, Groq Llama-3.3-70B AI coaching loop, FastAPI + Streamlit & CLI.
3. AI Prompt Analyzer: Web app analyzing AI prompt quality in real-time with Google AI API and Node.js/Express.
4. PDT – Personal Digital Twin: AI health & fitness tracking Android app (Kotlin, Jetpack Compose, Health Connect).
5. Smart Object Awareness for Visually Impaired: Assistive IoT device on Raspberry Pi + OpenCV.
6. ADmyBRAND Insights Dashboard: Full-stack marketing analytics dashboard built with Next.js & TypeScript.

TRAINING & CERTIFICATIONS:
- Apna College – AI/ML Training Program (Ongoing, Supervised/Unsupervised Learning, Neural Networks)
- AI Essentials and Prompt Engineering (LLM Fundamentals, Prompt Patterns)
- TuteDude – Data Analytics: SQL, Excel, Python
- Deloitte Australia – Data Analytics Virtual Experience Certificate
- MindMatrix – Android App Development

CO-CURRICULAR & ACHIEVEMENTS:
- NCC Certification: A, B, and C certificates (Sainik School Kodagu) – discipline, leadership, teamwork.
- Maintains 6+ public GitHub repositories across ML, NLP, Gen AI, and Full Stack.
- Languages: English, Kannada, Hindi

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

function getFallbackReply(text: string): string {
    const lower = text.toLowerCase();
    if (lower.includes("skill") || lower.includes("stack") || lower.includes("tech"))
        return "🚀 Anil specializes in ML (scikit-learn, Random Forest, SVM), NLP & Gen AI (spaCy, Sentence-Transformers, Groq Llama-3.3-70B, Google AI API), Python, SQL (PostgreSQL, Supabase), FastAPI/Flask, Next.js, and IoT with Raspberry Pi.";
    if (lower.includes("project") || lower.includes("built"))
        return "⚡ Anil has built projects including HealthGuard AI (Multi-Disease ML Prediction), AI Resume ATS Scorer (spaCy NER + Groq Llama-3.3-70B), AI Prompt Analyzer, PDT Personal Digital Twin, and Smart Object Awareness (Raspberry Pi + OpenCV).";
    if (lower.includes("available") || lower.includes("hire") || lower.includes("job"))
        return "✅ Yes! Anil is seeking an AI/ML Engineer role or internship. He's a CSE graduate from DBIT Bengaluru (7.8 CGPA).";
    if (lower.includes("contact") || lower.includes("email") || lower.includes("reach"))
        return "📧 You can reach Anil at anilkumardesai18@gmail.com or call +91 9108124418. GitHub: github.com/anilkumardesai18.";
    if (lower.includes("education") || lower.includes("college") || lower.includes("degree"))
        return "🎓 Anil holds a B.E in Computer Science from Don Bosco Institute of Technology, Bengaluru (7.8/10 CGPA, 2026). He is a Sainik School Kodagu alumnus with NCC A, B & C certificates.";
    if (lower.includes("certif") || lower.includes("training") || lower.includes("course"))
        return "📋 Anil holds certifications in AI/ML Training (Apna College), AI Essentials & Prompt Engineering, Data Analytics (TuteDude), MindMatrix Android Dev, and Deloitte Australia Data Analytics.";
    return "🤖 Hi! I'm Anil's portfolio assistant. Ask me about his ML/AI skills, projects (HealthGuard AI, ATS Resume Scorer), certifications, or how to contact him!";
}
