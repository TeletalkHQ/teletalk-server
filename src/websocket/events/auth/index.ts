import { socketEventBuilder } from "~/classes/SocketEventBuilder";
import { CreateNewUserIO, LogoutIO, SignInIO, VerifyIO } from "~/types";
import { fields } from "~/variables";
import { authHandlers } from "~/websocket/events/auth/handlers";

const builder = socketEventBuilder();

const createNewUser = builder
	.create<CreateNewUserIO>()
	.name("createNewUser")
	.inputFields(fields.collection.fullName)
	.handler(authHandlers.createNewUser)
	.build();

const logout = builder
	.create<LogoutIO>()
	.name("logout")
	.handler(authHandlers.logout)
	.build();

const signIn = builder
	.create<SignInIO>()
	.name("signIn")
	.noAuth()
	.inputFields(fields.collection.cellphone)
	.handler(authHandlers.signIn)
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
	.handler(authHandlers.verify)
	.build();

export const auth = {
	events: [createNewUser, logout, signIn, verify],
	handlers: authHandlers,
};
