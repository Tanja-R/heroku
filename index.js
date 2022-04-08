const express = require("express");
const cors = require("cors");

const locations = require("./location_restful_api/routes/locations.js");
const database = require("./location_restful_api/database/database.js");

const app = express();
const port = process.env.PORT || 8080;
const db = [{ name: "tiina" }, { name: "jack" }];

app.use(cors());
app.use(express.static("frontend/build"));
app.use(express.static("public"));
app.use(express.json());
app.use("/locations", locations);

app.get("/", async (req, res) => {
  try {
    let results = await database.findAll();
    res.send(results);
  } catch (err) {
    console.log(err);
  }
});

app.get("/names", (req, res) => {
  res.send(db);
});

const server = app.listen(port, () => {
  console.log(`Listening on port ${server.address().port}`);
});
