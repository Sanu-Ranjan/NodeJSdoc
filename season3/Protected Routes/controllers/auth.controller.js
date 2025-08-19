const { resObject, errorHandler } = require("../utils");
const { Users } = require("../models/users.model");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

//register
const register = async (req, res) => {
  const { email, password } = req.body;
  //later add data verification logic

  try {
    let user = await Users.findOne({ where: { email: email } });

    if (user)
      return res.status(409).json(resObject.fail("Email already registered"));

    const salt = await bcrypt.genSalt(10);

    const hashed = await bcrypt.hash(password, salt);

    user = await Users.create({
      email: email,
      password: hashed,
    });

    res.status(201).json(resObject.success("User Registered"));
  } catch (error) {
    errorHandler(error, res);
  }
};
//login

const login = async (req, res) => {
  const { email, password } = req.body;
  //later add data verification logic

  try {
    const user = await Users.findOne({ where: { email: email } });

    if (!user)
      return res.status(401).json(resObject.fail("Invalid email or password"));

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid)
      return res.status(401).json(resObject.fail("Invalid email or password"));

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    res.cookie("token", token);
    res.status(200).json(resObject.success("Login Successful"));
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  register,
  login,
};
