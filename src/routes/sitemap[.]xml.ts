import { createFileRoute } from "@tanstack/react-router";

const baseUrl = "https://dnschecker.space";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {

        const entries = [
          { path: "/", priority: "1.0", changefreq: "daily", lastmod: "2026-11-10" },
          { path: "/my-ip", priority: "0.9", changefreq: "daily", lastmod: "2026-11-09" },
          { path: "/lookup", priority: "0.9", changefreq: "weekly", lastmod: "2026-11-09" },
          { path: "/tools", priority: "0.8", changefreq: "weekly", lastmod: "2026-11-09" },
          { path: "/blog", priority: "0.9", changefreq: "daily", lastmod: "2026-11-10" },
          { path: "/dns", priority: "0.8", changefreq: "weekly", lastmod: "2026-11-09" },
          { path: "/whois", priority: "0.8", changefreq: "weekly", lastmod: "2026-11-09" },
          { path: "/ssl", priority: "0.8", changefreq: "weekly", lastmod: "2026-11-09" },
          { path: "/blacklist", priority: "0.8", changefreq: "weekly", lastmod: "2026-11-09" },
          { path: "/email", priority: "0.8", changefreq: "weekly", lastmod: "2026-11-09" },
          { path: "/geo", priority: "0.8", changefreq: "weekly", lastmod: "2026-11-09" },
          { path: "/headers", priority: "0.8", changefreq: "weekly", lastmod: "2026-11-09" },
          { path: "/hosting", priority: "0.8", changefreq: "weekly", lastmod: "2026-11-09" },
          { path: "/ports", priority: "0.8", changefreq: "weekly", lastmod: "2026-11-09" },
          { path: "/sitemap", priority: "0.7", changefreq: "weekly", lastmod: "2026-11-09" },
        ];

        const urls = entries.map(e =>
          `  <url>\n    <loc>${baseUrl}${e.path}</loc>\n    <lastmod>${e.lastmod}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`
        );

        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;

        return new Response(xml, {
          headers: { 
            "Content-Type": "application/xml; charset=utf-8", 
            "Cache-Control": "public, max-age=3600" 
          },
        });
      },
    },
  },
});
