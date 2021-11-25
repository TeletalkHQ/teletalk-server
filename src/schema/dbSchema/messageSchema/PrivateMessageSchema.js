const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

uniqueValidator.defaults.message = "{PATH}_exist";
// uniqueValidator.defaults.type = "mongoose-unique-validator";

const PrivateMessageSchema = new mongoose.Model({});

PrivateMessageSchema.plugin(uniqueValidator);

module.exports = { PrivateMessageSchema };
