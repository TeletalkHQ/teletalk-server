import { FilterQuery } from "mongoose";

import { models } from "~/models";
import { PrivateChatService } from "~/types";
import { HydratedPrivateChat, IPrivateChatDoc } from "~/types/model";

export const findPrivateChats: PrivateChatService<
	FilterQuery<IPrivateChatDoc>,
	HydratedPrivateChat[] | null
> = (data, projection, options) => {
	return models.database.PrivateChat.find(data, projection, options);
};
