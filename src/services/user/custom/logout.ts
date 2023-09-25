import { SessionId } from "teletalk-type-store";

import { serviceBuilder } from "~/classes/service/ServiceBuilder";
import { serviceMiddlewares } from "~/services/middlewares";
import { HydratedUser } from "~/types/model";

export const logout = serviceBuilder
	.create<
		{
			currentSessionId: SessionId;
		},
		void,
		{
			currentUser: HydratedUser;
		}
	>()
	.setBeforeRunMiddlewares(serviceMiddlewares.findCurrentUser)
	.setBody(async (data) => {
		data.currentUser.sessions = data.currentUser.sessions.filter(
			(i) => i.sessionId !== data.currentSessionId
		);
		await data.currentUser.save();
	})
	.build();
