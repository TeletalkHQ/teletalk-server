const { database } = require("@/models/database");
const { nativeModels } = require("@/models/native");
const { validationModels } = require("@/models/validation");

const models = {
  database,
  native: nativeModels,
  validation: validationModels,
};

module.exports = { models };
