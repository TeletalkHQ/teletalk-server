const baseRoute = {
	properties: { route: "/user" },
	info: {
		version: "1.0.0",
	},
};

const signInNormal = {
	properties: {
		description: "Use for sign in client as a normal account",
		route: "/signIn/normal",
	},
	info: {
		version: "1.0.0",
	},
};

const statusCheck = {
	properties: {
		description: "Use for check client availability as a normal account",
		route: "/status/check",
	},
	info: {
		version: "1.0.0",
	},
};

const verifyLoginNormal = {
	properties: {
		description: "Use for verify login (normal account) and register (both mode)",
		route: "/verify/login/normal",
	},
	info: {
		version: "1.0.0",
	},
};

const verifySignInNormal = {
	properties: {
		description: "Use for verify sign in (normal account) as normal account",
		route: "/verify/signIn/normal",
	},
	info: {
		version: "1.0.0",
	},
};

const error = {
	properties: { description: "Use for get all auth errors", route: "/error" },
	info: {
		version: "1.0.0",
	},
};

const template = {
	properties: {
		description: "Use for get all user properties and value structure",
		route: "/template",
	},
	info: {
		version: "1.0.0",
	},
};

const userRouteTemplate = {
	info: {
		version: "1.0.0",
	},

	baseRoute,
	signInNormal,
	statusCheck,
	verifyLoginNormal,
	verifySignInNormal,
	error,
	template,
};

module.exports = {
	userRouteTemplate,

	baseRoute,
	signInNormal,
	statusCheck,
	verifyLoginNormal,
	verifySignInNormal,
	error,
	template,
};
