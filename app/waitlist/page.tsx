"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Mail,
  Sparkles,
  User,
} from "lucide-react";

const benefits = [
  "Early access to AI deal packaging",
  "Founding-user onboarding sessions",
  "Priority invites for team workspaces",
];

export default function WaitlistPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [useCase, setUseCase] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email) {
      setError("Please add your name and email.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company, role, useCase }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Could not join the waitlist");
      }

      setSuccess(true);
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not join the waitlist. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-brand-dark text-white">
      <section className="relative isolate flex min-h-screen items-center overflow-hidden px-6 py-10 md:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(255,6,109,0.22),transparent_30%),radial-gradient(circle_at_85%_24%,rgba(250,95,4,0.16),transparent_28%),linear-gradient(135deg,#23062b_0%,#1d0225_45%,#2c0f33_100%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-linear-to-t from-brand-dark to-transparent" />

        <Link
          href="/"
          className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-brand-lilac transition-colors hover:bg-white/10 hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to home</span>
        </Link>

        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:pt-0">
          <div className="max-w-2xl">
            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-1.5 text-3xl font-bold tracking-tight text-white"
            >
              <span>Closr</span>
              <span className="text-4xl font-extrabold leading-none text-brand-pink">.</span>
            </Link>

            <div className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-brand-pink/20 bg-brand-pink/10 px-3 py-1 text-xs font-semibold text-brand-pink">
              {/* <Sparkles className="h-3.5 w-3.5" /> */}
              <span>Private beta waitlist</span>
            </div>

            <h1 className="max-w-2xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              Be first in line for faster, cleaner deal flow.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-brand-lilac md:text-lg">
              Join the Closr waitlist for early access to an AI revenue workspace built for agencies, consultants, and service teams who need to move from lead to signed proposal without the usual drag.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex min-h-24 items-start gap-3 rounded-lg border border-white/8 bg-white/5 p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-pink" />
                  <p className="text-xs font-medium leading-5 text-brand-lilac">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-brand-purple/25 bg-brand-lowest/75 p-6 shadow-2xl backdrop-blur-md sm:p-8">
            {success ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 text-green-400">
                  <CheckCircle2 className="h-9 w-9" />
                </div>
                <h2 className="text-2xl font-bold text-white">You&apos;re on the list.</h2>
                <p className="mt-3 max-w-sm text-sm leading-6 text-brand-lilac">
                  We saved your spot and will reach out when the next Closr beta invites open.
                </p>
                <Link
                  href="/"
                  className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-pink px-6 text-xs font-bold text-white transition-all hover:scale-[1.02] hover:bg-opacity-90 active:scale-[0.98]"
                >
                  <span>Return home</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <h2 className="text-2xl font-bold text-white">Join the waitlist</h2>
                  <p className="mt-2 text-sm text-brand-lilac/75">
                    Tell us where to send your invite.
                  </p>
                </div>

                {error && (
                  <div className="rounded-lg border border-rose-500/20 bg-rose-500/10 p-3 text-xs font-medium text-rose-300">
                    {error}
                  </div>
                )}

                <label className="flex flex-col gap-1.5 text-xs font-semibold text-brand-lilac">
                  Full name
                  <span className="relative">
                    <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-lilac/50" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Morgan"
                      className="w-full rounded-xl border border-brand-purple/10 bg-brand-low py-3 pl-10 pr-4 text-sm text-white outline-none transition-all placeholder:text-brand-lilac/40 focus:border-brand-pink focus:ring-1 focus:ring-brand-pink"
                    />
                  </span>
                </label>

                <label className="flex flex-col gap-1.5 text-xs font-semibold text-brand-lilac">
                  Work email
                  <span className="relative">
                    <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-lilac/50" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@company.com"
                      className="w-full rounded-xl border border-brand-purple/10 bg-brand-low py-3 pl-10 pr-4 text-sm text-white outline-none transition-all placeholder:text-brand-lilac/40 focus:border-brand-pink focus:ring-1 focus:ring-brand-pink"
                    />
                  </span>
                </label>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-1.5 text-xs font-semibold text-brand-lilac">
                    Company
                    <span className="relative">
                      <BriefcaseBusiness className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-lilac/50" />
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Studio North"
                        className="w-full rounded-xl border border-brand-purple/10 bg-brand-low py-3 pl-10 pr-4 text-sm text-white outline-none transition-all placeholder:text-brand-lilac/40 focus:border-brand-pink focus:ring-1 focus:ring-brand-pink"
                      />
                    </span>
                  </label>

                  <label className="flex flex-col gap-1.5 text-xs font-semibold text-brand-lilac">
                    Role
                    <input
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="Founder"
                      className="w-full rounded-xl border border-brand-purple/10 bg-brand-low px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-brand-lilac/40 focus:border-brand-pink focus:ring-1 focus:ring-brand-pink"
                    />
                  </label>
                </div>

                <label className="flex flex-col gap-1.5 text-xs font-semibold text-brand-lilac">
                  What do you want Closr to help with?
                  <textarea
                    value={useCase}
                    onChange={(e) => setUseCase(e.target.value)}
                    placeholder="Qualifying leads, building proposals, keeping follow-ups moving..."
                    rows={4}
                    className="w-full resize-none rounded-xl border border-brand-purple/10 bg-brand-low px-4 py-3 text-sm leading-6 text-white outline-none transition-all placeholder:text-brand-lilac/40 focus:border-brand-pink focus:ring-1 focus:ring-brand-pink"
                  />
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-pink px-6 text-xs font-bold text-white shadow-[0_0_20px_rgba(255,6,109,0.3)] transition-all hover:scale-[1.01] hover:bg-opacity-95 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                      <span>Saving your spot...</span>
                    </>
                  ) : (
                    <>
                      <span>Join waitlist</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
