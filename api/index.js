const express = require('express');
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");
const productRoute = require("./routes/productRoute");
const cartRoute = require("./routes/cartRoute");
const orderRoute  = require("./routes/orderRoute");
const stripeRoute = require("./routes/stripeRoute");

const dotenv = require("dotenv");
dotenv.config();

const cors = require('cors');
const app = express();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDb connection setup successfully");
  }).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Terminate the application on database connection error
  });

app.use(cors());
app.use(express.json());
app.use("/api/shoeshouse", authRoute);
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout/",stripeRoute)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
