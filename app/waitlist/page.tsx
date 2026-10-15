"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Mail,
  User,
} from "lucide-react";

const benefits = [
  {
    title: "Package deals faster",
    description: "AI helps turn opportunities into compelling proposals.",
  },
  {
    title: "Keep every deal moving",
    description: "Never let follow-ups disappear into your inbox.",
  },
  {
    title: "Let AI handle the busywork",
    description: "Automate repetitive revenue tasks while you stay in control.",
  },
];

export default function WaitlistPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [customRole, setCustomRole] = useState("");
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

    const finalRole = role === "Other" ? customRole.trim() : role;

    setLoading(true);
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, role: finalRole, useCase }),
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

        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:pt-0">
          <div className="max-w-2xl">
            <div className="mb-8 inline-flex items-center gap-1.5 text-3xl font-bold tracking-tight text-white">
              <span>Closr</span>
              <span className="text-4xl font-extrabold leading-none text-brand-pink">.</span>
            </div>

            <div className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-brand-pink/20 bg-brand-pink/10 px-3 py-1 text-xs font-semibold text-brand-pink">
              <span>Private beta waitlist</span>
            </div>

            <h1 className="max-w-2xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              Turn more leads into signed deals—with less sales work.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-brand-lilac md:text-lg">
              Closr is the AI revenue workspace for agencies, consultants and service businesses. Qualify leads, build proposals, automate follow-ups and keep every deal moving until it&apos;s closed.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="flex flex-col gap-2 rounded-xl border border-white/8 bg-white/5 p-4"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-pink" />
                    <h3 className="text-xs font-semibold text-white">{benefit.title}</h3>
                  </div>
                  <p className="text-xs leading-relaxed text-brand-lilac/80">{benefit.description}</p>
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
                <button
                  onClick={() => {
                    setName("");
                    setEmail("");
                    setRole("");
                    setCustomRole("");
                    setUseCase("");
                    setSuccess(false);
                  }}
                  className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-pink px-6 text-xs font-bold text-white transition-all hover:scale-[1.02] hover:bg-opacity-90 active:scale-[0.98]"
                >
                  <span>Submit another email</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <h2 className="text-2xl font-bold text-white">Get Started</h2>
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

                <label className="flex flex-col gap-1.5 text-xs font-semibold text-brand-lilac">
                  Role
                  <span className="relative">
                    <select
                      value={role}
                      onChange={(e) => {
                        setRole(e.target.value);
                        if (e.target.value !== "Other") {
                          setCustomRole("");
                        }
                      }}
                      className="w-full appearance-none rounded-xl border border-brand-purple/10 bg-brand-low px-4 py-3 pr-10 text-sm text-white outline-none transition-all focus:border-brand-pink focus:ring-1 focus:ring-brand-pink cursor-pointer"
                    >
                      <option value="" disabled className="bg-brand-dark text-brand-lilac">
                        Select your role...
                      </option>
                      <option value="Agency Owner / Founder" className="bg-brand-dark text-white">
                        Agency Owner / Founder
                      </option>
                      <option value="Consultant / Freelancer" className="bg-brand-dark text-white">
                        Consultant / Freelancer
                      </option>
                      <option value="Sales Lead / Director" className="bg-brand-dark text-white">
                        Sales Lead / Director
                      </option>
                      <option value="Account Executive / Manager" className="bg-brand-dark text-white">
                        Account Executive / Manager
                      </option>
                      <option value="Operations / Delivery" className="bg-brand-dark text-white">
                        Operations / Delivery
                      </option>
                      <option value="Other" className="bg-brand-dark text-white">
                        Other
                      </option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-lilac/50" />
                  </span>
                </label>

                {role === "Other" && (
                  <label className="flex flex-col gap-1.5 text-xs font-semibold text-brand-lilac animate-in fade-in duration-200">
                    Specify your role
                    <input
                      type="text"
                      required
                      value={customRole}
                      onChange={(e) => setCustomRole(e.target.value)}
                      placeholder="e.g., Head of Growth"
                      className="w-full rounded-xl border border-brand-purple/10 bg-brand-low px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-brand-lilac/40 focus:border-brand-pink focus:ring-1 focus:ring-brand-pink"
                    />
                  </label>
                )}

                <label className="flex flex-col gap-1.5 text-xs font-semibold text-brand-lilac">
                  What is the bottleneck you are facing when closing a deal?
                  <textarea
                    value={useCase}
                    onChange={(e) => setUseCase(e.target.value)}
                    placeholder="e.g., Proposals take too long to create, leads ghosting after first call..."
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
                      <span>Get Started</span>
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
