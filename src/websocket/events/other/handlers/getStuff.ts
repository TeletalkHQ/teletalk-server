import { models } from "@/models";

import { SocketOnHandler } from "@/types";

import { ERRORS } from "@/variables";

import { routes } from "@/websocket/events";

const getStuff: SocketOnHandler = (_socket) => {
  //TODO: Separate io errors
  const stuff = {
    appErrors: ERRORS,
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
