const mongoose = require("mongoose");

mongoose
  .connect(
    process.env.MONGODB_URI || "mongodb://0.0.0.0:27017/stripe-gateway-api"
  )
  .then(() => {
    console.log("Connected Successfully");
  })
  .catch((e) => {
    console.log("Not connected", e);
  });
