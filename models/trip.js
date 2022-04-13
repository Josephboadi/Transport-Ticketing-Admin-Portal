const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tripSchema = new Schema(
  {
    from: {
      // type: Object,
      // required: true,
      type: Schema.Types.ObjectId,
      ref: "Location",
      // tri: { type: Object, required: true },
      required: true,
    },
    to: {
      // type: String,
      type: Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: Date,
      // required: true,
    },
    fare: {
      type: Number,
      required: true,
    },
    ticketsCount: {
      type: Number,
      default: 50,
      required: true,
    },
    vehicle: {
      type: Schema.Types.ObjectId,
      // type: String,
      ref: "Vehicle",
      required: true,
    },
    branch: {
      type: Schema.Types.ObjectId,
      // type: String,
      ref: "CompanyBranch",
      required: true,
    },
    tripType: {
      type: String,
      required: true,
      default: "Scheduled",
    },
    seat: [
      {
        seatNumber: {
          type: String,
          // required: true
        },
        status: {
          type: String,
          // required: true,
          enum: ["Booked", "Available"],
        },
      },
    ],
    // driver: {
    //   // type: Schema.Types.ObjectId,
    //   type: String,
    //   // ref: "Driver",
    //   required: true,
    // },
    status: {
      type: String,
      default: "LOADING",
      enum: ["LOADING", "STARTED", "COMPLETED"],
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

tripSchema.virtual("tripName").get(function () {
  return `${this.from._id} - ${this.to._id}`;
});

module.exports = mongoose.model("Trip", tripSchema);
