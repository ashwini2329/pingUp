const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");

const {
  handleUserSignIn,
  handleUserSignUp,
  fetchUserDeails,
  handleUpdateUser,
  fetchAllUsers,
  handleUpdatePassword,
} = require("../controllers/user");

// Static Routes
router.post("/signup", handleUserSignUp);
router.post("/signin", handleUserSignIn);
router.post("/updatePassword", handleUpdatePassword);

// Parameterized Routes
router.get("/:id", fetchUserDeails);
router.get("/allUsers/:id", fetchAllUsers);
router.put("/:id", upload.single("profileImage"), handleUpdateUser);

module.exports = router;
