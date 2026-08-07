import {
  Sparkles,
  Layers,
  FileCheck,
  Compass,
  DollarSign,
  Zap,
  CheckCircle,
  Plus
} from "lucide-react";

export default function Features() {
  return (
    <section id="features" className="relative py-24 md:py-32 bg-brand-dark overflow-hidden">
      <div className="absolute top-1/3 right-1/4 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-radial from-brand-pink/5 to-transparent blur-[90px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-6">
            Revenue infrastructure for experts
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-brand-lilac leading-relaxed">
            Everything you need to package, propose, sign, and collect payments in one automated pipeline.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: e-Offer Builder (2/3 width) */}
          <div className="col-span-1 md:col-span-2 rounded-2xl border border-white/5 bg-brand-card/30 p-6 md:p-8 flex flex-col md:flex-row justify-between gap-6 overflow-hidden transition-all duration-300 hover:border-brand-pink/20 hover:shadow-[0_8px_30px_rgba(255,6,109,0.05)]">
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-pink/10 text-brand-pink mb-6">
                  <Layers className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">e-Offer Builder</h3>
                <p className="text-sm leading-relaxed text-brand-lilac/80">
                  Standardize your custom services and pricing. Create modular deliverables that you can drag-and-drop into any proposal in seconds.
                </p>
              </div>
              <ul className="mt-6 space-y-2 text-xs text-brand-lilac/70">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3.5 w-3.5 text-brand-pink" />
                  <span>Interactive product lists</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3.5 w-3.5 text-brand-pink" />
                  <span>Automated scope tiering</span>
                </li>
              </ul>
            </div>
            
            {/* Visual Widget Mockup */}
            <div className="flex-1 bg-brand-lowest rounded-xl border border-white/5 p-4 flex flex-col gap-3 w-full md:min-w-[240px]">
              <span className="text-[10px] uppercase font-bold tracking-wider text-white/40">Custom Deliverable</span>
              <div className="p-3 rounded-lg bg-brand-card border border-white/5">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-white">Ad Campaign Setup</span>
                  <span className="text-xs font-bold text-brand-pink">$2,500</span>
                </div>
                <span className="text-[10px] text-brand-lilac/60 block">Setup Facebook & Google ad pipelines, copy & creatives.</span>
              </div>
              <div className="p-3 rounded-lg bg-brand-card/50 border border-dashed border-white/10 flex items-center justify-center text-xs text-brand-lilac/50 gap-1.5 cursor-pointer hover:border-brand-pink/30 hover:text-brand-pink transition-all">
                <Plus className="h-3.5 w-3.5" />
                <span>Add Scope Modifiers</span>
              </div>
            </div>
          </div>

          {/* Card 2: Signed Contracts (1/3 width) */}
          <div className="col-span-1 rounded-2xl border border-white/5 bg-brand-card/30 p-6 md:p-8 flex flex-col justify-between transition-all duration-300 hover:border-brand-pink/20 hover:shadow-[0_8px_30px_rgba(255,6,109,0.05)]">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-pink/10 text-brand-pink mb-6">
                <FileCheck className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Signed Contracts</h3>
              <p className="text-sm leading-relaxed text-brand-lilac/80">
                Draft binding contracts instantly. Standard template libraries, built-in e-signature compliance, and auto-clause insertion.
              </p>
            </div>

            {/* Visual Widget Mockup */}
            <div className="mt-6 bg-brand-lowest rounded-xl border border-white/5 p-4 flex flex-col gap-2">
              <div className="flex justify-between items-center text-[10px] text-white/40 border-b border-white/5 pb-2">
                <span>Contract ID: #440-C</span>
                <span className="text-green-400 font-medium">Draft Ready</span>
              </div>
              <div className="space-y-1.5 py-1">
                <div className="h-2 w-full rounded bg-white/5" />
                <div className="h-2 w-3/4 rounded bg-white/5" />
                <div className="h-2 w-5/6 rounded bg-white/5" />
              </div>
              <div className="h-8 rounded bg-brand-pink/10 border border-brand-pink/30 flex items-center justify-center text-xs text-brand-pink font-semibold mt-2 cursor-pointer hover:bg-brand-pink hover:text-white transition-colors">
                Sign Digitally
              </div>
            </div>
          </div>

          {/* Card 3: AI Sales Copilot (1/3 width) */}
          <div className="col-span-1 rounded-2xl border border-white/5 bg-brand-card/30 p-6 md:p-8 flex flex-col justify-between transition-all duration-300 hover:border-brand-pink/20 hover:shadow-[0_8px_30px_rgba(255,6,109,0.05)]">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-pink/10 text-brand-pink mb-6">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">AI Sales Copilot</h3>
              <p className="text-sm leading-relaxed text-brand-lilac/80">
                Coach on objection handling, draft professional responses, and optimize packaging variables to maximize proposal win rates.
              </p>
            </div>

            {/* Visual Widget Mockup */}
            <div className="mt-6 bg-brand-lowest rounded-xl border border-white/5 p-3 flex flex-col gap-2.5">
              <div className="flex gap-2">
                <div className="w-5 h-5 rounded-full bg-brand-pink flex items-center justify-center text-[8px] font-bold text-white">AI</div>
                <div className="flex-1 p-2 rounded bg-brand-card text-[10px] text-white">
                  Client requested 10% discount. Propose annual payment option instead.
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <div className="p-2 rounded bg-white/5 text-[10px] text-brand-lilac">
                  Drafting response...
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Smart Objection Handling (2/3 width) */}
          <div className="col-span-1 md:col-span-2 rounded-2xl border border-white/5 bg-brand-card/30 p-6 md:p-8 flex flex-col md:flex-row justify-between gap-6 overflow-hidden transition-all duration-300 hover:border-brand-pink/20 hover:shadow-[0_8px_30px_rgba(255,6,109,0.05)]">
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-pink/10 text-brand-pink mb-6">
                  <Compass className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Smart Objection Handling</h3>
                <p className="text-sm leading-relaxed text-brand-lilac/80">
                  Clients get interactive proposals where they can toggle components, select pricing structures, and read contextual FAQs to answer their doubts.
                </p>
              </div>
              <ul className="mt-6 space-y-2 text-xs text-brand-lilac/70">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3.5 w-3.5 text-brand-pink" />
                  <span>Real-time FAQ chat widget</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3.5 w-3.5 text-brand-pink" />
                  <span>Flexible payment options calculator</span>
                </li>
              </ul>
            </div>

            {/* Visual Widget Mockup */}
            <div className="flex-1 bg-brand-lowest rounded-xl border border-white/5 p-4 flex flex-col gap-2 w-full md:min-w-[240px] text-[10px]">
              <span className="font-bold text-white/50 block mb-1">Objection: "Budget Constraints"</span>
              <div className="space-y-1.5">
                <div className="p-2 rounded bg-white/5 flex items-center justify-between cursor-pointer hover:bg-white/10 transition-colors">
                  <span className="text-white font-medium">Option A: Pay Annually (Save 15%)</span>
                  <span className="text-brand-pink font-bold">Select</span>
                </div>
                <div className="p-2 rounded bg-white/5 flex items-center justify-between cursor-pointer hover:bg-white/10 transition-colors">
                  <span className="text-white font-medium">Option B: Remove Content Creation</span>
                  <span className="text-brand-pink font-bold">Select</span>
                </div>
                <div className="p-2 rounded bg-white/5 flex items-center justify-between cursor-pointer hover:bg-white/10 transition-colors">
                  <span className="text-white font-medium">Option C: 3-month Payment Plan</span>
                  <span className="text-brand-pink font-bold">Select</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row specifically to fit col-span-2 and col-span-1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Card 5: Integrated Payments (col-span-2) */}
          <div className="col-span-1 md:col-span-2 rounded-2xl border border-white/5 bg-brand-card/30 p-6 md:p-8 flex flex-col md:flex-row justify-between gap-6 overflow-hidden transition-all duration-300 hover:border-brand-pink/20 hover:shadow-[0_8px_30px_rgba(255,6,109,0.05)]">
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-pink/10 text-brand-pink mb-6">
                  <DollarSign className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Integrated Payments</h3>
                <p className="text-sm leading-relaxed text-brand-lilac/80">
                  Collect deposits instantly when the contract is signed. Automate subscription billing, monthly retainers, and milestone payouts directly.
                </p>
              </div>
              <ul className="mt-6 space-y-2 text-xs text-brand-lilac/70">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3.5 w-3.5 text-brand-pink" />
                  <span>Stripe integration</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3.5 w-3.5 text-brand-pink" />
                  <span>Automated invoice generation</span>
                </li>
              </ul>
            </div>

            {/* Visual Widget Mockup */}
            <div className="flex-1 bg-brand-lowest rounded-xl border border-white/5 p-4 flex flex-col gap-3 w-full md:min-w-[240px] text-xs">
              <span className="font-bold text-white/50 block">Payment Summary</span>
              <div className="flex justify-between items-center">
                <span className="text-brand-lilac">Retainer</span>
                <span className="text-white font-bold">$1,500/mo</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-brand-lilac">Deposit</span>
                <span className="text-white font-bold">$750</span>
              </div>
              <div className="flex items-center justify-center gap-2 bg-green-500/10 text-green-400 p-2 rounded-lg font-bold border border-green-500/20">
                <CheckCircle className="h-4 w-4" />
                <span>$750.00 Paid Successfully</span>
              </div>
            </div>
          </div>

          {/* Card 6: One-Click Proposals (col-span-1) */}
          <div className="col-span-1 rounded-2xl border border-white/5 bg-brand-card/30 p-6 md:p-8 flex flex-col justify-between transition-all duration-300 hover:border-brand-pink/20 hover:shadow-[0_8px_30px_rgba(255,6,109,0.05)]">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-pink/10 text-brand-pink mb-6">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">One-Click Proposals</h3>
              <p className="text-sm leading-relaxed text-brand-lilac/80">
                Send single, web-native proposal links. Clients can review scope, ask questions, sign, and pay in one seamless browser session.
              </p>
            </div>

            {/* Visual Widget Mockup */}
            <div className="mt-6 bg-brand-lowest rounded-xl border border-white/5 p-3 flex flex-col gap-2 text-[10px]">
              <span className="font-bold text-white/40 block">Proposal Link</span>
              <div className="flex items-center gap-1.5 bg-brand-low p-2 rounded-lg border border-white/5">
                <span className="text-brand-pink overflow-hidden text-ellipsis whitespace-nowrap">closr.app/p/expert-agency</span>
                <button className="px-2 py-0.5 rounded bg-brand-pink text-white font-semibold cursor-pointer">
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
