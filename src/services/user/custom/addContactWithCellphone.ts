import { Cellphone, ContactItem } from "utility-store/lib/types";

import { serviceBuilder } from "~/classes/service/ServiceBuilder";
import { serviceMiddlewares } from "~/services/middlewares";
import { ContactItemWithCellphone, UserId } from "~/types/datatypes";
import { HydratedUser } from "~/types/model";

export const addContactWithCellphone = serviceBuilder
	.create<
		{
			addingContact: ContactItemWithCellphone;
			currentUserId: UserId;
			targetUserCellphone: Cellphone;
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
			},
		};
	})
	.setAfterRunMiddlewares(serviceMiddlewares.saveNewContactItem)
	.build();
