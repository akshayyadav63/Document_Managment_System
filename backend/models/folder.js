const mongoose = require('mongoose');
 const folderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: "Folder", default: null },
  createdAt: { type: Date, default: Date.now }
 })
 module.exports = mongoose.model('Folder', folderSchema);