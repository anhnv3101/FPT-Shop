import mongoose from "mongoose";

export const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String },
    state: { type: Boolean, default: true }, // khóa danh mục
  },
  { timestamps: true, versionKey: false }
);
