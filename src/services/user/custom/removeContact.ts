import { SessionId, UserId } from "teletalk-type-store";

import { serviceBuilder } from "~/classes/service/ServiceBuilder";
import { serviceMiddlewares } from "~/services/middlewares";
import { HydratedUser } from "~/types/model";

export const removeContact = serviceBuilder
	.create<
		{
			currentSessionId: SessionId;
			targetUserId: UserId;
		},
		void,
		{
			currentUser: HydratedUser;
		}
	>()
	.setBeforeRunMiddlewares(
		serviceMiddlewares.findCurrentUser,
		serviceMiddlewares.throwIfSelfDataRequested,
		serviceMiddlewares.throwIfContactNotExist
	)
	.setBody(async (data) => {
		const index = data.currentUser.contacts.findIndex(
			(i) => i.userId === data.targetUserId
		);

		data.currentUser.contacts.splice(index, 1);
		await data.currentUser.save();
	})
	.build();
