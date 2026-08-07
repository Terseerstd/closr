"use client";

import Link from "next/link";
import { Play, Sparkles, TrendingUp, DollarSign, ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-32 lg:pt-36 bg-brand-dark">
      {/* Background radial glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-radial from-brand-pink/15 via-brand-purple/5 to-transparent blur-[80px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-[300px] h-[300px] rounded-full bg-radial from-brand-purple/10 to-transparent blur-[60px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-8 text-center z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-pink/30 bg-brand-pink/5 px-4 py-1.5 text-xs font-semibold tracking-wider text-brand-pink uppercase mb-8 animate-fade-in">
          {/* <Sparkles className="h-3.5 w-3.5" /> */}
          <span>Revenue Intelligence Platform</span>
        </div>

        {/* Heading */}
        <h1 className="mx-auto max-w-4xl text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-8">
          Every expert should be able to build a thriving service business without becoming a{" "}
          <span className="relative inline-block px-4 py-1 mx-1 whitespace-nowrap bg-brand-pink text-white rounded-xl shadow-[0_0_30px_rgba(255,6,109,0.5)] transform -rotate-1 select-none hover-shake cursor-default">
            sales expert.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed text-brand-lilac mb-10">
          Meet Closr: scale your expertise into visual, automated proposals and close deals with your AI copilot.
          Let your custom sales model close like the top 1% of sales teams.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <Link
            href="/login"
            className="flex h-14 w-full sm:w-auto items-center justify-center rounded-full bg-brand-pink px-8 text-sm font-semibold text-white transition-all hover:bg-opacity-95 hover:scale-[1.02] shadow-[0_0_25px_rgba(255,0,123,0.4)] active:scale-[0.98]"
          >
            Start Free
          </Link>
          <Link
            href="#demo"
            className="flex h-14 w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:border-white/20 active:scale-[0.98]"
          >
            <Play className="h-4 w-4 fill-white" />
            <span>Book a 1:1 session</span>
          </Link>
        </div>

        {/* Dashboard Monitor Mockup */}
        <div id="dashboard" className="relative mx-auto max-w-4xl px-4 md:px-0 transition-transform duration-700 hover:scale-[1.01]">
          {/* Monitor Screen Frame */}
          <div className="relative rounded-2xl border border-white/10 bg-[#0e0214] p-2.5 md:p-4 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(138,43,226,0.15)] overflow-hidden">
            {/* Screen inner glass gloss */}
            <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/[0.02] to-transparent pointer-events-none z-10" />

            {/* Dashboard Inner Application UI */}
            <div className="rounded-xl bg-[#0f0417] text-left border border-white/5 overflow-hidden font-sans">
              {/* Window Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#13061f] border-b border-white/5">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="text-[11px] font-medium text-white/40 tracking-wider">closr.app/dashboard</div>
                <div className="w-12" />
              </div>

              {/* Application Layout */}
              <div className="flex h-[280px] md:h-[400px]">
                {/* Mini Sidebar */}
                <div className="hidden sm:flex flex-col gap-4 w-40 border-r border-white/5 p-4 bg-[#11051b]">
                  <div className="flex items-center gap-2 text-xs font-bold text-white mb-2">
                    <div className="w-4 h-4 rounded bg-brand-pink flex items-center justify-center text-[10px]">C</div>
                    <span>Closr Admin</span>
                  </div>
                  <div className="flex flex-col gap-1.5 text-xs text-brand-lilac">
                    <div className="px-2 py-1.5 rounded bg-white/5 text-white font-medium">Dashboard</div>
                    <div className="px-2 py-1.5 rounded hover:bg-white/5 hover:text-white transition-colors cursor-pointer">Deals</div>
                    <div className="px-2 py-1.5 rounded hover:bg-white/5 hover:text-white transition-colors cursor-pointer">Proposals</div>
                    <div className="px-2 py-1.5 rounded hover:bg-white/5 hover:text-white transition-colors cursor-pointer">AI Copilot</div>
                    <div className="px-2 py-1.5 rounded hover:bg-white/5 hover:text-white transition-colors cursor-pointer">Billing</div>
                  </div>
                </div>

                {/* Main Content Pane */}
                <div className="flex-1 p-4 md:p-6 overflow-hidden flex flex-col gap-4">
                  {/* Top Stats Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="p-3 rounded-lg border border-white/5 bg-[#170924]/60">
                      <div className="text-[10px] text-brand-lilac uppercase tracking-wider font-semibold">Revenue Dashboard</div>
                      <div className="text-base md:text-xl font-bold text-white mt-1">$243,850.00</div>
                      <div className="text-[9px] text-green-400 flex items-center gap-0.5 mt-0.5">
                        <TrendingUp className="h-3 w-3" />
                        <span>+28% vs last month</span>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg border border-white/5 bg-[#170924]/60">
                      <div className="text-[10px] text-brand-lilac uppercase tracking-wider font-semibold">Active Pipelines</div>
                      <div className="text-base md:text-xl font-bold text-white mt-1">18 Deals</div>
                      <div className="text-[9px] text-brand-pink flex items-center gap-0.5 mt-0.5">
                        <span>4 ending this week</span>
                      </div>
                    </div>
                    <div className="hidden md:block p-3 rounded-lg border border-white/5 bg-[#170924]/60">
                      <div className="text-[10px] text-brand-lilac uppercase tracking-wider font-semibold">AI Copilot Score</div>
                      <div className="text-base md:text-xl font-bold text-white mt-1">98.2% Accuracy</div>
                      <div className="text-[9px] text-brand-lilac flex items-center gap-0.5 mt-0.5">
                        <span>Top 1% conversion</span>
                      </div>
                    </div>
                  </div>

                  {/* Chart and Activity Grid */}
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 min-h-0">
                    {/* Main Chart Area */}
                    <div className="md:col-span-2 rounded-lg border border-white/5 bg-[#140620]/80 p-3 flex flex-col min-h-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-semibold text-white/70">Conversion Velocity</span>
                        <span className="text-[9px] text-brand-lilac">Last 6 Months</span>
                      </div>

                      {/* Chart Graphic SVG */}
                      <div className="flex-1 w-full relative">
                        <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#ff007b" stopOpacity="0.25" />
                              <stop offset="100%" stopColor="#8a2be2" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                          {/* Grid Lines */}
                          <line x1="0" y1="10" x2="100" y2="10" stroke="white" strokeWidth="0.05" strokeDasharray="1,2" opacity="0.1" />
                          <line x1="0" y1="20" x2="100" y2="20" stroke="white" strokeWidth="0.05" strokeDasharray="1,2" opacity="0.1" />
                          <line x1="0" y1="30" x2="100" y2="30" stroke="white" strokeWidth="0.05" strokeDasharray="1,2" opacity="0.1" />

                          {/* Filled Area */}
                          <path
                            d="M0 38 Q 20 32, 35 22 T 70 14 T 100 6 L 100 40 L 0 40 Z"
                            fill="url(#chart-grad)"
                          />
                          {/* Line Path */}
                          <path
                            d="M0 38 Q 20 32, 35 22 T 70 14 T 100 6"
                            fill="none"
                            stroke="#ff007b"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                          {/* Data points */}
                          <circle cx="35" cy="22" r="1" fill="#fff" stroke="#ff007b" strokeWidth="0.5" />
                          <circle cx="70" cy="14" r="1" fill="#fff" stroke="#ff007b" strokeWidth="0.5" />
                          <circle cx="100" cy="6" r="1.5" fill="#fff" stroke="#ff007b" strokeWidth="0.5" />
                        </svg>

                        {/* Hover Data Tag */}
                        <div className="absolute top-2 right-12 bg-brand-pink text-[8px] font-bold text-white px-1.5 py-0.5 rounded shadow-lg flex items-center gap-1 animate-pulse">
                          <span>Active</span>
                          <span className="font-extrabold">+44%</span>
                        </div>
                      </div>
                    </div>

                    {/* Copilot Log Section */}
                    <div className="rounded-lg border border-white/5 bg-[#140620]/80 p-3 flex flex-col justify-between min-h-0 text-[10px]">
                      <div>
                        <span className="font-semibold text-white/70 block mb-2">AI Copilot Analysis</span>
                        <div className="space-y-2">
                          <div className="p-1.5 rounded bg-white/5 border-l-2 border-brand-pink">
                            <span className="font-medium text-white block">Objection Solved</span>
                            <span className="text-brand-lilac text-[9px]">Custom scope recommendation accepted.</span>
                          </div>
                          <div className="p-1.5 rounded bg-white/5 border-l-2 border-brand-purple">
                            <span className="font-medium text-white block">Proposal Drafted</span>
                            <span className="text-brand-lilac text-[9px]">14-page custom contract ready to review.</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[9px] text-brand-pink font-semibold">
                        <span>Ask Copilot for tips</span>
                        <ArrowUpRight className="h-3 w-3" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Monitor Stand Graphic (Trapezoidal 3D mockup) */}
          <div className="relative mx-auto w-32 h-10 bg-linear-to-b from-brand-card to-brand-lowest border-x border-white/10 shadow-lg pointer-events-none" />
          <div className="relative mx-auto w-48 h-3 bg-linear-to-b from-brand-low to-brand-dark border border-white/10 rounded-t-lg shadow-xl pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
