import { SessionId, UserId } from "teletalk-type-store";

import { serviceBuilder } from "~/classes/service/ServiceBuilder";
import { serviceMiddlewares } from "~/services/middlewares";
import { HydratedUser } from "~/types/model";

export const addBlock = serviceBuilder
	.create<
		{
			currentSessionId: SessionId;
			targetUserId: UserId;
		},
		void,
		{
			currentUser: HydratedUser;
			targetUser: HydratedUser;
		}
	>()
	.setBeforeRunMiddlewares(
		serviceMiddlewares.findCurrentUser,
		serviceMiddlewares.throwIfSelfDataRequested,
		serviceMiddlewares.findTargetUser,
		serviceMiddlewares.throwIfBlacklistItemExist
	)
	.setBody(async (data) => {
		data.currentUser.blacklist.push({
			userId: data.targetUserId,
		});
		await data.currentUser.save();
	})
	.build();
