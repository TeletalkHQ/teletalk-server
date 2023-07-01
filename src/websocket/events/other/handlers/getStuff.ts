import { models } from "~/models";
import { validationModels } from "~/models/validation";
import { GetStuffIO, SocketOnHandler } from "~/types";
import { errors } from "~/variables";
import { events } from "~/websocket/events";

export const getStuff: SocketOnHandler<GetStuffIO> = (_socket) => {
  const stuff = {
    errors: Object.values(errors),
    models: Object.values(models.native),
    events: Object.values(events),
    validationModels,
  } as GetStuffIO["output"];

  return {
    data: stuff,
  };
};
