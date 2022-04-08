const mysql = require("mysql");
const express = require("express");
require("dotenv").config();

const locations = require("./location_restful_api/routes/locations.js");
const database = require("./location_restful_api/database/database.js");

const app = express();
const port = process.env.PORT || 8080;
const db = [{ name: "tiina" }, { name: "jack" }];

let config = {
  host: "mydb.tamk.fi",
  user: process.env.db_user,
  password: process.env.password,
  database: process.env.database,
};

app.use((req, res, next) => {
  console.log("Time:", Date.now());
  next();
});
app.use(express.json());
app.use("/locations", locations);

var connection = mysql.createConnection(config);

connection.connect((err) => {
  if (err) console.log(err);
  else console.log("Database connection created.");
});

app.get("/", (req, res) => {
  connection.query("SELECT * from locations", (error, results) => {
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
