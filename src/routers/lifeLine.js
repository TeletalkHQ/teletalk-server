//* All routers come into here =>

const { Router } = require("express");

const {
  cellphoneRouter,
} = require("~/routers/cellphoneRouters/cellphoneRouter");
const { otherRoute } = require("~/routers/otherRouters/otherRouter");
const { privateChatRoute } = require("~/routers/chatRouters/privateChatRouter");
const { userRouter } = require("~/routers/userRouters/userRouter");
const {
  versionControlRouter,
} = require("~/routers/versionControlRouters/versionControlRouter");

const {
  authDefaultMiddleware,
} = require("~/middlewares/authDefaultMiddleware");

const { ignoreMiddlewaresByUrl } = require("~/functions/utilities/utils");

const { cellphoneRoutes } = require("~/variables/routes/cellphoneRoutes");
const { otherRoutes } = require("~/variables/routes/otherRoutes");
const { privateChatRoutes } = require("~/variables/routes/privateChatRoutes");
const {
  userRoutes,
  userRoutes: {
    signInNormal: { properties: signInNormal },
    verifySignInNormal: { properties: verifySignInNormal },
  },
} = require("~/variables/routes/userRoutes");
const {
  versionControlRoutes,
} = require("~/variables/routes/versionControlRoutes");

const lifeLine = Router();

lifeLine.use(
  ignoreMiddlewaresByUrl(
    [signInNormal.url, verifySignInNormal.url],
    authDefaultMiddleware
  )
);

lifeLine.use(cellphoneRoutes.baseUrl.properties.url, cellphoneRouter);

lifeLine.use(otherRoutes.baseUrl.properties.url, otherRoute);

lifeLine.use(privateChatRoutes.baseUrl.properties.url, privateChatRoute);

lifeLine.use(userRoutes.baseUrl.properties.url, userRouter);

lifeLine.use(
  versionControlRoutes.properties.baseUrl.properties.url,
  versionControlRouter
);

module.exports = { lifeLine };
