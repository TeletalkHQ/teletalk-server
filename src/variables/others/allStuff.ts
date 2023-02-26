import { models } from "@/models";

import { userErrors } from "@/variables/errors/user";

// import { routes as websocketRoutes } from "@/websocket/events";

// const filteredWebsocketRoutes = Object.entries(websocketRoutes).reduce(
//   (prevValue, [key, value]) => {
//     const { handler, method, statusCode, ...rest } = value;
//     if (rest.name) {
//       prevValue[key] = rest;
//     }
//     return prevValue;
//   },
//   {}
// );

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
  // routes: {
  //   ...httpRoutes.user,
  //   ...httpRoutes.other,
  //   ...httpRoutes.auth,
  //   ...httpRoutes.stuff,
  // },
  validationModels,
  // events: filteredWebsocketRoutes,
};

export { allStuff };
