import { socketRouteBuilder } from "@/classes/routeBuilder/SocketRouteBuilder";

import { fields } from "@/variables/others/fields";

import { authHandlers } from "@/websocket/events/auth/handlers";

const builder = socketRouteBuilder();

const createNewUser = builder
  .create()
  .name("create")
  .inputFields(fields.collection.fullName)
  .outputFields({
    token: fields.single.userId,
  })
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
  .inputFields(fields.collection.cellphone)
  .outputFields({
    token: fields.single.userId,
  })
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
