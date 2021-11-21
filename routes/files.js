const express = require("express");
const router = express.Router();
const { authByToken } = require("../middleware/auth");
const {
  uploadImage,
  showAll,
  getFilesByEmail,
  getFileByName
} = require("../controllers/files");

router.post("/upload", authByToken, uploadImage);
router.get("/files", authByToken, getFilesByEmail);
router.get("/file", authByToken, getFileByName);
router.get("/file-list", showAll);

module.exports = router;
