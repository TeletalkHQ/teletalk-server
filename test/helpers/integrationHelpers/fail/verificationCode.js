const { failTestBuilder } = require("@/classes/FailTestBuilder");

const { models } = require("@/models/models");

const { errors } = require("@/variables/errors/errors");

const userModels = models.native.user;

const verificationCode = (configuredCustomRequest, data = {}) => {
  failTestBuilder
    .create(
      configuredCustomRequest,
      data,
      userModels.verificationCode,
      "verificationCode"
    )
    .required(errors.VERIFICATION_CODE_REQUIRED)
    .numeric(errors.VERIFICATION_CODE_NUMERIC)
    .invalidType_typeIsString(errors.VERIFICATION_CODE_INVALID_TYPE)
    .length(errors.VERIFICATION_CODE_INVALID_LENGTH)
    .invalidNumber(errors.VERIFICATION_CODE_INVALID);
};

module.exports = {
  verificationCode,
};
