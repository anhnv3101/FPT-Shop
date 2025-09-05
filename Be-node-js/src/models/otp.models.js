import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    code: { type: String, required: true },
    type: { type: String, enum: ["verify", "reset"], required: true }, // verify email, reset password
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Otp", otpSchema);