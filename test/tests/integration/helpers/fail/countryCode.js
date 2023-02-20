const { failTestBuilder } = require("$/classes/FailTestBuilder");
const { randomMaker } = require("$/classes/RandomMaker");

const { getWrongCountryCode } = require("$/utilities");

const { models } = require("@/models");

const userModels = models.native.user;

const { errors } = require("@/variables/errors");

const countryCodeFailTest = (configuredRequester, data) => {
  failTestBuilder
    .create(configuredRequester, data, userModels.countryCode, "countryCode")
    .missing()
    .overload()
    .invalidType()
    .empty.numeric()
    .minlength()
    .maxlength(
      randomMaker.stringNumber(userModels.countryCode.maxlength.value + 1)
    )
    .custom(getWrongCountryCode(), errors.COUNTRY_CODE_NOT_SUPPORTED);
};

module.exports = { countryCodeFailTest };
