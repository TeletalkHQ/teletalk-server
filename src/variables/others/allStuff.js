const { models } = require("@/models");

const { routes } = require("@/routes");

const { userErrors } = require("@/variables/errors/user");

const validationModels = {
  ...models.validation.chat,
  ...models.validation.user,
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
    ...routes.user,
    ...routes.other,
    ...routes.privateChat,
    ...routes.auth,
    ...routes.stuff,
  },
  validationModels,
};

module.exports = {
  allStuff,
  errors,
  models,
  routes,
};
