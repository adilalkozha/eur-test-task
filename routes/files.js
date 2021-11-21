const express = require("express");
const router = express.Router();
const { authByToken } = require("../middleware/auth");

const { uploadImage } = require("../controllers/files");

router.post("/upload", authByToken, uploadImage);

module.exports = router;
