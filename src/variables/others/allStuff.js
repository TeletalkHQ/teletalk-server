const { models } = require("@/models");

const { routes } = require("@/http/routes");

const { userErrors } = require("@/variables/errors/user");

const validationModels = {
  ...models.validation.chat,
  ...models.validation.user,
};

const allStuff = {
  errors: userErrors,
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
};
