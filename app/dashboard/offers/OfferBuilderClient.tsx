"use client";

import { useState, useEffect } from "react";
import { Sparkles, Plus, Check, DollarSign, Layers, ArrowRight, Save, Loader2, PackageCheck } from "lucide-react";

export default function OfferBuilderClient() {
  const [offers, setOffers] = useState<any[]>([]);
  const [loadingOffers, setLoadingOffers] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState("");

  // Form input state
  const [category, setCategory] = useState("Consulting & Strategy");
  const [targetAudience, setTargetAudience] = useState("B2B SaaS Founders ($500K-$2M ARR)");
  const [coreProblem, setCoreProblem] = useState("High lead churn, inefficient discovery calls, slow deal closing cycles.");
  const [expertise, setExpertise] = useState("Sales architecture, CRM workflow optimization, value-based pricing strategy");
  const [priceRange, setPriceRange] = useState("$2,500 - $10,000");

  // Generated draft state
  const [generatedOffer, setGeneratedOffer] = useState<any>(null);

  useEffect(() => {
    fetchOffers();
  }, []);

  async function fetchOffers() {
    try {
      setLoadingOffers(true);
      const res = await fetch("/api/offers");
      const data = await res.json();
      if (res.ok) {
        setOffers(data.offers || []);
      }
    } catch (err) {
      console.error("Failed to fetch offers", err);
    } finally {
      setLoadingOffers(false);
    }
  }

  async function handleGenerateOffer(e: React.FormEvent) {
    e.preventDefault();
    setIsGenerating(true);
    setError("");
    setSaveSuccess(false);

    try {
      const res = await fetch("/api/offers/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category,
          targetAudience,
          coreProblem,
          expertise,
          priceRange,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to generate offer framework");
      }

      setGeneratedOffer(data.offer);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsGenerating(false);
    }
  }

  async function handleSaveOffer() {
    if (!generatedOffer) return;
    setIsSaving(true);
    setError("");

    try {
      const res = await fetch("/api/offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: generatedOffer.title,
          category,
          targetAudience,
          coreProblem,
          uniqueApproach: generatedOffer.uniqueApproach,
          packages: generatedOffer.packages,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to save offer");
      }

      setSaveSuccess(true);
      fetchOffers();
    } catch (err: any) {
      setError(err.message || "Failed to save offer");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <main className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-brand-purple/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-brand-pink text-xs font-bold uppercase tracking-wider">
            <Sparkles className="h-4 w-4" />
            <span>Module 1</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white mt-1">AI Offer Builder</h1>
          <p className="text-xs text-brand-lilac/70 mt-1">
            Transform raw expertise into clear, high-converting 3-tier offer packages.
          </p>
        </div>
      </div>

      {/* Grid: Form Input + AI Generated Offer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Intake Wizard */}
        <div className="lg:col-span-5 p-6 rounded-2xl border border-brand-purple/10 bg-[#130219]/40 space-y-5">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <span>Offer Parameters</span>
          </h2>

          <form onSubmit={handleGenerateOffer} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-lilac/70 mb-1.5">
                Service Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#1d0225] border border-brand-purple/10 rounded-xl text-xs text-white focus:border-brand-pink outline-none"
              >
                <option value="Consulting & Strategy">Consulting & Strategy</option>
                <option value="Freelance Development / Design">Freelance Development / Design</option>
                <option value="Executive / Business Coaching">Executive / Business Coaching</option>
                <option value="Digital Agency Services">Digital Agency Services</option>
                <option value="Creator / Advisory Services">Creator / Advisory Services</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-lilac/70 mb-1.5">
                Target Client Persona
              </label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="e.g. B2B SaaS Founders ($500K-$2M ARR)"
                className="w-full px-3.5 py-2.5 bg-[#1d0225] border border-brand-purple/10 rounded-xl text-xs text-white placeholder-brand-lilac/40 focus:border-brand-pink outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-lilac/70 mb-1.5">
                Core Problem Solved
              </label>
              <textarea
                value={coreProblem}
                onChange={(e) => setCoreProblem(e.target.value)}
                rows={2}
                placeholder="e.g. High lead churn, slow proposal cycles"
                className="w-full px-3.5 py-2.5 bg-[#1d0225] border border-brand-purple/10 rounded-xl text-xs text-white placeholder-brand-lilac/40 focus:border-brand-pink outline-none resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-lilac/70 mb-1.5">
                Your Primary Skills & Methodologies
              </label>
              <textarea
                value={expertise}
                onChange={(e) => setExpertise(e.target.value)}
                rows={2}
                placeholder="e.g. Sales architecture, custom software build"
                className="w-full px-3.5 py-2.5 bg-[#1d0225] border border-brand-purple/10 rounded-xl text-xs text-white placeholder-brand-lilac/40 focus:border-brand-pink outline-none resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-lilac/70 mb-1.5">
                Target Price Tier
              </label>
              <input
                type="text"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                placeholder="e.g. $2,500 - $10,000"
                className="w-full px-3.5 py-2.5 bg-[#1d0225] border border-brand-purple/10 rounded-xl text-xs text-white placeholder-brand-lilac/40 focus:border-brand-pink outline-none"
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
                  <span>AI IS ARCHITECTING OFFER...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>GENERATE OFFER FRAMEWORK</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: AI Offer Output Display */}
        <div className="lg:col-span-7 space-y-6">
          {generatedOffer ? (
            <div className="p-6 rounded-2xl border border-brand-pink/30 bg-[#130219]/60 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-pink">
                    AI Generated Suite
                  </span>
                  <h3 className="text-xl font-extrabold text-white mt-0.5">{generatedOffer.title}</h3>
                  <p className="text-xs text-brand-lilac/80 mt-1 italic">"{generatedOffer.uniqueApproach}"</p>
                </div>
                <button
                  onClick={handleSaveOffer}
                  disabled={isSaving || saveSuccess}
                  className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 shrink-0 cursor-pointer transition-all ${
                    saveSuccess
                      ? "bg-green-600 text-white"
                      : "bg-brand-pink text-white hover:bg-opacity-90"
                  }`}
                >
                  {isSaving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : saveSuccess ? (
                    <>
                      <PackageCheck className="h-4 w-4" />
                      <span>SAVED TO LIBRARY</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      <span>SAVE TO LIBRARY</span>
                    </>
                  )}
                </button>
              </div>

              {/* 3 Tier Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {generatedOffer.packages?.map((pkg: any, idx: number) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border flex flex-col justify-between space-y-4 ${
                      idx === 1
                        ? "border-brand-pink bg-brand-pink/10 shadow-[0_0_15px_rgba(255,6,109,0.15)]"
                        : "border-brand-purple/20 bg-[#1d0225]/40"
                    }`}
                  >
                    <div>
                      <span className="text-[9px] font-bold uppercase text-brand-orange tracking-wider">
                        {pkg.positioning || `Tier ${idx + 1}`}
                      </span>
                      <h4 className="text-sm font-bold text-white mt-1">{pkg.name}</h4>
                      <p className="text-[11px] text-brand-lilac/70 mt-1">{pkg.tagline}</p>

                      <div className="my-3">
                        <span className="text-2xl font-black text-white">${pkg.price}</span>
                        <span className="text-[10px] text-brand-lilac/60 font-semibold block uppercase">
                          {pkg.billingType}
                        </span>
                      </div>

                      {/* Deliverables list */}
                      <div className="space-y-1.5 pt-2 border-t border-white/5">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-brand-lilac/50 block">
                          Included Deliverables
                        </span>
                        {pkg.deliverables?.map((d: string, dIdx: number) => (
                          <div key={dIdx} className="flex items-start gap-1.5 text-[10px] text-brand-lilac">
                            <Check className="h-3 w-3 text-brand-pink shrink-0 mt-0.5" />
                            <span>{d}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {pkg.estimatedROI && (
                      <div className="p-2.5 rounded-lg bg-brand-purple/20 text-[10px] text-brand-lilac font-medium">
                        <span className="text-brand-pink font-bold block">Expected Impact:</span>
                        {pkg.estimatedROI}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-12 rounded-2xl border border-dashed border-brand-purple/20 bg-[#130219]/20 text-center flex flex-col items-center justify-center space-y-3">
              <div className="p-4 rounded-full bg-brand-purple/10 text-brand-pink">
                <Sparkles className="h-8 w-8" />
              </div>
              <h3 className="text-base font-bold text-white">No Offer Draft Generated Yet</h3>
              <p className="text-xs text-brand-lilac/60 max-w-sm">
                Fill out your service parameters on the left and click "Generate Offer Framework" to architect your 3-tier offer packages.
              </p>
            </div>
          )}

          {/* Saved Offers Library */}
          <div className="p-6 rounded-2xl border border-brand-purple/10 bg-[#130219]/40 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center justify-between">
              <span>Saved Offer Library</span>
              <span className="text-xs text-brand-lilac/50 font-normal">{offers.length} Offers</span>
            </h3>

            {loadingOffers ? (
              <div className="flex items-center gap-2 text-xs text-brand-lilac py-4">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Loading saved offers...</span>
              </div>
            ) : offers.length === 0 ? (
              <p className="text-xs text-brand-lilac/50 py-2">No saved offers found in your library.</p>
            ) : (
              <div className="space-y-3">
                {offers.map((offer) => (
                  <div
                    key={offer._id}
                    className="p-4 rounded-xl border border-brand-purple/10 bg-[#1d0225]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-brand-purple/30 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-brand-pink/20 text-brand-pink uppercase tracking-wide">
                          {offer.category}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-white mt-1">{offer.title}</h4>
                      <p className="text-[10px] text-brand-lilac/60 mt-0.5">
                        Target: {offer.targetAudience} • {offer.packages?.length || 0} Package Tiers
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] font-bold text-white">
                      {offer.packages?.map((p: any, pIdx: number) => (
                        <span key={pIdx} className="px-2 py-1 rounded bg-white/5 border border-white/5">
                          ${p.price}
                        </span>
                      ))}
                    </div>
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
