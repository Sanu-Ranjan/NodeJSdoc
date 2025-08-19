const { resObject } = require("../utils");
const jwt = require("jsonwebtoken");

const authorization = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token)
    return res.status(401).json(resObject.fail("No token, Unauthorised"));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json(resObject.fail("Invalid Token"));
  }
};

module.exports = {
  authorization,
};
