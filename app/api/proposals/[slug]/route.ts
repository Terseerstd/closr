import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Proposal from "@/models/Proposal";

// GET public proposal by slug
export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    await dbConnect();

    const proposal = await Proposal.findOne({ publicSlug: slug });

    if (!proposal) {
      return NextResponse.json({ error: "Proposal not found" }, { status: 404 });
    }

    // Increment analytics opens count
    proposal.analytics.opensCount = (proposal.analytics.opensCount || 0) + 1;
    proposal.analytics.lastViewedAt = new Date();
    if (proposal.status === "sent") {
      proposal.status = "viewed";
    }
    await proposal.save();

    return NextResponse.json({ proposal });
  } catch (error: any) {
    console.error("Fetch proposal by slug error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch proposal" }, { status: 500 });
  }
}

// POST sign or select tier on public proposal
export async function POST(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const body = await req.json();
    await dbConnect();

    const proposal = await Proposal.findOne({ publicSlug: slug });

    if (!proposal) {
      return NextResponse.json({ error: "Proposal not found" }, { status: 404 });
    }

    if (body.action === "sign") {
      if (!body.signedByName || !body.signatureDataUrl) {
        return NextResponse.json({ error: "Name and signature are required" }, { status: 400 });
      }

      proposal.signature = {
        signed: true,
        signedAt: new Date(),
        signedByName: body.signedByName,
        signatureDataUrl: body.signatureDataUrl,
      };
      proposal.status = "signed";
      if (body.selectedTierName) {
        proposal.selectedTierName = body.selectedTierName;
      }
      await proposal.save();

      return NextResponse.json({ success: true, message: "Proposal signed successfully!", proposal });
    }

    if (body.action === "pay") {
      proposal.payment = {
        paid: true,
        paidAt: new Date(),
        amount: body.amount || 0,
        stripePaymentId: body.paymentId || `sim_pay_${Date.now()}`,
      };
      proposal.status = "paid";
      await proposal.save();

      return NextResponse.json({ success: true, message: "Payment processed successfully!", proposal });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("Sign/Pay proposal error:", error);
    return NextResponse.json({ error: error.message || "Failed to process request" }, { status: 500 });
  }
}
