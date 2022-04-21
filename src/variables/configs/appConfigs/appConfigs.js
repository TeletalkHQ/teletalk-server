const jwtOptions = { algorithm: "HS256" };

const { getAllEnvironments } = require("~/functions/utilities/utilsNoDeps");

const {
  ENVIRONMENT_VALUES,
} = require("~/variables/constants/environmentInitialValues");

const { NODE_ENV, MONGO_URI_ATLAS, MONGO_URI_LOCAL } = getAllEnvironments();

const MONGO_URI =
  NODE_ENV === ENVIRONMENT_VALUES.NODE_ENV.production
    ? MONGO_URI_ATLAS
    : MONGO_URI_LOCAL;

module.exports = { jwtOptions, MONGO_URI };
