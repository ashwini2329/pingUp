const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * fetch user details function
 * @param {*} req
 * @param {*} res
 * @returns
 */
const fetchUserDeails = async (req, res) => {
  console.log(`fetchUserdetails hit - ${req.params.id}`);
  const userId = req.params.id;
  try {
    if (!userId) {
      return res.status(400).json({
        message: "User ID is required !",
      });
    }

    const userDetails = await User.findById(userId);
    if (!userDetails) {
      return res.status(404).json({
        message: "User not found !",
      });
    }
    return res.status(200).json({
      message: userDetails,
    });
  } catch (error) {
    console.error(`Erorr while fetching user details !`);
    return res.status(500).json({
      message: "Server error found, Please try again !",
    });
  }
};

/**
 * return list of all registered users except logged in user
 * @param {*} req
 * @param {*} res
 * @returns
 */
const fetchAllUsers = async (req, res) => {
  console.log(`fetchAllUsers got hit !`);
  try {
    const allUsers = await User.find({ _id: { $ne: req.params.id } }).select(
      "-password"
    );

    if (!allUsers) {
      return res.status(404).json({
        message: "User details not found !",
      });
    }
    return res.status(200).json({
      message: allUsers,
    });
  } catch (error) {
    console.error("Error while fetching user details:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

/**
 * user sign up function
 * @param {*} req
 * @param {*} res
 * @returns
 */
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

/**
 * user sign in function
 * @param {*} req
 * @param {*} res
 * @returns
 */
const handleUserSignIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "Email & Password is required !",
      });
    }

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    console.log(`tokengenerated -- ${token}`);

    // Send token and user data (excludin password)
    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Signin Error");
    return res.status(500).json({
      message: "Server error: Please try again later !",
      error,
    });
  }
};

const handleUpdateUser = async (req, res) => {
  console.log(`handleUpdateUser hit`);

  try {
    const { name, email, phone, about, hobbies, isPrivate } = req.body;

    // Parse socials properly
    const socials = {
      github: req.body.github || "",
      linkedin: req.body.linkedin || "",
      twitter: req.body.twitter || "",
      portfolio: req.body.portfolio || "",
    };

    // Parse hobbies safely (might come as string if sent as FormData)
    const parsedHobbies =
      typeof hobbies === "string"
        ? [hobbies]
        : Array.isArray(hobbies)
        ? hobbies
        : [];

    const updatedData = {
      name,
      email,
      phone,
      about,
      isPrivate,
      socials,
      hobbies: parsedHobbies,
    };

    if (req.file) {
      updatedData.profilePhoto = req.file.filename;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updatedData },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found!" });
    }

    res.status(200).json({ message: updatedUser });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  handleUserSignUp,
  handleUserSignIn,
  fetchUserDeails,
  handleUpdateUser,
  fetchAllUsers,
};
