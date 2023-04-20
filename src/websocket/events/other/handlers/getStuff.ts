import { models } from "@/models";

import { userErrors } from "@/variables/errors/user";

import { SocketOnHandler } from "@/types";

import { routes } from "@/websocket/events";
import { serverErrors } from "@/variables/errors/server";

const getStuff: SocketOnHandler = (_socket, data) => {
  const stuff = {
    appErrors: {
      ...userErrors,
      ...serverErrors,
    },
    models: {
      ...models.native.common,
      ...models.native.privateChat,
      ...models.native.user,
    },
    routes,
    validationModels: {
      ...models.validation.chat,
      ...models.validation.common,
      ...models.validation.user,
    },
  };

  return {
    data: {
      ...stuff,
    },
  };
};

export { getStuff };
