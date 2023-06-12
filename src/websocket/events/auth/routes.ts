import { socketRouteBuilder } from "~/classes/routeBuilder/SocketRouteBuilder";

import { SocketRoutePicker } from "~/types";

import { fields } from "~/variables";

import { authHandlers } from "~/websocket/events/auth/handlers";

const builder = socketRouteBuilder();

const createNewUser = builder
  .create()
  .name("createNewUser")
  .inputFields(fields.collection.fullName)
  .handler(authHandlers.createNewUser)
  .build();

const logout = builder
  .create()
  .name("logout")
  .handler(authHandlers.logout)
  .build();

const signIn = builder
  .create()
  .name("signIn")
  .noAuth()
  .inputFields(fields.collection.cellphone)
  .handler(authHandlers.signIn)
  .build();

const verify = builder
  .create()
  .name("verify")
  .inputFields({
    verificationCode: fields.single.verificationCode,
  })
  .outputFields({
    newUser: fields.single.newUser,
  })
  .handler(authHandlers.verify)
  .build();

type AuthRoutes = SocketRoutePicker<
  "createNewUser" | "logout" | "signIn" | "verify"
>;

const authRoutes: AuthRoutes = {
  createNewUser,
  logout,
  signIn,
  verify,
};

export { authRoutes };
