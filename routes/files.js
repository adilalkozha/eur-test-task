const express = require("express");
const router = express.Router();
const { authByToken } = require("../middleware/auth");

const { uploadImage, showAll, getByName } = require("../controllers/files");

router.post("/upload", authByToken, uploadImage);
router.get("/file",authByToken,getByName)
router.get("/file-list", showAll);

module.exports = router;
