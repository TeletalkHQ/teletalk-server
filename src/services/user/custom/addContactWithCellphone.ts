import {
	ContactItem,
	FullName,
	UnknownCellphone,
	UserId,
} from "teletalk-type-store";

import { serviceBuilder } from "~/classes/service/ServiceBuilder";
import { serviceMiddlewares } from "~/services/middlewares";
import { HydratedUser } from "~/types/model";

export const addContactWithCellphone = serviceBuilder
	.create<
		{
			addingContact: UnknownCellphone & FullName;
			currentUserId: UserId;
			targetUserCellphone: UnknownCellphone;
		},
		{
			newContact: ContactItem;
		},
		{
			currentUser: HydratedUser;
			targetUser: HydratedUser;
		}
	>()
	.setBeforeRunMiddlewares(
		serviceMiddlewares.findCurrentUser,
		serviceMiddlewares.findTargetUser,
		serviceMiddlewares.throwIfContactExist
	)
	.setBody(async (data) => {
		return {
			newContact: {
				...data.addingContact,
				userId: data.targetUser.userId,
			} as ContactItem,
		};
	})
	.setAfterRunMiddlewares(serviceMiddlewares.saveNewContactItem)
	.build();
