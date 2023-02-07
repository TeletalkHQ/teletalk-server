const { routeBuilder } = require("@/classes/RouteBuilder");

const root = routeBuilder("/").create().url("").build();

const serverRoutes = { root };

module.exports = { serverRoutes };
