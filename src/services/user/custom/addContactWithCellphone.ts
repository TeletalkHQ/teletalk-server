import {
	DBContactItem,
	FullName,
	SessionId,
	UnknownCellphone,
} from "teletalk-type-store";

import { serviceBuilder } from "~/classes/service/ServiceBuilder";
import { serviceMiddlewares } from "~/services/middlewares";
import { HydratedUser } from "~/types/model";

export const addContactWithCellphone = serviceBuilder
	.create<
		{
			addingContact: UnknownCellphone & FullName;
			currentSessionId: SessionId;
			targetUserCellphone: UnknownCellphone;
		},
		{
			newContact: DBContactItem;
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
		return {
			newContact: {
				userId: data.targetUser.userId,
				firstName: data.addingContact.firstName,
				lastName: data.addingContact.lastName,
				isCellphoneAccessible: true,
			} as DBContactItem,
		};
	})
	.setAfterRunMiddlewares(serviceMiddlewares.saveNewContactItem)
	.build();
