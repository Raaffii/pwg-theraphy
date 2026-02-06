const express = require("express");
const { validateBody } = require("../middlewares/validateSchema");
const { authenticateToken } = require("../middlewares/authMiddleware");
const {
  createConsents,
  getConsents,
  deleteById,
  getConsentsById,
  updateConsents,
} = require("../controllers/consentsController");
const {
  insertPosHd,
  insertPosLine,
  getCusPosHd,
  getCusPosLine,
  getPosSetup,
} = require("../controllers/posController");

const router = express.Router();

// Registration route
router.post("/poshd", authenticateToken, insertPosHd);
router.post("/posline", authenticateToken, insertPosLine);

router.get("/poshd", authenticateToken, getCusPosHd);
router.get("/posline/:id", authenticateToken, getCusPosLine);
router.get("/possetup", authenticateToken, getPosSetup);

module.exports = router;
