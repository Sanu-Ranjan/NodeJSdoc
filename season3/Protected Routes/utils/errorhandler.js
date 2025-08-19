const { resObject } = require("./resObject");

const errorHandler = (err, res) => {
  return res
    .status(500)
    .json(resObject.fail("Databse operation failed", err.message));
};

module.exports = {
  errorHandler,
};
