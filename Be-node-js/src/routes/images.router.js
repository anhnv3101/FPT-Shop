const express = require("express");
const uploadRouter = express.Router();
const path = require("path");
const upload = require("../configs/upload.js"); // dùng đúng middleware export sẵn

uploadRouter.post("/images", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Không có file nào được tải lên" });
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    res.status(200).json({
      message: "Upload ảnh thành công",
      filename: req.file.filename,
      url: fileUrl,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Lỗi máy chủ khi upload ảnh" });
  }
});

module.exports = uploadRouter;