const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const accountSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: [
        "ROLE_USER",
        "ROLE_ADMIN",
        "ROLE_DRIVER",
        "ROLE_SALES",
        "ROLE_COMPANY",
        "ROLE_SUPER_ADMIN",
      ],
      required: true,
    },
    resetToken: String,
    expireToken: Date,
    accountVerifyToken: String,
    accountVerifyTokenExpiration: Date,
    isVerified: {
      type: Boolean,
      default: false,
    },
    companyId: {
      type: String,
      // default: false,
    },
  },
  { timestamps: true }
);
// accountSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// accountSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     next();
//   }

// const salt = await bcrypt.genSalt(10);
// this.password = await bcrypt.hash(this.password, salt);
// });

module.exports = mongoose.model("Account", accountSchema);
