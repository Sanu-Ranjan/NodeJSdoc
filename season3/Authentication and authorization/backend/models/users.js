const { DataTypes } = require("sequelize");
const { dbConnect } = require("../config/dbconnect");

const Users = dbConnect.define("Users", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = {
  Users,
};
