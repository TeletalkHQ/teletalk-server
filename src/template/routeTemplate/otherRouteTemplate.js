const baseRoute = {
	route: "/other",
	version: "1.0.0",
};

const welcome = {
	description: "Use to get welcome message for client",
	route: "/welcome",
	version: "1.0.0",
};

const error = {
	description: "Use for get all errors messages",
	route: "/error",
	version: "1.0.0",
};

const otherRouteTemplate = {
	version: "1.0.0",

	baseRoute,
	welcome,
	error,
};

module.exports = {
	otherRouteTemplate,

	baseRoute,
	welcome,
	error,
};
