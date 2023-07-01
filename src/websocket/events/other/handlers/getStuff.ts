import { models } from "~/models";
import { GetStuffIO, SocketOnHandler } from "~/types";
import { errors } from "~/variables";
import { events } from "~/websocket/events";

export const getStuff: SocketOnHandler<GetStuffIO> = (_socket) => {
  const stuff = {
    errors,
    models: models.native,
    events,
    validationModels: models.validation,
  } as GetStuffIO["output"];

  return {
    data: stuff,
  };
};
