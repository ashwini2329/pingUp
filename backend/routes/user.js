const express = require("express");
const router = express.Router();

const {
  handleUserSignIn,
  handleUserSignUp,
  fetchUserDeails,
  handleUpdateUser,
} = require("../controllers/user");

router.get("/:id", fetchUserDeails);

router.post("/signup", handleUserSignUp);

router.post("/signin", handleUserSignIn);

router.put("/:id", handleUpdateUser);

module.exports = router;
