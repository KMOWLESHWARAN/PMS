const express = require("express");
const router = express();

const { createVariant, getVariant, updateVariant, deleteVariant } = require("../controllers/variantController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

router.post("/create", verifyToken,isAdmin, createVariant);
router.get("/", verifyToken, isAdmin, getVariant);
router.put("/:id", verifyToken, isAdmin, updateVariant);
router.delete("/:id", verifyToken, isAdmin, deleteVariant);

module.exports = router;