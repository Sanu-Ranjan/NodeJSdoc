const express = require("express");

const app = express();

const port = 3000;

app.use((req, res, next) => {
  console.log(
    `request line ${req.method} ${req.originalUrl} ${req.httpVersion}`
  );
  next();
});

app.get("/", (req, res) => {
  console.log(req.headers);
  res.send("Hello world");
});

app.listen(port, () => {
  console.log(`Example app listening on port: ${port}`);
});
