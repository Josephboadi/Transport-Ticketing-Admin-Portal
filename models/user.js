const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const deliveryInfo = {
  street: String,
  locality: String,
  aptName: String,
  zip: String,
  phoneNo: Number,
  lat: Number,
  lng: Number,
};

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    formattedAddress: {
      type: String,
    },
    pic: {
      type: String,
      default:
        "https://res.cloudinary.com/dblprzex8/image/upload/v1604333253/profile1_dbycgc.png",
      // default: "no photo",
    },
    address: deliveryInfo,
    // paymentMethod: {
    //   type: String,
    // },
    phoneNumber: {
      type: Number,
      required: true,
    },
    emergencyContactName: {
      type: String,
      // required: true,
    },
    emergencyContactNumber: {
      type: Number,
      // required: true,
    },
    gender: {
      type: String,
    },
    account: { type: Schema.Types.ObjectId, required: true, ref: "Account" },
    cart: {
      trips: [
        {
          _id: false,
          tripId: {
            type: Schema.Types.ObjectId,
            ref: "Trip",
            required: true,
          },
          quantity: { type: Number, required: true },
        },
      ],
    },
  },
  { timestamps: true }
);

userSchema.methods.addToCart = function ({ trip, quantity }) {
  const cartTripIndex = this.cart.trips.findIndex((cp) => {
    return cp.tripId.toString() === trip._id.toString();
  });
  // let newQuantity = 1;
  const updatedCartTrips = [...this.cart.trips];

  if (cartTripIndex >= 0) {
    quantity = quantity;
    // newQuantity = this.cart.trips[cartTripIndex].quantity + 1;
    updatedCartTrips[cartTripIndex].quantity = quantity;
  } else {
    updatedCartTrips.push({
      tripId: trip._id,
      quantity: quantity,
      // quantity: newQuantity,
    });
  }
  const updatedCart = {
    trips: updatedCartTrips,
  };
  this.cart = updatedCart;
  return this.save();
};

userSchema.methods.reduceQuantity = function (tripId) {
  const newCart = this.cart.trips.map((trip) => {
    if (trip.tripId.toString() === tripId.toString())
      return {
        ...trip.toObject(),
        quantity: trip.quantity - 1,
      };
    return trip.toObject();
  });
  const finalNewCart = newCart.filter((trip) => {
    return trip.quantity > 0;
  });
  this.cart.trips = finalNewCart;
  return this.save();
};

userSchema.methods.removeFromCart = function (tripId) {
  const updatedCartTrips = this.cart.trips.filter((trip) => {
    return trip.tripId.toString() !== tripId.toString();
  });
  this.cart.trips = updatedCartTrips;
  return this.save();
};

userSchema.methods.clearCart = function () {
  this.cart = { trips: [] };
  return this.save();
};

module.exports = mongoose.model("User", userSchema);
