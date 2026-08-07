export default function Stats() {
  const stats = [
    { value: "$2.5T", label: "revenue processed" },
    { value: "~40%", label: "shorter deal cycles on avg" },
    { value: "1.2x", label: "higher winrates" },
    { value: "85%", label: "standard proposal signup" },
  ];

  return (
    <section className="relative border-y border-brand-purple/20 bg-brand-lowest py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 md:gap-x-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center lg:items-start lg:text-left relative group"
            >
              {/* Vertical indicator element for large screens */}
              {index > 0 && (
                <div className="hidden lg:block absolute left-[-24px] top-2 bottom-2 w-px bg-linear-to-b from-transparent via-brand-pink/20 to-transparent" />
              )}
              
              <div className="text-4xl md:text-5xl font-black tracking-tight text-white transition-all group-hover:text-brand-pink duration-300">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm font-medium text-brand-lilac/80 tracking-wide uppercase mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
