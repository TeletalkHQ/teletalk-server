const { models } = require("@/models");
const { chat: chatValidationModels } = require("@/models/validation/chat");
const { user: userValidationModels } = require("@/models/validation/user");

const { routes } = require("@/routes");

const { userErrors } = require("@/variables/errors/user");

const validationModels = {
  ...chatValidationModels,
  ...userValidationModels,
};

const errors = {
  ...userErrors,
};

const allStuff = {
  errors,
  models: {
    ...models.native.chat,
    ...models.native.common,
    ...models.native.user,
  },
  routes: {
    ...routes.cellphone,
    ...routes.other,
    ...routes.privateChat,
    ...routes.test,
    ...routes.user,
    ...routes.versionControl,
  },
  validationModels,
};

module.exports = {
  allStuff,
  errors,
  models,
  routes,
};
