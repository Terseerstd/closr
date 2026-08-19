import Link from "next/link";
import { Sparkles, Calendar } from "lucide-react";

export default function CTA() {
  return (
    <section id="cta" className="relative py-24 md:py-32 bg-brand-dark overflow-hidden">
      {/* Glow backgrounds */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full bg-radial from-brand-pink/15 via-brand-purple/10 to-transparent blur-[110px] pointer-events-none" />

      <div className="mx-auto max-w-5xl px-6 md:px-8 relative z-10">
        <div className="rounded-3xl border border-brand-pink/30 bg-linear-to-b from-brand-lowest to-brand-low p-8 md:p-16 text-center shadow-[0_0_50px_rgba(255,6,109,0.1)]">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-pink/10 px-3 py-1 text-xs font-semibold text-brand-pink mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Ready to scale?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-6">
            Ready to close more deals?
          </h2>
          
          <p className="mx-auto max-w-xl text-sm sm:text-base md:text-lg leading-relaxed text-brand-lilac mb-10">
            Join 5,000+ service providers, consultants, and agencies using Closr to package expertise, automate proposals, and streamline their bottom line.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <Link
              href="/waitlist"
              className="w-full sm:w-auto h-12 px-8 rounded-full bg-brand-pink text-xs font-bold text-white flex items-center justify-center transition-all hover:bg-opacity-90 hover:scale-[1.02] shadow-[0_0_20px_rgba(255,6,109,0.3)] active:scale-[0.98]"
            >
              Get Early Access
            </Link>
            <Link
              href="#demo"
              className="w-full sm:w-auto h-12 px-8 rounded-full border border-white/10 bg-white/5 inline-flex items-center justify-center gap-2 text-xs font-bold text-white transition-all hover:bg-white/10 active:scale-[0.98]"
            >
              <Calendar className="h-4 w-4" />
              <span>Book a session</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
