const userRouteTemplate = {
	baseRoute: {
		route: "/user",
		version: "1.0.0",
	},

	signInNormal: {
		description: "Use for sign in client as a normal account",
		route: "/signIn/normal",
		version: "1.0.0",
	},
	statusCheck: {
		description: "Use for check client availability as a normal account",
		route: "/status/check",
		version: "1.0.0",
	},
	verifyLoginNormal: {
		description: "Use for verify login (normal account) and register (both mode)",
		route: "/verify/login/normal",
		version: "1.0.0",
	},
	verifySignInNormal: {
		description: "Use for verify sign in (normal account) as normal account",
		route: "/verify/signIn/normal",
		version: "1.0.0",
	},

	error: {
		description: "Use for get all auth errors",
		route: "/error",
		version: "1.0.0",
	},
	template: {
		description: "Use for get all user properties and value structure",
		route: "/template",
		version: "1.0.0",
	},
	version: "1.0.0",
};

module.exports = { userRouteTemplate };
