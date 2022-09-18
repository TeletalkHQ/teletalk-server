const { successTestBuilder } = require("@/classes/SuccessTestBuilder");
const { failTestBuilder } = require("@/classes/FailTestBuilder");

const {
  userModels: { verificationCodeModel },
} = require("@/models/dataModels/userModels");

const {
  userErrors: {
    VERIFICATION_CODE_INVALID,
    VERIFICATION_CODE_INVALID_LENGTH,
    VERIFICATION_CODE_INVALID_TYPE,
    VERIFICATION_CODE_NUMERIC,
    VERIFICATION_CODE_REQUIRED,
  },
} = require("@/variables/errors/userErrors");

const verificationCodeSuccessTests = (
  { verificationCodeTest } = {},
  { modelCheck = true } = {
    modelCheck: true,
  }
) => {
  successTestBuilder
    .create()
    .setVariables(verificationCodeModel, "", verificationCodeTest)
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
      verificationCodeModel,
      "verificationCode"
    )
    .required(VERIFICATION_CODE_REQUIRED)
    .numeric(VERIFICATION_CODE_NUMERIC)
    .invalidType_typeIsString(VERIFICATION_CODE_INVALID_TYPE)
    .length(VERIFICATION_CODE_INVALID_LENGTH)
    .invalidNumber(VERIFICATION_CODE_INVALID);
};

module.exports = {
  verificationCodeFailureTests,
  verificationCodeSuccessTests,
};
