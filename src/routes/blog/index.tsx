import { createFileRoute, Link } from "@tanstack/react-router";
import { Seo } from "@/components/Seo";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useState, useMemo } from "react";
import { 
  Search, Globe, ShieldCheck, ArrowRight, BookOpen, Clock, 
  Tag, Compass, Server, ShieldAlert, Terminal, Layers,
  CheckCircle2, Sparkles, Filter, ChevronRight, Eye
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ALL_ARTICLES } from "@/data/blogArticles";
import { ArticleCategory } from "@/types/blog";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "DNS, IP & Network Security Engineering Guides | DNSChecker" },
      { name: "description", content: "In-depth engineering tutorials on global DNS propagation, IPv4 vs IPv6, SSL certificates, terminal CMD IP lookups, email SPF/DKIM/DMARC, and perimeter firewalls." },
      { property: "og:title", content: "DNS, IP & Network Security Engineering Guides | DNSChecker" },
      { property: "og:description", content: "In-depth engineering tutorials on global DNS propagation, IPv4 vs IPv6, SSL certificates, terminal CMD IP lookups, email SPF/DKIM/DMARC, and perimeter firewalls." },
      { property: "og:url", content: "https://dnschecker.space/blog" },
      { property: "og:image", content: "https://dnschecker.space/og-home.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "DNS, IP & Network Security Engineering Guides | DNSChecker" },
      { name: "twitter:description", content: "In-depth engineering tutorials on global DNS propagation, IPv4 vs IPv6, SSL certificates, terminal CMD IP lookups, email SPF/DKIM/DMARC, and perimeter firewalls." },
      { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" }
    ],
    links: [{ rel: "canonical", href: "https://dnschecker.space/blog" }],
  }),
  component: BlogArchivePage,
});

const CATEGORIES: ArticleCategory[] = [
  "All",
  "Fundamentals",
  "DNS & Domain",
  "Website & Hosting",
  "SSL & TLS",
  "Email & Deliverability",
  "Security & Blacklist",
  "CMD & Terminal",
  "Minecraft & Gaming",
  "VPN & Privacy",
];

export function BlogArchivePage() {
  const [selectedCategory, setSelectedCategory] = useState<ArticleCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");

  const filteredArticles = useMemo(() => {
    return ALL_ARTICLES.filter((article) => {
      const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
      const matchesStatus = statusFilter === "all" || article.status === statusFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        article.title.toLowerCase().includes(q) ||
        article.subtitle.toLowerCase().includes(q) ||
        article.excerpt.toLowerCase().includes(q) ||
        article.tags.some((t) => t.toLowerCase().includes(q)) ||
        article.primaryKeyword.toLowerCase().includes(q);

      return matchesCategory && matchesStatus && matchesSearch;
    });
  }, [selectedCategory, searchQuery, statusFilter]);

  const featuredArticle = ALL_ARTICLES[0];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Seo 
        title="DNS & Network Security Guides | DNSChecker"
        description="Master global DNS propagation, IP lookups, SSL encryption, and email security with step-by-step guides."
        url="https://dnschecker.space/blog"
        breadcrumbs={[
          { name: "Home", url: "https://dnschecker.space/" },
          { name: "Blog", url: "https://dnschecker.space/blog" }
        ]}
      />

      <SiteHeader />

      <main className="flex-1 pb-16">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-16 pb-20 px-4 sm:px-6">
          <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
          <div className="max-w-5xl mx-auto relative z-10 text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" />
              <span>DNSChecker Knowledge Base & Engineering Blog</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl mx-auto leading-tight">
              Master Network Telemetry, DNS Resolution & Cyber Defense
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              In-depth, field-tested tutorials for systems engineers, web developers, and security auditors. Learn how global networks route packets, resolve DNS, and secure perimeters.
            </p>

            {/* Live Search Bar */}
            <div className="max-w-xl mx-auto pt-4">
              <div className="relative flex items-center">
                <Search className="absolute left-4 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles by keyword (e.g. DNS propagation, CMD IP, SSL, SPF)..."
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm shadow-xl"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 text-xs font-mono text-slate-400 hover:text-white"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-6 relative z-20">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200/80 p-4 space-y-3">
            {/* Category pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 pl-1 pr-2 whitespace-nowrap">
                <Filter className="h-3.5 w-3.5" /> Topics:
              </span>
              {CATEGORIES.map((cat) => {
                const count = cat === "All" 
                  ? ALL_ARTICLES.length 
                  : ALL_ARTICLES.filter((a) => a.category === cat).length;
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-emerald-600 text-white shadow-sm font-semibold"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                    }`}
                  >
                    <span>{cat}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? "bg-emerald-700 text-emerald-100" : "bg-slate-200 text-slate-500"}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Status toggle (Published vs Drafts approval preview) */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-700">Display:</span>
                <button
                  onClick={() => setStatusFilter("all")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium ${statusFilter === "all" ? "bg-slate-900 text-white font-bold" : "hover:text-slate-900"}`}
                >
                  All ({ALL_ARTICLES.length})
                </button>
                <button
                  onClick={() => setStatusFilter("published")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium ${statusFilter === "published" ? "bg-emerald-600 text-white font-bold" : "hover:text-slate-900"}`}
                >
                  Published ({ALL_ARTICLES.filter(a => a.status === "published").length})
                </button>
                <button
                  onClick={() => setStatusFilter("draft")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium ${statusFilter === "draft" ? "bg-amber-600 text-white font-bold" : "hover:text-slate-900"}`}
                >
                  Drafts for Approval ({ALL_ARTICLES.filter(a => a.status === "draft").length})
                </button>
              </div>
              <span className="hidden sm:inline font-mono text-[11px] text-slate-400">
                Showing {filteredArticles.length} guides
              </span>
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
              <BookOpen className="h-12 w-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-900">No matching articles found</h3>
              <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
                Try adjusting your search terms or selecting a different category.
              </p>
              <button
                onClick={() => { setSelectedCategory("All"); setSearchQuery(""); setStatusFilter("all"); }}
                className="mt-4 px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl hover:bg-emerald-700"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article, idx) => (
                <article
                  key={article.slug}
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300 flex flex-col overflow-hidden group"
                >
                  <div className="p-6 flex-1 flex flex-col">
                    {/* Category & Status Badges */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-0.5 rounded-full">
                        {article.category}
                      </span>
                      <div className="flex items-center gap-2">
                        {article.status === "draft" && (
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Clock className="h-2.5 w-2.5" /> Draft
                          </span>
                        )}
                        <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                          <Clock className="h-3 w-3" /> {article.readTime}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-2 leading-snug">
                      <Link to={`/blog/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h2>

                    {/* Excerpt */}
                    <p className="text-xs text-slate-600 mt-2.5 line-clamp-3 leading-relaxed flex-1">
                      {article.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-slate-100">
                      {article.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-[10px] font-mono text-slate-500 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-md">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Bottom Action */}
                    <div className="mt-5 pt-3 flex items-center justify-between text-xs">
                      <div className="text-[11px] text-slate-400">
                        {article.date}
                      </div>
                      <Link
                        to={`/blog/${article.slug}`}
                        className="inline-flex items-center gap-1.5 font-bold text-emerald-600 group-hover:translate-x-1 transition-all"
                      >
                        <span>Read Guide</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Tools Arsenal Banner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16">
          <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                Interactive Toolkit
              </span>
              <h3 className="text-2xl font-bold text-white">
                Put These Guides to Work with Our Free Network Diagnostics Arsenal
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Explore real-time DNS propagation lookups, IP geolocation, SSL validation, open port testing, and WHOIS domain registries—100% free with live public data.
              </p>
            </div>
            <Link
              to="/tools"
              className="px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap shadow-lg flex items-center gap-2"
            >
              <span>Explore All 10+ Tools</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
