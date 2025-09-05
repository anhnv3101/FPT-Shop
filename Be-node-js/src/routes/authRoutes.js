import express from "express";
import {
  register,
  verifyRegisterOTP,
  login,
  forgotPassword,
  verifyResetOTP,
  resetPassword,
} from "../controllers/authController.js";

const router = express.Router();

// Đăng ký và xác minh OTP
router.post("/register", register);
router.post("/verify-register-otp", verifyRegisterOTP); // Xác minh OTP đăng ký

// Đăng nhập
router.post("/login", login);

// Quên mật khẩu
router.post("/forgot-password", forgotPassword); // Gửi OTP reset password
router.post("/verify-reset-otp", verifyResetOTP); // Xác minh OTP reset password
router.post("/reset-password", resetPassword);  // Đặt lại mật khẩu mới

export default router;
