const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const protect = require("../middlewares/authMiddleware");

const {
  handleUserSignIn,
  handleUserSignUp,
  fetchUserDeails,
  handleUpdateUser,
  fetchAllUsers,
  handleUpdatePassword,
} = require("../controllers/user");

// Public Routes
router.post("/signup", handleUserSignUp);
router.post("/signin", handleUserSignIn);
router.post("/updatePassword", handleUpdatePassword);

// Protected Routes
router.use(protect);
router.get("/:id", fetchUserDeails);
router.get("/allUsers/:id", fetchAllUsers);
router.put("/:id", upload.single("profileImage"), handleUpdateUser);

module.exports = router;
