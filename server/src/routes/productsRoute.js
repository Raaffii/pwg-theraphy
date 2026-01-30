const express = require("express");
const { validateBody } = require("../middlewares/validateSchema");
const upload = require("../middlewares/uploadMiddleware");

const { authenticateToken } = require("../middlewares/authMiddleware");
const {
  getProducts,
  postProducts,
  deleteProducts,
  updateProducts,
} = require("../controllers/productsController");

const router = express.Router();

// Registration route

router.get("/", authenticateToken, getProducts);
router.post("/", authenticateToken, upload.single("image"), postProducts);

router.delete("/:id", authenticateToken, deleteProducts);
router.put("/:id", authenticateToken, upload.single("image"), updateProducts);

module.exports = router;
