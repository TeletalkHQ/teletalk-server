const {
  modelPropertyGenerator,
  modelGenerator,
} = require("~/functions/utilities/generators");

const {
  userErrorTemplate: {
    CREATED_AT_INVALID_TYPE: { properties: CREATED_AT_INVALID_TYPE },
  },
} = require("~/variables/errors/userErrorTemplate");

const createdAt = modelGenerator(
  null,
  null,
  modelPropertyGenerator(true),
  null,
  modelPropertyGenerator("date", CREATED_AT_INVALID_TYPE),
  null,
  modelPropertyGenerator(Date.now),
  "1.0.0"
);

const commonModel = {
  version: "1.0.0",

  createdAt,
};

module.exports = {
  commonModel,
};
