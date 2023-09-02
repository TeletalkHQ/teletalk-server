import { UserData } from "utility-store/lib/types";

import { models } from "~/models";
import { UserService } from "~/types";

export const create: UserService<
	{
		userData: UserData;
	},
	void
> = async (data) => {
	await models.database.User.create(data.userData);
};
