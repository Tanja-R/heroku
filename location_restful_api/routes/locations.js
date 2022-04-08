const express = require("express");
const database = require("../database/database.js");
const locationSchema = require("../validation/location-schema.js");
const validate = require("../validation/validator.js");

var router = express.Router();

router.get("/", async (req, res) => {
  try {
    let results = await database.findAll();
    res.send(results);
  } catch (err) {
    res.status(500).end();
  }
});

router.get("/:id([0-9]+)", async (req, res) => {
  try {
    let found = await database.findById(req.params.id);
    if (!found) {
      res
        .status(404)
        .send({ error: `No location found with id ${req.params.id}` });
    } else {
      res.send(found);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/", async (req, res) => {
  let location = { ...req.body };
  let validation = validate(location, locationSchema);
  if (validation.errors.length != 0) {
    let errors = validation.errors.map((error) => error.stack);
    let errorMessage = {
      message: "The location was not valid. Validation failed.",
      "error(s)": errors,
    };
    res.status(400).send(errorMessage);
  } else {
    try {
      let id = await database.save(location);
      location.id = id;
      res.status(201).send(location);
    } catch (err) {
      res.status(500).end();
    }
  }
});

router.delete("/:id([0-9]+)", async (req, res) => {
  try {
    let deletedRows = await database.deleteById(req.params.id);
    if (deletedRows === 0) {
      res
        .status(404)
        .send({ error: `No location found with id ${req.params.id}` });
    } else {
      res.status(204).end();
    }
  } catch (err) {
    res.status(500).end();
  }
});

module.exports = router;
