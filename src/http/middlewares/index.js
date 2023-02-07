const { applyMiddlewares } = require("@/http/middlewares/applyMiddlewares");
const {
  attachCurrentUserId,
} = require("@/http/middlewares/attachCurrentUserId");
const { authDefault } = require("@/http/middlewares/authDefault");
const { cellphoneValidator } = require("@/http/middlewares/cellphoneValidator");
const { checkBodyFields } = require("@/http/middlewares/checkBodyFields");
const {
  checkCurrentUserStatus,
} = require("@/http/middlewares/checkCurrentUserStatus");
const {
  checkDataAndResponse,
} = require("@/http/middlewares/checkDataAndResponse");
const { contactValidator } = require("@/http/middlewares/contactValidator");
const { notFound } = require("@/http/middlewares/notFound");
const { selfStuffCheck } = require("@/http/middlewares/selfStuffCheck");
const { findRoute } = require("@/http/middlewares/findRoute");
const { ignoreMiddlewares } = require("@/http/middlewares/ignoreMiddlewares");
const { logSeparator } = require("@/http/middlewares/logSeparator");
const {
  requestMethodChecker,
} = require("@/http/middlewares/requestMethodChecker");
const {
  responseErrorHandlers,
} = require("@/http/middlewares/responseErrorHandlers");
const { sendJsonResponse } = require("@/http/middlewares/sendJsonResponse");
const {
  verificationCodeValidator,
} = require("@/http/middlewares/verificationCodeValidator");
const {
  verifyVerificationCode,
} = require("@/http/middlewares/verifyVerificationCode");

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
