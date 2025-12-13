const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
  headline: { type: String, required: true },
  summary: { type: String },
  stockSymbol: { type: String, required: true },
  sentimentScore: { type: Number, required: true }, // -1.0 to 1.0 or 0 to 100
  sentimentLabel: { type: String, enum: ['Positive', 'Negative', 'Neutral'], required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('News', NewsSchema);
