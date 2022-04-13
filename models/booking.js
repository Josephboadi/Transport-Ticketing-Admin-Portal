const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    trips: [
      {
        trip: { type: Object, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    ticketId: {
      type: String,
      // required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["Booked", "Rescheduled", "Cancelled"],
    },
    refundRequested: {
      type: Boolean,
      required: true,
      default: false,
    },
    refundPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    user: {
      email: {
        type: String,
        // required: true,
      },
      phoneNo: {
        type: Number,
        // required: true,
      },

      address: {
        type: Object,
        // required: true,
      },
      relativeName: {
        type: String,
        // required: true,
      },
      relativePhone: {
        type: Number,
        // required: true,
      },
      name: {
        type: String,
        required: true,
      },
      userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    },
    paymentType: {
      type: String,
      default: "Online",
    },
    paymentResult: {
      id: {
        type: String,
        // required: true,
      },
      status: {
        type: String,
        // required: true,
      },
      update_time: {
        type: String,
        // required: true,
      },
      email_address: {
        type: String,
        // required: true,
      },
    },
    taxPrice: {
      type: Number,
      required: true,
      // default: 0.0,
    },
    seatNumber: {
      type: String,
      required: true,
      // default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      // default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    company: {
      phone: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      imageUrl: {
        type: String,
        required: true,
      },
      companyId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Company",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
