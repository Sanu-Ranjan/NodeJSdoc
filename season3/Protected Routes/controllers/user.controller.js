const { resObject, errorHandler } = require("../utils");
const { Users } = require("../models/users.model");

const getProfile = async (req, res) => {
  const { id } = req.user;
  try {
    const user = await Users.findByPk(id);
    const { email } = user;
    res.status(200).json(resObject.success("User Details", { email, id }));
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  getProfile,
};
