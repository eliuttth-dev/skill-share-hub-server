const express = require("express");
const registerMiddleware = require("../middlewares/register.middleware.js");
const registerController = require("../controllers/register.controller.js"); 

const router = express.Router();

// User Routes
router.post("/api/register", registerMiddleware, registerController);

module.exports = router;
