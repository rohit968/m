const mongoose = require('mongoose');

// Defining a watchlist schema
const WatchlistSchema = new mongoose.Schema({
  content: [
    {
      contentId: { type: String, required: true },
      type: { type: String },
    },
  ],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
});

module.exports = mongoose.model('Watchlists', WatchlistSchema);

