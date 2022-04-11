const { userRoutes } = require("~/templates/routerTemplates/userRoutes");
const { cellphoneRoutes } = require("~/variables/routes/cellphoneRoutes");
const { otherRoutes } = require("~/templates/routerTemplates/otherRoutes");
const { privateChatRoutes } = require("~/variables/routes/privateChatRoutes");

const templates = [userRoutes, cellphoneRoutes, otherRoutes, privateChatRoutes];

const requestMethodCheckerMiddleware = async (req, res, next) => {
  try {
    const targetTemplate = templates.find(
      (template) => template.baseUrl === req.baseUrl
    );

    if (!targetTemplate) {
      //TODO ...
      // throw undefined;
    }

    if (targetTemplate) {
      const { baseUrl, info, ...urls } = targetTemplate;

      const routesArray = Object.entries(urls).map((url) => ({ ...url }));
    }
  } catch (error) {
    logger.log("requestMethodCheckerMiddleware", error);
    res.errorCollector({ data: { error } });
    res.errorResponser();
  } finally {
    next();
  }
};

module.exports = { requestMethodCheckerMiddleware };
