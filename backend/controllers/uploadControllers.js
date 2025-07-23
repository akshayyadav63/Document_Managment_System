const Document = require("../models/document");
const fs = require("fs");

const uploadFile = async (req, res) => {
  try {
    const doc = await Document.create({
      userId: req.user.id,
      folderId: req.params.folderId || null,
      filename: req.file.filename,
      path: req.file.path,
      originalname: req.file.originalname
    });
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const renameFile = async (req, res) => {
  try {
    const doc = await Document.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { originalname: req.body.name },
      { new: true }
    );
    res.json(doc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteFile = async (req, res) => {
  try {
    const doc = await Document.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (doc && doc.path) fs.unlinkSync(doc.path);
    res.json({ message: "File deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { uploadFile, renameFile, deleteFile };