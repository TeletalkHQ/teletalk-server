const { models } = require("@/models/models");
const { chatValidationModels } = require("@/models/validation/chat");
const { userValidationModels } = require("@/models/validation/user");

const { routes } = require("@/routes/routes");

const { appErrors } = require("@/variables/errors/appErrors");
const { chatErrors } = require("@/variables/errors/chatErrors");
const { userErrors } = require("@/variables/errors/userErrors");

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
