const {
	cellphoneRouterTemplate,
} = require("~/templates/routerTemplates/cellphoneRouterTemplate");
const { otherRouterTemplate } = require("~/templates/routerTemplates/otherRouterTemplate");
const {
	privateChatRouterTemplate,
} = require("~/templates/routerTemplates/privateChatRouterTemplate");
const {
	versionControlRouterTemplate,
} = require("~/templates/routerTemplates/versionControlRouterTemplate");
const { userRouterTemplate } = require("../userControllers/indexUserController");

const getAllStuffVersionControlController = async (
	req = expressRequest,
	res = expressResponse,
) => {
	try {
	} catch (error) {
		console.log("getAllStuffVersionControlController", error);
		res.errorCollector({ data: { error } });
		res.errorResponser();
	}
};

module.exports = { getAllStuffVersionControlController };
