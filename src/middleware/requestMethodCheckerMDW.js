const { userRouteTemplate } = require("~/template/routeTemplate/userRouteTemplate");
const { cellphoneRouteTemplate } = require("~/template/routeTemplate/cellphoneRouteTemplate");
const { otherRouteTemplate } = require("~/template/routeTemplate/otherRouteTemplate");
const {
	privateChatRouteTemplate,
} = require("~/template/routeTemplate/privateChatRouteTemplate");

const templates = [
	userRouteTemplate,
	cellphoneRouteTemplate,
	otherRouteTemplate,
	privateChatRouteTemplate,
];

const requestMethodCheckerMDW = async (req, res, next) => {
	try {
		console.log(req);

		const targetTemplate = templates.find((template) => template.baseUrl === req.baseUrl);

		if (!targetTemplate) {
			//TODO ...
			// throw undefined;
		}
		if (targetTemplate) {
			const { baseUrl, info, ...routes } = targetTemplate;

			const routesArray = Object.entries(routes).map((route) => ({ ...route }));
			console.log(routesArray);
		}
	} catch (error) {
		console.log("requestMethodCheckerMDW", error);
		res.errorCollector({ data: { error } });
		res.errorResponser();
	} finally {
		next();
	}
};

module.exports = { requestMethodCheckerMDW };
