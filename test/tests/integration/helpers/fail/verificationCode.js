const { failTestBuilder } = require("$/classes/FailTestBuilder");
const { randomMaker } = require("$/classes/RandomMaker");

const { models } = require("@/models");

const { errors } = require("@/variables/errors");

const userModels = models.native.user;

const verificationCodeFailTest = (configuredRequester, data = {}) => {
  const builder = failTestBuilder.create(
    configuredRequester,
    data,
    userModels.verificationCode,
    "verificationCode"
  );
  builder
    .missing()
    .overload()
    .invalidType()
    .empty()
    .numeric()
    .length(
      randomMaker.stringNumber(userModels.verificationCode.length.value + 1)
    );

  builder.custom(
    randomMaker.stringNumber(userModels.verificationCode.length.value),
    errors.VERIFICATION_CODE_INVALID
  );
};

module.exports = {
  verificationCodeFailTest,
};
