const Validator = require("jsonschema").Validator;
const validator = new Validator();

const validate = (value, schema) => validator.validate(value, schema);

module.exports = validate;
