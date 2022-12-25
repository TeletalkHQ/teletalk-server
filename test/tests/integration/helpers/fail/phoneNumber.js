const { failTestBuilder } = require("$/classes/FailTestBuilder");

const { models } = require("@/models");

const { errors } = require("@/variables/errors");

const userModels = models.native.user;

const phoneNumberFailTest = (configuredCustomRequest, data) => {
  failTestBuilder
    .create(
      configuredCustomRequest,
      data,
      userModels.phoneNumber,
      "phoneNumber"
    )
    .required(errors.PHONE_NUMBER_REQUIRED)
    .invalidType_typeIsString(errors.PHONE_NUMBER_INVALID_TYPE)
    .numeric(errors.PHONE_NUMBER_NUMERIC)
    .minlength(errors.PHONE_NUMBER_MINLENGTH_REACH)
    .maxlength(errors.PHONE_NUMBER_MAXLENGTH_REACH);
};

module.exports = { phoneNumberFailTest };
