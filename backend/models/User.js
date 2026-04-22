const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    subscription: {
      status: {
        type: String,
        enum: ["free", "pending", "active"],
        default: "free",
      },
      paidAt: {
        type: Date,
        default: null,
      },
      reference: {
        type: String,
        default: null,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
