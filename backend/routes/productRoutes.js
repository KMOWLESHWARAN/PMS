const express = require("express");
const router = express.Router();

const { createProduct, getProducts, deleteProduct, updateProduct } = require("../controllers/productController");

const upload = require("../middleware/upload");

const { bulkImportProducts, exportProducts } = require("../controllers/productController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

router.post("/create", verifyToken, isAdmin, createProduct);
router.get("/", getProducts);
router.put("/:id", verifyToken, isAdmin, updateProduct);
router.delete("/:id", verifyToken, isAdmin, deleteProduct);


router.post("/bulk-import", upload.single("file"), bulkImportProducts);
router.get("/export", exportProducts);

module.exports = router;