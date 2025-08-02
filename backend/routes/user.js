const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");

const {
  handleUserSignIn,
  handleUserSignUp,
  fetchUserDeails,
  handleUpdateUser,
} = require("../controllers/user");

router.get("/:id", fetchUserDeails);

router.post("/signup", handleUserSignUp);

router.post("/signin", handleUserSignIn);

router.put("/:id", upload.single("profileImage"), handleUpdateUser);

module.exports = router;
