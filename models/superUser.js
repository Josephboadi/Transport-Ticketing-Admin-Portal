const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const superUserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },

    pic: {
      type: String,
      default:
        "https://res.cloudinary.com/dblprzex8/image/upload/v1604333253/profile1_dbycgc.png",
      // default: "no photo",
    },

    // phoneNumber: {
    //   type: Number,
    //   required: true,
    // },
    // emergencyContactName: {
    //   type: String,
    //   // required: true,
    // },
    // emergencyContactNumber: {
    //   type: Number,
    //   // required: true,
    // },
    // gender: {
    //   type: String,
    // },
    account: { type: Schema.Types.ObjectId, required: true, ref: "Account" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SuperUser", superUserSchema);
