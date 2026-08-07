import { Check, X, ShieldAlert, ShieldCheck } from "lucide-react";

export default function Comparison() {
  const normalCRM = [
    "Manual CRM updates after every call",
    "Days spent drafting scopes in Google Docs",
    "No coaching on price objections",
    "Clients lose momentum waiting for follow-ups",
    "Static PDF contracts that get ignored",
    "Separate billing setups via Stripe links",
  ];

  const closrPlatform = [
    "Automatic speech-to-data CRM syncing",
    "Proposals drafted in seconds with custom AI templates",
    "Real-time objection handlers and visual FAQs",
    "Automated SMS/Email follow-up sequences",
    "Interactive online contracts with live sign/pay options",
    "Integrated retainer and deposit billing in one flow",
  ];

  return (
    <section className="relative py-24 md:py-32 bg-brand-dark overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-radial from-brand-purple/10 to-transparent blur-[80px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-pink block mb-3">
            What it looks like
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
            AI revenue infrastructure built for service businesses.
          </h2>
        </div>

        {/* Side by side Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Normal CRM Card */}
          <div className="rounded-2xl border border-white/5 bg-brand-card/10 p-8 md:p-10 flex flex-col justify-between transition-all duration-300 hover:border-white/10">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-500/10 text-rose-500">
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white">Normal CRM & Workflows</h3>
              </div>
              <p className="text-xs text-brand-lilac/70 mb-8">
                Clunky pipelines require manual overhead, creating latency that kills deal momentum.
              </p>
              <ul className="space-y-4">
                {normalCRM.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <X className="h-5 w-5 text-rose-500/70 shrink-0 mt-0.5" />
                    <span className="text-sm text-brand-lilac/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Closr Card (Highlighted) */}
          <div className="relative rounded-2xl border border-brand-pink/30 bg-brand-lowest/40 p-8 md:p-10 flex flex-col justify-between shadow-[0_0_30px_rgba(255,6,109,0.05)] transition-all duration-300 hover:border-brand-pink/50 hover:shadow-[0_0_40px_rgba(255,6,109,0.1)]">
            {/* Glowing top badge */}
            <div className="absolute top-[-12px] right-6 rounded-full bg-brand-pink px-3.5 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-lg">
              Closr Way
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-pink/10 text-brand-pink">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white">Closr. Infrastructure</h3>
              </div>
              <p className="text-xs text-brand-lilac/70 mb-8">
                Smart automation runs in the background to package, propose, sign and close deals for you.
              </p>
              <ul className="space-y-4">
                {closrPlatform.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-white font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
