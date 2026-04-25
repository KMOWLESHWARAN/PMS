const express = require("express");
const router = express.Router();

const { updateUserRole } = require("../controllers/userController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

router.get("/profile", verifyToken, (req, res) => {
    res.json({
        message: "Protected route accessed",
        user: req.user,
    });
});

router.delete("/delete-user/:id", verifyToken, isAdmin, (req, res) => {
    res.json({ message: "Admin can delete user" });
});

router.put("/:id/role", verifyToken, isAdmin, updateUserRole)
module.exports = router;