"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Layers,
  Briefcase,
  Sparkles,
  DollarSign,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X,
  Search,
  Bell
} from "lucide-react";

interface DashboardShellProps {
  children: React.ReactNode;
  username: string;
  userInitials: string;
  onLogout: () => Promise<void>;
}

export default function DashboardShell({
  children,
  username,
  userInitials,
  onLogout
}: DashboardShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigationItems = [
    { name: "Dashboard", href: "/dashboard", icon: Layers, active: true },
    { name: "Pipeline", href: "#", icon: Briefcase, active: false },
    { name: "AI Insights", href: "#", icon: Sparkles, active: false },
    { name: "Billing", href: "#", icon: DollarSign, active: false },
  ];

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-brand-lowest text-white font-sans">
      {/* 1. Backdrop Overlay (Mobile only) */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden transition-all duration-300"
        />
      )}

      {/* 2. Slide-out Mobile Sidebar Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 w-72 bg-[#130219] border-r border-brand-purple/10 p-6 flex flex-col justify-between z-50 transition-transform duration-300 lg:hidden ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="space-y-8">
          {/* Logo & Close Drawer Button */}
          <div className="flex items-center justify-between">
            <div>
              <Link href="/" className="flex items-center gap-1.5 text-2xl font-bold tracking-tight text-white">
                <span>Closr</span>
                <span className="text-brand-pink font-extrabold text-3xl leading-none">.</span>
              </Link>
              <span className="text-[9px] text-brand-lilac/40 uppercase tracking-widest font-bold block mt-0.5">
                REVENUE INTELLIGENCE
              </span>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 border border-white/5 bg-white/2 hover:bg-white/5 text-brand-lilac hover:text-white rounded-full transition-colors"
              aria-label="Close menu"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5">
            {navigationItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Link
                  key={idx}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-bold transition-all ${
                    item.active
                      ? "bg-brand-high/50 text-white border-l-3 border-brand-pink"
                      : "text-brand-lilac/70 hover:text-white hover:bg-white/5 border-l-3 border-transparent"
                  }`}
                >
                  <Icon className={`h-4.5 w-4.5 ${item.active ? "text-brand-pink" : ""}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Options */}
        <div className="space-y-1.5">
          <Link
            href="#"
            onClick={() => setIsSidebarOpen(false)}
            className="flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium text-brand-lilac/70 hover:text-white hover:bg-white/5 transition-all"
          >
            <Settings className="h-4.5 w-4.5" />
            <span>Settings</span>
          </Link>
          <Link
            href="#"
            onClick={() => setIsSidebarOpen(false)}
            className="flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium text-brand-lilac/70 hover:text-white hover:bg-white/5 transition-all"
          >
            <HelpCircle className="h-4.5 w-4.5" />
            <span>Support</span>
          </Link>
          <button
            onClick={async () => {
              setIsSidebarOpen(false);
              await onLogout();
            }}
            className="flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/5 transition-all w-full text-left cursor-pointer border-t border-white/5 pt-2 mt-2"
          >
            <LogOut className="h-4.5 w-4.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* 3. Static Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 bg-[#130219] border-r border-brand-purple/10 p-6 justify-between select-none h-full shrink-0">
        <div className="space-y-8">
          {/* Logo */}
          <div className="px-2">
            <Link href="/" className="flex items-center gap-1.5 text-2xl font-bold tracking-tight text-white">
              <span>Closr</span>
              <span className="text-brand-pink font-extrabold text-3xl leading-none">.</span>
            </Link>
            <span className="text-[9px] text-brand-lilac/40 uppercase tracking-widest font-bold block mt-0.5">
              REVENUE INTELLIGENCE
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5">
            {navigationItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Link
                  key={idx}
                  href={item.href}
                  className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-bold transition-all ${
                    item.active
                      ? "bg-brand-high/50 text-white border-l-3 border-brand-pink"
                      : "text-brand-lilac/70 hover:text-white hover:bg-white/5 border-l-3 border-transparent"
                  }`}
                >
                  <Icon className={`h-4.5 w-4.5 ${item.active ? "text-brand-pink" : ""}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Options */}
        <div className="space-y-1.5">
          <Link
            href="#"
            className="flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium text-brand-lilac/70 hover:text-white hover:bg-white/5 transition-all"
          >
            <Settings className="h-4.5 w-4.5" />
            <span>Settings</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium text-brand-lilac/70 hover:text-white hover:bg-white/5 transition-all"
          >
            <HelpCircle className="h-4.5 w-4.5" />
            <span>Support</span>
          </Link>
          <button
            onClick={async () => {
              await onLogout();
            }}
            className="flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/5 transition-all w-full text-left cursor-pointer border-t border-white/5 pt-2 mt-2"
          >
            <LogOut className="h-4.5 w-4.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* 4. Main Panel Layout Content */}
      <div className="flex-1 flex flex-col bg-brand-dark overflow-y-auto h-full min-w-0">
        {/* Header Bar */}
        <header className="px-6 md:px-8 py-5 border-b border-brand-purple/10 bg-brand-dark/40 backdrop-blur-md sticky top-0 z-20 flex flex-col md:flex-row items-center justify-between gap-4 select-none shrink-0">
          <div className="flex items-center justify-between w-full md:w-auto gap-4">
            {/* Mobile hamburger menu toggle */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 border border-white/5 bg-white/2 hover:bg-white/5 text-brand-lilac hover:text-white rounded-full transition-colors shrink-0"
              aria-label="Open navigation menu"
            >
              <Menu className="h-4.5 w-4.5" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">Dashboard</h1>
              <p className="text-[10px] text-brand-lilac/50 block mt-0.5">Welcome back, {username}</p>
            </div>
            
            {/* Small screen initials badge to balance layout */}
            <div className="lg:hidden flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-brand-pink to-brand-purple text-[10px] font-black text-white shadow-md">
              {userInitials}
            </div>
          </div>

          {/* Search deals bar */}
          <div className="relative w-full md:max-w-xs">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-brand-lilac/40">
              <Search className="h-4 w-4" />
            </span>
            <input
              type="text"
              placeholder="Search deals..."
              className="w-full pl-9 pr-4 py-2 bg-[#130219] border border-brand-purple/10 rounded-full text-xs text-white placeholder-brand-lilac/40 focus:border-brand-pink outline-none transition-all"
            />
          </div>

          {/* Header Action Badges */}
          <div className="hidden sm:flex items-center gap-4.5 w-full md:w-auto justify-end">
            {/* AI sparkles badge */}
            <button className="p-2 border border-white/5 bg-white/2 hover:bg-white/5 text-brand-lilac hover:text-white rounded-full transition-all relative">
              <Sparkles className="h-4.5 w-4.5" />
            </button>

            {/* Notification bell badge */}
            <button className="p-2 border border-white/5 bg-white/2 hover:bg-white/5 text-brand-lilac hover:text-white rounded-full transition-all relative">
              <Bell className="h-4.5 w-4.5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-brand-pink ring-2 ring-brand-dark" />
            </button>

            {/* User initials gradient circle badge */}
            <div
              title={username}
              className="hidden lg:flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-brand-pink to-brand-purple text-xs font-black text-white shadow-lg cursor-pointer"
            >
              {userInitials}
            </div>

            {/* CTA action button */}
            <button className="relative inline-flex h-9.5 items-center justify-center rounded-full bg-brand-pink px-5 text-xs font-semibold text-white transition-all hover:bg-opacity-95 hover:scale-[1.02] shadow-[0_0_15px_rgba(255,6,109,0.3)] active:scale-[0.98]">
              New Deal
            </button>
          </div>
        </header>

        {/* Dashboard Grid workspace content */}
        <div className="flex-1 w-full">{children}</div>
      </div>
    </div>
  );
}
