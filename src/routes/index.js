const { cellphone } = require("@/routes/cellphone");
const { other } = require("@/routes/other");
const { privateChat } = require("@/routes/privateChat");
const { user } = require("@/routes/user");
const { stuff } = require("@/routes/stuff");

const routes = {
  cellphone,
  other,
  privateChat,
  stuff,
  user,
};

module.exports = { routes };
