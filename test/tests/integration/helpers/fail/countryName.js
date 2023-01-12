const { randomMaker } = require("utility-store/src/classes/RandomMaker");

const { failTestBuilder } = require("$/classes/FailTestBuilder");

const { models } = require("@/models");

const userModels = models.native.user;

const { errors } = require("@/variables/errors");

const countryNameMaxlength = userModels.countryName.maxlength.value;

const countryNameFailTest = (configuredRequester, data) => {
  failTestBuilder
    .create(configuredRequester, data, userModels.countryName, "countryName")
    .missing()
    .overload()
    .invalidType()
    .empty()
    .maxlength()
    .minlength()
    .custom(
      randomMaker.string(countryNameMaxlength),
      errors.COUNTRY_NAME_NOT_SUPPORTED
    );
};

module.exports = { countryNameFailTest };
