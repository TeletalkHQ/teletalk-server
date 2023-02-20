const { verify } = require("@/http/controllers/auth/verify");

const { getCountries } = require("@/http/controllers/other/getCountries");
const {
  getWelcomeMessage,
} = require("@/http/controllers/other/getWelcomeMessage");

const { getAllStuff } = require("@/http/controllers/stuff/getAllStuff");

const controllers = {
  getAllStuff,
  getCountries,
  getWelcomeMessage,
  verify,
};

module.exports = { controllers };
