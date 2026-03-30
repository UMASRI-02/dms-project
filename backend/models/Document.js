const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  filename: String,
  tags: String,
  owner: String,
  permission: String,

  // ✅ VERSION CONTROL
  version: {
    type: Number,
    default: 1
  },

  originalName: String, // same file group
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Document', DocumentSchema);