const uniqueValidator = require("mongoose-unique-validator");

uniqueValidator.defaults.message = "{PATH}_exist";
uniqueValidator.defaults.type = "mongoose-unique-validator";

const mongooseUniqueValidator = uniqueValidator;

module.exports = { mongooseUniqueValidator };
