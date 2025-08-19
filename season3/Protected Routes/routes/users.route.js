const router = require("express").Router();
const { getProfile } = require("../controllers/user.controller");
const { authorization } = require("../middleware/autthorization");
//get user profile-- get: "/"
router.get("/", authorization, getProfile);

module.exports = {
  router,
};
