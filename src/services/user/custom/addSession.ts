import { SessionId } from "teletalk-type-store";

import { serviceBuilder } from "~/classes/service/ServiceBuilder";
import { serviceMiddlewares } from "~/services/middlewares";
import { HydratedUser } from "~/types/model";

export const addSession = serviceBuilder
	.create<
		{
			currentUserId: SessionId;
			sessionId: SessionId;
		},
		void,
		{
			currentUser: HydratedUser;
		}
	>()
	.setBeforeRunMiddlewares(serviceMiddlewares.findCurrentUser)
	.setBody(async (data) => {
		data.currentUser.sessions.push({
			sessionId: data.sessionId,
		});

		await data.currentUser.save();
	})
	.build();
