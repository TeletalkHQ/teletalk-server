//* Using in routers, controllers and client-side

const userRouteTemplate = {
	baseRoute: "/user",

	signInNormal: {
		description: "Use for sign in client as a normal account",
		route: "/signIn/normal",
	},
	verifyLoginNormal: {
		description: "Use for verify login (normal account) and register (both mode)",
		route: "/verify/login/normal",
	},
	verifySignInNormal: {
		description: "Use for verify sign in (normal account) as normal account",
		route: "/verify/signIn/normal",
	},

	error: {
		description: "Use for get all auth errors",
		route: "/error",
	},
	template: {
		description: "Use for get all user properties and value structure",
		route: "/template",
	},
};

module.exports = { userRouteTemplate };
