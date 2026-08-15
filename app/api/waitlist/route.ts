import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Waitlist from "@/models/Waitlist";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getErrorMessage(error: unknown) {
  return error instanceof Error
    ? error.message
    : "Something went wrong joining the waitlist";
}

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { name, email, company, role, useCase } = await req.json();
    const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";

    if (!name || !normalizedEmail) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    if (!isValidEmail(normalizedEmail)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    const entry = await Waitlist.findOneAndUpdate(
      { email: normalizedEmail },
      {
        name: String(name).trim(),
        email: normalizedEmail,
        company: company ? String(company).trim() : undefined,
        role: role ? String(role).trim() : undefined,
        useCase: useCase ? String(useCase).trim() : undefined,
        source: "waitlist-page",
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return NextResponse.json(
      {
        message: "You're on the waitlist.",
        email: entry.email,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Waitlist signup error:", error);
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}
