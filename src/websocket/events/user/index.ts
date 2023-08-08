import { socketEventBuilder } from '~/classes/SocketEventBuilder';
import {
	AddBlockIO,
	AddContactIO,
	AddContactWithCellphoneIO,
	AddContactWithUserIdIO,
	EditContactIO,
	GetContactsIO,
	GetPublicUserDataIO,
	GetUserDataIO,
	RemoveBlockIO,
	RemoveContactIO,
	UpdatePublicUserDataIO,
} from '~/types';
import { fields } from '~/variables';
import { userHandlers } from '~/websocket/events/user/handlers';

const builder = socketEventBuilder();

const addBlock = builder
	.create<AddBlockIO>()
	.name('addBlock')
	.inputFields({ userId: fields.single.userId })
	.outputFields({
		blockedUser: fields.statics.object({
			userId: fields.single.userId,
		}),
	})
	.handler(userHandlers.addBlock)
	.build();

const addContact = builder
	.create<AddContactIO>()
	.name('addContact')
	.inputFields(fields.collection.contact)
	.outputFields({
		addedContact: fields.statics.object(fields.collection.contact),
	})
	.handler(userHandlers.addContact)
	.build();

const addContactWithCellphone = builder
	.create<AddContactWithCellphoneIO>()
	.name('addContactWithCellphone')
	.inputFields({
		...fields.collection.cellphone,
		...fields.collection.fullName,
	})
	.outputFields({
		addedContact: fields.statics.object(fields.collection.contact),
	})
	.handler(userHandlers.addContactWithCellphone)
	.build();

const addContactWithUserId = builder
	.create<AddContactWithUserIdIO>()
	.name('addContactWithUserId')
	.inputFields({
		...fields.collection.fullName,
		userId: fields.single.userId,
	})
	.outputFields({
		addedContact: fields.statics.object(fields.collection.contact),
	})
	.handler(userHandlers.addContactWithUserId)
	.build();

const editContact = builder
	.create<EditContactIO>()
	.name('editContact')
	.inputFields(fields.collection.FullNameWithUserId)
	.outputFields({
		editedContact: fields.statics.object(fields.collection.FullNameWithUserId),
	})
	.handler(userHandlers.editContact)
	.build();

const getContacts = builder
	.create<GetContactsIO>()
	.name('getContacts')
	.outputFields({
		contacts: fields.statics.array(fields.collection.contact),
	})
	.handler(userHandlers.getContacts)
	.build();

const getUserData = builder
	.create<GetUserDataIO>()
	.name('getUserData')
	.outputFields({
		user: fields.statics.object(fields.collection.user),
	})
	.handler(userHandlers.getUserData)
	.build();

const getPublicUserData = builder
	.create<GetPublicUserDataIO>()
	.name('getPublicUserData')
	.inputFields({
		userId: fields.single.userId,
	})
	.outputFields({
		publicUserData: fields.statics.object({
			...fields.collection.fullName,
			bio: fields.single.bio,
			userId: fields.single.userId,
			username: fields.single.username,
		}),
	})
	.handler(userHandlers.getPublicUserData)
	.build();

const removeBlock = builder
	.create<RemoveBlockIO>()
	.name('removeBlock')
	.inputFields({ userId: fields.single.userId })
	.outputFields({
		removedBlock: fields.statics.object({
			userId: fields.single.userId,
		}),
	})
	.handler(userHandlers.removeBlock)
	.build();

const removeContact = builder
	.create<RemoveContactIO>()
	.name('removeContact')
	.inputFields({
		userId: fields.single.userId,
	})
	.outputFields({
		removedContact: fields.statics.object({
			userId: fields.single.userId,
		}),
	})
	.handler(userHandlers.removeContact)
	.build();

const updatePublicUserData = builder
	.create<UpdatePublicUserDataIO>()
	.name('updatePublicUserData')
	.inputFields({
		...fields.collection.fullName,
		bio: fields.single.bio,
		username: fields.single.username,
	})
	.outputFields({
		publicUserData: fields.statics.object({
			...fields.collection.fullName,
			bio: fields.single.bio,
			status: fields.collection.status,
			userId: fields.single.userId,
			username: fields.single.username,
		}),
	})
	.handler(userHandlers.updatePublicUserData)
	.build();

export const user = {
	events: [
		addBlock,
		addContact,
		addContactWithCellphone,
		addContactWithUserId,
		editContact,
		getContacts,
		getPublicUserData,
		getUserData,
		removeBlock,
		removeContact,
		updatePublicUserData,
	],
	handlers: userHandlers,
};
