import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/db";
import Offer from "@/models/Offer";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

// GET user's offers
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
    const offers = await Offer.find({ userId: decoded.userId }).sort({ createdAt: -1 });

    return NextResponse.json({ offers });
  } catch (error: any) {
    console.error("Fetch offers error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch offers" }, { status: 500 });
  }
}

// POST save a new offer
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

    const offer = await Offer.create({
      userId: decoded.userId,
      title: body.title,
      category: body.category,
      targetAudience: body.targetAudience,
      coreProblem: body.coreProblem,
      uniqueApproach: body.uniqueApproach,
      packages: body.packages,
    });

    return NextResponse.json({ success: true, offer }, { status: 201 });
  } catch (error: any) {
    console.error("Save offer error:", error);
    return NextResponse.json({ error: error.message || "Failed to save offer" }, { status: 500 });
  }
}
