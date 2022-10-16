const { cellphone } = require("@/routes/cellphone");
const { other } = require("@/routes/other");
const { privateChat } = require("@/routes/privateChat");
const { test } = require("@/routes/test");
const { user } = require("@/routes/user");
const { versionControl } = require("@/routes/versionControl");

const routes = {
  cellphone,
  other,
  privateChat,
  test,
  user,
  versionControl,
};

module.exports = { routes };
