const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  verifyOtp,
  resetPassword,
  forgetPassword
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);

router.post("/forgot-password", forgetPassword);

router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);

module.exports = router;