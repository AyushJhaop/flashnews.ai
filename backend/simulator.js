const News = require('./models/News');

const COMPANIES = [
  { symbol: "AAPL", name: "Apple Inc." },
  { symbol: "TSLA", name: "Tesla Inc." },
  { symbol: "AMZN", name: "Amazon.com" },
  { symbol: "GOOGL", name: "Alphabet Inc." },
  { symbol: "MSFT", name: "Microsoft" },
  { symbol: "NFLX", name: "Netflix" },
  { symbol: "NVDA", name: "NVIDIA" }
];

const POSITIVE_VERBS = ["soars", "jumps", "beats estimates", "launches revolutionary product", "reports record profits", "partners with", "acquires"];
const NEGATIVE_VERBS = ["plummets", "crashes", "misses targets", "faces lawsuit", "recalls product", "CEO steps down", "under investigation"];
const NEUTRAL_VERBS = ["announces conference", "updates terms", "maintains steady growth", "releases routine report"];

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateNewsItem() {
  const company = getRandomItem(COMPANIES);
  const type = Math.random();
  let headline = "";
  let sentimentLabel = "";
  let sentimentScore = 0;

  if (type > 0.6) {
    // Positive
    headline = `${company.name} ${getRandomItem(POSITIVE_VERBS)} in unexpected market turn.`;
    sentimentLabel = "Positive";
    sentimentScore = Math.floor(Math.random() * 40) + 60; // 60-100
  } else if (type > 0.3) {
    // Negative
    headline = `${company.name} ${getRandomItem(NEGATIVE_VERBS)} triggering investor concern.`;
    sentimentLabel = "Negative";
    sentimentScore = Math.floor(Math.random() * 40); // 0-40
  } else {
    // Neutral
    headline = `${company.name} ${getRandomItem(NEUTRAL_VERBS)} today.`;
    sentimentLabel = "Neutral";
    sentimentScore = Math.floor(Math.random() * 20) + 40; // 40-60
  }

  return {
    headline,
    summary: "Full AI-analyzed summary would go here...",
    stockSymbol: company.symbol,
    sentimentScore,
    sentimentLabel,
    timestamp: new Date()
  };
}

module.exports = { generateNewsItem };
