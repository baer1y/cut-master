const express = require("express");
const mongoose = require("mongoose");
const app = express();
const session = require("express-session");
const router = express.Router();
const USER = require("../models/USER");
const bcrypt = require("bcryptjs");

const flash = require("connect-flash");

router.get("/signup", (req, res) => {
  res.render("signup", {
    ErrorsArr: [],
  });
});
router.post("/signup", async (req, res) => {
  const { name, email, city, password, SnakeScores, SriScores, png_src } = req.body;
  const exUser = await USER.findOne({ email: email });
  let errors = [];

  if (exUser) {

    res.status(400);
    res.send("User is already exists.");
  } else {
    const newUser = new USER({
      name: name,
      email: email,
      password: password,
      city: city,
      SnakeScores: SnakeScores,
      SriScores: SriScores,
      png_src: png_src,
      Date: Date.now(),
      Role: "User",
    });

    newUser.save((err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(newUser);
        console.log("ASDADASDAD")
        res.redirect("/login");
      }
    });
  }
});

module.exports = router;