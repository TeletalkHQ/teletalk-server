const { notFound } = require("@/middlewares/notFound");
const { applyMiddlewares } = require("@/middlewares/applyMiddlewares");
const { attachCurrentUserId } = require("@/middlewares/attachCurrentUserId");
const { authDefault } = require("@/middlewares/authDefault");
const { selfStuffCheck } = require("@/middlewares/selfStuffCheck");
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
  verifyVerificationCode,
} = require("@/middlewares/verifyVerificationCode");

const middlewares = {
  applyMiddlewares,
  attachCurrentUserId,
  authDefault,
  selfStuffCheck,
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
  verifyVerificationCode,
};

module.exports = { middlewares };
