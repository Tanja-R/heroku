require("dotenv").config();
const mysql = require("mysql");
const validate = require("../validation/validator.js");
const locationSchema = require("../validation/location-schema.js");

const config = require("./connection-config.js");

const connection = mysql.createConnection(config);

let connectionFunctions = {
  connect: () => {
    function f(resolve, reject) {
      connection.connect((err) => {
        if (err) reject(err);
        else resolve("Database connection created.");
      });
    }
    return new Promise(f);
  },
  close: () => {
    function f(resolve, reject) {
      connection.end((err) => {
        if (err) reject(err);
        else resolve("Database connection closed.");
      });
    }
    return new Promise(f);
  },
  save: (location) => {
    function f(resolve, reject) {
      //validate -> reject, if validation error(s) occur(s).
      const validation = validate(location, locationSchema);
      if (validation.errors.length > 0) {
        let msgArr = validation.errors.map(
          (error) =>
            `Validation Error on location: ${error.path} ${error.message}.`
        );
        let errorMessage = {
          message: "The location is not valid.",
          "error(s)": msgArr.join("\n"),
        };
        reject(errorMessage);
      } else {
        //try inserting after successful validation.
        let sql = `insert into locations (latitude, longitude) values (?, ?)`;
        connection.query(
          sql,
          [location.latitude, location.longitude],
          (err, result) => {
            //reject if error happened.
            if (err) reject(err);
            else resolve(result.insertId);
            //resolve if saving was successful.
          }
        );
      }
    }
    return new Promise(f);
  },
  findAll: () => {
    function f(resolve, reject) {
      connection.query("select * from locations", (err, locations) => {
        if (err) reject(err);
        else resolve(locations);
      });
    }
    return new Promise(f);
  },
  deleteById: (id) => {
    function f(resolve, reject) {
      let sql = "delete from locations where id = ?";
      connection.query(sql, id, (err, result) => {
        if (err) reject(err);
        else resolve(result.affectedRows);
      });
    }
    return new Promise(f);
  },
  findById: (id) => {
    function f(resolve, reject) {
      let sql = "select * from locations where id = ?";
      connection.query(sql, id, (err, locations) => {
        if (err) reject(err); //reject if an error happens.
        else if (locations.length === 0) resolve(null); //empty result
        else resolve(locations[0]); //location found
      });
    }
    return new Promise(f);
  },
};

module.exports = connectionFunctions;
