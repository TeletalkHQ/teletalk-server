const otherRouteTemplate = {
	baseRoute: {
		route: "/other",
		version: "1.0.0",
	},

	welcome: {
		description: "Use to get welcome message for client",
		route: "/welcome",
		version: "1.0.0",
	},

	error: {
		description: "Use for get all errors messages",
		route: "/error",
		version: "1.0.0",
	},

	version: "1.0.0",
};

module.exports = { otherRouteTemplate };
