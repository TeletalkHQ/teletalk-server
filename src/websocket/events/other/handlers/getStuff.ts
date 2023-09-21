import { GetStuffIO } from "teletalk-type-store";

import { errorStore } from "~/classes/ErrorStore";
import { models } from "~/models";
import { SocketOnHandler } from "~/types";
import { events } from "~/websocket/events";

export const getStuff: SocketOnHandler<GetStuffIO> = (_socket) => {
	const stuff = {
		errors: errorStore.getAll(),
		models: models.native,
		events,
		validationModels: models.validation,
	} as GetStuffIO["output"];

	return {
		data: stuff,
	};
};
