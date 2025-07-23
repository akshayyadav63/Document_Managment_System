const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  folderId: { type: mongoose.Schema.Types.ObjectId, ref: "Folder", default: null },
  filename: String,
  path: String,
  originalname: String,
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Document", documentSchema);
