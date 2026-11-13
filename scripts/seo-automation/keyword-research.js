/**
 * DNSChecker AI Keyword Research & Competitor Gap Analysis
 * Analyzes keyword opportunities, search intent, difficulty, and competitive gaps.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Seed high-opportunity keyword clusters in the DNS, IP, and Network Security niche
const KEYWORD_DATABASE = [
  {
    cluster: "IP Intelligence",
    keywords: [
      { keyword: "what is my ip address", volume: 1850000, difficulty: "High", intent: "Informational", cpc: 1.20, competitor: "whatismyip.com" },
      { keyword: "how to find ip address in cmd", volume: 90500, difficulty: "Medium", intent: "Informational", cpc: 0.85, competitor: "support.microsoft.com" },
      { keyword: "ipv4 vs ipv6 explained", volume: 49500, difficulty: "Medium", intent: "Informational", cpc: 1.50, competitor: "cloudflare.com" },
      { keyword: "find website hosting ip", volume: 27100, difficulty: "Low", intent: "Informational", cpc: 1.10, competitor: "whois.domaintools.com" },
      { keyword: "webrtc vpn leak test", volume: 18100, difficulty: "Low", intent: "Commercial", cpc: 2.30, competitor: "browserleaks.com" },
      { keyword: "public ip vs private ip", volume: 33100, difficulty: "Low", intent: "Informational", cpc: 0.90, competitor: "geeksforgeeks.org" },
      { keyword: "how to hide my ip address", volume: 74000, difficulty: "High", intent: "Commercial", cpc: 3.80, competitor: "nordvpn.com" }
    ]
  },
  {
    cluster: "DNS & Domain Architecture",
    keywords: [
      { keyword: "how dns lookup works", volume: 40500, difficulty: "Medium", intent: "Informational", cpc: 1.40, competitor: "cloudflare.com" },
      { keyword: "how to check dns propagation", volume: 60500, difficulty: "Medium", intent: "Informational", cpc: 1.15, competitor: "dnschecker.org" },
      { keyword: "what is reverse dns lookup", volume: 22200, difficulty: "Low", intent: "Informational", cpc: 1.35, competitor: "mxtoolbox.com" },
      { keyword: "how to troubleshoot dns errors", volume: 14800, difficulty: "Low", intent: "Informational", cpc: 1.60, competitor: "kinsta.com" },
      { keyword: "what are dns records a aaaa mx txt", volume: 12100, difficulty: "Low", intent: "Informational", cpc: 1.25, competitor: "namecheap.com" },
      { keyword: "what is dnssec", volume: 27100, difficulty: "Low", intent: "Informational", cpc: 1.70, competitor: "icann.org" },
      { keyword: "how to flush dns cache windows", volume: 81000, difficulty: "Medium", intent: "Informational", cpc: 0.95, competitor: "lifewire.com" }
    ]
  },
  {
    cluster: "Cybersecurity & Perimeter Auditing",
    keywords: [
      { keyword: "how to check ip blacklist", volume: 33100, difficulty: "Medium", intent: "Informational", cpc: 1.80, competitor: "spamhaus.org" },
      { keyword: "how to check spf dkim dmarc", volume: 27100, difficulty: "Medium", intent: "Informational", cpc: 2.40, competitor: "mxtoolbox.com" },
      { keyword: "how to check ssl certificate", volume: 49500, difficulty: "Medium", intent: "Informational", cpc: 1.95, competitor: "sslshopper.com" },
      { keyword: "how to check open ports", volume: 60500, difficulty: "Medium", intent: "Informational", cpc: 1.30, competitor: "yougetsignal.com" },
      { keyword: "how to check website security headers", volume: 9900, difficulty: "Low", intent: "Informational", cpc: 1.85, competitor: "securityheaders.com" },
      { keyword: "content security policy example", volume: 18100, difficulty: "Low", intent: "Informational", cpc: 1.50, competitor: "developer.mozilla.org" },
      { keyword: "minecraft server ip checker", volume: 40500, difficulty: "Low", intent: "Informational", cpc: 0.65, competitor: "mcsrvstat.us" }
    ]
  }
];

export function runKeywordResearch() {
  console.log("==================================================");
  console.log("DNSChecker AI Keyword Research & Opportunity Finder");
  console.log("==================================================\n");

  const opportunities = [];

  for (const group of KEYWORD_DATABASE) {
    console.log(`Analyzing Cluster: ${group.cluster}...`);
    for (const item of group.keywords) {
      // Calculate Opportunity Score (Volume / Difficulty Weight)
      const diffWeight = item.difficulty === "Low" ? 1.0 : item.difficulty === "Medium" ? 1.8 : 3.0;
      const score = Math.round((item.volume / 1000) / diffWeight * 10) / 10;

      const opp = {
        keyword: item.keyword,
        cluster: group.cluster,
        monthlyVolume: item.volume,
        difficulty: item.difficulty,
        intent: item.intent,
        cpcUsd: item.cpc,
        topCompetitor: item.competitor,
        opportunityScore: score,
        suggestedTitle: generateOptimizedTitle(item.keyword),
        targetTool: suggestTargetTool(item.keyword)
      };

      opportunities.push(opp);
    }
  }

  // Sort by opportunity score descending
  opportunities.sort((a, b) => b.opportunityScore - a.opportunityScore);

  console.log(`\nFound ${opportunities.length} high-value keyword targets.`);
  console.log("\nTop 5 Immediate Keyword Opportunities:");
  opportunities.slice(0, 5).forEach((o, i) => {
    console.log(` ${i + 1}. "${o.keyword}"`);
    console.log(`    Volume: ${o.monthlyVolume.toLocaleString()}/mo | Diff: ${o.difficulty} | Score: ${o.opportunityScore}`);
    console.log(`    Suggested Title: ${o.suggestedTitle}`);
    console.log(`    Internal Tool Target: ${o.targetTool}\n`);
  });

  // Save output to data directory
  const outputPath = path.resolve(__dirname, "../../src/data/keyword-opportunities.json");
  fs.writeFileSync(outputPath, JSON.stringify(opportunities, null, 2), "utf-8");
  console.log(`Successfully generated keyword opportunities: ${outputPath}\n`);

  return opportunities;
}

function generateOptimizedTitle(keyword) {
  const words = keyword.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  if (keyword.startsWith("how to")) {
    return `${words}: Step-by-Step Complete Guide`;
  }
  if (keyword.startsWith("what is")) {
    return `${words}? Complete Beginner to Pro Guide`;
  }
  return `${words}: The Complete Practical Guide`;
}

function suggestTargetTool(keyword) {
  if (keyword.includes("ip") && keyword.includes("cmd")) return "/my-ip";
  if (keyword.includes("ip")) return "/my-ip";
  if (keyword.includes("dns") || keyword.includes("propagation") || keyword.includes("record")) return "/dns";
  if (keyword.includes("ssl") || keyword.includes("tls")) return "/ssl";
  if (keyword.includes("blacklist") || keyword.includes("rbl")) return "/blacklist";
  if (keyword.includes("spf") || keyword.includes("dkim") || keyword.includes("dmarc") || keyword.includes("email")) return "/email";
  if (keyword.includes("port") || keyword.includes("minecraft")) return "/ports";
  if (keyword.includes("header") || keyword.includes("csp")) return "/headers";
  if (keyword.includes("hosting") || keyword.includes("whois")) return "/hosting";
  return "/tools";
}

// Run if called directly
if (process.argv[1] && process.argv[1].endsWith("keyword-research.js")) {
  runKeywordResearch();
}
