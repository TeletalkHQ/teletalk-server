//* Using in routers, controllers and client-side

const routeUserTemplate = {
	baseRoute: "/user",

	signInNormal: {
		route: "/signIn/normal",
		description: "Use for sign in client as a normal account",
	},
	verifyLoginNormal: {
		route: "/verify/login/normal",
		description:
			"Use for verify login (normal account) and register (both mode)",
	},
	verifySignInNormal: {
		route: "/verify/signIn/normal",
		description: "Use for verify sign in (normal account) as normal account",
	},

	error: {
		route: "/error",
		description: "Use for get all auth errors",
	},
	template: {
		route: "/template",
		description: "Use for get all user properties and value structure",
	},
};

module.exports = { routeUserTemplate };
