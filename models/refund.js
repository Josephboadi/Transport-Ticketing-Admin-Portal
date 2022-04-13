const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const bcrypt = require("bcryptjs");

const refundSchema = new Schema(
  {
    bookingId: {
      type: String,
      required: true,
    },
    ticketId: {
      type: String,
      required: true,
    },
    customerName: {
      type: String,

      required: true,
    },
    customerEmail: {
      type: String,
      // required: true,
    },
    customerNumber: {
      type: String,
      required: true,
    },
    trip: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentId: {
      type: String,
      //   required: true,
    },
    refundPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Refund", refundSchema);
