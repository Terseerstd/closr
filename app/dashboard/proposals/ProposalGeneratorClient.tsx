"use client";

import { useState, useEffect } from "react";
import { DollarSign, Sparkles, FileText, ExternalLink, Loader2, Check, Send, Eye } from "lucide-react";
import Link from "next/link";

export default function ProposalGeneratorClient() {
  const [proposals, setProposals] = useState<any[]>([]);
  const [offers, setOffers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [publishedUrl, setPublishedUrl] = useState("");
  const [error, setError] = useState("");

  // Input fields
  const [clientName, setClientName] = useState("David Miller");
  const [clientCompany, setClientCompany] = useState("Apex Digital Group");
  const [clientEmail, setClientEmail] = useState("david@apexdigital.com");
  const [selectedOfferId, setSelectedOfferId] = useState("");
  const [discoveryNotes, setDiscoveryNotes] = useState(
    "Apex is currently losing 40% of their proposals due to slow turnaround (takes them 5 days to write proposals manually). Client needs standardized sales infrastructure, automated proposal delivery, and CRM pipeline tracking. Budget is around $5K-$8K for full setup."
  );

  // Draft generated state
  const [draftProposal, setDraftProposal] = useState<any>(null);

  useEffect(() => {
    fetchInitialData();
  }, []);

  async function fetchInitialData() {
    try {
      setLoading(true);
      const [pRes, oRes] = await Promise.all([
        fetch("/api/proposals"),
        fetch("/api/offers"),
      ]);

      const pData = await pRes.json();
      const oData = await oRes.json();

      if (pRes.ok) setProposals(pData.proposals || []);
      if (oRes.ok) setOffers(oData.offers || []);
    } catch (err) {
      console.error("Failed to load initial data", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleGenerateProposal(e: React.FormEvent) {
    e.preventDefault();
    setIsGenerating(true);
    setError("");
    setPublishedUrl("");

    const selectedOfferObj = offers.find((o) => o._id === selectedOfferId);

    try {
      const res = await fetch("/api/proposals/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName,
          clientCompany,
          clientEmail,
          discoveryNotes,
          selectedOffer: selectedOfferObj,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate proposal");

      setDraftProposal(data.proposalData);
    } catch (err: any) {
      setError(err.message || "Failed to generate AI proposal");
    } finally {
      setIsGenerating(false);
    }
  }

  async function handleSaveAndPublish() {
    if (!draftProposal) return;
    setIsSaving(true);
    setError("");

    try {
      const res = await fetch("/api/proposals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          offerId: selectedOfferId || undefined,
          title: draftProposal.title,
          clientName,
          clientCompany,
          clientEmail,
          problemStatement: draftProposal.problemStatement,
          proposedSolution: draftProposal.proposedSolution,
          deliverables: draftProposal.deliverables,
          pricingTiers: draftProposal.pricingTiers,
          roiStatement: draftProposal.roiStatement,
          nextSteps: draftProposal.nextSteps,
          status: "sent",
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to publish proposal");

      setPublishedUrl(data.publicUrl);
      fetchInitialData();
    } catch (err: any) {
      setError(err.message || "Failed to publish proposal");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <main className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-brand-purple/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-brand-pink text-xs font-bold uppercase tracking-wider">
            <DollarSign className="h-4 w-4" />
            <span>Module 4</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white mt-1">AI Proposal Generator</h1>
          <p className="text-xs text-brand-lilac/70 mt-1">
            Turn discovery call notes into live, investor-grade sales proposals that convert 2-3x faster.
          </p>
        </div>
      </div>

      {/* Grid: Inputs + Draft Proposal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Intake Brief */}
        <div className="lg:col-span-5 p-6 rounded-2xl border border-brand-purple/10 bg-[#130219]/40 space-y-5">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <span>Discovery Brief</span>
          </h2>

          <form onSubmit={handleGenerateProposal} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-lilac/70 mb-1.5">
                Client Name
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="e.g. David Miller"
                className="w-full px-3.5 py-2.5 bg-[#1d0225] border border-brand-purple/10 rounded-xl text-xs text-white placeholder-brand-lilac/40 focus:border-brand-pink outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-lilac/70 mb-1.5">
                Client Company
              </label>
              <input
                type="text"
                value={clientCompany}
                onChange={(e) => setClientCompany(e.target.value)}
                placeholder="e.g. Apex Digital Group"
                className="w-full px-3.5 py-2.5 bg-[#1d0225] border border-brand-purple/10 rounded-xl text-xs text-white placeholder-brand-lilac/40 focus:border-brand-pink outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-lilac/70 mb-1.5">
                Client Email
              </label>
              <input
                type="email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                placeholder="e.g. david@apexdigital.com"
                className="w-full px-3.5 py-2.5 bg-[#1d0225] border border-brand-purple/10 rounded-xl text-xs text-white placeholder-brand-lilac/40 focus:border-brand-pink outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-lilac/70 mb-1.5">
                Link Saved Offer (Optional)
              </label>
              <select
                value={selectedOfferId}
                onChange={(e) => setSelectedOfferId(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#1d0225] border border-brand-purple/10 rounded-xl text-xs text-white focus:border-brand-pink outline-none"
              >
                <option value="">Custom Proposal (No base offer)</option>
                {offers.map((o) => (
                  <option key={o._id} value={o._id}>
                    {o.title} ({o.category})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-lilac/70 mb-1.5">
                Discovery Call Notes / Problem Summary
              </label>
              <textarea
                value={discoveryNotes}
                onChange={(e) => setDiscoveryNotes(e.target.value)}
                rows={4}
                placeholder="Paste raw notes from your discovery call..."
                className="w-full px-3.5 py-2.5 bg-[#1d0225] border border-brand-purple/10 rounded-xl text-xs text-white placeholder-brand-lilac/40 focus:border-brand-pink outline-none resize-none"
                required
              />
            </div>

            {error && <p className="text-xs text-rose-400 font-medium">{error}</p>}

            <button
              type="submit"
              disabled={isGenerating}
              className="w-full py-3.5 rounded-xl bg-linear-to-r from-brand-pink to-brand-purple text-xs font-extrabold text-white hover:opacity-95 transition-all shadow-[0_0_20px_rgba(255,6,109,0.3)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>DRAFTING PROPOSAL WITH AI...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>DRAFT HIGH-CONVERTING PROPOSAL</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: AI Proposal Preview */}
        <div className="lg:col-span-7 space-y-6">
          {draftProposal ? (
            <div className="p-6 rounded-2xl border border-brand-pink/30 bg-[#130219]/60 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-pink">
                    AI Generated Draft Proposal
                  </span>
                  <h3 className="text-lg font-extrabold text-white mt-0.5">{draftProposal.title}</h3>
                  <p className="text-xs text-brand-lilac/70">Prepared for {clientCompany}</p>
                </div>
                <button
                  onClick={handleSaveAndPublish}
                  disabled={isSaving || !!publishedUrl}
                  className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 shrink-0 cursor-pointer transition-all ${
                    publishedUrl ? "bg-green-600 text-white" : "bg-brand-pink text-white hover:bg-opacity-90"
                  }`}
                >
                  {isSaving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : publishedUrl ? (
                    <>
                      <Check className="h-4 w-4" />
                      <span>PUBLISHED LIVE</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>PUBLISH & GENERATE LIVE LINK</span>
                    </>
                  )}
                </button>
              </div>

              {publishedUrl && (
                <div className="p-3.5 rounded-xl bg-green-950/40 border border-green-500/30 flex items-center justify-between gap-4">
                  <div className="text-xs text-green-300 font-medium truncate">
                    Live Proposal URL: <span className="underline font-mono">{publishedUrl}</span>
                  </div>
                  <Link
                    href={publishedUrl}
                    target="_blank"
                    className="px-3 py-1.5 rounded-lg bg-green-500 text-black font-extrabold text-[10px] uppercase flex items-center gap-1 shrink-0"
                  >
                    <span>OPEN LINK</span>
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>
              )}

              {/* Sections */}
              <div className="space-y-4 text-xs text-brand-lilac leading-relaxed">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-brand-orange mb-1">
                    Problem Statement
                  </h4>
                  <p className="bg-[#1d0225]/40 p-3 rounded-xl border border-white/5 whitespace-pre-wrap">
                    {draftProposal.problemStatement}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-brand-pink mb-1">
                    Proposed Solution Strategy
                  </h4>
                  <p className="bg-[#1d0225]/40 p-3 rounded-xl border border-white/5 whitespace-pre-wrap">
                    {draftProposal.proposedSolution}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-2">
                    Scope of Deliverables
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {draftProposal.deliverables?.map((d: string, idx: number) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-lg bg-[#1d0225]/60 border border-brand-purple/20 flex items-start gap-2"
                      >
                        <Check className="h-3.5 w-3.5 text-brand-pink shrink-0 mt-0.5" />
                        <span className="text-white text-[11px] font-medium">{d}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-2">
                    Investment Options
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {draftProposal.pricingTiers?.map((tier: any, idx: number) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-xl border ${
                          tier.recommended
                            ? "border-brand-pink bg-brand-pink/10"
                            : "border-brand-purple/20 bg-[#1d0225]/40"
                        }`}
                      >
                        {tier.recommended && (
                          <span className="text-[9px] font-black uppercase text-brand-pink tracking-wider">
                            RECOMMENDED TIER
                          </span>
                        )}
                        <h5 className="text-sm font-bold text-white mt-0.5">{tier.name}</h5>
                        <div className="my-2">
                          <span className="text-xl font-black text-white">${tier.price}</span>
                          <span className="text-[9px] text-brand-lilac/60 ml-1 uppercase">({tier.billingType})</span>
                        </div>
                        <p className="text-[11px] text-brand-lilac/80">{tier.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 rounded-2xl border border-dashed border-brand-purple/20 bg-[#130219]/20 text-center flex flex-col items-center justify-center space-y-3">
              <div className="p-4 rounded-full bg-brand-purple/10 text-brand-pink">
                <FileText className="h-8 w-8" />
              </div>
              <h3 className="text-base font-bold text-white">No Proposal Drafted Yet</h3>
              <p className="text-xs text-brand-lilac/60 max-w-sm">
                Enter your client information and discovery notes on the left to generate an investor-quality proposal.
              </p>
            </div>
          )}

          {/* Published Proposals List */}
          <div className="p-6 rounded-2xl border border-brand-purple/10 bg-[#130219]/40 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center justify-between">
              <span>Proposals Dashboard</span>
              <span className="text-xs text-brand-lilac/50 font-normal">{proposals.length} Proposals</span>
            </h3>

            {loading ? (
              <div className="flex items-center gap-2 text-xs text-brand-lilac py-4">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Loading proposals...</span>
              </div>
            ) : proposals.length === 0 ? (
              <p className="text-xs text-brand-lilac/50 py-2">No active proposals sent yet.</p>
            ) : (
              <div className="space-y-3">
                {proposals.map((p) => (
                  <div
                    key={p._id}
                    className="p-4 rounded-xl border border-brand-purple/10 bg-[#1d0225]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-brand-purple/30 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide ${
                            p.status === "signed" || p.status === "paid"
                              ? "bg-green-500/20 text-green-400"
                              : p.status === "viewed"
                              ? "bg-brand-pink/20 text-brand-pink"
                              : "bg-white/10 text-brand-lilac"
                          }`}
                        >
                          {p.status}
                        </span>
                        <span className="text-[10px] text-brand-lilac/40">
                          {p.analytics?.opensCount || 0} views
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-white mt-1">{p.title}</h4>
                      <p className="text-[10px] text-brand-lilac/60 mt-0.5">
                        Client: {p.clientName} ({p.clientCompany})
                      </p>
                    </div>

                    <Link
                      href={`/proposal/${p.publicSlug}`}
                      target="_blank"
                      className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-white hover:bg-white/10 flex items-center gap-1.5 shrink-0"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>VIEW PROPOSAL</span>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
