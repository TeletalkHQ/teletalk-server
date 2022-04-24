const jwtOptions = { algorithm: "HS256" };

const {
  getAllEnvironments,
  getEnvironment,
} = require("~/functions/utilities/utilsNoDeps");

const { NODE_ENV } = getAllEnvironments();

const MONGO_URL = getEnvironment(`MONGO_URL_${NODE_ENV.toUpperCase()}`);

module.exports = { jwtOptions, MONGO_URL };
