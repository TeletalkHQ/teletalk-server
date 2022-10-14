const { successTestBuilder } = require("@/classes/SuccessTestBuilder");

const { models } = require("@/models/models");

const userModels = models.native.user;

const verificationCode = (
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

module.exports = {
  verificationCode,
};
