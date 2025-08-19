const { dbcred } = require("../config");

const { Sequelize } = require("sequelize");

const db = new Sequelize(
  dbcred.name.value,
  dbcred.user.value,
  dbcred.password.value,
  {
    host: "localhost",
    port: 3303,
    dialect: "mysql",
  }
);

(async () => {
  try {
    await db.authenticate();
    console.log(`Connected to Databse`);
  } catch (error) {
    console.log(`Connection to databse failed`);
  }
})();

module.exports = {
  db,
};
