const { successTestBuilder } = require("@/classes/SuccessTestBuilder");
const { failTestBuilder } = require("@/classes/FailTestBuilder");

const { models } = require("@/models/models");

const { errors } = require("@/variables/errors/errors");

const userModels = models.native.user;

const verificationCodeSuccessTests = (
  { verificationCodeTest } = {},
  { modelCheck = true } = {
    modelCheck: true,
  }
) => {
  successTestBuilder
    .create()
    .setVariables(userModels.verificationCode, "", verificationCodeTest)
    .setOptions({ modelCheck })
    .typeCheck()
    .emptyCheck()
    .numericCheck()
    .lengthCheck()
    .execute();
};

const verificationCodeFailureTests = (configuredCustomRequest, data = {}) => {
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
  verificationCodeFailureTests,
  verificationCodeSuccessTests,
};
