const express = require("express");
const locations = require("./routes/locations.js");
const database = require("./database/database.js");

const app = express();
const port = 8080;

app.use(express.json());
app.use("/locations", locations);

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
  database
    .connect()
    .then(() => console.log("Connection to the database succeeded."))
    .catch((err) => console.log(err));
});

process.on("SIGINT", () => {
  server.close(() => {
    console.log("Server is closed.");
    try {
      database.close();
      console.log("Connection to the database closed.");
    } catch (err) {
      console.log("Problem closing the database.");
    }
    process.exit(1);
  });
});
