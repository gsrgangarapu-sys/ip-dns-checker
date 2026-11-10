import { Helmet } from "react-helmet-async";

interface FaqItem {
  question: string;
  answer: string;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface SeoProps {
  title?: string;
  description?: string;
  // Kept for backwards compatibility with existing route files.
  // The keywords meta tag is not emitted: Google ignores it.
  keywords?: string;
  url?: string;
  faqs?: FaqItem[];
  schema?: Record<string, any> | Array<Record<string, any>>;
  breadcrumbs?: BreadcrumbItem[];
  toolName?: string;
}

// Schema-only SEO helper.
//
// Title, meta description, canonical, Open Graph and Twitter tags are owned by
// each route's TanStack `head()` (SSR) — do NOT emit them here as well, or the
// page will contain duplicate/conflicting tags. This component only injects
// JSON-LD structured data (WebApplication + FAQPage + BreadcrumbList + SoftwareApplication).
export function Seo({
  title = "DNSChecker — Free IP Checker & Network Intelligence Tools",
  description = "Instantly check your public IPv4/IPv6, PC local network IP, geolocation, ISP, DNS, SSL, and security reputation with our free IP checker toolkit.",
  url = "https://dnschecker.space",
  faqs,
  schema,
  breadcrumbs,
  toolName
}: SeoProps) {
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "DNSChecker",
    "alternateName": ["DNS Checker", "IP Checker Tool", "DNSChecker Space"],
    "headline": title,
    "description": description,
    "url": url,
    "applicationCategory": "NetworkingApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
    // No AggregateRating: ratings must come from real, verifiable user
    // reviews. A fabricated rating violates Google's structured data policy.
  };

  const faqSchema = faqs && faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  } : null;

  const breadcrumbSchema = breadcrumbs && breadcrumbs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  } : null;

  const toolSchema = toolName ? {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": toolName,
    "applicationCategory": "NetworkingApplication",
    "operatingSystem": "Web",
    "url": url,
    "description": description,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  } : null;

  let schemasToRender: Record<string, any>[];
  if (schema) {
    schemasToRender = Array.isArray(schema) ? [...schema] : [schema];
  } else {
    schemasToRender = [webAppSchema];
  }
  // Always add FAQ, breadcrumb, and tool schemas regardless of custom schema
  if (faqSchema) schemasToRender.push(faqSchema);
  if (breadcrumbSchema) schemasToRender.push(breadcrumbSchema);
  if (toolSchema) schemasToRender.push(toolSchema);

  return (
    <Helmet>
      {schemasToRender.map((s, idx) => (
        <script key={idx} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
}
