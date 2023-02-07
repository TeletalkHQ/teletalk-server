const { httpRouteBuilder } = require("@/classes/RouteBuilder");

const root = httpRouteBuilder("/").create().url("").build();

const serverRoutes = { root };

module.exports = { serverRoutes };
