const express = require("express");
const User = require("../model/user");
const router = express.Router();

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

router.get("/logout" , (req , res) => {
  res.clearCookie("token").send("You are logout").redirect("/"); 
})

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);

    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("login", {
      error: "Incorrect Email or Password",
    });
  }
});

router.post("/signup", async (req, res) => {
  const { fullName, password, email } = req.body;
  const user = await User.create({
    fullName,
    email,
    password,
  });
  if (!user) return res.json({ error: "user not created" });
  return res.redirect("/");
});

module.exports = router;
