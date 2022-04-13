const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const locationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    region: {
      type: String,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Location", locationSchema);
