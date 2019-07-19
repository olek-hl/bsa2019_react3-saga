const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const fs = require("fs");
const users = require("./db/users.json");
app.use(express.static(path.join(__dirname, "build")));
app.use(bodyParser.json());

app.get("/message", function(req, res, next) {
  fs.readFile("./db/messageslist.json", "utf8", function(error, data) {
    if (error) throw error;
    res.send(JSON.parse(data));
  });
});

app.post("/message", function(req, res, next) {
  let reqBody = req.body;
  let bodyMessage = req.body;
  fs.readFile("./db/messageslist.json", "utf8", function(error, data) {
    if (error) throw error;
    let messages = JSON.parse(data);
    if (reqBody) {
      let { _id, ...newMessage } = bodyMessage;
      newMessage._id = (messages.length + 1).toString();
      messages.push(newMessage);
      fs.writeFile(
        "./db/messageslist.json",
        JSON.stringify(messages),
        "utf-8",
        function(err) {
          if (err) throw err;
        }
      );
      res.send("Повідомлення надіслано");
    } else {
      res.status(400).send(`Some error`);
    }
  });
});

app.get("/users", function(req, res, next) {
  fs.readFile("./db/users.json", "utf8", function(error, data) {
    if (error) throw error;
    res.send(JSON.parse(data));
  });
});

app.post("/login", function(req, res) {
  console.log(req.body.payload);
  const userFromReq = JSON.parse(req.body.payload);
  const userInDB = users.find(user => user.login === userFromReq.login);
  console.log(userFromReq.login);
  if (userInDB && userInDB.password === userFromReq.password) {
    res.status(200).json({ auth: true, userInDB });
  } else {
    res.status(401).json({ auth: false });
  }
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT || 8080);
