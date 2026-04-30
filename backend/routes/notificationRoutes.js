const express = require("express");

const router = express.Router();

const { getNotifications, markRead } = require("../controllers/notificationContoller");

const { verifyToken } = require("../middleware/authMiddleware");

router.get("/", verifyToken, getNotifications);
router.put("/:id/read", verifyToken, markRead);

module.exports = router;