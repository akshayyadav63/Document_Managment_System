const Folder = require("../models/folder");
const Document = require("../models/document");

const createFolder = async (req, res) => {
  const { name, parentId } = req.body;
  try {
    const folder = await Folder.create({
      name,
      userId: req.user.id,
      parentId: parentId || null
    });
    res.status(201).json(folder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getFolderContent = async (req, res) => {
  try {
    const folders = await Folder.find({ userId: req.user.id, parentId: req.params.id || null });
    const files = await Document.find({ userId: req.user.id, folderId: req.params.id || null });
    res.json({ folders, files });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const renameFolder = async (req, res) => {
  try {
    const folder = await Folder.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { name: req.body.name },
      { new: true }
    );
    res.json(folder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const deleteFolderRecursive = async (req, res) => {
  const folderId = req.params.id;

  async function deleteRecursive(id) {
    const children = await Folder.find({ parentId: id });
    for (const child of children) await deleteRecursive(child._id);

    await Document.deleteMany({ folderId: id });
    await Folder.deleteOne({ _id: id });
  }

  try {
    await deleteRecursive(folderId);
    res.json({ message: "Folder deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports = { createFolder, getFolderContent, renameFolder, deleteFolderRecursive };