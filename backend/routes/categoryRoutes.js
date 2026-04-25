const express = require("express");
const router = express.Router();

const { createCategory, getCategories, deleteCategory, updateCategory } = require("../controllers/categoryController");
const { isAdmin, verifyToken } = require("../middleware/authMiddleware");


router.post("/create", verifyToken, isAdmin, createCategory);
router.get("/", verifyToken, isAdmin, getCategories);
router.delete("/:id", verifyToken, isAdmin, deleteCategory);
router.put("/:id", verifyToken, isAdmin, updateCategory);

module.exports = router;
