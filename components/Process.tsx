export default function Process() {
  const steps = [
    {
      step: "01",
      title: "Create your office",
      desc: "Build your customizable services, terms, and pricing packages in less than 15 minutes.",
    },
    {
      step: "02",
      title: "AI drafts proposals",
      desc: "Get auto-generated, highly persuasive proposal drafts tailored to your discovery sessions.",
    },
    {
      step: "03",
      title: "Client signs & pays",
      desc: "Clients review scope options, sign digitally, and pay deposits—all in a single web interface.",
    },
  ];

  return (
    <section className="relative py-24 md:py-32 bg-brand-dark overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-6">
            Close more in three steps
          </h2>
          <p className="text-base sm:text-lg text-brand-lilac">
            Transform how you pitch and close contracts with our optimized workflow.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16">
          {/* Horizontal Line connector (Desktop only) */}
          <div className="hidden md:block absolute top-10 left-[16%] right-[16%] h-[2px] bg-linear-to-r from-brand-pink/40 via-brand-purple/20 to-brand-pink/40 -z-10" />

          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group">
              {/* Step Circle Badge */}
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-brand-pink/50 bg-brand-lowest text-xl font-black text-brand-pink shadow-[0_0_20px_rgba(255,6,109,0.15)] group-hover:scale-110 group-hover:bg-brand-pink group-hover:text-white group-hover:border-white transition-all duration-300 mb-8">
                {step.step}
              </div>

              {/* Text */}
              <h3 className="text-lg md:text-xl font-bold text-white mb-3 group-hover:text-brand-pink transition-colors">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-brand-lilac/80 max-w-xs">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
