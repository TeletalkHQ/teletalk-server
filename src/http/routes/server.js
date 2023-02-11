const { httpRouteBuilder } = require("@/classes/routeBuilder/HttpRouteBuilder");

const root = httpRouteBuilder("/").create().url("").build();

const serverRoutes = { root };

module.exports = { serverRoutes };
