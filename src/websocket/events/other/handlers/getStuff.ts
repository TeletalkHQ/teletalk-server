import { models } from "@/models";

import { SocketOnHandler } from "@/types";

import { errors } from "@/variables";

import { routes } from "@/websocket/events";

const getStuff: SocketOnHandler = (_socket) => {
  //TODO: Separate io errors
  const stuff = {
    appErrors: errors,
    models: models.native,
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
