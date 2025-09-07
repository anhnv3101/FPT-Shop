import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    isVerified: { type: Boolean, default: false }, // check email đã xác minh chưa
    createdByAdmin: { type: Boolean, default: false },
    state: { type: Boolean, default: true }, // khóa tài khoản
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
