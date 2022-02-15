//* Using in routers, controllers and client-side

const routeUserTemplate = {
	baseRoute: "/user",

	existenceChecker: {
		route: "/existence/checker",
		description: "Use for Check user if it's exist on database",
	},
	loginNormal: {
		route: "/login/normal",
		description: "Use for login user as normal account",
	},
	loginAnonymous: {
		route: "/login/anonymous",
		description: "Use for login user as normal account",
	},
	logoutNormal: {
		route: "/logout/normal",
		description: "Use for logout user from normal account",
	},
	logoutAnonymous: {
		route: "/logout/anonymous",
		description: "Use for burn user anonymous account (every footprint)",
	},
	registerNormal: {
		route: "/register/normal",
		description: "Use for register permanent account for normal user",
	},
	registerAnonymous: {
		route: "/register/anonymous",
		description: "Use for register temporary account for user and maybe a bot!",
	},
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
