import { FilterQuery } from "mongoose";

import { models } from "~/models";
import { PrivateChatService } from "~/types";
import { PrivateChats } from "~/types/datatypes";
import { IPrivateChatDoc } from "~/types/model";

export const findMany: PrivateChatService<
	FilterQuery<IPrivateChatDoc>,
	PrivateChats
> = (data, options, projection) => {
	return models.database.PrivateChat.find(data, projection, options);
};
