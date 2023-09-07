import { socketEventBuilder } from "~/classes/SocketEventBuilder";
import { CreateNewUserIO, LogoutIO, SignInIO, VerifyIO } from "~/types";
import { fields } from "~/variables";

import { handlers } from "./handlers";

const builder = socketEventBuilder();

const createNewUser = builder
	.create<CreateNewUserIO>()
	.name("createNewUser")
	.inputFields(fields.collection.fullName)
	.handler(handlers.createNewUser)
	.build();

const logout = builder
	.create<LogoutIO>()
	.name("logout")
	.handler(handlers.logout)
	.build();

const signIn = builder
	.create<SignInIO>()
	.name("signIn")
	.noAuth()
	.inputFields(fields.collection.cellphone)
	.handler(handlers.signIn)
	.build();

const verify = builder
	.create<VerifyIO>()
	.name("verify")
	.inputFields({
		verificationCode: fields.single.verificationCode,
	})
	.outputFields({
		newUser: fields.single.newUser,
	})
	.handler(handlers.verify)
	.build();

export const auth = {
	events: [createNewUser, logout, signIn, verify],
	handlers,
};
