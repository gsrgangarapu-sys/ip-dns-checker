# DNSChecker.space — Complete SEO Automation & Deployment Guide

This documentation details the complete technical SEO architecture, blog system, AI content automation pipeline, Google Search Console & GA4 integrations, and CI/CD monitoring configured for **DNSChecker.space**.

---

## 1. Architecture & Framework Overview

- **Production Domain:** `https://www.dnschecker.space/`
- **Framework:** React 19 + TypeScript + TanStack Start + Nitro SSR
- **Styling:** Tailwind CSS v4 + Framer Motion
- **Hosting Platform:** Vercel (Global Edge Network)
- **Deployment Strategy:** Git-integrated Continuous Deployment.
  - Branch `feat/seo-automation-and-blog`: Preview deployment on Vercel.
  - Pull Request to `main`: Automatic preview testing & review.
  - Branch `main`: Zero-downtime production deployment.

---

## 2. Complete Technical SEO Architecture

### 2.1 Canonical URLs & Dynamic Meta Tags
Every page and tool implements a canonical URL pointing to `https://dnschecker.space`:
- Home: `/`
- My IP: `/my-ip`
- IP Lookup: `/lookup`
- DNS Lookup & Propagation: `/dns`
- Domain WHOIS: `/whois`
- SSL Certificate Checker: `/ssl`
- IP & Domain Blacklist: `/blacklist`
- Email Deliverability (SPF/DKIM/DMARC): `/email`
- IP Geolocation: `/geo`
- Security Headers: `/headers`
- Hosting Detector: `/hosting`
- Open Port Scanner: `/ports`
- Tools Directory: `/tools`
- Blog Archive: `/blog`
- HTML Sitemap: `/sitemap`
- Individual Blog Guides: `/blog/:slug`

### 2.2 Structured Data (JSON-LD Schemas)
Integrated via `src/components/Seo.tsx`:
1. **`WebSite` Schema:** Sitelinks SearchBox pointing to `https://dnschecker.space/lookup?q={search_term_string}`.
2. **`Organization` Schema:** Knowledge Graph entity with logo and official GitHub repository link.
3. **`WebApplication` & `SoftwareApplication` Schemas:** Applied to all 11+ diagnostic tools.
4. **`TechArticle` & `BlogPosting` Schemas:** Applied to all blog guides with author, publish date, modified date, and keywords.
5. **`BreadcrumbList` Schema:** Visual and structured hierarchical breadcrumb trail on all tools and blog posts.
6. **`FAQPage` Schema:** Injected dynamically on every guide and landing page for Google rich FAQ snippet expansion.

### 2.3 XML & HTML Sitemaps
- **Dynamic XML Endpoint:** `/sitemap.xml` generated on-the-fly via `src/routes/sitemap[.]xml.ts`.
- **Static XML Fallback:** `public/sitemap.xml` updated with all 32+ pages and individual articles.
- **Interactive HTML Sitemap:** `/sitemap` displaying categorization of all tools and articles with direct links.
- **AI Agent API:** `public/llms.txt` and `public/llms-full.txt` listing machine-readable endpoints for Claude, ChatGPT, and Perplexity.

---

## 3. Blog System Architecture

- **Archive Route:** `/blog/` (`src/routes/blog/index.tsx`)
  - Live instant search across titles, excerpts, and keywords.
  - Category filters: *Fundamentals, DNS & Domain, Website & Hosting, SSL & TLS, Email & Deliverability, Security & Blacklist, CMD & Terminal, Minecraft & Gaming, VPN & Privacy*.
  - Article status filter (toggle between Published articles and Drafts for approval).
- **Individual Article Route:** `/blog/$slug` (`src/routes/blog/$slug.tsx`)
  - Dynamic route parameters with full SSR head tags.
  - Sticky/top reading progress bar and estimated reading time.
  - Interactive companion tool card linking directly to relevant DNSChecker tools.
  - Table of Contents with jump links.
  - Expandable FAQ accordion.
  - Social sharing buttons (Twitter/X, LinkedIn, Reddit, Copy URL).
  - Contextual related guides.

---

## 4. Initial 15 High-Value Targeted SEO Articles

All 15 targeted articles are created with in-depth technical explanations, command-line snippets, comparison tables, and FAQs:

| # | Article Title | Slug | Target Keyword | Companion Tool |
|---|---|---|---|---|
| 1 | What Is My IP Address? | `what-is-my-ip-address` | what is my ip address | `/my-ip` |
| 2 | How to Find IP Address in Windows CMD | `how-to-find-ip-address-in-windows-cmd` | how to find ip address in cmd | `/my-ip` |
| 3 | IPv4 vs IPv6 Explained | `ipv4-vs-ipv6-explained` | ipv4 vs ipv6 | `/lookup` |
| 4 | How DNS Lookup Works | `how-dns-lookup-works` | how dns lookup works | `/dns` |
| 5 | How to Check DNS Propagation | `how-to-check-dns-propagation` | how to check dns propagation | `/dns` |
| 6 | How to Check IP Blacklists | `how-to-check-ip-blacklists` | how to check ip blacklist | `/blacklist` |
| 7 | How to Check SPF, DKIM and DMARC | `how-to-check-spf-dkim-dmarc` | how to check spf dkim dmarc | `/email` |
| 8 | How to Check SSL Certificates | `how-to-check-ssl-certificates` | how to check ssl certificate | `/ssl` |
| 9 | How to Find Website Hosting IP | `how-to-find-website-hosting-ip` | find website hosting ip | `/hosting` |
| 10 | How to Check Open Ports | `how-to-check-open-ports` | how to check open ports | `/ports` |
| 11 | What Is Reverse DNS Lookup? | `what-is-reverse-dns-lookup` | reverse dns lookup | `/dns` |
| 12 | How to Troubleshoot DNS Errors | `how-to-troubleshoot-dns-errors` | troubleshoot dns errors | `/dns` |
| 13 | What Are DNS Records (A, AAAA, MX, TXT) Explained? | `what-are-dns-records-a-aaaa-mx-txt` | dns records explained | `/dns` |
| 14 | How to Check Website Security Headers | `how-to-check-website-security-headers` | check website security headers | `/headers` |
| 15 | What Is DNSSEC? | `what-is-dnssec-guide` | what is dnssec | `/dns` |

---

## 5. AI SEO Automation Suite

Run these automated commands directly via npm:

```bash
# 1. Discover high-volume, low-competition keywords in the networking niche
npm run seo:research

# 2. Generate a new article draft using AI templates
npm run seo:draft "how to flush dns cache windows"

# 3. Audit all existing articles for keyword density, title/meta lengths & schema
npm run seo:audit

# 4. Promote an approved article from "draft" to "published" and ping IndexNow
npm run seo:publish what-is-my-ip-address

# 5. Run Search Console & Google Analytics performance analysis
npm run seo:gsc

# 6. Execute live site health, SSL, response time, and security header audit
npm run seo:monitor
```

---

## 6. Google Search Console & GA4 Setup

1. **Google Search Console Verification:**
   - In GSC, add property `https://www.dnschecker.space/`.
   - Verify via HTML tag or DNS TXT record.
   - Submit sitemap URL: `https://www.dnschecker.space/sitemap.xml`.
2. **Google Analytics 4:**
   - In `src/routes/__root.tsx`, set your `GA_MEASUREMENT_ID` (e.g. `G-XXXXXXXXXX`).
   - Pageviews and navigation events are tracked automatically on every route change.
3. **IndexNow Instant Indexing:**
   - IndexNow key `d9f4e2a1b7c84e3a9f0b1c2d3e4f5a6b` is configured at `/d9f4e2a1b7c84e3a9f0b1c2d3e4f5a6b.txt`.
   - When new articles are published, `npm run indexnow` alerts Bing and Yandex within seconds.

---

## 7. CI/CD GitHub Workflows

- **`.github/workflows/seo-ci.yml`:**
  Runs on every push and pull request. Validates content quality, runs the TypeScript compiler and Nitro bundle build, and verifies zero build errors.
- **`.github/workflows/weekly-seo-monitor.yml`:**
  Scheduled weekly cron job (Mondays at 06:00 UTC). Automatically tests endpoint availability, latency, SSL expiration, sitemap integrity, and keyword trends.
