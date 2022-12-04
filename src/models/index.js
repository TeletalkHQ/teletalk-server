const { database } = require("@/models/database");
const { nativeModels } = require("@/models/native");
const { validation } = require("@/models/validation");

const models = {
  database,
  native: nativeModels,
  validation,
};

module.exports = { models };
