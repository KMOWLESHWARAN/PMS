const express = require("express");
const router = express.Router();

const { createProduct } = require("../controllers/productController");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

router.post("/create", protect, adminOnly("admin"), createProduct);

module.exports = router;