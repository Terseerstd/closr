"use client";

import Link from "next/link";
import { Check } from "lucide-react";

export default function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      desc: "Perfect for testing the waters and small freelancers.",
      features: [
        "5 proposals / month",
        "Basic AI assistant",
        "Generic templates",
        "Standard support",
      ],
      btnText: "Promote Free",
      highlight: false,
    },
    {
      name: "Startup",
      price: "$49",
      desc: "For growing service providers needing customization.",
      features: [
        "15 proposals / month",
        "Standard AI templates",
        "Brand customization",
        "Email support",
      ],
      btnText: "Promote Startup",
      highlight: false,
    },
    {
      name: "Professional",
      price: "$129",
      desc: "Our most popular package for high-volume closing.",
      features: [
        "Unlimited proposals",
        "Advanced AI copilot",
        "White-label client portal",
        "Custom domain mapping",
        "Priority 24/7 support",
      ],
      btnText: "Promote Professional",
      highlight: true,
    },
    {
      name: "Agency",
      price: "$299",
      desc: "For scaling agencies and multi-member teams.",
      features: [
        "Everything in Professional",
        "Team collaboration (5 seats)",
        "Multi-tenant dashboard",
        "Dedicated account manager",
        "API integration access",
      ],
      btnText: "Promote Agency",
      highlight: false,
    },
  ];

  return (
    <section id="pricing" className="relative py-24 md:py-32 bg-brand-dark">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[450px] h-[450px] rounded-full bg-radial from-brand-pink/10 to-transparent blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-6">
            Pricing that grows with you
          </h2>
          <p className="text-base sm:text-lg text-brand-lilac">
            Start free and scale as your revenue pipeline grows. No credit card required.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col justify-between p-6 md:p-8 rounded-2xl border transition-all duration-300 ${
                plan.highlight
                  ? "bg-brand-lowest border-brand-pink shadow-[0_0_30px_rgba(255,6,109,0.15)] scale-[1.03] z-10 hover:border-brand-pink/80 hover:shadow-[0_0_40px_rgba(255,6,109,0.25)]"
                  : "bg-brand-card/30 border-white/5 hover:border-brand-pink/20 hover:bg-brand-card/45"
              }`}
            >
              {plan.highlight && (
                <div className="absolute top-[-12px] left-1/2 -translate-x-1/2 rounded-full bg-brand-pink px-4 py-1 text-[9px] font-black uppercase tracking-wider text-white">
                  Most Popular
                </div>
              )}

              <div>
                <h3 className="text-lg font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-xs text-brand-lilac/70 min-h-8 mb-6">{plan.desc}</p>

                {/* Price */}
                <div className="flex items-baseline text-white mb-6">
                  <span className="text-4xl font-extrabold tracking-tight">{plan.price}</span>
                  <span className="text-sm font-medium text-brand-lilac/70 ml-1">/mo</span>
                </div>

                {/* Divider */}
                <div className="h-px bg-white/5 mb-6" />

                {/* Features List */}
                <ul className="space-y-3.5 mb-8">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5 text-xs text-brand-lilac/95">
                      <Check className={`h-4.5 w-4.5 shrink-0 ${plan.highlight ? "text-brand-pink" : "text-brand-pink/70"}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <Link
                href={`/register?plan=${plan.name.toLowerCase()}`}
                className={`w-full py-3 px-4 rounded-full text-xs font-bold text-center block transition-all ${
                  plan.highlight
                    ? "bg-brand-pink text-white hover:bg-brand-pink/90 shadow-[0_0_15px_rgba(255,6,109,0.3)] active:scale-[0.98]"
                    : "bg-white/5 text-white border border-white/10 hover:bg-white/10 active:scale-[0.98]"
                }`}
              >
                {plan.btnText}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
