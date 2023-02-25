const { customOn } = require("@/websocket/custom/methods/on");
const { customEmit } = require("@/websocket/custom/methods/emit");
const { customUse } = require("@/websocket/custom/methods/use");

const customMethods = {
  emit: customEmit,
  on: customOn,
  use: customUse,
};

module.exports = { customMethods };
