const { applyMiddlewares } = require("@/middlewares/applyMiddlewares");
const { attachCurrentUserId } = require("@/middlewares/attachCurrentUserId");
const { authDefault } = require("@/middlewares/authDefault");
const { cellphoneValidator } = require("@/middlewares/cellphoneValidator");
const { checkBodyFields } = require("@/middlewares/checkBodyFields");
const { checkDataAndResponse } = require("@/middlewares/checkDataAndResponse");
const { contactValidator } = require("@/middlewares/contactValidator");
const { notFound } = require("@/middlewares/notFound");
const { selfStuffCheck } = require("@/middlewares/selfStuffCheck");
const {
  checkCurrentUserStatus,
} = require("@/middlewares/checkCurrentUserStatus");
const { findRoute } = require("@/middlewares/findRoute");
const { ignoreMiddlewares } = require("@/middlewares/ignoreMiddlewares");
const { logSeparator } = require("@/middlewares/logSeparator");
const { requestMethodChecker } = require("@/middlewares/requestMethodChecker");
const {
  responseErrorHandlers,
} = require("@/middlewares/responseErrorHandlers");
const { sendJsonResponse } = require("@/middlewares/sendJsonResponse");
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
  cellphoneValidator,
  checkBodyFields,
  checkCurrentUserStatus,
  checkDataAndResponse,
  contactValidator,
  findRoute,
  ignoreMiddlewares,
  logSeparator,
  notFound,
  requestMethodChecker,
  responseErrorHandlers,
  selfStuffCheck,
  sendJsonResponse,
  verificationCodeValidator,
  verifyVerificationCode,
};

module.exports = { middlewares };
