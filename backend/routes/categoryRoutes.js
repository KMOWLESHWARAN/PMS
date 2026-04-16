const express = require("express");
const router = express.Router();
const { createCategory, getCategories, deleteCategory, updateCategory } = require("../controllers/categoryController");
const protect = require("../middleware/authMiddleware");

router.post("/create", protect, createCategory);
router.get("/", getCategories);
router.delete("/:id", protect, deleteCategory);
router.put("/:id", protect,updateCategory);

module.exports = router;
