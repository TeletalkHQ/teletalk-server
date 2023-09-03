import { UserId } from "utility-store/lib/types";

import { serviceBuilder } from "~/classes/service/ServiceBuilder";
import { serviceMiddlewares } from "~/services/middlewares";
import { HydratedUser } from "~/types/model";

export const removeBlock = serviceBuilder
	.create<
		{
			currentUserId: UserId;
			targetUserId: UserId;
		},
		void,
		{
			currentUser: HydratedUser;
		}
	>()
	.setMiddlewares([
		serviceMiddlewares.findCurrentUser,
		serviceMiddlewares.throwIfBlacklistItemNotExist,
	])
	.setBody(async (data) => {
		const index = data.currentUser.blacklist.findIndex(
			(i) => i.userId === data.targetUserId
		);

		data.currentUser.blacklist.splice(index, 1);
		await data.currentUser.save();
	})
	.build();
