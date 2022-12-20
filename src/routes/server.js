const { routeBuilder } = require("@/classes/RouteBuilder");

const root = routeBuilder("/").create().url("").build();

const server = { root };

module.exports = { server };
