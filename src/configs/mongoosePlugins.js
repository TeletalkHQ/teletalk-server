const mongooseUniqueValidator = require("mongoose-unique-validator");

mongooseUniqueValidator.defaults.message = "{PATH}_exist";
mongooseUniqueValidator.defaults.type = "mongoose-unique-validator";

module.exports = { uniqueValidator: mongooseUniqueValidator };
