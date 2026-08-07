import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Problem from "@/components/Problem";
import Features from "@/components/Features";
import Process from "@/components/Process";
import Comparison from "@/components/Comparison";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-brand-dark text-white">
      {/* Navigation Header */}
      <Header />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* Intro Hero with monitor mockup */}
        <Hero />

        {/* Highlight Stats Banner */}
        <Stats />

        {/* Business Pain Points */}
        <Problem />

        {/* Bento Grid Feature List */}
        <Features />

        {/* 3-Step Process Timeline */}
        <Process />

        {/* Side-by-side CRM Comparison */}
        <Comparison />

        {/* Interactive Pricing Cards */}
        <Pricing />

        {/* Testimonials Quote Cards */}
        <Testimonials />

        {/* Bottom Conversion CTA Card */}
        <CTA />
      </main>

      {/* Directory Footer */}
      <Footer />
    </div>
  );
}
