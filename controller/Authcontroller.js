const User = require("../model/Schemauser");
const jwt = require("jsonwebtoken");

const senderror = (err) => {
  console.log(err.message, err.code);
  const errors = { email: "", password: "" };
  //login error
  if (err.message === "incorrect email") {
    errors.email = "the email is not registired";
  }
  if (err.message === "incorrect email") {
    errors.password = "the password is not correct";
  }

  //duplicated error
  if (err.code == 11000) {
    errors.email = "the email address is already created";
    return errors;
  }

  // validation error
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach((p) => {
      errors[p.path] = p.message;
    });
  }
  return errors;
};
let mx = 24 * 60 * 60 * 3;
const creattoken = (id) => {
  return jwt.sign({ id }, "the secret of this project" /*the secret*/, {
    expiresIn: mx,
  });
};

const signup_get = (req, res) => {
  res.render("signup");
};

const signin_get = (req, res) => {
  res.render("signin");
};

const signin_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = creattoken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: mx * 1000 });
    res.status(200).json({ user });
    console.log("the id", user._id);
  } catch (err) {
    const errors = senderror(err);
    res.status(400).json({ errors });
  }
};

const signup_post = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  try {
    const user = await User.create({ email, password });
    console.log(user);
    const token = creattoken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: mx * 1000 });
    res.status(201).json({ user });
  } catch (err) {
    const errors = senderror(err);
    res.status(400).json({ errors });
    console.log(err);
  }
};
const logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};

module.exports = {
  signup_get,
  signin_get,
  signin_post,
  signup_post,
  logout,
};
