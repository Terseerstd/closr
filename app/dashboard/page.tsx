import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import jwt from "jsonwebtoken";
import DashboardShell from "@/components/DashboardShell";
import {
  TrendingUp,
  DollarSign,
  Briefcase,
  Layers,
  Sparkles,
  Bell,
  Search,
  Settings,
  HelpCircle,
  FileText,
  UserPlus,
  ArrowUpRight,
  LogOut,
  User
} from "lucide-react";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

// Logout action function
async function handleLogout() {
  "use server";
  const cookieStore = await cookies();
  cookieStore.delete("token");
  redirect("/login");
}

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  let decoded: any = null;
  try {
    decoded = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    // If JWT is invalid/expired
    redirect("/login");
  }

  const username = decoded?.name || "User";
  const userInitials = username
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

  return (
    <DashboardShell
      username={username}
      userInitials={userInitials}
      onLogout={handleLogout}
    >
      <main className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
          {/* Row 1: Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Metric 1 */}
            <div className="p-6 rounded-2xl border border-brand-purple/10 bg-[#130219]/40 flex flex-col justify-between hover:border-brand-purple/20 transition-all">
              <div className="flex justify-between items-center text-brand-lilac/70">
                <span className="text-xs font-semibold uppercase tracking-wider">Total Revenue</span>
                <DollarSign className="h-4 w-4" />
              </div>
              <div className="my-3">
                <div className="text-3xl font-black text-white">$2.4M</div>
                <div className="text-[10px] text-green-400 flex items-center gap-0.5 mt-1 font-semibold">
                  <TrendingUp className="h-3.5 w-3.5" />
                  <span>+12.5% from last month</span>
                </div>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="p-6 rounded-2xl border border-brand-purple/10 bg-[#130219]/40 flex flex-col justify-between hover:border-brand-purple/20 transition-all">
              <div className="flex justify-between items-center text-brand-lilac/70">
                <span className="text-xs font-semibold uppercase tracking-wider">Active Pipeline Value</span>
                <Layers className="h-4 w-4" />
              </div>
              <div className="my-3">
                <div className="text-3xl font-black text-white">$8.1M</div>
                <div className="text-[10px] text-brand-pink mt-1 font-semibold">
                  <span>14 open opportunities</span>
                </div>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="p-6 rounded-2xl border border-brand-purple/10 bg-[#130219]/40 flex flex-col justify-between hover:border-brand-purple/20 transition-all">
              <div className="flex justify-between items-center text-brand-lilac/70">
                <span className="text-xs font-semibold uppercase tracking-wider">Closed This Month</span>
                <FileText className="h-4 w-4" />
              </div>
              <div className="my-3">
                <div className="text-3xl font-black text-white">$640K</div>
                <div className="text-[10px] text-brand-lilac mt-1 font-semibold">
                  <span>82% of monthly target</span>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Graph & AI intelligence panel */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Area Chart Card (Col span 2) */}
            <div className="lg:col-span-2 p-6 rounded-2xl border border-brand-purple/10 bg-[#130219]/40 flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-base font-bold text-white">Revenue Growth</h3>
                  <p className="text-[11px] text-brand-lilac/70">Performance metrics across all sectors</p>
                </div>
                {/* 1M 3M 1Y Selector */}
                <div className="flex bg-[#130219] p-1 rounded-lg border border-brand-purple/10 text-[10px] font-bold select-none">
                  <span className="px-2.5 py-1 rounded-md bg-brand-pink text-white cursor-pointer">1M</span>
                  <span className="px-2.5 py-1 rounded-md text-brand-lilac hover:text-white cursor-pointer transition-colors">3M</span>
                  <span className="px-2.5 py-1 rounded-md text-brand-lilac hover:text-white cursor-pointer transition-colors">1Y</span>
                </div>
              </div>

              {/* Graphic SVG Area Chart */}
              <div className="w-full h-64 relative">
                <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="dashboard-chart-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ff066d" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#ae16a7" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Grid Lines */}
                  <line x1="0" y1="10" x2="100" y2="10" stroke="rgba(255,255,255,0.03)" strokeWidth="0.1" />
                  <line x1="0" y1="20" x2="100" y2="20" stroke="rgba(255,255,255,0.03)" strokeWidth="0.1" />
                  <line x1="0" y1="30" x2="100" y2="30" stroke="rgba(255,255,255,0.03)" strokeWidth="0.1" />

                  {/* Graph Filled Area */}
                  <path
                    d="M 0 35 Q 15 33, 30 25 T 60 22 T 80 12 T 100 8 L 100 40 L 0 40 Z"
                    fill="url(#dashboard-chart-grad)"
                  />
                  {/* Graph Line */}
                  <path
                    d="M 0 35 Q 15 33, 30 25 T 60 22 T 80 12 T 100 8"
                    fill="none"
                    stroke="#ff066d"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />

                  {/* Indicator Dot */}
                  <circle cx="80" cy="12" r="0.75" fill="#fff" stroke="#ff066d" strokeWidth="0.3" />
                </svg>

                {/* Floating tooltip */}
                <div className="absolute top-12 right-[20%] bg-[#1d0225] border border-brand-pink/30 rounded-lg p-2 text-[9px] shadow-lg">
                  <span className="text-brand-lilac/70 block uppercase font-bold">June Revenue</span>
                  <span className="text-white font-extrabold text-xs">$210,000.00</span>
                </div>
              </div>

              {/* Chart X Labels */}
              <div className="flex justify-between items-center px-2 text-[10px] text-brand-lilac/60 font-semibold tracking-wider uppercase">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
              </div>
            </div>

            {/* AI Revenue Intelligence Panel (Col span 1) */}
            <div className="p-6 rounded-2xl border border-brand-purple/10 bg-[#130219]/40 flex flex-col gap-5">
              <div className="flex items-center gap-2 border-b border-white/5 pb-3">
                <Sparkles className="h-4.5 w-4.5 text-brand-pink" />
                <h3 className="text-sm font-bold text-white">AI Revenue Intelligence</h3>
              </div>

              {/* Intelligence items */}
              <div className="space-y-4">
                {/* Alert 1 */}
                <div className="p-4 rounded-xl border border-brand-pink/20 bg-[#2c0f33]/60 flex flex-col gap-2.5">
                  <div className="flex justify-between items-center text-[10px] font-bold">
                    <span className="text-brand-pink tracking-wide uppercase">High Probability</span>
                    <span className="text-white">85%</span>
                  </div>
                  <p className="text-xs text-brand-lilac leading-relaxed">
                    Follow up with <span className="text-white font-bold">Apex Design</span>. They reviewed the proposal 3 times in the last 24h.
                  </p>
                  <button className="w-full py-2.5 rounded-lg bg-brand-pink text-[10px] font-black text-white hover:bg-opacity-95 transition-all cursor-pointer">
                    GENERATE FOLLOW-UP
                  </button>
                </div>

                {/* Alert 2 */}
                <div className="p-4 rounded-xl border border-brand-purple/10 bg-[#2c0f33]/20 flex flex-col gap-1.5">
                  <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wide">
                    Pipeline Shift
                  </span>
                  <p className="text-xs text-brand-lilac/90 leading-relaxed">
                    Deal slippage detected in <span className="text-white font-bold">Mid-Market West</span>. Velocity has decreased by 14%.
                  </p>
                </div>

                {/* Alert 3 */}
                <div className="p-4 rounded-xl border border-brand-purple/10 bg-[#2c0f33]/20 flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-brand-purple uppercase tracking-wide">
                    Opportunity
                  </span>
                  <p className="text-xs text-brand-lilac/90 leading-relaxed">
                    Cross-sell potential identified for <span className="text-white font-bold">Nexus Corp</span> based on recent expansion into EMEA.
                  </p>
                  <div className="inline-flex self-start items-center gap-1.5 px-2 py-0.5 rounded bg-brand-purple/20 text-[9px] font-bold text-brand-lilac">
                    <span>Context: EMEA Expansion</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 3: Activity & Top Performers */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Recent Activity List */}
            <div className="lg:col-span-2 p-6 rounded-2xl border border-brand-purple/10 bg-[#130219]/40 flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-bold text-white">Recent Activity</h3>
                <Link href="#" className="text-xs text-brand-pink font-semibold hover:underline">
                  View All
                </Link>
              </div>

              {/* Activity rows */}
              <div className="space-y-4">
                {/* Activity 1 */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-brand-low/30 border border-brand-purple/5 hover:border-brand-purple/10 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2c0f33] text-brand-pink shrink-0">
                      <FileText className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Vanguard Group Contract Signed</h4>
                      <p className="text-[10px] text-brand-lilac/60 mt-0.5">Closed by Sarah Jenkins • 2 hours ago</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-brand-purple/20 text-[9px] font-bold text-[#fcd6ff] tracking-wide uppercase select-none">
                    Completed
                  </span>
                </div>

                {/* Activity 2 */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-brand-low/30 border border-brand-purple/5 hover:border-brand-purple/10 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2c0f33] text-brand-orange shrink-0">
                      <UserPlus className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">New Lead: Quantum Systems</h4>
                      <p className="text-[10px] text-brand-lilac/60 mt-0.5">Inbound via Enterprise Page • 5 hours ago</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/5 text-[9px] font-bold text-brand-lilac tracking-wide uppercase select-none">
                    Processing
                  </span>
                </div>
              </div>
            </div>

            {/* Top Performers Card */}
            <div className="p-6 rounded-2xl border border-brand-purple/10 bg-[#130219]/40 flex flex-col gap-6">
              <h3 className="text-base font-bold text-white">Top Performers</h3>
              
              {/* Leaderboard rows */}
              <div className="space-y-4">
                {/* Leader 1 */}
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-6.5 w-6.5 items-center justify-center rounded-full bg-brand-pink text-[10px] font-black text-white">
                      1
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Alex Rivera</h4>
                      <p className="text-[9px] text-brand-lilac/60 mt-0.5">Enterprise Sales</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-white">$1.2M</span>
                </div>

                {/* Leader 2 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-6.5 w-6.5 items-center justify-center rounded-full bg-brand-purple text-[10px] font-black text-white">
                      2
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Sarah Jenkins</h4>
                      <p className="text-[9px] text-brand-lilac/60 mt-0.5">Mid-Market Sales</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-white">$940K</span>
                </div>
              </div>
            </div>
          </div>
      </main>
    </DashboardShell>
  );
}
