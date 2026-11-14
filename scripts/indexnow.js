/**
 * IndexNow Instant Submitter for DNSChecker.space
 * Submits all pages and new blog guides to Bing, Yandex, Seznam, and IndexNow endpoints.
 */

import { fileURLToPath } from 'url';

const key = "d9f4e2a1b7c84e3a9f0b1c2d3e4f5a6b";
const host = "dnschecker.space";
const keyLocation = `https://${host}/${key}.txt`;

const defaultUrlList = [
  `https://${host}/`,
  `https://${host}/my-ip`,
  `https://${host}/lookup`,
  `https://${host}/dns`,
  `https://${host}/whois`,
  `https://${host}/ssl`,
  `https://${host}/blacklist`,
  `https://${host}/email`,
  `https://${host}/geo`,
  `https://${host}/headers`,
  `https://${host}/hosting`,
  `https://${host}/ports`,
  `https://${host}/tools`,
  `https://${host}/blog`,
  `https://${host}/sitemap`,
  `https://${host}/blog/what-is-my-ip-address`,
  `https://${host}/blog/how-to-find-ip-address-in-windows-cmd`,
  `https://${host}/blog/ipv4-vs-ipv6-explained`,
  `https://${host}/blog/how-dns-lookup-works`,
  `https://${host}/blog/how-to-check-dns-propagation`,
  `https://${host}/blog/how-to-check-ip-blacklists`,
  `https://${host}/blog/how-to-check-spf-dkim-dmarc`,
  `https://${host}/blog/how-to-check-ssl-certificates`,
  `https://${host}/blog/how-to-find-website-hosting-ip`,
  `https://${host}/blog/how-to-check-open-ports`,
  `https://${host}/blog/what-is-reverse-dns-lookup`,
  `https://${host}/blog/how-to-troubleshoot-dns-errors`,
  `https://${host}/blog/what-are-dns-records-a-aaaa-mx-txt`,
  `https://${host}/blog/how-to-check-website-security-headers`,
  `https://${host}/blog/what-is-dnssec-guide`,
  `https://${host}/blog/ip-checker-minecraft`,
  `https://${host}/blog/webrtc-vpn-leak-test`
];

export async function submitIndexNow(urls = defaultUrlList) {
  const payload = {
    host,
    key,
    keyLocation,
    urlList: urls
  };

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload)
    });
    console.log(`IndexNow submission response status: ${res.status} (${res.statusText})`);
    console.log(`Submitted ${urls.length} URLs to IndexNow.`);
    return res.status;
  } catch (err) {
    console.error("IndexNow submission failed:", err.message);
    return null;
  }
}

if (process.argv[1] && process.argv[1].endsWith("indexnow.js")) {
  submitIndexNow();
}
