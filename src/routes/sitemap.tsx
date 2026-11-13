import { createFileRoute, Link } from "@tanstack/react-router";
import { Seo } from "@/components/Seo";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { 
  Globe, 
  Network, 
  FileText, 
  ShieldCheck, 
  Shield, 
  Ban, 
  Mail, 
  Server, 
  MapPin,
  BookOpen,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { ALL_ARTICLES } from "@/data/blogArticles";

export const Route = createFileRoute("/sitemap")({
  head: () => ({
    meta: [
      { title: "HTML Sitemap | Complete Directory of Network Tools & Guides | DNSChecker" },
      { name: "description", content: "Complete HTML directory of all free network tools, DNS propagation checkers, IP lookups, security scanners, and engineering tutorials on DNSChecker." },
      { property: "og:title", content: "HTML Sitemap | DNSChecker" },
      { property: "og:description", content: "Complete directory of network tools, DNS lookups, and technical tutorials." },
      { property: "og:url", content: "https://www.dnschecker.space/sitemap" },
      { name: "robots", content: "index, follow" }
    ],
    links: [{ rel: "canonical", href: "https://www.dnschecker.space/sitemap" }],
  }),
  component: SitemapPage,
});

const sitemapLinks = [
  { icon: Globe, title: "What Is My IP", desc: "Inspect your public IPv4/IPv6, ISP, ASN, and connection details.", to: "/my-ip" },
  { icon: Network, title: "DNS Lookup & Propagation", desc: "Resolve A, AAAA, MX, NS, TXT, CNAME, SOA, and verify propagation.", to: "/dns" },
  { icon: FileText, title: "Domain WHOIS Lookup", desc: "Inspect domain registrar, creation date, expiry, nameservers, and DNSSEC.", to: "/whois" },
  { icon: Server, title: "Website Hosting Check", desc: "Discover hosting provider, datacenter ASN, and server origin IP.", to: "/hosting" },
  { icon: ShieldCheck, title: "SSL/TLS Checker", desc: "Audit TLS certificate validity, chain of trust, and expiration dates.", to: "/ssl" },
  { icon: Shield, title: "Security Headers Scan", desc: "Audit HSTS, CSP, X-Frame-Options, Referrer-Policy and permissions.", to: "/headers" },
  { icon: Ban, title: "IP & Domain Blacklist", desc: "Scan an IP or domain across 50+ DNSBL and RBL anti-spam registries.", to: "/blacklist" },
  { icon: Mail, title: "Email Security Check", desc: "Audit SPF, DKIM, DMARC, and MX records to ensure deliverability.", to: "/email" },
  { icon: Server, title: "Port Scanner", desc: "Scan common TCP ports (22, 80, 443, 3389, 3306) and firewalls.", to: "/ports" },
  { icon: MapPin, title: "IP Geolocation", desc: "Map any IP or domain to physical country, region, city, and GPS coordinates.", to: "/geo" },
  { icon: Globe, title: "Advanced IP Lookup", desc: "Resolve IP location, ASN, and VPN/Proxy detection status.", to: "/lookup" },
  { icon: Sparkles, title: "Tools Directory Hub", desc: "Complete central arsenal of all available network utilities.", to: "/tools" },
];

function SitemapPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Seo 
        title="HTML Sitemap | DNSChecker" 
        description="Navigate all network intelligence tools, security scanners, and engineering tutorials on DNSChecker." 
        keywords="sitemap, html sitemap, dnschecker sitemap, site index"
        url="https://www.dnschecker.space/sitemap"
        breadcrumbs={[
          { name: "Home", url: "https://www.dnschecker.space/" },
          { name: "Sitemap", url: "https://www.dnschecker.space/sitemap" }
        ]}
      />
      <SiteHeader />
      
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-16">
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold uppercase tracking-wider mb-3">
            Structure &amp; Navigation Index
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            HTML Sitemap
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
            A comprehensive, crawlable index of all diagnostic tools, security analyzers, and technical guides available on DNSChecker.
          </p>
        </div>

        <div className="space-y-10">
          {/* Main Pages & Tools Arsenal */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-8 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Globe className="h-5 w-5 text-emerald-600" />
              <span>Network Intelligence Tools ({sitemapLinks.length})</span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sitemapLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="p-4 rounded-2xl border border-slate-100 hover:border-emerald-300 hover:bg-emerald-50/50 transition-all group flex items-start gap-3"
                >
                  <link.icon className="h-5 w-5 text-slate-400 group-hover:text-emerald-600 transition-colors mt-0.5 shrink-0" />
                  <div>
                    <div className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors text-sm">
                      {link.title}
                    </div>
                    <div className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {link.desc}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Technical Engineering Guides (Blog Articles) */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-emerald-600" />
                <span>Engineering Guides &amp; Tutorials ({ALL_ARTICLES.length})</span>
              </h2>
              <Link to="/blog" className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                <span>View Blog Archive</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ALL_ARTICLES.map((article) => (
                <Link
                  key={article.slug}
                  to={`/blog/${article.slug}`}
                  className="p-4 rounded-2xl border border-slate-100 hover:border-emerald-300 hover:bg-emerald-50/50 transition-all group flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {article.category}
                    </span>
                    <h3 className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors text-xs line-clamp-2 mt-2 leading-snug">
                      {article.title}
                    </h3>
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span>{article.readTime}</span>
                    <span className="text-emerald-600 font-bold group-hover:translate-x-1 transition-transform">Read →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Machine-Readable Sitemaps */}
          <div className="bg-slate-100 rounded-3xl border border-slate-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
            <div>
              <span className="font-bold text-slate-900">Machine-Readable Feeds for Search Engines &amp; AI Agents:</span>
              <p className="text-slate-500 mt-0.5">Automated XML sitemaps and text endpoints for Web and LLM indexing.</p>
            </div>
            <div className="flex items-center gap-3">
              <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl font-mono text-emerald-700 font-bold">
                sitemap.xml
              </a>
              <a href="/robots.txt" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl font-mono text-slate-700 font-bold">
                robots.txt
              </a>
              <a href="/llms.txt" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl font-mono text-slate-700 font-bold">
                llms.txt
              </a>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
