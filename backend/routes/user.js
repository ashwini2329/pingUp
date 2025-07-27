const express = require("express");
const router = express.Router();

const {
  handleUserSignIn,
  handleUserSignUp,
  fetchUserDeails,
} = require("../controllers/user");

router.get("/:id", fetchUserDeails);

router.post("/signup", handleUserSignUp);

router.post("/signin", handleUserSignIn);

module.exports = router;
