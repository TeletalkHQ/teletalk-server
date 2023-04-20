import { socketRouteBuilder } from "@/classes/routeBuilder/SocketRouteBuilder";

import { fields } from "@/variables/others/fields";

import { authHandlers } from "@/websocket/events/auth/handlers";

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

const authRoutes = {
  createNewUser,
  logout,
  signIn,
  verify,
};

export { authRoutes };
