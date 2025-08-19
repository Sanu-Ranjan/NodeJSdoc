require("dotenv").config();
const cookieParser = require("cookie-parser");
const { db } = require("./db/connectdb");
const express = require("express");
const app = express();
const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/users.route");

const port = process.env.PORT_API || 3000;
require("./models/users.model");

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute.router);
app.use("/api/users", userRoute.router);

db.sync({ force: false }).then(() => {
  app.listen(port, () => {
    console.log(`listening on port:${port}`);
  });
});
