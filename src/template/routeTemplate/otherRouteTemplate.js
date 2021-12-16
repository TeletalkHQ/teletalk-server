const otherRouteTemplate = {
	baseRoute: "/other",

	welcome: {
		description: "Use to get welcome message for client",
		route: "/welcome",
	},

	error: {
		route: "/error",
		description: "Use for get all errors messages",
	},
};

module.exports = { otherRouteTemplate };
