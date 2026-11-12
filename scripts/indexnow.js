/**
 * IndexNow Instant Submitter for DNSChecker.space
 * Submits all pages to Bing, Yandex, Seznam, and IndexNow endpoints.
 */

const key = "d9f4e2a1b7c84e3a9f0b1c2d3e4f5a6b";
const host = "dnschecker.space";
const keyLocation = `https://${host}/${key}.txt`;

const urlList = [
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
  `https://${host}/sitemap`
];

async function submitIndexNow() {
  const payload = {
    host,
    key,
    keyLocation,
    urlList
  };

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload)
    });
    console.log(`IndexNow submission response status: ${res.status} (${res.statusText})`);
  } catch (err) {
    console.error("IndexNow submission failed:", err.message);
  }
}

submitIndexNow();
