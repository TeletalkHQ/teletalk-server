const { failTestBuilder } = require("$/classes/FailTestBuilder");

const { getWrongCountryCode } = require("$/utilities");

const { models } = require("@/models");

const userModels = models.native.user;

const { errors } = require("@/variables/errors");

const countryCodeFailTest = (configuredRequester, data) => {
  failTestBuilder
    .create(configuredRequester, data, userModels.countryCode, "countryCode")
    .required(errors.COUNTRY_CODE_REQUIRED)
    .numeric(errors.COUNTRY_CODE_NUMERIC)
    .invalidType_typeIsString(errors.COUNTRY_CODE_INVALID_TYPE)
    .minlength(errors.COUNTRY_CODE_MINLENGTH_REACH)
    .maxlength(errors.COUNTRY_CODE_MAXLENGTH_REACH)
    .custom(getWrongCountryCode(), errors.COUNTRY_CODE_NOT_SUPPORTED);
};

module.exports = { countryCodeFailTest };
