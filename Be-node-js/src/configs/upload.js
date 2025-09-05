// config/multerConfig.js
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Khởi tạo đường dẫn upload
const uploadDir = path.resolve(__dirname, "../uploads");

// Tạo thư mục nếu chưa tồn tại
fs.mkdirSync(uploadDir, { recursive: true });

// Tạo bộ nhớ lưu trữ file
const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadDir),
  filename: (_, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.floor(Math.random() * 1e6)}${ext}`;
    cb(null, uniqueName);
  },
});

// Lọc file upload (chỉ nhận ảnh)
const fileFilter = (_, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/webp",
    "image/svg+xml",
    "image/avif",
    "image/bmp",
    "image/tiff",
  ];
  allowedTypes.includes(file.mimetype)
    ? cb(null, true)
    : cb(new Error("Chỉ hỗ trợ file ảnh "));
};

// Tạo middleware multer
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Giới hạn 5MB
});

module.exports = upload;