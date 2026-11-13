import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { Seo } from "@/components/Seo";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useState, useEffect } from "react";
import { 
  getArticleBySlug, 
  getRelatedArticles, 
  ALL_ARTICLES 
} from "@/data/blogArticles";
import { 
  Calendar, Clock, User, ArrowLeft, ArrowRight, Share2, 
  Check, Copy, ExternalLink, Bookmark, HelpCircle, 
  ChevronRight, ListOrdered, Sparkles, AlertCircle
} from "lucide-react";
import { Helmet } from "react-helmet-async";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const article = getArticleBySlug(params.slug);
    if (!article) {
      return {
        meta: [
          { title: "Article Not Found | DNSChecker" },
          { name: "description", content: "The requested article could not be found." },
          { name: "robots", content: "noindex, follow" }
        ]
      };
    }

    const title = `${article.title} | DNSChecker`;
    const description = article.metaDescription || article.excerpt;
    const url = `https://dnschecker.space/blog/${article.slug}`;

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
        { property: "og:image", content: "https://dnschecker.space/og-home.png" },
        { property: "article:published_time", content: article.date },
        { property: "article:modified_time", content: article.updatedDate },
        { property: "article:author", content: article.author.name },
        { property: "article:section", content: article.category },
        { property: "article:tag", content: article.tags.join(", ") },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "keywords", content: [article.primaryKeyword, ...article.secondaryKeywords, ...article.tags].join(", ") },
        { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" }
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: BlogPostPage,
});

export function BlogPostPage() {
  const { slug } = useParams({ from: "/blog/$slug" });
  const article = getArticleBySlug(slug);

  const [copiedLink, setCopiedLink] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
        <SiteHeader />
        <main className="flex-1 max-w-3xl mx-auto px-4 py-20 text-center">
          <AlertCircle className="h-16 w-16 text-rose-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-slate-900">Article Not Found</h1>
          <p className="text-sm text-slate-500 mt-2 mb-6">
            The guide you requested does not exist or has been moved to a new URL.
          </p>
          <Link
            to="/blog"
            className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to All Guides</span>
          </Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const relatedArticles = getRelatedArticles(article.slug, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": article.title,
    "description": article.metaDescription || article.excerpt,
    "url": `https://dnschecker.space/blog/${article.slug}`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://dnschecker.space/blog/${article.slug}`
    },
    "author": {
      "@type": "Person",
      "name": article.author.name,
      "jobTitle": article.author.role
    },
    "publisher": {
      "@type": "Organization",
      "name": "DNSChecker",
      "url": "https://dnschecker.space/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://dnschecker.space/favicon.svg"
      }
    },
    "datePublished": article.date,
    "dateModified": article.updatedDate,
    "keywords": [article.primaryKeyword, ...article.secondaryKeywords].join(", "),
    "about": {
      "@type": "Thing",
      "name": article.primaryKeyword
    }
  };

  const breadcrumbs = [
    { name: "Home", url: "https://dnschecker.space/" },
    { name: "Blog", url: "https://dnschecker.space/blog" },
    { name: article.title, url: `https://dnschecker.space/blog/${article.slug}` }
  ];

  const shareUrl = `https://dnschecker.space/blog/${article.slug}`;

  const copyShareLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Top Reading Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-emerald-500 z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      <Seo 
        title={`${article.title} | DNSChecker`}
        description={article.metaDescription || article.excerpt}
        url={shareUrl}
        schema={articleSchema}
        faqs={article.faqs}
        breadcrumbs={breadcrumbs}
        toolName={article.toolName}
      />

      <SiteHeader />

      <main className="flex-1 pb-20">
        {/* Breadcrumb Navigation */}
        <div className="bg-white border-b border-slate-200/80">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3">
            <nav className="flex items-center gap-1.5 text-xs text-slate-500 overflow-x-auto scrollbar-none">
              <Link to="/" className="hover:text-emerald-600 transition-colors">Home</Link>
              <ChevronRight className="h-3 w-3 text-slate-400 shrink-0" />
              <Link to="/blog" className="hover:text-emerald-600 transition-colors">Blog</Link>
              <ChevronRight className="h-3 w-3 text-slate-400 shrink-0" />
              <span className="text-slate-400 shrink-0">{article.category}</span>
              <ChevronRight className="h-3 w-3 text-slate-400 shrink-0" />
              <span className="text-slate-900 font-medium truncate max-w-[200px] sm:max-w-xs">{article.title}</span>
            </nav>
          </div>
        </div>

        {/* Article Header */}
        <header className="bg-gradient-to-b from-white to-slate-100 border-b border-slate-200/80 pt-10 pb-12 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                {article.category}
              </span>
              {article.status === "draft" && (
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-300 px-2.5 py-0.5 rounded-full">
                  Draft for Approval
                </span>
              )}
              <span className="text-xs font-mono text-slate-500 flex items-center gap-1 pl-2">
                <Clock className="h-3.5 w-3.5 text-slate-400" />
                {article.readTime}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {article.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
              {article.subtitle}
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200/80 text-xs text-slate-500">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs shadow-sm">
                  {article.author.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-slate-900">{article.author.name}</div>
                  <div className="text-[11px] text-slate-400">{article.author.role}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" /> Published: {article.date}
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="hidden sm:inline">Updated: {article.updatedDate}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Article Body + Sidebar Layout */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Main Content Column */}
            <div className="lg:col-span-8 space-y-8">
              {/* Interactive Tool Callout */}
              <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded">
                    Companion Diagnostic Tool
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm">{article.toolName}</h3>
                  <p className="text-xs text-slate-600">
                    Test your domain or IP address in real time with our free online network scanner.
                  </p>
                </div>
                <Link
                  to={article.toolLink}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap shadow-sm shrink-0 flex items-center gap-1.5"
                >
                  <span>Launch Tool</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Table of Contents (Mobile / Top) */}
              {article.tableOfContents && article.tableOfContents.length > 0 && (
                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm">
                  <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2 mb-3">
                    <ListOrdered className="h-4 w-4 text-emerald-600" />
                    <span>Table of Contents</span>
                  </h3>
                  <ul className="space-y-2 text-xs">
                    {article.tableOfContents.map((item, idx) => (
                      <li key={item.id}>
                        <a 
                          href={`#${item.id}`}
                          className="text-slate-600 hover:text-emerald-600 hover:underline flex items-center gap-2"
                        >
                          <span className="font-mono text-emerald-600 font-bold">{idx + 1}.</span>
                          <span>{item.title}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Rendered Article Content */}
              <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/90 shadow-sm">
                {article.content}
              </div>

              {/* FAQ Section */}
              {article.faqs && article.faqs.length > 0 && (
                <div id="faq" className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-emerald-600" />
                    <span>Frequently Asked Questions</span>
                  </h3>
                  <div className="divide-y divide-slate-100">
                    {article.faqs.map((faq, idx) => (
                      <div key={idx} className="py-4 space-y-2">
                        <h4 className="font-bold text-slate-900 text-sm">
                          {faq.question}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Social Sharing Bar */}
              <div className="p-6 rounded-3xl bg-slate-100 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="font-bold text-xs uppercase tracking-wider text-slate-700 flex items-center gap-2">
                  <Share2 className="h-4 w-4 text-emerald-600" /> Share this technical guide:
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold"
                  >
                    Twitter / X
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={`https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(article.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold"
                  >
                    Reddit
                  </a>
                  <button
                    onClick={copyShareLink}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-semibold flex items-center gap-1"
                  >
                    {copiedLink ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copiedLink ? "Copied!" : "Copy URL"}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar Column */}
            <aside className="lg:col-span-4 space-y-6">
              {/* Quick Tool Box */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider font-mono">
                  Recommended Tool
                </h4>
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                  <div className="font-bold text-emerald-950 text-sm">
                    {article.toolName}
                  </div>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    Test live resolution, IP records, and security telemetry instantly.
                  </p>
                  <Link
                    to={article.toolLink}
                    className="mt-2 w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1 uppercase tracking-wider"
                  >
                    <span>Run Scanner</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              {/* Related Articles */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider font-mono">
                  Related Guides
                </h4>
                <div className="space-y-3">
                  {relatedArticles.map((rel) => (
                    <Link
                      key={rel.slug}
                      to={`/blog/${rel.slug}`}
                      className="block p-3 rounded-2xl border border-slate-100 hover:border-emerald-300 hover:bg-emerald-50/50 transition-all group"
                    >
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                        {rel.category}
                      </span>
                      <h5 className="font-bold text-slate-900 text-xs group-hover:text-emerald-600 transition-colors line-clamp-2 mt-1">
                        {rel.title}
                      </h5>
                      <span className="text-[10px] font-mono text-slate-400 mt-1 block">
                        {rel.readTime}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Back to Blog */}
              <Link
                to="/blog"
                className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>All Knowledge Base Guides</span>
              </Link>
            </aside>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
