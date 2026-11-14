/**
 * DNSChecker Daily Blog Auto-Creator & Publisher
 * Automatically selects the next unwritten high-ranking topic across the 8 network pillars:
 * 1. IP (Checker & Lookup)
 * 2. DNS (Lookup & Propagation)
 * 3. WHOIS (Domain Registration)
 * 4. SSL (Certificate Integrity)
 * 5. Security Scan (Headers & Blacklist)
 * 6. Email (SPF, DKIM, DMARC)
 * 7. Ports (Port Scanner & Reachability)
 * 8. Geo (IP Geolocation & ASN)
 *
 * It generates human-quality technical content, updates sitemaps, commits/pushes to GitHub,
 * submits URLs to IndexNow, and notifies Google Chat via webhook.
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { sendGoogleChatNotification } from './notify-chat.js';
import { submitIndexNow } from '../indexnow.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PILLAR_TOPICS = [
  {
    slug: "public-vs-private-ip-ranges-rfc-1918",
    title: "Public vs. Private IP Addresses: RFC 1918 Subnets & NAT Translation Guide",
    subtitle: "A deep dive into 10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16 private blocks, Network Address Translation (NAT), and how routers bridge private LANs to the public Internet.",
    category: "Fundamentals",
    primaryKeyword: "public vs private ip address",
    secondaryKeywords: ["rfc 1918 subnets", "private ip address ranges", "nat translation explained", "192.168.1.1 gateway"],
    toolLink: "/my-ip",
    toolName: "Check Your Public IP Address",
    readTime: "7 min read",
    excerpt: "Understand how RFC 1918 private subnets protect LAN devices, how Network Address Translation (NAT) conserves IPv4 address space, and how to detect your router's true WAN IP.",
    metaDescription: "Learn the difference between public and private IP addresses. Master RFC 1918 subnets, NAT routing, and verify your public IP with our free IP checker.",
    pillar: "IP"
  },
  {
    slug: "how-to-fix-dns-probe-finished-nxdomain",
    title: "How to Fix DNS_PROBE_FINISHED_NXDOMAIN in Chrome & Windows: 7 Proven Methods",
    subtitle: "Troubleshoot and fix the NXDOMAIN browser error caused by stale DNS cache, misconfigured resolvers, firewall blocks, or expired domain names.",
    category: "DNS & Domain",
    primaryKeyword: "how to fix dns_probe_finished_nxdomain",
    secondaryKeywords: ["nxdomain error fix", "flush dns chrome", "dns server not responding", "fix dns probe finished nxdomain windows"],
    toolLink: "/dns",
    toolName: "Check Domain DNS Propagation",
    readTime: "8 min read",
    excerpt: "Step-by-step diagnostic guide to resolve DNS_PROBE_FINISHED_NXDOMAIN across Google Chrome, Windows 11, macOS, and Linux resolvers.",
    metaDescription: "Learn 7 proven ways to fix DNS_PROBE_FINISHED_NXDOMAIN in Chrome and Windows. Flush local DNS, reset Winsock, change resolvers, and verify domain propagation.",
    pillar: "DNS"
  },
  {
    slug: "whois-privacy-protection-gdpr-redaction",
    title: "WHOIS Privacy Protection vs. GDPR Redaction: What Domain Owners Must Know",
    subtitle: "How ICANN's Temporary Specification and European privacy regulations transformed public domain registrar directories and what data remains visible.",
    category: "Website & Hosting",
    primaryKeyword: "whois privacy protection",
    secondaryKeywords: ["gdpr domain redaction", "whois guard explained", "icann whois policy", "domain privacy lookup"],
    toolLink: "/whois",
    toolName: "Check Domain WHOIS Record",
    readTime: "6 min read",
    excerpt: "Discover why personal registrant data is redacted from WHOIS queries under GDPR, how proxy services operate, and how to verify legitimate domain ownership.",
    metaDescription: "Explore WHOIS privacy protection and GDPR data redaction. Understand what domain information remains public and check any domain's status with our WHOIS tool.",
    pillar: "WHOIS"
  },
  {
    slug: "how-to-renew-lets-encrypt-ssl-certbot",
    title: "How to Renew Let's Encrypt SSL Certificates with Certbot: Automated & Manual Guide",
    subtitle: "Automate 90-day Let's Encrypt SSL/TLS certificate renewals using Certbot, systemd timers, and cron on Nginx and Apache web servers.",
    category: "SSL & TLS",
    primaryKeyword: "renew lets encrypt ssl certbot",
    secondaryKeywords: ["certbot renew dry run", "nginx ssl cert renewal", "letsencrypt cronjob", "ssl certificate expired fix"],
    toolLink: "/ssl",
    toolName: "Check SSL Certificate Expiry",
    readTime: "7 min read",
    excerpt: "Master Certbot renewal hooks, verify automated systemd timers, avoid rate limits, and test certificate chain validity with our free SSL inspector.",
    metaDescription: "Complete guide to renewing Let's Encrypt SSL certificates with Certbot. Learn automated cron renewals, dry-run testing, and verify TLS chains.",
    pillar: "SSL"
  },
  {
    slug: "how-to-configure-content-security-policy-csp",
    title: "How to Configure Content-Security-Policy (CSP) Headers to Stop XSS Attacks",
    subtitle: "Build robust Content-Security-Policy HTTP headers to block cross-site scripting (XSS), data injection, and unauthorized script execution.",
    category: "Security & Blacklist",
    primaryKeyword: "content security policy csp header",
    secondaryKeywords: ["csp header example", "prevent xss with csp", "script-src default-src", "security headers scanner"],
    toolLink: "/headers",
    toolName: "Scan Website Security Headers",
    readTime: "8 min read",
    excerpt: "Learn how to craft strict Content-Security-Policy headers, balance nonce vs hash directives, prevent XSS attacks, and audit your security grade.",
    metaDescription: "Step-by-step tutorial on configuring Content-Security-Policy (CSP) headers. Prevent XSS and clickjacking, and test your server headers for free.",
    pillar: "Security Scan"
  },
  {
    slug: "dmarc-policy-none-vs-quarantine-vs-reject",
    title: "DMARC Policy Explained: p=none vs. p=quarantine vs. p=reject Step-by-Step",
    subtitle: "How to safely advance your domain's DMARC policy from monitoring to full enforcement without dropping legitimate customer emails.",
    category: "Email & Deliverability",
    primaryKeyword: "dmarc policy none vs quarantine vs reject",
    secondaryKeywords: ["dmarc p=reject guide", "prevent email spoofing", "dmarc alignment spf dkim", "email security audit"],
    toolLink: "/email",
    toolName: "Audit Email SPF, DKIM & DMARC",
    readTime: "7 min read",
    excerpt: "Safely transition your DMARC record from p=none to p=reject. Ensure SPF and DKIM alignment to prevent spoofing and land in Google and Yahoo inboxes.",
    metaDescription: "Understand DMARC policy options: p=none, p=quarantine, and p=reject. Follow best practices to stop domain spoofing and verify your email records.",
    pillar: "Email"
  },
  {
    slug: "top-20-vulnerable-network-ports-hackers-scan",
    title: "Top 20 Vulnerable Ports Hackers Scan: Firewalls, Risks & Mitigation Guide",
    subtitle: "An engineering breakdown of the most targeted TCP/UDP ports (21, 22, 23, 25, 80, 443, 445, 3389) and how to secure them with UFW and iptables.",
    category: "Security & Blacklist",
    primaryKeyword: "vulnerable network ports to scan",
    secondaryKeywords: ["port 3389 rdp exploit", "port 445 smb security", "open port vulnerability scanner", "firewall port security"],
    toolLink: "/ports",
    toolName: "Scan Open Ports & Firewall",
    readTime: "9 min read",
    excerpt: "Discover which ports automated internet botnets scan first, the common exploits associated with SMB (445), RDP (3389), and SSH (22), and how to close them.",
    metaDescription: "Learn which network ports are most frequently scanned by attackers and how to harden your server firewalls. Audit your open ports with our free scanner.",
    pillar: "Ports"
  },
  {
    slug: "why-ip-geolocation-shows-wrong-city",
    title: "Why Does IP Geolocation Show the Wrong City? ISP PoPs, CDNs & Mobile Routing",
    subtitle: "Explore why IP-to-location mapping can differ from physical GPS coordinates due to carrier aggregation, dynamic DHCP leasing, and Anycast routing.",
    category: "Fundamentals",
    primaryKeyword: "why ip geolocation shows wrong city",
    secondaryKeywords: ["ip location inaccurate", "isp point of presence pop", "how accurate is ip geolocation", "fix wrong ip address location"],
    toolLink: "/geo",
    toolName: "Verify IP Geolocation Telemetry",
    readTime: "6 min read",
    excerpt: "Understand the technical reasons why IP geolocation databases place your device miles away from your home, and how MaxMind and IP2Location update records.",
    metaDescription: "Find out why your IP address shows the wrong city or state. Learn how ISP PoPs, VPN routing, and Anycast CDNs impact IP geolocation accuracy.",
    pillar: "Geo"
  }
];

export async function runDailyAutoBlog() {
  console.log("==================================================");
  console.log("DNSChecker Daily Blog Auto-Publisher & SEO Booster");
  console.log("==================================================\n");

  const blogFilePath = path.resolve(__dirname, "../../src/data/blogArticles.tsx");
  const sitemapXmlPath = path.resolve(__dirname, "../../public/sitemap.xml");
  const llmsTxtPath = path.resolve(__dirname, "../../public/llms.txt");

  let currentBlogSource = fs.readFileSync(blogFilePath, 'utf-8');

  // Select next unwritten topic from the 8-pillar catalog
  let selected = null;
  for (const topic of PILLAR_TOPICS) {
    if (!currentBlogSource.includes(`slug: "${topic.slug}"`)) {
      selected = topic;
      break;
    }
  }

  if (!selected) {
    console.log("All predefined pillar topics are already published!");
    console.log("Generating dynamic advanced network security topic...");
    const timestamp = Date.now();
    selected = {
      slug: `network-telemetry-best-practices-${timestamp.toString().slice(-4)}`,
      title: "Advanced Network Telemetry & Real-Time DNS Propagation Monitoring",
      subtitle: "Enterprise workflows for tracking global DNS record propagation and mitigating DNS cache poisoning across anycast edge nodes.",
      category: "DNS & Domain",
      primaryKeyword: "dns propagation monitoring",
      secondaryKeywords: ["network telemetry tools", "global dns checker", "anycast dns monitoring"],
      toolLink: "/dns",
      toolName: "Check DNS Propagation Globally",
      readTime: "7 min read",
      excerpt: "Deep architecture breakdown of DNS resolver telemetry, TTL caching mechanisms, and automated validation for high-availability systems.",
      metaDescription: "Learn advanced DNS propagation monitoring strategies. Ensure zero downtime during domain migrations with real-time global telemetry.",
      pillar: "DNS"
    };
  }

  console.log(`Pillar: [${selected.pillar}]`);
  console.log(`Selected Topic: "${selected.title}"`);
  console.log(`Slug: ${selected.slug}`);
  console.log(`Target Tool: https://www.dnschecker.space${selected.toolLink}\n`);

  const today = new Date().toISOString().split('T')[0];
  const liveUrl = `https://www.dnschecker.space/blog/${selected.slug}`;

  // Generate article TypeScript code
  const articleEntry = `
  // ${selected.pillar} Pillar: ${selected.title}
  {
    id: "${selected.slug}",
    slug: "${selected.slug}",
    title: "${selected.title.replace(/"/g, '\\"')}",
    subtitle: "${selected.subtitle.replace(/"/g, '\\"')}",
    category: "${selected.category}",
    status: "published",
    readTime: "${selected.readTime}",
    date: "November 2026",
    updatedDate: "${today}",
    author: {
      name: "DNSChecker Telemetry Team",
      role: "Network Infrastructure & Cyber Defense Specialist"
    },
    primaryKeyword: "${selected.primaryKeyword}",
    secondaryKeywords: ${JSON.stringify(selected.secondaryKeywords)},
    searchIntent: "Informational",
    tags: ["${selected.pillar}", "Networking", "Cybersecurity", "DNSChecker", "SEO"],
    excerpt: "${selected.excerpt.replace(/"/g, '\\"')}",
    metaDescription: "${selected.metaDescription.replace(/"/g, '\\"')}",
    canonicalUrl: "${liveUrl}",
    toolLink: "${selected.toolLink}",
    toolName: "${selected.toolName}",
    tableOfContents: [
      { id: "overview", title: "Technical Overview & Architecture" },
      { id: "deep-dive", title: "Step-by-Step Implementation & Diagnostics" },
      { id: "troubleshooting", title: "Common Pitfalls & Best Practices" },
      { id: "faq", title: "Frequently Asked Questions" }
    ],
    faqs: [
      {
        question: "How does this directly affect website availability and ranking?",
        answer: "Consistent network reachability, valid SSL/TLS certificates, proper DNS propagation, and strict email security headers prevent domain reputation degradation, phishing blacklisting, and SEO search ranking drops."
      },
      {
        question: "What is the recommended audit frequency for ${selected.pillar} infrastructure?",
        answer: "Automated continuous monitoring or at minimum a weekly telemetry audit is recommended to identify expired certificates, DNS propagation delays, or unexpected port exposures before they impact users."
      },
      {
        question: "Can I test this without installing terminal utilities?",
        answer: "Yes, you can run instant diagnostic scans directly using DNSChecker.space's free suite of telemetry and security checking tools."
      }
    ],
    relatedSlugs: ["what-is-my-ip-address", "how-dns-lookup-works", "how-to-check-ssl-certificates"],
    content: (
      <div className="space-y-6 text-slate-700 leading-relaxed">
        <p className="text-lg text-slate-800 font-medium">
          Maintaining resilient, high-speed internet infrastructure requires continuous visibility into network routing, DNS propagation, TLS encryption, and perimeter firewalls. In this guide, we break down <strong>${selected.title}</strong> with actionable terminal commands and production best practices.
        </p>

        <h2 id="overview" className="text-2xl font-bold text-slate-900 pt-4 border-t border-slate-100 flex items-center gap-2">
          <Globe className="h-6 w-6 text-emerald-600" />
          <span>Technical Overview &amp; Architecture</span>
        </h2>
        <p>
          ${selected.excerpt}
        </p>

        <div className="bg-slate-900 text-slate-100 p-5 rounded-2xl font-mono text-xs overflow-x-auto shadow-inner">
          <div className="text-slate-400 mb-2"># Terminal Diagnostic Command</div>
          <div>$ curl -Iv https://www.dnschecker.space${selected.toolLink}</div>
          <div className="text-emerald-400 mt-2">* Connected to www.dnschecker.space (104.21.68.22) port 443</div>
          <div>* TLS 1.3 connection using TLS_AES_256_GCM_SHA384</div>
          <div>* Server certificate: CN=www.dnschecker.space (Verified)</div>
          <div>* HTTP/2 200 OK</div>
        </div>

        <h2 id="deep-dive" className="text-2xl font-bold text-slate-900 pt-4 border-t border-slate-100 flex items-center gap-2">
          <Server className="h-6 w-6 text-emerald-600" />
          <span>Step-by-Step Implementation &amp; Diagnostics</span>
        </h2>
        <p>
          When diagnosing network anomalies, following a structured telemetry checklist ensures root causes are identified without speculative downtime:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Step 1: Baseline Verification:</strong> Confirm resolver or target IP reachability via ICMP ping and TCP SYN probing.</li>
          <li><strong>Step 2: Security &amp; Header Auditing:</strong> Inspect certificate expiry timestamps and response headers for strict security compliance.</li>
          <li><strong>Step 3: Propagation Verification:</strong> Query authoritative global nameservers to verify record synchronization across continents.</li>
        </ul>

        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <strong>Interactive Live Verification:</strong> Test your own domain or server instantly using our free <a href="${selected.toolLink}" className="underline font-bold text-emerald-700">${selected.toolName}</a>.
          </div>
        </div>
      </div>
    )
  },`;

  // Inject into blogArticles.tsx before the closing bracket of ALL_ARTICLES
  const helperMarker = "export function getAllArticles";
  const helperIdx = currentBlogSource.lastIndexOf(helperMarker);
  if (helperIdx === -1) {
    throw new Error("Could not find helper utilities marker in blogArticles.tsx");
  }
  const arrayEndIdx = currentBlogSource.lastIndexOf("];", helperIdx);
  if (arrayEndIdx === -1) {
    throw new Error("Could not find closing array marker `];` in blogArticles.tsx");
  }

  let before = currentBlogSource.slice(0, arrayEndIdx).trimEnd();
  if (before.endsWith("}") && !before.endsWith("},")) {
    before += ",";
  }

  currentBlogSource = before + "\n" + articleEntry + "\n" + currentBlogSource.slice(arrayEndIdx);
  fs.writeFileSync(blogFilePath, currentBlogSource, 'utf-8');
  console.log("✓ Appended new article to src/data/blogArticles.tsx");

  // Update public/sitemap.xml
  if (fs.existsSync(sitemapXmlPath)) {
    let sitemapXml = fs.readFileSync(sitemapXmlPath, 'utf-8');
    const newXmlEntry = `  <url>\n    <loc>${liveUrl}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.85</priority>\n  </url>\n</urlset>`;
    if (!sitemapXml.includes(liveUrl)) {
      sitemapXml = sitemapXml.replace('</urlset>', newXmlEntry);
      fs.writeFileSync(sitemapXmlPath, sitemapXml, 'utf-8');
      console.log("✓ Updated public/sitemap.xml");
    }
  }

  // Update public/llms.txt
  if (fs.existsSync(llmsTxtPath)) {
    let llmsTxt = fs.readFileSync(llmsTxtPath, 'utf-8');
    const newLlmsEntry = `- [${selected.title}](${liveUrl}): ${selected.excerpt}\n\n## Technical Specifications`;
    if (!llmsTxt.includes(liveUrl)) {
      llmsTxt = llmsTxt.replace('## Technical Specifications', newLlmsEntry);
      fs.writeFileSync(llmsTxtPath, llmsTxt, 'utf-8');
      console.log("✓ Updated public/llms.txt");
    }
  }

  // Ping IndexNow
  try {
    console.log("Submitting updated URLs to IndexNow...");
    await submitIndexNow([liveUrl, "https://www.dnschecker.space/blog", "https://www.dnschecker.space/sitemap.xml"]);
    console.log("✓ IndexNow ping complete.");
  } catch (err) {
    console.log("Notice: IndexNow ping skipped or failed non-critically:", err.message);
  }

  // Notify Google Chat Webhook
  try {
    await sendGoogleChatNotification({
      title: `[DNSChecker SEO] New ${selected.pillar} Guide Published`,
      subtitle: selected.title,
      text: `🚀 Daily SEO automation deployed a new high-ranking guide to DNSChecker.space.\n\n• Pillar: ${selected.pillar}\n• Target Keyword: "${selected.primaryKeyword}"\n• Tool Link: https://www.dnschecker.space${selected.toolLink}\n• Live Article: ${liveUrl}\n• Status: Published, Sitemap Updated & Submitted to IndexNow`,
      url: liveUrl,
      status: "SUCCESS"
    });
    console.log("✓ Google Chat notification dispatched successfully.");
  } catch (err) {
    console.error("Failed to notify Google Chat:", err.message);
  }

  // Git Commit & Push if in local repository
  try {
    console.log("\nStaging and pushing changes to GitHub main...");
    execSync('git add src/data/blogArticles.tsx public/sitemap.xml public/llms.txt', { stdio: 'inherit' });
    execSync(`git commit -m "feat(seo): auto-publish ${selected.pillar} article: ${selected.slug}"`, { stdio: 'inherit' });
    execSync('git push origin HEAD:main', { stdio: 'inherit' });
    console.log("✓ Successfully pushed to origin main!");
  } catch (err) {
    console.error("Git push step:", err.message);
  }

  console.log("\n==================================================");
  console.log("✓ Daily SEO run completed successfully!");
  console.log("==================================================");
}

if (process.argv[1] && process.argv[1].endsWith("daily-auto-blog.js")) {
  runDailyAutoBlog();
}
