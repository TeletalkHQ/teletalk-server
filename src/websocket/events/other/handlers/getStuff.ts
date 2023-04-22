import { models } from "@/models";

import { userErrors } from "@/variables/errors/user";

import { SocketOnHandler } from "@/types";

import { routes } from "@/websocket/events";
import { serverErrors } from "@/variables/errors/server";

const getStuff: SocketOnHandler = (_socket) => {
  const stuff = {
    appErrors: {
      ...userErrors,
      ...serverErrors,
    },
    models: {
      ...models.native,
      ...models.native,
      ...models.native,
    },
    routes,
    validationModels: models.validation,
  };

  return {
    data: {
      ...stuff,
    },
  };
};

export { getStuff };
