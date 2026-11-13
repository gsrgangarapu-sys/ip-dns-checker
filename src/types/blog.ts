import type React from "react";

export type ArticleCategory =
  | "All"
  | "Fundamentals"
  | "DNS & Domain"
  | "Website & Hosting"
  | "SSL & TLS"
  | "Email & Deliverability"
  | "Security & Blacklist"
  | "CMD & Terminal"
  | "Minecraft & Gaming"
  | "VPN & Privacy";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface TocItem {
  id: string;
  title: string;
  level?: number;
}

export interface ArticleAuthor {
  name: string;
  role: string;
  avatar?: string;
}

export interface Article {
  id: string; // unique slug
  slug: string;
  title: string;
  subtitle: string;
  category: ArticleCategory;
  status: "published" | "draft";
  readTime: string;
  date: string;
  updatedDate: string;
  author: ArticleAuthor;
  primaryKeyword: string;
  secondaryKeywords: string[];
  searchIntent: "Informational" | "Commercial" | "Navigational";
  tags: string[];
  excerpt: string;
  metaDescription: string;
  canonicalUrl: string;
  toolLink: string;
  toolName: string;
  faqs: FaqItem[];
  tableOfContents: TocItem[];
  relatedSlugs: string[];
  content: React.ReactNode;
}
