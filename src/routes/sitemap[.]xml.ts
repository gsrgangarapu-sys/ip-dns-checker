import { createFileRoute } from "@tanstack/react-router";
import { ALL_ARTICLES } from "@/data/blogArticles";

const baseUrl = "https://dnschecker.space";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        // Core tools and static landing pages
        const coreEntries = [
          { path: "/", priority: "1.0", changefreq: "daily", lastmod: "2026-11-13" },
          { path: "/my-ip", priority: "0.95", changefreq: "daily", lastmod: "2026-11-13" },
          { path: "/lookup", priority: "0.9", changefreq: "weekly", lastmod: "2026-11-13" },
          { path: "/dns", priority: "0.95", changefreq: "daily", lastmod: "2026-11-13" },
          { path: "/whois", priority: "0.9", changefreq: "weekly", lastmod: "2026-11-13" },
          { path: "/ssl", priority: "0.9", changefreq: "weekly", lastmod: "2026-11-13" },
          { path: "/blacklist", priority: "0.9", changefreq: "weekly", lastmod: "2026-11-13" },
          { path: "/email", priority: "0.9", changefreq: "weekly", lastmod: "2026-11-13" },
          { path: "/geo", priority: "0.9", changefreq: "weekly", lastmod: "2026-11-13" },
          { path: "/headers", priority: "0.9", changefreq: "weekly", lastmod: "2026-11-13" },
          { path: "/hosting", priority: "0.9", changefreq: "weekly", lastmod: "2026-11-13" },
          { path: "/ports", priority: "0.9", changefreq: "weekly", lastmod: "2026-11-13" },
          { path: "/tools", priority: "0.85", changefreq: "weekly", lastmod: "2026-11-13" },
          { path: "/blog", priority: "0.9", changefreq: "daily", lastmod: "2026-11-13" },
          { path: "/sitemap", priority: "0.7", changefreq: "weekly", lastmod: "2026-11-13" },
        ];

        // All blog articles
        const blogEntries = ALL_ARTICLES.map((a) => ({
          path: `/blog/${a.slug}`,
          priority: a.status === "published" ? "0.85" : "0.75",
          changefreq: "weekly",
          lastmod: a.updatedDate || "2026-11-13",
        }));

        const allEntries = [...coreEntries, ...blogEntries];

        const urls = allEntries.map(e =>
          `  <url>\n    <loc>${baseUrl}${e.path}</loc>\n    <lastmod>${e.lastmod}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`
        );

        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;

        return new Response(xml, {
          headers: { 
            "Content-Type": "application/xml; charset=utf-8", 
            "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400" 
          },
        });
      },
    },
  },
});
