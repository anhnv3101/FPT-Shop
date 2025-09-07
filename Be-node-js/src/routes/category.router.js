import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";
const category = express.Router();

// Tạo danh mục
category.post("/", createCategory);
// Lấy tất cả danh mục
category.get("/", getAllCategories);
// Lấy danh mục theo ID
category.get("/:id", getCategoryById);
// Cập nhật danh mục
category.put("/:id", updateCategory);
// Xóa danh mục
category.delete("/:id", deleteCategory);

export default category;
