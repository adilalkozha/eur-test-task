const { Router } = require("express");

const express = require("express");

const asyncHandler = require("express-async-handler");

const router = express.Router();
const { createUser,login } = require("../controllers/users");

router.post("/users", createUser);
router.post("/users/login", login);

module.exports = router;
