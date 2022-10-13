const { failTestBuilder } = require("@/classes/FailTestBuilder");
const { successTestBuilder } = require("@/classes/SuccessTestBuilder");

const { models } = require("@/models/models");

const userModels = models.native.user;

const { errors } = require("@/variables/errors/errors");
const { testVariables } = require("$/variables/testVariables");

const firstNameSuccessTests = (
  { firstNameMain, firstNameTest } = {},
  {
    stringEquality = true,
    modelCheck = true,
  } = testVariables.successTestDefaultOptions
) => {
  successTestBuilder
    .create()
    .setVariables(userModels.firstName, firstNameMain, firstNameTest)
    .setOptions({ modelCheck, stringEquality })
    .addCommonTest()
    .emptyCheck()
    .execute();
};

const firstNameFailureTests = (configuredCustomRequest, data) => {
  failTestBuilder
    .create(configuredCustomRequest, data, userModels.firstName, "firstName")
    .required(errors.FIRST_NAME_REQUIRED)
    .minlength(errors.FIRST_NAME_MINLENGTH_REACH)
    .maxlength(errors.FIRST_NAME_MAXLENGTH_REACH)
    .invalidType_typeIsString(errors.FIRST_NAME_INVALID_TYPE);
};

module.exports = { firstNameFailureTests, firstNameSuccessTests };
