const express = require("express");
const router = express.Router();
const {
  createFolder,
  getFolderContent,
  renameFolder,
  deleteFolderRecursive
} = require("../controllers/folderControllers");
const auth = require("../middlewares/authMiddleware");

// Create a new folder
router.post("/", auth, createFolder);

// Get root folder content
router.get("/", auth, getFolderContent);

// Get specific folder content
router.get("/:id", auth, getFolderContent);

// Rename folder
router.put("/:id", auth, renameFolder);

// Delete folder and its contents
router.delete("/:id", auth, deleteFolderRecursive);

module.exports = router;
