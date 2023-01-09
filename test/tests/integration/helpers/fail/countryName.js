const { randomMaker } = require("utility-store/src/classes/RandomMaker");

const { failTestBuilder } = require("$/classes/FailTestBuilder");

const { models } = require("@/models");

const userModels = models.native.user;

const { errors } = require("@/variables/errors");

const countryNameMaxlength = userModels.countryName.maxlength.value;

const countryNameFailTest = (configuredRequester, data) => {
  failTestBuilder
    .create(configuredRequester, data, userModels.countryName, "countryName")
    .required(errors.COUNTRY_NAME_REQUIRED)
    .maxlength(errors.COUNTRY_NAME_MAXLENGTH_REACH)
    .minlength(errors.COUNTRY_NAME_MINLENGTH_REACH)
    .invalidType_typeIsString(errors.COUNTRY_NAME_INVALID_TYPE)
    .custom(
      randomMaker.string(countryNameMaxlength),
      errors.COUNTRY_NAME_NOT_SUPPORTED
    );
};

module.exports = { countryNameFailTest };
