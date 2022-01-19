const baseUrl = {
	properties: { description: "", route: "/other" },
	info: {
		version: "1.0.0",
	},
};

const welcome = {
	properties: {
		description: "Use to get welcome message for client",
		method: "get",
		route: "/welcome",
	},
	info: {
		version: "1.0.0",
	},
};

const error = {
	properties: {
		description: "Use for get all errors messages",
		method: "get",
		route: "/error",
	},
	info: {
		version: "1.0.0",
	},
};

const otherRouteTemplate = {
	info: {
		version: "1.0.0",
	},

	baseUrl,
	welcome,
	error,
};

module.exports = {
	otherRouteTemplate,

	baseUrl,
	welcome,
	error,
};
