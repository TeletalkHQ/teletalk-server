const { Router } = require("express");

//* All routers come into here =>
const { cellphoneRouter } = require("@/routers/cellphoneRouter");
const { otherRouter } = require("@/routers/otherRouter");
const { privateChatRouter } = require("@/routers/privateChatRouter");
const { testRouter } = require("@/routers/testRouter");
const { userRouter } = require("@/routers/userRouter");
const { versionControlRouter } = require("@/routers/versionControlRouter");

const {
  cellphoneRoutes: { cellphoneRouteBaseUrl },
} = require("@/variables/routes/cellphoneRoutes");
const {
  otherRoutes: { otherRouteBaseUrl },
} = require("@/variables/routes/otherRoutes");
const {
  privateChatRoutes: { privateChatRouteBaseUrl },
} = require("@/variables/routes/privateChatRoutes");
const {
  testRoutes: { testBaseUrl },
} = require("@/variables/routes/testRoutes");
const {
  userRoutes: { userRouteBaseUrl },
} = require("@/variables/routes/userRoutes");
const {
  versionControlRoutes: { versionControlBaseUrl },
} = require("@/variables/routes/versionControlRoutes");

const lifeLine = Router();

lifeLine.use(cellphoneRouteBaseUrl.url, cellphoneRouter);
lifeLine.use(otherRouteBaseUrl.url, otherRouter);
lifeLine.use(privateChatRouteBaseUrl.url, privateChatRouter);
lifeLine.use(testBaseUrl.url, testRouter);
lifeLine.use(userRouteBaseUrl.url, userRouter);
lifeLine.use(versionControlBaseUrl.url, versionControlRouter);

module.exports = { lifeLine };
