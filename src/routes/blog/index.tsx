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
      { property: "og:url", content: "https://www.dnschecker.space/blog" },
      { property: "og:image", content: "https://www.dnschecker.space/og-home.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "DNS, IP & Network Security Engineering Guides | DNSChecker" },
      { name: "twitter:description", content: "In-depth engineering tutorials on global DNS propagation, IPv4 vs IPv6, SSL certificates, terminal CMD IP lookups, email SPF/DKIM/DMARC, and perimeter firewalls." },
      { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" }
    ],
    links: [{ rel: "canonical", href: "https://www.dnschecker.space/blog" }],
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
        article.excerpt.toLowerCase().includes(q) ||
        article.primaryKeyword.toLowerCase().includes(q) ||
        article.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesStatus && matchesSearch;
    });
  }, [selectedCategory, searchQuery, statusFilter]);

  const featuredArticle = ALL_ARTICLES[0];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Seo 
        title="DNS, IP & Network Security Engineering Guides | DNSChecker"
        description="In-depth technical guides, tutorials, and deep-dives on DNS propagation, IP networking, SSL certificates, email deliverability, and cyber defense."
        url="https://www.dnschecker.space/blog"
        breadcrumbs={[
          { name: "Home", url: "https://www.dnschecker.space/" },
          { name: "Blog", url: "https://www.dnschecker.space/blog" }
        ]}
      />
      <SiteHeader />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-12">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Technical Knowledge Base</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Engineering Guides &amp; Tutorials
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
            Practical explanations, troubleshooting workflows, and deep architecture breakdowns for network engineers, developers, and sysadmins.
          </p>

          {/* Search Bar */}
          <div className="relative mt-8 max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search guides by keyword (e.g. DNS, Windows CMD, SPF, SSL, Ports)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm shadow-sm transition-all"
            />
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {CATEGORIES.map((category) => {
            const count = category === "All" 
              ? ALL_ARTICLES.length 
              : ALL_ARTICLES.filter((a) => a.category === category).length;
            if (count === 0 && category !== "All") return null;
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
                    : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-100"
                }`}
              >
                <span>{category}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isSelected ? "bg-emerald-700/60 text-white" : "bg-slate-100 text-slate-500"
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Article Grid */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8">
            <BookOpen className="h-12 w-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900">No matching articles found</h3>
            <p className="text-sm text-slate-500 mt-1">Try adjusting your search terms or category filter.</p>
            <button
              onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
              className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <motion.article
                key={article.slug}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-md hover:border-emerald-300 transition-all flex flex-col group"
              >
                <div className="p-6 flex-1 flex flex-col">
                  {/* Category & Status */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                      {article.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  {/* Title & Excerpt */}
                  <Link to={`/blog/${article.slug}`} className="block group-hover:text-emerald-600 transition-colors">
                    <h2 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 leading-snug line-clamp-2">
                      {article.title}
                    </h2>
                  </Link>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed flex-1">
                    {article.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-slate-100">
                    {article.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded font-mono">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono text-[11px]">{article.date}</span>
                  <Link
                    to={`/blog/${article.slug}`}
                    className="font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Read Article</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
