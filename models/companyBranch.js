const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressInfo = {
  subLocality: String,
  city: String,
  region: String,
  country: String,
  zip: String,
  lat: Number,
  lng: Number,
  phoneNo: Number,
};

const companyBranchSchema = new Schema(
  {
    branchName: {
      type: String,
      required: true,
    },

    formattedAddress: {
      type: String,
      // required: true,
    },
    address: addressInfo,
    creator: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CompanyBranch", companyBranchSchema);
