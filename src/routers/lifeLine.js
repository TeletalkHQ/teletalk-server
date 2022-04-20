//* All routers come into here =>

const { Router } = require("express");

const {
  cellphoneRouter,
} = require("~/routers/cellphoneRouters/cellphoneRouter");
const { otherRouter } = require("~/routers/otherRouters/otherRouter");
const {
  privateChatRouter,
} = require("~/routers/chatRouters/privateChatRouter");
const { userRouter } = require("~/routers/userRouters/userRouter");
const {
  versionControlRouter,
} = require("~/routers/versionControlRouters/versionControlRouter");

const {
  authDefaultMiddleware,
} = require("~/middlewares/authDefaultMiddleware");

const { ignoreMiddlewaresByUrl } = require("~/functions/utilities/utilsNoDeps");

const {
  cellphoneRoutes: { properties: cellphoneRoutes },
} = require("~/variables/routes/cellphoneRoutes");
const {
  otherRoutes: { properties: otherRoutes },
} = require("~/variables/routes/otherRoutes");
const {
  privateChatRoutes: { properties: privateChatRoutes },
} = require("~/variables/routes/privateChatRoutes");
const {
  userRoutes: { properties: userRoutes },
  userRoutes: {
    properties: {
      signInNormal: { properties: signInNormal },
      verifySignInNormal: { properties: verifySignInNormal },
    },
  },
} = require("~/variables/routes/userRoutes");
const {
  versionControlRoutes: { properties: versionControlRoutes },
} = require("~/variables/routes/versionControlRoutes");

const lifeLine = Router();

//? Add your global middleware here, in special cases you can ignore middleware by url;
lifeLine.use(
  ignoreMiddlewaresByUrl(
    [
      `${userRoutes.baseUrl.properties.url}${signInNormal.url}`,
      `${userRoutes.baseUrl.properties.url}${verifySignInNormal.url}`,
    ],
    authDefaultMiddleware
  )
);

lifeLine.use(cellphoneRoutes.baseUrl.properties.url, cellphoneRouter);

lifeLine.use(otherRoutes.baseUrl.properties.url, otherRouter);

lifeLine.use(privateChatRoutes.baseUrl.properties.url, privateChatRouter);

lifeLine.use(userRoutes.baseUrl.properties.url, userRouter);

lifeLine.use(versionControlRoutes.baseUrl.properties.url, versionControlRouter);

module.exports = { lifeLine };
