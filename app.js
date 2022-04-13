const path = require("path");
const axios = require("axios");
const express = require("express");
// const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const env = require("dotenv");
const PORT = process.env.PORT || 5000;
const authRoutes = require("./routes/auth");
const tripRoutes = require("./routes/trip");
const refundRoutes = require("./routes/refund");
const complaintRoutes = require("./routes/complaint");
const userRoutes = require("./routes/user");
const vehicleRoutes = require("./routes/vehicle");
const bookingRoutes = require("./routes/booking");
const branchRoutes = require("./routes/branch");
const employeeRoutes = require("./routes/employee");
const companyRoutes = require("./routes/company");
const locationRoutes = require("./routes/location");
const paymentAccountRoutes = require("./routes/paymentAccount");
const { MONGOURI } = require("./config/keys");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Math.floor(Math.random() * 90000) + 10000 + "-" + file.originalname
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg"
  )
    cb(null, true);
  else cb(null, false);
};
env.config();

mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
mongoose.connection.on("connected", () => {
  console.log("you are successully connected to mongo database");
});
mongoose.connection.on("error", (err) => {
  console.log("error connecting", err);
});

const app = express();

const upload = multer({ storage: fileStorage, fileFilter: fileFilter });

app.use(express.json());
// app.use("/images", express.static(path.join(__dirname, "images")));

//set headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

app.use("/payment/verify", async (req, res) => {
  const ref = req.query.reference;
  const priv = req.query.privateId;
  let output;
  await axios
    .get(`https://api.paystack.co/transaction/verify/${ref}`, {
      headers: {
        authorization: `Bearer ${priv}`,
        // authorization: `Bearer ${process.env.PAY_STACK_ID}`,
        //replace TEST SECRET KEY with your actual test secret
        //key from paystack
        "content-type": "application/json",
        "cache-control": "no-cache",
      },
    })
    .then((success) => {
      output = success;
      res.status(200).json({ data: success });
      console.log(success);
    })
    .catch((error) => {
      output = error;
    });
  // if (!output.response && output.status !== 200)
  //   throw new UserInputError("No internet Connection");
  // if (output.response && !output.response.data.status)
  //   throw new UserInputError(
  //     "Error verifying payment , 'unknown Transaction    Reference Id'"
  //   );

  res.status(200).send("Payment was successfully verified");
});

app.use("/auth", upload.array("images", 10), authRoutes);
app.use("/vehicle", upload.array("images"), vehicleRoutes);
app.use("/company", upload.array("images"), companyRoutes);
app.use("/employee", upload.single("image"), employeeRoutes);
app.use("/booking", bookingRoutes);
app.use("/branch", branchRoutes);
app.use("/trip", tripRoutes);
app.use("/refund", refundRoutes);
app.use("/location", locationRoutes);
app.use("/complaint", complaintRoutes);
app.use("/paymentaccount", paymentAccountRoutes);
app.use(upload.single("image"), userRoutes);

//error middleware
app.use((error, req, res, next) => {
  console.log(error + "--------------------------");
  const statusCode = error.statusCode || 500;
  const message = error.message;
  let errorsPresent;
  if (error.errors) {
    errorsPresent = error.errors;
  }

  res.status(statusCode).json({
    message: message,
    errors: errorsPresent,
  });
});

const clients = {};

// mongoose.connect(MONGOURI, {
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
//   useCreateIndex: true,
// });
// mongoose.connection.on("connected", () => {
//   console.log("you are successully connected to mongo database");
// });
// mongoose.connection.on("error", (err) => {
//   console.log("error connecting", err);
// });

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client-admin/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "client-admin", "build", "index.html")
    );
  });
}

app.listen(PORT, console.log(`Server running on port ${PORT}`));

exports.clients = clients;
