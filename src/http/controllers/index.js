const { getCountries } = require("@/http/controllers/other/getCountries");
const {
  getWelcomeMessage,
} = require("@/http/controllers/other/getWelcomeMessage");

const { getAllStuff } = require("@/http/controllers/stuff/getAllStuff");

const controllers = {
  getAllStuff,
  getCountries,
  getWelcomeMessage,
};

module.exports = { controllers };
