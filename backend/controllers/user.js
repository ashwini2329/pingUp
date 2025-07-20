const User = require("../models/User");

const handleUserSignUp = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password || !phone) {
      return res.status(400).json({
        message: "All Fields are required !",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with this email already exists." });
    }

    const newUser = new User({ name, email, password, phone });
    await newUser.save();
    return res.status(201).json({
      message: "User signed up successfully !",
      userId: newUser._id,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
const handleUserSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Email & Password is required !",
      });
    }

    const existingUser = await User.findOne({ email });
  } catch (error) {
    console.error("Signin Error");
    return res.status(500).json({
      message: "Server error: Please try again later !",
    });
  }
};

module.exports = {
  handleUserSignUp,
  handleUserSignIn,
};
