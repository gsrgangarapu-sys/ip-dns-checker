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
// JSON-LD structured data (WebSite + Organization + WebApplication + FAQPage + BreadcrumbList + SoftwareApplication).
export function Seo({
  title = "DNSChecker — Free IP Checker & Network Intelligence Tools",
  description = "Instantly check your public IPv4/IPv6, PC local network IP, geolocation, ISP, DNS, SSL, and security reputation with our free IP checker toolkit.",
  url = "https://dnschecker.space",
  faqs,
  schema,
  breadcrumbs,
  toolName
}: SeoProps) {
  // Global Website Schema with Google Sitelinks SearchBox
  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://dnschecker.space/#website",
    "name": "DNSChecker",
    "alternateName": ["DNS Checker", "IP Checker", "DNSChecker Space", "DNS Checker Online"],
    "url": "https://dnschecker.space/",
    "description": "Free network intelligence, DNS lookup, IP geolocation, SSL validation, and threat detection toolkit.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://dnschecker.space/lookup?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  // Publisher / Organization Schema for Knowledge Graph & E-E-A-T
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://dnschecker.space/#organization",
    "name": "DNSChecker",
    "url": "https://dnschecker.space/",
    "logo": {
      "@type": "ImageObject",
      "url": "https://dnschecker.space/favicon.svg",
      "width": "512",
      "height": "512"
    },
    "sameAs": [
      "https://github.com/gsrgangarapu-sys/ip-dns-checker"
    ],
    "description": "Provider of real-time public network telemetry, DNS propagation checking, and cyber intelligence tools."
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": toolName || "DNSChecker",
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
    "applicationCategory": "SecurityApplication",
    "operatingSystem": "Web",
    "url": url,
    "description": description,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  } : null;

  let schemasToRender: Record<string, any>[] = [webSiteSchema, organizationSchema];
  if (schema) {
    const custom = Array.isArray(schema) ? schema : [schema];
    schemasToRender.push(...custom);
  } else {
    schemasToRender.push(webAppSchema);
  }
  // Always add FAQ, breadcrumb, and tool schemas
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
