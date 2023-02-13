const { models } = require("@/models");

const { routes: httpRoutes } = require("@/http/routes");

const { userErrors } = require("@/variables/errors/user");

const { routes: websocketRoutes } = require("@/websocket/events");

const filteredWebsocketRoutes = Object.entries(websocketRoutes).reduce(
  (prevValue, [key, value]) => {
    const { handler, method, statusCode, ...rest } = value;
    prevValue[key] = rest;
    return prevValue;
  },
  {}
);

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
    ...httpRoutes.user,
    ...httpRoutes.other,
    ...httpRoutes.auth,
    ...httpRoutes.stuff,
  },
  validationModels,
  events: filteredWebsocketRoutes,
};

module.exports = {
  allStuff,
};
