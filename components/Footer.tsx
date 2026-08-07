import Link from "next/link";

// Local SVG components for brand icons to ensure build stability without dependency mismatch
function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-brand-purple/20 bg-brand-lowest py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Logo + Tagline Column */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-1.5 text-2xl font-bold tracking-tight text-white">
              <span>Closr</span>
              <span className="text-brand-pink font-extrabold text-3xl leading-none">.</span>
            </Link>
            <p className="text-sm leading-relaxed text-brand-lilac/70 max-w-xs">
              Automated sales infrastructure for services businesses. Create proposals, sign contracts, and collect payments in one place.
            </p>
          </div>

          {/* Product Links Column */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Product</h4>
            <nav className="flex flex-col gap-2.5 text-xs text-brand-lilac/70">
              <Link href="#features" className="hover:text-brand-pink transition-colors">Features</Link>
              <Link href="#" className="hover:text-brand-pink transition-colors">Integrations</Link>
              <Link href="#" className="hover:text-brand-pink transition-colors">Security</Link>
              <Link href="#pricing" className="hover:text-brand-pink transition-colors">Pricing</Link>
            </nav>
          </div>

          {/* Company Links Column */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Company</h4>
            <nav className="flex flex-col gap-2.5 text-xs text-brand-lilac/70">
              <Link href="#" className="hover:text-brand-pink transition-colors">About Us</Link>
              <Link href="#" className="hover:text-brand-pink transition-colors">Careers</Link>
              <Link href="#" className="hover:text-brand-pink transition-colors">Blog</Link>
              <Link href="#" className="hover:text-brand-pink transition-colors">Contact</Link>
            </nav>
          </div>

          {/* Legal Links Column */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Legal</h4>
            <nav className="flex flex-col gap-2.5 text-xs text-brand-lilac/70">
              <Link href="#" className="hover:text-brand-pink transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-brand-pink transition-colors">Terms</Link>
              <Link href="#" className="hover:text-brand-pink transition-colors">Cookie Policy</Link>
            </nav>
          </div>
        </div>

        {/* Bottom divider */}
        <div className="h-px bg-brand-purple/20 my-12" />

        {/* Copyright & Socials */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-brand-lilac/60">
          <span>&copy; {new Date().getFullYear()} Closr Inc. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border border-white/5 bg-white/2 hover:bg-white/5 hover:text-white rounded-full transition-all"
              aria-label="Twitter"
            >
              <TwitterIcon className="h-4.5 w-4.5" />
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border border-white/5 bg-white/2 hover:bg-white/5 hover:text-white rounded-full transition-all"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="h-4.5 w-4.5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
