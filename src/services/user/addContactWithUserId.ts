import { maker } from 'utility-store';
import {
	ContactItem,
	FullNameWithUserId,
	UserId,
} from 'utility-store/lib/types';

import { errorStore } from '~/classes/ErrorStore';
import { UserService } from '~/types';

import { findOneUser } from './findOneUser';
import { checkExistenceOfContactItem, saveContactItem } from './utils';

export const addContactWithUserId: UserService<
	{
		addingContact: FullNameWithUserId;
		currentUserId: UserId;
	},
	{
		addedContact: ContactItem;
	}
> = async (data) => {
	const currentUser = await findOneUser({
		userId: data.currentUserId,
	});
	if (!currentUser) throw errorStore.find('CURRENT_USER_NOT_EXIST');

	const targetUser = await findOneUser({ userId: data.addingContact.userId });
	if (!targetUser) throw errorStore.find('TARGET_USER_NOT_EXIST');

	checkExistenceOfContactItem(currentUser.contacts, targetUser.userId);

	const contact: ContactItem = {
		...data.addingContact,
		...maker.emptyCellphone(),
	};

	await saveContactItem(currentUser, contact);

	return {
		addedContact: contact,
	};
};
