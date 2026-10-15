import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { GoogleGenAI } from "@google/genai";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let decoded: any = null;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const { category, targetAudience, coreProblem, expertise, priceRange } = await req.json();

    if (!category || !targetAudience || !coreProblem || !expertise) {
      return NextResponse.json(
        { error: "Category, Target Audience, Core Problem, and Expertise are required." },
        { status: 400 }
      );
    }

    if (!GEMINI_API_KEY) {
      return NextResponse.json({ error: "Gemini API key is not configured." }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

    const prompt = `You are an elite sales consultant and offer architect for high-ticket service businesses (consultants, freelancers, agencies, coaches).
    
    The user is building their service offer:
    - Service Category: ${category}
    - Target Audience: ${targetAudience}
    - Core Client Problem Solved: ${coreProblem}
    - Primary Expertise / Skills: ${expertise}
    - Target Price Range: ${priceRange || "Competitive / High Value"}

    Generate 3 distinct, high-converting offer packages (e.g. Starter/Audit, Core Execution/Retainer, VIP Sprint/Enterprise transformation).

    Return ONLY a valid JSON object matching this exact TypeScript structure without markdown wrapping:
    {
      "title": "Clear, compelling main offer suite title",
      "uniqueApproach": "1-2 sentence positioning statement highlighting why this offer beats competitors",
      "packages": [
        {
          "name": "Package Name (e.g. Foundation Sprint)",
          "tagline": "Catchy 1-line benefit statement",
          "positioning": "Who this specific package tier is best for",
          "scope": ["Scope item 1", "Scope item 2", "Scope item 3"],
          "deliverables": ["Tangible outcome deliverable 1", "Deliverable 2", "Deliverable 3"],
          "price": 2500,
          "billingType": "one-time",
          "estimatedROI": "Quantified expected ROI or time savings for the client"
        }
      ]
    }
    
    Ensure price is a numeric integer without currency symbols. billingType MUST be one of: "one-time", "monthly", or "milestone".`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const responseText = response.text;
    let data;
    try {
      data = JSON.parse(responseText || "{}");
    } catch (e) {
      // Fallback clean markdown code block if present
      const cleanedText = (responseText || "").replace(/```json/g, "").replace(/```/g, "").trim();
      data = JSON.parse(cleanedText);
    }

    return NextResponse.json({ success: true, offer: data });
  } catch (error: any) {
    console.error("Offer generation error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate offer packages." },
      { status: 500 }
    );
  }
}
