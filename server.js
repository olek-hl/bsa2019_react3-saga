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

app.get("/message/:id", function(req, res, next) {
  let id = req.params.id;
  let message;
  fs.readFile("./db/messageslist.json", "utf8", function(error, data) {
    if (error) throw error;
    messages = JSON.parse(data);
    let message = messages.filter(message => {
      if (message.created_at.toString().replace(/[^0-9]/g, "") == id) {
        return message;
      }
    });
    res.send(message[0]);
  });
});

app.delete("/message/:id", function(req, res, next) {
  let idToDelete = req.params.id;
  fs.readFile("./db/messageslist.json", "utf8", function(error, data) {
    if (error) throw error;
    let messages = JSON.parse(data);
    let updatedMessages = messages.filter(
      message =>
        message.created_at.toString().replace(/[^0-9]/g, "") !== idToDelete
    );

    fs.writeFile(
      "./db/messageslist.json",
      JSON.stringify(updatedMessages),
      "utf-8",
      function(err) {
        if (err) throw err;
        console.log("Дані оновлено");
      }
    );
    res.send(updatedMessages);
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

app.put("/message/:id", function(req, res, next) {
  let newData = req.body;
  let id = req.params.id;
  fs.readFile("./db/messageslist.json", "utf8", function(error, data) {
    if (error) throw error;
    messages = JSON.parse(data);
    let updatedMessages = messages.map(message => {
      if (message.created_at.toString().replace(/[^0-9]/g, "") == id) {
        message.message = req.body.text;
      }
      return message;
    });
    fs.writeFile(
      "./db/messageslist.json",
      JSON.stringify(updatedMessages),
      "utf-8",
      function(err) {
        if (err) throw err;
        console.log("Дані оновлено");
      }
    );
    res.send(updatedMessages);
  });
});

app.get("/users", function(req, res, next) {
  fs.readFile("./db/users.json", "utf8", function(error, data) {
    if (error) throw error;
    res.send(JSON.parse(data));
  });
});

app.delete("/user/:id", function(req, res, next) {
  let idToDelete = req.params.id;
  fs.readFile("./db/users.json", "utf8", function(error, data) {
    if (error) throw error;
    let users = JSON.parse(data);
    let updatedUsers = users.filter(user => user.id !== idToDelete);

    fs.writeFile(
      "./db/users.json",
      JSON.stringify(updatedUsers),
      "utf-8",
      function(err) {
        if (err) throw err;
        console.log("Дані оновлено");
      }
    );
    res.send(updatedUsers);
  });
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT || 8080);
