import { FilterQuery } from "mongoose";

import { models } from "~/models";
import { UserService } from "~/types";
import { HydratedUser, IUserDoc } from "~/types/models";

export const findOneUser: UserService<
	FilterQuery<IUserDoc>,
	HydratedUser | null
> = (data, projection, options) => {
	return models.database.User.findOne(data, projection, options);
};
