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
      signInNormalRoute: { properties: signInNormal },
      verifySignInNormalRoute: { properties: verifySignInNormal },
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
      `${userRoutes.userRouteBaseUrl.properties.url}${signInNormal.url}`,
      `${userRoutes.userRouteBaseUrl.properties.url}${verifySignInNormal.url}`,
    ],
    authDefaultMiddleware
  )
);

lifeLine.use(
  cellphoneRoutes.cellphoneRouteBaseUrl.properties.url,
  cellphoneRouter
);

lifeLine.use(otherRoutes.otherRouteBaseUrl.properties.url, otherRouter);

lifeLine.use(
  privateChatRoutes.privateChatRouteBaseUrl.properties.url,
  privateChatRouter
);

lifeLine.use(userRoutes.userRouteBaseUrl.properties.url, userRouter);

lifeLine.use(
  versionControlRoutes.versionControlBaseUrl.properties.url,
  versionControlRouter
);

module.exports = { lifeLine };
