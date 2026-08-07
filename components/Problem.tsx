import { PackageOpen, Clock, ShieldAlert, BellRing } from "lucide-react";

export default function Problem() {
  const problems = [
    {
      title: "Inconsistent Packaging",
      desc: "Pricing changes with each client, and projects are delivered without standard systems. Leads to custom scoped proposals that take days to write.",
      icon: PackageOpen,
      iconColor: "text-rose-500",
      bgColor: "bg-rose-500/10",
      borderColor: "border-rose-500/20 hover:border-rose-500/40",
    },
    {
      title: "Slow Proposals",
      desc: "Clunky templates and slow pipelines delay closing by weeks. While you draft a proposal, the lead loses interest or goes to a faster competitor.",
      icon: Clock,
      iconColor: "text-amber-500",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/20 hover:border-amber-500/40",
    },
    {
      title: "Poor Objection Handling",
      desc: "Struggling with requests for discounts. Without visual scope-of-work modifiers, clients feel you are guessing pricing and back out.",
      icon: ShieldAlert,
      iconColor: "text-purple-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20 hover:border-purple-500/40",
    },
    {
      title: "Follow-up Failure",
      desc: "Forgetting to follow up with active leads or proposals sent. Over 60% of service contracts fail simply due to lack of standard follow-up sequences.",
      icon: BellRing,
      iconColor: "text-brand-pink",
      bgColor: "bg-brand-pink/10",
      borderColor: "border-brand-pink/20 hover:border-brand-pink/40",
    },
  ];

  return (
    <section className="relative py-24 md:py-32 bg-brand-dark overflow-hidden">
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 w-[350px] h-[350px] rounded-full bg-radial from-brand-purple/10 to-transparent blur-[80px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-6">
            Why most service businesses fail
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-brand-lilac leading-relaxed">
            Instead of doing their actual work, experts are forced to act as full-time sales reps, leading to common patterns.
          </p>
        </div>

        {/* Problems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((prob, idx) => {
            const IconComponent = prob.icon;
            return (
              <div
                key={idx}
                className={`flex flex-col p-6 md:p-8 rounded-2xl border bg-brand-card/40 backdrop-blur-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.4)] ${prob.borderColor}`}
              >
                {/* Icon wrapper */}
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${prob.bgColor} ${prob.iconColor} mb-6`}>
                  <IconComponent className="h-6 w-6" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-3">
                  {prob.title}
                </h3>
                <p className="text-sm leading-relaxed text-brand-lilac/80">
                  {prob.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
