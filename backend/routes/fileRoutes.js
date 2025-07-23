// routes/fileRoutes.js
const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const upload = require("../middlewares/multerMiddleware");

const {
  uploadFile,
  renameFile,
  deleteFile
} = require("../controllers/uploadControllers");

// Upload file to root (no folder)
router.post("/upload", auth, upload.single("file"), uploadFile);

// Upload file to a specific folder
router.post("/upload/folder/:folderId", auth, upload.single("file"), uploadFile);

// Rename a file by ID
router.put("/rename/:id", auth, renameFile);

// Delete a file by ID
router.delete("/delete/:id", auth, deleteFile);

module.exports = router;
