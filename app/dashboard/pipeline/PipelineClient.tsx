"use client";

import { useState, useEffect } from "react";
import { Briefcase, Eye, Loader2, Sparkles, ExternalLink, Plus } from "lucide-react";
import Link from "next/link";

export default function PipelineClient() {
  const [proposals, setProposals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProposals();
  }, []);

  async function fetchProposals() {
    try {
      setLoading(true);
      const res = await fetch("/api/proposals");
      const data = await res.json();
      if (res.ok) {
        setProposals(data.proposals || []);
      }
    } catch (err) {
      console.error("Failed to fetch proposals for pipeline", err);
    } finally {
      setLoading(false);
    }
  }

  // Kanban Column Categories
  const columns = [
    { key: "draft", label: "Incoming / Draft", color: "border-brand-purple/30 text-brand-lilac" },
    { key: "sent", label: "Proposal Sent", color: "border-brand-orange/40 text-brand-orange" },
    { key: "viewed", label: "Viewed (High Intent)", color: "border-brand-pink/50 text-brand-pink" },
    { key: "signed", label: "Signed Agreement", color: "border-green-500/50 text-green-400" },
    { key: "paid", label: "Paid & Closed", color: "border-emerald-400 text-emerald-400" },
  ];

  return (
    <main className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-brand-purple/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-brand-pink text-xs font-bold uppercase tracking-wider">
            <Briefcase className="h-4 w-4" />
            <span>Deal Pipeline</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white mt-1">Kanban Revenue Pipeline</h1>
          <p className="text-xs text-brand-lilac/70 mt-1">
            Track lead velocity, proposal views, and closed revenue in real-time.
          </p>
        </div>

        <Link
          href="/dashboard/proposals"
          className="px-4 py-2.5 rounded-xl bg-brand-pink text-white text-xs font-bold flex items-center gap-2 hover:bg-opacity-90 transition-all shadow-[0_0_15px_rgba(255,6,109,0.3)] self-start md:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>NEW PROPOSAL</span>
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-xs text-brand-lilac py-12 justify-center">
          <Loader2 className="h-5 w-5 animate-spin text-brand-pink" />
          <span>Loading live pipeline deals...</span>
        </div>
      ) : (
        /* Kanban Board Grid */
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start overflow-x-auto pb-6">
          {columns.map((col) => {
            const columnDeals = proposals.filter((p) => p.status === col.key);

            return (
              <div
                key={col.key}
                className="p-4 rounded-2xl border border-brand-purple/10 bg-[#130219]/40 space-y-4 min-w-[240px]"
              >
                {/* Column Title */}
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <span className={`text-xs font-extrabold uppercase tracking-wider ${col.color}`}>
                    {col.label}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-white/5 text-[10px] font-black text-white">
                    {columnDeals.length}
                  </span>
                </div>

                {/* Cards List */}
                <div className="space-y-3">
                  {columnDeals.length === 0 ? (
                    <div className="p-6 rounded-xl border border-dashed border-white/5 text-center text-[10px] text-brand-lilac/40">
                      No deals in stage
                    </div>
                  ) : (
                    columnDeals.map((deal) => (
                      <div
                        key={deal._id}
                        className="p-4 rounded-xl border border-brand-purple/15 bg-[#1d0225]/60 hover:border-brand-pink/40 transition-all space-y-3 shadow-md group"
                      >
                        <div>
                          <span className="text-[9px] font-bold uppercase tracking-wider text-brand-orange">
                            {deal.clientCompany || "Private Client"}
                          </span>
                          <h4 className="text-xs font-bold text-white mt-0.5 group-hover:text-brand-pink transition-colors">
                            {deal.title}
                          </h4>
                          <p className="text-[10px] text-brand-lilac/60 mt-0.5">{deal.clientName}</p>
                        </div>

                        {/* Price & Views */}
                        <div className="flex items-center justify-between text-[10px] pt-2 border-t border-white/5 text-brand-lilac/80">
                          <span className="font-bold text-white">
                            ${deal.pricingTiers?.[0]?.price || "Custom"}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3 text-brand-pink" />
                            {deal.analytics?.opensCount || 0} views
                          </span>
                        </div>

                        {/* Action Link */}
                        <Link
                          href={`/proposal/${deal.publicSlug}`}
                          target="_blank"
                          className="w-full py-1.5 rounded-lg bg-white/5 hover:bg-brand-pink hover:text-white text-[10px] font-extrabold text-brand-lilac flex items-center justify-center gap-1 transition-all"
                        >
                          <span>OPEN PROPOSAL</span>
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
