const { Sequelize } = require("sequelize");

const { env, checkEnv } = require("../utils/checkenv");

checkEnv(env.DB, "DB");
checkEnv(env.USER, "USER");
checkEnv(env.PASS, "PASS");

const dbConnect = new Sequelize(
  process.env.DB,
  process.env.USER,
  process.env.PASS,
  {
    host: "localhost",
    port: 3303,
    dialect: "mysql",
  }
);

(async () => {
  try {
    await dbConnect.authenticate();
    console.log(`Connection with Database established`);
  } catch (error) {
    console.log(`FATAL Error: Failed to connect to data base ${error}`);
    process.exit(1);
  }
})();

module.exports = {
  dbConnect,
};
