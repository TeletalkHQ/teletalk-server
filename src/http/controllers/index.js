const {
  getWelcomeMessage,
} = require("@/http/controllers/other/getWelcomeMessage");

const { getAllStuff } = require("@/http/controllers/stuff/getAllStuff");

const controllers = {
  getAllStuff,
  getWelcomeMessage,
};

module.exports = { controllers };
