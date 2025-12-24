const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

dotenv.config();
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());

const userRoute = require("./routes/user");
const friendRoute = require("./routes/friendRoutes");

// routes
app.use("/user", userRoute);
app.use("/user/requests", friendRoute);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// connnect to mongodb
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("mongodb connected !"))
  .catch((err) => console.error(`error in connecting - ${err}`));

app.get("/", (req, res) => {
  res.send("server is running...!");
});

app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
