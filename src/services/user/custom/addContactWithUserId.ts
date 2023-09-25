import {
	EmptyCellphone,
	FullName,
	FullNameWithUserId,
	SessionId,
	UserId,
} from "teletalk-type-store";
import { maker } from "utility-store";

import { serviceBuilder } from "~/classes/service/ServiceBuilder";
import { serviceMiddlewares } from "~/services/middlewares";
import { HydratedUser } from "~/types/model";

export const addContactWithUserId = serviceBuilder
	.create<
		{
			currentSessionId: SessionId;
			fullName: FullName;
			targetUserId: UserId;
		},
		{
			newContact: FullNameWithUserId & EmptyCellphone;
		},
		{
			currentUser: HydratedUser;
			targetUser: HydratedUser;
		}
	>()
	.setBeforeRunMiddlewares(
		serviceMiddlewares.findCurrentUser,
		serviceMiddlewares.throwIfSelfDataRequested,
		serviceMiddlewares.findTargetUser,
		serviceMiddlewares.throwIfContactExist
	)
	.setBody(async (data) => {
		const contact: FullNameWithUserId & EmptyCellphone = {
			...data.fullName,
			...maker.emptyCellphone(),
			userId: data.targetUser.userId,
		};

		return {
			newContact: contact,
		};
	})
	.setAfterRunMiddlewares(serviceMiddlewares.saveNewContactItem)
	.build();
