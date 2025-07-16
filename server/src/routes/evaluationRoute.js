const express = require("express");
const { authenticateToken } = require("../middlewares/authMiddleware");
const { addEvaluation, getEvaluation } = require("../controllers/evaluationController");

const router = express.Router();

router.post("/:id", authenticateToken, addEvaluation);
router.get("/:id", authenticateToken, getEvaluation);

module.exports = router;
