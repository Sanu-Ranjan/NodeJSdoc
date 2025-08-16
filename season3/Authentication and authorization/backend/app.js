const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const { dbConnect } = require("./config/dbconnect");

const { Users } = require("./models/users");

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookie());

app.post("/users", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await Users.create({
      email: email,
      password: hash,
    });
    res.status(201).send("user added");
  } catch (error) {
    console.log(error);
  }
});
app.post("/users/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({
      where: {
        email: email,
      },
    });

    console.log(user);

    if (!user) return res.send("Incorrect user Id or password");

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) return res.send("Invalid user or pasword");

    const token = jwt.sign(
      {
        id: user.id,
      },
      "secretkey"
    );

    res.cookie("token", token);
    res.send("Login succesful");
  } catch (error) {
    res.send(error);
  }
});

app.get("/users", async (req, res) => {
  const { token } = req.cookies;
  console.log(req.cookies);
  if (!token) return res.send("Please Login");

  try {
    const decoded = jwt.verify(token, "secretkey");
    console.log(decoded);
    res.send(`Hello user ${decoded.id}`);
  } catch (error) {
    res.send("Session expired");
  }
});
(async () => {
  try {
    await dbConnect.sync({ force: false });
    app.listen(port, () => {
      console.log(`listening on port:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
})();
