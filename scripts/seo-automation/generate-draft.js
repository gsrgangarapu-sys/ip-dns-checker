/**
 * DNSChecker AI Blog Draft Generator
 * Generates SEO-optimized, technical article drafts with keyword targeting,
 * meta tags, schema-ready FAQs, table of contents, and internal tool links.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function generateArticleDraft(keywordInput) {
  console.log("==================================================");
  console.log("DNSChecker AI SEO Draft Generator");
  console.log("==================================================\n");

  const keyword = (keywordInput || process.argv[2] || "how to flush dns cache windows").toLowerCase().trim();
  console.log(`Targeting Primary Keyword: "${keyword}"`);

  const slug = keyword.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const titleWords = keyword.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const title = `${titleWords}: Complete Step-by-Step Guide`;
  const metaDescription = `Learn ${keyword}. Step-by-step commands for Windows, macOS, and Linux to fix DNS cache errors, resolve IP changes, and restore web connectivity.`;
  
  const toolLink = keyword.includes("ip") ? "/my-ip" : keyword.includes("port") ? "/ports" : keyword.includes("ssl") ? "/ssl" : "/dns";
  const toolName = keyword.includes("ip") ? "Check Public IP Address" : keyword.includes("port") ? "Test Open Ports" : "Run Live DNS Lookup";

  const draft = {
    id: slug,
    slug: slug,
    title: title,
    subtitle: `Step-by-step diagnostic workflow for clearing stale local DNS resolver caches and resolving host connection issues across operating systems.`,
    category: keyword.includes("cmd") || keyword.includes("windows") ? "CMD & Terminal" : "DNS & Domain",
    status: "draft",
    readTime: "6 min read",
    date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    updatedDate: new Date().toISOString().split('T')[0],
    author: {
      name: "DNSChecker Telemetry Team",
      role: "Network Infrastructure Specialist"
    },
    primaryKeyword: keyword,
    secondaryKeywords: [
      `${keyword} cmd`,
      `clear dns cache`,
      `ipconfig flushdns`,
      `restart dns client`,
      `fix dns resolution errors`
    ],
    searchIntent: "Informational",
    tags: ["DNS", "Windows", "CMD", "Networking", "Troubleshooting"],
    excerpt: `Learn how to flush your DNS cache on Windows 10 & 11, macOS, and Linux to force instant resolution of updated nameservers and fix connectivity errors.`,
    metaDescription: metaDescription,
    canonicalUrl: `https://dnschecker.space/blog/${slug}`,
    toolLink: toolLink,
    toolName: toolName,
    tableOfContents: [
      { id: "what-is-dns-cache", title: "What Is the Local DNS Cache?" },
      { id: "why-flush-cache", title: "Why and When to Flush Your DNS" },
      { id: "windows-cmd-flush", title: "How to Flush DNS in Windows (CMD & PowerShell)" },
      { id: "macos-linux-flush", title: "How to Flush DNS on macOS & Linux" },
      { id: "verify-resolution", title: "Verify DNS Resolution Online" },
      { id: "faq", title: "Frequently Asked Questions" }
    ],
    faqs: [
      {
        question: `Why should I run ${keyword}?`,
        answer: "When a website updates its IP address or migrates to a new server, your operating system continues caching the outdated IP until the TTL expires. Flushing your DNS forces your system to fetch fresh records immediately."
      },
      {
        question: "Does flushing DNS delete my browser history or cookies?",
        answer: "No. Flushing the DNS cache only clears temporary IP mapping tables stored by the OS resolver. It does not touch browser bookmarks, passwords, or cookies."
      },
      {
        question: "Do I need administrator privileges to flush DNS?",
        answer: "On Windows, running CMD as administrator is recommended. On macOS and Linux, you must use sudo to restart mDNSResponder or systemd-resolved."
      }
    ],
    sections: [
      {
        heading: "What Is the Local DNS Cache?",
        content: `Every modern operating system maintains a temporary database known as the DNS resolver cache. When you visit a website, your computer saves the resolved IP address locally so it doesn't have to query external DNS resolvers on every single page load.`
      },
      {
        heading: "Windows Command (Command Prompt & PowerShell)",
        command: "ipconfig /flushdns",
        content: `Open Command Prompt as Administrator and type the command above. You should receive the message: 'Successfully flushed the DNS Resolver Cache.'`
      },
      {
        heading: "macOS Terminal Command",
        command: "sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder",
        content: `On macOS Sonoma, Ventura, and Monterey, execute this command in Terminal and enter your Mac administrator password when prompted.`
      }
    ]
  };

  const outputPath = path.resolve(__dirname, `../../src/data/drafts/${slug}.json`);
  fs.writeFileSync(outputPath, JSON.stringify(draft, null, 2), "utf-8");

  console.log(`\nGenerated new article draft:`);
  console.log(` Title: ${draft.title}`);
  console.log(` Slug: ${draft.slug}`);
  console.log(` Status: ${draft.status} (Awaiting user approval before publishing)`);
  console.log(` Saved to: ${outputPath}\n`);

  return draft;
}

// Run if called directly
if (process.argv[1] && process.argv[1].endsWith("generate-draft.js")) {
  generateArticleDraft(process.argv[2]);
}
