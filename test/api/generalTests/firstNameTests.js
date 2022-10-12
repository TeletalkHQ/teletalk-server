const { failTestBuilder } = require("@/classes/FailTestBuilder");
const { successTestBuilder } = require("@/classes/SuccessTestBuilder");

const { models } = require("@/models/models");

const userModels = models.native.user;

const {
  userErrors: {
    FIRST_NAME_INVALID_TYPE,
    FIRST_NAME_MAXLENGTH_REACH,
    FIRST_NAME_MINLENGTH_REACH,
    FIRST_NAME_REQUIRED,
  },
} = require("@/variables/errors/userErrors");
const {
  successTestDefaultOptions,
} = require("@/variables/others/testVariables");

const firstNameSuccessTests = (
  { firstNameMain, firstNameTest } = {},
  { stringEquality = true, modelCheck = true } = successTestDefaultOptions
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
    .required(FIRST_NAME_REQUIRED)
    .minlength(FIRST_NAME_MINLENGTH_REACH)
    .maxlength(FIRST_NAME_MAXLENGTH_REACH)
    .invalidType_typeIsString(FIRST_NAME_INVALID_TYPE);
};

module.exports = { firstNameFailureTests, firstNameSuccessTests };
