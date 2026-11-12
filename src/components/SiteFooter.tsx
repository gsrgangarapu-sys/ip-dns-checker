import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 mt-auto relative bg-slate-50 text-slate-600">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-200">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 group">
              <Logo size={28} />
              <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-emerald-600 transition-colors">
                DNSChecker
              </span>
            </Link>
            <p className="text-xs text-slate-500 leading-relaxed">
              Professional-grade network intelligence, real-time DNS resolution, IP reputation auditing, and SSL security validation toolkit.
            </p>
            <div className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/60 inline-block">
              100% Free • Live Public Registries
            </div>
          </div>

          {/* Network Intelligence Tools */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 font-mono">
              Network Lookups
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/my-ip" className="hover:text-emerald-600 transition-colors">
                  What Is My IP Address
                </Link>
              </li>
              <li>
                <Link to="/lookup" className="hover:text-emerald-600 transition-colors">
                  IP Address Geolocation Lookup
                </Link>
              </li>
              <li>
                <Link to="/dns" className="hover:text-emerald-600 transition-colors">
                  DNS Propagation &amp; Records Check
                </Link>
              </li>
              <li>
                <Link to="/whois" className="hover:text-emerald-600 transition-colors">
                  WHOIS Domain Registration Check
                </Link>
              </li>
              <li>
                <Link to="/hosting" className="hover:text-emerald-600 transition-colors">
                  Hosting Provider &amp; ASN Lookup
                </Link>
              </li>
            </ul>
          </div>

          {/* Security & Threat Intelligence */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 font-mono">
              Security &amp; Port Scans
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/ssl" className="hover:text-emerald-600 transition-colors">
                  SSL/TLS Certificate Checker
                </Link>
              </li>
              <li>
                <Link to="/blacklist" className="hover:text-emerald-600 transition-colors">
                  IP &amp; Domain Blacklist Check (DNSBL)
                </Link>
              </li>
              <li>
                <Link to="/headers" className="hover:text-emerald-600 transition-colors">
                  HTTP Security Headers Scanner
                </Link>
              </li>
              <li>
                <Link to="/ports" className="hover:text-emerald-600 transition-colors">
                  Open Port Scanner (TCP/UDP)
                </Link>
              </li>
              <li>
                <Link to="/email" className="hover:text-emerald-600 transition-colors">
                  Email SPF, DKIM &amp; DMARC Checker
                </Link>
              </li>
              <li>
                <Link to="/geo" className="hover:text-emerald-600 transition-colors">
                  IP Geolocation &amp; Coordinates
                </Link>
              </li>
            </ul>
          </div>

          {/* Knowledge & AI Agent Specs */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 font-mono">
              Resources &amp; Specs
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/blog" className="hover:text-emerald-600 transition-colors font-semibold">
                  Engineering Guides &amp; Tutorials
                </Link>
              </li>
              <li>
                <Link to="/tools" className="hover:text-emerald-600 transition-colors">
                  All 10+ Tools Arsenal
                </Link>
              </li>
              <li>
                <Link to="/sitemap" className="hover:text-emerald-600 transition-colors">
                  HTML Sitemap
                </Link>
              </li>
              <li>
                <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 transition-colors">
                  XML Sitemap (Index)
                </a>
              </li>
              <li>
                <a href="/llms.txt" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 transition-colors">
                  AI Agent API (llms.txt)
                </a>
              </li>
              <li>
                <a href="/robots.txt" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 transition-colors">
                  robots.txt Directives
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} DNSChecker.space • All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-slate-400">DNS &amp; IP Cyber-Intelligence Platform</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
