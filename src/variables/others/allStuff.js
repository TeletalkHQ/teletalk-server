const { models } = require("@/models");
const { chatValidationModels } = require("@/models/validation/chat");
const { userValidationModels } = require("@/models/validation/user");

const { routes } = require("@/routes");

const { appErrors } = require("@/variables/errors/errors");
const { chatErrors } = require("@/variables/errors/errors");
const { userErrors } = require("@/variables/errors/errors");

const validationModels = {
  ...chatValidationModels,
  ...userValidationModels,
};

const errors = {
  ...appErrors,
  ...chatErrors,
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
