import { FilterQuery } from "mongoose";

import { models } from "~/models";
import { PrivateChatService } from "~/types";
import { HydratedPrivateChat, IPrivateChatDoc } from "~/types/model";

export const find: PrivateChatService<
	FilterQuery<IPrivateChatDoc>,
	HydratedPrivateChat | null
> = (data, options, projection) => {
	return models.database.PrivateChat.findOne(data, projection, options);
};
