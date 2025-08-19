const dbCred = {
  name: {
    value: process.env.DBNAME,
    description: "Databse Name:DB",
  },
  user: {
    value: process.env.DBUSER,
    description: "mysql User Account Name:USER",
  },
  password: {
    value: process.env.DBPASS,
    description: "mysql user Account Password:PASS",
  },
  port: {
    value: process.env.DBPORT,
    description: "port on which databse server is running",
  },
  host: {
    value: process.env.DBHOST,
    description: "Databse host",
  },
};

for (let credentials in dbCred) {
  if (!dbCred[credentials].value) {
    console.log(
      `FATAL ERROR:${dbCred[credentials].description} is not defined`
    );
    process.exit(1);
  }
}

module.exports.dbcred = dbCred;
