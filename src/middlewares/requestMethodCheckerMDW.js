const {
  userRouterTemplate,
} = require("~/templates/routerTemplates/userRouterTemplate");
const {
  cellphoneRouterTemplate,
} = require("~/templates/routerTemplates/cellphoneRouterTemplate");
const {
  otherRouterTemplate,
} = require("~/templates/routerTemplates/otherRouterTemplate");
const {
  privateChatRouterTemplate,
} = require("~/templates/routerTemplates/privateChatRouterTemplate");

const templates = [
  userRouterTemplate,
  cellphoneRouterTemplate,
  otherRouterTemplate,
  privateChatRouterTemplate,
];

const requestMethodCheckerMDW = async (req, res, next) => {
  try {
    console.log(req);

    const targetTemplate = templates.find(
      (template) => template.baseUrl === req.baseUrl
    );

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
