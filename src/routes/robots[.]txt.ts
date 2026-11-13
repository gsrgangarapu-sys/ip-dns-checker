import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: async () => {
        const robotsTxt = [
          "User-agent: *",
          "Allow: /",
          "",
          "User-agent: GPTBot",
          "Allow: /",
          "",
          "User-agent: ChatGPT-User",
          "Allow: /",
          "",
          "User-agent: Google-Extended",
          "Allow: /",
          "",
          "User-agent: ClaudeBot",
          "Allow: /",
          "",
          "User-agent: Claude-Web",
          "Allow: /",
          "",
          "User-agent: PerplexityBot",
          "Allow: /",
          "",
          "User-agent: Applebot-Extended",
          "Allow: /",
          "",
          "User-agent: Amazonbot",
          "Allow: /",
          "",
          "User-agent: Bytespider",
          "Allow: /",
          "",
          "User-agent: cohere-ai",
          "Allow: /",
          "",
          "Sitemap: https://www.dnschecker.space/sitemap.xml",
          "LLMs-Txt: https://www.dnschecker.space/llms.txt",
        ].join("\n");

        return new Response(robotsTxt, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=86400",
          },
        });
      },
    },
  },
});
