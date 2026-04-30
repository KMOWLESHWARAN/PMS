const express = require("express");
const router = express.Router();

const { createProduct, getProducts, deleteProduct, updateProduct, approveProduct } = require("../controllers/productController");

const upload = require("../middleware/upload");

const { bulkImportProducts, exportProducts } = require("../controllers/productController");
const { verifyToken, isAdmin, isMerchantOrAdmin } = require("../middleware/authMiddleware");

router.post("/create", verifyToken, isMerchantOrAdmin, createProduct);
router.get("/", verifyToken,getProducts);
router.put("/:id", verifyToken, isAdmin, updateProduct);
router.delete("/:id", verifyToken, isAdmin, deleteProduct);
router.patch("/approve/:id", verifyToken, isAdmin, approveProduct);

router.post("/bulk-import", upload.single("file"), bulkImportProducts);
router.get("/export", exportProducts);

module.exports = router;