const express = require("express");
const router = express.Router();

const { handleUserSignIn, handleUserSignUp } = require("../controllers/user");

router.post("/signup", handleUserSignUp);

router.post("/signin", handleUserSignIn);

module.exports = router;
