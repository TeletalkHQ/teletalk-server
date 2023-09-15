import { maker } from "utility-store";
import { ContactItem, FullName, UserId } from "utility-store/lib/types";

import { serviceBuilder } from "~/classes/service/ServiceBuilder";
import { serviceMiddlewares } from "~/services/middlewares";
import { HydratedUser } from "~/types/model";

export const addContactWithUserId = serviceBuilder
	.create<
		{
			currentUserId: UserId;
			fullName: FullName;
			targetUserId: UserId;
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
		const contact: ContactItem = {
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
