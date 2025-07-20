const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoute = require("./routes/user");

dotenv.config();
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

// routes
app.use("/user", userRoute);

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
