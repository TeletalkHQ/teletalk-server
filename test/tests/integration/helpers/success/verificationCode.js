const { successTestBuilder } = require("$/classes/SuccessTestBuilder");

const { models } = require("@/models");

const userModels = models.native.user;

const verificationCode = (
  { responseValue } = {},
  { modelCheck = true } = {
    modelCheck: true,
  }
) => {
  successTestBuilder
    .create()
    .setVariables(userModels.verificationCode, "", responseValue)
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
