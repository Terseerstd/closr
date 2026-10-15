"use client";

import { useState } from "react";
import { Check, ShieldCheck, CreditCard, Sparkles, FileText, Lock, ArrowRight, Loader2, PartyPopper } from "lucide-react";

interface PublicProposalClientProps {
  proposal: any;
  slug: string;
}

export default function PublicProposalClient({ proposal: initialProposal, slug }: PublicProposalClientProps) {
  const [proposal, setProposal] = useState(initialProposal);
  const [selectedTier, setSelectedTier] = useState<string>(
    proposal.selectedTierName || proposal.pricingTiers?.[0]?.name || ""
  );

  // E-Signature state
  const [signerName, setSignerName] = useState("");
  const [isSubmittingSign, setIsSubmittingSign] = useState(false);
  const [signSuccess, setSignSuccess] = useState(proposal.signature?.signed || false);

  // Payment state
  const [isSubmittingPay, setIsSubmittingPay] = useState(false);
  const [paySuccess, setPaySuccess] = useState(proposal.payment?.paid || false);

  const activeTierObj = proposal.pricingTiers?.find((t: any) => t.name === selectedTier) || proposal.pricingTiers?.[0];

  async function handleSignProposal(e: React.FormEvent) {
    e.preventDefault();
    if (!signerName.trim()) return;

    setIsSubmittingSign(true);

    try {
      const res = await fetch(`/api/proposals/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "sign",
          signedByName: signerName,
          signatureDataUrl: `digital_sig_${Date.now()}`,
          selectedTierName: selectedTier,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSignSuccess(true);
        if (data.proposal) setProposal(data.proposal);
      }
    } catch (err) {
      console.error("Signature failed", err);
    } finally {
      setIsSubmittingSign(false);
    }
  }

  async function handlePayment() {
    setIsSubmittingPay(true);
    try {
      const res = await fetch(`/api/proposals/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "pay",
          amount: activeTierObj?.price || 0,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setPaySuccess(true);
        if (data.proposal) setProposal(data.proposal);
      }
    } catch (err) {
      console.error("Payment failed", err);
    } finally {
      setIsSubmittingPay(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0d0111] text-white font-sans selection:bg-brand-pink selection:text-white">
      {/* Top Banner Header */}
      <header className="border-b border-white/10 bg-[#130219]/80 backdrop-blur-md sticky top-0 z-30 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-white">Closr</span>
            <span className="text-brand-pink font-black text-2xl leading-none">.</span>
            <span className="text-[10px] text-brand-lilac/40 uppercase tracking-widest font-bold ml-2 hidden sm:inline-block">
              VERIFIED PROPOSAL
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-brand-lilac/70 hidden md:inline-block">
              Prepared for <strong className="text-white">{proposal.clientCompany || proposal.clientName}</strong>
            </span>
            {paySuccess ? (
              <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold border border-green-500/30 flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4" />
                <span>CONTRACT SIGNED & DEPOSIT PAID</span>
              </span>
            ) : signSuccess ? (
              <span className="px-3 py-1 rounded-full bg-brand-pink/20 text-brand-pink text-xs font-bold border border-brand-pink/30">
                SIGNED — READY FOR DEPOSIT
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full bg-white/5 text-brand-lilac text-xs font-bold border border-white/10">
                PENDING REVIEW
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Main Proposal Container */}
      <main className="max-w-4xl mx-auto px-6 py-12 space-y-12">
        {/* Hero Title Block */}
        <div className="p-8 rounded-3xl border border-brand-purple/20 bg-linear-to-br from-[#1d0225] to-[#130219] relative overflow-hidden space-y-4">
          <div className="absolute top-0 right-0 p-8 text-brand-pink/10 pointer-events-none">
            <FileText className="h-48 w-48 -mr-12 -mt-12" />
          </div>

          <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-brand-pink text-white inline-block">
            CUSTOM PROJECT PROPOSAL
          </span>

          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            {proposal.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 pt-4 text-xs text-brand-lilac/70 border-t border-white/10">
            <div>
              <span className="block text-[9px] uppercase tracking-wider font-bold text-brand-lilac/40">Prepared For</span>
              <span className="text-white font-bold text-sm">{proposal.clientName} ({proposal.clientCompany})</span>
            </div>
            <div>
              <span className="block text-[9px] uppercase tracking-wider font-bold text-brand-lilac/40">Date Prepared</span>
              <span className="text-white font-bold text-sm">{new Date(proposal.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Section 1: Executive Summary & Problem */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-brand-pink" />
            <span>1. Problem & Context</span>
          </h2>
          <div className="p-6 rounded-2xl border border-white/5 bg-[#130219]/60 text-sm text-brand-lilac leading-relaxed whitespace-pre-wrap">
            {proposal.problemStatement}
          </div>
        </section>

        {/* Section 2: Solution Strategy */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-brand-purple" />
            <span>2. Proposed Solution Strategy</span>
          </h2>
          <div className="p-6 rounded-2xl border border-white/5 bg-[#130219]/60 text-sm text-brand-lilac leading-relaxed whitespace-pre-wrap">
            {proposal.proposedSolution}
          </div>
        </section>

        {/* Section 3: Deliverables Grid */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-brand-orange" />
            <span>3. Core Deliverables & Scope</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {proposal.deliverables?.map((deliv: string, idx: number) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-brand-purple/10 bg-[#1d0225]/40 flex items-start gap-3"
              >
                <div className="p-1 rounded-full bg-brand-pink/20 text-brand-pink shrink-0 mt-0.5">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <span className="text-xs font-semibold text-white leading-snug">{deliv}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Interactive Investment & Pricing Tiers */}
        <section className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-400" />
              <span>4. Select Investment Package</span>
            </h2>
            <p className="text-xs text-brand-lilac/70 mt-1">
              Choose the package tier that best aligns with your timeline and target impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {proposal.pricingTiers?.map((tier: any, idx: number) => {
              const isSelected = selectedTier === tier.name;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedTier(tier.name)}
                  className={`p-6 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-6 ${
                    isSelected
                      ? "border-brand-pink bg-brand-pink/10 shadow-[0_0_25px_rgba(255,6,109,0.2)] scale-[1.01]"
                      : "border-brand-purple/20 bg-[#130219]/40 hover:border-brand-purple/40"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-brand-pink">
                        {tier.recommended ? "RECOMMENDED OPTION" : `Tier ${idx + 1}`}
                      </span>
                      <input
                        type="radio"
                        name="pricingTier"
                        checked={isSelected}
                        onChange={() => setSelectedTier(tier.name)}
                        className="h-4 w-4 accent-brand-pink cursor-pointer"
                      />
                    </div>
                    <h3 className="text-xl font-black text-white">{tier.name}</h3>
                    <p className="text-xs text-brand-lilac/80">{tier.description}</p>

                    <div className="pt-2">
                      <span className="text-3xl font-black text-white">${tier.price}</span>
                      <span className="text-xs text-brand-lilac/60 ml-1 font-semibold uppercase">
                        /{tier.billingType}
                      </span>
                    </div>

                    {tier.features?.length > 0 && (
                      <div className="space-y-2 pt-4 border-t border-white/5">
                        {tier.features.map((feat: string, fIdx: number) => (
                          <div key={fIdx} className="flex items-center gap-2 text-xs text-brand-lilac">
                            <Check className="h-3.5 w-3.5 text-brand-pink shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    className={`w-full py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                      isSelected
                        ? "bg-brand-pink text-white shadow-md"
                        : "bg-white/5 text-brand-lilac hover:bg-white/10"
                    }`}
                  >
                    {isSelected ? "PACKAGE SELECTED" : "SELECT THIS PACKAGE"}
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 5: Acceptance & Digital Signature / Deposit */}
        <section className="p-8 rounded-3xl border border-brand-pink/30 bg-[#130219] space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h2 className="text-2xl font-black text-white">5. Accept & Sign Agreement</h2>
            <p className="text-xs text-brand-lilac/70 mt-1">
              Selected Package: <strong className="text-brand-pink">{selectedTier}</strong> (${activeTierObj?.price})
            </p>
          </div>

          {paySuccess ? (
            <div className="p-6 rounded-2xl bg-green-950/40 border border-green-500/40 text-center space-y-3">
              <div className="inline-flex p-3 rounded-full bg-green-500/20 text-green-400">
                <PartyPopper className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-extrabold text-white">Proposal Fully Signed & Deposit Received!</h3>
              <p className="text-xs text-green-200 max-w-md mx-auto">
                Thank you! Your agreement is locked in. We will reach out within 24 hours with your onboarding portal link and kickoff calendar invite.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Step A: Signature Form */}
              {!signSuccess ? (
                <form onSubmit={handleSignProposal} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-lilac mb-1.5">
                      Type Full Legal Name to Sign
                    </label>
                    <input
                      type="text"
                      value={signerName}
                      onChange={(e) => setSignerName(e.target.value)}
                      placeholder="e.g. David Miller"
                      className="w-full px-4 py-3 bg-[#1d0225] border border-brand-purple/20 rounded-xl text-sm font-semibold text-white placeholder-brand-lilac/40 focus:border-brand-pink outline-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingSign}
                    className="w-full py-4 rounded-xl bg-linear-to-r from-brand-pink to-brand-purple text-xs font-black uppercase text-white hover:opacity-95 transition-all shadow-[0_0_20px_rgba(255,6,109,0.3)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmittingSign ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>PROCESSING DIGITAL SIGNATURE...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="h-4.5 w-4.5" />
                        <span>SIGN & ACCEPT PROPOSAL</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                /* Step B: Payment Checkout Deposit */
                <div className="space-y-4 p-6 rounded-2xl bg-brand-pink/5 border border-brand-pink/20">
                  <div className="flex items-center gap-2 text-green-400 font-bold text-xs">
                    <Check className="h-4 w-4" />
                    <span>Signed by {proposal.signature?.signedByName || signerName}</span>
                  </div>

                  <div className="flex items-center justify-between py-3 border-y border-white/10">
                    <div>
                      <span className="text-xs font-bold text-white block">Initial Deposit Due</span>
                      <span className="text-[10px] text-brand-lilac/60">Locks in Project Kickoff Slot</span>
                    </div>
                    <span className="text-2xl font-black text-white">${activeTierObj?.price}</span>
                  </div>

                  <button
                    onClick={handlePayment}
                    disabled={isSubmittingPay}
                    className="w-full py-4 rounded-xl bg-green-500 text-black text-xs font-black uppercase tracking-wider hover:bg-green-400 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(34,197,94,0.3)] disabled:opacity-50"
                  >
                    {isSubmittingPay ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>PROCESSING STRIPE PAYMENT...</span>
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-4.5 w-4.5" />
                        <span>PAY ${activeTierObj?.price} DEPOSIT NOW</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
