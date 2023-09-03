import { socketEventBuilder } from "~/classes/SocketEventBuilder";
import {
	AddBlockIO,
	AddContactWithCellphoneIO,
	AddContactWithUserIdIO,
	GetContactsIO,
	GetPublicDataIO,
	GetUserDataIO,
	RemoveBlockIO,
	RemoveContactIO,
	UpdateContactIO,
	UpdatePublicDataIO,
} from "~/types";
import { fields } from "~/variables";
import { userHandlers } from "~/websocket/events/user/handlers";

const builder = socketEventBuilder();

const addBlock = builder
	.create<AddBlockIO>()
	.name("addBlock")
	.inputFields({ userId: fields.single.userId })
	.outputFields({
		blockedUser: fields.statics.object({
			userId: fields.single.userId,
		}),
	})
	.handler(userHandlers.addBlock)
	.build();

const addContactWithCellphone = builder
	.create<AddContactWithCellphoneIO>()
	.name("addContactWithCellphone")
	.inputFields({
		...fields.collection.cellphone,
		...fields.collection.fullName,
	})
	.outputFields({
		newContact: fields.statics.object(fields.collection.contact),
	})
	.handler(userHandlers.addContactWithCellphone)
	.build();

const addContactWithUserId = builder
	.create<AddContactWithUserIdIO>()
	.name("addContactWithUserId")
	.inputFields({
		...fields.collection.fullName,
		userId: fields.single.userId,
	})
	.outputFields({
		newContact: fields.statics.object(fields.collection.contact),
	})
	.handler(userHandlers.addContactWithUserId)
	.build();

const updateContact = builder
	.create<UpdateContactIO>()
	.name("updateContact")
	.inputFields(fields.collection.FullNameWithUserId)
	.outputFields({
		editedContact: fields.statics.object(fields.collection.FullNameWithUserId),
	})
	.handler(userHandlers.updateContact)
	.build();

const getContacts = builder
	.create<GetContactsIO>()
	.name("getContacts")
	.outputFields({
		contacts: fields.statics.array(fields.collection.contact),
	})
	.handler(userHandlers.getContacts)
	.build();

const getUserData = builder
	.create<GetUserDataIO>()
	.name("getUserData")
	.outputFields({
		user: fields.statics.object(fields.collection.user),
	})
	.handler(userHandlers.getUserData)
	.build();

const getPublicData = builder
	.create<GetPublicDataIO>()
	.name("getPublicData")
	.inputFields({
		userId: fields.single.userId,
	})
	.outputFields({
		userPublicData: fields.statics.object({
			...fields.collection.fullName,
			bio: fields.single.bio,
			userId: fields.single.userId,
			username: fields.single.username,
		}),
	})
	.handler(userHandlers.getPublicData)
	.build();

const removeBlock = builder
	.create<RemoveBlockIO>()
	.name("removeBlock")
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
	.name("removeContact")
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

const updatePublicData = builder
	.create<UpdatePublicDataIO>()
	.name("updatePublicData")
	.inputFields({
		...fields.collection.fullName,
		bio: fields.single.bio,
		username: fields.single.username,
	})
	.outputFields({
		userPublicData: fields.statics.object({
			...fields.collection.fullName,
			bio: fields.single.bio,
			status: fields.collection.status,
			userId: fields.single.userId,
			username: fields.single.username,
		}),
	})
	.handler(userHandlers.updatePublicData)
	.build();

export const user = {
	events: [
		addBlock,
		addContactWithCellphone,
		addContactWithUserId,
		updateContact,
		getContacts,
		getPublicData,
		getUserData,
		removeBlock,
		removeContact,
		updatePublicData,
	],
	handlers: userHandlers,
};
