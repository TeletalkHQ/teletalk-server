import { FilterQuery } from "mongoose";

import { models } from "~/models";
import { UserService } from "~/types";
import { HydratedUser, IUserDoc } from "~/types/model";

export const find: UserService<FilterQuery<IUserDoc>, HydratedUser | null> = (
	data,
	options,
	projection
) => {
	return models.database.User.findOne(data, projection, options);
};
