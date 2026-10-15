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

    const { clientName, clientCompany, clientEmail, discoveryNotes, selectedOffer } = await req.json();

    if (!clientName || !clientCompany || !discoveryNotes) {
      return NextResponse.json(
        { error: "Client Name, Company, and Discovery Notes are required." },
        { status: 400 }
      );
    }

    if (!GEMINI_API_KEY) {
      return NextResponse.json({ error: "Gemini API key is not configured." }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

    const offerContext = selectedOffer
      ? `Selected Base Offer: ${selectedOffer.title}\nOffer Approach: ${selectedOffer.uniqueApproach}\nPackages Reference: ${JSON.stringify(selectedOffer.packages)}`
      : "No pre-built offer selected; construct custom pricing tiers based on discovery notes.";

    const prompt = `You are Closr's AI Proposal Agent — an expert sales copywriter that turns discovery call notes into ultra-compelling, high-converting client proposals.

    Client Information:
    - Client Name: ${clientName}
    - Client Company: ${clientCompany}
    - Client Email: ${clientEmail || "Not provided"}

    Discovery Call Notes & Context:
    ${discoveryNotes}

    ${offerContext}

    Draft a complete, investor-grade sales proposal.

    Return ONLY a valid JSON object matching this exact TypeScript structure without markdown wrapping:
    {
      "title": "Proposal Title (e.g. Strategic Growth & Revenue Infrastructure Proposal)",
      "problemStatement": "Deep 2-3 paragraph summary articulating the client's current pain points, bottleneck, and cost of inaction based on discovery call notes.",
      "proposedSolution": "Detailed 2-3 paragraph breakdown of the customized solution strategy designed specifically for ${clientCompany}.",
      "deliverables": [
        "Deliverable item 1 with key outcome",
        "Deliverable item 2 with outcome",
        "Deliverable item 3 with outcome",
        "Deliverable item 4 with outcome"
      ],
      "pricingTiers": [
        {
          "name": "Standard Tier Name",
          "price": 3500,
          "billingType": "one-time",
          "description": "Short explanation of what's included in this tier",
          "features": ["Feature 1", "Feature 2", "Feature 3"],
          "recommended": false
        },
        {
          "name": "Growth Tier Name (Recommended)",
          "price": 6000,
          "billingType": "one-time",
          "description": "Comprehensive implementation package",
          "features": ["Everything in Standard", "Feature 4", "Feature 5"],
          "recommended": true
        }
      ],
      "roiStatement": "Quantified statement of ROI, expected timeline to impact, and strategic outcome for ${clientCompany}.",
      "nextSteps": "Clear 3-step timeline for signing, payment, and kickoff call."
    }

    Ensure prices are integer numbers. billingType MUST be one of: "one-time", "monthly", or "milestone".`;

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
      const cleanedText = (responseText || "").replace(/```json/g, "").replace(/```/g, "").trim();
      data = JSON.parse(cleanedText);
    }

    return NextResponse.json({ success: true, proposalData: data });
  } catch (error: any) {
    console.error("Proposal generation error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate AI proposal." },
      { status: 500 }
    );
  }
}
