const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const paymentAccountSchema = new Schema(
  {
    accountName: {
      type: String,
      required: true,
    },
    financialServiceName: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: String,
      required: true,
    },
    privateId: {
      type: String,

      // required: true,
    },
    publicId: {
      type: String,

      // required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PaymentAccount", paymentAccountSchema);
