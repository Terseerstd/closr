import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/db";
import Proposal from "@/models/Proposal";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

// GET proposals list for authenticated user
export async function GET() {
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

    await dbConnect();
    const proposals = await Proposal.find({ userId: decoded.userId }).sort({ createdAt: -1 });

    return NextResponse.json({ proposals });
  } catch (error: any) {
    console.error("Fetch proposals error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch proposals" }, { status: 500 });
  }
}

// POST create/save proposal
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

    await dbConnect();
    const body = await req.json();

    // Generate unique public slug
    const cleanClient = (body.clientCompany || body.clientName || "deal")
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-");
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const publicSlug = `${cleanClient}-${randomSuffix}`;

    const proposal = await Proposal.create({
      userId: decoded.userId,
      offerId: body.offerId,
      publicSlug,
      title: body.title,
      clientName: body.clientName,
      clientEmail: body.clientEmail,
      clientCompany: body.clientCompany,
      status: body.status || "sent",
      problemStatement: body.problemStatement,
      proposedSolution: body.proposedSolution,
      deliverables: body.deliverables,
      pricingTiers: body.pricingTiers,
      roiStatement: body.roiStatement,
      nextSteps: body.nextSteps,
    });

    return NextResponse.json({ success: true, proposal, publicUrl: `/proposal/${publicSlug}` }, { status: 201 });
  } catch (error: any) {
    console.error("Save proposal error:", error);
    return NextResponse.json({ error: error.message || "Failed to save proposal" }, { status: 500 });
  }
}
