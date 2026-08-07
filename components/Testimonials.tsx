import { Star } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      stars: 5,
      quote: "Closr completely replaced our sales pipeline. It's so much more than just a proposal tool. We went from messy spreadsheets and lost follow-ups to closing high-ticket deals in a single day.",
      author: "Sarah Jenkins",
      role: "CEO at GrowthScale",
      avatar: "SJ",
      avatarGradient: "from-pink-500 to-rose-500",
    },
    {
      stars: 5,
      quote: "Upgrading to Closr changed everything. The proposal generation with AI is incredibly fast, and the objection-handling FAQ widget helped us align with client budgets immediately.",
      author: "David Kim",
      role: "Founder of DevLab",
      avatar: "DK",
      avatarGradient: "from-purple-500 to-indigo-500",
    },
    {
      stars: 5,
      quote: "Our contract signing and deposit collection became a breeze. Now our clients just click a single link, review their custom scopes, sign digitally, and pay. The conversions are wild.",
      author: "Marcus Thorne",
      role: "Managing Director at NextLevel",
      avatar: "MT",
      avatarGradient: "from-amber-500 to-orange-500",
    },
  ];

  return (
    <section className="relative py-24 md:py-32 bg-brand-dark overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[300px] h-[300px] rounded-full bg-radial from-brand-pink/5 to-transparent blur-[80px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-6">
            Loved by leading service builders
          </h2>
          <p className="text-base sm:text-lg text-brand-lilac">
            See how experts are standardizing their sales process and closing contracts faster.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((test, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between p-6 md:p-8 rounded-2xl border border-white/5 bg-brand-card/30 transition-all duration-300 hover:border-brand-pink/20 hover:bg-brand-card/40 hover:shadow-[0_10px_35px_rgba(0,0,0,0.4)]"
            >
              <div>
                {/* Star Ratings */}
                <div className="flex gap-1 mb-6">
                  {[...Array(test.stars)].map((_, sIdx) => (
                    <Star
                      key={sIdx}
                      className="h-4.5 w-4.5 text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>
                
                {/* Quote */}
                <p className="text-sm md:text-base leading-relaxed text-white/90 italic mb-8">
                  "{test.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-4">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br ${test.avatarGradient} text-sm font-bold text-white`}>
                  {test.avatar}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{test.author}</h4>
                  <p className="text-xs text-brand-lilac/70">{test.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
