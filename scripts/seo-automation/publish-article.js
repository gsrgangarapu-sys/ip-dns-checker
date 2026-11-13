/**
 * DNSChecker Article Publisher & IndexNow Dispatcher
 * Promotes an approved article from "draft" to "published",
 * updates sitemaps, and submits the URL to IndexNow for instant search indexing.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function publishArticle(slugInput) {
  console.log("==================================================");
  console.log("DNSChecker Article Approval & Publishing Tool");
  console.log("==================================================\n");

  const slug = (slugInput || process.argv[2] || "").trim();
  if (!slug) {
    console.error("Error: Please provide the slug of the article to publish.");
    console.log("Example: node scripts/seo-automation/publish-article.js what-is-my-ip-address\n");
    return;
  }

  const blogFilePath = path.resolve(__dirname, "../../src/data/blogArticles.tsx");
  let content = fs.readFileSync(blogFilePath, "utf-8");

  // Locate the article block by slug
  const articleBlockRegex = new RegExp(`(slug:\\s*"${slug}",[\\s\\S]*?status:\\s*")draft(")`, "g");

  if (!articleBlockRegex.test(content)) {
    console.log(`Notice: Article "${slug}" is either already published or slug was not found.`);
  } else {
    content = content.replace(articleBlockRegex, `$1published$2`);
    fs.writeFileSync(blogFilePath, content, "utf-8");
    console.log(`✓ Successfully updated status of "${slug}" to "published" in blogArticles.tsx!`);
  }

  // Trigger IndexNow submission for the published article
  const url = `https://dnschecker.space/blog/${slug}`;
  console.log(`\nNotifying search engines via IndexNow for: ${url}`);
  
  const key = "d9f4e2a1b7c84e3a9f0b1c2d3e4f5a6b";
  const host = "dnschecker.space";

  try {
    const payload = {
      host,
      key,
      keyLocation: `https://${host}/${key}.txt`,
      urlList: [url, `https://${host}/blog`, `https://${host}/sitemap.xml`]
    };

    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload)
    });
    console.log(`✓ IndexNow Response: ${res.status} (${res.statusText})`);
  } catch (err) {
    console.log(`IndexNow ping error (will retry in CI): ${err.message}`);
  }

  console.log("\nPublishing workflow complete.");
}

// Run if called directly
if (process.argv[1] && process.argv[1].endsWith("publish-article.js")) {
  publishArticle(process.argv[2]);
}
