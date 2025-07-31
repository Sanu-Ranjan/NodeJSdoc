const express = require("express");

const fs = require("fs");
const path = require("path");

//create a writable stream
const logStream = fs.createWriteStream(path.join(__dirname, "server.log"), {
  flags: "a",
});

const app = express();

const port = 3000;

app.use((req, res, next) => {
  const timeStamp = new Date();
  const logLine = ` ${timeStamp.toLocaleString("en-IN")} request line: ${
    req.method
  } ${req.originalUrl} ${req.httpVersion}\n`;

  console.log(logLine);
  logStream.write(logLine);
  next();
});

app.get("/", (req, res) => {
  console.log(req.headers);
  res.send("Hello world");
});

app.listen(port, () => {
  console.log(`Example app listening on port: ${port}`);
});
