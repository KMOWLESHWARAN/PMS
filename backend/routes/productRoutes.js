const express = require("express");
const router = express.Router();

const { createProduct, getProducts, deleteProduct, updateProduct } = require("../controllers/productController");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

router.post("/create", protect, adminOnly("admin"), createProduct);
router.get("/", getProducts);
router.put("/:id", protect, adminOnly("admin"), updateProduct);
router.delete("/:id", protect, adminOnly("admin"), deleteProduct);
module.exports = router;