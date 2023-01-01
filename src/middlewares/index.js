const { notFound } = require("@/middlewares/notFound");
const { applyMiddlewares } = require("@/middlewares/applyMiddlewares");
const { attachCurrentUserId } = require("@/middlewares/attachCurrentUserId");
const { authDefault } = require("@/middlewares/authDefault");
const {
  cellphoneSelfStuffCheck,
} = require("@/middlewares/cellphoneSelfStuffCheck");
const { cellphoneValidator } = require("@/middlewares/cellphoneValidator");
const { checkBodyFields } = require("@/middlewares/checkBodyFields");
const { checkDataAndResponse } = require("@/middlewares/checkDataAndResponse");
const { contactValidator } = require("@/middlewares/contactValidator");
const {
  checkCurrentUserStatus,
} = require("@/middlewares/checkCurrentUserStatus");
const { findRouteObject } = require("@/middlewares/findRouteObject");
const { ignoreMiddlewares } = require("@/middlewares/ignoreMiddlewares");
const { logSeparator } = require("@/middlewares/logSeparator");
const { requestMethodChecker } = require("@/middlewares/requestMethodChecker");
const {
  responseErrorHandlers,
} = require("@/middlewares/responseErrorHandlers");
const { sendJsonResponse } = require("@/middlewares/sendJsonResponse");
const {
  targetUserFinderByCellphone,
} = require("@/middlewares/targetUserFinderByCellphone");
const {
  verificationCodeValidator,
} = require("@/middlewares/verificationCodeValidator");
const {
  verifyTemporaryClient,
} = require("@/middlewares/verifyTemporaryClient");

const middlewares = {
  applyMiddlewares,
  attachCurrentUserId,
  authDefault,
  cellphoneSelfStuffCheck,
  cellphoneValidator,
  checkBodyFields,
  checkCurrentUserStatus,
  checkDataAndResponse,
  contactValidator,
  findRouteObject,
  ignoreMiddlewares,
  logSeparator,
  notFound,
  requestMethodChecker,
  responseErrorHandlers,
  sendJsonResponse,
  targetUserFinderByCellphone,
  verificationCodeValidator,
  verifyTemporaryClient,
};

module.exports = { middlewares };
