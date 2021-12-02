const { Router } = require("express");

const { authDefaultMDW } = require("~/middleware/authDefaultMDW");
const { errorResponser } = require("~/middleware/errorResponser");

const {
	privateChatRouteTemplate,
} = require("~/template/routeTemplate/privateChatRouteTemplate");

const privateChatRoute = Router();

privateChatRoute.use(authDefaultMDW);

privateChatRoute.use(errorResponser);

const { sendMessage } = privateChatRouteTemplate;

privateChatRoute.post(sendMessage.route);

module.exports = { privateChatRoute };
