import { ClientId, UserId } from "teletalk-type-store";

import { serviceBuilder } from "~/classes/service/ServiceBuilder";
import { serviceMiddlewares } from "~/services/middlewares";
import { HydratedUser } from "~/types/model";

export const addClient = serviceBuilder
	.create<
		{
			clientId: ClientId;
			currentUserId: UserId;
		},
		void,
		{
			currentUser: HydratedUser;
		}
	>()
	.setBeforeRunMiddlewares(serviceMiddlewares.findCurrentUser)
	.setBody(async (data) => {
		data.currentUser.clients.push({
			clientId: data.clientId,
		});

		await data.currentUser.save();
	})
	.build();
