import { DBUserData } from "teletalk-type-store";

import { models } from "~/models";
import { UserService } from "~/types";

export const create: UserService<
	{
		userData: DBUserData;
	},
	void
> = async (data) => {
	await models.database.User.create(data.userData);
};
