import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogFilePath = path.resolve(__dirname, "../../src/data/blogArticles.tsx");
let content = fs.readFileSync(blogFilePath, 'utf-8');

// Ensure FileText and MapPin are imported
if (!content.includes('FileText, MapPin')) {
  content = content.replace(
    'import { \n  Terminal, ShieldAlert',
    'import { \n  Terminal, ShieldAlert, FileText, MapPin'
  );
}

const whoisArticle = `  // 18. How to Perform WHOIS Domain Lookup
  {
    id: "how-to-perform-whois-lookup",
    slug: "how-to-perform-whois-lookup",
    title: "How to Perform a WHOIS Domain Lookup & Verify Registrar Details",
    subtitle: "Learn how to query domain registration records, understand EPP status codes, check expiry countdowns, and audit nameserver delegation.",
    category: "Website & Hosting",
    status: "published",
    readTime: "7 min read",
    date: "November 2026",
    updatedDate: "2026-11-13",
    author: {
      name: "DNSChecker Telemetry Team",
      role: "Domain Infrastructure & Security Specialist"
    },
    primaryKeyword: "whois domain lookup",
    secondaryKeywords: ["check domain expiry", "domain registrar check", "whois privacy protection", "epp status codes", "icann domain lookup"],
    searchIntent: "Informational",
    tags: ["WHOIS", "Domain Registrar", "DNS", "ICANN", "EPP Status", "Cybersecurity"],
    excerpt: "Discover how WHOIS protocols query ICANN registrar databases, what EPP transfer locks mean, how to verify domain expiration, and how GDPR privacy redaction impacts domain ownership.",
    metaDescription: "Learn how to perform a WHOIS domain lookup. Audit registrar details, creation and expiry dates, nameserver delegation, and EPP status codes with our free tool.",
    canonicalUrl: "https://www.dnschecker.space/blog/how-to-perform-whois-lookup",
    toolLink: "/whois",
    toolName: "Perform WHOIS Domain Lookup",
    tableOfContents: [
      { id: "what-is-whois", title: "What Is a WHOIS Lookup?" },
      { id: "whois-data-fields", title: "Key Information Stored in WHOIS Records" },
      { id: "epp-domain-status", title: "Understanding EPP Status Codes (clientTransferProhibited)" },
      { id: "how-to-lookup", title: "How to Perform a WHOIS Query" },
      { id: "gdpr-privacy", title: "WHOIS Privacy & ICANN GDPR Redaction" },
      { id: "faq", title: "Frequently Asked Questions" }
    ],
    faqs: [
      {
        question: "Can someone find my personal contact details in a WHOIS lookup?",
        answer: "If you have WHOIS Privacy (Privacy Protection / ID Protect) enabled with your registrar, or if the registry falls under GDPR redaction, your personal phone number, home address, and personal email are replaced with proxy contact addresses."
      },
      {
        question: "What does 'clientTransferProhibited' status mean?",
        answer: "It is an EPP status code set by the domain registrar to prevent unauthorized or accidental domain transfers between registrars. To transfer the domain, you must unlock it in your registrar dashboard."
      },
      {
        question: "How long after domain expiration can a domain be recovered?",
        answer: "Most gTLD domains enter an Auto-Renew Grace Period (typically 30–45 days), followed by a 30-day Redemption Period where the original registrant can recover it for an additional fee before it drops for public registration."
      }
    ],
    relatedSlugs: ["how-dns-lookup-works", "how-to-find-website-hosting-ip", "what-are-dns-records-a-aaaa-mx-txt"],
    content: (
      <div className="space-y-6 text-slate-700 leading-relaxed">
        <p className="text-lg text-slate-800 font-medium">
          Whenever an organization or individual registers a domain name, the Internet Corporation for Assigned Names and Numbers (<strong>ICANN</strong>) mandates that registrar details, nameservers, registration dates, and technical contacts be logged in the public WHOIS registry.
        </p>

        <h2 id="what-is-whois" className="text-2xl font-bold text-slate-900 pt-4 border-t border-slate-100 flex items-center gap-2">
          <FileText className="h-6 w-6 text-emerald-600" />
          <span>What Is a WHOIS Lookup?</span>
        </h2>
        <p>
          WHOIS is a standardized TCP protocol (port 43) designed to query distributed databases that store the registered users and assignees of an Internet resource, such as a domain name, an IP address block, or an Autonomous System Number (ASN).
        </p>

        <div className="bg-slate-900 text-slate-100 p-5 rounded-2xl font-mono text-xs overflow-x-auto shadow-inner">
          <div className="text-slate-400 mb-2"># Querying WHOIS via terminal (RFC 3912)</div>
          <div>$ whois dnschecker.space</div>
          <div className="text-emerald-400 mt-2">Domain Name: dnschecker.space</div>
          <div>Registry Domain ID: D...-SPACE</div>
          <div>Registrar: NameCheap, Inc.</div>
          <div>Updated Date: 2026-11-12T14:00:00Z</div>
          <div>Creation Date: 2026-04-10T09:22:15Z</div>
          <div>Registry Expiry Date: 2027-04-10T09:22:15Z</div>
          <div>Domain Status: clientTransferProhibited https://icann.org/epp#clientTransferProhibited</div>
          <div>Name Server: NS1.DNSCHECKER.SPACE</div>
          <div>Name Server: NS2.DNSCHECKER.SPACE</div>
        </div>

        <h2 id="whois-data-fields" className="text-2xl font-bold text-slate-900 pt-4 border-t border-slate-100 flex items-center gap-2">
          <Globe className="h-6 w-6 text-emerald-600" />
          <span>Key Information Stored in WHOIS Records</span>
        </h2>
        <p>
          A complete WHOIS record breaks down into four essential categories:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Registrar Data:</strong> The accredited organization (e.g., Namecheap, Cloudflare, GoDaddy) handling domain registration and renewal.</li>
          <li><strong>Registration Timestamps:</strong> Creation Date (when first registered), Updated Date (last configuration change), and Registry Expiry Date.</li>
          <li><strong>Delegated Nameservers:</strong> The authoritative nameservers currently directing DNS traffic for the root zone.</li>
          <li><strong>EPP Status Codes:</strong> Security flags dictating whether the domain can be modified, transferred, or deleted.</li>
        </ul>

        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <strong>Instant Domain Verification:</strong> You can audit any domain's registration history, nameservers, and security locks immediately with our free <a href="/whois" className="underline font-bold text-emerald-700">WHOIS Lookup Tool</a>.
          </div>
        </div>
      </div>
    )
  },`;

const geoArticle = `  // 19. How to Track IP Geolocation
  {
    id: "how-to-track-ip-geolocation",
    slug: "how-to-track-ip-geolocation",
    title: "How to Track IP Geolocation: Latitude, Longitude, City & ASN Explained",
    subtitle: "Understand how IP geolocation databases map IP addresses to physical coordinates, how ASNs route packets, and why location lookups differ.",
    category: "Fundamentals",
    status: "published",
    readTime: "6 min read",
    date: "November 2026",
    updatedDate: "2026-11-13",
    author: {
      name: "DNSChecker Telemetry Team",
      role: "Network Telemetry Specialist"
    },
    primaryKeyword: "ip geolocation lookup",
    secondaryKeywords: ["track ip address location", "ip physical location coordinates", "asn lookup", "reverse ip geocoding", "maxmind geoip"],
    searchIntent: "Informational",
    tags: ["IP Geolocation", "Networking", "ASN", "GPS Coordinates", "IPv4", "IPv6"],
    excerpt: "Explore how geolocation databases like MaxMind and IP2Location infer city and country coordinates from IP addresses, how BGP routing affects latency, and how to verify your real coordinates.",
    metaDescription: "Learn how IP geolocation works. Track IP latitude, longitude, city, ISP, and ASN with precision using our free real-time IP Geolocation Tracker.",
    canonicalUrl: "https://www.dnschecker.space/blog/how-to-track-ip-geolocation",
    toolLink: "/geo",
    toolName: "Track IP Geolocation",
    tableOfContents: [
      { id: "what-is-ip-geolocation", title: "What Is IP Geolocation?" },
      { id: "how-it-works", title: "How Geolocation Databases Map IP Addresses" },
      { id: "asn-and-routing", title: "The Role of ASNs (Autonomous System Numbers)" },
      { id: "accuracy-levels", title: "Accuracy Levels: Country vs. City vs. GPS" },
      { id: "how-to-check-location", title: "How to Check Any IP's Location" },
      { id: "faq", title: "Frequently Asked Questions" }
    ],
    faqs: [
      {
        question: "Can an IP address pinpoint my exact home or street?",
        answer: "No. IP geolocation relies on ISP routing hubs, BGP peering locations, and regional registries. It generally achieves 99% accuracy at country level and 70–85% at city level, but cannot triangulate a residential street address."
      },
      {
        question: "Why does my IP show a different city than where I live?",
        answer: "Residential ISPs route traffic through central regional aggregation points (PoPs). Your external traffic emerges from the ISP's nearest datacenter hub, which may be located in an adjacent major metropolitan area."
      },
      {
        question: "How does a VPN change my IP geolocation?",
        answer: "A VPN encrypts your traffic and routes it through an intermediary server. Websites see the VPN exit node's public IP and datacenter geolocation rather than your residential ISP address."
      }
    ],
    relatedSlugs: ["what-is-my-ip-address", "ipv4-vs-ipv6-explained", "how-to-find-website-hosting-ip"],
    content: (
      <div className="space-y-6 text-slate-700 leading-relaxed">
        <p className="text-lg text-slate-800 font-medium">
          Every device connected to the public Internet communicates using an assigned IP address. <strong>IP Geolocation</strong> is the mapping technique used to determine the physical geographic location of that Internet-connected device based on its IP.
        </p>

        <h2 id="what-is-ip-geolocation" className="text-2xl font-bold text-slate-900 pt-4 border-t border-slate-100 flex items-center gap-2">
          <MapPin className="h-6 w-6 text-emerald-600" />
          <span>What Is IP Geolocation?</span>
        </h2>
        <p>
          Unlike GPS triangulation on mobile devices, which measures satellite signal delays, IP geolocation is an analytical inference based on global routing telemetry, Regional Internet Registry (RIR) allocations (ARIN, RIPE NCC, APNIC, LACNIC, AFRINIC), and internet service provider point-of-presence (PoP) structures.
        </p>

        <div className="bg-slate-900 text-slate-100 p-5 rounded-2xl font-mono text-xs overflow-x-auto shadow-inner">
          <div className="text-slate-400 mb-2"># Sample Telemetry Record for 8.8.8.8</div>
          <div>IP: 8.8.8.8</div>
          <div>Hostname: dns.google</div>
          <div>ASN: AS15169 (Google LLC)</div>
          <div>Country: United States (US)</div>
          <div>Region: California (CA)</div>
          <div>City: Mountain View</div>
          <div>Coordinates: 37.4056° N, 122.0775° W</div>
          <div>Postal Code: 94043</div>
          <div>Timezone: America/Los_Angeles (UTC-08:00)</div>
        </div>

        <h2 id="accuracy-levels" className="text-2xl font-bold text-slate-900 pt-4 border-t border-slate-100 flex items-center gap-2">
          <Compass className="h-6 w-6 text-emerald-600" />
          <span>Accuracy Levels: Country vs. City vs. GPS</span>
        </h2>
        <p>
          Geolocation accuracy degrades as precision requirements increase:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Country Level (99%+ Accuracy):</strong> RIR allocations strictly associate IP ranges with sovereign national jurisdictions.</li>
          <li><strong>City / Metropolitan Level (75%–85% Accuracy):</strong> Accurately resolves to the metro area where the ISP terminates the subscriber fiber/cable loop.</li>
          <li><strong>Street / GPS Level (0% Accuracy):</strong> IP addresses alone cannot resolve individual houses, street names, or apartment units without law enforcement subpoenas to the ISP.</li>
        </ul>

        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <strong>Interactive Map & Telemetry:</strong> Pinpoint any IP or domain with live interactive Leaflet maps on our <a href="/geo" className="underline font-bold text-emerald-700">IP Geolocation Tracker</a>.
          </div>
        </div>
      </div>
    )
  },`;

if (!content.includes('how-to-perform-whois-lookup')) {
  content = content.replace(
    '// Helper utilities\nexport function getAllArticles()',
    `${whoisArticle}\n${geoArticle}\n];\n\n// Helper utilities\nexport function getAllArticles()`
  );
  fs.writeFileSync(blogFilePath, content, 'utf-8');
  console.log("Successfully added WHOIS and IP Geolocation articles to blogArticles.tsx!");
} else {
  console.log("Articles already present.");
}
