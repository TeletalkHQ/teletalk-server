const { otherHandlers } = require("@/websocket/events/other/handlers");
const { otherRouter } = require("@/websocket/events/other/router");
const { otherRoutes } = require("@/websocket/events/other/routes");

const otherEvents = { otherRouter, otherRoutes, otherHandlers };

module.exports = { otherEvents };
