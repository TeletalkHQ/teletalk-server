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
  cellphoneRoutes: {
    properties: {
      cellphoneRouteBaseUrl: { properties: cellphoneRouteBaseUrl },
    },
  },
} = require("~/variables/routes/cellphoneRoutes");
const {
  otherRoutes: {
    properties: {
      otherRouteBaseUrl: { properties: otherRouteBaseUrl },
    },
  },
} = require("~/variables/routes/otherRoutes");
const {
  privateChatRoutes: {
    properties: {
      privateChatRouteBaseUrl: { properties: privateChatRouteBaseUrl },
    },
  },
} = require("~/variables/routes/privateChatRoutes");
const {
  userRoutes: {
    properties: {
      signInNormalRoute: { properties: signInNormal },
      verifySignInNormalRoute: { properties: verifySignInNormal },
      userRouteBaseUrl: { properties: userRouteBaseUrl },
    },
  },
} = require("~/variables/routes/userRoutes");
const {
  versionControlRoutes: {
    properties: {
      versionControlBaseUrl: { properties: versionControlBaseUrl },
    },
  },
} = require("~/variables/routes/versionControlRoutes");

const lifeLine = Router();
//? Add your global middleware here, in special cases you can ignore middleware by url;
lifeLine.use(
  ignoreMiddlewaresByUrl(
    [
      `${userRouteBaseUrl.url}${signInNormal.url}`,
      `${userRouteBaseUrl.url}${verifySignInNormal.url}`,
    ],
    authDefaultMiddleware
  )
);

lifeLine.use(cellphoneRouteBaseUrl.url, cellphoneRouter);

lifeLine.use(otherRouteBaseUrl.url, otherRouter);

lifeLine.use(privateChatRouteBaseUrl.url, privateChatRouter);

lifeLine.use(userRouteBaseUrl.url, userRouter);

lifeLine.use(versionControlBaseUrl.url, versionControlRouter);

module.exports = { lifeLine };
