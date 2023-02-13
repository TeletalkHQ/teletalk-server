const { customOn } = require("@/websocket/custom/methods/on");
const { customUse } = require("@/websocket/custom/methods/use");

const customMethods = {
  on: customOn,
  use: customUse,
};

module.exports = { customMethods };
