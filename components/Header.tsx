"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Globe, Menu, X, ArrowRight } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-purple/20 bg-brand-dark/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl h-20 items-center justify-between px-6 md:px-8">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-1.5 text-2xl font-bold tracking-tight text-white">
            <span>Closr</span>
            <span className="text-brand-pink font-extrabold text-3xl leading-none">.</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#dashboard"
              className="text-[14px] font-medium text-brand-lilac hover:text-white transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="#pipeline"
              className="text-[14px] font-medium text-brand-lilac hover:text-white transition-colors"
            >
              Pipeline
            </Link>
            <Link
              href="#insights"
              className="text-[14px] font-medium text-brand-lilac hover:text-white transition-colors"
            >
              Insights
            </Link>
            <Link
              href="#pricing"
              className="text-[14px] font-medium text-brand-lilac hover:text-white transition-colors"
            >
              Billing
            </Link>
          </nav>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button
            aria-label="Search"
            className="p-2 text-brand-lilac hover:text-white hover:bg-white/5 rounded-full transition-all"
          >
            <Search className="h-4.5 w-4.5" />
          </button>
          <button
            aria-label="Language"
            className="p-2 text-brand-lilac hover:text-white hover:bg-white/5 rounded-full transition-all"
          >
            <Globe className="h-4.5 w-4.5" />
          </button>
          <Link
            href="/login"
            className="relative inline-flex h-10 items-center justify-center rounded-full bg-brand-pink px-6 text-xs font-semibold text-white transition-all hover:bg-opacity-90 hover:scale-[1.02] shadow-[0_0_15px_rgba(255,6,109,0.3)] active:scale-[0.98]"
          >
            New Deal
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            aria-label="Search"
            className="p-2 text-brand-lilac hover:text-white rounded-full"
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-brand-lilac hover:text-white rounded-full transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden border-t border-brand-purple/20 bg-brand-dark/95 backdrop-blur-lg px-6 py-6 absolute top-20 left-0 w-full animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-5">
            <Link
              href="#dashboard"
              onClick={() => setIsOpen(false)}
              className="text-base font-medium text-brand-lilac hover:text-white transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="#pipeline"
              onClick={() => setIsOpen(false)}
              className="text-base font-medium text-brand-lilac hover:text-white transition-colors"
            >
              Pipeline
            </Link>
            <Link
              href="#insights"
              onClick={() => setIsOpen(false)}
              className="text-base font-medium text-brand-lilac hover:text-white transition-colors"
            >
              Insights
            </Link>
            <Link
              href="#pricing"
              onClick={() => setIsOpen(false)}
              className="text-base font-medium text-brand-lilac hover:text-white transition-colors"
            >
              Billing
            </Link>
            <div className="h-px bg-brand-purple/20 my-2" />
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-pink text-sm font-semibold text-white transition-colors hover:bg-opacity-90"
            >
              <span>New Deal</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
