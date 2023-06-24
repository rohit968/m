const mongoose = require('mongoose');

// Defining a watchlist schema
const LikedContentSchema = new mongoose.Schema({
  contentId: { type: [String], required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true }
});

module.exports = mongoose.model('LikedContent', LikedContentSchema);
