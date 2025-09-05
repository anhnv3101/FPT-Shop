import bcrypt from "bcryptjs";
import User from "../models/users.models.js";
import OTP from "../models/otp.models.js";
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken.js";
import { sendVerificationEmail } from "../utils/sendMail.js";

// Tạo OTP ngẫu nhiên 6 số
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

/**
 * @desc Đăng ký - Gửi OTP qua email
 */
export const register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email đã được sử dụng" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, phone, password: hashedPassword });

    const otpCode = generateOTP();
    await OTP.create({
      userId: user._id,
      code: otpCode,
      type: "verify", // OTP dùng cho đăng ký
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    await sendVerificationEmail(email, name, otpCode);

    res.status(201).json({
      message: "Đăng ký thành công. Vui lòng kiểm tra email để xác thực OTP.",
      userId: user._id,
    });
  } catch (error) {
    console.error("❌ Lỗi register:", error.message);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

/**
 * @desc Xác minh OTP cho đăng ký
 */
export const verifyRegisterOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Người dùng không tồn tại" });

    const otpRecord = await OTP.findOne({ userId: user._id, code: otp, type: "verify" });
    if (!otpRecord) return res.status(400).json({ message: "OTP không hợp lệ" });

    if (otpRecord.expiresAt < Date.now()) {
      await OTP.deleteOne({ _id: otpRecord._id });
      return res.status(400).json({ message: "OTP đã hết hạn" });
    }

    user.isVerified = true;
    await user.save();
    await OTP.deleteOne({ _id: otpRecord._id });

    res.json({ message: "Xác minh đăng ký thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

/**
 * @desc Đăng nhập
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Sai email hoặc mật khẩu" });
    if (!user.isVerified) return res.status(400).json({ message: "Tài khoản chưa xác minh" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Sai email hoặc mật khẩu" });

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res.json({ message: "Đăng nhập thành công", accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

/**
 * @desc Quên mật khẩu - Gửi OTP reset
 */
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Email không tồn tại" });

    const otpCode = generateOTP();
    await OTP.create({
      userId: user._id,
      code: otpCode,
      type: "reset", // OTP dùng cho reset password
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    await sendVerificationEmail(user.email, user.name, otpCode, "reset");

    res.json({ message: "OTP khôi phục mật khẩu đã được gửi" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

/**
 * @desc Xác minh OTP reset password
 */
export const verifyResetOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Người dùng không tồn tại" });

    const otpRecord = await OTP.findOne({ userId: user._id, code: otp, type: "reset" });
    if (!otpRecord) return res.status(400).json({ message: "OTP không hợp lệ" });

    if (otpRecord.expiresAt < Date.now()) {
      await OTP.deleteOne({ _id: otpRecord._id });
      return res.status(400).json({ message: "OTP đã hết hạn" });
    }

    // Xóa OTP sau khi dùng
    await OTP.deleteOne({ _id: otpRecord._id });

    // Trả về userId hoặc email để frontend cho phép đặt mật khẩu mới
    res.json({ message: "OTP hợp lệ, bạn có thể đặt mật khẩu mới", userId: user._id });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

/**
 * @desc Đặt lại mật khẩu (sau khi verify OTP reset)
 */
export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Người dùng không tồn tại" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Đặt lại mật khẩu thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};
