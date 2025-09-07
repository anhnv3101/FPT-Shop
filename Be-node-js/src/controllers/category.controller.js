import Category from "../models/category.js";

export const createCategory = async (req, res) => {
  try {
    const { name, image } = req.body;

    // Validation
    if (!name) {
      return res.status(400).json({ message: "Tên danh mục là bắt buộc" });
    }

    // Correct usage: create with an object
    const category = await Category.create({ name, image });

    // Return created data
    return res.status(201).json({
      message: "Tạo danh mục thành công",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Tạo danh mục thất bại",
      error: error.message,
    });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    if (categories.length === 0) {
      return res.status(404).json({
        message: "Không có danh mục nào",
        data: [],
      });
    }

    return res.status(200).json({
      message: "Lấy danh mục thành công",
      data: categories,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lấy danh mục thất bại",
      error: error.message,
    });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID không hợp lệ" });
    }

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        message: "Không tìm thấy danh mục",
      });
    }

    return res.status(200).json({
      message: "Lấy danh mục thành công",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lấy danh mục thất bại",
      error: error.message,
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID không hợp lệ" });
    }
    if (!name && !image) {
      return res.status(400).json({ message: "Không có dữ liệu để cập nhật" });
    }

    const category = await Category.findByIdAndUpdate(
      id,
      { name, image },
      { new: true } // Trả về bản ghi sau khi cập nhật
    );

    if (!category) {
      return res.status(404).json({
        message: "Không tìm thấy danh mục để cập nhật",
      });
    }

    return res.status(200).json({
      message: "Cập nhật danh mục thành công",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Cập nhật danh mục thất bại",
      error: error.message,
    });
  }
};
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID không hợp lệ" });
    }

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy danh mục để xóa" });
    }

    return res.status(200).json({
      message: "Xóa danh mục thành công",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Xóa danh mục thất bại",
      error: error.message,
    });
  }
};
