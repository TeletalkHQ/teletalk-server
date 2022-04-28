//* All routers come into here =>

const { Router } = require("express");

const { cellphoneRouter } = require("~/routers/cellphoneRouter");
const { otherRouter } = require("~/routers/otherRouter");
const { privateChatRouter } = require("~/routers/privateChatRouter");
const { userRouter } = require("~/routers/userRouter");
const { versionControlRouter } = require("~/routers/versionControlRouter");
const { testRouter } = require("~/routers/testRouter");

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
      signInNormalRoute: { properties: signInNormalRoute },
      verifySignInNormalRoute: { properties: verifySignInNormalRoute },
      createNewUserRoute: { properties: createNewUserRoute },
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
const {
  testRoutes: {
    properties: {
      testBaseUrl: { properties: testBaseUrl },
    },
  },
} = require("~/variables/routes/testRoutes");

const lifeLine = Router();

//? Add your global middleware here, in special cases you can ignore middleware by url;
lifeLine.use(
  ignoreMiddlewaresByUrl(
    [
      `${userRouteBaseUrl.url}${signInNormalRoute.url}`,
      `${userRouteBaseUrl.url}${verifySignInNormalRoute.url}`,
      `${userRouteBaseUrl.url}${createNewUserRoute.url}`,
    ],
    authDefaultMiddleware
  )
);

lifeLine.use(cellphoneRouteBaseUrl.url, cellphoneRouter);

lifeLine.use(otherRouteBaseUrl.url, otherRouter);

lifeLine.use(privateChatRouteBaseUrl.url, privateChatRouter);

lifeLine.use(userRouteBaseUrl.url, userRouter);

lifeLine.use(versionControlBaseUrl.url, versionControlRouter);

lifeLine.use(testBaseUrl.url, testRouter);

module.exports = { lifeLine };
