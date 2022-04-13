const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vehicleSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["Bus", "Train", "Motor"],
      default: "Bus",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    regNumber: {
      type: String,
      required: true,
    },
    driver: {
      // type: String,
      type: Schema.Types.ObjectId,
      ref: "Employee",
      // required: true,
    },
    imageUrl: [
      {
        img: {
          type: String,
          default:
            "https://res.cloudinary.com/dblprzex8/image/upload/v1633007045/bus_zeokac.svg",
        },
      },
    ],
    capacity: {
      type: Number,
      required: true,
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

module.exports = mongoose.model("Vehicle", vehicleSchema);
