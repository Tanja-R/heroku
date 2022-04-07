const mysql = require("mysql");
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const db = [{ name: "tiina" }, { name: "jack" }];

let config = {
  host: "mydb.tamk.fi",
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
};

var connection = mysql.createConnection(config);
app.get("/", (req, res) => {
  connection.query("SELECT * from location", (error, results) => {
    if (error) {
      console.log(error);
    } else {
      res.send(results);
    }
  });
});

app.get("/names", (req, res) => {
  res.send(db);
});

const server = app.listen(port, () => {
  console.log(`Listening on port ${server.address().port}`);
});
