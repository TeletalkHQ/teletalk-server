const { nativeModels } = require("@/models/native/native");
const { database } = require("@/models/database/database");
const { validation } = require("@/models/validation/validation");

const models = {
  database,
  native: nativeModels,
  validation,
};

module.exports = { models };
