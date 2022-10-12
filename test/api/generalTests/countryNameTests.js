const { randomMaker } = require("utility-store/src/classes/RandomMaker");

const { successTestBuilder } = require("@/classes/SuccessTestBuilder");
const { failTestBuilder } = require("@/classes/FailTestBuilder");

const { models } = require("@/models/models");

const userModels = models.native.user;

const {
  userErrors: {
    COUNTRY_NAME_MAXLENGTH_REACH,
    COUNTRY_NAME_MINLENGTH_REACH,
    COUNTRY_NAME_INVALID_TYPE,
    COUNTRY_NAME_NOT_SUPPORTED,
    COUNTRY_NAME_REQUIRED,
  },
} = require("@/variables/errors/userErrors");
const {
  successTestDefaultOptions,
} = require("@/variables/others/testVariables");

const countryNameMaxlength = userModels.countryName.maxlength.value;

const countryNameSuccessTests = (
  { countryNameMain, countryNameTest } = {},
  { stringEquality = true, modelCheck = true } = successTestDefaultOptions
) => {
  successTestBuilder
    .create()
    .setVariables(userModels.countryName, countryNameMain, countryNameTest)
    .setOptions({ modelCheck, stringEquality })
    .addCommonTest()
    .emptyCheck()
    .execute();
};

const countryNameFailureTests = (configuredCustomRequest, data) => {
  failTestBuilder
    .create(
      configuredCustomRequest,
      data,
      userModels.countryName,
      "countryName"
    )
    .required(COUNTRY_NAME_REQUIRED)
    .maxlength(COUNTRY_NAME_MAXLENGTH_REACH)
    .minlength(COUNTRY_NAME_MINLENGTH_REACH)
    .invalidType_typeIsString(COUNTRY_NAME_INVALID_TYPE)
    .custom(
      randomMaker.randomString(countryNameMaxlength),
      COUNTRY_NAME_NOT_SUPPORTED
    );
};

module.exports = { countryNameFailureTests, countryNameSuccessTests };
