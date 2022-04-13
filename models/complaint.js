const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const addressInfo = {
//   street: String,
//   aptName: String,
//   locality: String,
//   zip: String,
//   lat: Number,
//   lng: Number,
//   phoneNo: Number,
// };

const complaintSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    // rating: {
    //   type: Number,
    //   // required: true,
    // },
    complaint: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
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

// const companySchema = new Schema(
//   {
//     slug: { type: String, required: true, unique: true },
//     name: {
//       type: String,
//       required: true,
//     },
//     motto: {
//       type: String,
//       required: true,
//     },
//     reviews: [reviewSchema],
//     rating: {
//       type: Number,
//       required: true,
//       default: 0,
//     },
//     numReviews: {
//       type: Number,
//       required: true,
//       default: 0,
//     },
//     // formattedAddress: {
//     //   type: String,
//     //   required: true,
//     // },
//     imageUrl: [{ img: { type: String, required: true } }],
//     // imageUrlDoc: [{ img: { type: String, required: true } }],
//     isVerified: {
//       type: Boolean,
//       default: false,
//     },
//     // address: addressInfo,
//     numReviews: Number,
//     rating: Number,
//     // payment: [
//     //   {
//     //     type: String,
//     //     // enum: ["CASH", "ONLINE_PAYMENT", "UPI"],
//     //     required: true,
//     //   },
//     // ],
//     account: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       ref: "Account",
//     },
//     paymentaccounts: [
//       { type: mongoose.Schema.Types.ObjectId, ref: "PaymentAccount" },
//     ],
//     refunds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Refund" }],
//     branches: [{ type: mongoose.Schema.Types.ObjectId, ref: "CompanyBranch" }],
//     vehicles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" }],
//     employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }],
//     locations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Location" }],
//     seats: [{ type: mongoose.Schema.Types.ObjectId, ref: "Seat" }],
//     trips: [{ type: mongoose.Schema.Types.ObjectId, ref: "Trip" }],
//   },
//   { timestamps: true }
// );

module.exports = mongoose.model("Complaint", complaintSchema);
