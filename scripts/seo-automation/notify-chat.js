/**
 * DNSChecker Google Chat Webhook Dispatcher
 * Sends real-time notifications for:
 * 1. New blog article creation & publication
 * 2. Deployment status and live preview links
 * 3. Daily/Weekly SEO ranking and crawl reports
 */

const DEFAULT_WEBHOOK_URL = process.env.GOOGLE_CHAT_WEBHOOK_URL || "https://chat.googleapis.com/v1/spaces/AAQACHJ1rC8/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=1UnFa25iYnNkNqy6yjkmpppbUFxUT0Yf4FUmTX8uWi4";

export async function sendGoogleChatNotification({
  title,
  subtitle,
  text,
  url,
  status = "SUCCESS",
  fields = []
}) {
  const statusEmoji = status === "SUCCESS" ? "🟢" : status === "WARNING" ? "🟡" : "🔴";

  const card = {
    header: {
      title: `${statusEmoji} ${title}`,
      subtitle: subtitle || "DNSChecker.space SEO & Deployment Bot",
      imageUrl: "https://dnschecker.space/favicon.svg",
      imageType: "CIRCLE"
    },
    sections: [
      {
        widgets: [
          ...(text ? [{ textParagraph: { text } }] : []),
          ...(fields.length > 0 ? [{
            keyValue: fields.map(f => ({
              topLabel: f.label,
              content: f.value,
              contentMultiline: "true"
            }))[0]
          }] : []),
          ...(url ? [{
            buttonList: {
              buttons: [
                {
                  text: "Open Website Link",
                  onClick: {
                    openLink: {
                      url: url
                    }
                  }
                }
              ]
            }
          }] : [])
        ]
      }
    ]
  };

  try {
    const res = await fetch(DEFAULT_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify({
        text: `*${title}*\n${text || ""}`,
        cardsV2: [
          {
            cardId: `dnschecker-${Date.now()}`,
            card: card
          }
        ]
      })
    });

    console.log(`Google Chat Webhook dispatch status: ${res.status}`);
    return res.status === 200;
  } catch (err) {
    console.error("Google Chat Webhook error:", err.message);
    return false;
  }
}

// Standalone execution test
if (process.argv[1] && process.argv[1].endsWith("notify-chat.js")) {
  const testTitle = process.argv[2] || "DNSChecker SEO Automation Active";
  const testText = process.argv[3] || "Automated Google Chat webhook successfully configured for daily blog publishing and Google ranking updates.";
  sendGoogleChatNotification({
    title: testTitle,
    text: testText,
    url: "https://www.dnschecker.space/blog"
  });
}
