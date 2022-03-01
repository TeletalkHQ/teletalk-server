const { routeTemplateGenerator } = require("~/functions/utilities/generators");

const baseUrl = routeTemplateGenerator(true, "/user", "1.0.0");

const countries = routeTemplateGenerator(
	"get",
	"/countries/normal",
	"1.0.0",
	"Use for get countries for normal account",
);

const createNewUser = routeTemplateGenerator(
	"post",
	"/createNewUser/normal",
	"1.0.0",
	"Use for create new user for normal account",
);

const logoutNormal = routeTemplateGenerator(
	"post",
	"/logout/normal",
	"1.0.0",
	"Use for logout client as a normal account",
);
const signInNormal = routeTemplateGenerator(
	"post",
	"/signIn/normal",
	"1.0.0",
	"Use for sign in client as a normal account",
);

const statusCheck = routeTemplateGenerator(
	"get",
	"/status/check",
	"1.0.0",
	"Use for check client availability as a normal account",
);

const verifySignInNormal = routeTemplateGenerator(
	"post",
	"/verify/signIn/normal",
	"1.0.0",
	"Use for verify sign in (normal account) as normal account",
);

const error = routeTemplateGenerator("get", "/error", "1.0.0", "Use for get all auth errors");

const template = routeTemplateGenerator(
	"get",
	"/template",
	"1.0.0",
	"Use for get all user properties and value structure",
);

const userRouterTemplate = {
	baseUrl,
	countries,
	createNewUser,
	error,
	logoutNormal,
	signInNormal,
	statusCheck,
	template,
	verifySignInNormal,
	version: "1.0.0",
};

module.exports = {
	userRouterTemplate,
};
