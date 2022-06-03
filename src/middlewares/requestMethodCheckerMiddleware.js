const { userRoutes } = require("@/templates/routerTemplates/userRoutes");
const { cellphoneRoutes } = require("@/variables/routes/cellphoneRoutes");
const { otherRoutes } = require("@/templates/routerTemplates/otherRoutes");
const { privateChatRoutes } = require("@/variables/routes/privateChatRoutes");

const templates = [userRoutes, cellphoneRoutes, otherRoutes, privateChatRoutes];

//FIXME

const requestMethodCheckerMiddleware = async (req, res, next) => {
  try {
    const targetTemplate = templates.find(
      (template) => template.baseUrl === req.baseUrl
    );

    if (!targetTemplate) {
      //TODO if (!targetTemplate)
      // throw undefined;
    }

    if (targetTemplate) {
      const { baseUrl, info, ...urls } = targetTemplate;

      const routesArray = Object.entries(urls).map((url) => ({ ...url }));
    }
    return { done: true };
  } catch (error) {
    logger.log("requestMethodCheckerMiddleware catch, error:", error);
    res.errorCollector(error);
    res.errorResponser();
    return { done: false };
  }
};

module.exports = { requestMethodCheckerMiddleware };
