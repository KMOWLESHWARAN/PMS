const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

router.get("/profile", protect, (req, res) => {
    res.json({
        message: "Protected route accessed",
        user: req.user,
    });
});

router.delete("/delete-user/:id",protect,adminOnly("admin"),(req,res)=>{
    res.json({message : "Admin can delete user"});
});

module.exports = router;