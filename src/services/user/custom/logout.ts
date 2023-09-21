import { ClientId, UserId } from "teletalk-type-store";

import { serviceBuilder } from "~/classes/service/ServiceBuilder";
import { serviceMiddlewares } from "~/services/middlewares";
import { HydratedUser } from "~/types/model";

export const logout = serviceBuilder
	.create<
		{ currentUserId: UserId; clientId: ClientId },
		void,
		{
			currentUser: HydratedUser;
		}
	>()
	.setBeforeRunMiddlewares(serviceMiddlewares.findCurrentUser)
	.setBody(async (data) => {
		data.currentUser.clients = data.currentUser.clients.filter(
			(i) => i.clientId !== data.clientId
		);
		await data.currentUser.save();
	})
	.build();
