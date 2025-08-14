const express = require("express");
const { validateBody } = require("../middlewares/validateSchema");
const { authenticateToken } = require("../middlewares/authMiddleware");
const { createConsents, getConsents, deleteById, getConsentsById, updateConsents } = require("../controllers/consentsController");
const { getPackages } = require("../controllers/packagesController");

const router = express.Router();

// Registration route
router.get("/", authenticateToken, getPackages);

module.exports = router;
